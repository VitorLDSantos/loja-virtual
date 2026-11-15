import { useState } from 'react'
import { moeda } from '../utils'

export default function ProductCard({ produto, onAdd }) {
  const [qtd, setQtd] = useState(0)

  return (
    <article className="card">
      <div className="img" style={{ background: produto.cor }}>
        {produto.imagem ? <img src={produto.imagem} alt={produto.nome} /> : produto.emoji}
      </div>
      <div className="info">
        <span className="category-tag">{produto.categoria}</span>
        <h3>{produto.nome}</h3>
        <div className="price">{moeda(produto.preco)}</div>
        <div className="qty">
          <button
            aria-label={`Diminuir quantidade de ${produto.nome}`}
            onClick={() => setQtd(Math.max(0, qtd - 1))}
          >
            −
          </button>
          <strong aria-live="polite">{qtd}</strong>
          <button aria-label="Aumentar quantidade" onClick={() => setQtd(qtd + 1)}>+</button>
        </div>
        <button
          className="add"
          disabled={qtd === 0}
          onClick={() => {
            onAdd(produto, qtd)
            setQtd(0)
          }}
        >
          {qtd === 0 ? 'Escolha a quantidade' : 'Adicionar ao carrinho'}
        </button>
      </div>
    </article>
  )
}
