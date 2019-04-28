from __future__ import absolute_import, division, print_function, unicode_literals

import tensorflow as tf

import tensorflow_datasets as tfds
import os

DIRECTORY_URL = ''
FILE_NAMES = ['test_valid.txt', 'test_fake.txt']

for name in FILE_NAMES:
  text_dir = tf.keras.utils.get_file(name, origin=DIRECTORY_URL+name)
  
parent_dir = os.path.dirname(text_dir)

parent_dir