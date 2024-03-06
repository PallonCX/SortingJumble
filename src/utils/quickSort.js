export function quickSort(arr, randomPivot = false, stopProbability = 0.05) {
    let stack = [[0, arr.length]]; // Initialize a stack to keep track of subarrays to be sorted
  
    while (stack.length > 0) {
      let [start, end] = stack.pop(); // Pop a subarray from the stack
      let size = end - start;
  
      if (size <= 1) { // If the subarray has one or zero elements, continue to the next iteration
        continue;
      }
  
      let pivotIndex = start;
  
      if (randomPivot) {
        // Choose a random pivot index within the subarray
        pivotIndex = Math.floor(Math.random() * (end - start)) + start;
        [arr[pivotIndex], arr[start]] = [arr[start], arr[pivotIndex]]; // Move the pivot to the start of the subarray
      }
  
      let pivot = arr[start]; // Pivot element
  
      // Partition the subarray
      let left = start + 1; // Index of the first element in the right partition
      for (let right = start + 1; right < end; right++) {
        if (arr[right] < pivot) {
          [arr[left], arr[right]] = [arr[right], arr[left]];
          left++;
        }

        // Introduce a random condition to stop sorting
        if (Math.random() < stopProbability) {
          return arr;
        }
      }
  
      // Swap the pivot with the rightmost element of the left partition
      [arr[start], arr[left - 1]] = [arr[left - 1], arr[start]];
  
      // Push the left and right partitions onto the stack
      stack.push([start, left - 1]);
      stack.push([left, end]);
  
      // Introduce a random condition to stop sorting
      if (Math.random() < stopProbability) {
        return arr;
      }
    }
  
    return arr;
  }
  