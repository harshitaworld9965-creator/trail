import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './Hero.css'
import './Stage.css'
import './Stats.css'
import './Footer.css'
import './Progress.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const stages = [
  { id: 1, title: 'Forest', text: 'Two days under tall pines.' },
  { id: 2, title: 'Ridge', text: 'Open sky, loose rock, long views.' },
  { id: 3, title: 'Summit', text: 'The last climb before the descent.' },
]

const stats = [
  { value: '6', label: 'Days' },
  { value: '84', label: 'Kilometres' },
  { value: '3,200', label: 'Metres climbed' },
  { value: '5', label: 'Campsites' },
]

function App() {
  const container = useRef()

  useGSAP(() => {
    gsap.utils.toArray('.stage').forEach((stage) => {
      gsap.from(stage.querySelectorAll('.stage__image, .stage__text'), {
        opacity: 0,
        y: 60,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stage,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      })

      gsap.to(stage.querySelector('.stage__image'), {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    gsap.to('.progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
  }, { scope: container })

  return (
    <>
      <main ref={container}>
        <div className="progress"></div>

        <section className="hero">
          <h1>The Ridge Route</h1>
          <p>Six days. One ridge. No signal.</p>
        </section>

        {stages.map((stage, index) => (
          <section
            key={stage.id}
            className={index % 2 === 1 ? 'stage stage--reverse' : 'stage'}
          >
            <div className="stage__image"></div>
            <div className="stage__text">
              <h2>{stage.title}</h2>
              <p>{stage.text}</p>
            </div>
          </section>
        ))}

        <section className="stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>
      </main>

      <footer className="footer">
        <p>The Ridge Route · Made for CSS practice</p>
      </footer>
    </>
  )
}

export default App