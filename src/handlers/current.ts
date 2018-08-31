import { Response } from 'express';
import { SlackEvent } from '../models';
import { SpotifyClient } from '../spotify';
import { respond } from '../respond';

export function currentPlay(e: SlackEvent, res: Response) {
    res.send(':waiting:');
    const spotify = new SpotifyClient();
    spotify.refreshToken().then(() => {
        spotify.getCurrentPlaying().then(song => {
            respond(`${song} is playing`, e.response_url);
        });
    });
}