/* eslint-disable padding-line-between-statements */
'use client'
import { useEffect } from 'react'

import UserList from '@/components/users/userList'

import type { UtilisateurType } from '@/types/userTypes'

import { UseUtilisateurStore } from '@/store/utilisateur.store'

const users = [
  {
    id: 1,

    nom: 'maaroufi',

    prenom: 'mouad',

    matricule: '66003/c',

    compte: 1,

    direction: 1
  },
  {
    id: 2,

    nom: 'kazoum',

    prenom: 'abdelaziz',

    matricule: '66006/c',

    compte: 2,

    direction: 2
  }
] as UtilisateurType[]

export default function Page() {
  return (
    <div>
      <UserList data={users} />
    </div>
  )
}
