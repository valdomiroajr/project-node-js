const Atendimento = require('../models/atendimento')

module.exports =  app => {
    app.get('/atendimentos', (req, res) => res.send('Você esta na rota de atendimento utilizando método GET'));

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        
        Atendimento.adiciona(atendimento)
        
        res.send('Você esta na rota de atendimento utilizando método POST')
    });
}