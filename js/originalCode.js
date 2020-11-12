var checkboxes = document.querySelectorAll("input[type='checkbox']");
var botaoSubmit = document.querySelector("input[type='button']");

for(var i = 0; i < checkboxes.length; i++){
    let checkBox = checkboxes[i];
    checkBox.addEventListener("click",selectCheckbox)
}

function selectCheckbox(){
    let checkboxTarget = event.srcElement;
    let isChecked = checkboxTarget.checked;
    uncheckboxes(checkboxes)

    if(isChecked){
        selecionarAlternativa(checkboxTarget)   
        mostrarBotao(botaoSubmit)
    } else {
        esconderBotao(botaoSubmit)
    }
}

function uncheckboxes(checkboxList) {
    for (let i = 0; i < checkboxList.length; i++) {
        let alternativaCheckbox = checkboxList[i];
        alternativaCheckbox.checked = false;
        alternativaCheckbox.parentElement.parentElement.className = "alternativa";
    }
}
function selecionarAlternativa(checkbox) {
    checkbox.checked = true;
    checkbox.parentElement.parentElement.className = "alternativa selecionada";
}
function mostrarBotao(botao) {
    botao.className = "bt bt-confirmar";
}
function esconderBotao(botao) {
    botao.className = "bt";
}

botaoSubmit.addEventListener("click", submit);

function submit() {
    let alternativas = document.querySelectorAll("input[type='checkbox']")
    let alternativaSelecionada = document.querySelector(".selecionada");
    let checkbox = alternativaSelecionada.querySelector("input[type='checkbox']")
    let correta = false;
    let botao = event.srcElement
    
    desabilitarAlternativas(alternativas)
    esconderBotao(botao)

    $.get('../data/exercicio.js', function(data) {
        let res = JSON.parse(data)
        res.map(innerArray=>{
            innerArray.map(gabaritoObject =>{
                gabaritoObject.gabarito.map(item=>{
                    if(item.resposta === checkbox.id){
                        correta = true
                    }
                })
            })
        })
        
        if(correta){
            let feedbackPositivo = document.getElementById('feedbackPositivo')
            feedbackPositivo.className = "feedback-positivo"
                
        } else {
            let feedbackNegativo = document.getElementById('feedbackNegativo')
            feedbackNegativo.className = "feedback-negativo"
        }
    });
}

function desabilitarAlternativas(alternativas){
    for (let i = 0; i < alternativas.length; i++) {
        const alternativa = alternativas[i];
        alternativa.disabled = true
    }
}