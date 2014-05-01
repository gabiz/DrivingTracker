# Driving Tracker

Driving Tracker is a IoT & Wearables Hackathon Project which receives driving data from Automatic devices and Emotiv EEG Headsets and makes it available for display with Smartwatches. Toq and Pebble applications were developed to display the driving information as well as the mood as detected by the Emotiv Headset. Different songs are suggested by the Toq depending on the mood, selecting the song from the watch results in the song being automatically played by the connected phone.

The server component is based on the Automaticator Webhook Sample, with additional apis to post and retrieve data.


# Automaticator

A node.js app to demonstrate the use of the [_Automatic_ Webook API](http://automatic.com/developer/).  It shows driving events, such as ignition on, for the logged in user in real time on a map.

The [_Automatic_ API](http://automatic.com/developer/) exposes data collected by [_Automatic_](http://automatic.com), a small device that syncs your car's computer with your phone.

## Demo

A version of this application is available at [https://automaticator.herokuapp.com](https://automaticator.herokuapp.com).

## Running

### Install required packages from NPM:

    npm install

### Configure your client id and client secret

Copy the file `config-sample.json` to `config.json` and add your Automatic client id and client secret.  Alternatively, create environment variables named `AUTOMATIC_CLIENT_ID`, `AUTOMATIC_CLIENT_SECRET`, `AUTOMATIC_AUTHORIZE_URL`, and `AUTOMATIC_AUTH_TOKEN_URL`.

### Run the app

    DEBUG=automaticator npm start

### View the app

Open `localhost:3000` in your browser.

### Testing locally, skipping oAuth

You can test locally as a logged in user, bypassing oAuth by including an `access_token` when running the app.

    DEBUG=automaticator TOKEN=YOUR-AUTOMATIC-ACCESS-TOKEN npm start

### Deploy to Heroku

If you have the heroku toolbelt installed, you can create, configure and deploy this app to Heroku.  To create an app:

    heroku create

If you already created an app, add it as a git remote:

    git remote add heroku YOUR-HEROKU-GIT-URL

Configure the heroku app's environment variables:

    heroku config:add AUTOMATIC_CLIENT_ID="YOUR AUTOMATIC CLIENT ID"
    heroku config:add AUTOMATIC_CLIENT_SECRET="YOUR AUTOMATIC CLIENT SECRET"
    heroku config:add AUTOMATIC_AUTHORIZE_URL=https://www.automatic.com/oauth/authorize/
    heroku config:add AUTOMATIC_AUTH_TOKEN_URL=https://www.automatic.com/oauth/access_token/

Deploy your app to heroku:

    git push heroku master

See [deploying a node.js app](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-your-application-to-heroku) for more information.

## License

The MIT License (MIT)

Copyright (c) 2013 Automatic Inc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
