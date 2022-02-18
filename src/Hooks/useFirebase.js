import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useEffect } from 'react';

import { useDispatch } from 'react-redux'
import { isAdmin, login, logout, putUserToDb, saveUserToDb, setLoading } from "../redux/dataSlice/dataSlice";

const useFirebase = () => {
    // const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const dispatch = useDispatch();

    // const saveUser = (user, method) => {
    //     fetch('https://serene-temple-54072.herokuapp.com/users', {
    //         method: method,
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then(res => res.json())
    //         .then(res => 

    // }

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

    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'http://localhost:3000/',
        // This must be true.
        handleCodeInApp: true,
    };
    const signUpWithEmail = (info) => {
        const { name, email, password, location, navigate } = info;

        // sendSignInLinkToEmail(auth, email, actionCodeSettings)
        //     .then(() => {
        //         // The link was successfully sent. Inform the user.
        //         // Save the email locally so you don't need to ask the user for it again
        //         // if they open the link on the same device.
        //         window.localStorage.setItem('emailForSignIn', email);
        //         
        //         // ...
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         
        //         // ...
        //     });
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


                }).catch((error) => {
                    // An error occurred
                    // ...
                })

                navigate(location.state?.from.pathname || '/')
                // ...
            }).catch(error => {

            })
    };
    // if (isSignInWithEmailLink(auth, window.location.href)) {
    //     // Additional state parameters can also be passed via URL.
    //     // This can be used to continue the user's intended action before triggering
    //     // the sign-in operation.
    //     // Get the email if available. This should be available if the user completes
    //     // the flow on the same device where they started it.
    //     let email = window.localStorage.getItem('emailForSignIn');
    //     
    //     if (!email) {
    //         // User opened the link on a different device. To prevent session fixation
    //         // attacks, ask the user to provide the associated email again. For example:
    //         email = window.prompt('Please provide your email for confirmation');
    //     }
    //     // The client SDK will parse the code from the link for you.
    //     signInWithEmailLink(auth, email, window.location.href)
    //         .then(({ user }) => {
    //             // Clear email from storage.
    //             
    //             dispatch(putUserToDb({
    //                 displayName: user.displayName,
    //                 email: user.email,
    //                 createdAt: user.metadata.createdAt,
    //                 photoURL: user.photoURL,
    //                 uid: user.uid
    //             }))
    //             window.localStorage.removeItem('emailForSignIn');
    //             // You can access the new user via result.user
    //             // Additional user info profile not available via:
    //             // result.additionalUserInfo.profile == null
    //             // You can check if the user is new or existing:
    //             // result.additionalUserInfo.isNewUser
    //         })
    //         .catch((error) => {
    //             // Some error occurred, you can inspect the code: error.code
    //             // Common errors could be invalid email and invalid or expired OTPs.
    //             
    //         });
    // }
    const logInWithEmail = info => {
        const { email, password } = info;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in  
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;

            });
    }

    useEffect(() => {
        dispatch(setLoading(true))
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // setUser(user);
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
    }, []);

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
    };
};

export default useFirebase;