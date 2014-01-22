# Automaticator

A node.js app to demonstrate the use of the [_Automatic_ Webook API](http://automatic.com/developer/).  It shows driving events, such as ignition on, for the logged in user in real time on a map.

The [_Automatic_ API](http://automatic.com/developer/) exposes data collected by [_Automatic_](http://automatic.com), a small device that syncs your car's computer with your phone.

## Demo

A version of this application is available at [https://automaticator.herokuapp.com](https://automaticator.herokuapp.com).

## Running

### Install required packages from NPM:

    npm install

### Copy keys-sample.js to keys.js

    cp keys-sample.js keys.js

Add your `automaticClientId` and `automaticClientSecret` to `keys.js`.

### Run the app

    node index.js

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

