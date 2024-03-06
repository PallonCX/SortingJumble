// Homepage.js
import React, { useState, useEffect } from 'react';
import { bubbleSort } from '../utils/bubbleSort';
import { selectionSort } from '../utils/selectionSort';
import { insertionSort } from '../utils/insertionSort';
import { mergeSort } from '../utils/mergeSort';
import { quickSort } from '../utils/quickSort';
import { generateUnsortedArray } from '../utils/generator';
import './Homepage.css'; // Import CSS file for styling

// Define handleGenerateArray outside of the component
const handleGenerateArray = (n, dataType) => {
    // Reset sortingAlgorithms state to empty object
    let sortingAlgorithms = {
      bubble: '',
      selection: '',
      insertion: '',
      merge: '',
      quick: '',
    };
  
    let newArray = generateUnsortedArray(n, dataType);
    let newSortedArrays;
    let areDistinct = false;
  
    while (!areDistinct) {
      newArray = generateUnsortedArray(n, dataType);
      newSortedArrays = {
        bubble: bubbleSort([...newArray]),
        selection: selectionSort([...newArray]),
        insertion: insertionSort([...newArray]),
        merge: mergeSort([...newArray]),
        quick: quickSort([...newArray]),
        sorted: [...newArray].sort((a, b) => a - b)
      };
  
      // Check if all pairs of sorted arrays are distinct
      areDistinct = checkDistinct(newArray, newSortedArrays);
    }
  
    return { sortingAlgorithms, newArray, newSortedArrays };
  };
  

const checkDistinct = (unsortedArray, sortedArrays) => {
  let check = Object.keys(sortedArrays).every((key1, index1) => {
    return Object.keys(sortedArrays).every((key2, index2) => {
      if (index1 < index2) {
        return (
          JSON.stringify(sortedArrays[key1]) !== JSON.stringify(sortedArrays[key2]) &&
          JSON.stringify(sortedArrays[key1]) !== JSON.stringify(unsortedArray)
        );
      }
      return true;
    });
  });
  return check;
};

const Homepage = () => {
  const n = 16;
  const [unsortedArray, setUnsortedArray] = useState(generateUnsortedArray(n, 'integer'));
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
  const [isCorrect, setIsCorrect] = useState(null);
  const [algorithmOrder, setAlgorithmOrder] = useState([]);
  const [showLastRow, setShowLastRow] = useState(false);
  const [devilMode, setDevilMode] = useState(false);
  const algorithmNames = {
    bubble: 'Bubble Sort',
    selection: 'Selection Sort',
    insertion: 'Insertion Sort',
    merge: 'Merge Sort',
    quick: 'Quick Sort',
  };

  useEffect(() => {
    const { sortingAlgorithms, newArray, newSortedArrays } = handleGenerateArray(n, devilMode ? 'string' : 'integer');
    setUnsortedArray(newArray);
    setSortedArrays(newSortedArrays);
    setIsCorrect(null);
    setShowLastRow(false);
    setSortingAlgorithms(sortingAlgorithms);
    const shuffledKeys = shuffleArray(getAlgorithm());
    setAlgorithmOrder(shuffledKeys);
  }, [devilMode]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const getAlgorithm = () => {
    return ['bubble', 'selection', 'insertion', 'merge', 'quick']
  }

  // Inside the check button click handler
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

  const refresh = () => {
    const { sortingAlgorithms, newArray, newSortedArrays } = handleGenerateArray(n, devilMode ? 'string' : 'integer');
    setUnsortedArray(newArray);
    setSortedArrays(newSortedArrays);
    setIsCorrect(null);
    setShowLastRow(false);
    setSortingAlgorithms(sortingAlgorithms);
    const shuffledKeys = shuffleArray(Object.keys(sortingAlgorithms));
    setAlgorithmOrder(shuffledKeys);
  }

  const toggleDevilMode = () => {
    setDevilMode(prevMode => !prevMode);
  };

  return (
    <div className="centered-container">
        <h1 className="title">Sorting Jumble</h1>
      <div className="button-row">
        <button onClick={refresh} className="button-style puzzle">
            <span role="img" aria-label="puzzle">🧩</span> Next Puzzle
        </button>
        <button onClick={toggleDevilMode} className={`button-style ${devilMode ? "devil-mode" : "baby-mode"}`}>
            <span role="img" aria-label={devilMode ? "baby" : "devil"}>{devilMode ? "👶" : "😈"}</span> {devilMode ? "Baby Mode" : "Devil Mode"}
        </button>
      </div>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Unsorted Array</th>
              <th className="empty-column"></th>
              {algorithmOrder.map((key, index) => (
                <th key={index}>
                  <select className="algorithm-select" value={sortingAlgorithms[key]} onChange={(e) => handleAlgorithmChange(e.target.value, key)}>
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
                    <td key={index} className={isCorrect !== null && sortingAlgorithms[key] === key ? "correct-cell" : "incorrect-cell"}>
                    {algorithmNames[key]}
                    </td>
                ))}
                <td className="empty-column"></td>
                <td className="empty-column"></td>
                </tr>
            </tfoot>
            )}
        </table>
      </div>
      <div className="check-container">
        {isCorrect === true ? <p className="correct">Well Done!</p> : isCorrect === false ? <p className="incorrect">Hmm something's wrong...</p> : null}
        <button onClick={handleCheck} className="button-style check">
        Check Answer
        </button>
      </div>
      <footer className="footer">
        Made by <a href="https://github.com/PallonCX" target="_blank" rel="noopener noreferrer">Pallon</a>
        </footer>
    </div>
  );
};

export default Homepage;
