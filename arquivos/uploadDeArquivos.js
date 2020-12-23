const fs = require('fs')
const path = require('path')


module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => 
{
    const tiposAceito = ['jpg', 'gif', 'bmp']
    const tipo = path.extname(caminho)

    const tipoValido = tiposAceito.indexOf(tipo.substring(1)) === 0

    if(tipoValido) {
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`
        
        fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(novoCaminho))
        .on('finish', () => callbackImagemCriada(false, novoCaminho))
    } else {
        console.log('Extensão do arquivo não é valida')
        const erro = 'Extensão do arquivo não é valida'
        callbackImagemCriada(erro)
    }
}





