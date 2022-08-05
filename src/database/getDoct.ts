import { doc, getDoc } from '@firebase/firestore'
import { usersCol } from './useDb'

export const getUser = async () => {
  const userDocRef = doc(usersCol, 'user')
  const userDoc = await getDoc(userDocRef)
  const userData = userDoc.data()
  if (userData) console.log(userData.userId)
}