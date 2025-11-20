import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider(auth)
const firestore = getFirestore(app)


const firebaseContext = createContext(null)

export const useFirebase = () => useContext(firebaseContext)

export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        });
    }, [])

    const signup = async (email, password) => await createUserWithEmailAndPassword(auth, email, password).then(user => alert("Successfully created", user))

    const login = async (email, password) => await signInWithEmailAndPassword(auth, email, password).then(user => alert("Successfully logged in", user))

    const signinWithGoogle = async () => await signInWithPopup(auth, provider).then((result) => { alert("Google sign-in successful", result) })

    const logout = async () => await signOut(auth).then(() => alert("Logged out successfully"))

    const isLoggedIn = user ? true : false;

    const handleAddBook = async (name, isbnNumber, price) => {
        return await addDoc(collection(firestore, 'books'), {
            name,
            isbnNumber,
            price,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            userId: user.uid
        })
    }

    const listBooks = async () => {
        const books = await getDocs(collection(firestore, 'books'))
        return books
    }

    const getBookDetail = async (id) => {
        return await getDoc(doc(firestore, "books", id))
    }

    const placeOrder = async (bookId, qty) => {
        return await addDoc(collection(firestore, "books", bookId, "orders"), {
            bookId,
            userId: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            qty: Number(qty)
        })
    }

    const fetchBooks = async (userID) => {
        const q = query(collection(firestore, "books"), where("userId", "==", userID));
        return await getDocs(q);

    }

    const fetchOrders = async (bookId) => {
        const q = query(collection(firestore, "books", bookId, "orders"))
        return await getDocs(q);
    }

    return (
        <firebaseContext.Provider value={
            {
                signup,
                login,
                signinWithGoogle,
                logout,
                isLoggedIn,
                handleAddBook,
                listBooks,
                getBookDetail,
                placeOrder,
                fetchBooks,
                user,
                fetchOrders
            }}>
            {props.children}
        </firebaseContext.Provider>
    )
}
