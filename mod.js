import { instantiate } from "./lib/rs_lib.generated.js";

const { translate } = await instantiate();

// translate
console.log(translate("Hello, World!"));

