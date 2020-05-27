var templateFoto = '<img src="{{IMAGEMFOTO}}" style="width:180px;height:180px">';
var templateBio = '<h3> {{NOME}} </h3> <hr> <p> RACF: {{RACF}}</p> ' +
    ' <p> SETOR: {{SETOR}}</p>' +
    ' <p> TELEFONE: {{TELEFONE}}</p>';
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
    '</div>' +
    '       <div class="row"> '+
               '<div class="col-6"> {{SOFTWARE}} </div>'+
               '<div class="col-4"> {{FORNECEDOR}} </div>'+
               '<div class="col-2"> {{VALOR}} </div>' +     
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
    
    var idmaquina  = usuario.pedidos[id - 1].maquina.id;
    var process = usuario.pedidos[id - 1].maquina.processador;
    var memo  = usuario.pedidos[id - 1].maquina.memoriaGB;
    var capacid = usuario.pedidos[id - 1].maquina.capacidadeHD;
    var transfe  = usuario.pedidos[id - 1].maquina.transferencia;
    var valor = usuario.pedidos[id - 1].maquina.valor; 

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

    // Inicio - GI

    var listaItens= usuario.pedidos[id - 1].itensSolicitacao;
    var todosPedidos = "";
    var todosItens = "";
    var todosSoftware = "";
    var completo = "";

    todosPedidos = templateSolicitacao.replace("{{DATA}}", usuario.pedidos[id - 1].data)
        .replace("{{OBSERVACOES}}", usuario.pedidos[id - 1].observacoes)
        .replace("{{NUM}}", usuario.pedidos[id - 1].numSolicitacao);

    todosItens = templateItem.replace("{{IDMAQ}}", usuario.pedidos[id - 1].maquina.id)
        .replace("{{NUMPROC}}", usuario.pedidos[id - 1].maquina.processador)
        .replace("{{MEMO}}", usuario.pedidos[id - 1].maquina.memoriaGB)
        .replace("{{CAPHD}}", usuario.pedidos[id - 1].maquina.capacidadeHD)
        .replace("{{TRANSF}}", usuario.pedidos[id - 1].maquina.transferencia)
        .replace("{{VALORMAQ}}", usuario.pedidos[id - 1].maquina.valor);
    
        for (i=0; i< listaItens.length; i++){
            todosSoftware = todosSoftware + 
                    templateItem.replace("{{SOFTWARE}}", listaItens[i].software.nome)
                                .replace("{{FORNECEDOR}}", listaItens[i].software.fornecedor)
                                .replace("{{VALOR}}", "R$ "+ listaItens[i].software.valor);
        }    

    completo = todosPedidos + todosItens + todosSoftware
    
    document.getElementById("detalhes").innerHTML = completo;
}

// Fim - GI

function logout() {
    localStorage.removeItem("VMuser");
    window.location = "index.html";
}