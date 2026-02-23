import { useNavigate } from 'react-router-dom'
import { useProfiler } from '../context/ProfilerContext'
import { SPORT_OPTIONS } from '../data/sports'
import Layout from '../components/Layout'

export default function Sports() {
  const navigate = useNavigate()
  const { state, setSportIds, computeResults } = useProfiler()
  const selected = new Set(state.sportIds)

  const toggle = (id: string) => {
    const next = selected.has(id) ? [...selected].filter((x) => x !== id) : [...selected, id]
    setSportIds(next)
  }

  const goToResults = () => {
    computeResults()
    navigate('/results')
  }

  return (
    <Layout step={3} total={4} title="Выберите виды активности" subtitle="Сила, стратегия, команда, выносливость, контроль. Можно несколько.">
      <div className="grid grid--sports">
        {SPORT_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`card card--select card--sport ${selected.has(opt.id) ? 'card--selected' : ''}`}
            onClick={() => toggle(opt.id)}
          >
            <span className="card__icon">{opt.icon}</span>
            <span className="card__label">{opt.labelRu}</span>
            {selected.has(opt.id) && <span className="card__check">✓</span>}
          </button>
        ))}
      </div>
      <div className="screen-actions">
        <button className="btn btn--secondary" onClick={() => navigate('/razor')}>
          Назад
        </button>
        <button className="btn btn--primary" onClick={goToResults} disabled={selected.size === 0}>
          Показать результат
        </button>
      </div>
    </Layout>
  )
}
