import { useState } from 'react'
import { produtos } from './data/produtos'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'

export default function App() {
  const [carrinho, setCarrinho] = useState([])
  const [aberto, setAberto] = useState(false)
  const [concluida, setConcluida] = useState(false)

  const adicionar = (produto, qtd) =>
    setCarrinho((c) =>
      c.some((i) => i.produto.id === produto.id)
        ? c.map((i) => (i.produto.id === produto.id ? { ...i, qtd: i.qtd + qtd } : i))
        : [...c, { produto, qtd }]
    )

  const remover = (id) => setCarrinho((c) => c.filter((i) => i.produto.id !== id))
  const total = carrinho.reduce((s, i) => s + i.qtd, 0)

  return (
    <>
      <header>
        <h1>🛍️ Loja React</h1>
        <button
          className="cartbtn"
          onClick={() => {
            setConcluida(false)
            setAberto(true)
          }}
        >
          🛒 Carrinho ({total})
        </button>
      </header>

      <main className="grid">
        {produtos.map((p) => (
          <ProductCard key={p.id} produto={p} onAdd={adicionar} />
        ))}
      </main>

      {aberto && (
        <Cart
          itens={carrinho}
          concluida={concluida}
          onClose={() => setAberto(false)}
          onRemove={remover}
          onFinish={() => {
            setConcluida(true)
            setCarrinho([])
          }}
        />
      )}
    </>
  )
}
