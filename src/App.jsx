import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const artworks = [
  { id: '01', src: '/artworks/art-01.jpg', category: 'Ilustração', medium: 'Ilustração digital', alt: 'Personagem de olhos grandes dentro de um círculo com a frase No One No One', featured: true },
  { id: '02', src: '/artworks/art-02.jpg', category: 'Ilustração', medium: 'Ilustração digital', alt: 'Criatura fantástica em forma de sorvete sobre fundo azul', featured: true },
  { id: '03', src: '/artworks/art-03.jpg', category: 'Ilustração', medium: 'Ilustração digital', alt: 'Pequeno monstro verde diante de uma chama', featured: true },
  { id: '04', src: '/artworks/art-04.jpg', category: 'Ilustração', medium: 'Ilustração digital', alt: 'Gato cansado diante de um computador em uma cena de humor', featured: false },
  { id: '05', src: '/artworks/art-05.jpg', category: 'Ilustração', medium: 'Ilustração digital', alt: 'Rosto de criatura com olhos de televisão colorida', featured: false },
  { id: '06', src: '/artworks/art-06.jpg', category: 'Ilustração', medium: 'Ilustração digital', alt: 'Retrato de uma criatura azul de expressão séria', featured: true },
  { id: '07', src: '/artworks/art-07.jpg', category: 'Ilustração', medium: 'Ilustração digital', alt: 'Três personagens laranja ilustrados em estilo cartoon', featured: false },
  { id: '08', src: '/artworks/art-08.jpg', category: 'Ilustração', medium: 'Ilustração digital', alt: 'Gato mágico lendo um livro em um ateliê cheio de poções', featured: true },
  { id: '09', src: '/artworks/art-09.jpg', category: 'Gravura', medium: 'Gravura impressa', alt: 'Impressão artesanal Happy 2025 fotografada em uma área externa', featured: false },
  { id: '10', src: '/artworks/art-10.jpg', category: 'Gravura', medium: 'Gravura impressa', alt: 'Gravura de pássaros e flores fotografada junto a uma árvore', featured: false, duplicate: true },
  { id: '11', src: '/artworks/art-11.jpg', category: 'Desenho', medium: 'Desenho em caderno', alt: 'Esboço de um lobo sobre a palavra Underdog', featured: false },
  { id: '12', src: '/artworks/art-12.jpg', category: 'Gravura', medium: 'Gravura impressa', alt: 'Impressão Good Luck com um gato preto fotografada sobre uma mesa', featured: false, duplicate: true },
  { id: '13', src: '/artworks/art-13.jpg', category: 'Desenho', medium: 'Desenho em caderno', alt: 'Estudo de personagem com a inscrição Happy Summer', featured: false },
  { id: '14', src: '/artworks/art-14.jpg', category: 'Gravura', medium: 'Gravura impressa', alt: 'Gravura em preto e branco de pássaros entre flores', featured: true },
  { id: '15', src: '/artworks/art-15.jpg', category: 'Desenho', medium: 'Desenho em caderno', alt: 'Personagem desenhada diante de linhas onduladas em preto e branco', featured: false },
  { id: '16', src: '/artworks/art-16.jpg', category: 'Desenho', medium: 'Desenho', alt: 'Desenho de um tigre azul em grande formato', featured: false },
  { id: '17', src: '/artworks/art-17.jpg', category: 'Gravura', medium: 'Gravura impressa', alt: 'Composição em preto e branco com figuras e animais', featured: false },
  { id: '18', src: '/artworks/art-18.jpg', category: 'Desenho', medium: 'Desenho em caderno', alt: 'Estudo em nanquim de um lobo e um pequeno fantasma', featured: false },
  { id: '19', src: '/artworks/art-19.jpg', category: 'Gravura', medium: 'Gravura impressa', alt: 'Gravura Good Luck com um gato preto', featured: true },
  { id: '20', src: '/artworks/art-20.jpg', category: 'Gravura', medium: 'Gravura impressa', alt: 'Gravura em preto e branco de figuras fantásticas', featured: false },
  { id: '21', src: '/artworks/art-21.jpg', category: 'Desenho', medium: 'Desenho em caderno', alt: 'Desenho de um coelho emoldurado por folhas e arabescos', featured: false },
  { id: '22', src: '/artworks/art-22.jpg', category: 'Gravura', medium: 'Gravura impressa', alt: 'Impressão amarela e preta com composição fantástica', featured: true },
]

const categories = ['Tudo', 'Ilustração', 'Desenho', 'Gravura']
const archive = artworks.filter((artwork) => !artwork.duplicate)

