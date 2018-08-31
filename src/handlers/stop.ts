import { Response } from 'express';
import { SlackEvent } from '../models';
import { SpotifyClient } from '../spotify';
import { postInTreble } from '../respond';

export function stop(e: SlackEvent, res: Response) {
    res.send(':waiting:');
    const spotify = new SpotifyClient();
    spotify.refreshToken().then(() => {
        spotify.stop().then(() => {
            postInTreble(`${e.user_name} stopped Spotify`);
        });
    });
}