export function mergeSort(arr, stopProbability = 0.05) {
  let stack = [[0, arr.length]]; // Initialize a stack to keep track of subarrays to be sorted

  while (stack.length > 0) {
    let [start, end] = stack.pop(); // Pop a subarray from the stack
    let size = end - start;

    if (size > 1) { // If the subarray has more than one element
      let mid = start + Math.floor(size / 2); // Find the middle of the subarray

      // Push the left and right halves of the subarray onto the stack
      stack.push([start, mid]);
      stack.push([mid, end]);
    } else { // If the subarray has only one element
      continue;
    }

    // Merge the sorted halves
    let merged = [];
    let mid = start + Math.floor(size / 2); // Define mid here
    let left = arr.slice(start, mid);
    let right = arr.slice(mid, end);
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        merged.push(left[i]);
        i++;
      } else {
        merged.push(right[j]);
        j++;
      }
    }

    merged.push(...left.slice(i)); // Append remaining elements from the left half
    merged.push(...right.slice(j)); // Append remaining elements from the right half

    // Update the original array with the merged result
    arr.splice(start, size, ...merged);

    // Introduce a random condition to stop sorting
    if (Math.random() < stopProbability) {
      return arr;
    }
  }

  return arr;
}
