import { moeda } from '../utils'

export default function Cart({
  itens,
  concluida,
  onClose,
  onRemove,
  onUpdateQuantity,
  onFinish,
}) {
  const total = itens.reduce((s, i) => s + i.produto.preco * i.qtd, 0)
  const quantidade = itens.reduce((s, i) => s + i.qtd, 0)

  return (
    <div className="overlay" onClick={onClose}>
      <section
        className="panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-heading">
          <div>
            <h2 id="cart-title">Seu carrinho</h2>
            <p>{quantidade} {quantidade === 1 ? 'item selecionado' : 'itens selecionados'}</p>
          </div>
          <button className="x" onClick={onClose} aria-label="Fechar carrinho">✕</button>
        </div>

        {concluida ? (
          <div className="ok">
            <div className="success-icon">✓</div>
            <h3>Compra finalizada!</h3>
            <p>Obrigado pela preferência.</p>
          </div>
        ) : itens.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h3>Seu carrinho está vazio</h3>
            <p>Escolha a quantidade de um produto e adicione-o ao carrinho.</p>
            <button className="continue-shopping" onClick={onClose}>Continuar comprando</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {itens.map(({ produto, qtd }) => (
                <article className="cart-item" key={produto.id}>
                  <div className="cart-item-image" style={{ background: produto.cor }}>
                    {produto.imagem
                      ? <img src={produto.imagem} alt="" />
                      : <span>{produto.emoji}</span>}
                  </div>
                  <div className="cart-item-info">
                    <span className="cart-item-category">{produto.categoria}</span>
                    <h3>{produto.nome}</h3>
                    <strong>{moeda(produto.preco * qtd)}</strong>
                    <div className="cart-item-controls">
                      <button
                        disabled={qtd === 1}
                        aria-label={`Diminuir quantidade de ${produto.nome}`}
                        onClick={() => onUpdateQuantity(produto.id, qtd - 1)}
                      >
                        −
                      </button>
                      <span>{qtd}</span>
                      <button
                        aria-label={`Aumentar quantidade de ${produto.nome}`}
                        onClick={() => onUpdateQuantity(produto.id, qtd + 1)}
                      >
                        +
                      </button>
                      <button
                        className="remove-item"
                        onClick={() => onRemove(produto.id)}
                        aria-label={`Remover ${produto.nome}`}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <div><span>Subtotal</span><strong>{moeda(total)}</strong></div>
              <p>Frete calculado na próxima etapa.</p>
              <button className="fin" onClick={onFinish}>
                Finalizar compra <span>{moeda(total)}</span>
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
