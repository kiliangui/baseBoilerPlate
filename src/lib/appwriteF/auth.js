'use client';

import { ID } from 'appwrite';
import { account } from '@/lib/appwrite';
import { create } from 'zustand';
import { useError } from '@/pages/_app';

const useAuth = create((set) => ({
    user: undefined,
    setUser: (user) => {
        set(() => {
            return ({ user: user })
        })
    }
  }))

export {useAuth}

export async function verifyEmail(){
    await account.createVerification("http://localhost/auth/verify")
}

export async function login(email, password){
    try{
        const res = await account.createEmailPasswordSession(email, password);
        return res;
    }
    catch (e) {
        return {error: e.message}
    }
    
}

export async function resetPassword(email){
    try{
        const res = await account.createRecovery(email,"http://localhost:3000/auth/reset");
        return res;   
    } catch (e) {
        return {error: e.message}
    }
}

export async function resetPasswordConfirm(userId,secret,password){
    try{
        const res = await account.updateRecovery(userId,secret,password);
        return res;   
    } catch (e) {
        return {error: e.message}
    }

}

export function logout(){
    return account.deleteSession('current');
}

export async function register(email, password, passwordC){
    try{
        const res = await account.create(ID.unique(),email, password)
        await verifyEmail();
        return res;
    } catch (e) {
        return {error: e.message}
    }
}