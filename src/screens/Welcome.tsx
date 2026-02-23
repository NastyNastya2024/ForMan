import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { welcome } from '../i18n/translations'

export default function Welcome() {
  const navigate = useNavigate()
  const { lang, setLang } = useLanguage()
  const t = welcome[lang]

  return (
    <div className="screen welcome">
      <div className="lang-switch">
        <button
          type="button"
          className={`lang-switch__btn ${lang === 'ru' ? 'lang-switch__btn--active' : ''}`}
          onClick={() => setLang('ru')}
        >
          Русский
        </button>
        <button
          type="button"
          className={`lang-switch__btn ${lang === 'en' ? 'lang-switch__btn--active' : ''}`}
          onClick={() => setLang('en')}
        >
          English
        </button>
      </div>
      <div className="welcome__content">
        <h1 className="welcome__title">{t.title}</h1>
        <p className="welcome__subtitle">{t.subtitle}</p>
        <button className="btn btn--primary" onClick={() => navigate('/socks')}>
          {t.cta}
        </button>
      </div>
    </div>
  )
}
