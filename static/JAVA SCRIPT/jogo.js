let palavraAtual;
let dicaAtual;
let letrasAdivinhadas = [];
const tentativasMaximas = 6;
let tentativasRestantes;

function iniciarJogo() {
    const palavras = [
        "Tiffy", "Leon", "apartamento", "Post-it", "ex-namorado", "namorada",
        "enfermeiro", "cama", "acordos", "ciúmes", "finanças", "desafios",
        "amizade", "suporte", "rotina", "risadas", "conflitos", "sentimentos",
        "recomeço", "convivência", "segredo", "trabalho", "liberdade", "passado",
        "inseguranças", "compromissos", "comunicação", "família", "harmonia",
        "adaptação", "vulnerabilidade", "apoio", "diversão", "compreensão", "encontros",
        "separações", "conexão", "crescimento", "expectativas", "planejamento",
        "estresse", "superação", "carinho", "desentendimentos", "decisões", "coragem",
        "novos começos", "união", "intimidade"
    ];

    const dicas = [
        "Tiffy acaba de sair de um relacionamento conturbado e precisa de um novo lugar para viver.",
        "Leon propõe um acordo inusitado: dividir o apartamento com Tiffy sem nunca se encontrarem.",
        "Os dois se comunicam principalmente por meio de Post-its deixados pela casa.",
        "O ex-namorado de Tiffy se torna um obstáculo em sua nova vida.",
        "Leon trabalha como enfermeiro e tem uma namorada ciumenta.",
        "A convivência leva Tiffy e Leon a descobrirem mais sobre si mesmos.",
        "Os desafios financeiros de Leon o fazem tomar decisões arriscadas.",
        "A amizade de Tiffy com seus amigos é testada pela nova situação.",
        "Momentos engraçados surgem das interações através dos Post-its.",
        "A história explora a evolução dos sentimentos entre Tiffy e Leon.",
        "Os personagens enfrentam inseguranças enquanto tentam se adaptar à nova rotina.",
        "Tiffy aprende a lidar com seu passado e suas expectativas.",
        "Leon enfrenta a pressão de ter uma namorada ciumenta e um irmão encrencado.",
        "As interações diárias ajudam a construir uma conexão entre eles.",
        "Momentos de vulnerabilidade revelam a profundidade dos personagens.",
        "O acordo de coabitação é mais complicado do que eles previam.",
        "Tiffy tenta encontrar um equilíbrio entre sua nova vida e os amigos.",
        "A história aborda a importância da comunicação para superar mal-entendidos.",
        "Os dois desenvolvem uma amizade que começa a se transformar em algo mais.",
        "As situações cotidianas trazem à tona os sentimentos deles.",
        "Tiffy e Leon enfrentam desafios que testam a resiliência do acordo.",
        "As reações do ex-namorado de Tiffy adicionam tensão à narrativa.",
        "Os amigos de Tiffy tentam protegê-la de novas decepções.",
        "Leon descobre que precisa confrontar seus próprios demônios.",
        "Tiffy aprende a se valorizar após o término do relacionamento.",
        "A história aborda a importância da liberdade na convivência.",
        "Cenas de apoio mútuo mostram como eles crescem juntos.",
        "Tiffy e Leon desenvolvem uma rotina que traz momentos de alegria.",
        "A conexão entre os dois se aprofunda à medida que compartilham experiências.",
        "Os personagens têm que enfrentar suas inseguranças para seguir em frente.",
        "O livro retrata como o amor pode surgir de situações inusitadas.",
        "Momentos de desentendimento destacam a necessidade de comunicação.",
        "Os Post-its se tornam uma forma única de expressão para os dois.",
        "O crescimento pessoal de Tiffy é um tema importante da narrativa.",
        "Leon aprende a abrir-se emocionalmente através de Tiffy.",
        "As expectativas familiares influenciam as escolhas de Leon.",
        "Cenas de humor ajudam a aliviar a tensão acumulada.",
        "Tiffy e Leon têm que lidar com a pressão de suas vidas profissionais.",
        "Momentos de solidão são explorados quando eles se afastam.",
        "O impacto de suas decisões é sentido por todos ao redor.",
        "Tiffy descobre a importância de ser independente e forte.",
        "Leon enfrenta dilemas que desafiam suas prioridades.",
        "As interações com os amigos trazem novas perspectivas.",
        "Os dois têm que aprender a confiar um no outro.",
        "O final da história traz um desfecho que revela a evolução do amor.",
        "Cenas no apartamento refletem as mudanças na dinâmica deles.",
        "O livro fala sobre encontrar um lar em meio ao caos.",
        "A jornada dos personagens é marcada por crescimento e aceitação.",
        "O apoio emocional entre eles é fundamental para a história.",
        "Tiffy e Leon mostram que o amor pode florescer em situações inesperadas."
    ];
    
    const indiceAleatorio = Math.floor(Math.random() * palavras.length); 
    palavraAtual = palavras[indiceAleatorio];
    dicaAtual = dicas[indiceAleatorio];
    letrasAdivinhadas = [];
    tentativasRestantes = tentativasMaximas;

    document.getElementById("guess").disabled = false; // Habilita o campo de entrada
    document.querySelector(".btn-primary").disabled = false; // Habilita o botão de adivinhar
    document.getElementById("status").textContent = ""; // Limpa o status
    atualizarDisplayDoJogo();
}

