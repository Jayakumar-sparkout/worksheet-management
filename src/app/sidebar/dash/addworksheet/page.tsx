

// "use client"

// import React, { useMemo, useState } from "react";
// import { Plus, Edit2, Trash2, Search, X, Eye, Users, Globe, Activity, Filter, Download, RefreshCw, MoreVertical, ChevronDown, CalendarDays, Clock } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// import { useRouter } from "next/navigation";

// type ProjectUser = {
//   id: number;
//   email: string;
//   role: "admin" | "developer" | "viewer" | "pending" | string;
//   status: "active" | "pending" | string;
//   invitedAt: string;
// };

// type Project = {
//   id: number;
//   name: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   apiKey: string;
//   apiSecret: string;
//   allowedDomains: string[];
//   users: ProjectUser[];
// };

// export default function ProjectsPage() {
//   const router = useRouter();
//   const [projects, setProjects] = useState<Project[]>([
//     {
//       id: 1,
//       name: "E-commerce Website",
//       description: "A full-stack e-commerce platform with React and Node.js",
//       createdAt: "2024-01-15",
//       updatedAt: "2024-01-20",
//       apiKey: "pk_ABCdef123456789XYZabc987654321DEF",
//       apiSecret: "sk_XYZ987abc654def321GHI456jkl789mno012pqr345stu",
//       allowedDomains: ["https://myecommerce.com", "https://staging.myecommerce.com"],
//       users: [
//         { id: 1, email: "john@company.com", role: "admin", status: "active", invitedAt: "2024-01-15" },
//         { id: 2, email: "sarah@company.com", role: "developer", status: "active", invitedAt: "2024-01-16" }
//       ]
//     },
//     {
//       id: 2,
//       name: "Mobile Banking App",
//       description: "Secure mobile banking application with biometric authentication",
//       createdAt: "2024-01-10",
//       updatedAt: "2024-01-18",
//       apiKey: "pk_GHI789jkl012mno345PQR678stu901vwx",
//       apiSecret: "sk_DEF456ghi789jkl012MNO345pqr678stu901vwx234yz",
//       allowedDomains: ["https://bankingapp.com"],
//       users: [
//         { id: 3, email: "mike@bank.com", role: "admin", status: "active", invitedAt: "2024-01-10" }
//       ]
//     }
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState<"create" | "edit">("create");
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [formData, setFormData] = useState({ name: "", description: "" });
//   const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

//   const filteredProjects = useMemo(
//     () =>
//       projects.filter(
//         (p) =>
//           p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           p.description.toLowerCase().includes(searchTerm.toLowerCase())
//       ),
//     [projects, searchTerm]
//   );

//   const validate = () => {
//     const nextErrors: { name?: string; description?: string } = {};
//     const name = formData.name.trim();
//     const description = formData.description.trim();
//     if (!name) nextErrors.name = "Project name is required";
//     else if (name.length < 3) nextErrors.name = "Project name must be at least 3 characters";
//     if (!description) nextErrors.description = "Description is required";
//     else if (description.length < 10) nextErrors.description = "Description must be at least 10 characters";
//     setErrors(nextErrors);
//     return Object.keys(nextErrors).length === 0;
//   };

//   const openCreateModal = () => {
//     setModalMode("create");
//     setSelectedProject(null);
//     setFormData({ name: "", description: "" });
//     setErrors({});
//     setIsModalOpen(true);
//   };

//   const openEditModal = (project: Project) => {
//     setModalMode("edit");
//     setSelectedProject(project);
//     setFormData({ name: project.name, description: project.description });
//     setErrors({});
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedProject(null);
//     setErrors({});
//   };

//   const handleSubmit = () => {
//     if (!validate()) return;
//     const currentDate = new Date().toISOString().split("T")[0];
//     if (modalMode === "create") {
//       const newProject: Project = {
//         id: Math.max(0, ...projects.map((p) => p.id)) + 1,
//         name: formData.name.trim(),
//         description: formData.description.trim(),
//         createdAt: currentDate,
//         updatedAt: currentDate,
//         apiKey: "pk_" + Math.random().toString(36).slice(2),
//         apiSecret: "sk_" + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2),
//         allowedDomains: [],
//         users: [],
//       };
//       setProjects((prev) => [newProject, ...prev]);
//     } else if (modalMode === "edit" && selectedProject) {
//       setProjects((prev) =>
//         prev.map((p) =>
//           p.id === selectedProject.id
//             ? { ...p, name: formData.name.trim(), description: formData.description.trim(), updatedAt: currentDate }
//             : p
//         )
//       );
//     }
//     closeModal();
//   };

//   const removeProject = (id: number) => {
//     setProjects((prev) => prev.filter((p) => p.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="bg-card border-b">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between py-6">
//             <div>
//               <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
//               <p className="text-muted-foreground">Manage your API projects and monitor activity</p>
//             </div>
//             <Button onClick={openCreateModal}>
//               <Plus className="mr-2 h-4 w-4" />
//               New Project
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
//         <div className="mb-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search projects..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </div>

//         {/* Projects Grid */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {filteredProjects.map((project) => (
//             <div key={project.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
//               <div className="p-6">
//                 <div className="flex items-start justify-between">
//                   <div className="space-y-1">
//                     <h3 className="text-lg font-semibold">{project.name}</h3>
//                     <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <button
//                       onClick={() => router.push(`/console/projects/${project.id}`)}
//                       className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-8 w-8"
//                     >
//                       <Eye className="h-4 w-4" />
//                     </button>
//                     <button
//                       onClick={() => openEditModal(project)}
//                       className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-8 w-8"
//                     >
//                       <Edit2 className="h-4 w-4" />
//                     </button>
//                     <button
//                       onClick={() => removeProject(project.id)}
//                       className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-8 w-8 text-red-600"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
//                   <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
//                   <span>
//                     {project.users.length} user{project.users.length !== 1 ? "s" : ""}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredProjects.length === 0 && (
//           <div className="text-center py-12">
//             <Globe className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
//             <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
//             <p className="text-muted-foreground mb-4">
//               {searchTerm ? "No projects match your search criteria." : "Get started by creating your first project."}
//             </p>
//             {!searchTerm && (
//               <Button onClick={openCreateModal}>
//                 <Plus className="mr-2 h-4 w-4" />
//                 Create Project
//               </Button>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Create/Edit Modal */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{modalMode === "create" ? "Create New Project" : "Edit Project"}</DialogTitle>
//             <DialogDescription>
//               {modalMode === "create" ? "Create a new project to start using the API." : "Update the project details."}
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Project Name *</label>
//               <Input
//                 name="name"
//                 value={formData.name}
//                 onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
//                 placeholder="Enter project name"
//                 className={errors.name ? "border-red-500" : undefined}
//               />
//               {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Description *</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
//                 rows={4}
//                 className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
//                   errors.description ? "border-red-500" : ""
//                 }`}
//                 placeholder="Enter project description"
//               />
//               {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
//             </div>
//             <div className="flex items-center justify-end gap-2">
//               <Button variant="outline" onClick={closeModal}>Cancel</Button>
//               <Button onClick={handleSubmit}>{modalMode === "create" ? "Create Project" : "Save Changes"}</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

//

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


  const loginEmail = localStorage.getItem('userEmail')


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
