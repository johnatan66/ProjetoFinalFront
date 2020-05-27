var template='<div class="row"> '+
               '<div class="col-4"> {{NUM}} </div>'+
               '<div class="col-4"> {{DATA}} </div>'+
               '<div class="col-4"> {{OBSERVACAO}} </div>' +
            '</div>';

var itens = '<div class="row"> '+
            '<div class = "col-12"> {{ITEM}} </div>'
            '</div>';

function recuperaDetalhe(){

    var parametro = window.location.search;

    var id = parametro.substr(4);

    console.log("Número da solicitação = " + id);

    fetch("http://localhost:8080/solicitacoes/" + id)
       .then(res => res.json() )
       .then(res => preenche(res));
}

function preenche(res){
    console.log(res);
    var texto="";

    texto = template.replace("{{NUM}}",usuario.pedidos[id-1].numSolicitacao)
        .replace("{{DATA}}",usuario.pedidos[id-1].data)
        .replace("{{OBSERVACAO}}",usuario.pedidos[id-1].observacoes)

    
    document.getElementById("detalhes").innerHTML = texto;
}