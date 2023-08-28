export function convertRangeStringToArrayOfArrays(rangeString) {
    const ranges = rangeString.split(',');
    
    const result = [];
  
    ranges.forEach(range => {
        const [start, end] = range
        .substring(1, range.length - 1) // Remove the enclosing brackets
        .split('-')
        .map(Number);
      //console.log([start,end])
      const rangeArray = [];
      for (let i = start; i <= end; i++) {
        rangeArray.push(i);
      }
      result.push(rangeArray);
    });
  
    return result;
  }