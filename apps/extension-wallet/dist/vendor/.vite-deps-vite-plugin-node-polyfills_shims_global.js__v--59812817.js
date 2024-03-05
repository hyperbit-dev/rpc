import __buffer_polyfill from "/vendor/.vite-deps-vite-plugin-node-polyfills_shims_buffer.js__v--dec54110.js"
import __global_polyfill from "/vendor/.vite-deps-vite-plugin-node-polyfills_shims_global.js__v--59812817.js"
import __process_polyfill from "/vendor/.vite-deps-vite-plugin-node-polyfills_shims_process.js__v--073090bb.js"

globalThis.Buffer = globalThis.Buffer || __buffer_polyfill
globalThis.global = globalThis.global || __global_polyfill
globalThis.process = globalThis.process || __process_polyfill

import {
  __toESM,
  require_dist,
  require_dist2,
  require_dist3
} from "/vendor/.vite-deps-chunk-V2OII7Y7.js__v--bf37b444.js";

// ../../node_modules/vite-plugin-node-polyfills/shims/global/dist/index.js
var import_dist = __toESM(require_dist());
var import_dist2 = __toESM(require_dist2());
var import_dist3 = __toESM(require_dist3());
var global = globalThis || void 0 || self;
export {
  global as default,
  global
};
//# sourceMappingURL=vite-plugin-node-polyfills_shims_global.js.map
