import { readFileSync } from 'node:fs';

async function getHttps(path) {
    let https = null;
    try {
        https = {
            cert: readFileSync(`${path}/site.crt`),
            key: readFileSync(`${path}/site.key`),
        };
    } catch (err) {
        await getHttps(path);
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
            return {
                server: {
                    https: https,
                },
            };
        },
    };
};
