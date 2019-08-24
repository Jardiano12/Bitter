// Controlador.js -------------------------------------------------------------
//
// Todas as Funções

class ControladorPerguntas {
  // Função para criar um registro no Firebase
  inserir(pergunta) {
    let id = new Date().getTime();
    let data = {
      id: id,
      pergunta: pergunta.getPergunta(),
      resposta: pergunta.getResposta(),
      um: pergunta.getUm(),
      dois: pergunta.getDois(),
      tres: pergunta.getTres(),
      quatro: pergunta.getQuatro()
    };
    //firebase.database().ref().child("users/" + this.key).push(data);
    firebase.database().ref("perguntas/" + id).set(data);
  }

  deletar(id) {
    firebase.database().ref("perguntas/" + id).remove();
  }

  alterar(pergunta, id) {
    let data = {
      id: id,
      pergunta: pergunta.getPergunta(),
      resposta: pergunta.getResposta(),
      um: pergunta.getUm(),
      dois: pergunta.getDois(),
      tres: pergunta.getTres(),
      quatro: pergunta.getQuatro()
    };
    firebase.database().ref("perguntas/" + id).update(data);
  }
}

// controller.js ---------------------------------------------------------
var id_temp;

//////
var nameInput = document.getElementById('name2');
var respostaInput = document.getElementById('respostaInput');
var umInput = document.getElementById('umInput');
var doisInput = document.getElementById('doisInput');
var tresInput = document.getElementById('tresInput');
var quatroInput = document.getElementById('quatroInput');
var addButton = document.getElementById('addButton');

////////////
const tabela = document.getElementById("listar");
const acao = document.getElementById("acao");

// Cadastrar
addButton.addEventListener("click", () => {
  if (perguntaInput.value != "" && respostaInput.value != "" && umInput.value != "" && doisInput.value != "" && tresInput.value != "" && quatroInput.value != "") {
    // if (nome.value != "" && telefone.value != "") {
    if (acao.value == "A") {
      new ControladorPerguntas().alterar(new Pergunta(perguntaInput.value, respostaInput.value, umInput.value, doisInput.value, tresInput.value, quatroInput.value), id_temp);
    } else {
      new ControladorPerguntas().inserir(new Pergunta(perguntaInput.value, respostaInput.value, umInput.value, doisInput.value, tresInput.value, quatroInput.value));
    }
    limparCampos();
  }
});

// Consultar
function consultar(id) {
  firebase.database().ref("perguntas/" + id).once("value").then(function (snapshot) {
    acao.value = "A";
    id_temp = snapshot.val().id;
    perguntaInput.value = snapshot.val().pergunta;
    respostaInput.value = snapshot.val().resposta;
    umInput.value = snapshot.val().um;
    doisInput.value = snapshot.val().dois;
    tresInput.value = snapshot.val().tres;
    quatroInput.value = snapshot.val().quatro;
  });
}

// Listar
window.addEventListener("load", () => {
  firebase.database().ref("perguntas").on("value", snapshot => {
    tabela.innerHTML = "";
    snapshot.forEach(item => {
      tabela.innerHTML += `
            <tr>
              <td>
                <button type="button" onclick="new ControladorPerguntas().deletar('${item.val().id}')" class="btn btn-primary">
                Remover
                </button>
              </td>
              <td>
                <button type="button" onclick="consultar('${item.val().id}')" class="btn btn-danger">
                Editar
                </button>
              </td>
              <td>${item.val().pergunta}</td>
              <td><b>${item.val().resposta}<b></td>
              <td>${item.val().um}</td>
              <td>${item.val().dois}</td>
              <td>${item.val().tres}</td>
              <td>${item.val().quatro}</td>
            </tr>
          `;
    });
  });
});

function limparCampos() {
  perguntaInput.value = "";
  respostaInput.value = "";
  umInput.value = "";
  doisInput.value = "";
  tresInput.value = "";
  quatroInput.value = "";
}