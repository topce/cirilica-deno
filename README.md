# Rust Deno DenoDeploy Telegram bot that translate text from Serbian Latin to Serbian Cyrillic  

This project is generated with wasm build <https://deno.com/blog/wasmbuild>

It call <https://crates.io/crates/cirilica/> rust library

from deno <https://deno.com/>
after us it in telegram bot
<https://web.telegram.org/k/#@latinica2cirilica_bot>

that is implemented with deno deploy <https://deno.com/deploy>

```
import { serve } from "<https://deno.land/std@0.186.0/http/server.ts>";
import { Bot, webhookCallback } from "<https://deno.land/x/grammy@v1.16.0/mod.ts>";

const bot = new Bot(Deno.env.get("BOT_TOKEN") || "");

import { instantiate } from "<https://raw.githubusercontent.com/topce/cirilica-deno/master/lib/rs_lib.generated.js>";

const { translate } = await instantiate();

bot.command("start", (ctx) => ctx.reply(`
Veb aplikacija
https://topce.github.io/latinica2cirilica/
Unesi teks na latinici:`));
bot.command("about", (ctx) => ctx.reply(`
Veb aplikacija
https://topce.github.io/latinica2cirilica/
`));
bot.on("message", (ctx) => ctx.reply(translate(ctx.message?.text)));

const handleUpdate = webhookCallback(bot, "std/http");
serve(async (req) => {
try {
const url = new URL(req.url);
if (url.searchParams.get("secret") !== Deno.env.get("FUNCTION_SECRET")) {
return new Response("not allowed", { status: 405 });
}

return await handleUpdate(req);
} catch (err) {
console.error(err);
}
});
```

# Причај Србски да те цио свијет разумије ;-)