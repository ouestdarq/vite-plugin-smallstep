# Vite Plugin Smallstep

The plugin runs an async function on the config method, awaiting the fs.readFileSync and CRT/KEY pair being read correctly.

## Usage

```
npm install proxymurder/vite-plugin-smallstep
```

```
import smallstep from 'vite-plugin-smallstep';
export default defineConfig(async ({ mode }) => {
    return {
        plugins: [
            smallstep({
                path: STEPPATH // default is /home/step
            }),
        ],
    };
});
```
