var templateFoto = '<img src="{{IMAGEMFOTO}}" style="width:180px;height:180px">';
var templateBio = '<h3> {{NOME}} </h3> <hr> <p> RACF: {{RACF}}</p> ' +
   ' <p> SETOR: {{SETOR}}</p>' +
   ' <p> TELEFONE: {{TELEFONE}}</p>';
var templatePedidos = '<div class="row">' +
   '<div class="col-12"> <a href = "detalhe.html?id={{NUM}}"> {{DATA}} - {{OBSERVACOES}}</a> </div>' +
   '</div>';

function carregaperfil() {
   // qual a lógica disso?
   // primeiro: se o usuário tá logado, as infos dele estão no LocalStorage, certo?
   // e se não tiver? --> mando pro index
   // se estiver, eu só preencho as coisas (o que é bem legal!!!)

   var userSTR = localStorage.getItem("VMuser");
   console.log(userSTR);

   if (!userSTR) {
      window.location = "index.html";  // se não existir info do usuario, ele não tá logado, logo mando pro index
   }
   usuario = JSON.parse(userSTR);

   document.getElementById("foto").innerHTML = templateFoto.replace("{{IMAGEMFOTO}}", usuario.linkFoto);
   document.getElementById("personal").innerHTML = templateBio.replace("{{NOME}}", usuario.nome)
      .replace("{{RACF}}", usuario.racf)
      .replace("{{SETOR}}", usuario.setor)
      .replace("{{TELEFONE}}", usuario.telefone);

      carregaitens();
}


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
       //solicitante: {
          // id: user.id
      // }
      // itensSolicitacao: []
   }

   /*
   var Maquina = {
      method : 'POST',
      body : JSON.stringify(msgMaquina),
      headers :{
          'Content-Type': 'application/json'
      }
   }

   fetch("http://localhost:8080/solicitacoes/nova/maquina", Maquina)
   .then(res => alert("FOI!!!"))
   .catch(err => alert("DEU RUIM!!"));

   console.log(msgMaquina);
*/
   var today = new Date();
   var dd = String(today.getDate());
   var mm = String(today.getMonth());
   var yyyy = String(today.getFullYear());

   var data = yyyy +"-"+ mm + "-" + dd;

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













function logout() {
   localStorage.removeItem("VMuser");
   window.location = "index.html";
}