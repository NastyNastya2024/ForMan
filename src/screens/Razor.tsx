import { useNavigate } from 'react-router-dom'
import { useProfiler } from '../context/ProfilerContext'
import { RAZOR_OPTIONS } from '../data/razors'
import Layout from '../components/Layout'

export default function Razor() {
  const navigate = useNavigate()
  const { state, setRazorIds } = useProfiler()
  const selected = new Set(state.razorIds)

  const toggle = (id: string) => {
    const next = selected.has(id) ? [...selected].filter((x) => x !== id) : [...selected, id]
    setRazorIds(next)
  }

  return (
    <Layout step={2} total={4} title="Выберите бритву" subtitle="Оцениваются толерантность к риску, контроль и решительность.">
      <div className="grid grid--razor">
        {RAZOR_OPTIONS.map((opt) => (
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
        <button className="btn btn--secondary" onClick={() => navigate('/socks')}>
          Назад
        </button>
        <button className="btn btn--primary" onClick={() => navigate('/sports')} disabled={selected.size === 0}>
          Далее
        </button>
      </div>
    </Layout>
  )
}
