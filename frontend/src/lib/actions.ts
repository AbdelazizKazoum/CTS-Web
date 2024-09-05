import { AuthError } from 'next-auth'

import { signIn } from '../auth'

// ...

export async function authenticate(formData: FormData) {
  try {
    const res = await signIn('credentials', formData)

    return res
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }

    throw error
  }
}
