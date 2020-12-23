const Pet = require('../models/pet')

module.exports = app => {
    app.get('/pet', (req, res) => {
        Pet.lista(res)
    })

    app.post('/pet', (req, res) => {
        const pet = req.body

        Pet.adiciona(pet, res)
    })

    app.patch('/pet/:id', (req, res) => {
        const pet = req.body

        const id = parseInt(req.params.id)

        Pet.altera(id, pet, res)
    })

    app.delete('/pet/:id', (req, res) => {
        const id = req.params.id

        Pet.deleta(id, res)
    })
}