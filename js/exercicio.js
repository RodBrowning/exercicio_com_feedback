/// Este codigo foi transpilado via Babel
/// O codigo escrito por min esta em originalCode.js"

"use strict";

var checkboxes = document.querySelectorAll("input[type='checkbox']");
var botaoSubmit = document.querySelector("input[type='button']");

for (var i = 0; i < checkboxes.length; i++) {
  var checkBox = checkboxes[i];
  checkBox.addEventListener("click", selectCheckbox);
}

function selectCheckbox() {
  var checkboxTarget = event.srcElement;
  var isChecked = checkboxTarget.checked;
  uncheckboxes(checkboxes);

  if (isChecked) {
    selecionarAlternativa(checkboxTarget);
    mostrarBotao(botaoSubmit);
  } else {
    esconderBotao(botaoSubmit);
  }
}
function uncheckboxes(checkboxList) {
  for (var _i = 0; _i < checkboxList.length; _i++) {
    var alternativaCheckbox = checkboxList[_i];
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
  var alternativas = document.querySelectorAll("input[type='checkbox']"),
    alternativaSelecionada = document.querySelector(".selecionada"),
    checkbox = alternativaSelecionada.querySelector("input[type='checkbox']"),
    correta = false,
    botao = event.srcElement;

  desabilitarAlternativas(alternativas);
  esconderBotao(botao);
  $.get('./data/exercicio.js', function (data) {
    var res = JSON.parse(data);
    res.map(function (innerArray) {
      innerArray.map(function (gabaritoObject) {
        gabaritoObject.gabarito.map(function (item) {
          if (item.resposta === checkbox.id) {
            correta = true;
          }
        });
      });
    });

    if (correta) {
      var feedbackPositivo = document.getElementById('feedbackPositivo');
      feedbackPositivo.className = "feedback-positivo";
      
    } else {
      var feedbackNegativo = document.getElementById('feedbackNegativo');
      feedbackNegativo.className = "feedback-negativo";
    }
  });
}

function desabilitarAlternativas(alternativas) {
  for (var _i2 = 0; _i2 < alternativas.length; _i2++) {
    var alternativa = alternativas[_i2];
    alternativa.disabled = true;
  }
}