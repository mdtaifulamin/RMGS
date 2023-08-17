export function convertOrdinalToNumber(ordinal) {
    const lastTwoDigits = parseInt(ordinal.slice(-2));
    const lastDigit = lastTwoDigits % 10;
    const lastTwoDigitsWithoutTens = lastTwoDigits % 100;
    if (ordinal=="0") {
      return 0;
    } 
    else if (lastDigit === 1 && lastTwoDigitsWithoutTens !== 11) {
      return parseInt(ordinal.slice(0, -2))-3;
    } else if (lastDigit === 2 && lastTwoDigitsWithoutTens !== 12) {
      return parseInt(ordinal.slice(0, -2)) + 1-3;
    } else if (lastDigit === 3 && lastTwoDigitsWithoutTens !== 13) {
      return parseInt(ordinal.slice(0, -2)) + 2-3;
    } else {
      return parseInt(ordinal.slice(0, -2)) + 3-3;
    }
  }

  
  
  export function getOrdinalIndicator(num) {
    // Convert the number to a string so we can check its last digit
    const strNum = num.toString();
  
    // If the number ends in "11", "12", or "13", use "th" as the suffix
    if (strNum.endsWith("11") || strNum.endsWith("12") || strNum.endsWith("13")) {
      return num + "th";
    }
  
    // Otherwise, use a switch statement to determine the suffix based on the last digit
    switch (strNum.slice(-1)) {
      case "1":
        return num + "st";
      case "2":
        return num + "nd";
      case "3":
        return num + "rd";
      default:
        return num + "th";
    }
  }

  export function evalCalculation(expression) {
    const lastChar = expression.slice(-1);
    if (isNaN(lastChar) && lastChar !== '.' && lastChar !== ')') {
      return null; // expression is incomplete, don't evaluate
    }
    try {
      const result = eval(expression)?eval(expression).toFixed(2):0;
      return result;
    } catch (error) {
      return 't'; // expression is invalid, don't evaluate
    }
  }
  
  