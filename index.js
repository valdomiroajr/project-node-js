const custonExpress = require('./config/custonExpress')

const app = custonExpress()

app.listen(3001, () => console.log('servidor rodando na porta 3000'));