import type { DirectionType } from './directionType'

export interface UtilisateurType {
  id?: number

  nom: string

  prenom: string

  matricule: string
  cin: string

  direction: DirectionType | null

  compte?: CompteType | null

  file: File

  countCourriers?: number
  countCodifiedCourriers?: number
}

export interface CompteType {
  id?: number
  pseudo: string
  pass?: string
  profile: ProfileType | null
  utilisateur?: UtilisateurType
}

export interface ProfileType {
  id?: 1
  libeleFunction: string
}
