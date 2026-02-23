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
    descriptionRu: 'Вы выстраиваете успех системно: чёткие цели, контроль исполнения, долгосрочное планирование.',
    strengthsRu: ['Структурированность', 'Стратегическое мышление', 'Дисциплина', 'Контроль рисков'],
    blindSpotsRu: ['Излишняя осторожность', 'Медленные решения при неопределённости'],
    accelerationRu: 'Добавьте быстрые эксперименты с малым бюджетом — тестируйте гипотезы без перегрузки плана.',
    wealthModelRu: 'Диверсифицированный портфель + постепенное наращивание капитала. Подходит ПИФы, облигации, долевое участие в бизнесе с прозрачной структурой.',
  },
  bold_opportunist: {
    key: 'bold_opportunist',
    titleRu: 'Смелый оппортунист',
    descriptionRu: 'Вы готовы к риску и быстрым решениям. Успех приходит через возможности и скорость.',
    strengthsRu: ['Высокая толерантность к риску', 'Решительность', 'Креативность', 'Устойчивость'],
    blindSpotsRu: ['Импульсивность', 'Недооценка системности'],
    accelerationRu: 'Введите правило «10% на эксперименты» — выделяйте часть капитала на высокорисковые возможности при сохранении ядра.',
    wealthModelRu: 'Рост через проекты с высокой отдачей и ограниченным сроком. Допустимы венчур, акции роста, собственный бизнес при чётком стоп-лоссе.',
  },
  disciplined_executor: {
    key: 'disciplined_executor',
    titleRu: 'Дисциплинированный исполнитель',
    descriptionRu: 'Надёжность и порядок — ваши сильные стороны. Вы доводите дела до результата.',
    strengthsRu: ['Дисциплина', 'Структура', 'Оптимизация процессов', 'Контроль'],
    blindSpotsRu: ['Нежелание менять проверенные схемы', 'Риск упустить нестандартные возможности'],
    accelerationRu: 'Раз в квартал пробуйте один новый инструмент или подход — без ломки привычной системы.',
    wealthModelRu: 'Регулярные накопления, автоматизация инвестиций, консервативно-умеренный портфель с акцентом на стабильность.',
  },
  creative_visionary: {
    key: 'creative_visionary',
    titleRu: 'Креативный визионер',
    descriptionRu: 'Вы видите идеи и образы будущего. Лидерство и нестандартные решения — ваша зона силы.',
    strengthsRu: ['Креативность', 'Лидерство', 'Стратегическое видение', 'Готовность к риску'],
    blindSpotsRu: ['Рассеянность на множество идей', 'Сложности с рутиной'],
    accelerationRu: 'Фиксируйте одну главную цель на квартал и делегируйте исполнение деталей.',
    wealthModelRu: 'Рост через проекты с сильной идеей и командой. Подходят долевое участие, краудфандинг, собственный продукт при наличии исполнительного партнёра.',
  },
  adaptive_competitor: {
    key: 'adaptive_competitor',
    titleRu: 'Адаптивный конкурент',
    descriptionRu: 'Вы совмещаете лидерство, устойчивость и быструю реакцию. Успех — в балансе команды и личной эффективности.',
    strengthsRu: ['Устойчивость', 'Лидерство', 'Решительность', 'Оптимизация'],
    blindSpotsRu: ['Риск выгорания при высокой нагрузке', 'Нужна ясная приоритизация'],
    accelerationRu: 'Чётко разделяйте «стратегические» и «тактические» решения — не смешивайте уровни.',
    wealthModelRu: 'Комбинированная модель: стабильное ядро (недвижимость, облигации) + доля в растущих активах и проектах с личным участием.',
  },
  analytical_architect: {
    key: 'analytical_architect',
    titleRu: 'Аналитический архитектор',
    descriptionRu: 'Вы опираетесь на данные, структуру и технологии. Точность и система — основа вашего стиля.',
    strengthsRu: ['Стратегическая глубина', 'Контроль', 'Структура', 'Технологичность'],
    blindSpotsRu: ['Паралич анализа', 'Медленная реакция на быстрые изменения'],
    accelerationRu: 'Установите дедлайны на ключевые решения и допускайте «достаточно хорошие» данные вместо идеальных.',
    wealthModelRu: 'Системный подход: аллокация по правилам, ребалансировка, использование технологичных платформ и инструментов аналитики.',
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

/** Radar axes for results (5–6 axes per spec) */
export const RADAR_AXES: { label: string; key: keyof TraitScores }[] = [
  { label: 'Креативность', key: 'creativity' },
  { label: 'Структура', key: 'structure' },
  { label: 'Риск', key: 'riskTolerance' },
  { label: 'Контроль', key: 'controlOrientation' },
  { label: 'Лидерство', key: 'leadership' },
  { label: 'Стратегия', key: 'strategicDepth' },
]
