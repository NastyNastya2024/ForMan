import { useEffect, useState } from 'react'
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
  const [footerMessage, setFooterMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!traits || !primaryArchetype) navigate('/')
  }, [traits, primaryArchetype, navigate])

  useEffect(() => {
    if (!footerMessage) return
    const id = window.setTimeout(() => setFooterMessage(null), 2000)
    return () => clearTimeout(id)
  }, [footerMessage])

  if (!traits || !primaryArchetype) return null

  const title = lang === 'en' ? primaryArchetype.titleEn : primaryArchetype.titleRu
  const description = lang === 'en' ? primaryArchetype.descriptionEn : primaryArchetype.descriptionRu
  const strengths = lang === 'en' ? primaryArchetype.strengthsEn : primaryArchetype.strengthsRu
  const blindSpots = lang === 'en' ? primaryArchetype.blindSpotsEn : primaryArchetype.blindSpotsRu
  const acceleration = lang === 'en' ? primaryArchetype.accelerationEn : primaryArchetype.accelerationRu
  const wealthModel = lang === 'en' ? primaryArchetype.wealthModelEn : primaryArchetype.wealthModelRu
  const careerModel = lang === 'en' ? primaryArchetype.careerModelEn : primaryArchetype.careerModelRu
  const lifeStrategy = lang === 'en' ? primaryArchetype.lifeStrategyEn : primaryArchetype.lifeStrategyRu
  const traitsToDevelop = lang === 'en' ? primaryArchetype.traitsToDevelopEn : primaryArchetype.traitsToDevelopRu

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = lang === 'en' ? 'My Success Profile' : 'Мой профиль успеха'
  const shareText = `${title}\n${description}`

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        })
        setFooterMessage(t.shared)
      } catch (err) {
        copyToClipboard(shareUrl)
      }
    } else {
      copyToClipboard(shareUrl)
    }
  }

  const copyToClipboard = (text: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    navigator.clipboard.writeText(text).then(() => setFooterMessage(t.copied))
  }

  const handleSave = () => {
    const lines = [
      title,
      description,
      '',
      t.strengths,
      ...strengths,
      '',
      t.blindSpots,
      ...blindSpots,
      '',
      t.acceleration,
      acceleration,
      '',
      t.wealthModel,
      wealthModel,
      '',
      t.careerModel,
      careerModel,
      '',
      t.lifeStrategy,
      lifeStrategy,
      '',
      t.traitsToDevelop,
      ...traitsToDevelop,
      '',
      shareUrl,
    ]
    copyToClipboard(lines.join('\n'))
  }

  const handlePremium = () => {
    setFooterMessage(t.comingSoon)
  }

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

        <section className="results__block">
          <h2 className="results__heading">{t.careerModel}</h2>
          <p className="results__text">{careerModel}</p>
        </section>

        <section className="results__block">
          <h2 className="results__heading">{t.lifeStrategy}</h2>
          <p className="results__text">{lifeStrategy}</p>
        </section>

        <section className="results__block">
          <h2 className="results__heading">{t.traitsToDevelop}</h2>
          <ul className="results__list">
            {traitsToDevelop.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
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
          <button type="button" className="btn btn--ghost" onClick={handleShare}>
            {t.share}
          </button>
          <button type="button" className="btn btn--ghost" onClick={handleSave}>
            {t.save}
          </button>
          <button type="button" className="btn btn--accent" onClick={handlePremium}>
            {t.premiumCta}
          </button>
          {footerMessage && (
            <span className="results__footer-msg">{footerMessage}</span>
          )}
        </div>
      </div>
    </div>
  )
}
