const quizData = [
    {
      question: "Scenario: You see an AI-generated video of a celebrity making a shocking statement about a political issue. The video looks real, and many people are sharing it online. What should you do?",
      answers: [
        "Share the video with your friends immediately—it looks interesting!",
        "Use an AI tool to create a fake response video for fun.",
        "Comment on the post saying, 'This is crazy!' and help spread the conversation.",
        "Fact-check the video by looking at trusted news sources before deciding if it’s real."
      ],
      correct: 3
    },
    {
      question: "Scenario: A company is using AI to screen job applications, but the AI keeps rejecting candidates from certain backgrounds. An employee notices this trend and reports it. What should the company do?",
      answers: [
        "Ignore the report—AI is unbiased and must be correct.",
        "Review how the AI was trained and check if the data is biased.",
        "Tell rejected applicants they were just unlucky and unqualified.",
        "Shut down the AI system completely and never use it again."
      ],
      correct: 1
    },
    {
        question: "Scenario: You’re chatting with an AI homework helper, and it asks for your full name, location, and school to “personalize” its responses. What should you do?",
        answers: [
            "Give all the information—AI needs it to help you better.",
            "Only provide general information and avoid sharing personal details.",
            "Ask the chatbot why it needs that information before deciding.",
            "Both B and C"
        ],
        correct: 3
    },
    {
        question: "Scenario: You use an AI art generator to create a painting and submit it to an online art competition, claiming it’s your original work. Is this ethical?",
        answers: [
          "Yes, since you used the AI tool yourself, it’s your creation.",
          "No, because AI-generated art is based on existing works and may copy artists’ styles.",
          "Yes, as long as you don’t tell anyone it was made with AI.",
          "No, but you can enter if you mention that AI helped you."
        ],
        correct: 3
    },
    {
        question: "Scenario: A city wants to use AI-powered facial recognition to catch criminals. However, studies show that facial recognition AI has higher error rates for certain racial groups, leading to false arrests. What should the city do?",
        answers: [
          "Use the AI system anyway—it’s better than nothing.",
          "Stop using the AI and rely only on human police work.",
          "Improve the AI by training it with more diverse and fair datasets to reduce bias.",
          "Ignore the errors since most people caught are actually criminals."
        ],
        correct: 2
    }, 
    {
        question: "Scenario: Your friend uses ChatGPT to write their entire history essay and submits it as their own work. What would be the most ethical response?",
        answers: [
          "Say nothing—it’s their choice.",
          "Report them to the teacher immediately.",
          "Tell them AI should be used for helping understand topics, not replacing their own effort.",
          "Use AI to write your own essay too, so it’s fair."
        ],
        correct: 2
      },
      {
        question: "Scenario: A hospital starts using AI to analyze patient scans and diagnose diseases. One doctor notices that the AI sometimes makes mistakes, but other doctors trust it completely. What should be done?",
        answers: [
          "Doctors should always double-check AI’s diagnoses instead of blindly trusting it.",
          "Ignore the mistakes—AI is more advanced than humans.",
          "Shut down the AI and return to traditional diagnoses.",
          "Let AI make all the decisions since it works faster than doctors."
        ],
        correct: 0
      },
      {
        question: "Scenario: A news website starts using AI to write articles about real-world events. The AI produces articles quickly, but sometimes the facts are wrong. What should the company do?",
        answers: [
          "Keep using the AI but add human editors to fact-check the articles.",
          "Rely only on AI—it’s faster than human journalists.",
          "Ignore small mistakes since AI improves over time.",
          "Let AI write whatever it wants because people will figure out what’s real."
        ],
        correct: 0
      },
      {
        question: "Scenario: A restaurant owner wants to improve their rating online, so they use AI to generate fake positive reviews. Is this ethical?",
        answers: [
          "Yes, because other businesses do it too.",
          "No, because fake reviews mislead customers and are dishonest.",
          "Yes, if the restaurant really has good food.",
          "No, but they should use AI to create better advertisements instead."
        ],
        correct: 1
      }


  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  function loadQuestion() {
    const quizElement = document.getElementById("quiz");
    const questionData = quizData[currentQuestion];
  
    let questionHTML = `
      <div class="question">${questionData.question}</div>
      <div class="answers">
    `;
  
    questionData.answers.forEach((answer, index) => {
      questionHTML += `<button onclick="checkAnswer(${index}, this)">${answer}</button>`;
    });
  
    questionHTML += `
      </div>
      <div id="feedback" class="feedback"></div>
      <div class="next-container">
        <button id="nextBtn" class="next-btn" onclick="nextQuestion()" style="display: none;">Next Question →</button>
      </div>
    `;
  
    quizElement.innerHTML = questionHTML;
  }
  
  function checkAnswer(selectedIndex, buttonEl) {
    const correctIndex = quizData[currentQuestion].correct;
    const feedbackEl = document.getElementById("feedback");
  
    
    if (selectedIndex === correctIndex) {
      feedbackEl.textContent = "✅ Correct!";
      feedbackEl.style.color = "green";
  
      document.querySelectorAll(".answers button").forEach(btn => btn.disabled = true);
  
      if (!document.getElementById("nextBtn").style.display || document.getElementById("nextBtn").style.display === "none") {
        score++;
      }
  
      document.getElementById("nextBtn").style.display = "inline-block";
    } else {
      feedbackEl.textContent = "❌ Incorrect. Try again!";
      feedbackEl.style.color = "red";
    }
  }
  
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      document.getElementById("quiz").innerHTML = `
        <h2>🎉 Quiz Complete!</h2>
        <p>You answered <strong>${score}</strong> out of <strong>${quizData.length}</strong> questions correctly.</p>
        <p>Thanks for testing your AI awareness skills!</p>
      `;
    }
  }
  
  window.onload = loadQuestion;
  