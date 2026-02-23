import type { TraitScores } from '../types'
import { RADAR_AXES } from '../scoring'

interface RadarChartProps {
  traits: TraitScores
  size?: number
}

export default function RadarChart({ traits, size = 240 }: RadarChartProps) {
  const axes = RADAR_AXES
  const n = axes.length
  const center = size / 2
  const radius = center - 24

  const points = axes.map(({ key }, i) => {
    const value = traits[key as keyof TraitScores]
    const num = typeof value === 'number' ? value / 100 : 0.5
    const r = radius * num
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      label: axes[i].label,
    }
  })

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
  const gridD = Array.from({ length: 4 }, (_, level) => {
    const r = radius * ((level + 1) / 4)
    const pts = axes.map((_, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2
      return `${i === 0 ? 'M' : 'L'} ${center + r * Math.cos(angle)} ${center + r * Math.sin(angle)}`
    })
    return pts.join(' ') + ' Z'
  })

  const labelRadius = radius + 20
  const labelPoints = axes.map(({ label }, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
      label,
    }
  })

  return (
    <div className="radar">
      <svg viewBox={`0 0 ${size} ${size}`} className="radar__svg">
        {gridD.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="var(--border)" strokeWidth="0.5" />
        ))}
        {axes.map((_, i) => {
          const angle = (Math.PI * 2 * i) / n - Math.PI / 2
          const x = center + radius * Math.cos(angle)
          const y = center + radius * Math.sin(angle)
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="var(--border)"
              strokeWidth="0.5"
            />
          )
        })}
        <path
          d={pathD}
          fill="var(--accent-steel)"
          fillOpacity="0.25"
          stroke="var(--accent-steel)"
          strokeWidth="1.5"
        />
        {labelPoints.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="radar__label"
          >
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  )
}
