import { CloudHttpFunction } from './models';
import { SlackBot } from './slackbot';
import * as handlers from './handlers';

const config = require('./config.json');

export const botHandler: CloudHttpFunction = (req, res) => {
    const bot = new SlackBot(config.token);
    bot.registerCommand(config.name, {
        handlers: {
            add: handlers.addToQueue,
            current: handlers.currentPlay,
            find: handlers.search,
            lookup: handlers.search,
            pause: handlers.pause,
            play: handlers.play,
            queue: handlers.addToQueue,
            search: handlers.search,
            showQueue: handlers.showQueue,
            skip: handlers.skip,
            stop: handlers.stop,
            volume: handlers.setVolume

        },
        helpText: 'You are not doing it right'
    });
    bot.processMessage(req, res);
};