import { moeda } from '../utils'

export default function Cart({ itens, concluida, onClose, onRemove, onFinish }) {
  const total = itens.reduce((s, i) => s + i.produto.preco * i.qtd, 0)

  return (
    <div className="overlay" onClick={onClose}>
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        <div className="row">
          <h2 style={{ margin: 0 }}>Carrinho</h2>
          <button className="x" onClick={onClose} aria-label="Fechar">✕</button>
        </div>

        {concluida ? (
          <div className="ok">
            <div style={{ fontSize: 56 }}>✅</div>
            <h3>Compra finalizada!</h3>
            <p>Obrigado pela preferência.</p>
          </div>
        ) : itens.length === 0 ? (
          <p style={{ color: 'var(--mut)' }}>Seu carrinho está vazio.</p>
        ) : (
          <>
            {itens.map(({ produto, qtd }) => (
              <div className="row" key={produto.id}>
                <div>
                  <div>{produto.emoji} {produto.nome}</div>
                  <small>{qtd} × {moeda(produto.preco)}</small>
                </div>
                <div>
                  <strong>{moeda(qtd * produto.preco)}</strong>
                  <button className="x" onClick={() => onRemove(produto.id)} aria-label="Remover"> 🗑</button>
                </div>
              </div>
            ))}
            <button className="fin" onClick={onFinish}>
              Finalizar compra — {moeda(total)}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
