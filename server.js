let prefix = "!"
let captchakey = ""
let cookie = []
let discordtoken = ""
//==========================================================================
const express = require("express"),
  app = express(),
  puppeteer = require("puppeteer-extra");
const discord = require("discord.js");
const fs = require("fs");
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
const recaptchaPlugin = RecaptchaPlugin({
  provider: { id: "2captcha", token: captchakey},
  visualFeedback: true
});
puppeteer.use(recaptchaPlugin);
const pluginStealth = require("puppeteer-extra-plugin-stealth");
puppeteer.use(pluginStealth());
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
const client = new discord.Client();
client.login(discordtoken);
client.on("message", message => {
  if (message.content.startsWith(prefix)) {
    const args = message.content
      .slice(1)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    console.log(command);
    console.log(args);
    if (command == "screenshot") {
      message.channel
        .send(
          "Robot Hamsters are currently acquiring the page for you... please wait! This may take up to 1 minute."
        )
        .then(msg => {
          try {
            const argies = [
              "--no-sandbox",
              '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36"',
              "--start-maximized"
            ];
            const options = {
              args: argies
            };
            //add cookies here and you'll be able to log into any site!
         
            puppeteer.launch(options).then(async browser => {
              console.log("browser launched. stealth mode enabled");
              const page = await browser.newPage();
              await page.setCookie(...cookie);
              console.log("cookies injected!");
              await page.goto(args[0]).catch(e => {
                console.log(e);
                msg.reply("Invalid Link. " + e);
              });
              console.log("solving captchas");
              await page.solveRecaptchas();
              console.log("captchas solved!");
              await page.waitFor(2000);
              await page.screenshot({ path: "screenshotnormal.png" });
              console.log("normal screenshot taken");
              msg.reply("Normal Screenshot", {
                files: ["screenshotnormal.png"]
              });
              await page.waitFor(5000);
              await page.evaluate(() =>
                window.scrollTo(0, Number.MAX_SAFE_INTEGER)
              );
              await page.waitFor(2000);
              await page.screenshot({ path: "screenshot.png", fullPage: true });
              console.log("full page screenshot taken");
              msg.reply(
                "Here you go! I took a scrolling screenshot of the page, so you might want to click the image, and then click open original in order to see it properly",
                { files: ["screenshot.png"] }
              );
              await browser.close();
            });
          } catch (error) {
            console.log(error);
            msg.edit("Invalid Link. Error: " + error);
          }
        });
    }
  }
});
