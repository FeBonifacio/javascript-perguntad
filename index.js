
const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");
import questions from "./questions.js";

// Inicializa as variáveis currentIndex e questionsCorrect para controlar o estado do quiz
let currentIndex = 0;
let questionsCorrect = 0;

// Define um evento de clique para o botão "btnRestart" que reinicia o quiz
btnRestart.onclick = () => {
    // Mostra o conteúdo e oculta a mensagem de finalização
    content.style.display = "flex";
    contentFinish.style.display = "none";

    // Reinicia o índice da pergunta atual e o número de perguntas corretas
    currentIndex = 0;
    questionsCorrect = 0;

    // Carrega a primeira pergunta
    loadQuestion();
}


// Função que exibe a mensagem de finalização do quiz
function finish() {
    textFinish.innerHTML = `Certo!, Você está buscando evoluir, entre em contato com o tel 11 94064-4482`;
    content.style.display = 'none'; // Oculta o conteúdo do quiz
    contentFinish.style.display = "flex"; // Exibe a mensagem de finalização
}

// Função que avança para a próxima pergunta
function nextQuestion(e) {
    // (2) Verifica se a resposta selecionada está correta e atualiza o contador de perguntas corretas
    if (e.target.getAttribute("data-correct") === "true") {
        questionsCorrect++;
    }

    // (1) Verifica se ainda existem mais perguntas para exibir
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        loadQuestion(); // Carrega a próxima pergunta
    } else {
        finish(); // Finaliza o quiz se todas as perguntas foram respondidas
    }
}

// (3) Função que carrega a próxima pergunta do quiz
function loadQuestion() {
    spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`; // Atualiza o contador de perguntas
    const item = questions[currentIndex]; // Obtém a próxima pergunta do array de perguntas
    answers.innerHTML = ""; // Limpa as respostas anteriores

    // Preenche o elemento HTML com as perguntas e respostas
    question.innerHTML = item.question;
    item.answers.forEach((answer) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <button class="answer" data-correct="${answer.correct}">
                ${answer.option}
            </button>
        `;
        answers.appendChild(div);
    });

    // Adiciona um evento de clique para cada resposta
    document.querySelectorAll(".answer").forEach((item) => {
        item.addEventListener("click", nextQuestion);
    });
}

// Carrega a primeira pergunta ao iniciar o quiz
loadQuestion();
