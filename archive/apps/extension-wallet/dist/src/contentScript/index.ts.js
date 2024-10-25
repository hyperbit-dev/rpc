import __buffer_polyfill from "/vendor/.vite-deps-vite-plugin-node-polyfills_shims_buffer.js__v--dec54110.js"
import __global_polyfill from "/vendor/.vite-deps-vite-plugin-node-polyfills_shims_global.js__v--59812817.js"
import __process_polyfill from "/vendor/.vite-deps-vite-plugin-node-polyfills_shims_process.js__v--073090bb.js"

globalThis.Buffer = globalThis.Buffer || __buffer_polyfill
globalThis.global = globalThis.global || __global_polyfill
globalThis.process = globalThis.process || __process_polyfill

console.info("contentScript is running");
