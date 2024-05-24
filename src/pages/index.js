import Link from "next/link";

export default function Page(){
    return <div>hello world<Link href={"/auth/login"}>Login</Link></div>
}