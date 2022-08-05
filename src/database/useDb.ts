import { initializeApp } from 'firebase/app'
import { getFirestore, CollectionReference, collection, DocumentData } from 'firebase/firestore'

// Init the firebase app
export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAJ5yyv7QR7ndfW63S_-bErylP7xRuwDDI',
  authDomain: 'spin-game-cambo.firebaseapp.com',
  projectId: 'spin-game-cambo'
})

export const firestore = getFirestore()


const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>
}


import { User } from './User'

export const usersCol = createCollection<User>('users')