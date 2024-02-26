let currentQuestionIndex = 0;
    let questions = [];
    let contador=0; 
    let pregunta=0; 

    const getQuestions = async () => {
        const response = await fetch('https://opentdb.com/api.php?amount=15&category=9&difficulty=medium&type=multiple');
        const data = await response.json();
        questions = data.results;
        showQuestion();
        hideWindowContent("app-questions");
        hideWindowContent("app-end");
    };

    const hideWindowContent = (id) => {
        $("#" + id).addClass("hidden");
    };

    const showWindowContent = (id) => {
        $("#" + id).removeClass("hidden");
    };

  $("#start-btn").on("click", (event) => {
        hideWindowContent("app-entry");
        hideWindowContent("app-end");
        showWindowContent("app-questions");
    }); 

    

    function showQuestion() {
        
        const currentQuestion = questions[currentQuestionIndex];
        const questionElement = document.getElementById('question');
        questionElement.innerHTML = `
            <h5 class="card-title">${currentQuestion.question}</h5>
        `;
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';
        const allOptions = shuffle([...currentQuestion.incorrect_answers, currentQuestion.correct_answer]);
        allOptions.forEach(option => {
            const optionButton = document.createElement('button');
            optionButton.innerHTML = option;
            optionButton.style.fontSize = '17px';
            optionButton.style.margin = '4px';
            optionButton.onclick = () => checkAnswer(option === currentQuestion.correct_answer, currentQuestion.correct_answer );
            optionsContainer.appendChild(optionButton);
        });
        //document.getElementById('contador').innerHTML = contador; 
    }

    function checkAnswer(isCorrect, correct_answer) {
        
        if (isCorrect) {
            alert('Correct answer! ✓ \n Score: '+ contador+'/10' ); 
            contador++; 

        } else {
            alert('Wrong answer!  ✗ \n The correct answer is :  '+ correct_answer+ '\n Score: '+ contador+'/10' );
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            alert('Trivial Completed! \n Score: '+ contador+'/10');
            hideWindowContent("app-entry");
            hideWindowContent("app-questions");
            showWindowContent("app-end");
            contador=0; 
        }
    }

    $("#Restart-btn").on("click", (event) => {
        hideWindowContent("app-entry");
        hideWindowContent("app-end");
        showWindowContent("app-entry");
    }); 

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

window.onload = getQuestions;






