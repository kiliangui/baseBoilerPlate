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
import { login,useAuth } from "@/lib/appwriteF/auth"
import { useRouter } from "next/router"
import { useError } from "@/pages/_app";

export default function Page() {
  const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const setUser = useAuth((state) => state.setUser);
    const setError = useError((state) => state.setError);

    const onChangeEmail = (e) => setEmail(e.target.value)
    const onChangePassword = (e) => setPassword(e.target.value)
    const onSubmit = async(e) => {
        e.preventDefault()
        const res = await login(email,password);
        if (res.error) console.log("SETTINGS THE ERROR STATE",res.error);
        
        if (res.error) setError(res.error)
          else {
        setUser()
        router.push('/dashboard')
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
          <div className="flex justify-end ">
          <Link href="/auth/reset"  style={{marginTop:8}}>Reset Password</Link>

          </div>
        </CardContent>
        <CardFooter className={"flex flex-col justify-center align-center"}>
          <Button onClick={onSubmit} className="w-full">Sign in</Button>
          <Link href="/auth/register" onClick={()=>setError(undefined)} style={{marginTop:8}}>Create an account</Link>
        </CardFooter>
      </form>
    </Card>
  )
}
