export function insertionSort(arr, stopProbability = 0.05) {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
  
      while (j >= 0 && key < arr[j]) {
        arr[j + 1] = arr[j];
        j--;
  
        // Introduce a random condition to stop sorting at a random point
        if (Math.random() < stopProbability) { // Adjust the probability as needed
          arr[j + 1] = key;
          return arr;
        }
      }
  
      arr[j + 1] = key;
  
      // Introduce a random condition to stop sorting at a random point
      if (Math.random() < stopProbability) { // Adjust the probability as needed
        return arr;
      }
    }
  
    return arr;
  }
  