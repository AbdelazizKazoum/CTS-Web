export interface AuthType {
  userData: {
    id?: number | string
    nom: string
    prenom: string
    cin?: string
    matricule?: string
    direction?: string
    role: string
    avatar?: string
  }
  token?: string
  accessToken?: string
  refreshToken?: string
}

export type CredentialsType = {
  cin: string
  password: string
}

export type SocialCredentialsType = {
  auth_code: string
}
