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

# Separando dados em treino e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

class manualMinDistanceClassifier:
    def __init__(self):
        self.centroids = {}

    def printCentroids(self):
        print(self.centroids)

    def fit(self, X, y):
        # Calcula os centróides de cada classe
        for class_label in np.unique(y):
            self.centroids[class_label] = np.mean(X[y == class_label], axis=0)

    def multiplyArrays(self, matrizA, matrizB): #Multiplicação de matriz 1x4 por 4x1 é o mesmo que multiplicar arrays dessa forma
        acc = 0
        for i in range(len(matrizA)):
            acc += matrizA[i] * matrizB[i]
        return acc

    def calculateD(self, vetor, vetorMedia):
        distance = self.multiplyArrays(vetor, vetorMedia) - (self.multiplyArrays(vetorMedia, vetorMedia)/2)
        return distance

    def calculateDifference(self, vetor1, vetorMedia1, vetorMedia2):
        diferenca = self.calculateD(vetor1, vetorMedia1) - self.calculateD(vetor1, vetorMedia2)
        return diferenca

    def decision(self, vetor1):
        vetorMedia1 = self.centroids['setosa']
        vetorMedia2 = self.centroids['versicolor']
        diferenca = self.calculateDifference(vetor1, vetorMedia1, vetorMedia2)
        if diferenca > 0:
            return 'setosa'
        else:
            return 'versicolor'

    def predict(self, X):
        predictions = []
        for sample in X:
            predictions.append(self.decision(sample))
        return np.array(predictions)

    # def decision_surface(self, feature_index1, feature_index2, resolution=0.01):
    #     # Gera uma grade de valores
    #     x_min, x_max = X_train[:, feature_index1].min() - 1, X_train[:, feature_index1].max() + 1
    #     y_min, y_max = X_train[:, feature_index2].min() - 1, X_train[:, feature_index2].max() + 1
    #     xx, yy = np.meshgrid(np.arange(x_min, x_max, resolution),
    #                          np.arange(y_min, y_max, resolution))

    #     # Avalia a superfície de decisão
    #     Z = []
    #     for x, y in zip(xx.ravel(), yy.ravel()):
    #         point = np.zeros(X_train.shape[1])
    #         point[feature_index1] = x
    #         point[feature_index2] = y
    #         Z.append(self.decision(point))

    #     # Mapear 'setosa' para 0 e 'versicolor' para 1
    #     Z = np.array([0 if label == 'setosa' else 1 for label in Z]).reshape(xx.shape)

    #     return xx, yy, Z

    # def get_decision_boundary_eq(self):
    #     # Obtenha os centróides das classes
    #     mu1 = self.centroids['setosa']
    #     mu2 = self.centroids['versicolor']

    #     # Calcule os coeficientes w1, w2 e b
    #     w = mu1 - mu2
    #     b = 0.5 * (np.dot(mu2, mu2) - np.dot(mu1, mu1))

    #     # Calcule o slope (m) e o intercepto (c)
    #     slope = -w[0] / w[1]
    #     intercept = -b / w[1]

    #     return slope, intercept

# Exemplo de treino
manualClassifier = manualMinDistanceClassifier()
manualClassifier.fit(X_train, y_train)

# Aplicar o classificador ao conjunto de testes
y_pred = manualClassifier.predict(X_test)

# Calcular a acurácia
accuracy = accuracy_score(y_test, y_pred)
print(f"Acurácia no conjunto de testes: {accuracy:.2f}")
print("Classes previstas:", y_pred)
print("Classes verdadeiras:", y_test)

# Geração da superfície de decisão
# xx, yy, Z = manualClassifier.decision_surface(feature_index1=0, feature_index2=1)

# Usando o método
# slope, intercept = manualClassifier.get_decision_boundary_eq()
# print(f"A equação da reta de separação é: y = {slope:.2f}x + {intercept:.2f}")

# Plotando a superfície de decisão
# plt.contourf(xx, yy, Z, alpha=0.3, cmap=plt.cm.coolwarm)
# plt.scatter(X_train[:, 0], X_train[:, 1], c=[0 if label == 'setosa' else 1 for label in y_train], marker='o', s=25, edgecolor='k', cmap=plt.cm.coolwarm)
# plt.xlabel('Feature 1')
# plt.ylabel('Feature 2')
# plt.title('Superfície de Decisão')
# plt.show()