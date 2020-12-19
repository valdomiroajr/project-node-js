class Tabelas {
    init(conexao) {
        console.log('Iniciando criação das tabelas na base de dados')

        this.conexao = conexao;
        
        this.atendimento()
        
    }

    atendimento() {
        const sql = `CREATE TABLE IF NOT EXISTS Atendimentos (
                id int not NULL AUTO_INCREMENT, 
                cliente varchar(50) NOT NULL,
                pet varchar(20),
                servico varchar(20) NOT NULL,
                status varchar(20) NOT NULL,
                observacoes text,
            PRIMARY KEY(id));`

        this.conexao.query(sql)
    }
}

module.exports = new Tabelas()