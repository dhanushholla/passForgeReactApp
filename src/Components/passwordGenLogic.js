// Mapping of letters to special characters
const specialCharMapping = {
  a: "@",
  b: "8",
  c: "(",
  d: "D",
  e: "3",
  f: "!",
  g: "9",
  h: "h",
  i: "!",
  j: "]",
  k: "K",
  l: "1",
  m: "m",
  n: "n",
  o: "0",
  p: "p",
  q: "q",
  r: "r",
  s: "5",
  t: "7",
  u: "u",
  v: "^",
  w: "w",
  x: "x",
  y: "y",
  z: "2",
};

// Function to generate a random password with a specified length
function generateRandomPassword(length = 10, options) {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*_+";
  chars = options.includeNumbers ? (chars = numbers + chars) : chars;
  chars = options.includeSymbols ? (chars = symbols + chars) : chars;
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Function to transform input string based on special character mapping
function transformInput(input) {
  let transformed = "";
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (i === 0) {
      transformed += char.toUpperCase(); // Capitalize the first letter, my preferred tip
    } else {
      transformed += specialCharMapping[char.toLowerCase()] || char;
    }
  }
  return transformed;
}

// Function to check if the input contains any digits
function containsDigits(input) {
  return /\d/.test(input);
}

// Main function to generate a secure string
export function generateSecureString(input = "", length, options) {
  if (!input) {
    return generateRandomPassword(length, options); // Return random password if no input provided
  }

  let result = transformInput(input);

  // If input doesn't contain digits, append a random two-digit number
  if (!containsDigits(input)) {
    const randomTwoDigit = Math.floor(Math.random() * 90) + 10;
    result += "_" + randomTwoDigit;
  }

  return result;
}
