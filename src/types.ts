export type SockId = string
export type RazorId = string
export type SportId = string

export interface TraitScores {
  creativity: number
  structure: number
  statusSensitivity: number
  optimization: number
  riskTolerance: number
  controlOrientation: number
  techAdoption: number
  decisiveness: number
  leadership: number
  discipline: number
  strategicDepth: number
  resilience: number
  competitiveType: 'individual' | 'team' | 'hybrid'
}

export type ArchetypeKey =
  | 'strategic_builder'
  | 'bold_opportunist'
  | 'disciplined_executor'
  | 'creative_visionary'
  | 'adaptive_competitor'
  | 'analytical_architect'

export interface Archetype {
  key: ArchetypeKey
  titleRu: string
  titleEn: string
  descriptionRu: string
  descriptionEn: string
  strengthsRu: string[]
  strengthsEn: string[]
  blindSpotsRu: string[]
  blindSpotsEn: string[]
  accelerationRu: string
  accelerationEn: string
  wealthModelRu: string
  wealthModelEn: string
  careerModelRu: string
  careerModelEn: string
  lifeStrategyRu: string
  lifeStrategyEn: string
  traitsToDevelopRu: string[]
  traitsToDevelopEn: string[]
}
