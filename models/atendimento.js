const conexao = require('../infraestrutura/conexao')
const moment = require('moment');

class  Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS') 
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataEstaValida = moment(data).isSameOrAfter(dataCriacao)
        const nomeClienteValido = atendimento.cliente.lenth >= 5 

        const validacoes = [
            {
                nome: 'data',
                valido: dataEstaValida,
                mensagem: 'Data deve ser maio ou igual a data atual' 
            },
            {
                nome: 'cliente',
                valido: nomeClienteValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            console.log('Existem erros')
            res.status(400).json(erros)
        } else {
            const atentimentoDatado = {... atendimento, dataCriacao, data}
            const sql = ' INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atentimentoDatado, (erro, resultados ) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
    }
}
module.exports = new Atendimento