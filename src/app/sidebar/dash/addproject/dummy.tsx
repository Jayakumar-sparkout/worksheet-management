

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

// export default function page() {
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


//main 1

// "use client"
// import React,{useState} from 'react'
// import { Plus,CodeIcon,CalendarDaysIcon,MoveHorizontalIcon } from 'lucide-react';
// import { Card, CardTitle, CardDescription } from "@/components/ui/card"
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
// import { Button } from "@/components/ui/button"

// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Description } from '@radix-ui/react-dialog';
// import { describe } from 'node:test';
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
// };
// const page = () => {
// const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState<"create" | "edit">("create");
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [formData, setFormData] = useState({ name: "", description: "" });
//   const [errors, setErrors] = useState<{ name?: string; description?: string }>({});
//   const [editDistribtion,setEditDiscription]=useState<string>()
//  const [projectData,setProjectData]=useState<Project[]>([{
//   id:1,
//   name:'RealWorld',
//   description:'Developed a fully functional RealWorld web application that replicates a production-ready blogging platform similar to Medium. The project demonstrates real-world architecture and best practices using the MERN stack MongoDB, Express.js, React.js, Node.js. Users can register — all with JWT-based authentication and RESTful APIs.',
//   createdAt:'14/10/2025',
//   updatedAt:''
//  },
// {
//   id:2,
//   name:'RealWorl',
//   description:'Developed a fully functional RealWorld web application that replicates a production-ready blogging platform similar to Medium. The project demonstrates real-world architecture and best practices using the MERN stack MongoDB, Express.js, React.js, Node.js. Users can register — all with JWT-based authentication and RESTful APIs.',
//   createdAt:'14/10/2025',
//   updatedAt:''
//  }])
//       const openCreateModal = () => {
//     setModalMode("create");
//     setSelectedProject(null);
//     setFormData({ name: "", description: "" });
//     setErrors({});
//     setIsModalOpen(true);
//   };

//   const handleProjectCreate = async()=>{
//     const newProject: Project = {
//         id: Math.max(0, ...projectData.map((p) => p.id)) + 1,
//         name: formData.name.trim(),
//         description: formData.description.trim(),
//       };
//       setProjectData((prev) => [newProject, ...prev]);
//   }

//     const handleProjectInput= (
//       e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//       const { name, value } = e.target;
  
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
      

//       console.log(formData)
//     };

//     const handleEditId = async(id:number)=>{
  
//       const proId = projectData.find((p)=> p.id == id)
//      setEditDiscription(proId?.description)
//       console.log(proId?.description)
      
//     }

//     const handleEditProject =async()=>{
//           const newProject: Project = {
//         name: formData.name,
//         description: formData.description,
//       };
//       setProjectData((prev) => [newProject, ...prev]);
//     }

//   const removeProject = (id: number) => {
//     setProjectData((prev) => prev.filter((p) => p.id !== id));
//   };
//   return (
//     <div>
//         <div className="bg-card border-b">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between py-6">
//             <div>
//               <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
//               <p className="text-muted-foreground">Control all your projects and monitor their activity in one place.</p>
//             </div>
               
//     {/* // */}
    
//             <Dialog>
//       <form>
//         <DialogTrigger asChild>
          
//           <Button className='cursor-pointer'>
//             <Plus className="mr-2 h-4 w-4" />
//             New Project</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Create project</DialogTitle>
//             <DialogDescription>
//               Control all your projects and monitor their activity in one place.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4">
//             <div className="grid gap-3">
//               <Label htmlFor="name-1">Project Name</Label>
//                <Textarea placeholder="Type your Project Name here."
//                     name=''
//                     className={`'border-red-500' : ''}`}
//                     value={formData.name}
//                     onChange={handleProjectInput}
                    
//                   />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="username-1">Project Description</Label>
//                 <Textarea placeholder="Type your Description here."
//                     name='description'
//                     className={`'border-red-500' : ''}`}
//                     value={formData.description}
//                     onChange={handleProjectInput}
                    
//                   />
//             </div>
//           </div>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>
//             <Button type="submit" onClick={handleProjectCreate}  disabled={!formData.description || !formData.name}>Create Project</Button>
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//           </div>
//         </div>
                
//       </div>
      
//        {/* ProjectTist Show */}
//        {projectData.map((project,id)=>(
       
