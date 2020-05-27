var templateSolicitacao = '<div class="row">' +
    '<div class="col-12"> Solicitação: {{NUM}} </div>' +
    '<div class="col-12"> {{DATA}} - {{OBSERVACOES}} </div>' +
    '</div>';

// Inicio - GI

var templateItem = '<div class="row">' +
    '<div class="col-12"> ID da máquina: {{IDMAQ}} </div>' +
    '<div class="col-12"> Itens solicitados: </div>' +
    '<div class="col-12"> Processadores: {{NUMPROC}} </div>' +
    '<div class="col-12"> Memória em GB: {{MEMO}}</div>' +
    '<div class="col-12"> Capacidade HD: {{CAPHD}}</div>' +
    '<div class="col-12"> Transferência: {{TRANSF}}</div>' +
    '<div class="col-12"> Valor: R$ {{VALORMAQ}}</div>' +
    '<div class="col-12"> Softwares solicitados: </div>' +
    '</div>';

var templateSoftware = '<div class="row"> ' +
    '<div class="col-4"> {{SOFTWARE}} </div>' +
    '<div class="col-4"> {{FORNECEDOR}} </div>' +
    '<div class="col-4"> R$ {{VALOR}},00 </div>' +
    '</div>';

// Fim - GI

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

   var idmaquina = usuario.pedidos[id - 1].maquina.id;  
     var process = usuario.pedidos[id - 1].maquina.processador;
     var memo = usuario.pedidos[id - 1].maquina.memoriaGB;
     var capacid = usuario.pedidos[id - 1].maquina.capacidadeHD;
     var transfe = usuario.pedidos[id - 1].maquina.transferencia;
     var valor = usuario.pedidos[id - 1].maquina.valor;
 
     console.log(idmaquina + " deu certo");
     console.log(process + " deu certo");
     console.log(memo + " deu certo");
     console.log(capacid + " deu certo");
     console.log(transfe + " deu certo");
     console.log(valor + " deu certo"); 

    var listaItens = usuario.pedidos[id - 1].itensSolicitacao;

    for (i = 0; i < listaItens.length; i++) {

        console.log(listaItens[i].software.nome);
        console.log(listaItens[i].software.fornecedor);
        console.log(listaItens[i].software.valor);
    }

    // fim das alterções 

    // Inicio - GI

    var listaItens = usuario.pedidos[id - 1].itensSolicitacao;
    var todosPedidos = "";
    var todosItens = "";
    var todosSoftware = "";


    todosPedidos = todosPedidos + templateSolicitacao.replace("{{DATA}}", usuario.pedidos[id - 1].data)
        .replace("{{OBSERVACOES}}", usuario.pedidos[id - 1].observacoes)
        .replace("{{NUM}}", usuario.pedidos[id - 1].numSolicitacao);

    document.getElementById("detalhesSolicitacao").innerHTML = todosPedidos;
    console.log(todosPedidos);

     todosItens = todosItens + templateItem.replace("{{IDMAQ}}", usuario.pedidos[id - 1].maquina.id)
        .replace("{{NUMPROC}}", usuario.pedidos[id - 1].maquina.processador)
        .replace("{{MEMO}}", usuario.pedidos[id - 1].maquina.memoriaGB)
        .replace("{{CAPHD}}", usuario.pedidos[id - 1].maquina.capacidadeHD)
        .replace("{{TRANSF}}", usuario.pedidos[id - 1].maquina.transferencia)
        .replace("{{VALORMAQ}}", usuario.pedidos[id - 1].maquina.valor);

        document.getElementById("detalhesMaquina").innerHTML = todosItens;
        console.log(todosItens); 

    for (i = 0; i < listaItens.length; i++) {
        todosSoftware = todosSoftware +
        templateSoftware.replace("{{SOFTWARE}}", listaItens[i].software.nome)
                .replace("{{FORNECEDOR}}", listaItens[i].software.fornecedor)
                .replace("{{VALOR}}", listaItens[i].software.valor);
    }

    document.getElementById("detalhesSoftware").innerHTML = todosSoftware;
    console.log(todosSoftware);

}


function startdetalhe(){
    carregaperfil();
    recuperaDetalhe();
}
// Fim - GI
