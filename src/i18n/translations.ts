import type { Lang } from './lang'

export const welcome: Record<Lang, { title: string; subtitle: string; cta: string }> = {
  ru: {
    title: 'Ваш профиль успеха',
    subtitle: 'Носки, бритва, спорт — за простым выбором скрывается ваш стиль решений и сильные стороны. Узнайте себя через то, что выбираете.',
    cta: 'Начать',
  },
  en: {
    title: 'Your Success Profile',
    subtitle: 'Socks, razor, sports — behind simple choices lie your decision style and strengths. Discover yourself through what you choose.',
    cta: 'Start',
  },
}

export const nav: Record<Lang, { back: string; next: string; showResults: string }> = {
  ru: { back: 'Назад', next: 'Далее', showResults: 'Показать результат' },
  en: { back: 'Back', next: 'Next', showResults: 'Show results' },
}

export const socksScreen: Record<Lang, { title: string; subtitle: string }> = {
  ru: {
    title: 'Выберите носки',
    subtitle: 'Один или несколько вариантов.',
  },
  en: {
    title: 'Choose socks',
    subtitle: 'One or more options.',
  },
}

export const razorScreen: Record<Lang, { title: string; subtitle: string }> = {
  ru: {
    title: 'Выберите бритву',
    subtitle: 'Один или несколько вариантов.',
  },
  en: {
    title: 'Choose razor',
    subtitle: 'One or more options.',
  },
}

export const sportsScreen: Record<Lang, { title: string; subtitle: string }> = {
  ru: {
    title: 'Выберите виды активности',
    subtitle: 'Один или несколько вариантов.',
  },
  en: {
    title: 'Choose activities',
    subtitle: 'One or more options.',
  },
}

export const resultsScreen: Record<Lang, { strengths: string; blindSpots: string; acceleration: string; wealthModel: string; careerModel: string; lifeStrategy: string; traitsToDevelop: string; topTraits: string; back: string; restart: string; share: string; save: string; premiumCta: string; copied: string; shared: string; comingSoon: string }> = {
  ru: {
    strengths: 'Сильные стороны',
    blindSpots: 'Слепые зоны',
    acceleration: 'Стратегия ускорения',
    wealthModel: 'Рекомендуемая модель накопления',
    careerModel: 'Карьера и направление бизнеса',
    lifeStrategy: 'Общие жизненные стратегии',
    traitsToDevelop: 'Сильные стороны для развития',
    topTraits: 'Топ-3 черты',
    back: 'Назад',
    restart: 'Пройти заново',
    share: 'Поделиться',
    save: 'Сохранить',
    premiumCta: 'Расширенный отчёт',
    copied: 'Скопировано',
    shared: 'Поделено',
    comingSoon: 'Скоро',
  },
  en: {
    strengths: 'Strengths',
    blindSpots: 'Blind spots',
    acceleration: 'Acceleration strategy',
    wealthModel: 'Recommended wealth-building model',
    careerModel: 'Career & business direction',
    lifeStrategy: 'General life strategies',
    traitsToDevelop: 'Strengths to develop',
    topTraits: 'Top 3 traits',
    back: 'Back',
    restart: 'Start over',
    share: 'Share',
    save: 'Save',
    premiumCta: 'Extended report',
    copied: 'Copied',
    shared: 'Shared',
    comingSoon: 'Coming soon',
  },
}

export const traitLabels: Record<Lang, Record<string, string>> = {
  ru: {
    creativity: 'Креативность',
    structure: 'Структура',
    statusSensitivity: 'Статусная чувствительность',
    optimization: 'Оптимизация',
    riskTolerance: 'Толерантность к риску',
    controlOrientation: 'Контроль',
    techAdoption: 'Технологичность',
    decisiveness: 'Решительность',
    leadership: 'Лидерство',
    discipline: 'Дисциплина',
    strategicDepth: 'Стратегическая глубина',
    resilience: 'Устойчивость',
  },
  en: {
    creativity: 'Creativity',
    structure: 'Structure',
    statusSensitivity: 'Status sensitivity',
    optimization: 'Optimization',
    riskTolerance: 'Risk tolerance',
    controlOrientation: 'Control',
    techAdoption: 'Tech adoption',
    decisiveness: 'Decisiveness',
    leadership: 'Leadership',
    discipline: 'Discipline',
    strategicDepth: 'Strategic depth',
    resilience: 'Resilience',
  },
}

export const radarLabels: Record<Lang, Record<string, string>> = {
  ru: { creativity: 'Креативность', structure: 'Структура', riskTolerance: 'Риск', controlOrientation: 'Контроль', leadership: 'Лидерство', strategicDepth: 'Стратегия' },
  en: { creativity: 'Creativity', structure: 'Structure', riskTolerance: 'Risk', controlOrientation: 'Control', leadership: 'Leadership', strategicDepth: 'Strategy' },
}
