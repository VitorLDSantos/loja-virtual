import { useState } from 'react'
import { moeda } from '../utils'

export default function ProductCard({ produto, onAdd }) {
  const [qtd, setQtd] = useState(1)

  return (
    <div className="card">
      <div className="img" style={{ background: produto.cor }}>
        {produto.imagem ? (
          <img src={produto.imagem} alt={produto.nome} />
        ) : (
          produto.emoji
        )}
      </div>
      <div className="info">
        <h3>{produto.nome}</h3>
        <div className="price">{moeda(produto.preco)}</div>
        <div className="qty">
          <button aria-label="Diminuir quantidade" onClick={() => setQtd(Math.max(1, qtd - 1))}>−</button>
          <strong>{qtd}</strong>
          <button aria-label="Aumentar quantidade" onClick={() => setQtd(qtd + 1)}>+</button>
        </div>
        <button
          className="add"
          onClick={() => {
            onAdd(produto, qtd)
            setQtd(1)
          }}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}
