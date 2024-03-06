export function bubbleSort(arr, stopProbability = 0.05) {
    const n = arr.length;
  
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap elements
        }
  
        // Introduce a random condition to stop sorting at a random point
        if (Math.random() < stopProbability) { // Adjust the probability as needed
          return arr;
        }
      }
    }
  
    return arr;
  }
  