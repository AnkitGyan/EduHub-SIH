// simple fake dataset
export const fakeProblems = [
  {
    _id: "1",
    subject: "Math",
    title: "Find the Sum of Two Numbers",
    difficulty: "Easy",
    statement: "Write a function that returns the sum of two integers.",
    solution: "function sum(a,b){ return a + b; }"
  },
  {
    _id: "2",
    subject: "Math",
    title: "Check Prime Number",
    difficulty: "Medium",
    statement: "Determine whether a number is prime.",
    solution: "function isPrime(n){ if(n<2) return false; for(let i=2;i*i<=n;i++){ if(n%i===0) return false; } return true; }"
  },
  {
    _id: "3",
    subject: "Science",
    title: "Photosynthesis Basics",
    difficulty: "Easy",
    statement: "Explain the process of photosynthesis in plants.",
    solution: "Plants convert CO₂ and water into glucose and O₂ using sunlight and chlorophyll."
  },
  {
    _id: "4",
    subject: "Science",
    title: "States of Matter",
    difficulty: "Easy",
    statement: "List the three primary states of matter and an example for each.",
    solution: "Solid (ice), Liquid (water), Gas (steam)."
  },
  {
    _id: "5",
    subject: "History",
    title: "World War II Start Year",
    difficulty: "Easy",
    statement: "In which year did World War II begin?",
    solution: "1939."
  },
  {
    _id: "6",
    subject: "History",
    title: "First President of USA",
    difficulty: "Easy",
    statement: "Name the first president of the United States.",
    solution: "George Washington."
  },
  {
    _id: "7",
    subject: "Math",
    title: "Fibonacci Sequence",
    difficulty: "Medium",
    statement: "Generate the first n Fibonacci numbers.",
    solution: "function fib(n){ let a=0,b=1,res=[]; for(let i=0;i<n;i++){ res.push(a); [a,b]=[b,a+b]; } return res; }"
  },
  {
    _id: "8",
    subject: "Science",
    title: "Gravity Definition",
    difficulty: "Easy",
    statement: "Define gravity.",
    solution: "Gravity is a force of attraction between masses."
  },
  {
    _id: "9",
    subject: "History",
    title: "Independence of India",
    difficulty: "Easy",
    statement: "When did India gain independence?",
    solution: "15 August 1947."
  },
  {
    _id: "10",
    subject: "Math",
    title: "Greatest Common Divisor",
    difficulty: "Medium",
    statement: "Find GCD of two numbers.",
    solution: "function gcd(a,b){ return b===0?a:gcd(b,a%b); }"
  }
];
