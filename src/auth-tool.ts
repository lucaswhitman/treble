// tslint:disable:no-any
import { prompt } from 'inquirer';
import { SpotifyClient } from './spotify';

const config = require('./config.json');

console.log('This script can be used to retrieve the refresh token required to auth an account for use with the treble bot');

if (!config.spotify.clientId) {
    console.error('Spotify Client ID unset, please set the SPOTIFY_CLIENT_ID variable and try again');
    process.exit(1);
}

if (!config.spotify.clientSecret) {
    console.error('Spotify Client Secret unset, please set the SPOTIFY_CLIENT_SECRET variable and try again');
    process.exit(1);
}

if (!config.spotify.redirectUri) {
    console.error('Spotify redirect uri unset, please set the SPOTIFY_REDIRECT_URI variable and try again');
    process.exit(1);
}

const client = new SpotifyClient();
console.log(`Step 1. Navigate to ${client.getAuthUrl()}`);
console.log('Step 2. Follow the prompts in the browser to grant auth to your app');
console.log('Step 3. Enter the auth token from the url bar of your browser below');
prompt([{
    message: 'Auth Token',
    name: 'token'
}]).then((val: any) => {
    client.getRefreshToken(val.token).then(res => {
        console.log(`Your token is ${res}`);
        console.log('Set this value as your SPOTIFY_REFRESH_TOKEN before deploying');
    });
}).catch(err => {
    console.error(err);
    process.exit(1);
});
