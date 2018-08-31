import { Response } from 'express';
import { SlackEvent } from '../models';
import { SpotifyClient } from '../spotify';
import { postInTreble } from '../respond';

const config = require('../config.json');

export function addToQueue(e: SlackEvent, res: Response) {
    res.send(':waiting:');
    const spotify = new SpotifyClient();
    spotify.refreshToken().then(() => {
        const songUri = e.text.split(' ')[1];
        spotify.addToPlaylist(config.spotify.playlist, songUri).then(() => {
            postInTreble(`${e.user_name} added ${songUri}`);
            //make the call below to sync the current playing list (makes a ton of sense)
            spotify.getPlaylistTracks(config.spotify.playlist);
        }).catch(err => console.error(err));
    });
}