import { useNavigate } from 'react-router-dom'
import { useProfiler } from '../context/ProfilerContext'
import { SOCK_OPTIONS } from '../data/socks'
import Layout from '../components/Layout'

export default function Socks() {
  const navigate = useNavigate()
  const { state, setSockIds } = useProfiler()
  const selected = new Set(state.sockIds)

  const toggle = (id: string) => {
    const next = selected.has(id) ? [...selected].filter((x) => x !== id) : [...selected, id]
    setSockIds(next)
  }

  return (
    <Layout step={1} total={4} title="Выберите носки" subtitle="Один или несколько вариантов. Оцениваются креативность, структура и статусная чувствительность.">
      <div className="grid grid--socks">
        {SOCK_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`card card--select ${selected.has(opt.id) ? 'card--selected' : ''}`}
            onClick={() => toggle(opt.id)}
          >
            <span className="card__icon">{opt.icon}</span>
            <span className="card__label">{opt.labelRu}</span>
            {selected.has(opt.id) && <span className="card__check">✓</span>}
          </button>
        ))}
      </div>
      <div className="screen-actions">
        <button className="btn btn--secondary" onClick={() => navigate('/')}>
          Назад
        </button>
        <button className="btn btn--primary" onClick={() => navigate('/razor')} disabled={selected.size === 0}>
          Далее
        </button>
      </div>
    </Layout>
  )
}
