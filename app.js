(function () {
  'use strict';

  var OPTIONS = {
    socks: [
      { id: 'classic', labelRu: 'Классические', labelEn: 'Classic' },
      { id: 'patterned', labelRu: 'С узором', labelEn: 'Patterned' },
      { id: 'luxury_minimal', labelRu: 'Люкс минимализм', labelEn: 'Luxury minimal' },
      { id: 'athletic', labelRu: 'Спортивные', labelEn: 'Athletic' },
      { id: 'cartoon_fun', labelRu: 'Яркие/прикольные', labelEn: 'Cartoon/fun' },
      { id: 'compression', labelRu: 'Компрессионные', labelEn: 'Compression' },
      { id: 'striped', labelRu: 'Полосатые', labelEn: 'Striped' },
      { id: 'solid_dark', labelRu: 'Тёмные однотонные', labelEn: 'Solid dark' },
      { id: 'wool_plain', labelRu: 'Шерсть простые', labelEn: 'Wool plain' },
      { id: 'novelty', labelRu: 'Необычные', labelEn: 'Novelty' },
      { id: 'dress', labelRu: 'Дрессковые', labelEn: 'Dress' },
      { id: 'no_show', labelRu: 'Носки-невидимки', labelEn: 'No-show' },
    ],
    razor: [
      { id: 'straight', labelRu: 'Бритва опасная', labelEn: 'Straight razor' },
      { id: 'safety', labelRu: 'Безопасная бритва', labelEn: 'Safety razor' },
      { id: 'disposable', labelRu: 'Одноразовая', labelEn: 'Disposable' },
      { id: 'premium_electric', labelRu: 'Премиум электробритва', labelEn: 'Premium electric' },
      { id: 'subscription', labelRu: 'По подписке', labelEn: 'Subscription' },
      { id: 'precision_trimmer', labelRu: 'Триммер точный', labelEn: 'Precision trimmer' },
      { id: 'cartridge', labelRu: 'Картриджная', labelEn: 'Cartridge' },
      { id: 'double_edge', labelRu: 'Двухлезвийная', labelEn: 'Double edge' },
    ],
    sports: [
      { id: 'boxing', labelRu: 'Бокс', labelEn: 'Boxing' },
      { id: 'weightlifting', labelRu: 'Тяжёлая атлетика', labelEn: 'Weightlifting' },
      { id: 'running', labelRu: 'Бег', labelEn: 'Running' },
      { id: 'football', labelRu: 'Футбол', labelEn: 'Football' },
      { id: 'tennis', labelRu: 'Теннис', labelEn: 'Tennis' },
      { id: 'chess', labelRu: 'Шахматы', labelEn: 'Chess' },
      { id: 'crossfit', labelRu: 'Кроссфит', labelEn: 'CrossFit' },
      { id: 'climbing', labelRu: 'Скалолазание', labelEn: 'Climbing' },
      { id: 'swimming', labelRu: 'Плавание', labelEn: 'Swimming' },
      { id: 'yoga', labelRu: 'Йога', labelEn: 'Yoga' },
    ],
  };

  var SOCK_TRAITS = {
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
  };

  var RAZOR_TRAITS = {
    straight: { riskTolerance: 92, controlOrientation: 88, techAdoption: 30, decisiveness: 85 },
    safety: { riskTolerance: 45, controlOrientation: 80, techAdoption: 50, decisiveness: 75 },
    disposable: { riskTolerance: 55, controlOrientation: 40, techAdoption: 45, decisiveness: 90 },
    premium_electric: { riskTolerance: 50, controlOrientation: 70, techAdoption: 95, decisiveness: 80 },
    subscription: { riskTolerance: 40, controlOrientation: 55, techAdoption: 75, decisiveness: 70 },
    precision_trimmer: { riskTolerance: 35, controlOrientation: 95, techAdoption: 70, decisiveness: 75 },
    cartridge: { riskTolerance: 50, controlOrientation: 65, techAdoption: 60, decisiveness: 78 },
    double_edge: { riskTolerance: 55, controlOrientation: 82, techAdoption: 40, decisiveness: 72 },
  };

  var SPORT_TRAITS = {
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
  };

  var I18N = {
    ru: {
      welcomeTitle: 'Ваш профиль успеха',
      welcomeSubtitle: 'Носки, бритва, спорт — за простым выбором скрывается ваш стиль решений и сильные стороны. Узнайте себя через то, что выбираете.',
      welcomeCta: 'Начать',
      socksTitle: 'Выберите носки',
      socksSubtitle: 'Один или несколько вариантов.',
      razorTitle: 'Выберите бритву',
      razorSubtitle: 'Один или несколько вариантов.',
      sportsTitle: 'Выберите виды активности',
      sportsSubtitle: 'Один или несколько вариантов.',
      navBack: 'Назад',
      navNext: 'Далее',
      showResults: 'Показать результат',
      strengths: 'Сильные стороны',
      blindSpots: 'Слепые зоны',
      acceleration: 'Стратегия ускорения',
      wealthModel: 'Рекомендуемая модель накопления',
      careerModel: 'Карьера и направление бизнеса',
      lifeStrategy: 'Общие жизненные стратегии',
      traitsToDevelop: 'Сильные стороны для развития',
      topTraits: 'Топ-3 черты',
      restart: 'Пройти заново',
      share: 'Поделиться',
      save: 'Сохранить',
      premiumCta: 'Расширенный отчёт',
      copied: 'Скопировано',
      shared: 'Поделено',
      comingSoon: 'Скоро',
    },
    en: {
      welcomeTitle: 'Your Success Profile',
      welcomeSubtitle: 'Socks, razor, sports — behind simple choices lie your decision style and strengths. Discover yourself through what you choose.',
      welcomeCta: 'Start',
      socksTitle: 'Choose socks',
      socksSubtitle: 'One or more options.',
      razorTitle: 'Choose razor',
      razorSubtitle: 'One or more options.',
      sportsTitle: 'Choose activities',
      sportsSubtitle: 'One or more options.',
      navBack: 'Back',
      navNext: 'Next',
      showResults: 'Show results',
      strengths: 'Strengths',
      blindSpots: 'Blind spots',
      acceleration: 'Acceleration strategy',
      wealthModel: 'Recommended wealth-building model',
      careerModel: 'Career & business direction',
      lifeStrategy: 'General life strategies',
      traitsToDevelop: 'Strengths to develop',
      topTraits: 'Top 3 traits',
      restart: 'Start over',
      share: 'Share',
      save: 'Save',
      premiumCta: 'Extended report',
      copied: 'Copied',
      shared: 'Shared',
      comingSoon: 'Coming soon',
    },
  };

  var RADAR_KEYS = ['creativity', 'structure', 'riskTolerance', 'controlOrientation', 'leadership', 'strategicDepth'];
  var RADAR_LABELS = { ru: { creativity: 'Креативность', structure: 'Структура', riskTolerance: 'Риск', controlOrientation: 'Контроль', leadership: 'Лидерство', strategicDepth: 'Стратегия' }, en: { creativity: 'Creativity', structure: 'Structure', riskTolerance: 'Risk', controlOrientation: 'Control', leadership: 'Leadership', strategicDepth: 'Strategy' } };
  var TRAIT_LABELS = { ru: { creativity: 'Креативность', structure: 'Структура', statusSensitivity: 'Статусная чувствительность', optimization: 'Оптимизация', riskTolerance: 'Толерантность к риску', controlOrientation: 'Контроль', techAdoption: 'Технологичность', decisiveness: 'Решительность', leadership: 'Лидерство', discipline: 'Дисциплина', strategicDepth: 'Стратегическая глубина', resilience: 'Устойчивость' }, en: { creativity: 'Creativity', structure: 'Structure', statusSensitivity: 'Status sensitivity', optimization: 'Optimization', riskTolerance: 'Risk tolerance', controlOrientation: 'Control', techAdoption: 'Tech adoption', decisiveness: 'Decisiveness', leadership: 'Leadership', discipline: 'Discipline', strategicDepth: 'Strategic depth', resilience: 'Resilience' } };

  var state = {
    lang: (function () { try { return localStorage.getItem('profiler_lang') === 'en' ? 'en' : 'ru'; } catch (e) { return 'ru'; } })(),
    sockIds: [],
    razorIds: [],
    sportIds: [],
  };

  function clamp(v) { return Math.max(0, Math.min(100, Math.round(v))); }
  function avg(arr) { return arr.length === 0 ? 0 : arr.reduce(function (a, b) { return a + b; }, 0) / arr.length; }

  var SOCK_W = 0.3, RAZOR_W = 0.3, SPORT_W = 0.4;
  function mix(sock, razor, sport, key) {
    return SOCK_W * (sock[key] != null ? sock[key] : 50) + RAZOR_W * (razor[key] != null ? razor[key] : 50) + SPORT_W * (sport[key] != null ? sport[key] : 50);
  }

  function computeSockScores(ids) {
    var out = {};
    ['creativity', 'structure', 'statusSensitivity', 'optimization'].forEach(function (k) {
      var vals = ids.map(function (id) { return SOCK_TRAITS[id] && SOCK_TRAITS[id][k] != null ? SOCK_TRAITS[id][k] : 50; });
      out[k] = clamp(avg(vals));
    });
    return out;
  }

  function computeRazorScores(ids) {
    var out = {};
    ['riskTolerance', 'controlOrientation', 'techAdoption', 'decisiveness'].forEach(function (k) {
      var vals = ids.map(function (id) { return RAZOR_TRAITS[id] && RAZOR_TRAITS[id][k] != null ? RAZOR_TRAITS[id][k] : 50; });
      out[k] = clamp(avg(vals));
    });
    return out;
  }

  function computeSportsScores(ids) {
    var out = {};
    ['leadership', 'discipline', 'strategicDepth', 'resilience'].forEach(function (k) {
      var vals = ids.map(function (id) { return SPORT_TRAITS[id] && SPORT_TRAITS[id][k] != null ? SPORT_TRAITS[id][k] : 50; });
      out[k] = clamp(avg(vals));
    });
    var types = ids.map(function (id) { return SPORT_TRAITS[id] && SPORT_TRAITS[id].competitive; }).filter(Boolean);
    if (types.length) {
      var team = types.filter(function (t) { return t === 'team'; }).length;
      var ind = types.filter(function (t) { return t === 'individual'; }).length;
      var hyb = types.filter(function (t) { return t === 'hybrid'; }).length;
      out.competitiveType = team >= ind && team >= hyb ? 'team' : (hyb >= ind && hyb >= team ? 'hybrid' : 'individual');
    }
    return out;
  }

  var DEFAULT_TRAITS = { creativity: 50, structure: 50, statusSensitivity: 50, optimization: 50, riskTolerance: 50, controlOrientation: 50, techAdoption: 50, decisiveness: 50, leadership: 50, discipline: 50, strategicDepth: 50, resilience: 50, competitiveType: 'hybrid' };

  function aggregateScores(sockIds, razorIds, sportIds) {
    var sock = computeSockScores(sockIds);
    var razor = computeRazorScores(razorIds);
    var sport = computeSportsScores(sportIds);
    var t = {};
    for (var k in DEFAULT_TRAITS) t[k] = DEFAULT_TRAITS[k];
    ['creativity', 'structure', 'statusSensitivity', 'optimization'].forEach(function (k) { t[k] = clamp(mix(sock, razor, sport, k)); });
    ['riskTolerance', 'controlOrientation', 'techAdoption', 'decisiveness'].forEach(function (k) { t[k] = clamp(mix(sock, razor, sport, k)); });
    ['leadership', 'discipline', 'strategicDepth', 'resilience'].forEach(function (k) { t[k] = clamp(mix(sock, razor, sport, k)); });
    if (sport.competitiveType) t.competitiveType = sport.competitiveType;
    return t;
  }

  function archetypeScores(t) {
    return {
      strategic_builder: avg([t.strategicDepth, t.structure, t.discipline, t.controlOrientation]),
      bold_opportunist: avg([t.riskTolerance, t.decisiveness, t.creativity, t.resilience]),
      disciplined_executor: avg([t.discipline, t.structure, t.optimization, t.controlOrientation]),
      creative_visionary: avg([t.creativity, t.leadership, t.riskTolerance, t.strategicDepth]),
      adaptive_competitor: avg([t.resilience, t.leadership, t.decisiveness, t.optimization]),
      analytical_architect: avg([t.strategicDepth, t.controlOrientation, t.structure, t.techAdoption]),
    };
  }

  function getPrimaryArchetype(t) {
    var scores = archetypeScores(t);
    var best = 'strategic_builder';
    var max = 0;
    Object.keys(scores).forEach(function (k) {
      if (scores[k] > max) { max = scores[k]; best = k; }
    });
    return best;
  }

  function getTopTraits(t, n) {
    n = n || 3;
    var entries = Object.keys(t).filter(function (k) { return k !== 'competitiveType' && typeof t[k] === 'number'; }).map(function (k) { return [k, t[k]]; });
    entries.sort(function (a, b) { return b[1] - a[1]; });
    return entries.slice(0, n).map(function (x) { return { key: x[0], value: x[1] }; });
  }

  // ARCHETYPES — данные архетипов (сокращённые строки для размера; при необходимости подставьте полные из scoring.ts)
  var ARCHETYPES = window.ARCHETYPES || {};
  if (Object.keys(ARCHETYPES).length === 0) {
    ARCHETYPES = {
      strategic_builder: { titleRu: 'Стратегический строитель', titleEn: 'Strategic Builder', descriptionRu: 'Вы выстраиваете успех системно: чёткие цели, контроль исполнения, долгосрочное планирование.', descriptionEn: 'You build success systematically: clear goals, execution control, long-term planning.', strengthsRu: ['Структурированность', 'Стратегическое мышление', 'Дисциплина', 'Контроль рисков'], strengthsEn: ['Structure', 'Strategic thinking', 'Discipline', 'Risk control'], blindSpotsRu: ['Излишняя осторожность', 'Медленные решения при неопределённости'], blindSpotsEn: ['Excessive caution', 'Slow decisions under uncertainty'], accelerationRu: 'Добавьте быстрые эксперименты с малым бюджетом — тестируйте гипотезы без перегрузки плана.', accelerationEn: 'Add quick low-budget experiments — test hypotheses without overloading the plan.', wealthModelRu: 'Диверсифицированный портфель с постепенным наращиванием капитала. Ребалансировка раз в год. Держите резерв 6–12 месяцев в ликвидности.', wealthModelEn: 'Diversified portfolio with gradual capital growth. Rebalance annually. Keep 6–12 months in liquid reserves.', careerModelRu: 'Карьера: рост в роли управленца в структурированных отраслях. Бизнес: B2B-услуги, подряд, дистрибуция.', careerModelEn: 'Career: grow as manager in structured industries. Business: B2B services, contracting, distribution.', lifeStrategyRu: 'Стройте жизнь по плану: долгосрочные цели, ежегодная ревизия. Выделяйте 10–15% на эксперименты.', lifeStrategyEn: 'Build life by plan: long-term goals, annual review. Allocate 10–15% to experiments.', traitsToDevelopRu: ['Стратегическое мышление', 'Дисциплина', 'Контроль рисков', 'Структурированность', 'Делегирование'], traitsToDevelopEn: ['Strategic thinking', 'Discipline', 'Risk control', 'Structure', 'Delegation'] },
      bold_opportunist: { titleRu: 'Смелый оппортунист', titleEn: 'Bold Opportunist', descriptionRu: 'Вы готовы к риску и быстрым решениям. Успех приходит через возможности и скорость.', descriptionEn: 'You embrace risk and fast decisions. Success comes through opportunities and speed.', strengthsRu: ['Толерантность к риску', 'Решительность', 'Креативность', 'Устойчивость'], strengthsEn: ['Risk tolerance', 'Decisiveness', 'Creativity', 'Resilience'], blindSpotsRu: ['Импульсивность', 'Недооценка системности'], blindSpotsEn: ['Impulsivity', 'Underestimating structure'], accelerationRu: 'Правило «10% на эксперименты» при сохранении ядра.', accelerationEn: '"10% for experiments" rule while keeping the core.', wealthModelRu: '60–70% ядро, 30–40% зона риска. Стоп-лосс по каждой позиции.', wealthModelEn: '60–70% core, 30–40% risk zone. Stop-loss per position.', careerModelRu: 'Роли с быстрыми решениями: запуск направлений, кризис-менеджмент, M&A.', careerModelEn: 'Roles with fast decisions: launching lines, crisis management, M&A.', lifeStrategyRu: 'Быстрые циклы решений. Лимиты на эксперименты. Укрепляйте устойчивость.', lifeStrategyEn: 'Short decision cycles. Limits on experiments. Strengthen resilience.', traitsToDevelopRu: ['Решительность', 'Толерантность к риску', 'Устойчивость', 'Креативность', 'Выход из неудачных проектов'], traitsToDevelopEn: ['Decisiveness', 'Risk tolerance', 'Resilience', 'Creativity', 'Exiting failing projects'] },
      disciplined_executor: { titleRu: 'Дисциплинированный исполнитель', titleEn: 'Disciplined Executor', descriptionRu: 'Надёжность и порядок — ваши сильные стороны. Вы доводите дела до результата.', descriptionEn: 'Reliability and order are your strengths. You get things done.', strengthsRu: ['Дисциплина', 'Структура', 'Оптимизация процессов', 'Контроль'], strengthsEn: ['Discipline', 'Structure', 'Process optimization', 'Control'], blindSpotsRu: ['Нежелание менять схемы', 'Риск упустить возможности'], blindSpotsEn: ['Reluctance to change schemes', 'Risk of missing opportunities'], accelerationRu: 'Раз в квартал пробуйте один новый инструмент без ломки системы.', accelerationEn: 'Try one new tool per quarter without breaking the system.', wealthModelRu: 'Регулярные накопления, автоматизация. Консервативно-умеренный портфель.', wealthModelEn: 'Regular savings, automation. Conservative-moderate portfolio.', careerModelRu: 'Линейные и операционные роли: производство, снабжение, качество, PMO.', careerModelEn: 'Line and operations roles: production, procurement, quality, PMO.', lifeStrategyRu: 'Режим и порядок. Резерв на чёрный день.', lifeStrategyEn: 'Routine and order. Rainy day reserve.', traitsToDevelopRu: ['Дисциплина', 'Структурированность', 'Оптимизация', 'Надёжность', 'Доводить до конца'], traitsToDevelopEn: ['Discipline', 'Structure', 'Optimization', 'Reliability', 'Follow through'] },
      creative_visionary: { titleRu: 'Креативный визионер', titleEn: 'Creative Visionary', descriptionRu: 'Вы видите идеи и образы будущего. Лидерство и нестандартные решения — ваша зона силы.', descriptionEn: 'You see ideas and images of the future. Leadership and unconventional solutions are your strength.', strengthsRu: ['Креативность', 'Лидерство', 'Стратегическое видение', 'Готовность к риску'], strengthsEn: ['Creativity', 'Leadership', 'Strategic vision', 'Risk readiness'], blindSpotsRu: ['Рассеянность на множество идей', 'Сложности с рутиной'], blindSpotsEn: ['Scattered across many ideas', 'Difficulty with routine'], accelerationRu: 'Одна главная цель на квартал, делегируйте детали.', accelerationEn: 'One main goal per quarter, delegate details.', wealthModelRu: '50% ядро, 50% идея + исполнение. Один фокусный проект на год.', wealthModelEn: '50% core, 50% idea + execution. One focus project per year.', careerModelRu: 'Роли основателя/продуктового лидера. R&D, бренд.', careerModelEn: 'Founder/product leader roles. R&D, brand.', lifeStrategyRu: 'Одна большая цель на год. Защищайте время на идеи.', lifeStrategyEn: 'One big goal per year. Protect time for ideas.', traitsToDevelopRu: ['Креативность', 'Лидерство и видение', 'Стратегическое мышление', 'Обоснованный риск', 'Фокус'], traitsToDevelopEn: ['Creativity', 'Leadership and vision', 'Strategic thinking', 'Calculated risk', 'Focus'] },
      adaptive_competitor: { titleRu: 'Адаптивный конкурент', titleEn: 'Adaptive Competitor', descriptionRu: 'Вы совмещаете лидерство, устойчивость и быструю реакцию.', descriptionEn: 'You combine leadership, resilience, and quick reaction.', strengthsRu: ['Устойчивость', 'Лидерство', 'Решительность', 'Оптимизация'], strengthsEn: ['Resilience', 'Leadership', 'Decisiveness', 'Optimization'], blindSpotsRu: ['Риск выгорания', 'Нужна приоритизация'], blindSpotsEn: ['Burnout risk', 'Need prioritization'], accelerationRu: 'Разделяйте стратегические и тактические решения.', accelerationEn: 'Separate strategic and tactical decisions.', wealthModelRu: '60% ядро, 40% рост с лимитами по времени и деньгам.', wealthModelEn: '60% core, 40% growth with time and money limits.', careerModelRu: 'Стабильное ядро + проекты роста. Менторство.', careerModelEn: 'Stable core + growth projects. Mentoring.', lifeStrategyRu: '60–70% стабильность, 30–40% развитие с лимитами.', lifeStrategyEn: '60–70% stability, 30–40% growth with limits.', traitsToDevelopRu: ['Устойчивость', 'Лидерство', 'Решительность', 'Приоритизация', 'Восстановление'], traitsToDevelopEn: ['Resilience', 'Leadership', 'Decisiveness', 'Prioritization', 'Recovery'] },
      analytical_architect: { titleRu: 'Аналитический архитектор', titleEn: 'Analytical Architect', descriptionRu: 'Вы опираетесь на данные, структуру и технологии.', descriptionEn: 'You rely on data, structure, and technology.', strengthsRu: ['Стратегическая глубина', 'Контроль', 'Структура', 'Технологичность'], strengthsEn: ['Strategic depth', 'Control', 'Structure', 'Tech adoption'], blindSpotsRu: ['Паралич анализа', 'Медленная реакция'], blindSpotsEn: ['Analysis paralysis', 'Slow reaction'], accelerationRu: 'Дедлайны на ключевые решения. «Достаточно хорошие» данные.', accelerationEn: 'Deadlines for key decisions. "Good enough" data.', wealthModelRu: 'Системный подход: правила, ребалансировка, техплатформы.', wealthModelEn: 'Systematic approach: rules, rebalancing, tech platforms.', careerModelRu: 'Роли в аналитике, BI, операционной эффективности, риск, IT.', careerModelEn: 'Roles in analytics, BI, operational excellence, risk, IT.', lifeStrategyRu: 'Правила для решений. Дедлайны на выборы. Резерв в правилах.', lifeStrategyEn: 'Rules for decisions. Deadlines for choices. Reserve in rules.', traitsToDevelopRu: ['Стратегическая глубина', 'Контроль и система', 'Данные', 'Технологичность', 'Дедлайны решений'], traitsToDevelopEn: ['Strategic depth', 'Control and system', 'Data', 'Tech adoption', 'Decision deadlines'] },
    };
  }

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(function (el) { el.classList.remove('active'); });
    var el = document.getElementById(id);
    if (el) el.classList.add('active');
    var step = { 'screen-welcome': 0, 'screen-socks': 1, 'screen-razor': 2, 'screen-sports': 3, 'screen-results': 4 }[id];
    if (step != null) {
      document.querySelectorAll('.progress__dot').forEach(function (dot, i) {
        dot.classList.toggle('progress__dot--active', i <= step && step < 4);
      });
    }
  }

  function setLang(lang) {
    state.lang = lang;
    try { localStorage.setItem('profiler_lang', lang); } catch (e) {}
    document.querySelectorAll('.lang-switch__btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('lang-switch__btn--active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (I18N[lang] && I18N[lang][key] != null) el.textContent = I18N[lang][key];
    });
    document.querySelectorAll('#options-socks li, #options-razor li, #options-sports li').forEach(function (li) {
      var id = li.getAttribute('data-id');
      var listId = li.closest('ul').id;
      var category = listId.replace('options-', '');
      var opts = OPTIONS[category];
      var opt = opts && opts.find(function (o) { return o.id === id; });
      var span = li.querySelector('.option-row__text');
      if (opt && span) span.textContent = state.lang === 'en' ? opt.labelEn : opt.labelRu;
    });
  }

  function renderOptions(category) {
    var listId = 'options-' + category;
    var ul = document.getElementById(listId);
    if (!ul) return;
    var opts = OPTIONS[category];
    var selected = state[category === 'socks' ? 'sockIds' : category === 'razor' ? 'razorIds' : 'sportIds'];
    ul.innerHTML = '';
    opts.forEach(function (opt) {
      var li = document.createElement('li');
      li.className = 'options-list__item';
      li.setAttribute('data-id', opt.id);
      var label = document.createElement('label');
      label.className = 'option-row';
      var input = document.createElement('input');
      input.type = 'checkbox';
      input.className = 'option-row__input';
      input.checked = selected.indexOf(opt.id) !== -1;
      input.setAttribute('aria-label', state.lang === 'en' ? opt.labelEn : opt.labelRu);
      var span = document.createElement('span');
      span.className = 'option-row__text';
      span.textContent = state.lang === 'en' ? opt.labelEn : opt.labelRu;
      label.appendChild(input);
      label.appendChild(span);
      li.appendChild(label);
      label.addEventListener('click', function (e) {
        e.preventDefault();
        var id = opt.id;
        var arr = state[category === 'socks' ? 'sockIds' : category === 'razor' ? 'razorIds' : 'sportIds'];
        var i = arr.indexOf(id);
        if (i === -1) arr.push(id);
        else arr.splice(i, 1);
        input.checked = arr.indexOf(id) !== -1;
        updateNextButtons();
      });
      ul.appendChild(li);
    });
  }

  function updateNextButtons() {
    var nextSocks = document.querySelector('#screen-socks .btn--primary[data-next]');
    var nextRazor = document.querySelector('#screen-razor .btn--primary[data-next]');
    var nextSports = document.querySelector('#screen-sports .btn--primary[data-next]');
    if (nextSocks) nextSocks.disabled = state.sockIds.length === 0;
    if (nextRazor) nextRazor.disabled = state.razorIds.length === 0;
    if (nextSports) nextSports.disabled = state.sportIds.length === 0;
  }

  function showFooterMsg(text) {
    var el = document.getElementById('footer-msg');
    if (el) { el.textContent = text; el.style.display = ''; }
    clearTimeout(showFooterMsg._t);
    showFooterMsg._t = setTimeout(function () { if (el) el.style.display = 'none'; }, 2000);
  }

  function renderResults() {
    var t = aggregateScores(state.sockIds, state.razorIds, state.sportIds);
    var key = getPrimaryArchetype(t);
    var arch = ARCHETYPES[key];
    if (!arch) return;
    var lang = state.lang;
    var title = lang === 'en' ? arch.titleEn : arch.titleRu;
    var desc = lang === 'en' ? arch.descriptionEn : arch.descriptionRu;
    var strengths = lang === 'en' ? arch.strengthsEn : arch.strengthsRu;
    var blindSpots = lang === 'en' ? arch.blindSpotsEn : arch.blindSpotsRu;
    var acc = lang === 'en' ? arch.accelerationEn : arch.accelerationRu;
    var wealth = lang === 'en' ? arch.wealthModelEn : arch.wealthModelRu;
    var career = lang === 'en' ? arch.careerModelEn : arch.careerModelRu;
    var life = lang === 'en' ? arch.lifeStrategyEn : arch.lifeStrategyRu;
    var traitsDev = lang === 'en' ? arch.traitsToDevelopEn : arch.traitsToDevelopRu;

    document.getElementById('result-title').textContent = title;
    document.getElementById('result-description').textContent = desc;
    var strengthsEl = document.getElementById('result-strengths');
    strengthsEl.innerHTML = '';
    strengths.forEach(function (s) { var li = document.createElement('li'); li.textContent = s; strengthsEl.appendChild(li); });
    var blindEl = document.getElementById('result-blindspots');
    blindEl.innerHTML = '';
    blindSpots.forEach(function (s) { var li = document.createElement('li'); li.textContent = s; blindEl.appendChild(li); });
    document.getElementById('result-acceleration').textContent = acc;
    document.getElementById('result-wealth').textContent = wealth;
    document.getElementById('result-career').textContent = career;
    document.getElementById('result-life').textContent = life;
    var traitsDevEl = document.getElementById('result-traits-develop');
    traitsDevEl.innerHTML = '';
    traitsDev.forEach(function (s) { var li = document.createElement('li'); li.textContent = s; traitsDevEl.appendChild(li); });

    var topTraits = getTopTraits(t, 3);
    var labels = TRAIT_LABELS[lang] || {};
    var topEl = document.getElementById('result-top-traits');
    topEl.innerHTML = '<span class="results__top-label">' + (I18N[lang].topTraits || 'Топ-3 черты') + ': </span>';
    topTraits.forEach(function (x) {
      var tag = document.createElement('span');
      tag.className = 'results__trait-tag';
      tag.textContent = (labels[x.key] || x.key) + ': ' + x.value;
      topEl.appendChild(tag);
    });

    var radarEl = document.getElementById('result-radar');
    var size = 280;
    var center = size / 2;
    var radius = center - 24;
    var n = RADAR_KEYS.length;
    var points = RADAR_KEYS.map(function (k, i) {
      var v = t[k] != null ? t[k] : 50;
      var r = radius * (v / 100);
      var angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
    });
    var pathD = points.map(function (p, i) { return (i === 0 ? 'M' : 'L') + ' ' + p.x + ' ' + p.y; }).join(' ') + ' Z';
    var labelR = radius + 20;
    var radarLabels = RADAR_LABELS[lang] || {};
    var svg = '<svg viewBox="0 0 ' + size + ' ' + size + '" class="radar__svg" aria-hidden="true">';
    for (var level = 1; level <= 4; level++) {
      var r = radius * (level / 4);
      var pts = RADAR_KEYS.map(function (_, i) {
        var angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        return (center + r * Math.cos(angle)) + ',' + (center + r * Math.sin(angle));
      });
      svg += '<path d="M ' + pts.join(' L ') + ' Z" fill="none" stroke="var(--border)" stroke-width="0.5"/>';
    }
    RADAR_KEYS.forEach(function (_, i) {
      var angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      var x = center + radius * Math.cos(angle);
      var y = center + radius * Math.sin(angle);
      svg += '<line x1="' + center + '" y1="' + center + '" x2="' + x + '" y2="' + y + '" stroke="var(--border)" stroke-width="0.5"/>';
    });
    svg += '<path d="' + pathD + '" fill="var(--apple-blue)" fill-opacity="0.2" stroke="var(--apple-blue)" stroke-width="1.5"/>';
    RADAR_KEYS.forEach(function (k, i) {
      var angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      var x = center + labelR * Math.cos(angle);
      var y = center + labelR * Math.sin(angle);
      svg += '<text x="' + x + '" y="' + y + '" text-anchor="middle" dominant-baseline="middle" class="radar__label">' + (radarLabels[k] || k) + '</text>';
    });
    svg += '</svg>';
    radarEl.innerHTML = svg;
  }

  function init() {
    renderOptions('socks');
    renderOptions('razor');
    renderOptions('sports');
    setLang(state.lang);

    document.querySelectorAll('[data-next]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-next');
        if (id === 'screen-results') renderResults();
        showScreen(id);
      });
    });
    document.querySelectorAll('[data-prev]').forEach(function (btn) {
      btn.addEventListener('click', function () { showScreen(btn.getAttribute('data-prev')); });
    });
    document.querySelectorAll('[data-restart]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.sockIds = [];
        state.razorIds = [];
        state.sportIds = [];
        renderOptions('socks');
        renderOptions('razor');
        renderOptions('sports');
        updateNextButtons();
        showScreen('screen-welcome');
      });
    });
    document.querySelectorAll('.lang-switch__btn').forEach(function (btn) {
      btn.addEventListener('click', function () { setLang(btn.getAttribute('data-lang')); });
    });

    document.getElementById('btn-share').addEventListener('click', function () {
      var arch = ARCHETYPES[getPrimaryArchetype(aggregateScores(state.sockIds, state.razorIds, state.sportIds))];
      var title = state.lang === 'en' ? 'My Success Profile' : 'Мой профиль успеха';
      var text = (arch ? (state.lang === 'en' ? arch.titleEn : arch.titleRu) : '') + '\n' + (arch ? (state.lang === 'en' ? arch.descriptionEn : arch.descriptionRu) : '');
      var url = location.href;
      if (navigator.share) {
        navigator.share({ title: title, text: text, url: url }).then(function () { showFooterMsg(I18N[state.lang].shared); }).catch(function () {
          navigator.clipboard.writeText(url).then(function () { showFooterMsg(I18N[state.lang].copied); });
        });
      } else {
        navigator.clipboard.writeText(url).then(function () { showFooterMsg(I18N[state.lang].copied); });
      }
    });
    document.getElementById('btn-save').addEventListener('click', function () {
      var t = aggregateScores(state.sockIds, state.razorIds, state.sportIds);
      var key = getPrimaryArchetype(t);
      var arch = ARCHETYPES[key];
      var lang = state.lang;
      var lines = [(arch ? (lang === 'en' ? arch.titleEn : arch.titleRu) : ''), (arch ? (lang === 'en' ? arch.descriptionEn : arch.descriptionRu) : ''), '', I18N[lang].strengths].concat(arch ? (lang === 'en' ? arch.strengthsEn : arch.strengthsRu) : []).concat(['', I18N[lang].wealthModel, arch ? (lang === 'en' ? arch.wealthModelEn : arch.wealthModelRu) : '', '', location.href]);
      navigator.clipboard.writeText(lines.join('\n')).then(function () { showFooterMsg(I18N[state.lang].copied); });
    });
    document.getElementById('btn-premium').addEventListener('click', function () { showFooterMsg(I18N[state.lang].comingSoon); });

    updateNextButtons();
    showScreen('screen-welcome');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
