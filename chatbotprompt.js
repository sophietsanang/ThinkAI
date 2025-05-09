const prompts = [
    {
        question: "Hi there! How would you like to introduce yourself?",
        options: [
            { text: "Hi, I’m Jamie Smith from Lincoln Middle School.", personal: ["full legal name", "school"] },
            { text: "Hello, I’m looking forward to chatting today! I go by Emily Chen.", personal: ["full legal name"] },
            { text: "Hey, I'm Darius Gordon!", personal: ["full legal name"] },
            { text: "Hi there! Excited to chat with you today. Just call me T!", personal: [] }
        ]
    },
    {
        question: "Alright! How can I help you today?",
        options: [
            { text: "I love playing soccer at Central Park with my friends, but today the weather was bad. Do you have any fun rainy weather suggestions?", personal: [] },
            { text: "I usually go to Central Park everyday at 2pm with my friends to play soccer. The weather is bad today, so do you have any suggestions?", personal: ["specific routine/location: Central Park, daily, 2pm"] },
            { text: "I’m part of the soccer club at Lincoln Middle School. We couldn't play today because of the rain. Do you have any suggestions?", personal: ["school"] },
            { text: "I didn't get to go out with my friends today because of the weather. Do you know any fun indoor activities a 14 year old could do?", personal: ["age"] }
        ]
    },
    {
        question: "Hmmm. You could read a book, play board games, have a trivia night, or play karaoke! Would you like suggestions for a specific group size, age, or vibe (like chill, energetic, or educational)?",
        options: [
            { text: "Well, I'm 14 and my friends are either 14 or 15, so I'd like something for that age.", personal: ["age"] },
            { text: "I don't like board games. I usually play video games with my brother, but he's busy right now. Can you suggest something for ages 12-15 that's as exciting as video games?", personal: [] },
            { text: "Well, I want to do something exciting where I can share my culture with my two friends because they are not desi. My friend, Elijah Jackson, is Black, and Emily Linnell is White. How can I share my Tamil culture with them in a fun exciting way since we can't play soccer today? ", personal: ["full legal name(s)", "race/ethnicity"] },
            { text: "I want something exciting! Do you have any suggestions? I'm 15 years old.", personal: ["age"] }
        ]
    },
    {
        question: "Those sound like great ideas! If you and your friends could do an acitivity together what would it be, and where would you love to do it? Maybe you all could go see a movie! It's the perfect thing to do in bad weather conditions.",
        options: [
            { text: "It would be fun to have a movie night at our school, Lincoln Middle, with everyone all together. Maybe I'll host a movie night tonight!", personal: ["school"] },
            { text: "My friend, Stacey, doesn't like the movies, but I would do that. Our school, Lincoln Middle, just had a movie night! I can watch one at home then.", personal: ["first name(s) with identifying context"] },
            { text: "Honestly, anywhere as long as I'm with my friends and we're having fun! I would go to the arcade if we could right now. I'll go watch a play a board game though. Thank you!", personal: [] },
            { text: "Nevermind. It says it won't rain tomorrow 04/05/2025, so we will go to Central Park tomorrow at 2pm.", personal: ["specific routine/location: Central Park, 04/05/2025, at 4pm"] }
        ]
    },
    {
        question: "Happy I could help! Thanks for chatting with me. Before we finish, is there anything else you need help with today? Maybe planning your birthday party, a homework assignment, or a question for me?",
        options: [
            { text: "I'm all set for now, thanks!", personal: [] },
            { text: "My birthday is actually coming up. I was born November 11th 2010. I would love help with planning it.", personal: ["DOB"]},
            { text: "What's your favorite movie? I like action movies, especially ones set in New York.", personal: [] },
            { text: "Yes, actually. My friend, Zoe, sent me her email, but I'm having issues with it. Is there something wrong with my email address? It's janedoe@mandy.com. I just created it.", personal: ["email address"] }
        ]
    }
    // Later add more prompts that build off of one another (more depth, etc.)
    // Give a school e.g. requesting homework help etc. with personal identifiers on the pdf's/files etc.
];

let currentPrompt = 0;
let collectedData = [];

function renderPrompt() {
    const container = document.querySelector('.bot-container');
    container.innerHTML = ''; // Clear previous content

    // Display chatbot question
    const questionDiv = document.createElement('div');
    questionDiv.className = 'bot-question';
    questionDiv.textContent = prompts[currentPrompt].question;
    container.appendChild(questionDiv);

    // Create wrapper for the buttons
    const optionsWrapper = document.createElement('div');
    optionsWrapper.className = 'options-wrapper'; // Added this class for styling

    // Display options as buttons
    prompts[currentPrompt].options.forEach((option) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option.text;
        btn.onclick = () => handleOptionClick(option);
        container.appendChild(btn);
    });
    container.appendChild(optionsWrapper);
}

function handleOptionClick(option) {
    // Store any personal data shared
    collectedData = collectedData.concat(option.personal);

    // Show user's choice (optional)
    const container = document.querySelector('.bot-container');
    const userDiv = document.createElement('div');
    userDiv.className = 'user-choice';
    userDiv.textContent = `You: ${option.text}`;
    container.appendChild(userDiv);

    // Move to next prompt or finish
    currentPrompt++;
    if (currentPrompt < prompts.length) {
        setTimeout(renderPrompt, 700); // Pause before next prompt
    } else {
        setTimeout(showSummary, 700);
    }
}

function showSummary() {
    const container = document.querySelector('.bot-container');
    container.innerHTML = '<div class="bot-question">Simulation complete!</div>';

    if (collectedData.length > 0) {
        const uniqueData = [...new Set(collectedData)];
        container.innerHTML += `<div class="bot-summary">
            <strong>Personal data collected:</strong> ${uniqueData.join(', ')}.<br>
            Remember, sharing personal info online can be risky!
        </div>`;
    } else {
        container.innerHTML += `<div class="bot-summary">
            <strong>Great job!</strong> You didn't share any personal information.
        </div>`;
    }
    // Add a restart button
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Recreate Effect';
    restartBtn.onclick = () => {
        currentPrompt = 0;
        collectedData = [];
        renderPrompt();
    };
    container.appendChild(restartBtn);
}

// Start the simulation
window.onload = renderPrompt;
