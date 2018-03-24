#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

SITENAME = 'GoCalf Blog'
SITEURL = 'http://www.gocalf.com/blog'
AUTHOR = 'Calf'

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

TIMEZONE = 'Asia/Shanghai'

PAGE_PATHS = ['pages']
PAGE_EXCLUDES = []
ARTICLE_PATHS = ['posts']
ARTICLE_EXCLUDES = []
STATIC_PATHS = [
    'images',
    'assets',
    #'favicon.png',
]

USE_FOLDER_AS_CATEGORY = False
DEFAULT_CATEGORY = 'uncategorized'

SLUGIFY_SOURCE = 'basename'

DISPLAY_PAGES_ON_MENU = True
DISPLAY_CATEGORIES_ON_MENU = False

#DIRECT_TEMPLATES = ('index', 'tags', 'categories', 'archives')  # No authors

PLUGIN_PATHS = ['plugins']
PLUGINS = ['neighbors']

PYGMENTS_RST_OPTIONS = {'linenos': 'none'}

# Enable future dates, then content with dates in the future will NOT get a default status of draft.
WITH_FUTURE_DATES = True

# URL settings #

ARTICLE_URL = '{slug}.html'
ARTICLE_SAVE_AS = '{slug}.html'
ARTICLE_LANG_URL = '{slug}-{lang}.html'
ARTICLE_LANG_SAVE_AS = '{slug}-{lang}.html'

DRAFT_URL = 'drafts/{slug}.html'
DRAFT_SAVE_AS = 'drafts/{slug}.html'
DRAFT_LANG_URL = 'drafts/{slug}-{lang}.html'
DRAFT_LANG_SAVE_AS = 'drafts/{slug}-{lang}.html'

PAGE_URL = '{slug}.html'
PAGE_SAVE_AS = '{slug}.html'
PAGE_LANG_URL = '{slug}-{lang}.html'
PAGE_LANG_SAVE_AS = '{slug}-{lang}.html'

CATEGORY_URL = 'category/{slug}/'
CATEGORY_SAVE_AS = 'category/{slug}/index.html'
CATEGORIES_URL = 'categories/'
CATEGORIES_SAVE_AS = 'categories/index.html'

TAG_URL = 'tag/{slug}/'
TAG_SAVE_AS = 'tag/{slug}/index.html'
TAGS_URL = 'tags/'
TAGS_SAVE_AS = 'tags/index.html'

AUTHOR_URL = 'author/{slug}/'
AUTHOR_SAVE_AS = 'author/{slug}/index.html'
AUTHORS_URL = False  # 'authors/'
AUTHORS_SAVE_AS = False  # 'authors/index.html'

ARCHIVES_SAVE_AS = 'archives/index.html'
YEAR_ARCHIVE_SAVE_AS = 'archives/{date:%Y}/index.html'
MONTH_ARCHIVE_SAVE_AS = 'archives/{date:%Y}/{date:%m}/index.html'
DAY_ARCHIVE_SAVE_AS = False

SLUG_SUBSTITUTIONS = (
    # Categories
    ('hu lian wang', 'web'),
    ('jian zhan', 'site'),
    ('cao zuo xi tong', 'os'),
    ('shu ma dian zi', 'digital'),
    ('ying jian', 'hardware'),
    ('cheng xu kai fa', 'programming'),
    ('suan fa', 'algorithm'),
    ('ying shi yin le', 'multimedia'),
    ('ri ji', 'diary'),
    ('you xi', 'game'),
    ('tou nao feng bao', 'brainstorm'),
    ('you yong zhi shi', 'knowledge'),
    ('shu xue', 'math'),
    ('wu li', 'physics'),
)

# Date format and locale #
DEFAULT_DATE_FORMAT = '%Y-%m-%d'

# Template pages #

# Path metadata #

# Feed settings #

