from __future__ import absolute_import, division, print_function, unicode_literals
from sklearn.model_selection import KFold
from keras.utils import np_utils
import pandas
import numpy
from sklearn.model_selection import train_test_split
import tensorflow as tf
import tensorflow_datasets as tfds
import os

import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

from keras.models import Sequential
from keras.layers import Dense
from keras.wrappers.scikit_learn import KerasClassifier
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import KFold


# fix random seed for reproducibility
seed = 7
np.random.seed(seed)

dataframe = pd.read_csv(
    'D:\Documents\GitHub\HackMX19\DataSet.csv', header=None)
dataset = dataframe.values
# split into input (X) and output (Y) variables
X = dataset[:, 0:600].astype(float)
Y = dataset[:, 1]


# encode class values as integers
encoder = LabelEncoder()
encoder.fit(Y)
encoded_Y = encoder.transform(Y)
# convert integers to dummy variables (i.e. one hot encoded)
dummy_y = np_utils.to_categorical(encoded_Y)


# define baseline model


def baseline_model():
    # create model
    model = Sequential()
    model.add(Dense(8, input_dim=4, activation='relu'))
    model.add(Dense(3, activation='softmax'))
    # Compile model
    model.compile(loss='categorical_crossentropy',
                  optimizer='adam', metrics=['accuracy'])
    return model


estimator = KerasClassifier(build_fn=baseline_model,
                            epochs=200, batch_size=5, verbose=0)

kfold = KFold(n_splits=10, shuffle=True, random_state=seed)

results = cross_val_score(estimator, X, dummy_y, cv=kfold)
print("Baseline: %.2f%% (%.2f%%)" % (results.mean()*100, results.std()*100))
