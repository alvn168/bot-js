async function createSticker(client, msg) {
  try {
    let mediaMessage = msg;

    if (!msg.hasMedia && msg.hasQuotedMsg) {
      mediaMessage = await msg.getQuotedMessage();
    }

    if (!mediaMessage.hasMedia) {
      await msg.reply(
        "Kirim gambar/video dengan caption !sticker atau !s, " +
          "atau reply gambar/video dengan command tersebut.",
      );
      return;
    }

    const media = await mediaMessage.downloadMedia();

    if (!media) {
      await msg.reply("Media tidak dapat diunduh. Silakan coba lagi.");
      return;
    }

    const isSupported =
      media.mimetype.startsWith("image/") ||
      media.mimetype.startsWith("video/");

    if (!isSupported) {
      await msg.reply("Format tidak didukung. Gunakan gambar atau video.");
      return;
    }

    await client.sendMessage(msg.from, media, {
      sendMediaAsSticker: true,
      stickerName: "Bot Sticker",
      stickerAuthor: "bot-js",
    });
  } catch (error) {
    console.error("Gagal membuat stiker:", error);
    await msg.reply("Terjadi kesalahan saat membuat stiker.");
  }
}

module.exports = {
  createSticker,
};
