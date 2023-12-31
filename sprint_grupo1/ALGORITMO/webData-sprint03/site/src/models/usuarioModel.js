var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT idEmpresa, email, senha, nome, cnpj, telefone  FROM empresa WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, cnpj, telefone, razaoSocial, cep, UF, cidade, bairro, rua, complemento) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO empresa (email, senha, nome, razaoSocial, cnpj, telefone) VALUES ('${email}', '${senha}', '${nome}', '${razaoSocial}', '${cnpj}', '${telefone}');
    `;
    cadastrarEndereco(cep, UF, cidade, bairro, rua, complemento);
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEndereco(cep, UF, cidade, bairro, rua, complemento) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO endereco (cep, uf, cidade, bairro, rua, complemento) VALUES ('${cep}', '${UF}', '${cidade}', '${bairro}', '${rua}', '${complemento}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function buscarDados(idUsuario) {

    var  instrucaoSql = `select hectares, tipoSolo from plantacaoTomate where fkEmpresa = ${idUsuario};`;


console.log("DADOS DADOS: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

function buscarDadosSersor(idUsuario) {

    var  instrucaoSql = `select count(idSensor) as qtdSensores from sensores where fkPlantacao = ${idUsuario}; 
    `;


console.log("DADOS sensores: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

function buscarDadosEndereco(idUsuario) {

    var  instrucaoSql = `select uf, rua from endereco where fkEmpresa = ${idUsuario};; 
    `;


console.log("DADOS sensores: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}


module.exports = {
    autenticar,
    cadastrar,
    cadastrarEndereco,
    buscarDados,
    buscarDadosSersor,
    buscarDadosEndereco
};