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
import { register,useAuth } from "@/lib/appwriteF/auth"
import { redirect } from "next/navigation"
import { useRouter } from "next/router"
import { useError } from "@/pages/_app";

export default function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordC, setPasswordC] = useState('')
    const setError = useError((state) => state.setError);
    const setUser = useAuth((state) => state.setUser);
    const router = useRouter()


    const onChangeEmail = (e) => setEmail(e.target.value)
    const onChangePassword = (e) => setPassword(e.target.value)
    const onChangePasswordC = (e) => setPasswordC(e.target.value)
    const onSubmit = async (e) => {
        e.preventDefault()
        const user = await register(email, password, passwordC)
        if (user.error) setError(user.error)
        else{
          setUser(user)

          return router.push("/dashboard")
      }
    }
  return (
    <Card className="w-full max-w-sm">
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={onChangeEmail} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={onChangePassword} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input id="password" type="password" required value={passwordC} onChange={onChangePasswordC} />
          </div>
        </CardContent>
        <CardFooter className={"flex flex-col justify-center align-center"}>
          <Button onClick={onSubmit} className="w-full">Create Account</Button>
          <Link href="/auth/login" onClick={()=>setError(undefined)} style={{marginTop:8}}>Login</Link>
        </CardFooter>
      </form>
    </Card>
  )
}
