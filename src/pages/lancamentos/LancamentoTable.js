import React from 'react'

export default props => {

    const linhas = props.lancamentos.map((lancamento, index) => {
        return (
            <tr key={lancamento.id}>
                <th scope="row">{lancamento.descricao}</th>
                <td>{lancamento.valor}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.dataCadastro}</td>
                <td>{lancamento.status}</td>                
                <td>
                    <button type="button" className="btn btn-primary">Editar</button>
                    <button type="button" className="btn btn-danger">Deletar</button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Data</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {linhas}
            </tbody>
        </table>

    )
}