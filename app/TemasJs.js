const quizData = {
    'future-simple': [
      {
        question: "What _____ you do tomorrow?.",
        options: ["will", "does", "do", "did"],
        correctAnswer: 0
      },
      {
        question: "Where will she _____ next summer?.",
        options: ["goes", "went", "go", "going"],
        correctAnswer: 2
      },
      {
        question: "Will they come to the party?",
        options: ["Yes, they will", "Yes, they do", "Yes, they are", "Yes, they can"],
        correctAnswer: 0
      },
      {
        question: "He _____ be here at 5 o'clock.",
        options: ["can't", "isn't", "don't", "won't"],
        correctAnswer: 3
      },
      {
        question: "We will it rain tomorrow.",
        options: ["No, it doesn't", "No, it didn't", "Not. it won't", "No, it isn't"],
        correctAnswer: 2
      },


      {
        question: "Are they  _____ go to the concert?.",
        options: ["going", "going to", "not", "is"],
        correctAnswer: 1
      },
      {
        question: "They _____ travel to japan next year.",
        options: ["ins't going to", "going to", "will be", "are going to"],
        correctAnswer: 3
      },
      {
        question: "We _____ eat lunch at 1 PM",
        options: ["going to", "is going", "are going to", "going to"],
        correctAnswer: 2
      },
      {
        question: "They _____ take the bus to school.",
        options: ["aren't going to", "won't going", "are going to", "is going to"],
        correctAnswer: 0
      },
      {
        question: "I _____ buy a new phone next.",
        options: ["is going to", "am going to", "going", "am"],
        correctAnswer: 1
      }
    ],
    'simple-past': [
      {
        question: "Where _____ you yesterday.",
        options: ["did", "do", "does", "is going"],
        correctAnswer: 0
      },
      {
        question: "What time _____ the train arrive.",
        options: ["does not", "do", "did", "have lost"],
        correctAnswer: 2
      },
      {
        question: "She _____ her homework last night.",
        options: ["finished", "finish", "will finish", "are eating"],
        correctAnswer: 0
      },
      {
        question: "They _____ to Paris in 2019.",
        options: ["watch", "travels", "travel", "travaled"],
        correctAnswer: 3
      },
      {
        question: "_____ he see the movie last weekend?.",
        options: ["do", "did", "does", "has"],
        correctAnswer: 1
      },
      {
        question: "We _____ pizza for dinner yesterday",
        options: ["eat", "will aet", "ate", "going ate"],
        correctAnswer: 2
      },
      {
        question: "She _____ a book two days ago.",
        options: ["buying", "buyed", "bought", "buy"],
        correctAnswer: 2
      },
      {
        question: "What _____ you do last summer.",
        options: ["did", "do", "will", "vacation"],
        correctAnswer: 0
      },
      {
        question: "They _____ to Paris in 2019.",
        options: ["travel", "have traveled", "are traveling", "traveled"],
        correctAnswer: 3
      },
      {
        question: "The phone _____ while I was taking a shower.",
        options: ["rings", "rang", "is ringing", "has rung"],
        correctAnswer: 1
      }
    ],
    'present-simple': [
      {
        question: "My dog always _____ on my bad.",
        options: ["sleep", "sleeping", "sleeps", "drank"],
        correctAnswer: 0
      },
      {
        question: "I _____ by watching comedy series.",
        options: ["relaxes", "relaxing", "relax", "relation"],
        correctAnswer: 2
      },
      {
        question: "Do you _____ to travel the world.",
        options: ["likes", "like", "liking", "love"],
        correctAnswer: 1
      },
      {
        question: "My favorite series _____ Friends.",
        options: ["go", "is", "are", "be"],
        correctAnswer: 3
      },
      {
        question: "When i am stressed, I _____ .",
        options: ["dancing", "has", "dance", "dances"],
        correctAnswer: 2
      },
      {
        question: "She _____ delicius meals every day.",
        options: ["cook", "cooks", "cooking", "rose"],
        correctAnswer: 0
      },
      {
        question: "_____ she _____ English?",
        options: ["Do / speak", "Does / speak", "Is / speaking", "Did / speak"],
        correctAnswer: 1
      },
      {
        question: "My parents _____ in a small house.",
        options: ["lived", "lives", "are living", "live"],
        correctAnswer: 3
      },
      {
        question: "The train _____ at 9 AM every day.",
        options: ["leave", "leaves", "is leaving", "left"],
        correctAnswer: 1
      },
      {
        question: "I _____ coffee. I prefer tea.",
        options: ["don't like", "doesn't like", "am not liking", "didn't like"],
        correctAnswer: 0
      }
    ]
  };

  // State variables
  let currentTopic = '';
  let currentQuestionIndex = 0;
  let score = 0;
  let answeredCorrectly = false;
  let userAnswers = [];

  // DOM Elements
  const topicSelection = document.getElementById('topic-selection');
  const quizContainer = document.getElementById('quiz-container');
  const resultsContainer = document.getElementById('results-container');
  const topicButtons = document.querySelectorAll('.tab-button');
  const topicTitle = document.getElementById('topic-title');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const questionCounter = document.getElementById('question-counter');
  const scoreCounter = document.getElementById('score-counter');
  const progressBar = document.getElementById('progress-bar');
  const nextBtn = document.getElementById('next-btn');
  const backBtn = document.getElementById('back-btn');
  const feedback = document.getElementById('feedback');
  const finalScore = document.getElementById('final-score');
  const performanceMessage = document.getElementById('performance-message');
  const restartBtn = document.getElementById('restart-btn');
  const newTopicBtn = document.getElementById('new-topic-btn');
  const resultIcon = document.getElementById('result-icon');

  // Event Listeners
  topicButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentTopic = button.dataset.topic;
      startQuiz();
    });
  });

  backBtn.addEventListener('click', () => {
    showTopicSelection();
  });

  nextBtn.addEventListener('click', () => {
    goToNextQuestion();
  });

  restartBtn.addEventListener('click', () => {
    restartQuiz();
  });

  newTopicBtn.addEventListener('click', () => {
    showTopicSelection();
  });

  // Initialize from localStorage if available
  initializeFromStorage();

  // Functions
  function initializeFromStorage() {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      const state = JSON.parse(savedState);
      currentTopic = state.currentTopic;
      currentQuestionIndex = state.currentQuestionIndex;
      score = state.score;
      userAnswers = state.userAnswers;
      
      if (currentTopic && currentQuestionIndex < 10) {
        startQuiz();
      }
    }
  }

  function saveToStorage() {
    const state = {
      currentTopic,
      currentQuestionIndex,
      score,
      userAnswers
    };
    localStorage.setItem('quizState', JSON.stringify(state));
  }

  function startQuiz() {
    // Reset if starting a new topic
    if (userAnswers.length === 0 || (userAnswers[0] && userAnswers[0].topic !== currentTopic)) {
      currentQuestionIndex = 0;
      score = 0;
      userAnswers = [];
    }
    
    // Update UI for active topic
    topicButtons.forEach(button => {
      if (button.dataset.topic === currentTopic) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    
    // Set topic title
    const topicNames = {
      'future-simple': 'Future Simple',
      'simple-past': 'Simple Past',
      'present-simple': 'Present Simple'
    };
    
    topicTitle.textContent = topicNames[currentTopic];
    
    // Show quiz container
    topicSelection.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    
    // Load question
    loadQuestion();
    saveToStorage();
  }

  function loadQuestion() {
    // Update progress UI
    questionCounter.textContent = `Question ${currentQuestionIndex + 1}/10`;
    scoreCounter.textContent = `Score: ${score}`;
    progressBar.style.width = `${(currentQuestionIndex + 1) * 10}%`;
    
    // Get current question
    const currentQuestion = quizData[currentTopic][currentQuestionIndex];
    
    // Set question text
    questionText.textContent = currentQuestion.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Add options
    currentQuestion.options.forEach((option, index) => {
      const optionBtn = document.createElement('button');
      optionBtn.classList.add(
        'option-btn',
        'w-full',
        'text-left',
        'p-4',
        'border',
        'border-gray-200',
        'rounded-lg',
        'hover:bg-gray-50'
      );
      optionBtn.innerHTML = `
        <span class="inline-block w-8 h-8 mr-3 text-center leading-8 bg-indigo-100 text-indigo-800 rounded-full font-medium">
          ${String.fromCharCode(65 + index)}
        </span>
        ${option}
      `;
      
      // Check if this question has already been answered
      const existingAnswer = userAnswers.find(a => 
        a.topic === currentTopic && a.questionIndex === currentQuestionIndex
      );
      
      if (existingAnswer) {
        if (existingAnswer.selectedOption === index) {
          if (index === currentQuestion.correctAnswer) {
            optionBtn.classList.add('correct');
          } else {
            optionBtn.classList.add('incorrect');
          }
        } else if (index === currentQuestion.correctAnswer) {
          optionBtn.classList.add('correct');
        }
        optionBtn.disabled = true;
        nextBtn.classList.remove('hidden');
      } else {
        // Add click event for unanswered questions
        optionBtn.addEventListener('click', () => selectOption(index));
      }
      
      optionsContainer.appendChild(optionBtn);
    });
    
    // Hide next button until an option is selected
    if (!existingAnswerForCurrentQuestion()) {
      nextBtn.classList.add('hidden');
      feedback.classList.add('hidden');
    }
  }

  function existingAnswerForCurrentQuestion() {
    return userAnswers.some(a => 
      a.topic === currentTopic && a.questionIndex === currentQuestionIndex
    );
  }

  function selectOption(selectedIndex) {
    const currentQuestion = quizData[currentTopic][currentQuestionIndex];
    const options = optionsContainer.querySelectorAll('.option-btn');
    
    // Disable all options
    options.forEach((option, index) => {
      option.disabled = true;
      
      if (index === selectedIndex) {
        if (selectedIndex === currentQuestion.correctAnswer) {
          option.classList.add('correct');
          score++;
          scoreCounter.textContent = `Score: ${score}`;
          answeredCorrectly = true;
          
          // Show feedback
          feedback.textContent = "Correct! Well done!";
          feedback.className = "p-4 rounded-lg mb-4 bg-green-100 text-green-800";
        } else {
          option.classList.add('incorrect');
          answeredCorrectly = false;
          
          // Show feedback
          feedback.textContent = "Incorrect. The correct answer is highlighted.";
          feedback.className = "p-4 rounded-lg mb-4 bg-red-100 text-red-800";
        }
      } else if (index === currentQuestion.correctAnswer) {
        option.classList.add('correct');
      }
    });
    
    // Record user's answer
    userAnswers.push({
      topic: currentTopic,
      questionIndex: currentQuestionIndex,
      selectedOption: selectedIndex,
      correct: selectedIndex === currentQuestion.correctAnswer
    });
    
    // Show next button
    nextBtn.classList.remove('hidden');
    feedback.classList.remove('hidden');
    
    // Save state
    saveToStorage();
  }

  function goToNextQuestion() {
    currentQuestionIndex++;
    
    // Check if quiz is complete
    if (currentQuestionIndex >= 10) {
      showResults();
    } else {
      loadQuestion();
    }
    
    saveToStorage();
  }

  function showResults() {
    quizContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    // Update final score
    finalScore.innerHTML = `Your score: <span class="font-bold text-indigo-700">${score}/10</span>`;
    
    // Set performance message and icon
    if (score === 10) {
      performanceMessage.textContent = "Perfect! You've mastered this topic!";
      resultIcon.className = "fas fa-trophy text-6xl text-yellow-500 mb-4";
    } else if (score >= 7) {
      performanceMessage.textContent = "Great job! You're doing very well!";
      resultIcon.className = "fas fa-star text-6xl text-indigo-500 mb-4";
    } else if (score >= 5) {
      performanceMessage.textContent = "Good effort! Keep practicing to improve.";
      resultIcon.className = "fas fa-thumbs-up text-6xl text-blue-500 mb-4";
    } else {
      performanceMessage.textContent = "Keep practicing! You'll get better with time.";
      resultIcon.className = "fas fa-book text-6xl text-purple-500 mb-4";
    }
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    saveToStorage();
    startQuiz();
  }

  function showTopicSelection() {
    quizContainer.classList.add('hidden');
    resultsContainer.classList.add('hidden');
    topicSelection.classList.remove('hidden');
    
    // Reset active state on topic buttons
    topicButtons.forEach(button => button.classList.remove('active'));
    
    // Clear saved state
    localStorage.removeItem('quizState');
  }