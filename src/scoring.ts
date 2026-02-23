import type { TraitScores, ArchetypeKey, Archetype } from './types'

const SOCK_WEIGHT = 0.3
const RAZOR_WEIGHT = 0.3
const SPORTS_WEIGHT = 0.4

/** Socks: creativity, structure, status, optimization */
export const SOCK_TRAITS: Record<string, Partial<Record<keyof TraitScores, number>>> = {
  classic: { structure: 85, creativity: 30, statusSensitivity: 50, optimization: 60 },
  patterned: { creativity: 80, structure: 45, statusSensitivity: 55, optimization: 40 },
  luxury_minimal: { statusSensitivity: 90, structure: 85, creativity: 50, optimization: 75 },
  athletic: { optimization: 70, structure: 65, creativity: 40, statusSensitivity: 45 },
  cartoon_fun: { creativity: 90, structure: 25, statusSensitivity: 20, optimization: 35 },
  compression: { optimization: 88, structure: 75, creativity: 45, statusSensitivity: 60 },
  striped: { structure: 60, creativity: 55, statusSensitivity: 50, optimization: 50 },
  solid_dark: { structure: 80, creativity: 35, statusSensitivity: 65, optimization: 70 },
  wool_plain: { structure: 70, creativity: 40, statusSensitivity: 55, optimization: 65 },
  novelty: { creativity: 85, structure: 30, statusSensitivity: 40, optimization: 35 },
  dress: { statusSensitivity: 85, structure: 80, creativity: 45, optimization: 60 },
  no_show: { optimization: 75, structure: 70, creativity: 40, statusSensitivity: 50 },
}

/** Razor: risk, control, tech, decisiveness */
export const RAZOR_TRAITS: Record<string, Partial<Record<keyof TraitScores, number>>> = {
  straight: { riskTolerance: 92, controlOrientation: 88, techAdoption: 30, decisiveness: 85 },
  safety: { riskTolerance: 45, controlOrientation: 80, techAdoption: 50, decisiveness: 75 },
  disposable: { riskTolerance: 55, controlOrientation: 40, techAdoption: 45, decisiveness: 90 },
  premium_electric: { riskTolerance: 50, controlOrientation: 70, techAdoption: 95, decisiveness: 80 },
  subscription: { riskTolerance: 40, controlOrientation: 55, techAdoption: 75, decisiveness: 70 },
  precision_trimmer: { riskTolerance: 35, controlOrientation: 95, techAdoption: 70, decisiveness: 75 },
  cartridge: { riskTolerance: 50, controlOrientation: 65, techAdoption: 60, decisiveness: 78 },
  double_edge: { riskTolerance: 55, controlOrientation: 82, techAdoption: 40, decisiveness: 72 },
}

/** Sports: leadership, discipline, strategic, resilience, competitive type */
const SPORT_TRAITS: Record<string, Partial<Record<keyof TraitScores, number>> & { competitive?: TraitScores['competitiveType'] }> = {
  boxing: { resilience: 95, discipline: 85, leadership: 50, strategicDepth: 60, competitive: 'individual' },
  weightlifting: { discipline: 92, resilience: 75, leadership: 45, strategicDepth: 50, competitive: 'individual' },
  running: { discipline: 88, resilience: 80, leadership: 40, strategicDepth: 55, competitive: 'individual' },
  football: { leadership: 90, strategicDepth: 75, resilience: 70, discipline: 65, competitive: 'team' },
  tennis: { strategicDepth: 88, discipline: 75, resilience: 70, leadership: 55, competitive: 'individual' },
  chess: { strategicDepth: 95, discipline: 85, leadership: 60, resilience: 65, competitive: 'individual' },
  crossfit: { resilience: 85, discipline: 80, strategicDepth: 60, leadership: 55, competitive: 'hybrid' },
  climbing: { riskTolerance: 85, resilience: 88, strategicDepth: 70, discipline: 75, competitive: 'individual' },
  swimming: { discipline: 82, resilience: 75, strategicDepth: 60, leadership: 45, competitive: 'individual' },
  yoga: { discipline: 78, resilience: 70, strategicDepth: 65, leadership: 50, competitive: 'individual' },
}

function clamp(v: number) {
  return Math.max(0, Math.min(100, Math.round(v)))
}

function avg(values: number[]) {
  if (values.length === 0) return 0
  return values.reduce((a, b) => a + b, 0) / values.length
}

