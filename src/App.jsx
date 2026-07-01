import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import foto from './assets/foto-perfil.jpeg.png'
import './App.css'

const PHRASES = ['ENTENDE O TÉCNICO.', 'Se Refina no Fiscal.', 'FALA ABAP.','Entende da Área de Dados.' ]
const NAV = ['Sobre', 'Expertise', 'Projetos', 'Carreira', 'Contato']

const EXPERTISE = [
  { n: '01', t: 'Configuração SD', d: 'Estrutura organizacional, rotas de vendas, condition technique para pricing complexo, output determination e faturamento integrado ao FI.' },
  { n: '02', t: 'Localização Brasil', d: 'CFOP, CST, CSOSN, SD Pricing com ICMS/IPI/PIS/COFINS. Configuração fiscal alinhada à realidade tributária brasileira no SAP.' },
  { n: '03', t: 'ABAP Funcional', d: 'Criação de programas de análise, debugging de user exits e BAdIs, leitura de código técnico para diagnóstico e entendimento do sistema.' },
  { n: '04', t: 'Integração SD/FI/MM', d: 'Mapeamento de fluxos cross-módulos, account determination, movimentos de estoque e contabilização no processo de venda.' },
]

const PROJECTS = [
  { n: '01', t: 'Programa ABAP de Análise de Vendas', d: 'Desenvolvido no servidor IDES: leitura de tabelas SD, filtros por período e cliente, saída em ALV Grid. Primeiro programa ABAP end-to-end como analista funcional.', tags: ['ABAP', 'SAP IDES', 'ALV', 'Debugging'] },
  { n: '02', t: 'Localização Fiscal Brasil no SD', d: 'Trilha de estudo estruturada: fundamentos fiscais (CFOP, CST, CSOSN), SD Pricing com impostos brasileiros e cenário end-to-end no IDES.', tags: ['CFOP', 'CST', 'CSOSN', 'SD Pricing'] },
  { n: '03', t: 'Debugging & Análise Técnica SD', d: 'Sessões práticas de debugging para entender o comportamento de pricing, exits e fluxo de documentos de venda diretamente no código do sistema.', tags: ['Debugging', 'User Exits', 'BAdI', 'Pricing'] },
]

const TIMELINE = [
  { period: '2025 → Presente', company: 'Accenture', loc: 'Recife, Brasil', role: 'Consultor SAP SD', badge: 'Full-time', d: 'Atuando em projetos reais de implementação SAP, cobrindo configuração SD, suporte a processos OTC e integração com módulos FI e MM.' },
  { period: '2024 → 2025', company: 'Formação SAP SD Porto Digital e Accenture academia de 2024 Dezembro', loc: 'Brasil', role: 'Especialização SD', badge: 'Estudo', d: 'Imersão completa no módulo SD: configuração SPRO, localização fiscal brasileira, ABAP básico e prática no servidor IDES.' },
]