function ArtworkCard({ artwork, onOpen, featured = false }) {
  return (
    <button
      className={`art-card${featured ? ' art-card--featured' : ''}`}
      type="button"
      onClick={() => onOpen(artwork)}
      aria-label={`Abrir obra ${artwork.id}: ${artwork.alt}`}
    >
      <span className="art-card__image">
        <img src={artwork.src} alt={artwork.alt} loading={featured ? 'eager' : 'lazy'} />
        <span className="art-card__open" aria-hidden="true">↗</span>
      </span>
      <span className="art-card__meta">
        <span>{artwork.category}</span>
        <span>/{artwork.id}</span>
      </span>
    </button>
  )
}

function Lightbox({ artwork, onClose }) {
  useEffect(() => {
    if (!artwork) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [artwork, onClose])

  if (!artwork) return null

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Obra ${artwork.id}`} onClick={onClose}>
      <div className="lightbox__panel" onClick={(event) => event.stopPropagation()}>
        <button className="lightbox__close" type="button" onClick={onClose} aria-label="Fechar obra">Fechar <span>×</span></button>
        <div className="lightbox__image"><img src={artwork.src} alt={artwork.alt} /></div>
        <div className="lightbox__caption">
          <span>underdog51 / {artwork.id}</span>
          <span>{artwork.medium}</span>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const mainRef = useRef(null)
  const featuredRef = useRef(null)
  const featuredTrackRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('Tudo')
  const [activeArtwork, setActiveArtwork] = useState(null)
  const filteredArtworks = useMemo(
    () => activeCategory === 'Tudo' ? archive : archive.filter((artwork) => artwork.category === activeCategory),
    [activeCategory],
  )

  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .from('.hero__eyebrow', { y: 12, opacity: 0, duration: 0.55 })
        .from('.hero__name-line', { yPercent: 115, duration: 0.9, stagger: 0.1 }, '-=0.2')
        .from('.hero__collage', { y: 35, opacity: 0, duration: 0.75 }, '-=0.3')

      gsap.utils.toArray('[data-reveal]:not(.archive__item)').forEach((element) => {
        gsap.from(element, {
          y: 34,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        })
      })

      gsap.to('.hero__sticker--one', {
        yPercent: -14,
        rotation: 4,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.7 },
      })

      gsap.to('.scroll-progress__bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.2 },
      })
    })
    return () => media.revert()
  }, { scope: mainRef })

  useGSAP(() => {
    const grid = mainRef.current?.querySelector('.archive__grid')
    if (!grid) return
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(grid.querySelectorAll('.archive__item'), {
        y: 24,
        opacity: 0,
        duration: 0.5,
        stagger: 0.035,
        ease: 'power2.out',
        scrollTrigger: { trigger: grid, start: 'top 82%', once: true },
        onComplete: () => ScrollTrigger.refresh(),
      })
    })
    return () => media.revert()
  }, { scope: mainRef, dependencies: [activeCategory], revertOnUpdate: true })

  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const track = featuredTrackRef.current
      const section = featuredRef.current
      if (!track || !section) return undefined
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 48)
      if (distance() < 80) return undefined
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
    })
    return () => media.revert()
  }, { scope: featuredRef })

  const openArtwork = (artwork) => setActiveArtwork(artwork)
  const closeArtwork = () => setActiveArtwork(null)

  return (
    <main ref={mainRef}>
      <div className="scroll-progress" aria-hidden="true"><span className="scroll-progress__bar" /></div>

      <header className="site-header">
        <a className="site-header__brand" href="#inicio" aria-label="underdog51, início">underdog<span>51</span></a>
        <nav className="site-nav" aria-label="Navegação principal">
          <a href="#trabalhos">Trabalhos</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero__topline">
        </div>
        <div className="hero__title-wrap">
          <h1 className="hero__title" id="hero-title">
            <span className="hero__name-line hero__name-line--single"><span>UNDERDOG</span><span className="hero__number">51</span></span>
          </h1>
          <p className="hero__tagline">universo fora da linha</p>
        </div>
        <div className="hero__lower">
          <div className="hero__collage" aria-label="Colagem de ilustrações de underdog51">
            <figure className="hero__art hero__art--main">
              <img src="/artworks/art-08.jpg" alt="Gato mágico lendo um livro em um ateliê cheio de poções" fetchPriority="high" />
              <figcaption>UM POUCO DE MAGIA, MUITO DE BAGUNÇA</figcaption>
            </figure>
            <figure className="hero__art hero__sticker hero__sticker--one">
              <img src="/artworks/art-01.jpg" alt="Personagem circular No One No One" />
            </figure>
            <figure className="hero__art hero__sticker hero__sticker--two">
              <img src="/artworks/art-03.jpg" alt="Criatura verde diante de uma chama" />
            </figure>
          </div>
        </div>
      </section>

      <section className="featured" id="trabalhos" ref={featuredRef} aria-labelledby="featured-title">
        <div className="featured__intro">
          <div>
            <h2 id="featured-title">Trabalhos<br /><em>em destaque</em></h2>
          </div>
          <p>Uma seleção de ilustrações, rabiscos e impressões feitas à mão.<br />Clique em uma obra para ver de perto.</p>
        </div>
        <div className="featured__track" ref={featuredTrackRef}>
          {archive.filter((artwork) => artwork.featured).map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} onOpen={openArtwork} featured />
          ))}
          <a className="featured__end-card" href="#arquivo">
            <span>O ARQUIVO<br />COMPLETO</span>
            <i>↘</i>
          </a>
        </div>
        <div className="featured__scroll-hint" aria-hidden="true">DESLIZE<span>→</span></div>
      </section>

      <section className="archive" id="arquivo" aria-labelledby="archive-title">
        <div className="archive__heading" data-reveal>
          <div>
            <h2 id="archive-title">Mais coisas<br /><em>para ver.</em></h2>
          </div>
          <p>Ilustrações digitais, desenhos de caderno e gravuras. Cada peça tem seu próprio jeito de aparecer.</p>
        </div>
        <div className="archive__filters" role="group" aria-label="Filtrar trabalhos">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={activeCategory === category ? 'filter-chip is-active' : 'filter-chip'}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}<span>{category === 'Tudo' ? archive.length : archive.filter((artwork) => artwork.category === category).length}</span>
            </button>
          ))}
        </div>
        <div className="archive__grid" key={activeCategory}>
          {filteredArtworks.map((artwork, index) => (
            <div className={`archive__item archive__item--${(index % 6) + 1}`} key={artwork.id} data-reveal>
              <ArtworkCard artwork={artwork} onOpen={openArtwork} />
            </div>
          ))}
        </div>
      </section>

      <section className="about" id="sobre" aria-labelledby="about-title">
        <div className="about__number" data-reveal>02</div>
        <div className="about__copy" data-reveal>
          <h2 id="about-title">Prazer,<br /><em>sou a Nathalia.</em></h2>
          <p>aqui vem um bla bla bla classico sobre vc</p>
          <p className="about__small">bla bla bla</p>
        </div>
        <div className="about__art" data-reveal>
          <img src="/artworks/art-11.jpg" alt="Esboço de um lobo sobre a palavra Underdog" loading="lazy" />
          <span className="about__art-note">NOT NORMAL</span>
          <span className="about__signature">Underdog51</span>
        </div>
        <span className="about__scribble" aria-hidden="true">Don't be<br />Normal</span>
      </section>

      <section className="process" aria-labelledby="process-title">
        <div className="process__header" data-reveal>
          <h2 id="process-title">IDK<br /><em>WHAT TO PUT HERE</em></h2>
          <p>bla bla </p>
        </div>
        <div className="process__images">
          <figure className="process__image process__image--large" data-reveal>
            <img src="/artworks/art-14.jpg" alt="Gravura impressa em preto e branco de pássaros e flores" loading="lazy" />
            <figcaption>GRAVURA · PÁSSAROS E FLORES</figcaption>
          </figure>
          <figure className="process__image process__image--small" data-reveal>
            <img src="/artworks/art-09.jpg" alt="Impressão artesanal Happy 2025" loading="lazy" />
            <figcaption>IMPRESSÃO · FELIZ 2025</figcaption>
          </figure>
          <span className="process__stamp" aria-hidden="true">FEITO<br />À MÃO<br /><b>✳</b></span>
        </div>
      </section>

      <footer className="contact" id="contato" aria-labelledby="contact-title">
        <h2 id="contact-title">Any<br /><em>Idea?</em></h2>
        <div className="contact__bottom">
          <p>Projetos, encomendas e colaborações são bem-vindos.<br />Os canais de contato entram aqui quando estiverem definidos.</p>
          <span className="contact__mark">underdog<span>51</span></span>
        </div>
        <div className="contact__footer"><span>NATHALIA MICHALZUK</span><a href="#inicio">VOLTAR AO TOPO ↑</a><span>Made by <span>Henrik Dambros</span> © 2026</span></div>
      </footer>

      <Lightbox artwork={activeArtwork} onClose={closeArtwork} />
    </main>
  )
}
