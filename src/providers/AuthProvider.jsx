import React, { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";

import app from "@/firebase/firebase.config";
import { AuthContext } from "@/contexts/AuthContext";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const createUser = async (email, password) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const updateUser = async (updatedData) => {
        setLoading(true);
        try {
            await updateProfile(auth.currentUser, updatedData);
            
            // Update the local user state with the new profile data
            const updatedUser = {
                ...auth.currentUser,
                displayName: updatedData.displayName !== undefined ? updatedData.displayName : auth.currentUser.displayName,
                photoURL: updatedData.photoURL !== undefined ? updatedData.photoURL : auth.currentUser.photoURL
            };
            
            setUser(updatedUser);
            setLoading(false);
            return Promise.resolve();
        } catch (error) {
            setLoading(false);
            return Promise.reject(error);
        }
    };

    const signInUser = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // The onAuthStateChanged listener will handle setting the user state
            // but we can also explicitly set it here for immediate UI update
            setUser(result.user);
            setLoading(false);
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const logOut = async () => {
        setLoading(true);
        try {
            const result = await signOut(auth);
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const authData = {
        user,
        setUser,
        loading,
        createUser,
        setLoading,
        updateUser,
        signInUser,
        signInWithGoogle,
        logOut,
    };

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
