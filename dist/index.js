import { readFileSync } from 'node:fs';
import micromatch from 'micromatch';

async function getHttps(path) {
    let https = null;
    while (!https) {
        try {
            https = {
                cert: readFileSync(`${path}/site.crt`),
                key: readFileSync(`${path}/site.key`),
            };
        } catch (err) {
            console.log(err);
            // Do something with error.
        }
    }
    return https;
}
export default (options = { path: '/home/step' }) => {
    return {
        name: 'vite-plugin-smallstep',
        enforce: 'pre',
        async config(userConfig, { command, mode }) {
            const { path } = options;
            const https = await getHttps(path);
            return {
                server: {
                    https: https,
                },
            };
        },
	// extracted from vite-plugin-restart
        configureServer(server) {
            let restart = `${options.path}/site.crt`;
            server.watcher.add([...restart]);
            server.watcher.on('add', restartServer);
            server.watcher.on('change', restartServer);
            server.watcher.on('unlink', restartServer);
            function restartServer(file) {
                if (micromatch.isMatch(file, restart)) {
                    server.restart();
                }
            }
        },
    };
};
