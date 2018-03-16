#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import webapp2


class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write('Good afternoon, World!')


app = webapp2.WSGIApplication([
    ('/', MainPage),
], debug=True)
