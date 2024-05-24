
import "@/styles/globals.css";

import { useAuth } from "@/lib/appwriteF/auth";
import { create } from "zustand";
import { useEffect } from "react";
import { account } from "@/lib/appwrite";


const useError = create((set) => ({
  error: undefined,
  setError: (error) => {
    set(() => ({ error: error }));
  },
}));

export default function App({ Component, pageProps }) {

    const user = useAuth((state) => state.user);
    const setUser = useAuth((state) => state.setUser);
    const error = useError((state) => state.error);
    useEffect(()=>{
      account.get().then((res) => {
        setUser(res)
      }).catch((e) => {
      })
    },[])
    console.log("error",error);
    return <>
    {error!=undefined ? <div className="bg-red-500 text-white p-2">{error}</div> : null}
    {user!=undefined ? "You are logged in" : "You are not logged in"}
    <Component {...pageProps} />
  
  </>;
}

export {useError}