import { FirebaseApp, initializeApp, FirebaseOptions } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc, getDocs, updateDoc, addDoc, collection, DocumentData, query, orderBy, deleteDoc } from 'firebase/firestore'
import { TodoFormValuesExtended } from '../components/forms/types'
import { TodoId, TodoType } from '../types'

export const initializeAPI = (): FirebaseApp => {
    const firebaseConfig: FirebaseOptions = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
    }

    const firebaseApp = initializeApp(firebaseConfig)

    getAuth(firebaseApp)
    getFirestore(firebaseApp)

    return firebaseApp
}

const dbPathKeys = {
    mainCollectionKey: 'users',
    todoListKey: 'todo-list',
}

export const getTodoList = async (): Promise<{ todos: TodoType[] }> => {
    const db = getFirestore()
    const auth = getAuth()
    const todos = []

    try {
        const todoListSnapshot = await getDocs(
            query(collection(db, dbPathKeys.mainCollectionKey, auth.currentUser.uid, dbPathKeys.todoListKey), orderBy('createdAt', 'desc')),
        )

        todoListSnapshot.forEach((doc) => {
            todos.push({
                ...doc.data(),
                id: doc.id,
            })
        })

        return { todos }
    } catch (error: any) {
        return Promise.reject(error)
    }
}

export const getTodo = async (todoId: TodoId) => {
    const db = getFirestore()
    const auth = getAuth()

    try {
        const todoSnapshot = await getDoc(doc(db, dbPathKeys.mainCollectionKey, auth.currentUser.uid, dbPathKeys.todoListKey, todoId))

        if (todoSnapshot.exists()) {
            return todoSnapshot.data()
        }

        return Promise.reject('Ошибка запроса задачи')
    } catch (error: any) {
        return Promise.reject(error)
    }
}

export const addTodo = async (todo: TodoFormValuesExtended) => {
    const db = getFirestore()
    const auth = getAuth()

    try {
        await addDoc(collection(db, dbPathKeys.mainCollectionKey, auth.currentUser.uid, dbPathKeys.todoListKey), todo as DocumentData)
    } catch (error: any) {
        return Promise.reject(error)
    }
}

export const updateTodo = async (todoId: TodoId, todo: TodoFormValuesExtended) => {
    const db = getFirestore()
    const auth = getAuth()

    try {
        await updateDoc(doc(db, dbPathKeys.mainCollectionKey, auth.currentUser.uid, dbPathKeys.todoListKey, todoId), todo as DocumentData)
    } catch (error: any) {
        return Promise.reject(error)
    }
}

export const removeTodo = async (todoId: TodoId) => {
    const db = getFirestore()
    const auth = getAuth()

    try {
        await deleteDoc(doc(db, dbPathKeys.mainCollectionKey, auth.currentUser.uid, dbPathKeys.todoListKey, todoId))
    } catch (error: any) {
        return Promise.reject(error)
    }
}

export const completeTodo = async (todoId: TodoId) => {
    const db = getFirestore()
    const auth = getAuth()
    try {
        await updateDoc(doc(db, dbPathKeys.mainCollectionKey, auth.currentUser.uid, dbPathKeys.todoListKey, todoId), {
            isCompleted: true,
        } as DocumentData)
    } catch (error: any) {
        return Promise.reject(error)
    }
}

export const restoreTodo = async (todoId: TodoId) => {
    const db = getFirestore()
    const auth = getAuth()
    try {
        await updateDoc(doc(db, dbPathKeys.mainCollectionKey, auth.currentUser.uid, dbPathKeys.todoListKey, todoId), {
            isCompleted: false,
        } as DocumentData)
    } catch (error: any) {
        return Promise.reject(error)
    }
}
