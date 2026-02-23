import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import type { Lang } from '../i18n/lang'
import { getStoredLang, setStoredLang } from '../i18n/lang'

const LanguageContext = createContext<{
  lang: Lang
  setLang: (lang: Lang) => void
} | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => getStoredLang())

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    setStoredLang(next)
  }, [])

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
