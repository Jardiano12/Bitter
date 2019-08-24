// Buttons
var entrarButton = document.getElementById('entrarButton');

// Inputs
var emailInput = document.getElementById('username');
var senhaInput = document.getElementById('password');

// Autenticar com E-mail e Senha
entrarButton.addEventListener('click', function () {
    if(emailInput.value == ''){
        emailInput.focus();
    } else if (senhaInput.value == ''){
        senhaInput.focus();
    } else {
        Autenticar()
    }
    
});

function Autenticar(){
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, senhaInput.value)
        .then(function (result) {
            console.log(result);

            window.location.href = "index.html";

            console.log('Autenticado ' + emailInput.value);
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar, verifique o erro no console.')
        });
}


