#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

# This file is only used if you use `make publish` or
# explicitly specify it as your config file.

import os
import sys
sys.path.append(os.curdir)
from pelicanconf import *

# If your site is available via HTTPS, make sure SITEURL begins with https://
SITEURL = 'https://blog.gocalf.com'

STATIC_PATHS.append('CNAME')

# Not include draft posts when publish.
DRAFT_SAVE_AS = ''
DRAFT_LANG_SAVE_AS = ''

FEED_DOMAIN = SITEURL
FEED_ATOM = 'feeds/atom.xml'
FEED_ALL_ATOM = "feeds/all.atom.xml"
CATEGORY_FEED_ATOM = 'feeds/{slug}.atom.xml'

DISQUS_SITENAME = 'gocalfblog'

UTTERANCES_REPO = 'calfzhou/gocalf-blog'
UTTERANCES_THEME = 'github-light'
UTTERANCES_LABEL = 'blog-comment'

GOOGLE_ANALYTICS = 'UA-24210758-2'

RELATIVE_URLS = False

if 'assets' not in PLUGINS:
    PLUGINS.append('assets')

if 'sitemap' not in PLUGINS:
    PLUGINS.append('sitemap')

DELETE_OUTPUT_DIRECTORY = True
