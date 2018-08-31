import { Response } from 'express';
import { SlackEvent } from '../models';
import { SpotifyClient } from '../spotify';
import { respond } from '../respond';

export function search(e: SlackEvent, res: Response) {
    res.send(':waiting:');
    const spotify = new SpotifyClient();
    spotify.refreshToken().then(() => {
        spotify.search(e.text).then(results => {
            respond(
                results.body.tracks.items.slice(0, 9)
                    .map(track => `*Track*: ${track.name} *Artist*: ${track.artists[0].name} *URI*: ${track.uri}`)
                    .reduce((a, b) => `${a} \n ${b}`),
                e.response_url
            );
        });
    });
}