//        <div className='mt-6 flex'>
//       <Card className="w-full max-w-sm p-6 grid-cols-3 gap-6 hover:bg-muted transition-colors cursor-pointer">
//       <div className="flex items-start gap-4">
//         <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-12">
//           <CodeIcon className="w-6 h-6" />
//         </div>
//          <div className="grid gap-1 "> 
// {/*           
//            <div key={project.id}className="rounded-lg border bg-card text-card-foreground shadow-sm"> */}
//                   <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
//           <CardDescription className="text-muted-foreground">
//           {project.description}
//           </CardDescription>
//           <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2 text-sm text-muted-foreground ">
//           <CalendarDaysIcon className="w-4 h-4" />
//           <span>Updated 2 days ago</span>
        
//         </div>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="icon" className="ml-auto">
//             <MoveHorizontalIcon className="w-4 h-4 " />  
//               <span className="sr-only">Toggle menu</span>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem>View Project</DropdownMenuItem>
            
//              <Dialog>
//       <form>
//         <DialogTrigger asChild>
//         <Button variant="outline" onClick={() => handleEditId(project.id)}>Edit</Button> 
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle className='' ><p>Edit profile</p></DialogTitle>
//             <DialogDescription>
//               Make changes to your profile here. Click save when you&apos;re
//               done.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4">
//             <div className="grid gap-3">
//               <Label htmlFor="name-1">Name</Label>
//               <Textarea placeholder="Type your Description here."
//                     name='name'
//                     className={`'border-red-500' : ''}`}
                    
//                     onChange={handleProjectInput}
                    
//                   />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="username-1">Username</Label>
//               <Textarea placeholder="Type your Description here."
//                     name='description'
//                     className={`'border-red-500' : ''}`}
//                     value={editDistribtion}
//                     onChange={handleProjectInput}
                    
//                   />
//             </div>
//           </div>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>
//             <Button type="submit" onClick={handleEditProject} disabled={!formData.description || !formData.name}>Save changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//             <DropdownMenuItem onClick={() => removeProject(project.id)} >Delete</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//            </div> 
         
          
        
//       </div>
      

//     </Card>
//     </div>
    
    
//      ))}
//     </div>
//   )
// }

// export default page

//2

// "use client";
// import React, { useState } from "react";
// import {
//   Plus,
//   CodeIcon,
//   CalendarDaysIcon,
//   MoveHorizontalIcon,
//   Trash2,
//   Edit2Icon
// } from "lucide-react";
// import { Card, CardDescription } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";

// type Project = {
//   id: number;
//   name: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// };

// const Page = () => {
//   const [formData, setFormData] = useState({ name: "", description: "" });
//   const [projectData, setProjectData] = useState<Project[]>([
//     {
//       id: 1,
//       name: "RealWorld",
//       description:
//         "Developed a fully functional RealWorld web application that replicates a production-ready blogging platform similar to Medium. The project demonstrates real-world architecture and best practices using the MERN stack MongoDB, Express.js, React.js, Node.js. Users can register — all with JWT-based authentication and RESTful APIs.",
//       createdAt: "14/10/2025",
//       updatedAt: "",
//     },
//     {
//       id: 2,
//       name: "RealWorl",
//       description:
//         "Developed a fully functional RealWorld web application that replicates a production-ready blogging platform similar to Medium. The project demonstrates real-world architecture and best practices using the MERN stack MongoDB, Express.js, React.js, Node.js. Users can register — all with JWT-based authentication and RESTful APIs.",
//       createdAt: "14/10/2025",
//       updatedAt: "",
//     },
//   ]);

//   const [editId, setEditId] = useState<number | null>(null);

//   // Handle input change
//   const handleProjectInput = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Create project
//   const handleProjectCreate = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newProject: Project = {
//       id: Math.max(0, ...projectData.map((p) => p.id)) + 1,
//       name: formData.name.trim(),
//       description: formData.description.trim(),
//       createdAt: new Date().toLocaleDateString(),
//       updatedAt: "",
//     };
//     setProjectData((prev) => [newProject, ...prev]);
//     setFormData({ name: "", description: "" });
//   };

//   // Edit project (open modal)
//   const handleEditId = (id: number) => {
//     const project = projectData.find((p) => p.id === id);
//     if (project) {
//       setEditId(id);
//       setFormData({
//         name: project.name,
//         description: project.description,
//       });
//     }
//   };

//   // Save edited project
//   const handleEditProject = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (editId === null) return;

//     setProjectData((prev) =>
//       prev.map((p) =>
//         p.id === editId
//           ? {
//               ...p,
//               name: formData.name,
//               description: formData.description,
//               updatedAt: new Date().toLocaleDateString(),
//             }
//           : p
//       )
//     );

//     setEditId(null);
//     setFormData({ name: "", description: "" });
//   };

