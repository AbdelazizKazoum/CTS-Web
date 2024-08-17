import type { UtilisateurType } from './userTypes'

export interface CourrierType {
  date_arrivee: Date

  pre_reference: string

  date_pre_reference: string

  origine: string

  reference: string

  date_courrier: Date

  objet: string

  classement: string

  date_traitement: Date

  status: string

  utilisateur: UtilisateurType

  modifier_par: UtilisateurType
}
