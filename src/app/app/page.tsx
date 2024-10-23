import { auth } from "@/auth"
import { redirect } from "next/navigation"
import UserInfo from "./_components/user-info"

export default async function Page() {
  const session = await auth()

  if (!session) return (
    redirect('/auth')
  )

  return (
    <main className="flex items-center justify-center h-screen">
      <UserInfo user={session?.user} />
    </main>
  )
}
