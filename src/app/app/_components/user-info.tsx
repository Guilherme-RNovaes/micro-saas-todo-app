'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

type props = {
  user: Session['user']
}

export default function UserInfo({ user }: props) {
  if (!user) return (
    <Button variant='outline' onClick={() => signOut(user)}>
      SignOut
    </Button>
  )

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Avatar>
        <AvatarFallback>G</AvatarFallback>
      </Avatar>
      <span>{user?.email}</span>

      <Button variant='outline' onClick={() => signOut()}>
        SignOut
      </Button>
    </div>
  )
}
