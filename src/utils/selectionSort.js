export function selectionSort(arr, stopProbability = 0.05) {
    const n = arr.length;
  
    for (let i = 0; i < n; i++) {
      let minIdx = i;
  
      // Find the minimum element in the unsorted part of the array
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
  
        // Introduce a random condition to stop sorting at a random point
        if (Math.random() < stopProbability) { // Adjust the probability as needed
          return arr;
        }
      }
  
      // Swap the found minimum element with the first element
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  
    return arr;
  }
  