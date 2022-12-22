Vite plugin for smallstep certificates or any crt/key pair.
Usage:
```
import smallstep from './vite-plugin-smallstep.js';
export default defineConfig(async ({ mode }) => {
    return {
        plugins: [
            smallstep({
                crt: path/to/crt,
                key: path/to/key,
            }),
        ],
    };
});
```