function mix(
  sock: Partial<Record<keyof TraitScores, number>>,
  razor: Partial<Record<keyof TraitScores, number>>,
  sports: Partial<Record<keyof TraitScores, number>>,
  key: keyof TraitScores
): number {
  const s = sock[key] ?? 50
  const r = razor[key] ?? 50
  const sp = sports[key] ?? 50
  return SOCK_WEIGHT * s + RAZOR_WEIGHT * r + SPORTS_WEIGHT * sp
}

export function computeSockScores(ids: string[]): Partial<TraitScores> {
  if (ids.length === 0) return {}
  const out: Partial<TraitScores> = {}
  const keys: (keyof TraitScores)[] = ['creativity', 'structure', 'statusSensitivity', 'optimization']
  for (const k of keys) {
    const vals = ids.map((id) => SOCK_TRAITS[id]?.[k] ?? 50)
    out[k] = clamp(avg(vals))
  }
  return out
}

export function computeRazorScores(ids: string[]): Partial<TraitScores> {
  if (ids.length === 0) return {}
  const out: Partial<TraitScores> = {}
  const keys: (keyof TraitScores)[] = ['riskTolerance', 'controlOrientation', 'techAdoption', 'decisiveness']
  for (const k of keys) {
    const vals = ids.map((id) => RAZOR_TRAITS[id]?.[k] ?? 50)
    out[k] = clamp(avg(vals))
  }
  return out
}

export function computeSportsScores(ids: string[]): Partial<TraitScores> & { competitiveType?: TraitScores['competitiveType'] } {
  if (ids.length === 0) return {}
  const out: Partial<TraitScores> & { competitiveType?: TraitScores['competitiveType'] } = {}
  const keys: (keyof TraitScores)[] = ['leadership', 'discipline', 'strategicDepth', 'resilience']
  for (const k of keys) {
    const vals = ids.map((id) => (SPORT_TRAITS[id] as Partial<TraitScores>)?.[k] ?? 50)
    out[k] = clamp(avg(vals))
  }
  const types = ids.map((id) => SPORT_TRAITS[id]?.competitive).filter(Boolean) as TraitScores['competitiveType'][]
  if (types.length) {
    const team = types.filter((t) => t === 'team').length
    const ind = types.filter((t) => t === 'individual').length
    const hyb = types.filter((t) => t === 'hybrid').length
    if (team >= ind && team >= hyb) out.competitiveType = 'team'
    else if (hyb >= ind && hyb >= team) out.competitiveType = 'hybrid'
    else out.competitiveType = 'individual'
  }
  return out
}

const DEFAULT_TRAITS: TraitScores = {
  creativity: 50,
  structure: 50,
  statusSensitivity: 50,
  optimization: 50,
  riskTolerance: 50,
  controlOrientation: 50,
  techAdoption: 50,
  decisiveness: 50,
  leadership: 50,
  discipline: 50,
  strategicDepth: 50,
  resilience: 50,
  competitiveType: 'hybrid',
}

export function aggregateScores(
  sockIds: string[],
  razorIds: string[],
  sportIds: string[]
): TraitScores {
  const sock = computeSockScores(sockIds)
  const razor = computeRazorScores(razorIds)
  const sports = computeSportsScores(sportIds)

  const t = { ...DEFAULT_TRAITS }

  const sockKeys: (keyof TraitScores)[] = ['creativity', 'structure', 'statusSensitivity', 'optimization']
  const razorKeys: (keyof TraitScores)[] = ['riskTolerance', 'controlOrientation', 'techAdoption', 'decisiveness']
  const sportsKeys: (keyof TraitScores)[] = ['leadership', 'discipline', 'strategicDepth', 'resilience']

  for (const k of sockKeys) t[k] = clamp(mix(sock, razor, sports, k))
  for (const k of razorKeys) t[k] = clamp(mix(sock, razor, sports, k))
  for (const k of sportsKeys) t[k] = clamp(mix(sock, razor, sports, k))
  if (sports.competitiveType) t.competitiveType = sports.competitiveType

  return t
}

/** Archetype cluster scores (higher = closer to archetype) */
function archetypeScores(t: TraitScores): Record<ArchetypeKey, number> {
  return {
    strategic_builder: avg([t.strategicDepth, t.structure, t.discipline, t.controlOrientation]),
    bold_opportunist: avg([t.riskTolerance, t.decisiveness, t.creativity, t.resilience]),
    disciplined_executor: avg([t.discipline, t.structure, t.optimization, t.controlOrientation]),
    creative_visionary: avg([t.creativity, t.leadership, t.riskTolerance, t.strategicDepth]),
    adaptive_competitor: avg([t.resilience, t.leadership, t.decisiveness, t.optimization]),
    analytical_architect: avg([t.strategicDepth, t.controlOrientation, t.structure, t.techAdoption]),
  }
}

