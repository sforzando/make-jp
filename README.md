# make-jp

for Maker Faire Tokyo

[![CircleCI](https://circleci.com/gh/sforzando/make-jp/tree/master.svg?style=svg)](https://circleci.com/gh/sforzando/make-jp/tree/master)

|                               /registration                                |                               /survey                                |                               /thanks                                |
| :------------------------------------------------------------------------: | :------------------------------------------------------------------: | :------------------------------------------------------------------: |
| ![](https://github.com/sforzando/make-jp/raw/master/test/registration.png) | ![](https://github.com/sforzando/make-jp/raw/master/test/survey.png) | ![](https://github.com/sforzando/make-jp/raw/master/test/thanks.png) |

- [How to Setup](#how-to-setup)
  - [Requirements](#requirements)
  - [Google Cloud SDK for GAE/Python](#google-cloud-sdk-for-gaepython)
    - [Case of MacOS w/ Homebrew](#case-of-macos-w-homebrew)
    - [Case of others](#case-of-others)
  - [Install Python Packages](#install-python-packages)
  - [Install Node.js Packages](#install-nodejs-packages)
- [How to Develop](#how-to-develop)
  - [Bundle with Parcel](#bundle-with-parcel)
- [How to Test](#how-to-test)
  - [Local](#local)
  - [Production](#production)
- [How to Deploy](#how-to-deploy)
  - [GAE via Circle CI](#gae-via-circle-ci)
    - [Prepare Service Account's JSON](#prepare-service-accounts-json)
    - [Set Environment Variables on Circle CI](#set-environment-variables-on-circle-ci)
  - [GAS via clasp](#gas-via-clasp)
- [ToDo](#todo)
- [Misc.](#misc)
  - [Contributes](#contributes)
  - [LICENSE](#license)

## How to Setup

### Requirements

* Python 2.7
  * [Google Cloud SDK](https://cloud.google.com/sdk/)
    * [Flask](http://flask.pocoo.org/)
    * [Sendgrid](https://github.com/sendgrid/sendgrid-python)
    * [Flask-DebugToolbar](https://flask-debugtoolbar.readthedocs.io/en/latest/)
* Sendgrid v3
* Node.js
  * [Yarn](https://yarnpkg.com/)
    * [MaterializeCSS](http://materializecss.com)
    * [jQuery Validation Plugin](https://jqueryvalidation.org)
    * [Toastr](https://github.com/CodeSeven/toastr)
    * [clasp](https://github.com/google/clasp)

### Google Cloud SDK for GAE/Python

#### Case of MacOS w/ Homebrew

```
$ brew cask install google-cloud-sdk
$ gcloud components install app-engine-python
```

#### Case of others

Download SDK from [official site](https://cloud.google.com/sdk/) and install it.

### Install Python Packages

```
$ pip install -t lib -r requirements.txt --upgrade
```

### Install Node.js Packages

```
$ yarn install
```

## How to Develop

### Bundle with Parcel

```
$ yarn run build
```

## How to Test

### Local

```
$ yarn start
$ yarn test
```

### Production

```
$ yarn test:production
```

## How to Deploy

```
$ yarn run build:production
```

To bundle minified code.

### GAE via Circle CI

#### Prepare Service Account's JSON

Prepare json key at `IAM & Role`.

```
$ base64 make-jp-xxxxxxxxxxxx.json
```

And to enable Google App Engine Admin API.

#### Set Environment Variables on Circle CI

Add Base64 encoded key to Circle CI Environment Variables like `$GCP_SERVICE_ACCOUNT_KEY`.

### GAS via clasp

```
$ clasp login
$ clasp clone GAS_PROJECT_ID
$ touch globals.js
```

GAS project can be shared.

`globals.js` should be written `sheetId` like

```
var sheetId = {
  REGISTRATION_MASTER: 'xxxxxxxxxxxxxxxx',
  REGISTRATION_WORKSHEET: 'yyyyyyyyyyyyyyyy'
};
```

After `clasp push` for each project, do some function on web to get the privileges.
And `Publish as Web application` to get POST action.

## ToDo

See [Issues](https://github.com/sforzando/make=jp/issues).

## Misc.

### Contributes

* [Shin'ichiro SUZUKI](shin@sforzando.co.jp)

### LICENSE

WTFPL
