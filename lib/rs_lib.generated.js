// @generated file from wasmbuild -- do not edit
// @ts-nocheck: generated
// deno-lint-ignore-file
// deno-fmt-ignore-file
// source-hash: 73fabfee228d525578287f05dcf6f6b476219133
let wasm;

let WASM_VECTOR_LEN = 0;

let cachedUint8Memory0 = null;

function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}

const cachedTextEncoder = typeof TextEncoder !== "undefined"
  ? new TextEncoder("utf-8")
  : {
    encode: () => {
      throw Error("TextEncoder not available");
    },
  };

const encodeString = function (arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
};

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length, 1) >>> 0;
    getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;

  const mem = getUint8Memory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
  if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachedInt32Memory0;
}

const cachedTextDecoder = typeof TextDecoder !== "undefined"
  ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true })
  : {
    decode: () => {
      throw Error("TextDecoder not available");
    },
  };

if (typeof TextDecoder !== "undefined") cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
 * transform utf-8 serbian latinic to serbian cyrilic
 * also translate two letters nj,lj and dž
 * and capital Nj,Lj and Dž
 * in one cyrilic letter
 * @param {string} input
 * @returns {string}
 */
export function latin_to_cyrillic(input) {
  let deferred2_0;
  let deferred2_1;
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(
      input,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.latin_to_cyrillic(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    deferred2_0 = r0;
    deferred2_1 = r1;
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}

/**
 * @param {string} text
 * @returns {string}
 */
export function translate(text) {
  let deferred2_0;
  let deferred2_1;
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(
      text,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.latin_to_cyrillic(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    deferred2_0 = r0;
    deferred2_1 = r1;
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}

const imports = {
  __wbindgen_placeholder__: {},
};

/**
 * @callback WasmBuildDecompressCallback
 * @param {Uint8Array} compressed
 * @returns {Uint8Array} decompressed
 */

/**
 * @callback WasmBuildCacheCallback
 * @param {URL} url
 * @param {WasmBuildDecompressCallback | undefined} decompress
 * @returns {Promise<URL |Uint8Array>}
 */

/**
 * @typedef WasmBuildLoaderOptions
 * @property {WebAssembly.Imports | undefined} imports - The Wasm module's imports.
 * @property {WasmBuildCacheCallback} [cache] - A function that caches the Wasm module to
 * a local path so that a network request isn't required on every load.
 *
 * Returns an ArrayBuffer with the bytes on download success, but cache save failure.
 */

class WasmBuildLoader {
  /** @type {WasmBuildLoaderOptions} */
  #options;
  /** @type {Promise<WebAssembly.WebAssemblyInstantiatedSource> | undefined} */
  #lastLoadPromise;
  /** @type {WebAssembly.WebAssemblyInstantiatedSource | undefined} */
  #instantiated;

  /** @param {WasmBuildLoaderOptions} options */
  constructor(options) {
    this.#options = options;
  }

  /** @returns {WebAssembly.Instance | undefined} */
  get instance() {
    return this.#instantiated?.instance;
  }

  /** @returns {WebAssembly.Module | undefined} */
  get module() {
    return this.#instantiated?.module;
  }

  /**
   * @param {URL} url
   * @param {WasmBuildDecompressCallback | undefined} decompress
   * @returns {Promise<WebAssembly.WebAssemblyInstantiatedSource>}
   */
  load(
    url,
    decompress,
  ) {
    if (this.#instantiated) {
      return Promise.resolve(this.#instantiated);
    } else if (this.#lastLoadPromise == null) {
      this.#lastLoadPromise = (async () => {
        try {
          this.#instantiated = await this.#instantiate(url, decompress);
          return this.#instantiated;
        } finally {
          this.#lastLoadPromise = undefined;
        }
      })();
    }
    return this.#lastLoadPromise;
  }

  /**
   * @param {URL} url
   * @param {WasmBuildDecompressCallback | undefined} decompress
   */
  async #instantiate(url, decompress) {
    const imports = this.#options.imports;
    if (this.#options.cache != null && url.protocol !== "file:") {
      try {
        const result = await this.#options.cache(
          url,
          decompress ?? ((bytes) => bytes),
        );
        if (result instanceof URL) {
          url = result;
          decompress = undefined; // already decompressed
        } else if (result != null) {
          return WebAssembly.instantiate(result, imports);
        }
      } catch {
        // ignore if caching ever fails (ex. when on deploy)
      }
    }

    const isFile = url.protocol === "file:";

    // make file urls work in Node via dnt
    const isNode =
      (/** @type {any} */ (globalThis)).process?.versions?.node != null;
    if (isFile && typeof Deno !== "object") {
      throw new Error(
        "Loading local files are not supported in this environment",
      );
    }
    if (isNode && isFile) {
      // the deno global will be shimmed by dnt
      const wasmCode = await Deno.readFile(url);
      return WebAssembly.instantiate(
        decompress ? decompress(wasmCode) : wasmCode,
        imports,
      );
    }

    switch (url.protocol) {
      case "file:":
      case "https:":
      case "http:": {
        const wasmResponse = await fetchWithRetries(url);
        if (decompress) {
          const wasmCode = new Uint8Array(await wasmResponse.arrayBuffer());
          return WebAssembly.instantiate(decompress(wasmCode), imports);
        }
        if (
          isFile ||
          wasmResponse.headers.get("content-type")?.toLowerCase()
            .startsWith("application/wasm")
        ) {
          return WebAssembly.instantiateStreaming(
            // Cast to any so there's no type checking issues with dnt
            // (https://github.com/denoland/wasmbuild/issues/92)
            /** @type {any} */ (wasmResponse),
            imports,
          );
        } else {
          return WebAssembly.instantiate(
            await wasmResponse.arrayBuffer(),
            imports,
          );
        }
      }
      default:
        throw new Error(`Unsupported protocol: ${url.protocol}`);
    }
  }
}

/** @param {URL | string} url */
async function fetchWithRetries(url, maxRetries = 5) {
  let sleepMs = 250;
  let iterationCount = 0;
  while (true) {
    iterationCount++;
    try {
      const res = await fetch(url);
      if (res.ok || iterationCount > maxRetries) {
        return res;
      }
    } catch (err) {
      if (iterationCount > maxRetries) {
        throw err;
      }
    }
    console.warn(`Failed fetching. Retrying in ${sleepMs}ms...`);
    await new Promise((resolve) => setTimeout(resolve, sleepMs));
    sleepMs = Math.min(sleepMs * 2, 10_000);
  }
}
const isNodeOrDeno = typeof Deno === "object" ||
  (typeof process !== "undefined" && process.versions != null &&
    process.versions.node != null);

const loader = new WasmBuildLoader({
  imports,
  cache: isNodeOrDeno
    ? (await import("https://deno.land/x/wasmbuild@0.15.6/loader/cache.ts"))
      .cacheToLocalDir
    : undefined,
});
/**
 * Options for instantiating a Wasm instance.
 * @typedef {Object} InstantiateOptions
 * @property {URL=} url - Optional url to the Wasm file to instantiate.
 * @property {DecompressCallback=} decompress - Callback to decompress the
 * raw Wasm file bytes before instantiating.
 */

/** Instantiates an instance of the Wasm module returning its functions.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object.
 * @param {InstantiateOptions=} opts
 */
export async function instantiate(opts) {
  return (await instantiateWithInstance(opts)).exports;
}

/** Instantiates an instance of the Wasm module along with its exports.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object.
 * @param {InstantiateOptions=} opts
 * @returns {Promise<{
 *   instance: WebAssembly.Instance;
 *   exports: { latin_to_cyrillic: typeof latin_to_cyrillic; translate: typeof translate }
 * }>}
 */
export async function instantiateWithInstance(opts) {
  const { instance } = await loader.load(
    opts?.url ?? new URL("rs_lib_bg.wasm", import.meta.url),
    opts?.decompress,
  );
  wasm = wasm ?? instance.exports;
  cachedInt32Memory0 = cachedInt32Memory0 ?? new Int32Array(wasm.memory.buffer);
  cachedUint8Memory0 = cachedUint8Memory0 ?? new Uint8Array(wasm.memory.buffer);
  return {
    instance,
    exports: getWasmInstanceExports(),
  };
}

function getWasmInstanceExports() {
  return { latin_to_cyrillic, translate };
}

/** Gets if the Wasm module has been instantiated. */
export function isInstantiated() {
  return loader.instance != null;
}
