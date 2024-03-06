export function generateUnsortedArray(n, dataType = 'string') {
    if (dataType === 'string') {
      let unsortedArray = new Set(); // Initialize an empty set to keep track of generated strings
      while (unsortedArray.size < n) { // Continue generating strings until the desired size is reached
        // Generate a random string of length between 5 and 10
        let randomString = '';
        const length = Math.floor(Math.random() * 6) + 5; // Random length between 5 and 10
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < length; i++) {
          randomString += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        unsortedArray.add(randomString); // Add the string to the set
      }
      return Array.from(unsortedArray); // Convert the set to an array before returning
    } else if (dataType === 'integer') {
      let unsortedSet = new Set();
      while (unsortedSet.size < n) {
        unsortedSet.add(Math.floor(Math.random() * 1001)); // Generate a random integer between 0 and 1000 and add it to the set
      }
      return Array.from(unsortedSet); // Convert the set to an array before returning
    } else {
      throw new Error("Invalid data type. Choose either 'string' or 'integer'.");
    }
  }
  