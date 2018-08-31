import { Response } from 'express';
import { SlackEvent } from '../models';
import { SpotifyClient } from '../spotify';
import { respond } from '../respond';

const config = require('../config.json');

export function showQueue(e: SlackEvent, res: Response) {
    res.send(':waiting:');
    const spotify = new SpotifyClient();
    spotify.refreshToken().then(() => {
        spotify.getPlaylistTracks(config.spotify.playlist).then(tracks => {
            respond(tracks.reduce((a, b, i) => `${a} \n ${i ? i + 1 : 1}. ${b}`), e.response_url);
        });
    });
}