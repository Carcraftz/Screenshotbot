# Screenshotbot
A simple discord bot that sends you a screenshot of any webpage using puppeteer. 

# How to configure:

Install node.js 

### Edit the following variables on the top:
Set the discordtoken variable to your discord bot token
Set the prefix variable to the command prefix you want. (Default is !)
Set the captchakey variable to your 2captcha key (not required if you don't want the bot to be able to solve captchas)
##### If you want the bot to have the ability to log into a certain website follow the following steps (not required):
Download the editthiscookie extension from the chrome web store
Navigate to the website you want to be able to login to
Click the following button and the cookies will be exported and saved to your clipboard
![Button](https://cdn.discordapp.com/attachments/750139583286607904/750842269703208960/unknown.png)
The cookies are exported as an array so all you have to do is set the cookie variable equal to the array you get!
To do this replace let cookie = []
with:
let cookie = the cookies you copied to clipboard

the cookies you copied to clipboard should be in this format: [{cookie1object},{cookie2object},{cookie3object},{etc.}]

## Run the following Commands:

npm i discord.js puppeteer puppeteer-extra puppeteer-extra-plugin-recaptcha puppeteer-extra-plugin-stealth express

node server.js



