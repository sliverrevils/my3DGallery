import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

import { getStorage, ref, getDownloadURL } from 'firebase/storage'

export default function Authification() {
    const dispatch = useDispatch();
    const authRef = useRef(getAuth());
    const [user] = useAuthState(authRef.current);

    const googleLogIn = () => signInWithPopup(authRef.current, new GoogleAuthProvider()).then(({ user: { email, displayName, photoURL, uid, accessToken } }) => dispatch(setUser({ email, displayName, photoURL, uid, accessToken })));

    const googleLogOut = () => authRef.current.signOut();

    // //STORAGE TRY
    // const [img,setImg]=useState(null);
    // const storage=getStorage();
    // const file=ref(storage,'gs://auth-d9593.appspot.com/HHbp49UlZ7j-PPZRghl77mi_xeJR9vvX7GBS7KA73xJkdPbZ58GvyB8mnZ3n4SupiLLQ4DFtWsdZf_erw3mt68eq.jpg');
    // const url=getDownloadURL(file);
    // url.then(setImg)



    return (
        <>
            {user
                ? <button onClick={googleLogOut} className='Login-btn'>{user.displayName}
                    <span className="material-icons">
                        logout
                    </span>
                </button>
                : <button onClick={googleLogIn} className='Login-btn' >
                    <span className="material-icons">
                        login
                    </span></button>}
            {/* <img src={img} alt="dsd" /> */}
        </>
    )
} 