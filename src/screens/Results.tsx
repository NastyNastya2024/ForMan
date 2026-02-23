import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfiler } from '../context/ProfilerContext'
import RadarChart from '../components/RadarChart'

const TRAIT_LABELS: Record<string, string> = {
  creativity: 'Креативность',
  structure: 'Структура',
  statusSensitivity: 'Статусная чувствительность',
  optimization: 'Оптимизация',
  riskTolerance: 'Толерантность к риску',
  controlOrientation: 'Контроль',
  techAdoption: 'Технологичность',
  decisiveness: 'Решительность',
  leadership: 'Лидерство',
  discipline: 'Дисциплина',
  strategicDepth: 'Стратегическая глубина',
  resilience: 'Устойчивость',
}

export default function Results() {
  const navigate = useNavigate()
  const { state, reset } = useProfiler()
  const { traits, primaryArchetype } = state

  useEffect(() => {
    if (!traits || !primaryArchetype) navigate('/')
  }, [traits, primaryArchetype, navigate])

  if (!traits || !primaryArchetype) return null

  return (
    <div className="screen results">
      <div className="results__inner">
        <h1 className="results__archetype">{primaryArchetype.titleRu}</h1>
        <p className="results__description">{primaryArchetype.descriptionRu}</p>

        <section className="results__radar">
          <RadarChart traits={traits} size={280} />
        </section>

        <section className="results__block">
          <h2 className="results__heading">Сильные стороны</h2>
          <ul className="results__list">
            {primaryArchetype.strengthsRu.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="results__block">
          <h2 className="results__heading">Слепые зоны</h2>
          <ul className="results__list results__list--muted">
            {primaryArchetype.blindSpotsRu.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="results__block">
          <h2 className="results__heading">Стратегия ускорения</h2>
          <p className="results__text">{primaryArchetype.accelerationRu}</p>
        </section>

        <section className="results__block">
          <h2 className="results__heading">Рекомендуемая модель накопления</h2>
          <p className="results__text">{primaryArchetype.wealthModelRu}</p>
        </section>

        <div className="results__top-traits">
          <span className="results__top-label">Топ-3 черты: </span>
          {state.topTraits.map(({ key, value }) => (
            <span key={key} className="results__trait-tag">
              {TRAIT_LABELS[key] ?? key}: {value}
            </span>
          ))}
        </div>

        <div className="screen-actions results__actions">
          <button className="btn btn--secondary" onClick={() => navigate('/sports')}>
            Назад
          </button>
          <button className="btn btn--primary" onClick={() => { reset(); navigate('/') }}>
            Пройти заново
          </button>
        </div>

        <div className="results__footer">
          <button type="button" className="btn btn--ghost">
            Поделиться
          </button>
          <button type="button" className="btn btn--ghost">
            Сохранить
          </button>
          <button type="button" className="btn btn--accent">
            Расширенный отчёт
          </button>
        </div>
      </div>
    </div>
  )
}
