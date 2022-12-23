import { readFileSync } from 'fs';
import { resolve } from 'path';
import micromatch from 'micromatch';

async function getHttps(path = {}) {
    let https = null;
    while (!https) {
        try {
            https = {
                cert: readFileSync(path.crt),
                key: readFileSync(path.key),
            };
        } catch (err) {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            console.log(err);
        }
    }
    return https;
}
export default (options = { steppath: '/home/step' }) => {
    const { steppath } = options;
    const path = {
        crt: resolve(steppath, 'site.crt'),
        key: resolve(steppath, 'site.key'),
    };
    return {
        name: 'vite-plugin-smallstep',
        async config(userConfig, { command, mode }) {
            const https = await getHttps(path);
            return {
                server: {
                    https: https,
                },
            };
        },
        // extracted from vite-plugin-restart
        configureServer(server) {
            server.watcher.add(path.crt);
            server.watcher.on('add', restart);
            server.watcher.on('change', restart);
            server.watcher.on('unlink', restart);
            function restart(file) {
                if (micromatch.isMatch(file, path.crt)) {
                    server.restart();
                }
            }
        },
    };
};
