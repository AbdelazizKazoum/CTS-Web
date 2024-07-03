


import UserList from '@/components/users/userList'

import { UtilisateurType } from '@/types/userTypes'

const users = [
  {
    id: 1,

    nom: "maaroufi",

    prenom: "mouad",

    matricule: "66003/c",

    compte: 1,

    direction: 1,
  },
  {
    id: 2,

    nom: "kazoum",

    prenom: "abdelaziz",

    matricule: "66006/c",

    compte: 2,

    direction: 2,
  }

] as UtilisateurType[]

export default function page(){

    return (<div>
        <UserList data={users} />
    </div>)

}

