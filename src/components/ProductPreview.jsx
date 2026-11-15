import { useEffect, useState } from 'react'
import { moeda } from '../utils'

export default function ProductPreview({ produto, onClose, onAdd }) {
  const [quantidade, setQuantidade] = useState(0)

  useEffect(() => {
    const fecharComEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', fecharComEscape)
    return () => window.removeEventListener('keydown', fecharComEscape)
  }, [onClose])

  return (
    <div className="preview-overlay" onClick={onClose}>
      <section
        className="preview-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="preview-close" onClick={onClose} aria-label="Fechar preview">
          ✕
        </button>
        <div className="preview-image" style={{ background: produto.cor }}>
          <img src={produto.imagem} alt={produto.nome} />
          <span className="preview-index">Nº {String(produto.id).padStart(2, '0')}</span>
        </div>
        <div className="preview-content">
          <div className="preview-kicker">
            <span className="category-tag">{produto.categoria}</span>
            <span className="preview-status"><i /> DISPONÍVEL</span>
          </div>
          <h2 id="preview-title">{produto.nome}</h2>
          <p className="preview-description">{produto.descricao}</p>
          <div className="spec-heading">
            <span>Ficha técnica</span>
            <span>ESPECIFICAÇÕES</span>
          </div>
          <dl className="spec-grid">
            {Object.entries(produto.especificacoes).map(([nome, valor]) => (
              <div className="spec-row" key={nome}>
                <dt>{nome}</dt>
                <dd>{valor}</dd>
              </div>
            ))}
          </dl>
          <p className="image-credit">
            Foto: <a href={produto.imagemFonte} target="_blank" rel="noreferrer">{produto.imagemCredito}</a>
          </p>
          <div className="preview-footer">
            <div className="preview-purchase">
              <div>
                <span>PREÇO</span>
                <strong>{moeda(produto.preco)}</strong>
              </div>
              <div className="qty preview-qty">
                <button
                  aria-label={`Diminuir quantidade de ${produto.nome}`}
                  onClick={() => setQuantidade((atual) => Math.max(0, atual - 1))}
                >
                  −
                </button>
                <strong aria-live="polite">{quantidade}</strong>
                <button
                  aria-label={`Aumentar quantidade de ${produto.nome}`}
                  onClick={() => setQuantidade((atual) => atual + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="preview-add"
              disabled={quantidade === 0}
              onClick={() => {
                onAdd(produto, quantidade)
                onClose()
              }}
            >
              ADICIONAR À SACOLA <span>↗</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
