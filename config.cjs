const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { promises: fs } = require('fs');
const qrcode = require('qrcode-terminal');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: { level: 'silent' }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'open') {
            console.log('Bot is online!');
            // Set bot's profile name
            await sock.updateProfileName('Luthando Jin Young');
            // Set bot's profile picture
            const img = await fs.readFile('./naruto.jpg');
            await sock.updateProfilePicture(sock.user.id, img);
        } else if (connection === 'close') {
            if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
                startBot();
            }
        }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.key.fromMe && msg.message?.conversation) {
            await sock.sendMessage(msg.key.remoteJid, { text: 'Hello, I am Luthando Jin Young!' });
        }
    });
}

startBot();mkdir luthando-jin-young-bot
cd luthando-jin-young-bot
npm init -y
npm install @whiskeysockets/baileys
npm install qrcode-terminal
module.exports = {
  "SESSION_ID": process.env.SESSION_ID || "",
  "ALIVE_IMG": process.env.ALIVE_IMG || "https://raw.githubusercontent.com/HyHamza/HyHamza/refs/heads/main/Images/logo.jpg",
  "PREFIX": process.env.PREFIX || ".",
  "AUTO_READ_STATUS": process.env.AUTO_READ_STATUS === 'true',
  "MODE": process.env.MODE || "public",
  "OWNER_NUMBER": process.env.OWNER_NUMBER || "923072380380",
  "OWNER_NAME": process.env.OWNER_NAME || "Hamza",
  "ALWAYS_ONLINE": process.env.ALWAYS_ONLINE === 'true',
  "PRESENCE": process.env.PRESENCE || "online",
  "OMDB_API_KEY": process.env.OMDB_API_KEY || "76cb7f39",
  "READ_CMD": process.env.READ_CMD === 'true',
  "AUTO_VOICE": process.env.AUTO_VOICE === 'true',
  "AUTO_STICKER": process.env.AUTO_STICKER === 'true',
  "AUTO_REPLY": process.env.AUTO_REPLY === 'true',
  "AUTO_REACT": process.env.AUTO_REACT === 'true',
  "WELCOME": process.env.WELCOME === 'true',
  "ANTI_BAD": process.env.ANTI_BAD === 'true',
  "ANTI_LINK": process.env.ANTI_LINK === 'true',
  "ANTI_GROUP_LINK": process.env.ANTI_GROUP_LINK === 'true',
  "ANTI_DELETE": process.env.ANTI_DELETE === 'true',
  "ANTI_VIEW_ONCE": process.env.ANTI_VIEW_ONCE === 'true',
  "ANTI_BOT": process.env.ANTI_BOT === 'true',
  "PREMIUM_USERS": process.env.PREMIUM_USERS || "",
  "COUNTRY_BLOCK": process.env.COUNTRY_BLOCK === 'true',
  "COUNTRY_BLOCK_CODE": process.env.COUNTRY_BLOCK_CODE || "972",
  "EMOJI": process.env.EMOJI || "🙄",
  "AUTO_TYPING": process.env.AUTO_TYPING === 'true'
};
