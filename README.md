# CRYPT OF CURRENCY
## Dashboard for Cryptocurrency miners

Check out the [LIVE VERSION!](https://thecrypt.netlify.com)

 ## INTRODUCTION

 This single page application is dedicated to cryptocurrencies. It feature the latest crypto-related news, current exchange prices for the 10 most popular coins, and a chat for all crypto-related sharing. 

 ## TEAM

 The app was designed and developed by the fantastic team of:
* [Myself](https://github.com/gvestmann),
* [Ari](https://github.com/Aridaniel), 
* [Daniel Bergmann](https://github.com/daniel-bergmann), and
* [Jóhann](https://github.com/johannTor), 

### INSTALLATION

Begin by cloning this repo. 

Then, clone the [server's repo](https://github.com/johannTor/crypt_chat_server).

For **both** folders you'll have to  fire up terminal and run ...

 ```bash
 npm install
 ```

 or with yarn:

  ```bash
 yarn
 ```

 and then start the server with:

 ```bash
 npm start
 ```

 or with yarn:

  ```bash
 yarn start
 ```

 ## CODE & TECH

**Crypt of Currency** is built with React. It uses [GNews.io's API](https://gnews.io) and [CoinCap.io's API](https://coincap.io) for info. It relies on [Socket.io](https://socket.io) for the chat function.

The site is styled with plain CSS. It's hosted and deployed with [Netlify](https://netlify.app), but our server is on [Heroku](https://www.heroku.com). 