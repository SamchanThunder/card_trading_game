import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Navigate } from '../scripts/navigate';

export function AuthDetails(){
    const [user, setUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (username) => {
            if (username){
                setUser(username);
            }else{
                setUser(null);
            }
        })
    }, [])

    user ? console.log("Signed In " + user.email) : console.log("Signed Out");
}

export function userSignOut(){
    signOut(auth).then(() => {
        console.log("Signed Out Success");
    })
}