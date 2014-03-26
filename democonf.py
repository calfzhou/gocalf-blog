#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

# This file is only used if you use `make publish` or
# explicitly specify it as your config file.

import os
import sys
sys.path.append(os.curdir)
from pelicanconf import *

ARTICLE_DIR = 'posts/2012'
STATIC_PATHS = [
    'images/2012',
    'assets/2012',
    'theme/images',
]
#THEME = 'elegant'
SITEURL = 'http://www.gocalf.com/blog'
#RELATIVE_URLS = False
DISQUS_SITENAME = 'gocalfblog'

SITE_DESCRIPTION = u'My name is Talha Mansoor \u2015 a software engineer who gets things done. I am talha131 at Github and @talham_ at twitter. I design and build software products for iOS and OSX. I work on Jump Desktop which is a remote desktop application for iOS, OSX and Android. This is my personal blog.'
PROJECTS = [
        {
            'name': 'Elegant',
            'url':
            'http://oncrashreboot.com/pelican-elegant',
            'description': 'A clean and distraction free Pelican theme, with'
            ' search and a'
            ' lot more unique features. Built with Jinja2 and Bootstrap'},
        {
            'name': 'Logpad + Duration',
            'url':
            'https://github.com/talha131/logpad-plus-duration#logpad--duration',
            'description': 'Vim plugin to emulate Windows Notepad logging feature,'
            ' and log duration of each entry'},
        {
            'name': 'Pelican',
            'url':
            'https://github.com/getpelican/pelican/commits?author=talha131',
            'description': 'Static site generator that supports Markdown and'
            ' reST syntax'},
        {
            'name': 'Pelican Plugins',
            'url':
            'https://github.com/getpelican/pelican-plugins/commits?author=talha131',
            'description': 'Bunch of plugins for Pelican blog engine'},
        {
            'name': 'Asana to Github Issues',
            'url': 'https://github.com/talha131/AsanaToGithub#asana-to-github',
            'description': 'Command-line program to move your tasks from Asana'
            ' projects to Github issues'},
        {
            'name': 'Asana',
            'url':
            'https://github.com/pandemicsyn/asana/commits?author=talha131',
            'description': 'Python Asana API bindings'},
        {
            'name': 'Ctags',
            'url':
            'https://github.com/fishman/ctags/commits?author=talha131',
            'description': 'Exuberant Ctags clone with ObjectiveC and CSS support'},
        {
            'name': 'Wasavi',
            'url':
            'https://github.com/akahuku/wasavi/commits?author=talha131',
            'description': 'A browser extension that changes textarea element to'
            ' Vi editor'
            }]
LANDING_PAGE_ABOUT = {'title': 'I design and build software products for iOS and OSX',
        'details': """<div itemscope itemtype="http://schema.org/Person"><p>My name
        is <span itemprop="name">Talha Mansoor</span>.
       I am <a href="https://github.com/talha131/" title="My Github
       profile" itemprop="url"><span itemprop="nickname">talha131</span></a> at Github and <a
       href="https://twitter.com/talham_/" title="My Twitter
       profile" itemprop="url">@talham_</a> at twitter. You can also reach me via <a
       href="mailto:talha131@gmail.com" title="My email
       address" itemprop="email">email</a>.</p><p>I work on <a href="http://jumpdesktop.com/"
       title="Jump Desktop" itemprop="affiliation">Jump Desktop</a> which is a remote desktop
       application for iOS, OSX and Android. I play a broad role there - which
       includes research, product design, engineering and deployment. I also
       lend a hand in user support.</p><p>I try to contribute to society by
       striving to create great software products that make people's lives
       easier. I believe software is the most effective way to touch others'
       lives in our day and time.</p><p>I mostly work in C, C++ and Objective-C
       on OSX and Linux, I also dabble in Python, Vim-L and JavaScript. I do not
       pigeonhole myself to specific languages or frameworks. A good developer
       is receptive and has the ability to learn new technologies. I also often
       contribute to open source projects and beta test startup
       products.</p><p>Besides programming, I <a
       href="https://www.fitocracy.com/profile/Andrew-Dufresne/" title="My
       Fitocracy profile" itemprop="url">exercise</a> and <a
       href="http://www.goodreads.com/talha131" title="My GoodReads
       profile" itemprop="url">read books</a> regularly. To be a stronger and better version of
       myself!</p><p>English is my second language. I am also learning <a
       href="http://www.duolingo.com/talha131" title="My Duolingo
       profile" itemprop="url">German from Duolingo</a>.</p></div>""" }
