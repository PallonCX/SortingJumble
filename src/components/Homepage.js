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
  const [sortingAlgorithms, setSortingAlgorithms] = useState({
    bubble: '',
    selection: '',
    insertion: '',
    merge: '',
    quick: '',
  });
  const [isCorrect, setIsCorrect] = useState(false);
  const [algorithmOrder, setAlgorithmOrder] = useState([]);
  const [showLastRow, setShowLastRow] = useState(false); // State to control the visibility of the last row

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
    // Shuffle the array of algorithm keys
    const shuffledKeys = shuffleArray(Object.keys(sortingAlgorithms));
    setAlgorithmOrder(shuffledKeys);
  }, [unsortedArray]); // Update when unsortedArray changes

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleGenerateArray = () => {
    let newArray = generateUnsortedArray(16, 'integer');
    let newSortedArrays;
    let isSame = true;
    
    while (isSame) {
      newArray = generateUnsortedArray(16, 'integer');
      newSortedArrays = {
        bubble: bubbleSort([...newArray]),
        selection: selectionSort([...newArray]),
        insertion: insertionSort([...newArray]),
        merge: mergeSort([...newArray]),
        quick: quickSort([...newArray]),
        sorted: [...newArray].sort((a, b) => a - b)
      };

      isSame = Object.keys(newSortedArrays).some(key => (
        JSON.stringify(sortedArrays[key]) === JSON.stringify(newSortedArrays[key]) ||
        JSON.stringify(sortedArrays[key]) === JSON.stringify(newArray)
      ));
    }

    setUnsortedArray(newArray);
    setSortedArrays(newSortedArrays);
    setIsCorrect(false); // Reset the correctness state
    setShowLastRow(false); // Hide the last row when generating a new array
  };

  const handleCheck = () => {
    let allCorrect = true;
    Object.keys(sortingAlgorithms).forEach(key => {
      const algorithm = sortingAlgorithms[key];
      if (algorithm !== key) {
        allCorrect = false;
      }
    });
    setIsCorrect(allCorrect);
    setShowLastRow(true); // Show the last row when the "Check" button is pressed
  };

  const handleAlgorithmChange = (algorithm, key) => {
    setSortingAlgorithms(prevState => ({
      ...prevState,
      [key]: algorithm,
    }));
  };

  return (
    <div className="centered-container">
      <button onClick={handleGenerateArray}>Generate Array</button>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Unsorted Array</th>
              <th className="empty-column"></th>
              {algorithmOrder.map((key, index) => (
                <th key={index}>
                  <select value={"Choose Algorithm"} onChange={(e) => handleAlgorithmChange(e.target.value, key)}>
                    <option value="">Choose Algorithm</option>
                    <option value="bubble">Bubble Sort</option>
                    <option value="selection">Selection Sort</option>
                    <option value="insertion">Insertion Sort</option>
                    <option value="merge">Merge Sort</option>
                    <option value="quick">Quick Sort</option>
                  </select>
                </th>
              ))}
              <th className="empty-column"></th>
              <th>Sorted Array</th>
            </tr>
          </thead>
          <tbody>
            {unsortedArray.map((num, index) => (
              <tr key={index}>
                <td>{num}</td>
                <td className="empty-column"></td>
                {algorithmOrder.map((key, innerIndex) => (
                  <td key={innerIndex}>{sortedArrays[key][index]}</td>
                ))}
                <td className="empty-column"></td>
                <td>{sortedArrays['sorted'][index]}</td>
              </tr>
            ))}
          </tbody>
          {showLastRow && (
            <tfoot>
              <tr>
                <td className="empty-column"></td>
                <td className="empty-column"></td>
                {algorithmOrder.map((key, index) => (
                  <td key={index}>{key}</td>
                ))}
                <td className="empty-column"></td>
                <td className="empty-column"></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      <div>
        <button onClick={handleCheck}>Check</button>
        {isCorrect ? <p>Correct!</p> : <p>Incorrect</p>}
      </div>
    </div>
  );
};

export default Homepage;
