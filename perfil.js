var templateFoto = '<img src="{{IMAGEMFOTO}}" style="width:180px;height:180px">';
var templateBio = '<h3> {{NOME}} </h3> <hr> <p> RACF: {{RACF}}</p> ' +
   ' <p> SETOR: {{SETOR}}</p>' +
   ' <p> TELEFONE: {{TELEFONE}}</p>';
var templatePedidos = '<div class="row">' +
   '<div class="col-12"> <a href = "detalhe.html?id={{NUM}}"> Solicitação: {{NUM2}} - {{DATA}}</a> </div>' +
   '</div>';

function carregaperfil() {

   var userSTR = localStorage.getItem("VMuser");
   console.log(userSTR);

   if (!userSTR) {
      window.location = "index.html"; 
   }
   usuario = JSON.parse(userSTR);

   document.getElementById("foto").innerHTML = templateFoto.replace("{{IMAGEMFOTO}}", usuario.linkFoto);
   document.getElementById("personal").innerHTML = templateBio.replace("{{NOME}}", usuario.nome)
      .replace("{{RACF}}", usuario.racf)
      .replace("{{SETOR}}", usuario.setor)
      .replace("{{TELEFONE}}", usuario.telefone);
}

function carregapedidos() {
   var todosPedidos = "";
   for (i = 0; i < usuario.pedidos.length; i++) {
      todosPedidos = todosPedidos + templatePedidos.replace("{{DATA}}", usuario.pedidos[i].data)
         .replace("{{NUM}}", usuario.pedidos[i].numSolicitacao)
         .replace("{{NUM2}}", usuario.pedidos[i].numSolicitacao)
   }
   document.getElementById("pedidos").innerHTML = todosPedidos;

}

function logout() {
   localStorage.removeItem("VMuser");
   window.location = "index.html";
}

function nova() {
   window.location = "nova.html";
}

function startperfil() {
   carregaperfil();
   carregapedidos();
}