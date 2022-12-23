import { readFileSync } from 'node:fs';
import path from 'node:path';

async function getHttps(path) {
    let https = null;
    while (!https) {
        try {
            https = {
                cert: readFileSync(`${path}/site.crt`),
                key: readFileSync(`${path}/site.key`),
            };
        } catch (err) {
            // Do something with error.
        }
    }
    return https;
}

export default (userOptions = { path: '/home/step' }) => {
    return {
        name: 'vite-plugin-smallstep',
        enforce: 'pre',
        async config(userConfig, { command, mode }) {
            const { path } = userOptions;
            const https = await getHttps(path);
            console.log(this);
            return {
                server: {
                    https: https,
                },
            };
        },
    };
};
