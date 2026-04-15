def binary_search(arr, target, low=0, high=None):
    """
    Implementação recursiva da pesquisa binária.
    Retorna o índice do elemento alvo se encontrado, caso contrário -1.
    A lista deve estar ordenada.
    """
    if high is None:
        high = len(arr) - 1
    
    if low > high:
        return -1  # Não encontrado
    
    mid = (low + high) // 2
    if arr[mid] == target:
        return mid  # Índice encontrado
    elif arr[mid] < target:
        return binary_search(arr, target, mid + 1, high)
    else:
        return binary_search(arr, target, low, mid - 1)

def binary_search_iterative(arr, target):
    """
    Implementação iterativa da pesquisa binária.
    Retorna o índice do elemento alvo se encontrado, caso contrário -1.
    A lista deve estar ordenada.
    """
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

# Exemplo de uso
if __name__ == "__main__":
    arr = [1, 3, 5, 7, 9, 11]
    target = 7
    
    # Usando versão recursiva
    result_recursive = binary_search(arr, target)
    print(f"Pesquisa recursiva: Elemento encontrado no índice {result_recursive}")
    
    # Usando versão iterativa
    result_iterative = binary_search_iterative(arr, target)
    print(f"Pesquisa iterativa: Elemento encontrado no índice {result_iterative}")
    
    # Teste com elemento não encontrado
    target_not_found = 4
    result_not_found = binary_search_iterative(arr, target_not_found)
    print(f"Elemento {target_not_found} não encontrado: {result_not_found}")