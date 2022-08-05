import { doc, updateDoc } from '@firebase/firestore'
import { usersCol } from './useDb'

export const updateBook = async () => {
  const userDocRef = doc(usersCol, 'user')
  await updateDoc(userDocRef, {
    score : 100
  })
}