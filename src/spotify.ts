import Spotify = require('spotify-web-api-node');
const config = require('./config.json');

export class SpotifyClient {
    private spotify: Spotify;

    constructor() {
        this.spotify = new Spotify({
            clientId: config.spotify.clientId,
            clientSecret: config.spotify.clientSecret,
            redirectUri: config.spotify.redirectUri
        });
        this.spotify.setRefreshToken(config.spotify.refreshToken);
    }

    public getAuthUrl(): string {
        const scopes = [
            'playlist-modify-public',
            'playlist-read-private',
            'playlist-modify-private',
            'playlist-read-collaborative',
            'user-library-modify',
            'user-library-read',
            'user-modify-playback-state',
            'user-read-playback-state',
            'user-read-recently-played',
            'user-top-read'
        ];
        return this.spotify.createAuthorizeURL(scopes);
    }

    public getRefreshToken(authCode: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.spotify.authorizationCodeGrant(authCode).then(data => resolve(data.body.refresh_token)).catch(reject);
        });
    }

    public refreshToken(): Promise<void> {
        return this.spotify.refreshAccessToken().then(data => {
            console.log('The access token has been refreshed!');
            // Save the access token so that it's used in future calls
            this.spotify.setAccessToken(data.body.access_token);
        });
    }

    public play(): Promise<void> {
        return this.spotify.play();
    }

    public pause(): Promise<void> {
        return this.spotify.pause();
    }

    // tslint:disable-next-line:no-any
    public search(query: string): Promise<any> {
        return this.spotify.searchTracks(query);
    }

    public stop(): Promise<void> {
        return this.spotify.stop();
    }

    public nextTrack(): Promise<void> {
        return this.spotify.skipToNext();
    }

    public addToPlaylist(playlistId: string, songUri: string): Promise<void> {
        return this.spotify.addTracksToPlaylist(config.spotify.user, playlistId, [songUri]);
    }

    public getCurrentPlaying(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.spotify.getMyCurrentPlaybackState().then(data => resolve(`${data.body.item.name} ${data.body.item.artists[0].name}`)).catch(reject);
        });
    }

    public getPlaylistTracks(playlistId: string): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            this.spotify.getPlaylist(config.spotify.user, config.spotify.playlist).then(data => resolve(
                data.body.tracks.items.map(item => `${item.track.artists[0].name} - ${item.track.name}, ${item.track.uri}`)
            )).catch(reject);
        });
    }

    public setVolume(percent: number): Promise<void> {
        return this.spotify.setVolume(percent);
    }
}