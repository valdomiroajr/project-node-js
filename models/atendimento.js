const conexao = require('../infraestrutura/conexao')
const moment = require('moment');
const { json } = require('body-parser');

class  Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS') 
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataEstaValida = moment(data).isSameOrAfter(dataCriacao)
        const nomeClienteValido = atendimento.cliente.length >= 5 

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
            res.status(400).json(erros)
        } else {
            const atentimentoDatado = {... atendimento, dataCriacao, data}
            const sql = ' INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atentimentoDatado, (erro, resultados ) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(atendimento)
                }
            })
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'
''
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        } )
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados[0])
            }
        })
    }

    altera(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        
        const sql = `UPDATE Atendimentos SET ? where id = ${id}`

        conexao.query(sql, valores, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({... valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = `DELETE FROM Atendimentos WHERE id = ${id}`
        
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}
module.exports = new Atendimento