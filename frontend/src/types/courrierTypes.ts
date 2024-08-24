import type { UtilisateurType } from './userTypes'

export interface CourrierType {
  date_arrivee: Date

  pre_reference: string

  date_pre_reference: Date

  origine: string

  reference: string

  date_courrier: Date

  objet: string

  classement: string

  date_traitement: Date

  status: string

  type: string

  destinataire?: string

  utilisateur: UtilisateurType

  modifier_par?: UtilisateurType

  desciption?: string
}
