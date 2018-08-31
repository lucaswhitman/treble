# treble

### Config  
Config should be set as environmental variables prior to building.
* `SPOTIFY_USER` - spotify account to link to
* `SPOTIFY_PLAYLIST` - spotify playlist to link to
* `SPOTIFY_REFRESH_TOKEN` - user refresh token, you can retrieve a refresh token with the correct scopes by running `npm run auth`
* `SPOTIFY_CLIENT_ID` - app id
* `SPOTIFY_CLIENT_SECRET` - app secret
* `SPOTIFY_REDIRECT_URI` - spotify redirect uri
* `SLACK_TOKEN` - verification token for slack

### Deploy to Google Functions 
If the `gcloud` cli is installed & configured simply run `npm run deploy`.

### Spotify Connect
Treble relys on [spotify connect](https://www.spotify.com/us/connect/) to work its magic.

If you want to run use a raspberry pi I would reccomend this spotify connect client: https://github.com/dtcooper/raspotify