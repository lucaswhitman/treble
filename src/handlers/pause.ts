import { Response } from 'express';
import { SlackEvent } from '../models';
import { SpotifyClient } from '../spotify';
import { postInTreble } from '../respond';

export function pause(e: SlackEvent, res: Response) {
    res.send(':waiting:');
    const spotify = new SpotifyClient();
    spotify.refreshToken().then(() => {
        spotify.pause().then(() => {
            postInTreble(`${e.user_name} paused Spotify`);
        });
    });
}