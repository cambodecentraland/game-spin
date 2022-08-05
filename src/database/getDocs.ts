import { getDocs } from '@firebase/firestore'
import { usersCol } from './useDb'

export const logBookTitles = async () => {
  const userDocs = await getDocs(usersCol)
  userDocs.docs.forEach((userDocs) => {
    const user = userDocs.data()
    console.log(user.userId)
  })
}