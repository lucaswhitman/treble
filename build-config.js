const fs = require('fs');

function buildConfig() {
    return JSON.stringify({
        spotify: {
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            user: process.env.SPOTIFY_USER,
            playlist: process.env.SPOTIFY_PLAYLIST,
            refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
            redirectUri: process.env.SPOTIFY_REDIRECT_URI
        },
        name: process.env.SPOTIFY_BOT_NAME,
        token: process.env.SLACK_TOKEN
    })
}

fs.writeFileSync('./src/config.json', buildConfig());