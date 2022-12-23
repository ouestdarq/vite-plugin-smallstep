# Vite Plugin Smallstep

Plugin runs an async function on the config method, awaiting the fs.readFileSync on CRT/KEY pair waiting to be read correctly.

### Important

In order for plugin to work, `"type" : "module"` must be set in package.json which might break dependendencies.

## Usage

```
npm install proxymurder/vite-plugin-smallstep
```

```
// vite.config.js

import smallstep from 'vite-plugin-smallstep';
export default defineConfig(async ({ mode }) => {
    return {
        plugins: [
            smallstep({
                steppath: STEPPATH // default is '/home/step'
            }),
        ],
    };
});
```
