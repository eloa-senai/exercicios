let quizSubmitted = false;

function disableOptions(questionName) {
    let options = document.getElementsByName(questionName);
    options.forEach(option => {
        if (!option.checked) {
            option.disabled = true;
        }
    });
}

function playSound() {
    let clickSound = document.getElementById('selecionasom');
    clickSound.play();
}

function setButtonStates(submitted) {
    let submitButton = document.getElementById('submit-button');
    let clearButton = document.getElementById('clear-button');
    if (submitButton) submitButton.disabled = submitted;
    if (clearButton) clearButton.disabled = !submitted;
}

function submitQuiz() {
    let correctAnswers = {
        q1: "C",
        q2: "D",
        q3: "A",
        q4: "C",
        q5: "B",
        q6: "A",
        q7: "B",
        q8: "D",
        q9: "B",
        q10: "B"
    };

    let form = document.getElementById('quiz-form');
    let score = 0;

    for (let key in correctAnswers) {
        let selected = form.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === correctAnswers[key]) {
            score++;
        }
    }

    let result = document.getElementById('result');
    result.innerHTML = `Você acertou ${score} de 10 perguntas.`;

    if (score >= 8) {
        document.getElementById('venceusom').play();
    }

    if (score < 3) {
        document.getElementById('perdeusom').play();
    }

    if (score === 0) {
        result.innerHTML += " Você não acertou nenhuma pergunta. Tente novamente!";
    } else if (score <= 3) {
        result.innerHTML += " Você acertou poucas perguntas. Continue estudando!";
    } else if (score <= 7) {
        result.innerHTML += " Você acertou algumas perguntas. Quase lá!";
    } else if (score <= 9) {
        result.innerHTML += " Parabéns! Você acertou a maioria das perguntas!";
    } else if (score === 10) {
        result.innerHTML += " Incrível! Você acertou todas as perguntas!";
    }

    quizSubmitted = true;
    setButtonStates(true);
}

function resetQuiz() {
    if (!quizSubmitted) return;

    let form = document.getElementById('quiz-form');
    form.reset();

    let result = document.getElementById('result');
    result.innerHTML = "";

    form.querySelectorAll('input[type="radio"]').forEach(option => {
        option.disabled = false;
    });

    quizSubmitted = false;
    setButtonStates(false);
}

window.addEventListener('DOMContentLoaded', () => setButtonStates(false));