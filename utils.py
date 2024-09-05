import numpy as np

class UtilsCalcs:
    def __init__(self):
        self

    def matriz_confusao_manual(y_true, y_pred):
        VP = np.sum((y_true == 1) & (y_pred == 1))
        VN = np.sum((y_true == 0) & (y_pred == 0))
        FP = np.sum((y_true == 0) & (y_pred == 1))
        FN = np.sum((y_true == 1) & (y_pred == 0))
        return np.array([[VP, FP], [FN, VN]])

    def calcular_metricas(y_true, y_pred):
        cm = matriz_confusao_manual(y_true, y_pred)
        VP, FP = cm[0]
        FN, VN = cm[1]
    
        # Acurácia
        acuracia = (VP + VN) / (VP + VN + FP + FN)
    
        # Precisão
        precisao = VP / (VP + FP) if (VP + FP) > 0 else 0
    
        # Revocação
        revocacao = VP / (VP + FN) if (VP + FN) > 0 else 0
    
        # F1-Score
        if precisao + revocacao > 0:
            f1 = 2 * (precisao * revocacao) / (precisao + revocacao)
        else:
            f1 = 0

        # Retornando todas as métricas
        return acuracia, precisao, revocacao, f1, cm