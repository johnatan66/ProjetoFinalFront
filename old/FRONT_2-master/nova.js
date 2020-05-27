function carregaitens(){
   fetch("http://localhost:8080/softwares")
   .then(res => res.json())
   .then(res => preencheCheckbox(res))
}

function preencheCheckbox(res){
   var templateCh = '<input type="checkbox" name="softwares[]" value="{{ID}}"> {{NOME}} <br/>';

   var txtSoftwares = "";
   for(i=0; i<res.length; i++){

       txtSoftwares = txtSoftwares + templateCh.replace("{{ID}}",res[i].id)
                                               .replace("{{NOME}}",res[i].nome);
   }
   document.getElementById("listaSw").innerHTML = txtSoftwares;
}

function obterCusto(){
   var Processador = document.getElementById("Processadores").value;
   var Memoria = document.getElementById("Memória").value;
   var HD = document.getElementById("HD").value;
   var Transfer = document.getElementById("Transferência").value;

   var userStr = localStorage.getItem("VMuser");
   var user = JSON.parse(userStr);

   var msgMaquina = {
       processador : Processador,
       memoriaGB : Memoria,
       capacidadeHD: HD,
       transferencia: Transfer,
   
   }
  
   var today = new Date();
   var dd = String(today.getDate()).padStart(2,'0');
   var mm = String(today.getMonth()).padStart(2,'0');
   var yyyy = String(today.getFullYear());

   var data = dd +"/"+ mm + "/" + yyyy;

    var msgSolicitacao = {
       data : data,
       solicitante: {
           id: user.id
       },
       itensSolicitacao: [],
       maquina : msgMaquina
   }

   var listaSw = document.getElementsByName("softwares[]");
   var cont=0;

   for(i=0; i<listaSw.length; i++){
       if(listaSw[i].checked){
           var idSoftware = parseInt(listaSw[i].value);
            var itemSoftware = {
               software: {id: idSoftware}
            }
               msgSolicitacao.itensSolicitacao[cont] = itemSoftware;
               cont++;
       }
   }
   var cabecalho = {
       method : 'POST',
       body : JSON.stringify(msgSolicitacao),
       headers :{
           'Content-Type': 'application/json'
       }
   }
   fetch("http://localhost:8080/solicitacoes/nova", cabecalho)
   .then(res => alert("FOI!!!"))
   .catch(err => alert("DEU RUIM!!"));

   console.log(msgSolicitacao);
}

function startnova(){
    carregaperfil();
    carregaitens();
}
