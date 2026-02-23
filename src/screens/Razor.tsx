import { useNavigate } from 'react-router-dom'
import { useProfiler } from '../context/ProfilerContext'
import { useLanguage } from '../context/LanguageContext'
import { RAZOR_OPTIONS } from '../data/razors'
import { razorScreen, nav } from '../i18n/translations'
import Layout from '../components/Layout'

export default function Razor() {
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const { state, setRazorIds } = useProfiler()
  const selected = new Set(state.razorIds)
  const screenT = razorScreen[lang]
  const navT = nav[lang]
  const labelKey = lang === 'ru' ? 'labelRu' : 'labelEn'

  const toggle = (id: string) => {
    const next = selected.has(id) ? [...selected].filter((x) => x !== id) : [...selected, id]
    setRazorIds(next)
  }

  return (
    <Layout step={2} total={4} title={screenT.title} subtitle={screenT.subtitle}>
      <div className="grid grid--razor">
        {RAZOR_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`card card--select ${selected.has(opt.id) ? 'card--selected' : ''}`}
            onClick={() => toggle(opt.id)}
          >
            <span className="card__icon">{opt.icon}</span>
            <span className="card__label">{(opt as Record<string, string>)[labelKey]}</span>
            {selected.has(opt.id) && <span className="card__check">✓</span>}
          </button>
        ))}
      </div>
      <div className="screen-actions">
        <button className="btn btn--secondary" onClick={() => navigate('/socks')}>
          {navT.back}
        </button>
        <button className="btn btn--primary" onClick={() => navigate('/sports')} disabled={selected.size === 0}>
          {navT.next}
        </button>
      </div>
    </Layout>
  )
}
