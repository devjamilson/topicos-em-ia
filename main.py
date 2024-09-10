import pandas as pd
import numpy as np
#import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from classificador_distancia_minima import manualMinDistanceClassifier
from perceptron_regra_delta import perceptronDelta
from perceptron_simples import perceptron
from utils import UtilsCalcs

# Carregar o arquivo CSV inteiro
data_total = pd.read_csv('./Iris.csv')

# --------Quesito 1--------
#---------------Classificador de Distância Mínima---------------

#Pegar apenas as classes setosa e versicolor para o Classificador de distância mínima e Perceptron Simples
data_setosa_versicolor = data_total.drop(data_total.index[100:150]) 

data_setosa_versicolor.iloc[:, :4] = data_setosa_versicolor.iloc[:, :4].replace(',', '.', regex=True) #Transformar todos os . em ,

data_setosa_versicolor.iloc[:, :4] = data_setosa_versicolor.iloc[:, :4].astype(float) #Transformar todos os dados para o tipo float

X = data_setosa_versicolor.iloc[:, :4].values #Pegar todos os vetores

y = data_setosa_versicolor.iloc[:, 4].values #Pegar todas as classes dos vetores

# Separando dados em treino e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=45)

# Exemplo de treino
minimalDistance = manualMinDistanceClassifier()
minimalDistance.fit(X_train, y_train)
minimalDistance.print_function()

y_pred_knn = minimalDistance.predict(X_test)

# Calcular e imprimir a matriz de confusão usando a função refatorada
matriz_conf_knn = UtilsCalcs.matriz_confusao_manual(y_test, 'setosa', y_pred_knn, 'versicolor')

print("Matriz de Confusão KNN:")
print(f"             Pred. Setosa    Pred. Versicolor")
print(f"Real Setosa       {matriz_conf_knn[0, 0]}               {matriz_conf_knn[1, 0]}")
print(f"Real Versicolor   {matriz_conf_knn[0, 1]}               {matriz_conf_knn[1, 1]}")

# Calcular as métricas de avaliação usando a função refatorada
acuracia_knn, precisao_knn, revocacao_knn, f1_knn = UtilsCalcs.calcular_metricas(y_test, 'setosa', y_pred_knn, 'versicolor')

# Imprimir as métricas de avaliação
print("\nMétricas de Avaliação KNN:")
print(f"Acurácia: {acuracia_knn:.4f}")
print(f"Precisão: {precisao_knn:.4f}")
print(f"Revocação: {revocacao_knn:.4f}")
print(f"f1_knn-Score: {f1_knn:.4f}")

#---------------Perceptron sem Regra Delta---------------
X_perceptron = data_setosa_versicolor.iloc[:, :4].values #Pegar todos os vetores

y_perceptron = data_setosa_versicolor.iloc[:, 4].values #Pegar todas as classes dos vetores

#Aumentar vetores para incluir bias
# Cria uma coluna de uns com o mesmo número de linhas que arr
ones_column = np.ones((X_perceptron.shape[0], 1))
# Concatena a coluna de uns ao final de cada vetor
X_perceptron = np.hstack((X_perceptron, ones_column))

# Separando dados em treino e teste
X_train_perceptron, X_test_perceptron, y_train_perceptron, y_test_perceptron = train_test_split(X_perceptron, y_perceptron, test_size=0.3, random_state=45)

# Certifique-se de que a classe perceptron aceite o argumento para o tamanho do vetor
perceptronBin = perceptron()

# Exemplo de treino
perceptronBin.fit(X_train_perceptron, y_train_perceptron, epochs=10)

# Previsão
y_pred_perceptron = perceptronBin.predict(X_test_perceptron)


# accuracy_percptron = accuracy_score(y_test_perceptron, y_pred_perceptron)

# print("Classes verdadeiras: ", y_test_perceptron)
# print("Classes preditas: ", y_pred_perceptron)
# print("Acurácia:", accuracy_percptron)

# Calcular e imprimir a matriz de confusão usando a função refatorada
matriz_conf_perceptron = UtilsCalcs.matriz_confusao_manual(y_test_perceptron, 'setosa', y_pred_perceptron, 'versicolor')

