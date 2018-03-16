#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import webapp2
from os import environ


class MainPage(webapp2.RequestHandler):
    def get(self):
        e = environ['SENDGRID_API_KEY']
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write(e)


app = webapp2.WSGIApplication([
    ('/', MainPage),
], debug=True)
