'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { LoaderIcon } from "lucide-react"
import { cn } from "@/lib/utils"
const LoginPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [emailErr, setEmailErr] = useState<boolean>(false)
  const [passwordErr, setPasswordErr] = useState<boolean>(false)
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;


    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === "email") {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const correct = valid.test(value);
      setEmailErr(!correct);
    }

    if (name === "password") {
      setPasswordErr(value.length < 7);
    }
  };


  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    try {
      const res = await fetch(`http://localhost:3001/user?userEmail=${formData.email}&userPassword=${formData.password}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application-json'
        },
      });

      const data = await res.json()

      //User Exists or not



      console.log(data)
      setTimeout(() => {
        if (data.length == 0) {




          throw new Error('User Not Exists')
        }
        console.log('res', data)
        setLoading(false)

        const dataId = data.find(
          (item: any) =>
            formData.email === item.email && formData.password === item.password
        );

        if (!dataId) {

          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            toast("User Not Exists", {
              description: "Please Enter Valid Email and Password!",
              position: "top-right",
              className: "text-green-500 text-sm font-medium ",

            });
          }, 3000)
        }


        console.log('dataId', dataId)

        localStorage.setItem('userName', dataId.name)
        localStorage.setItem('userEmail', dataId.email)

        //  document.cookie = `auth=users.${dataId.id};`
        document.cookie = `auth=${dataId.id}; path=/; SameSite=Lax; Secure=false`;

        router.push('/sidebar/dash/addworksheet')
        setLoading(false)
        toast("User Login Successfully", {
          description: "Welcome back!",
          position: "top-right",
          className: "text-green-500 text-sm font-medium ",

        });


      }, 3000)

    } catch (error: any) {
      setTimeout(() => {
        setLoading(false)
        console.log(error.message)
        toast("Please Enter the Correct Email and Password", {
          position: 'top-right',
          description: 'Please check',
        }
        )
      }, 3000)
    }


  }

  //spinner

  function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
    return (
      <LoaderIcon
        role="status"
        aria-label="Loading"
        className={cn("size-4 animate-spin", className)}
        {...props}

      />
    )
  }
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Login Card */}
        <Card>

          <CardContent className="space-y-4">


            {/* Login Form */}
            <form className="space-y-4" onSubmit={handleUserLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    required
                  />
                </div>
                {/* {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )} */}

                {emailErr === true && (
                  <span className="text-sm text-red-500">
                    Enter the Valid Email Id
                  </span>
                )
                }
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}

                {passwordErr && (
                  <p className='text-sm text-red-500'>Enter password MinLength 7</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {/* <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  /> */}

                  <Checkbox
                    id="terms"
                    className='cursor-pointer'
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  />

                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>

              </div>
              {loading === false && (
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={
                    loading ||
                    emailErr ||
                    passwordErr ||
                    !formData.email ||
                    !formData.password ||
                    !agreeToTerms
                  }
                >

                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              )}
              {loading && (
                <Button className='w-full '>
                  <Spinner />
                </Button>
              )}
            </form>

            {/* <div className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link
                href="/user/auth/register"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
