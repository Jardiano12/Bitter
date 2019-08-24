var nameInput = document.getElementById('name2');
var email2Input = document.getElementById('email2');
var password2Input = document.getElementById('password2');
var addButton = document.getElementById('cadatraUser');

class Usuario {
  
    constructor(nome, email, senha) {
      this.nome = nome,
      this.email = email,
      this.senha = senha
    }
  
    setNome(nome) {
      this.nome = nome;
    }
  
    setEmail(email) {
        this.email = email;
    }
    setSenha(senha) {
        this.senha = senha;
    }
  
    getNome() {
      return this.nome;
    }
  
    getEmail() {
      return this.email;
    }
    getSenha() {
        return this.senha;
    }
   
  }

  class ControladorCadatroUser {
  // Função para criar um registro no Firebase
  inserir("ww") {
    let id = new Date().getTime();
    let data = {
      id: id,
      nome: nome.getNome(),
      email: email.getEmail(),
      senha: senha.getSenha(),
    };
    //firebase.database().ref().child("users/" + this.key).push(data);
    firebase.database().ref("perguntas/" + id).set(data);
  }

  deletar(id) {
    firebase.database().ref("perguntas/" + id).remove();
  }

  alterar(id, id) {
    let data = {
      id: id,
      nome: nome.getNome(),
      email: email.getEmail(),
      senha: senha.getSenha(),
    };
    firebase.database().ref("perguntas/" + id).update(data);
  }
}

// Get e Set
var id_temp;

addButton.addEventListener("click", () => {
  alert(nameInput.value + " / " + email2Input.value + " / " + password2Input.value);
  if (nameInput.value != "" && email2Input.value != "" && password2Input.value != "") {
    // if (nome.value != "" && telefone.value != "") {
    
      new ControladorCadatroUser().inserir(new Usuario(nameInput.value, email2Input.value, password2Input.value));
    
    limparCampos();
  }
});

function limparCampos() {
  nameInput.value = "";
  email2Input.value = "";
  password2Input.value = "";
}