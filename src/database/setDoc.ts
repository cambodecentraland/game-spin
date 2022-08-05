import { doc, setDoc } from '@firebase/firestore'
import { usersCol } from './useDb'

export const setJamiesUser = async () => {
  const userRef = doc(usersCol, 'user')
  await setDoc(userRef, {
    score: 30,
    userId: 'Jamie',
    name: 'Curnow'
  })
}