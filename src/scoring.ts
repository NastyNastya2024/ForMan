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
    wealthModelRu: 'Диверсифицированный портфель с постепенным наращиванием капитала. Рекомендуется: 40–50% облигации и фонды облигаций (государственные и корпоративные с высоким рейтингом), 30–40% акции через ПИФы или ETF широкого рынка, 10–20% долевое участие в бизнесе с прозрачной отчётностью и понятным exit. Ребалансировка раз в год. Документируйте цели по срокам и суммам, держите резерв на 6–12 месяцев расходов в ликвидности.',
    wealthModelEn: 'Diversified portfolio with gradual capital growth. Recommended: 40–50% bonds and bond funds (government and investment-grade corporate), 30–40% equities via mutual funds or broad-market ETFs, 10–20% equity in businesses with transparent reporting and clear exit. Rebalance annually. Document time- and amount-based goals; keep 6–12 months of expenses in liquid reserves.',
    careerModelRu: 'Карьера: рост в роли управленца в структурированных отраслях — производство, логистика, банки, консалтинг, госсектор. Позиции с плановыми целями, KPI и ясной иерархией. Бизнес: стабильные отрасли с прозрачными процессами — B2B-услуги, подряд, дистрибуция, системная интеграция. Избегайте хаотичных рынков; выбирайте компании с чёткой стратегией и долгосрочными контрактами.',
    careerModelEn: 'Career: grow as a manager in structured industries — manufacturing, logistics, banking, consulting, public sector. Roles with clear targets, KPIs, and hierarchy. Business: stable sectors with transparent processes — B2B services, contracting, distribution, systems integration. Avoid chaotic markets; choose companies with clear strategy and long-term contracts.',
    lifeStrategyRu: 'Стройте жизнь по плану: долгосрочные цели по 3–5 лет, ежегодная ревизия, приоритет стабильности и предсказуемости. Сохраняйте баланс между контролем и гибкостью — выделяйте 10–15% времени и ресурсов на эксперименты. Окружайте себя людьми с дополняющими навыками: исполнители и те, кто быстрее принимает решения.',
    lifeStrategyEn: 'Build life by plan: 3–5 year goals, annual review, prioritise stability and predictability. Keep balance between control and flexibility — allocate 10–15% of time and resources to experiments. Surround yourself with people who complement you: strong executors and faster decision-makers.',
    traitsToDevelopRu: ['Стратегическое мышление', 'Дисциплина и следование плану', 'Контроль рисков', 'Структурированность', 'Умение делегировать'],
    traitsToDevelopEn: ['Strategic thinking', 'Discipline and following the plan', 'Risk control', 'Structure', 'Delegation'],
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
    wealthModelRu: 'Рост через проекты с высокой отдачей и ограниченным горизонтом. Правило: 60–70% — ядро (индексные фонды, облигации), 30–40% — «зона риска»: венчурные доли, акции роста, собственный или партнёрский бизнес. По каждой рисковой позиции задайте чёткий стоп-лосс (сумма или срок) и фиксируйте решение на бумаге. Раз в полгода пересматривайте «зону риска» и выводите прибыль в ядро. Не увеличивайте долю риска за счёт заёмных средств.',
    wealthModelEn: 'Growth through high-return, time-bound projects. Rule: 60–70% core (index funds, bonds), 30–40% «risk zone» — venture stakes, growth stocks, own or partner business. For each risky position set a clear stop-loss (amount or date) and document the decision. Every six months review the risk zone and move profits into the core. Do not increase risk exposure with borrowed money.',
    careerModelRu: 'Карьера: роли с быстрыми решениями и высокой ответственностью — запуск направлений, кризис-менеджмент, переговоры, сделки M&A. Бизнес: отрасли с быстрой отдачей и возможностью масштабирования — венчурные проекты, digital-продукты, маркетплейсы, франшизы с коротким циклом. Ищите партнёров с операционными компетенциями; фиксируйте стоп-лосс по срокам и бюджету для каждого проекта.',
    careerModelEn: 'Career: roles with fast decisions and high accountability — launching business lines, crisis management, negotiations, M&A. Business: sectors with quick returns and scalability — venture projects, digital products, marketplaces, franchises with short cycles. Find partners with execution skills; set stop-loss on timeline and budget for each project.',
    lifeStrategyRu: 'Делайте ставку на возможности и скорость: быстрые циклы решений, готовность менять курс при новых данных. Заложите «правила игры» — лимиты по времени и деньгам на эксперименты, чтобы риск не съедал всё. Укрепляйте устойчивость: сон, восстановление, круг поддержки. Один раз в год фиксируйте приоритеты и что точно не делаете.',
    lifeStrategyEn: 'Bet on opportunities and speed: short decision cycles, willingness to pivot with new data. Set rules of the game — limits on time and money for experiments so risk doesn’t consume everything. Strengthen resilience: sleep, recovery, support network. Once a year lock in priorities and what you will not do.',
    traitsToDevelopRu: ['Решительность', 'Толерантность к риску', 'Устойчивость', 'Креативность', 'Умение быстро выходить из неудачных проектов'],
    traitsToDevelopEn: ['Decisiveness', 'Risk tolerance', 'Resilience', 'Creativity', 'Ability to exit failing projects quickly'],
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
    wealthModelRu: 'Регулярные накопления и автоматизация — основа модели. Рекомендации: фиксированный ежемесячный платёж на брокерский счёт или накопительный план (дата и сумма в календаре); консервативно-умеренный портфель: 50–60% облигации и фонды денежного рынка, 30–40% дивидендные акции и широкие индексные ETF, до 10% в более доходные, но проверенные инструменты. Раз в квартал — сверка с планом и ребалансировка. Резервный фонд на 6–12 месяцев в высоколиквидных активах. Не меняйте стратегию под краткосрочные новости.',
    wealthModelEn: 'Regular savings and automation are the foundation. Recommendations: set a fixed monthly transfer to a brokerage or savings plan (date and amount in your calendar); conservative-moderate portfolio: 50–60% bonds and money market funds, 30–40% dividend stocks and broad index ETFs, up to 10% in higher-yield but proven instruments. Quarterly check against the plan and rebalancing. Keep 6–12 months of expenses in liquid reserves. Do not change strategy based on short-term news.',
    careerModelRu: 'Карьера: линейные и операционные роли с чёткими процессами — производство, снабжение, качество, проектный офис. Ценятся стабильность и соблюдение регламентов. Бизнес: отрасли с предсказуемым спросом и повторяющимися операциями — сервисное обслуживание, подписки, франшизы с отработанными стандартами, B2B с долгими контрактами. Избегайте направлений с резкими поворотами стратегии.',
    careerModelEn: 'Career: line and operations roles with clear processes — production, procurement, quality, PMO. Stability and compliance with procedures are valued. Business: sectors with predictable demand and repeatable operations — service contracts, subscriptions, franchises with proven standards, B2B with long contracts. Avoid areas that require sharp strategic pivots.',
    lifeStrategyRu: 'Основа — режим и порядок: фиксированные ритуалы (утро, неделя, месяц), чёткие границы работы и отдыха. Раз в квартал пробуйте одно новое дело или навык без ломки системы. Цените долгосрочные отношения и предсказуемое окружение. Резерв времени и денег на «чёрный день» снижает стресс и повышает устойчивость.',
    lifeStrategyEn: 'Foundation is routine and order: fixed rituals (morning, week, month), clear work-life boundaries. Once a quarter try one new thing or skill without breaking the system. Value long-term relationships and predictable environment. A reserve of time and money for a rainy day reduces stress and increases resilience.',
    traitsToDevelopRu: ['Дисциплина', 'Структурированность', 'Оптимизация процессов', 'Надёжность', 'Умение доводить дела до конца'],
    traitsToDevelopEn: ['Discipline', 'Structure', 'Process optimization', 'Reliability', 'Following through to completion'],
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
    wealthModelRu: 'Рост через проекты с сильной идеей и сильной командой. Рекомендуется: 50% стабильное ядро (облигации, индексные фонды), 50% «идея + исполнение» — долевое участие в стартапах или малом бизнесе с операционным партнёром, краудфандинг отобранных проектов, собственный продукт только при наличии человека, отвечающего за операции и сроки. Фиксируйте одну главную инвестиционную «историю» на год, не распыляйтесь. Пропишите критерии выхода и решите, какую долю прибыли переводите в ядро.',
    wealthModelEn: 'Growth through projects with a strong idea and strong execution team. Recommended: 50% stable core (bonds, index funds), 50% «idea + execution» — equity in startups or small business with an operational partner, curated crowdfunding, own product only if someone owns operations and deadlines. Commit to one main investment «story» per year; avoid spreading thin. Define exit criteria and decide what share of profits you move back into the core.',
    careerModelRu: 'Карьера: роли основателя направления, продуктового или стратегического лидера — там, где важно видение и идея. Ищите позиции в инновационных подразделениях, R&D, бренде. Бизнес: креативные и продуктовые ниши — медиа, образование, креативные индустрии, SaaS с сильной идеей. Обязателен операционный партнёр или сильный COO; один фокусный проект на год.',
    careerModelEn: 'Career: founder-type roles, product or strategy leadership — where vision and idea matter. Look for positions in innovation units, R&D, brand. Business: creative and product-led niches — media, education, creative industries, SaaS with a strong concept. An operational partner or strong COO is essential; one focus project per year.',
    lifeStrategyRu: 'Жизненная стратегия — одна большая цель на год и делегирование деталей. Защищайте время на размышление и генерацию идей; рутину передавайте системе или людям. Окружайте себя исполнителями и теми, кто напоминает о дедлайнах. Раз в квартал пересматривайте: что из идей реально ведёт к результату.',
    lifeStrategyEn: 'Life strategy: one big goal per year and delegate the details. Protect time for thinking and idea generation; hand routine to systems or people. Surround yourself with executors and those who remind you of deadlines. Quarterly review: which ideas actually lead to results.',
    traitsToDevelopRu: ['Креативность', 'Лидерство и видение', 'Стратегическое мышление', 'Готовность к обоснованному риску', 'Фокус на одной главной цели'],
    traitsToDevelopEn: ['Creativity', 'Leadership and vision', 'Strategic thinking', 'Readiness for calculated risk', 'Focus on one main goal'],
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
    wealthModelRu: 'Комбинированная модель с явным разделением. Ядро (60%): недвижимость с предсказуемым доходом, облигации, индексные ETF — минимальное ручное управление. Рост (40%): доли в растущих компаниях, проекты с вашим личным вкладом (экспертиза, сеть), но с чётким лимитом времени и денег. Раз в квартал пересматривайте оба блока; прибыль из «роста» частично переводите в ядро. Не допускайте, чтобы активное участие съедало всё время — зафиксируйте верхнюю границу часов в месяц.',
    wealthModelEn: 'Combined model with clear separation. Core (60%): real estate with predictable yield, bonds, index ETFs — minimal hands-on management. Growth (40%): stakes in growing companies, projects with your personal input (expertise, network), but with clear time and money limits. Review both buckets quarterly; move part of growth profits into the core. Do not let active involvement consume all your time — set a cap on hours per month.',
    careerModelRu: 'Карьера: комбинируйте стабильное ядро (крупная компания, понятная роль) с проектами роста — внутренние стартапы, кросс-функциональные инициативы, менторство. Бизнес: стабильная база (например франшиза или дистрибуция) плюс доля в растущем проекте или консалтинг в своей экспертизе. Чётко лимитируйте время на «рост», чтобы не выгореть.',
    careerModelEn: 'Career: combine a stable core (large company, clear role) with growth projects — internal startups, cross-functional initiatives, mentoring. Business: stable base (e.g. franchise or distribution) plus stake in a growth venture or consulting in your expertise. Set clear time limits on «growth» to avoid burnout.',
    lifeStrategyRu: 'Жизненная стратегия — баланс ядра и роста: 60–70% стабильность (постоянная работа, семья, здоровье, сон), 30–40% проекты развития с чёткими лимитами по времени. Разделяйте стратегические и тактические решения; не смешивайте уровни. Раз в квартал пересматривайте приоритеты и снимайте с себя лишнее.',
    lifeStrategyEn: 'Life strategy: balance core and growth — 60–70% stability (steady job, family, health, sleep), 30–40% growth projects with clear time limits. Separate strategic and tactical decisions; don’t mix levels. Every quarter review priorities and drop what’s no longer essential.',
    traitsToDevelopRu: ['Устойчивость', 'Лидерство', 'Решительность', 'Оптимизация и приоритизация', 'Умение восстанавливаться'],
    traitsToDevelopEn: ['Resilience', 'Leadership', 'Decisiveness', 'Optimization and prioritization', 'Recovery capacity'],
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
    wealthModelRu: 'Системный подход с правилами и автоматизацией. Задайте целевые доли по классам активов (например 50/30/20) и ребалансировку по календарю или по отклонению портфеля от цели (порог в %). Используйте технологичные платформы для учёта, аналитики и исполнения. Все решения по смене правил — только на основе данных и по заранее описанным критериям; установите дедлайн для каждой такой проверки (например раз в полгода), чтобы избежать бесконечного анализа. Резерв и страховка рисков заложите в правила с самого начала.',
    wealthModelEn: 'Systematic approach with rules and automation. Set target weights by asset class (e.g. 50/30/20) and rebalance on a schedule or when the portfolio drifts from target by a set %. Use tech platforms for tracking, analytics, and execution. Any change to the rules only based on data and pre-defined criteria; set a deadline for each review (e.g. twice a year) to avoid endless analysis. Build reserves and risk insurance into the rules from the start.',
    careerModelRu: 'Карьера: роли, где решают данные и процессы — аналитика, BI, операционная эффективность, риск-менеджмент, IT-менеджмент. Идеально крупные компании с зрелыми системами отчётности. Бизнес: технологичные и процессные отрасли — финтех, EdTech, автоматизация, аутсорсинг процессов (BPO), системная интеграция. Выстраивайте решения по правилам и метрикам; закладывайте дедлайны на ключевые решения.',
    careerModelEn: 'Career: roles where data and process drive decisions — analytics, BI, operational excellence, risk management, IT management. Ideal in large companies with mature reporting. Business: tech and process-oriented sectors — fintech, EdTech, automation, BPO, systems integration. Build decisions on rules and metrics; set deadlines for key choices.',
    lifeStrategyRu: 'Жизненная стратегия — система и данные: фиксированные правила для повторяющихся решений (здоровье, финансы, отношения), ребалансировка раз в полгода. Устанавливайте дедлайны на важные выборы, чтобы анализ не затягивался. Резерв времени и ресурсов на непредвиденное заложите в правила с самого начала.',
    lifeStrategyEn: 'Life strategy: system and data — fixed rules for recurring decisions (health, money, relationships), rebalance every six months. Set deadlines for major choices so analysis doesn’t drag on. Build a reserve of time and resources for the unexpected into your rules from the start.',
    traitsToDevelopRu: ['Стратегическая глубина', 'Контроль и системность', 'Работа с данными', 'Технологичность', 'Соблюдение дедлайнов решений'],
    traitsToDevelopEn: ['Strategic depth', 'Control and system thinking', 'Data-driven approach', 'Tech adoption', 'Meeting decision deadlines'],
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
