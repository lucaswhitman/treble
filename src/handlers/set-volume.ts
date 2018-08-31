import { Response } from 'express';
import { SlackEvent } from '../models';
import { SpotifyClient } from '../spotify';
import { postInTreble } from '../respond';

export function setVolume(e: SlackEvent, res: Response) {
    res.send(':waiting:');
    const spotify = new SpotifyClient();
    spotify.refreshToken().then(() => {
        spotify.setVolume(+e.text).then(() => {
            postInTreble(`${e.user_name} set the volume to ${e.text}`);
        });
    });
}