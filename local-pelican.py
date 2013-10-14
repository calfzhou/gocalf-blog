#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import print_function, unicode_literals
from os import path
import sys

lib_path = path.abspath(path.join(path.dirname(sys.argv[0]), 'pelican'))
sys.path.insert(0, lib_path)

import pelican


print(pelican)
pelican.main()
