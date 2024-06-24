import '../style_sheets/start.css';
import Home from '../images/home.svg'
import Door from '../images/door.svg'
import Store from '../images/store.svg'
import Storage from '../images/storage.svg'
import Trade from '../images/trade.svg'
import Won from '../images/won.svg'
import { userSignOut } from '../scripts/authdetails';
import { auth, db } from '../scripts/firebase';
import { useState } from 'react';
import { Navigate } from '../scripts/navigate';
import { ref, get } from "firebase/database";

export function StartPage() {
    var user = auth.currentUser;
    const { newPage } = Navigate();

    if (user != null){
        console.log("signed in!");
        return (
            <div id="startDiv">
            </div>
        );
    }else{
        console.log("not logged in");
        return (
            <div id="startDiv">
            </div>
        );
    }
}