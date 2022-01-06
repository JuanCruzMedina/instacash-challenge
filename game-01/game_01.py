import functools
import time


def timer(func):
    """Print the runtime of the decorated function"""

    @functools.wraps(func)
    def wrapper_timer(*args, **kwargs):
        start_time = time.perf_counter()    
        value = func(*args, **kwargs)
        end_time = time.perf_counter()      
        run_time = end_time - start_time   

        print(f"Finished {func.__name__!r} in {run_time:.6f} secs")

        return value

    return wrapper_timer

def debug(func):
    """Print the function signature and return value"""

    @functools.wraps(func)
    def wrapper_debug(*args, **kwargs):
        print(f"Calling {func.__name__}")
        value = func(*args, **kwargs)
        print(f"{func.__name__!r} returned {value!r}")
        return value
        
    return wrapper_debug


@timer
@debug
def get_n_subset(m: list[int], n: int) -> list[int]:
    """Gets the first subset of 2 numbers of M that add up to N. Returns an array with the 2 numbers"""
    
    if not m or len(m) == 0:
        raise Exception("The array 'm' cannot be empty.")
    
    dictionary = dict()

    for number in m:
        
        if number > n:
            continue

        difference = n - number
        
        value = dictionary.get(number,None)
        
        if value is not None:
            return [value, number]

        dictionary[difference] = number

    return []


def test(m, n):
    print(f'Count of elements: {len(m)}')
    print('-'*50)
    get_n_subset(m, n)
    print('='*50)



def main():
    # prueba con arrreglo de ejemplo
    n = 10
    m = [2, 2, 5, 8, 14, 0] 
    test(m,n)

    # prueba con arreglo de 1.002 elementos
    m = [i for i in range(1000)]
    m.append(999999999)   
    m.append(999999999)   
    n = 1999999998
    test(m,n)
    
    # prueba con arreglo de 100.002 elementos
    m = [i for i in range(100000)]
    m.append(999999999)   
    m.append(999999999)   
    n = 1999999998 
    test(m,n)
    
     # prueba con arreglo de 1.000.002 elementos
    m = [i for i in range(1000000)]
    m.append(999999999)   
    m.append(999999999)   
    n = 1999999998
    test(m,n)

if __name__ == "__main__":
    main()
