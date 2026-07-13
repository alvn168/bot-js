const axios = require('axios');

async function searchAnime(query) {
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=1`);
        const anime = response.data.data[0];

        if (anime) {
            return {
                title: anime.title,
                synopsis: anime.synopsis,
                url: anime.url,
                imageUrl: anime.images.jpg.image_url
            };
        } else
            return null;
    } catch (error) {
        console.error('Error searching for anime:', error);
        return null;
    }
}

module.exports = { searchAnime };