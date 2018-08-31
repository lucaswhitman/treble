import { request } from 'https';

const config = require('./config.json');

export function respond(message: string, url: string): void {
    const req = request(
        {
            headers: {
                'Content-Type': 'application/json'
            },
            host: 'hooks.slack.com',
            path: url.substring(23),
            method: 'POST'
        },
        res => res.on('end', response => console.log(response))
    );
    req.write(JSON.stringify({
        response_type: 'ephemeral',
        text: message
    }));
    req.end();
}

export function postInTreble(message: string): void {
    const req = request(
        {
            headers: {
                'Content-Type': 'application/json'
            },
            host: 'hooks.slack.com',
            path: '/services/T0JFK2GLT/B6LSCQA59/dXalafoGsCxs0LSRfZwlICSH',
            method: 'POST'
        },
        res => res.on('end', response => console.log(response))
    );
    req.write(JSON.stringify({
        response_type: 'in_channel',
        text: `${config.name}: ${message}`
    }));
    req.end();
}