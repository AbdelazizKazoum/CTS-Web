export interface AuthType {
  userData: {
    id?: string | number
    nom: string
    prenom: string
    cin: string
    matricule: string
    direction: string
    role: string
  }
  token: string
}
