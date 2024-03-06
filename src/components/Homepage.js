import React, { useState, useEffect } from 'react';
import { bubbleSort } from '../utils/bubbleSort';
import { selectionSort } from '../utils/selectionSort';
import { insertionSort } from '../utils/insertionSort';
import { mergeSort } from '../utils/mergeSort';
import { quickSort } from '../utils/quickSort';
import { generateUnsortedArray } from '../utils/generator';
import './Homepage.css'; // Import CSS file for styling

const Homepage = () => {
  const [unsortedArray, setUnsortedArray] = useState(generateUnsortedArray(16, 'integer'));
  const [sortedArrays, setSortedArrays] = useState({
    bubble: [],
    selection: [],
    insertion: [],
    merge: [],
    quick: [],
    sorted: []
  });

  useEffect(() => {
    const bubbleSorted = bubbleSort([...unsortedArray]);
    const selectionSorted = selectionSort([...unsortedArray]);
    const insertionSorted = insertionSort([...unsortedArray]);
    const mergeSorted = mergeSort([...unsortedArray]);
    const quickSorted = quickSort([...unsortedArray]);
    const sorted = [...unsortedArray].sort((a, b) => a - b); // Sort the unsorted array
    setSortedArrays({
      bubble: bubbleSorted,
      selection: selectionSorted,
      insertion: insertionSorted,
      merge: mergeSorted,
      quick: quickSorted,
      sorted: sorted, // Include the sorted array in sortedArrays
    });
  }, [unsortedArray]); // Update when unsortedArray changes

  const handleGenerateArray = () => {
    const newArray = generateUnsortedArray(16, 'integer');
    setUnsortedArray(newArray);
  };

  return (
    <div className="centered-container"> {/* Center the table */}
      <button onClick={handleGenerateArray}>Generate Array</button>
      <table className="styled-table"> {/* Add class for styling */}
        <thead>
          <tr>
            <th>Unsorted Array</th>
            <th>Bubble Sort</th>
            <th>Selection Sort</th>
            <th>Insertion Sort</th>
            <th>Merge Sort</th>
            <th>Quick Sort</th>
            <th>Sorted Array</th> {/* New column for sorted array */}
          </tr>
        </thead>
        <tbody>
          {unsortedArray.map((num, index) => (
            <tr key={index}>
              <td>{num}</td>
              <td>{sortedArrays['bubble'][index]}</td>
              <td>{sortedArrays['selection'][index]}</td>
              <td>{sortedArrays['insertion'][index]}</td>
              <td>{sortedArrays['merge'][index]}</td>
              <td>{sortedArrays['quick'][index]}</td>
              <td>{sortedArrays['sorted'][index]}</td> {/* Display sorted array */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Homepage;
