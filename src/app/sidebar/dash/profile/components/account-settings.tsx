'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail, Lock, EyeOff, Eye } from "lucide-react"
import { useEffect, useState } from "react"

// type Input={
//   name:string,
//   email:string,
//   password:string,
//   confirmPassword:string
// }
export function AccountSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
// const[inputErr,setInputErr]=useState({
//   emailErr:false,
//   passwordErr:false,
//   confirmPassErr:false
// })

const [emailErr,setEmailErr] = useState<boolean>(false)
const [passwordErr,setPasswordErr]=useState<boolean>(false)
const[conPassErr,setConPassErr]=useState<boolean>(false)
const [confirm,setConfirm]=useState<boolean>(true)


  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if(name==='password'){
      
      setPasswordErr(value.length<= 7);
       
    }
    
      if (name === "email") {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const correct = valid.test(value);
    setEmailErr(!correct)

  }

   if (name === "confirmPassword") {
    setConPassErr(value.length < 7);
     if(formData.password === value){
     setConfirm(true);
    }else{
      setConfirm(false)
    }
  }
  }
  return (
    <Card className="align-center items-center">
      <div className="" >
        <CardHeader>
          <CardTitle className="text-2sm font-bold">Account Settings</CardTitle>
          <CardDescription className="mb-3">Update your account information and email preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 flex justify-center gap-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Jane Doe"
                className=" pr-8"
                value={formData.name}
                name="name"
                placeholder="Enter the Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  className= {`pl-10 ${emailErr ? 'border-red-500' : ''}`}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                
                  placeholder="Enter your email"
                  required
                />
              </div>
               {emailErr===true &&(
                            <span className="text-sm text-red-500">
                                Enter the Valid Email Id
                            </span>
                                )
                                }
            </div>

          </div>
          <div className="space-y-4">
            {/* <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div> */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer" />
                <Input
                  id="password"
                  name="password"
                  className="pl-8 pr-8"

                  value={formData.password}
                  onChange={handleInputChange}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >

                  {!showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
                   {passwordErr===true &&(
                            <span className="text-sm text-red-500">
                               Enter password MinLength 7
                            </span>
                                )
                                }
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  className="pl-8 pr-8"
                  name="confirmPassword"
                  onChange={handleInputChange}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {!showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
               {conPassErr && (
                  <p className='text-sm text-red-500'>Enter password MinLength 7</p>
                )}

                {!confirm && (
                  <p className='text-sm text-red-500 mt-3'>Confirm both password are same!</p>
                )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="mt-2 cursor-pointer" disabled={!formData.name || !formData.password || !formData.confirmPassword || !formData.email || emailErr ||passwordErr || !confirm}  >Save Changes</Button>
        </CardFooter>
      </div>
    </Card>
  )
}

