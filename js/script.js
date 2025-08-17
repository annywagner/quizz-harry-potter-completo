import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

let atual = 0;
let perguntaAtual;
let historiaFinal = "";
let acertos = 0; 

const caixaPrincipal = document.querySelector('.caixa-principal'); // Seleciona a caixa principal
const caixaPerguntas = document.createElement('div'); // Cria a caixa de perguntas
const caixaAlternativas = document.createElement('div'); // Cria a caixa de alternativas
const caixaResultado = document.createElement('div'); // Cria a caixa de resultado
const textoResultado = document.createElement('p'); // Cria o parágrafo para o resultado
const botaoJogarNovamente = document.createElement('button'); // Cria o botão "Jogar Novamente"
const botaoComecar = document.getElementById('comecarBtn'); // Seleciona o botão "Começar Jogo"
const mensagemInical = document.querySelector('.mensagem-inicial');

// Adiciona as classes para as novas caixas
caixaPerguntas.classList.add('caixa-perguntas');
caixaAlternativas.classList.add('caixa-alternativas');
caixaResultado.classList.add('caixa-resultado');

// Configura o botão "Jogar Novamente"
botaoJogarNovamente.textContent = "Jogar Novamente";
botaoJogarNovamente.classList.add('novamente-btn');
botaoJogarNovamente.style.display = 'none'; // Esconde o botão inicialmente

// Adiciona as novas caixas à caixa principal
caixaPrincipal.appendChild(caixaPerguntas);
caixaPrincipal.appendChild(caixaAlternativas);
caixaResultado.appendChild(textoResultado);
caixaResultado.appendChild(botaoJogarNovamente);
caixaPrincipal.appendChild(caixaResultado); // Adiciona a caixa de resultado à caixa principal

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    if (opcaoSelecionada.correta) {
        acertos++; 
    }
    
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "";
    textoResultado.textContent = historiaFinal + ` Você acertou ${acertos} de ${perguntas.length} perguntas.`;
    caixaAlternativas.textContent = "";
    caixaResultado.classList.add("mostrar");
    botaoJogarNovamente.style.display = 'block'; // Exibe o botão "Jogar Novamente"
}

function jogaNovamente() {
    atual = 0;
    historiaFinal = "";
    acertos = 0; 
    caixaResultado.classList.remove("mostrar");
    botaoJogarNovamente.style.display = 'none'; // Esconde o botão "Jogar Novamente"
    mostraPergunta();
}

// Função para substituir o nome nas perguntas
function substituiNome() {
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(/você/g, nome);
    }
}

function iniciarJogo() {
    atual = 0; 
    acertos = 0; 
    historiaFinal = ""; 
    caixaPerguntas.classList.remove("mostrar");
    caixaAlternativas.classList.remove("mostrar");
    caixaResultado.classList.remove("mostrar"); 
    mostraPergunta(); 
    botaoComecar.style.display = 'none'; 
    mensagemInical.style.display = 'none';
}

substituiNome();

botaoComecar.addEventListener('click', iniciarJogo);
botaoJogarNovamente.addEventListener("click", jogaNovamente);
