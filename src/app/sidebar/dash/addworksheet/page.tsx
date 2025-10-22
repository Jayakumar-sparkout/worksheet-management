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
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { cn } from "@/lib/utils"
import { format } from 'path';
const LoginPage = () => {
  const router = useRouter();
  const [loading,setLoading]=useState<boolean>(false)
  const [loginEmail,setLoginEmail]=useState<string>('')
  const [formData, setFormData] = useState({
    project: '',
    description: '',
    estimation:null,
    status: ''
  })
  const [descripErr, setDescripErr] = useState<boolean>(false)
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'description') {
      if (formData.description.length <= 10) {
        setDescripErr(true)
      } else {
        setDescripErr(false)
      }
    }
    
  };


  const preventInvalidChars = async (e: any) => {
    const invalidChars = ["e", "E", "+", "-"];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
      return false;
    }
    return true;
  }

useEffect(()=>{
  setLoginEmail(localStorage.getItem('userEmail')||'')
},[])


//   const handleCreateSheet = async(e:React.FormEvent)=>{   
//   console.log(loginEmail)
//     e.preventDefault()

//  try {
 
//   const response = await fetch(`http://localhost:3001/user?email=${loginEmail}`);
//   const users = await response.json();
// //

// console.log('users',users)
//   if (users.length === 0) {
//     throw new Error('User not found');
//   }

//   const user = users[0];

//   console.log('user',user)
//   const userId = user.id;

//   console.log('userId',userId)

//   const newProject = {
//     projectName: formData.project,
//     projectDescription: formData.description,
//     projectHours: formData.estimation,
//     projectStatus: formData.status
//   };

//   const updatedProjects = user.projects ? [...user.projects, newProject] : [newProject];

//   const updateRes = await fetch(`http://localhost:3001/user/${userId}`, {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ projects: updatedProjects })
//   });

//   const updatedData = await updateRes.json();

// setTimeout(()=>{

//   if(updatedData.length<0){
    
//       setLoading(true)
//      toast("Successfully Updated", {
//                    description: "successfully update the data!",
//                    position: "top-right",
//                    className: "text-green-500 text-sm font-medium ",
     
//                  });
   
//   }

//   console.log('Updated User:', updatedData);
//  },3000)
// } catch (error: any) {
//   console.error('Error:', error.message);
// }
// }

  //spinner

const handleCreateSheet = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log(loginEmail);

  try {
    setLoading(true);

    const response = await fetch(`http://localhost:3001/user?email=${loginEmail}`);

    console.log(response)
    const users = await response.json();

    if (users.length === 0) {
      throw new Error("User not found");
    }


    console.log('users',users)

    const user = users[0];
    const userId = user.id;

    const newProject = {
      projectName: formData.project,
      projectDescription: formData.description,
      projectHours: formData.estimation,
      projectStatus: formData.status,
    };

    const updatedProjects = user.projects ? [...user.projects, newProject] : [newProject];

    const updateRes = await fetch(`http://localhost:3001/user/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projects: updatedProjects }),
    });

    if (!updateRes.ok) {
      throw new Error("Failed to update user");
    }

    const updatedData = await updateRes.json();
    console.log("Updated User:", updatedData);

    setTimeout(() => {
      toast("Successfully Updated", {
        description: "Worksheet data updated successfully!",
        position: "top-right",
        className: "text-green-500 text-sm font-medium",
      });

      setLoading(false);

              setFormData({
          project: '',
          description: '',
          estimation:null,
          status: '',
        });

    }, 3000);

  } catch (error: any) {
    setTimeout(() => {
      console.error("Error:", error.message);
      toast("Update Failed", {
        description: "Something went wrong. Please try again.",
        position: "top-right",
        className: "text-red-500 text-sm font-medium",
      });

      setLoading(false);
    }, 3000);
  }
};


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
    <div className=" bg-background flex align-center justify-center">
      <div className="w-full space-y-6">

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Add Worksheet</h1>
          <p className="text-muted-foreground text-sm">
            Create Your Worksheet
          </p>
        </div>

        {/* Login Card */}
        <Card>

          <CardContent className="space-y-4">


            {/* Login Form */}
            <form className="space-y-4 mt-4 mb-4" >
              <div className="space-y-2">
                <div className="relative flex">
                  <label className='flex text-bold text-sm font-weight-500 font-bold mr-13'>Project:</label>

                  <Select value={formData.project}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, project: value }))
                    } >
                    <SelectTrigger className='w-full '>
                      <SelectValue placeholder="Select a Project" className='mt-2 mb-2' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Projects</SelectLabel>
                        <SelectItem value="realworld" >Realworld</SelectItem>
                        <SelectItem value="giftbottle">GiftBottle</SelectItem>
                        <SelectItem value="aoc">AOC</SelectItem>
                        <SelectItem value="forms">Forms</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                </div>

                <div className="relative flex">
                  <label className='flex text-bold text-sm font-weight-500  font-bold mr-6'>Description:</label>
                  <Textarea placeholder="Type your Description here."
                    name='description'
                    className={` ${descripErr ? 'border-red-500' : ''}`}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                {descripErr && (
                  <span className="text-sm text-red-500 ml-25 ">
                    Enter Min 10 Char
                  </span>
                )}

                <div className="relative flex">
                  <label className='flex text-bold font-weight-500 font-bold text-sm '>Estimation Hours:</label>
                  <Input
                    id="hours"
                    name="estimation"
                    type='number'
                    onChange={handleInputChange}
                    onKeyDown={(e) => preventInvalidChars(e)}
                    placeholder="Mention Estimation hours"
                    className='no-spinner '
                    required
                  />


                </div>

                <div className="relative flex">
                  <label className='flex text-bold font-weight-500 font-bold text-sm mr-15'>Status:</label>

                  <Select value={formData.status}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, status: value }))
                    } >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Select a Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="complete">Complete</SelectItem>
                        <SelectItem value="inprogress">Inprogress</SelectItem>
                        <SelectItem value="yet to start">Yet to Start</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>


                </div>

                <div className="flex justify-end">
                 {loading==false && (
                   <Button className='mt-2 cursor-pointer pl-5 pr-5' disabled={!formData.description || !formData.estimation || !formData.project || !formData.status || descripErr}
                   onClick={handleCreateSheet}>Create</Button>
                 )}
                  {loading && (
                                  <Button className='w-20 '>
                                    <Spinner />
                                  </Button>
                                )}
                </div>
              </div>


            </form>

          </CardContent>
        </Card>

      </div>
    </div>


  );
};

export default LoginPage;

