import pandas as pd
import numpy as np
#import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

data = pd.read_csv('./Iris.csv')
data['Species'].unique()

data_setosa = data[data['Species'] == 'setosa']
data_versicolor = data[data['Species'] == 'versicolor']
data_virginica = data[data['Species'] == 'virginica']

#Calcular veotres média
#Setosa
data_setosa[['Sepal length', 'Sepal width', 'Petal length', 'Petal width']] = data_setosa[['Sepal length', 'Sepal width', 'Petal length', 'Petal width']].replace(',', '.', regex=True).astype(float)
vetor_media_setosa = data_setosa[['Sepal length', 'Sepal width', 'Petal length', 'Petal width']].mean().to_numpy()

#Versicolor
data_versicolor[['Sepal length', 'Sepal width', 'Petal length', 'Petal width']] = data_versicolor[['Sepal length', 'Sepal width', 'Petal length', 'Petal width']].replace(',', '.', regex=True).astype(float)
vetor_media_versicolor = data_versicolor[['Sepal length', 'Sepal width', 'Petal length', 'Petal width']].mean().to_numpy()

#


