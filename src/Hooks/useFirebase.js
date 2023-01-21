import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, getIdToken } from "firebase/auth";
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux'
import { isAdmin, login, logout, putUserToDb, saveUserToDb, setLoading } from "../redux/dataSlice/dataSlice";

const useFirebase = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const dispatch = useDispatch();
    const [error,setError] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const googleSignIn = (location, navigate) => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                // saveUser(user, "PUT");  
                dispatch(putUserToDb({
                    displayName: user.displayName,
                    email: user.email,
                    createdAt: user.metadata.createdAt,
                    photoURL: user.photoURL,
                    uid: user.uid
                }))
                navigate(location.state?.from.pathname || '/');
            })
            .catch(error => {
            })
    };

    const signUpWithEmail = (info) => {
        const { name, email, password, location, navigate } = info;
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                //save user ot database
                dispatch(saveUserToDb({
                    displayName: name,
                    email: user.email,
                    createdAt: user.metadata.createdAt,
                    photoURL: 'https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png',
                    uid: user.uid
                }))
                //update user profile
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
                }).then((data) => {
                    setIsLoading(false)

                }).catch((error) => {
                    // An error occurred
                    // ...
setTimeout(() => setError(''),3000)

                    setError(error.message)
                    setIsLoading(false)
                })

                navigate(location.state?.from.pathname || '/')
                info?.handleClose();
                // ...
            }).catch(error => {
                setError(error.message)
                setIsLoading(false)
setTimeout(() => setError(''),3000)

            })
    };

    const logInWithEmail = async(info) => {
        const { email, password, location, navigate } = info;
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in  
                // ...
                   setIsLoading(false)
                navigate(location.state?.from.pathname || '/')
            })
            .catch((error) => {
        setIsLoading(false)
        const errorMessage = error.message;
setError(errorMessage)
setTimeout(() => setError(''),3000)
                return errorMessage
            });
    }

    useEffect(() => {
        dispatch(setLoading(true))
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user).then(idToken => localStorage.setItem('idToken', idToken));
                dispatch(login({
                    displayName: user.displayName,
                    email: user.email,
                    createdAt: user.metadata.createdAt,
                    photoURL: user.photoURL,
                    uid: user.uid
                }))
                dispatch(isAdmin({ email: user.email }))

            }
            else {
                dispatch(setLoading(false))
            }

        });
    }, [auth]);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(logout())
            // Sign-out successful.
        }).catch((error) => {
            // An error happened. 
        });
    }

    return {
        handleSignOut,
        googleSignIn,
        signUpWithEmail,
        logInWithEmail,
        isLoading,
        error
    };
};

export default useFirebase;