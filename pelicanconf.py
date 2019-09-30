#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Calf'
SITENAME = 'GoCalf Blog'
SITESUBTITLE = '1/100 ALGO&amp;MATH; 1/100 IT&amp;GAME; 1/100 INFO&amp;SHARING; 1/100 WHO KNOWS'
SITEURL = 'https://blog.gocalf.com'

# Regional Settings
TIMEZONE = 'Asia/Shanghai'
DEFAULT_LANG = 'zh_cn'
# DEFAULT_DATE_FORMAT = '%Y-%m-%d'
DATE_FORMATS = {'zh_cn': '%Y-%m-%d'}

PATH = 'content'
PAGE_PATHS = ['pages']
PAGE_EXCLUDES = []
ARTICLE_PATHS = ['posts']
ARTICLE_EXCLUDES = []
STATIC_PATHS = [
    'images',
    'assets',
    'theme/images',
    # 'favicon.png',
]

# Plugins and extensions
PLUGIN_PATHS = ['plugins']
PLUGINS = [
    'extract_toc',
    'neighbors',
    'related_posts',
    'series',
    'share_post',
    'sitemap',
    'tipue_search',
]
PYGMENTS_RST_OPTIONS = {'linenos': 'table'}

SITEMAP = {
    "format": "xml",
    "priorities": {"articles": 0.8, "indexes": 0.5, "pages": 0.1},
    "changefreqs": {"articles": "monthly", "indexes": "daily", "pages": "monthly"},
}

# Appearance
THEME = 'elegant-theme'
# TYPOGRIFY = True
DEFAULT_PAGINATION = False
DISPLAY_PAGES_ON_MENU = True
DISPLAY_CATEGORIES_ON_MENU = False
NEWEST_FIRST_ARCHIVES = True

# Defaults
DEFAULT_CATEGORY = 'uncategorized'
USE_FOLDER_AS_CATEGORY = False

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

# Enable future dates, then content with dates in the future will NOT get a default status of draft.
WITH_FUTURE_DATES = True

# Tag cloud

TAG_CLOUD_STEPS = 8
TAG_CLOUD_MAX_ITEMS = 32

# URL settings
ARTICLE_URL = '{slug}'
ARTICLE_SAVE_AS = '{slug}.html'
ARTICLE_LANG_URL = '{slug}-{lang}'
ARTICLE_LANG_SAVE_AS = '{slug}-{lang}.html'

DRAFT_URL = 'drafts/{slug}'
DRAFT_SAVE_AS = 'drafts/{slug}.html'
DRAFT_LANG_URL = 'drafts/{slug}-{lang}'
DRAFT_LANG_SAVE_AS = 'drafts/{slug}-{lang}.html'

PAGE_URL = '{slug}'
PAGE_SAVE_AS = '{slug}.html'
PAGE_LANG_URL = '{slug}-{lang}'
PAGE_LANG_SAVE_AS = '{slug}-{lang}.html'

# CATEGORY_URL = 'category/{slug}/'
# CATEGORY_SAVE_AS = 'category/{slug}/index.html'
# CATEGORIES_URL = 'categories/'
# CATEGORIES_SAVE_AS = 'categories/index.html'

CATEGORY_URL = 'categories#{slug}-ref'
CATEGORY_SAVE_AS = ''
CATEGORIES_URL = 'categories'
CATEGORIES_SAVE_AS = 'categories.html'

# TAG_URL = 'tag/{slug}/'
# TAG_SAVE_AS = 'tag/{slug}/index.html'
# TAGS_URL = 'tags/'
# TAGS_SAVE_AS = 'tags/index.html'

TAG_URL = 'tags#{slug}-ref'
TAG_SAVE_AS = ''
TAGS_URL = 'tags'
TAGS_SAVE_AS = 'tags.html'

# AUTHOR_URL = 'author/{slug}/'
# AUTHOR_SAVE_AS = 'author/{slug}/index.html'
# AUTHORS_URL = False  # 'authors/'
# AUTHORS_SAVE_AS = False  # 'authors/index.html'

AUTHOR_URL = ''
AUTHOR_SAVE_AS = ''
AUTHORS_URL = ''
AUTHORS_SAVE_AS = ''

# ARCHIVES_SAVE_AS = 'archives/index.html'
# YEAR_ARCHIVE_SAVE_AS = 'archives/{date:%Y}/index.html'
# MONTH_ARCHIVE_SAVE_AS = 'archives/{date:%Y}/{date:%m}/index.html'
# DAY_ARCHIVE_SAVE_AS = False

ARCHIVES_URL = "archives"
ARCHIVES_SAVE_AS = 'archives.html'
YEAR_ARCHIVE_SAVE_AS = False
MONTH_ARCHIVE_SAVE_AS = False
DAY_ARCHIVE_SAVE_AS = False

SEARCH_URL = "search"

# Feeds
# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

SLUGIFY_SOURCE = 'basename'

SLUG_REGEX_SUBSTITUTIONS = (
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

# Social
SOCIAL = (
    ('Gmail', 'mailto:calf.zhou+blog@gmail.com'),
    ('Github', 'https://github.com/calfzhou'),
    ('Telegram', 'https://t.me/calfzhou'),
    ('Facebook', 'https://www.facebook.com/calfzhou'),
    ('Twitter', 'https://twitter.com/calfzhou'),
)

# Elegant theme
DIRECT_TEMPLATES = ('index', 'tags', 'categories', 'archives', 'search', '404')
USE_SHORTCUT_ICONS = True

# Elegant Labels
SOCIAL_PROFILE_LABEL = "Stay in Touch"
RELATED_POSTS_LABEL = "Keep Reading"
SHARE_POST_INTRO = "Like this post? Share on:"
COMMENTS_INTRO = "So what do you think? Did I miss something? Is any part unclear? Leave your comments below."

# SMO
TWITTER_USERNAME = 'calfzhou'

# Legal
SITE_LICENSE = '&copy; 2019 gocalf.com'
HOSTED_ON = {'name': 'GitHub Pages', 'url': 'https://pages.github.com/'}

# SEO
SITE_DESCRIPTION = 'GoCalf Blog'

# Landing Page
# TODO

# Blogroll

LINKS = (
    # 快乐生活，幽它一默
    ('Bebluesky', 'http://www.bebluesky.com/'),
    # 以提供Python知识为目标，原创并收集Python编程相关的知识
    ('Python俱乐部', 'http://www.pythonclub.org/'),
    # 关注生活，关注科技，关注互联网，了解互联网，了解科技，了解生活！
    ('东华博客', 'http://www.truevue.org/'),
    # 数学、金融、计算机
    ('阅微堂', 'http://zhiqiang.org/blog/'),
    ('Pelican', 'http://getpelican.com/'),
    ('Python.org', 'http://python.org/'),
    ('Jinja2', 'http://jinja.pocoo.org/'),
)
