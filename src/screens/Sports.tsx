import { useNavigate } from 'react-router-dom'
import { useProfiler } from '../context/ProfilerContext'
import { useLanguage } from '../context/LanguageContext'
import { SPORT_OPTIONS } from '../data/sports'
import { sportsScreen, nav } from '../i18n/translations'
import Layout from '../components/Layout'

export default function Sports() {
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const { state, setSportIds, computeResults } = useProfiler()
  const selected = new Set(state.sportIds)
  const t = sportsScreen[lang]
  const navT = nav[lang]

  const toggle = (id: string) => {
    const next = selected.has(id) ? [...selected].filter((x) => x !== id) : [...selected, id]
    setSportIds(next)
  }

  const goToResults = () => {
    computeResults()
    navigate('/results')
  }

  const getLabel = (opt: (typeof SPORT_OPTIONS)[0]) => (lang === 'en' ? opt.labelEn : opt.labelRu)

  return (
    <Layout step={3} total={4} title={t.title} subtitle={t.subtitle}>
      <div className="grid grid--sports">
        {SPORT_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`card card--select card--sport ${selected.has(opt.id) ? 'card--selected' : ''}`}
            onClick={() => toggle(opt.id)}
          >
            <span className="card__icon">{opt.icon}</span>
            <span className="card__label">{getLabel(opt)}</span>
            {selected.has(opt.id) && <span className="card__check">✓</span>}
          </button>
        ))}
      </div>
      <div className="screen-actions">
        <button className="btn btn--secondary" onClick={() => navigate('/razor')}>
          {navT.back}
        </button>
        <button className="btn btn--primary" onClick={goToResults} disabled={selected.size === 0}>
          {navT.showResults}
        </button>
      </div>
    </Layout>
  )
}