print("Matriz de Confusão Perceptron:")
print(f"             Pred. Setosa    Pred. Versicolor")
print(f"Real Setosa       {matriz_conf_perceptron[0, 0]}               {matriz_conf_perceptron[1, 0]}")
print(f"Real Versicolor   {matriz_conf_perceptron[0, 1]}               {matriz_conf_perceptron[1, 1]}")

# Calcular as métricas de avaliação para o Perceptron Simples
acuracia_perceptron, precisao_perceptron, revocacao_perceptron, f1_perceptron = UtilsCalcs.calcular_metricas(y_test_perceptron, 'setosa', y_pred_perceptron, 'versicolor')

# Imprimir as métricas de avaliação para Perceptron Simples
print("\nMétricas de Avaliação Perceptron Simples:")
print(f"Acurácia: {acuracia_perceptron:.4f}")
print(f"Precisão: {precisao_perceptron:.4f}")
print(f"Revocação: {revocacao_perceptron:.4f}")
print(f"F1-Score: {f1_perceptron:.4f}")


#--------------Perceptron Delta--------------


# Pegar apenas as classes setosa e virginica
data_setosa_virginica = data_total.drop(data_total.index[50:100])

data_setosa_virginica.iloc[:, :4] = data_setosa_virginica.iloc[:, :4].replace(',', '.', regex=True) #Transformar todos os . em ,

data_setosa_virginica.iloc[:, :4] = data_setosa_virginica.iloc[:, :4].astype(float) #Transformar todos os dados para o tipo float

X_perceptron_delta = data_setosa_virginica.iloc[:, :4].values #Pegar todos os vetores
Y_perceptron_delta = data_setosa_virginica.iloc[:, 4].values #Pegar todas as classes dos vetores

#Aumentar vetores para incluir bias
# Cria uma coluna de uns com o mesmo número de linhas que arr
ones_column = np.ones((X_perceptron_delta.shape[0], 1))
# Concatena a coluna de uns ao final de cada vetor
X_perceptron_delta = np.hstack((X_perceptron_delta, ones_column))

# Separando dados em treino e teste
X_train_perceptron_delta, X_test_perceptron_delta, y_train_perceptron_delta, y_test_perceptron_delta = train_test_split(X_perceptron_delta, Y_perceptron_delta, test_size=0.3, random_state=7)
perceptronDelta = perceptronDelta()

# Exemplo de treino
perceptronDelta.fit(X_train_perceptron_delta, y_train_perceptron_delta, epochs=10)

# Previsão
y_pred_perceptron_delta = perceptronDelta.predict(X_test_perceptron_delta)
# print(y_pred_perceptron_delta)

# Calcular e imprimir a matriz de confusão usando a função refatorada
matriz_conf_perceptron_delta = UtilsCalcs.matriz_confusao_manual(y_test_perceptron_delta, 'setosa', y_pred_perceptron_delta, 'virginica')

print("Matriz de Confusão Perceptron Delta:")
print(f"             Pred. Setosa    Pred. Virginica")
print(f"Real Setosa       {matriz_conf_perceptron_delta[0, 0]}               {matriz_conf_perceptron_delta[1, 0]}")
print(f"Real Virginica    {matriz_conf_perceptron_delta[0, 1]}               {matriz_conf_perceptron_delta[1, 1]}")

# Calcular as métricas de avaliação para o Perceptron Delta
acuracia_perceptron_delta, precisao_perceptron_delta, revocacao_perceptron_delta, f1_perceptron_delta = UtilsCalcs.calcular_metricas(y_test_perceptron_delta, 'setosa', y_pred_perceptron_delta, 'virginica')

# Imprimir as métricas de avaliação para Perceptron Delta
print("\nMétricas de Avaliação Perceptron Delta:")
print(f"Acurácia: {acuracia_perceptron_delta:.4f}")
print(f"Precisão: {precisao_perceptron_delta:.4f}")
print(f"Revocação: {revocacao_perceptron_delta:.4f}")
print(f"F1-Score: {f1_perceptron_delta:.4f}")