# Feed generation is usually not desired when developing
FEED_ATOM = None
FEED_RSS = None
FEED_ALL_ATOM = None
FEED_ALL_RSS = None
CATEGORY_FEED_ATOM = None
CATEGORY_FEED_RSS = None
TAG_FEED_ATOM = None
TAG_FEED_RSS = None

# Pagination #

DEFAULT_PAGINATION = 8

PAGINATION_PATTERNS = (
    (1, '{base_name}/', '{base_name}/index.html'),
    (2, '{base_name}/page/{number}/', '{base_name}/page/{number}/index.html'),
)

# Tag cloud #

TAG_CLOUD_STEPS = 8
TAG_CLOUD_MAX_ITEMS = 32

# Translations #

DEFAULT_LANG = 'zh_cn'
TRANSLATION_FEED_ATOM = None
TRANSLATION_FEED_RSS = None

# Ordering content #
NEWEST_FIRST_ARCHIVES = True

# Themes #

THEME = 'octopress-theme'
#THEME = 'notmyidea'

SITESUBTITLE = '1/100 ALGO&amp;MATH; 1/100 IT&amp;GAME; 1/100 INFO&amp;SHARING; 1/100 WHO KNOWS.'
#DISQUS_SITENAME = 'gocalfblog'
#GOOGLE_ANALYTICS = 'UA-XXXXXXXX-X'
MENUITEMS = [
    ('Home', 'http://www.gocalf.com/blog'),
]

LINKS = (
    ('Bebluesky', 'http://www.bebluesky.com/'),  # 快乐生活，幽它一默
    ('Python俱乐部', 'http://www.pythonclub.org/'),  # 以提供Python知识为目标，原创并收集Python编程相关的知识
    ('东华博客', 'http://www.truevue.org/'),  # 关注生活，关注科技，关注互联网，了解互联网，了解科技，了解生活！
    ('阅微堂', 'http://zhiqiang.org/blog/'), # 数学、金融、计算机
    ('Pelican', 'http://getpelican.com/'),
    ('Python.org', 'http://python.org/'),
    ('Jinja2', 'http://jinja.pocoo.org/'),
)

SOCIAL = (
    ('Email', 'mailto:calf.zhou+blog@gmail.com'),
    ('Weibo', 'http://weibo.com/calfzhou'),
    ('Github', 'https://github.com/calfzhou'),
    ('Facebook', 'https://www.facebook.com/calfzhou'),
    ('Twitter', 'https://twitter.com/calfzhou'),
)

# For Elegant theme #

THEME = 'elegant-theme'

STATIC_PATHS.append('theme/images')
USE_SHORTCUT_ICONS = True

TWITTER_USERNAME = 'calfzhou'
GOOGLE_PLUS_PROFILE_URL = 'https://plus.google.com/112983042847560253980/posts'

DIRECT_TEMPLATES = ('index', 'tags', 'categories', 'archives', 'search', '404')

PLUGINS = ['tipue_search', 'sitemap', 'extract_toc', 'neighbors', 'related_posts', 'series', 'share_post']

SITEMAP = {
    'format': 'xml',
}

# MD_EXTENSIONS = ['codehilite(css_class=highlight)', 'extra', 'headerid', 'toc', 'fenced_code', 'footnotes']
PYGMENTS_RST_OPTIONS = {'linenos': 'table'}

CATEGORY_URL = 'categories.html#{slug}-ref'
CATEGORY_SAVE_AS = ''
CATEGORIES_URL = 'categories.html'
CATEGORIES_SAVE_AS = 'categories.html'
TAG_URL = 'tags.html#{slug}-ref'
TAG_SAVE_AS = ''
TAGS_URL = 'tags.html'
TAGS_SAVE_AS = 'tags.html'
AUTHOR_URL = ''
AUTHOR_SAVE_AS = ''
AUTHORS_URL = ''
AUTHORS_SAVE_AS = ''
ARCHIVES_SAVE_AS = 'archives.html'
YEAR_ARCHIVE_SAVE_AS = False
MONTH_ARCHIVE_SAVE_AS = False

DEFAULT_PAGINATION = False

# End #
