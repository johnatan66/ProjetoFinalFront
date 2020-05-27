var templateSolicitacao = '<div class="row">' +
    '<div class="col-12"><strong><h3> Solicitação: {{NUM}} - {{DATA}} </h3></strong></div>' +
    '</div>';

var templateItem = '<div class="row">' +
    '<div class="col-12"><strong><h5> ID da máquina: {{IDMAQ}} </h5></strong><p></div>' +
    '<div class="col-12"><h5> Itens solicitados: </h5></div>' +
    '<div class="col-12"> Processadores: {{NUMPROC}} </div>' +
    '<div class="col-12"> Memória em GB: {{MEMO}}</div>' +
    '<div class="col-12"> Capacidade HD: {{CAPHD}}</div>' +
    '<div class="col-12"> Transferência: {{TRANSF}}<p></div>' +
    '<div class="col-12"><strong> Valor da máquina: R$ {{VALORMAQ}},00 </strong><p></div>' +
    '<div class="col-12"><strong><h5> Softwares solicitados: </h5></strong></div>' +
    '</div>';

var templateSoftware = '<div class="row"> ' +
    '<div class="col-4"> {{SOFTWARE}} </div>' +
    '<div class="col-4"> {{FORNECEDOR}} </div>' +
    '<div class="col-4"> R$ {{VALOR}},00 </div>' +
    '</div>';

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
        window.location = "index.html";  
    }
    usuario = JSON.parse(userSTR);


    for (i = 0; i < usuario.pedidos.length; i++) {
        if (usuario.pedidos[i].numSolicitacao == id) {
            var suporte = i;
            var idmaquina = usuario.pedidos[i].maquina.id;
            var process = usuario.pedidos[i].maquina.processador;
            var memo = usuario.pedidos[i].maquina.memoriaGB;
            var capacid = usuario.pedidos[i].maquina.capacidadeHD;
            var transfe = usuario.pedidos[i].maquina.transferencia;
            var valor = usuario.pedidos[i].maquina.valor;

            console.log(idmaquina + " deu certo");
            console.log(process + " deu certo");
            console.log(memo + " deu certo");
            console.log(capacid + " deu certo");
            console.log(transfe + " deu certo");
            console.log(valor + " deu certo");

            var listaItens = usuario.pedidos[i].itensSolicitacao;

            for (i = 0; i < listaItens.length; i++) {

                console.log(listaItens[i].software.nome);
                console.log(listaItens[i].software.fornecedor);
                console.log(listaItens[i].software.valor);
            }

            console.log(i);
        }
    }


    var listaItens = usuario.pedidos[suporte].itensSolicitacao;
    var todosPedidos = "";
    var todosItens = "";
    var todosSoftware = "";


    todosPedidos = todosPedidos + templateSolicitacao.replace("{{DATA}}", usuario.pedidos[suporte].data)
        .replace("{{OBSERVACOES}}", usuario.pedidos[suporte].observacoes)
        .replace("{{NUM}}", usuario.pedidos[suporte].numSolicitacao);

    document.getElementById("detalhesSolicitacao").innerHTML = todosPedidos;
    console.log(todosPedidos);

    todosItens = todosItens + templateItem.replace("{{IDMAQ}}", usuario.pedidos[suporte].maquina.id)
        .replace("{{NUMPROC}}", usuario.pedidos[suporte].maquina.processador)
        .replace("{{MEMO}}", usuario.pedidos[suporte].maquina.memoriaGB)
        .replace("{{CAPHD}}", usuario.pedidos[suporte].maquina.capacidadeHD)
        .replace("{{TRANSF}}", usuario.pedidos[suporte].maquina.transferencia)
        .replace("{{VALORMAQ}}", usuario.pedidos[suporte].maquina.valor);

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

function startdetalhe() {
    carregaperfil();
    recuperaDetalhe();
}