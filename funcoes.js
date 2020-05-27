function autenticar(){
  
    var txtEmail = document.getElementById("txtEmail").value;
    var txtSenha = document.getElementById("txtSenha").value;

  
    var msgBody = {
        racf : txtEmail,
        email : txtEmail,
        senha : txtSenha
    }
 
    var cabecalho = {
        method : 'POST',
        body   : JSON.stringify(msgBody),
        headers : {
            'Content-Type': 'application/json'
        }
    }

    fetch("http://localhost:8080/login",cabecalho)
        .then(res => res.json())
        .then(res => logar(res))
        .catch(err => trataErro(err))
}

function logar(res){
    localStorage.setItem("VMuser", JSON.stringify(res));
    window.location = "perfil.html";
}

function trataErro(err){
    console.log(err);
    document.getElementById("msg").style="visibility:visible";
}
function logout(){
        localStorage.removeItem("VMuser");   
}
