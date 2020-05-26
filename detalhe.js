var templateFoto = '<img src="{{IMAGEMFOTO}}" style="width:180px;height:180px">';
var templateBio = '<h3> {{NOME}} </h3> <hr> <p> RACF: {{RACF}}</p> ' +
    ' <p> SETOR: {{SETOR}}</p>' +
    ' <p> TELEFONE: {{TELEFONE}}</p>';
var templateSolicitacao = '<div class="row">' +
    '<div class="col-12"> Solicitação: {{NUM}} </div>' +
    '<div class="col-12"> {{DATA}} - {{OBSERVACOES}} </div>' +
    '</div>';
var templateItem = '<div class="row">' +
    '<div class="col-12> Itens solicitados: {{ITENS}} </div>' +
    '</div>'

function recuperaDetalhe() {

    var parametro = window.location.search;

    var id = parametro.substr(4);

    console.log("Número da solicitação = " + id);

    fetch("http://localhost:8080/solicitacoes/" + id)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => alert("pedido não encontrado"));

    var userSTR = localStorage.getItem("VMuser");
    console.log(userSTR);

    if (!userSTR) {
        window.location = "index.html";  // se não existir info do usuario, ele não tá logado, logo mando pro index
    }
    usuario = JSON.parse(userSTR);


    // inicio das alterações
    
    var idSolicitacao = usuario.pedidos[id - 1].numSolicitacao;
    var data = usuario.pedidos[id - 1].data;
    var observacoes = usuario.pedidos[id - 1].observacoes;
    var numsolicit = usuario.pedidos[id - 1].numSolicitacao;

    var idmaquina  = usuario.pedidos[id - 1].maquina.id;
    var process = usuario.pedidos[id - 1].maquina.processador;
    var memo  = usuario.pedidos[id - 1].maquina.memoriaGB;
    var capacid = usuario.pedidos[id - 1].maquina.capacidadeHD;
    var transfe  = usuario.pedidos[id - 1].maquina.transferencia;
    var valor = usuario.pedidos[id - 1].maquina.valor;

    console.log(idSolicitacao+"deu certo");
    console.log(data+"deu certo");
    console.log(observacoes+"deu certo");
    console.log(numsolicit+"deu certo");

    console.log(idmaquina +" deu certo");
    console.log(process +" deu certo");
    console.log(memo +" deu certo");
    console.log(capacid +" deu certo");
    console.log(transfe +" deu certo");
    console.log(valor +" deu certo");

    var listaItens= usuario.pedidos[id - 1].itensSolicitacao;

    for(i = 0; i<listaItens.length; i++){
        
        console.log(listaItens[i].software.nome);
        console.log(listaItens[i].software.fornecedor);
        console.log(listaItens[i].software.valor);
    }

    // fim das alterções


    document.getElementById("foto").innerHTML = templateFoto.replace("{{IMAGEMFOTO}}", usuario.linkFoto);
    document.getElementById("personal").innerHTML = templateBio.replace("{{NOME}}", usuario.nome)
        .replace("{{RACF}}", usuario.racf)
        .replace("{{SETOR}}", usuario.setor)
        .replace("{{TELEFONE}}", usuario.telefone);

    var todosPedidos = "";
    var todosItens = "";
    var completo = "";

    todosPedidos = todosPedidos + templateSolicitacao.replace("{{DATA}}", usuario.pedidos[id - 1].data)
        .replace("{{OBSERVACOES}}", usuario.pedidos[id - 1].observacoes)
        .replace("{{NUM}}", usuario.pedidos[id - 1].numSolicitacao)

    completo = todosPedidos + todosItens

    document.getElementById("detalhes").innerHTML = completo;

}

function logout() {
    localStorage.removeItem("VMuser");
    window.location = "index.html";
}