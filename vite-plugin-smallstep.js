import { readFileSync } from 'fs';

async function getHttps({ crt, key }) {
    let https = null;
    try {
        https = {
            cert: readFileSync(crt),
            key: readFileSync(key),
        };
    } catch (err) {
        await getHttps({ crt: crt, key: key });
    }
    return https;
}

export default (userOptions = {}) => {
    return {
        name: 'vite-plugin-smallstep',
        enforce: 'pre',
        async config(userConfig, { command, mode }) {
            const https = await getHttps(userOptions);
            return {
                server: {
                    https: https,
                },
            };
        },
    };
};
