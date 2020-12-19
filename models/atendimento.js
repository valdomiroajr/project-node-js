const conexao = require('../infraestrutura/conexao')

class  Atendimento {
    adiciona(atendimento) {
        const sql = ' INSERT INTO Atendimentos SET ?'

        conexao.query(sql, atendimento, (erro, resultados ) => {
            if(erro) {
                console.log('Ocorreu um erro inesperado ao tentar savar um atendimento na base de dados ' + erro)
            } else {
                console.log(resultados)
                console.log(' Atendimento gravado na base de dados com sucesso´\n´ ' + resultados)
            }
        })
    }
}
module.exports = new Atendimento