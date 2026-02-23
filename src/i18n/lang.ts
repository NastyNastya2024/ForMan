export type Lang = 'ru' | 'en'

const STORAGE_KEY = 'profiler_lang'

export function getStoredLang(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'en' || v === 'ru') return v
  } catch {}
  return 'ru'
}

export function setStoredLang(lang: Lang): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {}
}
