const conexao = require('../infraestrutura/conexao')
const uploadDeArquivo = require('../arquivos/uploadDeArquivos')

class Pet {
    lista(res) {
        const sql = 'SELECT * FROM Pets'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                console.log(resultados)
                res.status(200).json(resultados)
            }
        })
    }

    adiciona(pet, res) {
        const sql = 'INSERT INTO Pets SET ?'

        uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {
            const novoPet = {nome: pet.nome, imagem: novoCaminho }

            if(erro) {
                res.status(400).json({erro})
            } else {
                conexao.query(sql, novoPet, erro => {
                    if(erro) {
                        res.status(400).json({erro})
                    } else {
                        res.status(200).json(novoPet)
                    }
                })
            }
        }) 
    }

    altera(id, pet, res) {
        const sql = `UPDATE Pets SET ? WHERE id= ${id}`

        conexao.query(sql, pet, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados[0])
            }
        })
    }

    deleta(id, res) {
        const sql = `DELETE FROM Pets WHERE id =  ${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
}

module.exports = new Pet