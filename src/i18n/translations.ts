import type { Lang } from './lang'

export const welcome: Record<Lang, { title: string; subtitle: string; cta: string }> = {
  ru: {
    title: 'Профиль личности и успеха',
    subtitle: 'Система определяет сильные стороны и стиль принятия решений через символический выбор продуктов. Не является финансовой консультацией.',
    cta: 'Начать профилирование',
  },
  en: {
    title: 'Personality & Success Profile',
    subtitle: 'The system identifies strengths and decision-making style through symbolic product choices. Not financial advice.',
    cta: 'Start profiling',
  },
}

export const nav: Record<Lang, { back: string; next: string; showResults: string }> = {
  ru: { back: 'Назад', next: 'Далее', showResults: 'Показать результат' },
  en: { back: 'Back', next: 'Next', showResults: 'Show results' },
}

export const socksScreen: Record<Lang, { title: string; subtitle: string }> = {
  ru: {
    title: 'Выберите носки',
    subtitle: 'Один или несколько вариантов. Оцениваются креативность, структура и статусная чувствительность.',
  },
  en: {
    title: 'Choose socks',
    subtitle: 'One or more options. Evaluates creativity, structure, and status sensitivity.',
  },
}

export const razorScreen: Record<Lang, { title: string; subtitle: string }> = {
  ru: {
    title: 'Выберите бритву',
    subtitle: 'Оцениваются толерантность к риску, контроль и решительность.',
  },
  en: {
    title: 'Choose razor',
    subtitle: 'Evaluates risk tolerance, control, and decisiveness.',
  },
}

export const sportsScreen: Record<Lang, { title: string; subtitle: string }> = {
  ru: {
    title: 'Выберите виды активности',
    subtitle: 'Сила, стратегия, команда, выносливость, контроль. Можно несколько.',
  },
  en: {
    title: 'Choose activities',
    subtitle: 'Strength, strategy, team, endurance, control. Multiple allowed.',
  },
}

export const resultsScreen: Record<Lang, { strengths: string; blindSpots: string; acceleration: string; wealthModel: string; careerModel: string; topTraits: string; back: string; restart: string; share: string; save: string; premiumCta: string }> = {
  ru: {
    strengths: 'Сильные стороны',
    blindSpots: 'Слепые зоны',
    acceleration: 'Стратегия ускорения',
    wealthModel: 'Рекомендуемая модель накопления',
    careerModel: 'Карьера и направление бизнеса',
    topTraits: 'Топ-3 черты',
    back: 'Назад',
    restart: 'Пройти заново',
    share: 'Поделиться',
    save: 'Сохранить',
    premiumCta: 'Расширенный отчёт',
  },
  en: {
    strengths: 'Strengths',
    blindSpots: 'Blind spots',
    acceleration: 'Acceleration strategy',
    wealthModel: 'Recommended wealth-building model',
    careerModel: 'Career & business direction',
    topTraits: 'Top 3 traits',
    back: 'Back',
    restart: 'Start over',
    share: 'Share',
    save: 'Save',
    premiumCta: 'Extended report',
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
