import { createContext, useContext, useReducer, useMemo } from 'react'
import type { TraitScores, Archetype } from '../types'
import { aggregateScores, getPrimaryArchetype, getTopTraits, ARCHETYPES } from '../scoring'

type State = {
  sockIds: string[]
  razorIds: string[]
  sportIds: string[]
  traits: TraitScores | null
  primaryArchetype: Archetype | null
  topTraits: { key: keyof TraitScores; value: number }[]
}

type Action =
  | { type: 'SET_SOCKS'; ids: string[] }
  | { type: 'SET_RAZORS'; ids: string[] }
  | { type: 'SET_SPORTS'; ids: string[] }
  | { type: 'COMPUTE_RESULTS' }
  | { type: 'RESET' }

const initialState: State = {
  sockIds: [],
  razorIds: [],
  sportIds: [],
  traits: null,
  primaryArchetype: null,
  topTraits: [],
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SOCKS':
      return { ...state, sockIds: action.ids }
    case 'SET_RAZORS':
      return { ...state, razorIds: action.ids }
    case 'SET_SPORTS':
      return { ...state, sportIds: action.ids }
    case 'COMPUTE_RESULTS': {
      const traits = aggregateScores(state.sockIds, state.razorIds, state.sportIds)
      const key = getPrimaryArchetype(traits)
      const primaryArchetype = ARCHETYPES[key] ?? null
      const topTraits = getTopTraits(traits, 3)
      return { ...state, traits, primaryArchetype, topTraits }
    }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

const ProfilerContext = createContext<{
  state: State
  setSockIds: (ids: string[]) => void
  setRazorIds: (ids: string[]) => void
  setSportIds: (ids: string[]) => void
  computeResults: () => void
  reset: () => void
} | null>(null)

export function ProfilerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const api = useMemo(
    () => ({
      state,
      setSockIds: (ids: string[]) => dispatch({ type: 'SET_SOCKS', ids }),
      setRazorIds: (ids: string[]) => dispatch({ type: 'SET_RAZORS', ids }),
      setSportIds: (ids: string[]) => dispatch({ type: 'SET_SPORTS', ids }),
      computeResults: () => dispatch({ type: 'COMPUTE_RESULTS' }),
      reset: () => dispatch({ type: 'RESET' }),
    }),
    [state]
  )
  return <ProfilerContext.Provider value={api}>{children}</ProfilerContext.Provider>
}

export function useProfiler() {
  const ctx = useContext(ProfilerContext)
  if (!ctx) throw new Error('useProfiler must be used within ProfilerProvider')
  return ctx
}