function atualizarDisplayDoJogo() {
    let palavraExibida = "";

    for (let i = 0; i < palavraAtual.length; i++) { 
        const letra = palavraAtual[i];
        if (letrasAdivinhadas.indexOf(letra) !== -1 || letra === " ") {
            palavraExibida += `<span class="letra-correta">${letra}</span>`; // Letra visível
        } else {
            palavraExibida += `<span class="traco">_</span>`; // Traço visível
        }
        palavraExibida += " "; // Espaço entre as letras/tracinhos
    }

    // Atualiza a exibição de letras e tracinhos
    document.getElementById("palavra").innerHTML = palavraExibida; 
    document.getElementById("dica").textContent = `Dica: ${dicaAtual}`;
    document.getElementById("status").textContent = `Tentativas restantes: ${tentativasRestantes}`;
    document.getElementById("attempts").textContent = `Letras já tentadas: ${letrasAdivinhadas.join(", ")}`;
}

function finalizarJogo(mensagem) {
    document.getElementById("guess").disabled = true; // Desabilita o campo de entrada
    document.querySelector(".btn-primary").disabled = true; // Desabilita o botão de adivinhar
    document.getElementById("status").textContent = mensagem;
}



function adivinharLetra() {
    const entradaAdivinhacao = document.getElementById("guess"); 
    const letraAdivinhada = entradaAdivinhacao.value.toLowerCase();

    if (letraAdivinhada.length === 1 && /^[a-záéíóúäöç\s]+$/.test(letraAdivinhada)) {
        if (letrasAdivinhadas.indexOf(letraAdivinhada) === -1) {
            letrasAdivinhadas.push(letraAdivinhada);

            let letraNaoEncontrada = true;
            for (let i = 0; i < palavraAtual.length; i++) { 
                if (palavraAtual[i] === letraAdivinhada) { 
                    letraNaoEncontrada = false;
                    break;
                }
            }
            if (letraNaoEncontrada) {
                tentativasRestantes--;
            }

            atualizarDisplayDoJogo();
            desenharBoneco(tentativasRestantes); 

            if (letrasAdivinhadas.filter(l => palavraAtual.includes(l)).length === [...new Set(palavraAtual)].length) {
                finalizarJogo("Você venceu!");
            } else if (tentativasRestantes <= 0) {
                finalizarJogo(`Você perdeu! A palavra era: ${palavraAtual}`);
            }
        }
    }
    entradaAdivinhacao.value = "";
}

document.addEventListener("DOMContentLoaded", iniciarJogo);

