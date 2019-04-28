
import pandas as pd
import numpy as np
import pickle
from keras.preprocessing import text
from keras.preprocessing.text import Tokenizer
from keras.models import Sequential
from keras.layers import Activation, Dense, Dropout
from sklearn.preprocessing import LabelBinarizer
from sklearn.preprocessing import LabelEncoder
import sklearn.datasets as skds
from pathlib import Path


data = pd.read_csv(
    'D:\Documents\GitHub\HackMX19\DataSet.csv')


train_size = int(len(data) * .8)
train_posts = data['Fake'][:train_size]
train_tags = data['Real'][:train_size]
test_posts = data['Fake'][train_size:]
test_tags = data['Real'][train_size:]

vocab_size = 500
tokenize = text.Tokenizer(num_words=vocab_size)
tokenize.fit_on_texts(train_posts)

x_train = tokenize.texts_to_matrix(train_posts)

encoder = LabelBinarizer()
encoder.fit(train_tags)
y_train = encoder.transform(train_tags)
y_test = encoder.transform(test_tags)


model = Sequential()

model.add(Dense(512, input_shape=(vocab_size,)))
model.add(Activation('relu'))

model.add(Dense(476))
model.add(Activation('softmax'))

model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

history = model.fit(x_train, y_train,
                    batch_size=1000,
                    epochs=2,
                    verbose=1,
                    validation_split=0.1)

score = model.evaluate(x_train, y_train,
                       batch_size=1000, verbose=1)
print('Test score:', score[0])
print('Test accuracy:', score[1])
