import { useEffect, useState } from 'react'
import { produtos } from './data/produtos'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'

export default function App() {
  const [tema, setTema] = useState(() => {
    const temaSalvo = localStorage.getItem('tema')
    if (temaSalvo === 'light' || temaSalvo === 'dark') return temaSalvo
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas')
  const [faixaPreco, setFaixaPreco] = useState('todas')
  const [ordenacao, setOrdenacao] = useState('padrao')
  const [carrinho, setCarrinho] = useState([])
  const [aberto, setAberto] = useState(false)
  const [concluida, setConcluida] = useState(false)
  const [perfilAberto, setPerfilAberto] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = tema
    localStorage.setItem('tema', tema)
  }, [tema])

  const categorias = [...new Set(produtos.map((produto) => produto.categoria))]
    .sort((a, b) => a.localeCompare(b, 'pt-BR'))

  const produtosVisiveis = produtos
    .filter((produto) => {
      const categoriaCorresponde =
        categoriaSelecionada === 'Todas' || produto.categoria === categoriaSelecionada
      const precoCorresponde =
        faixaPreco === 'ate-200'
          ? produto.preco <= 200
          : faixaPreco === '200-1000'
            ? produto.preco > 200 && produto.preco <= 1000
            : faixaPreco === 'acima-1000'
              ? produto.preco > 1000
              : true

      return categoriaCorresponde && precoCorresponde
    })
    .sort((a, b) => {
      if (ordenacao === 'menor-preco') return a.preco - b.preco
      if (ordenacao === 'maior-preco') return b.preco - a.preco
      return 0
    })

  const adicionar = (produto, qtd) => {
    if (qtd <= 0) return

    setCarrinho((c) =>
      c.some((i) => i.produto.id === produto.id)
        ? c.map((i) => (i.produto.id === produto.id ? { ...i, qtd: i.qtd + qtd } : i))
        : [...c, { produto, qtd }]
    )
  }

  const remover = (id) => setCarrinho((c) => c.filter((i) => i.produto.id !== id))
  const atualizarQuantidade = (id, qtd) =>
    setCarrinho((c) => c.map((i) => (i.produto.id === id ? { ...i, qtd } : i)))
  const total = carrinho.reduce((s, i) => s + i.qtd, 0)

  return (
    <>
      <header>
        <div className="brand">
          <button
            className="profile-bubble"
            onClick={() => setPerfilAberto((aberto) => !aberto)}
            aria-label={perfilAberto ? 'Fechar perfil' : 'Abrir perfil demonstrativo'}
            title="Perfil demonstrativo"
          >
            👤
          </button>
          <h1>🛍️ Loja React</h1>
        </div>
        <div className="header-actions">
          <button
            className="themebtn"
            onClick={() => setTema((atual) => (atual === 'dark' ? 'light' : 'dark'))}
            aria-pressed={tema === 'dark'}
          >
            {tema === 'dark' ? '☀️ Tema claro' : '🌙 Tema escuro'}
          </button>
          <button
            className="cartbtn"
            onClick={() => {
              setConcluida(false)
              setAberto(true)
            }}
          >
            🛒 Carrinho ({total})
          </button>
        </div>
      </header>

      {perfilAberto && (
        <aside className="profile-panel" aria-label="Perfil demonstrativo">
          <div className="profile-heading">
            <div className="profile-avatar">👤</div>
            <button
              className="x"
              onClick={() => setPerfilAberto(false)}
              aria-label="Minimizar perfil"
            >
              ✕
            </button>
          </div>
          <h2>Visitante da Loja</h2>
          <p>visitante@exemplo.com</p>
          <span className="demo-badge">Perfil demonstrativo</span>
          <small>Esta área é apenas uma prévia e não utiliza uma conta real.</small>
        </aside>
      )}

      <section className="catalog-tools" aria-label="Filtros do catálogo">
        <div className="catalog-heading">
          <div>
            <h2>Nosso catálogo</h2>
            <p>Encontre o produto ideal para você.</p>
          </div>
          <span className="results-count">
            {produtosVisiveis.length} {produtosVisiveis.length === 1 ? 'produto' : 'produtos'}
          </span>
        </div>
        <div className="catalog-filters">
          <label className="filter-field">
            Categoria
            <select
              value={categoriaSelecionada}
              onChange={(e) => setCategoriaSelecionada(e.target.value)}
            >
              <option value="Todas">Todas as categorias</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </label>
          <label className="filter-field">
            Faixa de preço
            <select value={faixaPreco} onChange={(e) => setFaixaPreco(e.target.value)}>
              <option value="todas">Todos os valores</option>
              <option value="ate-200">Até R$ 200</option>
              <option value="200-1000">Acima de R$ 200 até R$ 1.000</option>
              <option value="acima-1000">Acima de R$ 1.000</option>
            </select>
          </label>
          <label className="filter-field">
            Ordenar por valor
            <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
              <option value="padrao">Ordem original</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
            </select>
          </label>
        </div>
      </section>

      <main className="grid">
        {produtosVisiveis.length > 0 ? (
          produtosVisiveis.map((produto) => (
            <ProductCard key={produto.id} produto={produto} onAdd={adicionar} />
          ))
        ) : (
          <p className="no-results">Nenhum produto encontrado com esses filtros.</p>
        )}
      </main>

      {aberto && (
        <Cart
          itens={carrinho}
          concluida={concluida}
          onClose={() => setAberto(false)}
          onRemove={remover}
          onUpdateQuantity={atualizarQuantidade}
          onFinish={() => {
            setConcluida(true)
            setCarrinho([])
          }}
        />
      )}
    </>
  )
}
