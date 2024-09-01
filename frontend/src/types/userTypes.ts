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
}

export interface CompteType {
  id?: number
  pseudo: string
  profile: ProfileType
  utilisateur?: UtilisateurType
}

export interface ProfileType {
  id?: 1
  libeleFunction: string
}
