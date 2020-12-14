import React from 'react'
import currencyFormatter from 'currency-formatter'

const LancamentoTable = props => {

    const linhas = props.lancamentos.map((lancamento, index) => {
        return (
            <tr key={lancamento.id}>
                <th scope="row">{lancamento.descricao}</th>
                <td>{currencyFormatter.format(lancamento.valor, { locale: 'pt-BR' })}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.dataCadastro}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button type="button"
                        title="Efetivar"
                        disabled={ lancamento.status !== "PENDENTE" }
                        className="btn btn-success"
                        onClick={() => props.updateStatusAction(lancamento, 'EFETIVADO')}>
                        <i className="pi pi-check" />
                    </button>
                    <button type="button"
                        title="Cancelar"
                        disabled={ lancamento.status !== "PENDENTE" }
                        className="btn btn-warning"
                        onClick={() => props.updateStatusAction(lancamento, 'CANCELADO')}>
                        <i className="pi pi-times" />
                    </button>
                    <button type="button"
                        title="Editar"
                        className="btn btn-primary"
                        onClick={() => props.editAction(lancamento)}>
                        <i className="pi pi-pencil" />
                    </button>
                    <button type="button"
                        title="Deletar"
                        className="btn btn-danger"
                        onClick={() => props.deleteAction(lancamento)}>
                        <i className="pi pi-trash" />
                    </button>
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

export default LancamentoTable;