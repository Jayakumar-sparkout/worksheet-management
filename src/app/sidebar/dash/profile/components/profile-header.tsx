'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Mail, MapPin } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function ProfileHeader() {
  const [userData,setUserData]=useState({
    userName:'Jayakumar',
    userEmail:'jayakumarv0018@gmail.com',
    location:'Madurai,Tamilnadu'
  })
  return (
    <div>
    {/* <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
              <AvatarFallback>JK</AvatarFallback>
            </Avatar>
            <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
              <Camera className="h-4 w-4" />
              <span className="sr-only">Change avatar</span>
            </Button>
          </div>
          <div className="space-y-1.5  ">
            <h2 className="text-xl font-bold">{userData.userName}</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />  
              <span className="text-sm font-bold">{userData.userEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-bold">{userData.location}</span>
            </div>
            <div className="md:ml-auto">
            <Button>Edit Profile</Button>
          </div>
         </div>
         </div>
          </CardContent>
    </Card> */}

    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
              <AvatarFallback>JK</AvatarFallback>
            </Avatar>
            <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
              <Camera className="h-4 w-4 cursor-pointer" />
              <span className="sr-only">Change avatar</span>
            </Button>
          </div>
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold">{userData.userName}</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="text-sm font-bold"> {userData.userEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-bold">{userData.location}</span>
            </div>
          </div>
          <div className="md:ml-auto">
            <Dialog >
                <DialogTrigger asChild>
              <Button variant="outline" className="cursor-pointer md:ml-auto">Edit Profile</Button>
                </DialogTrigger>
                 <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="curser-pointer">

            <DialogTitle>Edit profile</DialogTitle>

            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
            
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">User Name</Label>
              <Input id="name-1" name="name" 
              placeholder="Enter the UserName" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Location</Label>
              <Input id="username-1" name="location" 
              placeholder="Enter the Location" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer" >Cancel</Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">Save changes</Button>
          </DialogFooter>
        </DialogContent> 
            </Dialog>
            {/* <Button>Edit Profile</Button> */}
          </div>
        </div>
      </CardContent>
    </Card>      
     </div>
  )
}

