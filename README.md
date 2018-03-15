# make-jp

for Maker Faire Tokyo

[![CircleCI](https://circleci.com/gh/sforzando/make-jp/tree/master.svg?style=svg)](https://circleci.com/gh/sforzando/make-jp/tree/master)

- [How to Setup](#how-to-setup)
  - [Requirements](#requirements)
  - [Google Cloud SDK for GAE/Python](#google-cloud-sdk-for-gaepython)
    - [Case of MacOS w/ Homebrew](#case-of-macos-w-homebrew)
    - [Case of others](#case-of-others)
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

### Google Cloud SDK for GAE/Python

#### Case of MacOS w/ Homebrew

```
$ brew cask install google-cloud-sdk
$ gcloud components install app-engine-python
```

#### Case of others

Download SDK from [official site](https://cloud.google.com/sdk/) and install it.

## ToDo

See [Issues](https://github.com/sforzando/make=jp/issues).

## Misc.

### Contributes

* [Shin'ichiro SUZUKI](shin@sforzando.co.jp)

### LICENSE

WTFPL
