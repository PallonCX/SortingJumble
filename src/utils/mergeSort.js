export function mergeSort(arr, stopProbability = 0.05) {
  return helper(arr, stopProbability).arr;
}

function helper(arr, stopProbability = 0.05) {
  if (arr.length <= 1) {
    return { arr, isSorted: true }; // If the array has one or fewer elements, it is already sorted
  }

  const mid = Math.floor(arr.length / 2); // Find the middle index of the array
  const left = arr.slice(0, mid); // Split the array into two halves
  const right = arr.slice(mid);

  // Recursively sort the left and right halves
  const { arr: sortedLeft, isSorted: leftSorted } = helper(left, stopProbability);

  if (!leftSorted) {
    return { arr: sortedLeft.concat(right), isSorted: false };
  }

  const { arr: sortedRight, isSorted: rightSorted } = helper(right, stopProbability);

  // Check if either of the halves is not fully sorted
  if (!rightSorted) {
    return { arr: sortedLeft.concat(sortedRight), isSorted: false };
  }

  // Introduce a random condition to stop sorting
  if (Math.random() < stopProbability) {
    return { arr: sortedLeft.concat(sortedRight), isSorted: false };
  }

  // Merge the sorted halves
  return { arr: merge(sortedLeft, sortedRight), isSorted: true };
}

function merge(left, right) {
  let merged = [];
  let i = 0;
  let j = 0;

  // Compare elements from both arrays and merge them in sorted order
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      merged.push(left[i]);
      i++;
    } else {
      merged.push(right[j]);
      j++;
    }
  }

  // Append remaining elements from left and right arrays
  merged = merged.concat(left.slice(i)).concat(right.slice(j));

  return merged;
}
