/**
 * Quiz application functionality using sessionStorage
 */

// Quiz questions (in a real app, these would come from a server)
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: 0
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: [
            "String",
            "Boolean",
            "Float",
            "Object"
        ],
        correctAnswer: 2
    },
    {
        question: "Which CSS property is used to control the spacing between elements?",
        options: [
            "spacing",
            "margin",
            "padding",
            "gap"
        ],
        correctAnswer: 1
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on
    const currentPage = window.location.pathname;
    
    // Handle home page
    if (currentPage.includes('index.html') || currentPage.endsWith('quiz-app/')) {
        handleHomePage();
    }
    
    // Handle quiz page
    if (currentPage.includes('quiz.html')) {
        handleQuizPage();
    }
    
    // Handle results page
    if (currentPage.includes('results.html')) {
        handleResultsPage();
    }
});

/**
 * Handle the home page
 */
function handleHomePage() {
    const startQuizBtn = document.getElementById('start-quiz-btn');
    
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', function() {
            // Initialize quiz data in sessionStorage
            sessionStorage.setItem('currentQuestion', '0');
            sessionStorage.setItem('quizStarted', 'true');
            
            // Initialize answers array
            const emptyAnswers = Array(quizQuestions.length).fill(null);
            sessionStorage.setItem('userAnswers', JSON.stringify(emptyAnswers));
            
            // Redirect to quiz page
            window.location.href = 'quiz.html';
        });
    }
}

/**
 * Handle the quiz page
 */
function handleQuizPage() {
    // Check if quiz has been started
    if (sessionStorage.getItem('quizStarted') !== 'true') {
        // Redirect to home page if quiz hasn't been started
        window.location.href = 'index.html';
        return;
    }
    
    const quizContainer = document.getElementById('quiz-container');
    const currentQuestionElement = document.getElementById('current-question');
    const totalQuestionsElement = document.getElementById('total-questions');
    const progressBar = document.getElementById('progress-bar');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Get current question index from sessionStorage
    let currentQuestionIndex = parseInt(sessionStorage.getItem('currentQuestion') || '0');
    
    // Get user answers from sessionStorage
    let userAnswers = JSON.parse(sessionStorage.getItem('userAnswers') || '[]');
    
    // Update UI elements
    if (totalQuestionsElement) {
        totalQuestionsElement.textContent = quizQuestions.length;
    }
    
    // Function to display the current question
    function displayQuestion() {
        if (quizContainer) {
            // Update current question number
            if (currentQuestionElement) {
                currentQuestionElement.textContent = currentQuestionIndex + 1;
            }
            
            // Update progress bar
            if (progressBar) {
                const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
                progressBar.style.width = `${progress}%`;
            }
            
            // Get the current question
            const question = quizQuestions[currentQuestionIndex];
            
            // Create question HTML
            quizContainer.innerHTML = `
                <div class="question">
                    <h3>${question.question}</h3>
                    <div class="options">
                        ${question.options.map((option, index) => `
                            <div class="option ${userAnswers[currentQuestionIndex] === index ? 'selected' : ''}" data-index="${index}">
                                ${option}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            // Add event listeners to options
            const optionElements = quizContainer.querySelectorAll('.option');
            optionElements.forEach(option => {
                option.addEventListener('click', function() {
                    // Remove selected class from all options
                    optionElements.forEach(opt => opt.classList.remove('selected'));
                    
                    // Add selected class to clicked option
                    this.classList.add('selected');
                    
                    // Save answer to sessionStorage
                    const answerIndex = parseInt(this.getAttribute('data-index'));
                    userAnswers[currentQuestionIndex] = answerIndex;
                    sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));
                });
            });
            
            // Update button states
            if (prevBtn) {
                prevBtn.disabled = currentQuestionIndex === 0;
            }
            
            if (nextBtn) {
                if (currentQuestionIndex === quizQuestions.length - 1) {
                    nextBtn.textContent = 'Finish Quiz';
                } else {
                    nextBtn.textContent = 'Next';
                }
            }
        }
    }
    
    // Display the current question
    displayQuestion();
    
    // Handle previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                sessionStorage.setItem('currentQuestion', currentQuestionIndex.toString());
                displayQuestion();
            }
        });
    }
    
    // Handle next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                sessionStorage.setItem('currentQuestion', currentQuestionIndex.toString());
                displayQuestion();
            } else {
                // Calculate score
                calculateScore();
                
                // Redirect to results page
                window.location.href = 'results.html';
            }
        });
    }
}

/**
 * Calculate the quiz score
 */
function calculateScore() {
    const userAnswers = JSON.parse(sessionStorage.getItem('userAnswers') || '[]');
    let score = 0;
    
    userAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correctAnswer) {
            score++;
        }
    });
    
    // Save score to sessionStorage
    sessionStorage.setItem('quizScore', score.toString());
    sessionStorage.setItem('quizCompleted', 'true');
}

/**
 * Handle the results page
 */
function handleResultsPage() {
    // Check if quiz has been completed
    if (sessionStorage.getItem('quizCompleted') !== 'true') {
        // Redirect to home page if quiz hasn't been completed
        window.location.href = 'index.html';
        return;
    }
    
    const scoreDisplay = document.getElementById('score-display');
    const scoreMessage = document.getElementById('score-message');
    const answersContainer = document.getElementById('answers-container');
    const backToHomeBtn = document.getElementById('back-to-home-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    
    // Get score from sessionStorage
    const score = parseInt(sessionStorage.getItem('quizScore') || '0');
    const userAnswers = JSON.parse(sessionStorage.getItem('userAnswers') || '[]');
    
    // Display score
    if (scoreDisplay) {
        scoreDisplay.textContent = `${score}/${quizQuestions.length}`;
    }
    
    // Display score message
    if (scoreMessage) {
        const percentage = (score / quizQuestions.length) * 100;
        
        if (percentage === 100) {
            scoreMessage.textContent = 'Perfect! You got all questions correct!';
        } else if (percentage >= 70) {
            scoreMessage.textContent = 'Great job! You know your web development!';
        } else if (percentage >= 40) {
            scoreMessage.textContent = 'Not bad, but there\'s room for improvement.';
        } else {
            scoreMessage.textContent = 'You might want to study more web development concepts.';
        }
    }
    
    // Display answers review
    if (answersContainer) {
        quizQuestions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            const answerReview = document.createElement('div');
            answerReview.className = 'answer-review';
            answerReview.innerHTML = `
                <h4>Question ${index + 1}: ${question.question}</h4>
                <p>Your answer: <span style="color: ${isCorrect ? '#2ecc71' : '#e74c3c'}">
                    ${userAnswer !== null ? question.options[userAnswer] : 'Not answered'}
                </span></p>
                ${!isCorrect ? `<p>Correct answer: <span style="color: #2ecc71">
                    ${question.options[question.correctAnswer]}
                </span></p>` : ''}
            `;
            
            answersContainer.appendChild(answerReview);
        });
    }
    
    // Handle back to home button
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Handle restart quiz button
    if (restartQuizBtn) {
        restartQuizBtn.addEventListener('click', function() {
            // Clear quiz data from sessionStorage
            sessionStorage.removeItem('currentQuestion');
            sessionStorage.removeItem('quizStarted');
            sessionStorage.removeItem('userAnswers');
            sessionStorage.removeItem('quizScore');
            sessionStorage.removeItem('quizCompleted');
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
}
