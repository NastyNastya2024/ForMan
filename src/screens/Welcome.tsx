import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="screen welcome">
      <div className="welcome__content">
        <h1 className="welcome__title">Профиль личности и успеха</h1>
        <p className="welcome__subtitle">
          Система определяет сильные стороны и стиль принятия решений через символический выбор продуктов.
          Не является финансовой консультацией.
        </p>
        <button className="btn btn--primary" onClick={() => navigate('/socks')}>
          Начать профилирование
        </button>
      </div>
    </div>
  )
}
