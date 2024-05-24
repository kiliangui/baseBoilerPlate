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
import { resetPassword,resetPasswordConfirm,useAuth } from "@/lib/appwriteF/auth"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useError } from "@/pages/_app";

export default function Page() {
    const [email, setEmail] = useState('')
    const setUser = useAuth((state) => state.setUser);
    const setError = useError((state) => state.setError);

    const onChangeEmail = (e) => setEmail(e.target.value)
    const onChangePassword = (e) => setPassword(e.target.value)
    const onSubmit = async(e) => {
        e.preventDefault()
        const res = await resetPassword(email);
        if (res.error) setError(res.error.message)
      }



      const searchParams = useSearchParams();
      const userId = searchParams.get("userId");
      const secret = searchParams.get("secret");

      if (userId && secret) return <ResetPassword userId={userId} secret={secret} />;



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

        <div className="flex ">
          <Link href="/auth/login"  style={{marginTop:8}}>{"<-"} Go back to login</Link>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={onChangeEmail} />
          </div>
        </CardContent>
        <CardFooter className={"flex flex-col justify-center align-center"}>
          <Button onClick={onSubmit} className="w-full">Send reset Email</Button>
        </CardFooter>
      </form>
    </Card>
  )
}



function ResetPassword({userId,secret}){
  const [password, setPassword] = useState('')
  const [passwordC, setPasswordC] = useState('')
  const setUser = useAuth((state) => state.setUser);
  const router = useRouter()

  const onChangePassword = (e) => setPassword(e.target.value)
  const onChangePasswordC = (e) => setPasswordC(e.target.value)
  const onSubmit = async(e) => {
      e.preventDefault()
      const res = await resetPasswordConfirm(userId,secret,password,passwordC);
      if (res.error) setError(res.error.message)
      else router.push('/auth/login')
    }

  return (
    <Card className="w-full max-w-sm">
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={onChangePassword} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="passwordC">Confirm Password</Label>
            <Input id="passwordC" type="password" required value={passwordC} onChange={onChangePasswordC} />
          </div>
        </CardContent>
        <CardFooter className={"flex flex-col justify-center align-center"}>
          <Button onClick={onSubmit} className="w-full">Reset Password</Button>
        </CardFooter>
      </form>
    </Card>
  )
}