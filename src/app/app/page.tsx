import { getSession } from "next-auth/react"
import { redirect } from "next/navigation"
import UserInfo from "./_components/user-info"
import { auth } from "../api/auth/[...nextauth]/route"

export default async function Page() {
  const session = await getSession(auth)

  return (
    <main className="flex items-center justify-center h-screen">
      <UserInfo user={session?.user} />
    </main>
  )
}