//   // Delete project
//   const removeProject = (id: number) => {
//     setProjectData((prev) => prev.filter((p) => p.id !== id));
//   };

//   return (
//     <div>
//       <div className="bg-card border-b">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between py-6">
//             <div>
//               <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
//               <p className="text-muted-foreground font-bold text-sm">
//                 Control all your projects and monitor their activity in one
//                 place.
//               </p>
//             </div>

//             {/* Create Project Dialog */}
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button className="cursor-pointer">
//                   <Plus className="mr-2 h-4 w-4" />
//                   New Project
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <form onSubmit={handleProjectCreate}>
//                   <DialogHeader>
//                     <DialogTitle>Create Project</DialogTitle>
//                     <DialogDescription>
//                       Add your new project details here.
//                     </DialogDescription>
//                   </DialogHeader>
//                   <div className="grid gap-4">
//                     <div className="grid gap-3">
//                       <Label>Project Name</Label>
//                       <Textarea
//                         placeholder="Type your project name here."
//                         name="name"
//                         value={formData.name}
//                         onChange={handleProjectInput}
//                       />
//                     </div>
//                     <div className="grid gap-3">
//                       <Label>Project Description</Label>
//                       <Textarea
//                         placeholder="Type your description here."
//                         name="description"
//                         value={formData.description}
//                         onChange={handleProjectInput}
//                       />
//                     </div>
//                   </div>
//                   <DialogFooter>
//                     <DialogClose asChild>
//                       <Button variant="outline">Cancel</Button>
//                     </DialogClose>
//                     <Button
//                       type="submit"
//                       disabled={!formData.name || !formData.description}
//                     >
//                       Create Project
//                     </Button>
//                   </DialogFooter>
//                 </form>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>
//       </div>

//       {/* Project List */}
//       <div className="mt-6 space-y-6 px-6">
//         {projectData.map((project) => (
//           <Card
//             key={project.id}
//             className="p-6 hover:bg-muted transition-colors cursor-pointer"
//           >
//             <div className="flex items-start gap-4">
//               <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-12">
//                 <CodeIcon className="w-6 h-6" />
//               </div>
//               <div className="flex-1">
//                 <h1 className="text-2xl font-bold tracking-tight">
//                   {project.name}
//                 </h1>
//                 <CardDescription className="text-muted-foreground">
//                   {project.description}
//                 </CardDescription>
//                 <div className="flex items-center justify-between mt-3">
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <CalendarDaysIcon className="w-4 h-4" />
//                     <span>
//                       {project.updatedAt
//                         ? `Updated on ${project.updatedAt}`
//                         : `Created on ${project.createdAt}`}
//                     </span>
//                   </div>

            
                      
//                         {/* <MoveHorizontalIcon className="w-4 h-4" /> */}
//                        <button
//                       onClick={() => removeProject(project.id)}
//                       className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-8 w-8 text-red-600"
                       
//                     >  
//                       <Trash2 className="h-4 w-4 text-red-600"  onClick={() => removeProject(project.id)} />
//                     </button>
//                       <Dialog>
//                         <DialogTrigger asChild>
//                           <Edit2Icon className="h-4 w-4" onClick={() => handleEditId(project.id)}/>
//                         </DialogTrigger>
//                         <DialogContent className="sm:max-w-[425px]">
//                           <form onSubmit={handleEditProject}>
//                             <DialogHeader>
//                               <DialogTitle>Edit Project</DialogTitle>
//                               <DialogDescription>
//                                 Modify the details and click save.
//                               </DialogDescription>
//                             </DialogHeader>
//                             <div className="grid gap-4">
//                               <div className="grid gap-3">
//                                 <Label>Project Name</Label>
//                                 <Textarea
//                                   name="name"
//                                   value={formData.name}
//                                   onChange={handleProjectInput}
//                                 />
//                               </div>
//                               <div className="grid gap-3">
//                                 <Label>Project Description</Label>
//                                 <Textarea
//                                   name="description"
//                                   value={formData.description}
//                                   onChange={handleProjectInput}
//                                 />
//                               </div>
//                             </div>
//                             <DialogFooter>
//                               <DialogClose asChild>
//                                 <Button variant="outline">Cancel</Button>
//                               </DialogClose>
//                               <Button
//                                 type="submit"
//                                 disabled={
//                                   !formData.name || !formData.description
//                                 }
//                               >
//                                 Save Changes
//                               </Button>
//                             </DialogFooter>
//                           </form>
//                         </DialogContent>
//                       </Dialog>

//                 </div>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Page;



