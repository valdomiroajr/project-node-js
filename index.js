const custonExpress = require('./config/custonExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

const app = custonExpress()

conexao.connect(erro => {
    if(erro) {
        console.log('Ocorreu um erro inesperado ao tentar iniciar o banco de dados' + erro.message)
    } else {
        console.log('Servidor Banco de Dados inicializa do com sucesso')

        Tabelas.init(conexao)

        app.listen(3001, () => console.log('Servidor Aplicação rodando na porta 3001'));
    }
})

