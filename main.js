const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

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
client.on('message_create', message => {

    // bikin logika simple

    if (message.body == "!ping") {
        client.sendMessage(message.from, 'pong');

    }
});


// Start your client
client.initialize();
