import pandas as pd
import numpy as np
#import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

#data = pd.read_csv('/content/drive/MyDrive/arquivo/Iris data - Iris.csv')
data = pd.read_csv('./Iris.csv', nrows=100) #Ler apenas as duas primeiras classes

data.iloc[:, :4] = data.iloc[:, :4].replace(',', '.', regex=True) #Transformar todos os . em ,

data.iloc[:, :4] = data.iloc[:, :4].astype(float) #Transformar todos os dados para o tipo float

X = data.iloc[:, :4].values #Pegar todos os vetores

y = data.iloc[:, 4].values #Pegar todas as classes dos vetores

#Aumentar vetores para incluir bias
# Cria uma coluna de uns com o mesmo número de linhas que arr
ones_column = np.ones((X.shape[0], 1))
# Concatena a coluna de uns ao final de cada vetor
X = np.hstack((X, ones_column))

# Separando dados em treino e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=55)

class perceptronDelta:
  def __init__(self):
    self.weights = np.zeros(5)
    #self.bias = 0
    self.learn_rate = 0.01

  def fit(self, X, y, epochs):
    quantidade_amostras = len(X)

    for epoch in range(epochs):
      for i in range(quantidade_amostras):
        dotProduct = self.calculate_dot_product(X[i])

        #Verificar classe
        if y[i] == 'setosa' and dotProduct <= 0:
          self.update_weights_class1(X[i])

        elif y[i] == 'versicolor' and dotProduct >= 0:
          self.update_weights_class2(X[i])

  def predict(self, X):
    y_pred = []
    for i in range(len(X)):
      dotProduct = self.calculate_dot_product(X[i])
      if dotProduct > 0:
        y_pred.append('setosa')
      else:
        y_pred.append('versicolor')
    return np.array(y_pred)

  def predict_one(self, x):
    dotProduct = self.calculate_dot_product(x)
    if dotProduct > 0:
      return print('setosa')
    else:
      return print('virginica')

  def calculate_dot_product(self, x):
    return sum(x * w for x, w in zip(x, self.weights))

  def update_weights_class1(self, currentVector):
    for i in range(len(self.weights)):
      self.weights[i] += self.learn_rate * ((1 - (self.weights[i] * currentVector[i])) * currentVector[i])

  def update_weights_class2(self, currentVector):
    for i in range(len(self.weights)):
      self.weights[i] += self.learn_rate * ((-1 - (self.weights[i] * currentVector[i])) * currentVector[i])


# perceptron = perceptronDelta(X_train.shape[1])
# perceptron.fit(X_train, y_train, epochs=10)

# y_pred = perceptron.predict(X_test)
# accuracy = accuracy_score(y_test, y_pred)

# print("Classes verdadeiras: ", y_test)
# print("Classes preditas: ", y_pred)
# print("Acurácia:", accuracy)

#perceptron.predict_one(np.array([4.8, 3, 1.4, 0.1, 1]))