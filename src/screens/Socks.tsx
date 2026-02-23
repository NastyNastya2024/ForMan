import { useNavigate } from 'react-router-dom'
import { useProfiler } from '../context/ProfilerContext'
import { useLanguage } from '../context/LanguageContext'
import { SOCK_OPTIONS } from '../data/socks'
import { socksScreen, nav } from '../i18n/translations'
import Layout from '../components/Layout'

export default function Socks() {
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const { state, setSockIds } = useProfiler()
  const selected = new Set(state.sockIds)
  const screenT = socksScreen[lang]
  const navT = nav[lang]
  const labelKey = lang === 'ru' ? 'labelRu' : 'labelEn'

  const toggle = (id: string) => {
    const next = selected.has(id) ? [...selected].filter((x) => x !== id) : [...selected, id]
    setSockIds(next)
  }

  return (
    <Layout step={1} total={4} title={screenT.title} subtitle={screenT.subtitle}>
      <ul className="options-list">
        {SOCK_OPTIONS.map((opt) => (
          <li key={opt.id} className="options-list__item">
            <label className="option-row">
              <input
                type="checkbox"
                checked={selected.has(opt.id)}
                onChange={() => toggle(opt.id)}
                className="option-row__input"
              />
              <span className="option-row__text">{(opt as Record<string, string>)[labelKey]}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="screen-actions">
        <button className="btn btn--secondary" onClick={() => navigate('/')}>
          {navT.back}
        </button>
        <button className="btn btn--primary" onClick={() => navigate('/razor')} disabled={selected.size === 0}>
          {navT.next}
        </button>
      </div>
    </Layout>
  )
}
