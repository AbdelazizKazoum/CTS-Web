import type { DirectionType } from './directionType'

export interface UtilisateurType {
  id?: number

  nom: string

  prenom: string

  matricule: string
  cin: string

  direction: DirectionType | null
}
