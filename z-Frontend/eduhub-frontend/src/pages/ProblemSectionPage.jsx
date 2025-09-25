import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, XCircle, Calculator, Atom, Trophy, Users, Clock, Star, BookOpen } from 'lucide-react';
import Navbar from "../components/navbar/Navbar"

const ProblemSectionPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [completedProblems, setCompletedProblems] = useState(new Set());
  const [activeTab, setActiveTab] = useState('problems');

  const problems = [
    {
      id: 1,
      title: "Area of Circle Calculator",
      difficulty: "Easy",
      grade: "6-8",
      description: "Write a function to calculate the area of a circle given its radius. Use π = 3.14159",
      category: "Geometry",
      points: 10,
      template: `function calculateCircleArea(radius) {
  // Formula: Area = π × r²
  // Use π = 3.14159
  
}`,
      testCases: [
        { input: [5], expected: 78.53975 },
        { input: [10], expected: 314.159 },
        { input: [3], expected: 28.27431 }
      ],
      solution: `function calculateCircleArea(radius) {
  const pi = 3.14159;
  return pi * radius * radius;
}`
    },
    {
      id: 2,
      title: "Quadratic Formula Solver",
      difficulty: "Medium",
      grade: "9-10",
      description: "Solve quadratic equation ax² + bx + c = 0 and return both roots. Return an array with two solutions.",
      category: "Algebra",
      points: 20,
      template: `function solveQuadratic(a, b, c) {
  // Formula: x = (-b ± √(b²-4ac)) / 2a
  // Return [root1, root2]
  
}`,
      testCases: [
        { input: [1, -5, 6], expected: [3, 2] },
        { input: [1, -7, 12], expected: [4, 3] },
        { input: [2, -8, 6], expected: [3, 1] }
      ],
      solution: `function solveQuadratic(a, b, c) {
  const discriminant = b * b - 4 * a * c;
  const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
  return [root1, root2].sort((x, y) => y - x);
}`
    },
    {
      id: 3,
      title: "Distance Formula",
      difficulty: "Easy",
      grade: "7-9",
      description: "Calculate the distance between two points (x1,y1) and (x2,y2) using the distance formula.",
      category: "Coordinate Geometry",
      points: 15,
      template: `function calculateDistance(x1, y1, x2, y2) {
  // Formula: d = √((x2-x1)² + (y2-y1)²)
  
}`,
      testCases: [
        { input: [0, 0, 3, 4], expected: 5 },
        { input: [1, 1, 4, 5], expected: 5 },
        { input: [-1, -1, 2, 3], expected: 5 }
      ],
      solution: `function calculateDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}`
    },
    {
      id: 4,
      title: "Physics: Kinetic Energy Calculator",
      difficulty: "Medium",
      grade: "9-11",
      description: "Calculate kinetic energy using the formula KE = ½mv² where m is mass (kg) and v is velocity (m/s).",
      category: "Physics",
      points: 25,
      template: `function kineticEnergy(mass, velocity) {
  // Formula: KE = ½mv²
  // mass in kg, velocity in m/s
  
}`,
      testCases: [
        { input: [10, 20], expected: 2000 },
        { input: [5, 10], expected: 250 },
        { input: [2, 15], expected: 225 }
      ],
      solution: `function kineticEnergy(mass, velocity) {
  return 0.5 * mass * velocity * velocity;
}`
    },
    {
      id: 5,
      title: "Chemistry: Molarity Calculator",
      difficulty: "Hard",
      grade: "10-12",
      description: "Calculate molarity (M) given moles of solute and volume of solution in liters. M = moles/volume",
      category: "Chemistry",
      points: 30,
      template: `function calculateMolarity(moles, volumeLiters) {
  // Formula: Molarity = moles of solute / liters of solution
  // Round to 3 decimal places
  
}`,
      testCases: [
        { input: [2, 1], expected: 2.000 },
        { input: [0.5, 0.25], expected: 2.000 },
        { input: [1.5, 0.75], expected: 2.000 }
      ],
      solution: `function calculateMolarity(moles, volumeLiters) {
  const molarity = moles / volumeLiters;
  return Math.round(molarity * 1000) / 1000;
}`
    },
    {
      id: 6,
      title: "Compound Interest Calculator",
      difficulty: "Medium",
      grade: "8-10",
      description: "Calculate compound interest using A = P(1 + r/n)^(nt) where P=principal, r=rate, n=compounds per year, t=time",
      category: "Finance Math",
      points: 25,
      template: `function compoundInterest(principal, rate, compounds, time) {
  // A = P(1 + r/n)^(nt)
  // rate should be decimal (0.05 for 5%)
  
}`,
      testCases: [
        { input: [1000, 0.05, 12, 2], expected: 1104.94 },
        { input: [5000, 0.03, 4, 3], expected: 5471.78 },
        { input: [2000, 0.04, 1, 5], expected: 2433.31 }
      ],
      solution: `function compoundInterest(principal, rate, compounds, time) {
  const amount = principal * Math.pow(1 + rate / compounds, compounds * time);
  return Math.round(amount * 100) / 100;
}`
    },
    {
      id: 7,
      title: "Physics: Ohm's Law Calculator",
      difficulty: "Easy",
      grade: "8-10",
      description: "Calculate electrical power using P = V × I, where V is voltage (volts) and I is current (amperes).",
      category: "Physics",
      points: 15,
      template: `function calculatePower(voltage, current) {
  // Formula: Power = Voltage × Current
  // P = V × I
  
}`,
      testCases: [
        { input: [12, 2], expected: 24 },
        { input: [110, 0.5], expected: 55 },
        { input: [9, 1.5], expected: 13.5 }
      ],
      solution: `function calculatePower(voltage, current) {
  return voltage * current;
}`
    },
    {
      id: 8,
      title: "Statistics: Mean and Standard Deviation",
      difficulty: "Hard",
      grade: "10-12",
      description: "Calculate the standard deviation of an array of numbers. Return the result rounded to 2 decimal places.",
      category: "Statistics",
      points: 35,
      template: `function standardDeviation(numbers) {
  // Steps: 
  // 1. Find mean
  // 2. Find variance
  // 3. Take square root
  
}`,
      testCases: [
        { input: [[2, 4, 4, 4, 5, 5, 7, 9]], expected: 2.14 },
        { input: [[10, 20, 30, 40, 50]], expected: 15.81 },
        { input: [[1, 2, 3, 4, 5]], expected: 1.58 }
      ],
      solution: `function standardDeviation(numbers) {
  const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  const variance = numbers.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / numbers.length;
  return Math.round(Math.sqrt(variance) * 100) / 100;
}`
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What is the formula for the area of a triangle?",
      options: [
        "base × height",
        "½ × base × height",
        "π × radius²",
        "length × width"
      ],
      correct: 1,
      category: "Geometry",
      difficulty: "Easy"
    },
    {
      id: 2,
      question: "In the equation F = ma, what does 'a' represent?",
      options: [
        "Area",
        "Angle",
        "Acceleration",
        "Amplitude"
      ],
      correct: 2,
      category: "Physics",
      difficulty: "Easy"
    },
    {
      id: 3,
      question: "What is the chemical formula for water?",
      options: [
        "H₂O₂",
        "H₂O",
        "HO₂",
        "H₃O"
      ],
      correct: 1,
      category: "Chemistry",
      difficulty: "Easy"
    },
    {
      id: 4,
      question: "What is the derivative of x²?",
      options: [
        "x",
        "2x",
        "x²/2",
        "2x²"
      ],
      correct: 1,
      category: "Calculus",
      difficulty: "Medium"
    },
    {
      id: 5,
      question: "At what temperature do Celsius and Fahrenheit scales meet?",
      options: [
        "-40°",
        "0°",
        "32°",
        "100°"
      ],
      correct: 0,
      category: "Physics",
      difficulty: "Hard"
    }
  ];

  const [currentQuiz, setCurrentQuiz] = useState(quizQuestions[0]);

  const runCode = () => {
    if (!selectedProblem) return;
    
    try {
      const func = new Function('return ' + userCode)();
      const results = selectedProblem.testCases.map((test, index) => {
        try {
          const result = func(...test.input);
          const passed = Math.abs(result - test.expected) < 0.001; // Account for floating point precision
          return {
            index,
            input: test.input,
            expected: test.expected,
            actual: result,
            passed
          };
        } catch (error) {
          return {
            index,
            input: test.input,
            expected: test.expected,
            actual: error.message,
            passed: false
          };
        }
      });
      
      setTestResults(results);
      
      if (results.every(r => r.passed)) {
        setCompletedProblems(prev => new Set([...prev, selectedProblem.id]));
      }
    } catch (error) {
      setTestResults([{
        index: 0,
        input: "Code Error",
        expected: "Valid Code",
        actual: error.message,
        passed: false
      }]);
    }
  };

  const checkQuizAnswer = () => {
    const isCorrect = parseInt(quizAnswer) === currentQuiz.correct;
    setShowQuizResult(true);
    setTimeout(() => {
      setShowQuizResult(false);
      setQuizAnswer('');
      const nextQuiz = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
      setCurrentQuiz(nextQuiz);
    }, 2000);
  };

  const filteredProblems = problems.filter(p => 
    selectedDifficulty === 'all' || p.difficulty.toLowerCase() === selectedDifficulty
  );

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';  
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Geometry': return '📐';
      case 'Algebra': return '🔢';
      case 'Coordinate Geometry': return '📊';
      case 'Physics': return '⚡';
      case 'Chemistry': return '🧪';
      case 'Finance Math': return '💰';
      case 'Statistics': return '📈';
      case 'Calculus': return '∞';
      default: return '🔬';
    }
  };

  useEffect(() => {
    if (selectedProblem) {
      setUserCode(selectedProblem.template);
      setTestResults([]);
    }
  }, [selectedProblem]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar></Navbar>
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-indigo-500">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-3 rounded-xl">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Math & Science Hub</h1>
                <p className="text-gray-600">Interactive Problem Solving for Classes 6-12</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 px-4 py-2 rounded-lg">
                <span className="text-green-800 font-semibold">Problems Solved: {completedProblems.size}</span>
              </div>
              <div className="bg-blue-100 px-4 py-2 rounded-lg">
                <span className="text-blue-800 font-semibold">Total Points: {Array.from(completedProblems).reduce((sum, id) => sum + (problems.find(p => p.id === id)?.points || 0), 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-200 p-1 rounded-xl mb-8">
          <button
            onClick={() => setActiveTab('problems')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'problems'
                ? 'bg-white text-indigo-600 shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Calculator className="w-5 h-5" />
            <span>Coding Problems</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'quiz'
                ? 'bg-white text-indigo-600 shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Quick Quiz</span>
          </button>
        </div>

        {activeTab === 'problems' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Problems List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Problems</h2>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                  >
                    <option value="all">All Levels</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  {filteredProblems.map((problem) => (
                    <div
                      key={problem.id}
                      onClick={() => setSelectedProblem(problem)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                        selectedProblem?.id === problem.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm">{problem.title}</h3>
                        {completedProblems.has(problem.id) && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{getCategoryIcon(problem.category)}</span>
                          <span className="text-xs text-gray-600">{problem.category}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                            {problem.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">{problem.points}pts</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          Grade {problem.grade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="lg:col-span-2">
              {selectedProblem ? (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProblem.title}</h2>
                      <p className="text-gray-600 mb-4">{selectedProblem.description}</p>
                      <div className="flex items-center space-x-4 mb-6">
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getDifficultyColor(selectedProblem.difficulty)}`}>
                          {selectedProblem.difficulty}
                        </span>
                        <span className="text-sm text-gray-600">Grade {selectedProblem.grade}</span>
                        <span className="text-sm text-gray-600">{selectedProblem.points} points</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Solution:</label>
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
                      placeholder="Write your code here..."
                    />
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={runCode}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      <span>Run Code</span>
                    </button>
                    
                    {completedProblems.has(selectedProblem.id) && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Completed!</span>
                      </div>
                    )}
                  </div>

                  {/* Test Results */}
                  {testResults.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Test Results:</h3>
                      <div className="space-y-2">
                        {testResults.map((result, index) => (
                          <div key={index} className={`p-3 rounded border-l-4 ${
                            result.passed 
                              ? 'bg-green-50 border-green-500' 
                              : 'bg-red-50 border-red-500'
                          }`}>
                            <div className="flex items-center space-x-2 mb-1">
                              {result.passed ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500" />
                              )}
                              <span className="font-medium text-sm">Test Case {index + 1}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <div>Input: {JSON.stringify(result.input)}</div>
                              <div>Expected: {JSON.stringify(result.expected)}</div>
                              <div>Your Output: {JSON.stringify(result.actual)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Problem</h3>
                  <p className="text-gray-600">Choose a math or science problem from the left panel to start coding!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Atom className="w-8 h-8 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">Quick Knowledge Quiz</h2>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getDifficultyColor(currentQuiz.difficulty)}`}>
                    {currentQuiz.difficulty}
                  </span>
                  <span className="text-sm text-gray-600">{currentQuiz.category}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentQuiz.question}</h3>
                
                <div className="space-y-3">
                  {currentQuiz.options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="quiz"
                        value={index}
                        checked={quizAnswer === index.toString()}
                        onChange={(e) => setQuizAnswer(e.target.value)}
                        className="text-indigo-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={checkQuizAnswer}
                  disabled={!quizAnswer || showQuizResult}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Submit Answer
                </button>

                {showQuizResult && (
                  <div className={`flex items-center space-x-2 ${
                    parseInt(quizAnswer) === currentQuiz.correct ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {parseInt(quizAnswer) === currentQuiz.correct ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5" />
                        <span className="font-semibold">Incorrect. Try the next one!</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemSectionPage;