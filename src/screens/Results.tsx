import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfiler } from '../context/ProfilerContext'
import { useLanguage } from '../context/LanguageContext'
import { resultsScreen, traitLabels } from '../i18n/translations'
import RadarChart from '../components/RadarChart'

export default function Results() {
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const { state, reset } = useProfiler()
  const { traits, primaryArchetype } = state
  const t = resultsScreen[lang]
  const traitLabelsMap = traitLabels[lang]

  useEffect(() => {
    if (!traits || !primaryArchetype) navigate('/')
  }, [traits, primaryArchetype, navigate])

  if (!traits || !primaryArchetype) return null

  const title = lang === 'en' ? primaryArchetype.titleEn : primaryArchetype.titleRu
  const description = lang === 'en' ? primaryArchetype.descriptionEn : primaryArchetype.descriptionRu
  const strengths = lang === 'en' ? primaryArchetype.strengthsEn : primaryArchetype.strengthsRu
  const blindSpots = lang === 'en' ? primaryArchetype.blindSpotsEn : primaryArchetype.blindSpotsRu
  const acceleration = lang === 'en' ? primaryArchetype.accelerationEn : primaryArchetype.accelerationRu
  const wealthModel = lang === 'en' ? primaryArchetype.wealthModelEn : primaryArchetype.wealthModelRu

  return (
    <div className="screen results">
      <div className="results__inner">
        <h1 className="results__archetype">{title}</h1>
        <p className="results__description">{description}</p>

        <section className="results__radar">
          <RadarChart traits={traits} lang={lang} size={280} />
        </section>

        <section className="results__block">
          <h2 className="results__heading">{t.strengths}</h2>
          <ul className="results__list">
            {strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="results__block">
          <h2 className="results__heading">{t.blindSpots}</h2>
          <ul className="results__list results__list--muted">
            {blindSpots.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="results__block">
          <h2 className="results__heading">{t.acceleration}</h2>
          <p className="results__text">{acceleration}</p>
        </section>

        <section className="results__block">
          <h2 className="results__heading">{t.wealthModel}</h2>
          <p className="results__text">{wealthModel}</p>
        </section>

        <div className="results__top-traits">
          <span className="results__top-label">{t.topTraits}: </span>
          {state.topTraits.map(({ key, value }) => (
            <span key={key} className="results__trait-tag">
              {traitLabelsMap[key] ?? key}: {value}
            </span>
          ))}
        </div>

        <div className="screen-actions results__actions">
          <button className="btn btn--secondary" onClick={() => navigate('/sports')}>
            {t.back}
          </button>
          <button className="btn btn--primary" onClick={() => { reset(); navigate('/') }}>
            {t.restart}
          </button>
        </div>

        <div className="results__footer">
          <button type="button" className="btn btn--ghost">
            {t.share}
          </button>
          <button type="button" className="btn btn--ghost">
            {t.save}
          </button>
          <button type="button" className="btn btn--accent">
            {t.premiumCta}
          </button>
        </div>
      </div>
    </div>
  )
}
