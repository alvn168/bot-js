const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const anime = require('./anime.js');

// Create a new client instance
const client = new Client({
    puppeteer: {
        // Masukkan path dari hasil 'which chromium-browser'
        executablePath: '/usr/bin/chromium-browser',

        // Argumen tambahan agar Chromium berjalan stabil di LinuxLocalAuth
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    },

     authStrategy: new LocalAuth()
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Client is ready!');
});

// When the client received QR-Code
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Listening to all incoming messages
client.on('message_create', async (msg) => {

    // bikin logika simple

    if (msg.body == "!ping") {
        msg.reply('pong');

    }

    if (msg.body.startsWith('!anime ')) {
        const query = msg.body.slice(7).trim(); //ambil judul anime dengan cara di slice atau potong dari index 7
        const animeInfo = await anime.searchAnime(query);
        if (animeInfo) {
            msg.reply(`Title: ${animeInfo.title}\nSynopsis: ${animeInfo.synopsis}\nURL: ${animeInfo.url}\nImage: ${animeInfo.imageUrl}`);
        } else {
            msg.reply('Anime not found.');
        }
    }

    if (msg.body.startsWith('!anime ')) {
        console.log(msg.body);
    }
});


// Start your client
client.initialize();
