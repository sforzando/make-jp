# -*- coding: utf-8 -*-

""" TimeZone """

import datetime


class UtcTzInfo(datetime.tzinfo):
    def utcoffset(self, dt):
        return datetime.timedelta(0)

    def dst(self, dt):
        return datetime.timedelta(0)

    def tzname(self, dt):
        return "UTC"

    def olsen_name(self):
        return "UTC"


class JstTzInfo(datetime.tzinfo):
    def utcoffset(self, dt):
        return datetime.timedelta(hours=9)

    def dst(self, dt):
        return datetime.timedelta(0)

    def tzname(self, dt):
        return "JST"

    def olsen_name(self):
        return "Asia/Tokyo"
