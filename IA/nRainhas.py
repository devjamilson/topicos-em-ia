import logging
import time

logging.basicConfig(filename='n_rainhas.log', level=logging.INFO, format='%(asctime)s - %(message)s', encoding='utf-8')

class EstadoRainhas:
    def __init__(self, tabuleiro, custo):
        self.tabuleiro = tabuleiro
        self.custo = custo

    def __lt__(self, other):
        return self.custo < other.custo

def heuristica(tabuleiro):
    n = len(tabuleiro)
    ataques = 0
    colunas = [0] * n
    diagonais_principal = [0] * (2 * n - 1)
    diagonais_secundaria = [0] * (2 * n - 1)
    for i in range(n):
        colunas[tabuleiro[i]] += 1
        diagonais_principal[i + tabuleiro[i]] += 1
        diagonais_secundaria[n - 1 - i + tabuleiro[i]] += 1
    for count in colunas:
        ataques += count * (count - 1) / 2
    for count in diagonais_principal:
        ataques += count * (count - 1) / 2
    for count in diagonais_secundaria:
        ataques += count * (count - 1) / 2
    return ataques

def expandir_estado(estado_atual, n):
    estados_sucessores = []
    for coluna in range(n):
        novo_tabuleiro = estado_atual.tabuleiro + [coluna]
        novo_custo = estado_atual.custo + 1
        novo_estado = EstadoRainhas(novo_tabuleiro, novo_custo)
        estados_sucessores.append(novo_estado)
    return estados_sucessores

def estado_valido(tabuleiro, limite_ataques):
    n = len(tabuleiro)
    colunas = [0] * n
    diagonais_principal = [0] * (2 * n - 1)
    diagonais_secundaria = [0] * (2 * n - 1)
    for i in range(n):
        colunas[tabuleiro[i]] += 1
        diagonais_principal[i + tabuleiro[i]] += 1
        diagonais_secundaria[n - 1 - i + tabuleiro[i]] += 1
    for count in colunas:
        if count > 1:
            return False
    for count in diagonais_principal:
        if count > 1:
            return False
    for count in diagonais_secundaria:
        if count > 1:
            return False
    return True

def resolver_n_rainhas(n):
    start_time = time.time()
    estado_inicial = EstadoRainhas([], 0)
    limite_ataques = n * (n - 1) / 2

    fila = [estado_inicial]
    solucao_encontrada = []

    while fila:
        estado_atual = fila.pop(0)
        tabuleiro_atual = estado_atual.tabuleiro

        if len(tabuleiro_atual) == n:
            if estado_valido(tabuleiro_atual, limite_ataques):
                solucao_encontrada.append(tabuleiro_atual)
                logging.info(f"Solução encontrada: sim | Número de nós: {len(solucao_encontrada)} | Tempo de processamento: {round((time.time() - start_time), 4)} segundos")
                break
            else:
                continue

        estados_sucessores = expandir_estado(estado_atual, n)
        fila.extend(estados_sucessores)

    return solucao_encontrada[0] if solucao_encontrada else None

def exibir_tabuleiro(tabuleiro):
    tamanho = len(tabuleiro)
    for linha in range(tamanho):
        for coluna in range(tamanho):
            # Verifica se a posição é preta ou branca
            if (linha + coluna) % 2 == 0:
                if coluna == tabuleiro[linha]:
                    print("👑", end=" ")  # Peça de dama
                else:
                    print("⬛", end=" ")  # Quadrado preto
            else:
                if coluna == tabuleiro[linha]:
                    print("👑", end=" ")  # Peça de dama
                else:
                    print("⬜", end=" ")  # Quadrado branco
        print()

def main():
    n = int(input("Digite o número de rainhas (n): "))
    solucao = resolver_n_rainhas(n)
    if solucao:
        print("Solução encontrada:")
        exibir_tabuleiro(solucao)
    else:
        print("Não foi possível encontrar uma solução.")

if __name__ == "__main__":
    main()
