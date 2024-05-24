import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { logout,useAuth } from "@/lib/appwriteF/auth"
import { useRouter } from "next/router"
import { useError } from "@/pages/_app";

export default function Page() {
    const setUser = useAuth((state) => state.setUser);
    const router = useRouter()
    const setError = useError((state) => state.setError);


    const onSubmit = async(e) => {
        e.preventDefault()
        await logout()
        setUser(undefined)
        router.push('/')
    }
  return (
    <Card className="w-full max-w-sm">
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Logout</CardTitle>
          <CardDescription>
          Are you sure you want to log out?

          </CardDescription>
        </CardHeader>
        <CardFooter className={"flex flex-col justify-center align-center"}>
          <Button onClick={onSubmit} className="w-full">Logout</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
