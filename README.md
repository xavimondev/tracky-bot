# 🤖 TrackyBot

## About The Project

TrackyBot is a bot that will send you messages on discord when specific product is available

## Requeriments 🧑‍💻

To get setup you will need to make sure you have the following installed on your machine:

- [NodeJS 16](https://nodejs.org/en/)

Also, you can use NVM:

- [NVM](https://github.com/nvm-sh/nvm)

## Creating a bot user 🤖

* Go to [discord developers](https://discordapp.com/developers/applications/me) and create a new application.

* After that, on the side bar, you'll see "Bot", click that, and then "Add Bot".

* You can get your bot's token, by using the "Click to reveal button" in the app bot user section. This token, you'll use in `.env` file

* Now, we need to go to "OAuth2" on side bar and check the following permissions:

  [x] Bot
  
  
  [x] Send Messages
  
  
  [x] Create Public Threads
  
  
  [x] Send Messages in Threads
  
* Then, scroll down and you'll be able to see an URL, copy it and open new tab. 

* Finally, click in "Authorize".

## Next steps 🚀

Clone this repo to a directory and then run `npm install` to install all the dependencies needed to run the bot.

Then, copy the `.env.example` file to `.env` and fill out as required.

Once installed you can run `npm start` to start the bot.