import pandas as pd
import numpy as np
#import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from classificador_distancia_minima import manualMinDistanceClassifier
from perceptron_regra_delta import perceptronDelta
from perceptron_simples import perceptron

# --------Quesito 1--------
#---------------Classificador de Distância Mínima---------------
data = pd.read_csv('./Iris.csv', nrows=100) #Ler apenas as duas primeiras classes

data.iloc[:, :4] = data.iloc[:, :4].replace(',', '.', regex=True) #Transformar todos os . em ,

data.iloc[:, :4] = data.iloc[:, :4].astype(float) #Transformar todos os dados para o tipo float

X = data.iloc[:, :4].values #Pegar todos os vetores

y = data.iloc[:, 4].values #Pegar todas as classes dos vetores

# Separando dados em treino e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=40)

# Exemplo de treino
minimalDistance = manualMinDistanceClassifier()
minimalDistance.fit(X_train, y_train)

y_pred_knn = minimalDistance.predict(X_test)

# Calcular manualmente a matriz de confusão
true_setosa_knn = sum((y_test == 'setosa') & (y_pred_knn == 'setosa'))
false_setosa_knn = sum((y_test == 'versicolor') & (y_pred_knn == 'setosa'))
true_versicolor_knn = sum((y_test == 'versicolor') & (y_pred_knn == 'versicolor'))
false_versicolor_knn = sum((y_test == 'setosa') & (y_pred_knn == 'versicolor'))

# Imprimir a matriz de confusão
print("Matriz de Confusão KNN:")
print(f"             Pred. Setosa    Pred. Versicolor")
print(f"Real Setosa       {true_setosa_knn}               {false_versicolor_knn}")
print(f"Real Versicolor   {false_setosa_knn}               {true_versicolor_knn}")

#---------------Perceptron sem Regra Delta---------------
X_perceptron = data.iloc[:, :4].values #Pegar todos os vetores

y_perceptron = data.iloc[:, 4].values #Pegar todas as classes dos vetores

#Aumentar vetores para incluir bias
# Cria uma coluna de uns com o mesmo número de linhas que arr
ones_column = np.ones((X_perceptron.shape[0], 1))
# Concatena a coluna de uns ao final de cada vetor
X_perceptron = np.hstack((X_perceptron, ones_column))

# Separando dados em treino e teste
X_train_perceptron, X_test_perceptron, y_train_perceptron, y_test_perceptron = train_test_split(X_perceptron, y_perceptron, test_size=0.3, random_state=10)

# Certifique-se de que a classe perceptron aceite o argumento para o tamanho do vetor
perceptronBin = perceptron()

# Exemplo de treino
perceptronBin.fit(X_train_perceptron, y_train_perceptron, epochs=10)

# Previsão
y_pred_perceptron = perceptronBin.predict(X_test_perceptron)


# accuracy_percptron = accuracy_score(y_test_perceptron, y_pred_perceptron)

print("Classes verdadeiras: ", y_test_perceptron)
print("Classes preditas: ", y_pred_perceptron)
# print("Acurácia:", accuracy_percptron)

# Calcular manualmente a matriz de confusão
true_setosa_perceptron = sum((y_test_perceptron == 'setosa') & (y_pred_perceptron == 'setosa'))
print((y_pred_perceptron == 'setosa'))
false_setosa_perceptron = sum((y_test_perceptron == 'versicolor') & (y_pred_perceptron == 'setosa'))
true_versicolor_perceptron = sum((y_test_perceptron == 'versicolor') & (y_pred_perceptron == 'versicolor'))
false_versicolor_perceptron = sum((y_test_perceptron == 'setosa') & (y_pred_perceptron == 'versicolor'))

# Imprimir a matriz de confusão
print("Matriz de Confusão Perceptron:")
print(f"             Pred. Setosa    Pred. Versicolor")
print(f"Real Setosa       {true_setosa_perceptron}               {false_versicolor_perceptron}")
print(f"Real Versicolor   {false_setosa_perceptron}               {true_versicolor_perceptron}")


#--------------Perceptron Delta--------------

# Carregar as primeiras 100 linhas do arquivo CSV
data_total = pd.read_csv('./Iris.csv')

# Apagar as linhas de índice 50 até 99 (pois o índice começa em 0)
data_perceptron_delta = data.drop(data.index[50:100])

X_perceptron_delta = data_perceptron_delta.iloc[:, :4].values #Pegar todos os vetores
Y_perceptron_delta = data_perceptron_delta.iloc[:, 4].values #Pegar todas as classes dos vetores

#Aumentar vetores para incluir bias
# Cria uma coluna de uns com o mesmo número de linhas que arr
ones_column = np.ones((X_perceptron_delta.shape[0], 1))
# Concatena a coluna de uns ao final de cada vetor
X_perceptron_delta = np.hstack((X_perceptron_delta, ones_column))

# Separando dados em treino e teste
X_train_perceptron_delta, X_test_perceptron_delta, y_train_perceptron_delta, y_test_perceptron_delta = train_test_split(X_perceptron_delta, Y_perceptron_delta, test_size=0.3, random_state=12)
perceptronDelta = perceptronDelta()

# Exemplo de treino
perceptronDelta.fit(X_train_perceptron_delta, y_train_perceptron_delta, epochs=10)

# Previsão
y_pred_perceptron_delta = perceptronDelta.predict(X_test_perceptron_delta)

# Calcular manualmente a matriz de confusão
true_setosa_perceptron_delta = sum((y_test_perceptron_delta == 'setosa') & (y_pred_perceptron_delta == 'setosa'))
false_setosa_perceptron_delta = sum((y_test_perceptron_delta == 'virgínica') & (y_pred_perceptron_delta == 'setosa'))
true_virginica_perceptron_delta = sum((y_test_perceptron_delta == 'virgínica') & (y_pred_perceptron_delta == 'virgínica'))
false_virginica_perceptron_delta = sum((y_test_perceptron_delta == 'setosa') & (y_pred_perceptron_delta == 'virgínica'))

# Imprimir a matriz de confusão
print("Matriz de Confusão Perceptron Delta:")
print(f"             Pred. Setosa    Pred. Versicolor")
print(f"Real Setosa       {true_setosa_perceptron_delta}               {false_virginica_perceptron_delta}")
print(f"Real Virgínica   {false_setosa_perceptron_delta}               {true_virginica_perceptron_delta}")

