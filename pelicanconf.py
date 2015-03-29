#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'yew1eb'
SITENAME = u"yew1eb's blog"

SITEURL = 'yew1eb.github.io'

# 时间日期设置
TIMEZONE = 'Asia/Shanghai'
DEFAULT_DATE = 'fs'  # use filesystem's mtime
DATE_FORMATS = {
        'zh_CN': '%Y-%m-%d %H:%M:%S',
}
DEFAULT_DATE_FORMAT = '%Y-%m-%d %H:%M:%S'


# 文章格式设置
DEFAULT_LANG = u'ch'
DEFAULT_PAGINATION = 7
SUMMARY_MAX_LENGTH = 10
FILENAME_METADATA = '(?P<slug>.*)'
RELATIVE_URLS = True

# 最新日志个数
RECENT_POST_COUNT= 5
DISPLAY_RECENT_POSTS_ON_SIDEBAR = True

# use directory name as category if not set
USE_FOLDER_AS_CATEGORY = True
DEFAULT_CATEGORY = '未分类'

# 静态目录和页面设置
EXTRA_PATH_METADATA = {
        'extra/favicon.ico' : { 'path': 'favicon.ico' },
        'extra/robots.txt' : { 'path': 'robots.txt' },
}

STATIC_PATHS = [
    'static',    
    'extra/robots.txt',
    'extra/favicon.ico',
	'images', 'pdfs', 'CNAME', 'lovebai'
    ]
	
#文章 *.md 放置目录	
ARTICLE_PATHS = ['posts']
#文章 生成的*.html以及URL路径
ARTICLE_SAVE_AS = '{date:%Y}/{date:%m}/{slug}.html'
ARTICLE_URL = ARTICLE_SAVE_AS
#网页URL路径
PAGE_SAVE_AS = '{slug}.html'
PAGE_URL  = PAGE_SAVE_AS

#生成 文章分类 路径
CATEGORY_SAVE_AS = 'category/{slug}.html'
CATEGORY_URL = CATEGORY_SAVE_AS
CATEGORIES_SAVE_AS = 'category/index.html'

#生成 文章标签 路径
TAG_SAVE_AS = 'tag/{slug}.html'
TAG_URL  = TAG_SAVE_AS
TAGS_SAVE_AS = 'tag/index.html'

# 文章归档
ARCHIVES_SAVE_AS = 'archives.html'  # The location to save the article archives page.
YEAR_ARCHIVE_SAVE_AS = False    # The location to save per-year archives of your posts.
MONTH_ARCHIVE_SAVE_AS = False   # The location to save per-month archives of your posts.
DAY_ARCHIVE_SAVE_AS = False # The location to save per-day archives of your posts.

# 不显示 作者页面
AUTHOR_SAVE_AS = ''
AUTHORS_SAVE_AS = ''
SHOW_ARTICLE_AUTHOR = False # 不显示作者

# 标签云 配置
TAG_CLOUD_STEPS = 4 # Count of different font sizes in the tag cloud.
TAG_CLOUD_MAX_ITEMS = 100  # Maximum number of tags in the cloud.


# Feed generation is usually not desired when developing
# RSS feeds 配置
FEED_DOMAIN = SITEURL
FEED_ALL_RSS = 'feed.xml'
FEED_MAX_ITEMS = 20
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

# 友情链接
LINKS =  (
        ('我的csdn博客','http://blog.csdn.net/yew1eb/'),
        ('Pelican', 'http://getpelican.com/'),
        ('Python.org', 'http://python.org/'),
        ('Jinja2', 'http://jinja.pocoo.org/'),
        # ('You can modify those links ', '#'),
         )

# Social widget
#SOCIAL = (('Github', 'https://github.com/yew1eb'),
#		  ('Weibo', 'http://weibo.com/yew1eb'),)

# JiaThis 分享图标
JIATHIS_PROFILE = True 		  
		  
# 多说评论
DUOSHUO_SITENAME = "yew1eb"


# 主题配置
THEME = 'themes/bootstrap3' 
BOOTSTRAP_THEME = 'spacelab'
PYGMENTS_STYLE = 'monokai'

# 导航栏目
MENUITEMS =(('csdn博客(ACM)','http://blog.csdn.net/yew1eb/'),) #(('首页', '#'), )
DISPLAY_PAGES_ON_MENU = True #显示 pages页面
DISPLAY_CATEGORIES_ON_MENU = False

# 内容部分配置
## breadcrumbs 部分
DISPLAY_BREADCRUMBS = False
DISPLAY_CATEGORY_IN_BREADCRUMBS = False
DISPLAY_ARTICLE_INFO_ON_INDEX = True  #显示 article_info
PDF_PROCESSOR = False # 生成pdf格式的文章
DISPLAY_NEIGHBORS = True #显示上一篇和下一篇文章链接

# 右侧栏配置
## 右侧栏显示标签云
DISPLAY_TAGS_ON_SIDEBAR = True 
DISPLAY_CATEGORIES_ON_SIDEBAR = True #显示文章分类页面

# 插件配置
PLUGIN_PATHS = [u"plugins"]
PLUGINS = ["sitemap", "neighbors"] # "gzip_cache"
## 配置sitemap 插件
SITEMAP = {
    "format": "xml",
    "priorities": {
        "articles": 0.7,
        "indexes": 0.5,
        "pages": 0.3,
    },
    "changefreqs": {
        "articles": "monthly",
        "indexes": "daily",
        "pages": "monthly",
    }
}

## 配置 neighbors 插件
DISPLAY_NEIGHBORS = True

#--------------------------------------------------------------
# Google Analytics
## GOOGLE_ANALYTICS = 'UA-49041053-1'

# Discus System
## DISQUS_SITENAME = "" 