export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  strategic_builder: {
    key: 'strategic_builder',
    titleRu: 'Стратегический строитель',
    titleEn: 'Strategic Builder',
    descriptionRu: 'Вы выстраиваете успех системно: чёткие цели, контроль исполнения, долгосрочное планирование.',
    descriptionEn: 'You build success systematically: clear goals, execution control, long-term planning.',
    strengthsRu: ['Структурированность', 'Стратегическое мышление', 'Дисциплина', 'Контроль рисков'],
    strengthsEn: ['Structure', 'Strategic thinking', 'Discipline', 'Risk control'],
    blindSpotsRu: ['Излишняя осторожность', 'Медленные решения при неопределённости'],
    blindSpotsEn: ['Excessive caution', 'Slow decisions under uncertainty'],
    accelerationRu: 'Добавьте быстрые эксперименты с малым бюджетом — тестируйте гипотезы без перегрузки плана.',
    accelerationEn: 'Add quick low-budget experiments — test hypotheses without overloading the plan.',
    wealthModelRu: 'Диверсифицированный портфель + постепенное наращивание капитала. Подходит ПИФы, облигации, долевое участие в бизнесе с прозрачной структурой.',
    wealthModelEn: 'Diversified portfolio + gradual capital growth. Suits mutual funds, bonds, equity in transparent businesses.',
  },
  bold_opportunist: {
    key: 'bold_opportunist',
    titleRu: 'Смелый оппортунист',
    titleEn: 'Bold Opportunist',
    descriptionRu: 'Вы готовы к риску и быстрым решениям. Успех приходит через возможности и скорость.',
    descriptionEn: 'You embrace risk and fast decisions. Success comes through opportunities and speed.',
    strengthsRu: ['Высокая толерантность к риску', 'Решительность', 'Креативность', 'Устойчивость'],
    strengthsEn: ['High risk tolerance', 'Decisiveness', 'Creativity', 'Resilience'],
    blindSpotsRu: ['Импульсивность', 'Недооценка системности'],
    blindSpotsEn: ['Impulsivity', 'Underestimating structure'],
    accelerationRu: 'Введите правило «10% на эксперименты» — выделяйте часть капитала на высокорисковые возможности при сохранении ядра.',
    accelerationEn: 'Apply a "10% for experiments" rule — allocate part of capital to high-risk opportunities while keeping the core.',
    wealthModelRu: 'Рост через проекты с высокой отдачей и ограниченным сроком. Допустимы венчур, акции роста, собственный бизнес при чётком стоп-лоссе.',
    wealthModelEn: 'Growth through high-return, time-bound projects. Venture, growth stocks, own business with clear stop-loss.',
  },
  disciplined_executor: {
    key: 'disciplined_executor',
    titleRu: 'Дисциплинированный исполнитель',
    titleEn: 'Disciplined Executor',
    descriptionRu: 'Надёжность и порядок — ваши сильные стороны. Вы доводите дела до результата.',
    descriptionEn: 'Reliability and order are your strengths. You get things done.',
    strengthsRu: ['Дисциплина', 'Структура', 'Оптимизация процессов', 'Контроль'],
    strengthsEn: ['Discipline', 'Structure', 'Process optimization', 'Control'],
    blindSpotsRu: ['Нежелание менять проверенные схемы', 'Риск упустить нестандартные возможности'],
    blindSpotsEn: ['Reluctance to change proven schemes', 'Risk of missing unconventional opportunities'],
    accelerationRu: 'Раз в квартал пробуйте один новый инструмент или подход — без ломки привычной системы.',
    accelerationEn: 'Try one new tool or approach per quarter — without breaking your usual system.',
    wealthModelRu: 'Регулярные накопления, автоматизация инвестиций, консервативно-умеренный портфель с акцентом на стабильность.',
    wealthModelEn: 'Regular savings, automated investing, conservative-moderate portfolio focused on stability.',
  },
  creative_visionary: {
    key: 'creative_visionary',
    titleRu: 'Креативный визионер',
    titleEn: 'Creative Visionary',
    descriptionRu: 'Вы видите идеи и образы будущего. Лидерство и нестандартные решения — ваша зона силы.',
    descriptionEn: 'You see ideas and images of the future. Leadership and unconventional solutions are your strength.',
    strengthsRu: ['Креативность', 'Лидерство', 'Стратегическое видение', 'Готовность к риску'],
    strengthsEn: ['Creativity', 'Leadership', 'Strategic vision', 'Risk readiness'],
    blindSpotsRu: ['Рассеянность на множество идей', 'Сложности с рутиной'],
    blindSpotsEn: ['Scattered across many ideas', 'Difficulty with routine'],
    accelerationRu: 'Фиксируйте одну главную цель на квартал и делегируйте исполнение деталей.',
    accelerationEn: 'Set one main goal per quarter and delegate execution details.',
    wealthModelRu: 'Рост через проекты с сильной идеей и командой. Подходят долевое участие, краудфандинг, собственный продукт при наличии исполнительного партнёра.',
    wealthModelEn: 'Growth through projects with a strong idea and team. Equity, crowdfunding, own product with an execution partner.',
  },
  adaptive_competitor: {
    key: 'adaptive_competitor',
    titleRu: 'Адаптивный конкурент',
    titleEn: 'Adaptive Competitor',
    descriptionRu: 'Вы совмещаете лидерство, устойчивость и быструю реакцию. Успех — в балансе команды и личной эффективности.',
    descriptionEn: 'You combine leadership, resilience, and quick reaction. Success lies in balancing team and personal effectiveness.',
    strengthsRu: ['Устойчивость', 'Лидерство', 'Решительность', 'Оптимизация'],
    strengthsEn: ['Resilience', 'Leadership', 'Decisiveness', 'Optimization'],
    blindSpotsRu: ['Риск выгорания при высокой нагрузке', 'Нужна ясная приоритизация'],
    blindSpotsEn: ['Burnout risk under high load', 'Need clear prioritization'],
    accelerationRu: 'Чётко разделяйте «стратегические» и «тактические» решения — не смешивайте уровни.',
    accelerationEn: 'Clearly separate "strategic" and "tactical" decisions — do not mix levels.',
    wealthModelRu: 'Комбинированная модель: стабильное ядро (недвижимость, облигации) + доля в растущих активах и проектах с личным участием.',
    wealthModelEn: 'Combined model: stable core (real estate, bonds) + stake in growing assets and projects with personal involvement.',
  },
  analytical_architect: {
    key: 'analytical_architect',
    titleRu: 'Аналитический архитектор',
    titleEn: 'Analytical Architect',
    descriptionRu: 'Вы опираетесь на данные, структуру и технологии. Точность и система — основа вашего стиля.',
    descriptionEn: 'You rely on data, structure, and technology. Precision and system are the basis of your style.',
    strengthsRu: ['Стратегическая глубина', 'Контроль', 'Структура', 'Технологичность'],
    strengthsEn: ['Strategic depth', 'Control', 'Structure', 'Tech adoption'],
    blindSpotsRu: ['Паралич анализа', 'Медленная реакция на быстрые изменения'],
    blindSpotsEn: ['Analysis paralysis', 'Slow reaction to fast changes'],
    accelerationRu: 'Установите дедлайны на ключевые решения и допускайте «достаточно хорошие» данные вместо идеальных.',
    accelerationEn: 'Set deadlines for key decisions and allow "good enough" data instead of perfect.',
    wealthModelRu: 'Системный подход: аллокация по правилам, ребалансировка, использование технологичных платформ и инструментов аналитики.',
    wealthModelEn: 'Systematic approach: rules-based allocation, rebalancing, use of tech platforms and analytics tools.',
  },
}

export function getPrimaryArchetype(t: TraitScores): ArchetypeKey {
  const scores = archetypeScores(t)
  let best: ArchetypeKey = 'strategic_builder'
  let max = 0
  for (const [k, v] of Object.entries(scores) as [ArchetypeKey, number][]) {
    if (v > max) {
      max = v
      best = k
    }
  }
  return best
}

export function getTopTraits(t: TraitScores, n = 3): { key: keyof TraitScores; value: number }[] {
  const exclude: (keyof TraitScores)[] = ['competitiveType']
  const entries = (Object.entries(t) as [keyof TraitScores, number][]).filter(
    ([k, v]) => !exclude.includes(k) && typeof v === 'number'
  )
  entries.sort((a, b) => b[1] - a[1])
  return entries.slice(0, n).map(([key, value]) => ({ key, value }))
}

/** Radar axes for results (5–6 axes per spec). Labels come from i18n. */
export const RADAR_AXES: { key: keyof TraitScores }[] = [
  { key: 'creativity' },
  { key: 'structure' },
  { key: 'riskTolerance' },
  { key: 'controlOrientation' },
  { key: 'leadership' },
  { key: 'strategicDepth' },
]
