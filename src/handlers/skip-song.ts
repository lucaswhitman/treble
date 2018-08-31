import { Response } from 'express';
import { SlackEvent } from '../models';
import { SpotifyClient } from '../spotify';
import { postInTreble } from '../respond';

export function skip(e: SlackEvent, res: Response) {
    res.send(':waiting:');
    const spotify = new SpotifyClient();
    spotify.refreshToken().then(() => {
        spotify.nextTrack().then(() => {
            postInTreble(`${e.user_name} skipped a track`);
        });
    });
}