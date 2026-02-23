import type { ReactNode } from 'react'

interface LayoutProps {
  step: number
  total: number
  title: string
  subtitle: string
  children: ReactNode
}

export default function Layout({ step, total, title, subtitle, children }: LayoutProps) {
  return (
    <div className="screen layout">
      <div className="progress">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`progress__dot ${i + 1 <= step ? 'progress__dot--active' : ''}`} />
        ))}
      </div>
      <h1 className="layout__title">{title}</h1>
      <p className="layout__subtitle">{subtitle}</p>
      {children}
    </div>
  )
}
