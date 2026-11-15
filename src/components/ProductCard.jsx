import { useState } from 'react'
import { moeda } from '../utils'

export default function ProductCard({ produto, onAdd, onPreview }) {
  const [qtd, setQtd] = useState(0)

  return (
    <article className="card">
      <div className="img" style={{ background: produto.cor }}>
        <img src={produto.imagem} alt={produto.nome} loading="lazy" decoding="async" />
        <span className="card-id">Nº {String(produto.id).padStart(2, '0')}</span>
      </div>
      <div className="info">
        <span className="category-tag">{produto.categoria}</span>
        <h3>{produto.nome}</h3>
        <p className="card-description">{produto.descricao}</p>
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
        <button className="preview-btn" onClick={() => onPreview(produto)}>
          VER ESPECIFICAÇÕES <span>↗</span>
        </button>
      </div>
    </article>
  )
}
