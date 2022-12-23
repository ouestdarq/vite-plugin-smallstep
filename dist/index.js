const fs = import('node:fs').default;
const path = import('node:path').default;
const micromatch = import('micromatch').default;

async function getHttps(step = {}) {
    let https = null;
    while (!https) {
        try {
            https = {
                cert: fs.readFileSync(step.crt),
                key: fs.readFileSync(step.key),
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
    const step = {
        crt: path.resolve(steppath, 'site.crt'),
        key: path.resolve(steppath, 'site.key'),
    };
    return {
        name: 'vite-plugin-smallstep',
        async config(userConfig, { command, mode }) {
            const https = await getHttps(step);
            return {
                server: {
                    https: https,
                },
            };
        },
        // extracted from vite-plugin-restart
        configureServer(server) {
            const { crt } = step;
            server.watcher.add(crt);
            server.watcher.on('add', restart);
            server.watcher.on('change', restart);
            server.watcher.on('unlink', restart);
            function restart(file) {
                console.log(file, crt);
                if (micromatch.isMatch(file, crt)) {
                    server.restart();
                }
            }
        },
    };
};