function CyclingText() {
  const [idx, setIdx] = useState(0)
  const [fade, setFade] = useState(true)
  useEffect(() => {
    const t = setInterval(() => {
      setFade(false)
      setTimeout(() => { setIdx(i => (i + 1) % PHRASES.length); setFade(true) }, 300)
    }, 2800)
    return () => clearInterval(t)
  }, [])
  return <span className={`cycling ${fade ? 'in' : 'out'}`}>{PHRASES[idx]}</span>
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target) } })
    }, { threshold: 0.08 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function useActiveNav() {
  const [active, setActive] = useState('sobre')
  useEffect(() => {
    const onScroll = () => {
      const ids = ['sobre', 'expertise', 'projetos', 'carreira', 'contato']
      let cur = 'sobre'
      ids.forEach(id => {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 250) cur = id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return active
}

export default function App() {
  useReveal()
  const active = useActiveNav()
  const [menuOpen, setMenuOpen] = useState(false)
  
  const formRef = useRef()
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const enviarEmail = (e) => {
    e.preventDefault()
    setLoading(true)
    setStatusMessage('')

    const SERVICE_ID = 'service_7cbeqnv'
    const TEMPLATE_ID = 'template_fae7u8d'
    const PUBLIC_KEY = 'fYQAzomJCLAyIo-e0'

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatusMessage('Mensagem enviada com sucesso! 👍')
        formRef.current.reset()
      })
      .catch((error) => {
        console.error(error)
        setStatusMessage('Erro ao enviar. Tente novamente ou use o LinkedIn. ❌')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="layout">

      {/* SIDEBAR desktop */}
      <aside className="sidebar">
        <div className="logo">João Paulo<br /><span>SAP SD Analyst</span></div>
        <nav className="sidenav">
          {NAV.map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} className={active === n.toLowerCase() ? 'active' : ''}>
              {n}
            </a>
          ))}
        </nav>
        <div className="sidebar-foot">
          <div className="socials">
            <a href="https://www.linkedin.com/in/joaopinteraminense/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/joaop92" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <a href="#contato" className="btn-cta">Vamos conversar →</a>
        </div>
      </aside>

      {/* TOPBAR mobile */}
      <header className="topbar">
        <span className="topbar-logo">João Paulo · SAP SD</span>
        <button className="burger" onClick={() => setMenuOpen(o => !o)} aria-label="menu">
          <span /><span /><span />
        </button>
        {menuOpen && (
          <div className="mobile-menu">
            {NAV.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{n}</a>
            ))}
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="main">

        {/* HERO */}
        <section className="hero" id="sobre">
          <div className="hero-content">
            <div className="hero-left">
              <span className="tag">SAP SD · ABAP · Localização Brasil</span>
              <h1 className="hero-title">
                ANALISTA<br />
                <span className="dim">QUE</span><br />
                <span className="acc"><CyclingText /></span>
              </h1>
              <p className="hero-sub">
                <strong>João Paulo</strong> — Analista funcional SAP SD focado no ecossistema SAP e me aprofundando a cada dia nos processos Order-to-Cash, localização fiscal brasileira e desenvolvimento ABAP. Engenheiro de Produção e Analista  de Dados, unindo a eficiência de processos à inteligência analítica. 
              </p>
              <span className="scroll-hint">↓ role para baixo</span>
            </div>
            <div className="hero-right">
              <div className="photo-frame">
                <img src={foto} alt="João Paulo" />
              </div>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section className="section" id="sobre2">
          <p className="sec-label">Sobre</p>
          <div className="about-grid" data-reveal>
            <div className="about-text">
              <h2>Funcional com <em>fome de técnico.</em></h2>
              <p>Atuo com SAP SD cobrindo toda a cadeia Order-to-Cash: configuração de estrutura organizacional, pricing via condition technique, determinação de saídas e faturamento integrado ao FI/MM.</p>
              <p>Estudo ABAP ativamente no servidor IDES — criando programas de análise de vendas, praticando debugging e lendo código para entender o sistema além das telas de configuração.</p>
              <p>Aprofundo-me na localização fiscal brasileira: CFOP, CST, CSOSN e tributação no SD Pricing para ICMS, IPI, PIS/COFINS.</p>
            </div>
            <div className="stats">
              {[['SD','Módulo principal'],['OTC','Order-to-Cash'],['BR','Localização fiscal'],['ABAP','Em evolução']].map(([v,l]) => (
                <div className="stat" key={v}><span className="stat-val">{v}</span><span className="stat-lbl">{l}</span></div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERTISE */}
        <section className="section section--alt" id="expertise">
          <p className="sec-label">Expertise</p>
          <div className="exp-grid">
            {EXPERTISE.map((e, i) => (
              <div className="exp-card" key={e.n} data-reveal style={{ '--delay': `${i * 0.08}s` }}>
                <span className="exp-n">{e.n}</span>
                <h3>{e.t}</h3>
                <p>{e.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJETOS */}
        <section className="section" id="projetos">
          <p className="sec-label">Projetos & Estudos</p>
          <div className="proj-list">
            {PROJECTS.map((p, i) => (
              <div className="proj-item" key={p.n} data-reveal style={{ '--delay': `${i * 0.08}s` }}>
                <span className="proj-n">{p.n}</span>
                <div className="proj-body">
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                  <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                </div>
                <span className="proj-arrow">↗</span>
              </div>
            ))}
          </div>
        </section>

        {/* CARREIRA */}
        <section className="section section--alt" id="carreira">
          <p className="sec-label">Carreira</p>
          <h2 className="sec-title" data-reveal>Experiência</h2>
          <div className="timeline">
            {TIMELINE.map((t, i) => (
              <div className="tl-row" key={i} data-reveal style={{ '--delay': `${i * 0.1}s` }}>
                <div className="tl-left">
                  <span className="tl-period">{t.period}</span>
                  <strong>{t.company}</strong>
                  <span className="tl-loc">{t.loc}</span>
                </div>
                <div className="tl-right">
                  <span className="badge">{t.badge}</span>
                  <h3>{t.role}</h3>
                  <p>{t.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTATO */}
        <section className="section contact-section" id="contato">
          <p className="sec-label" style={{ justifyContent: 'center' }}>Contato</p>
          <h2 className="contact-title" data-reveal>Vamos <span className="acc-txt">conversar?</span></h2>
          <p className="contact-sub" data-reveal>Aberto a projetos SAP SD, consultoria em localização Brasil e troca de conhecimento técnico.</p>
          
          <form ref={formRef} onSubmit={enviarEmail} className="contact-form" data-reveal>
            <input type="text" name="user_name" placeholder="Seu Nome" required />
            <input type="email" name="user_email" placeholder="Seu E-mail" required />
            <textarea name="message" placeholder="Como posso te ajudar com o ecossistema SAP?" rows="5" required></textarea>
            
            <button type="submit" className="btn-main" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Mensagem →'}
            </button>
            
            {statusMessage && <p className="status-message">{statusMessage}</p>}
          </form>

          <div className="contact-socials" data-reveal>
            <a href="https://www.linkedin.com/in/joaopinteraminense/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/joaop92" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </section>

        <footer className="footer">
          <span>João Paulo · Analista SAP SD O2C · Brasil</span>
          <span>{new Date().getFullYear()}</span>
        </footer>

      </main>
    </div>
  )
}