"use client"

import React, { useState, useMemo, useEffect } from "react";
import {
  Plus,
  CodeIcon,
  CalendarDaysIcon,
  Trash2,
  Edit2Icon,
} from "lucide-react";

import { Card, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type Project = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

const Page = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [createProject, setCreateProject] = useState({ name: "", description: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [notFound,setNotFound]=useState<boolean>(false)
  const [projectData, setProjectData] = useState<Project[]>([
    {
      id: 1,
      name: "RealWorld",
      description:
        "Developed a fully functional RealWorld web application that replicates a production-ready blogging platform similar to Medium. The project demonstrates real-world architecture and best practices using the MERN stack MongoDB, Express.js, React.js, Node.js. Users can register — all with JWT-based authentication and RESTful APIs.",
      createdAt: "14/10/2025",
      updatedAt: "",
    },
  ]);
  const [editId, setEditId] = useState<number | null>(null);

  const handleProjectInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setCreateProject(prev => ({ ...prev, [name]: value }));

  };

  const handleProjectCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: Math.max(0, ...projectData.map(p => p.id)) + 1,
      name: formData.name.trim(),
      description: formData.description.trim(),
      createdAt: new Date().toLocaleDateString(),
      updatedAt: "",
    };
    setProjectData(prev => [newProject, ...prev]);
    setFormData({ name: "", description: "" });
  };

  const handleEditId = (id: number) => {
    const project = projectData.find(p => p.id === id);
    if (project) {
      setEditId(id);
      setFormData({ name: project.name, description: project.description });
    }
  };

  const handleEditProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId === null) return;

    setProjectData(prev =>
      prev.map(p =>
        p.id === editId
          ? { ...p, name: formData.name, description: formData.description, updatedAt: new Date().toLocaleDateString() }
          : p
      )
    );

    setEditId(null);
    setFormData({ name: "", description: "" });
  };

  const removeProject = (id: number) => {
    setProjectData(prev => prev.filter(p => p.id !== id));
  };

  const filteredProjects = useMemo(
    () =>
      
      projectData.filter(
        p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) 
          // p.name.toLowerCase().includes(searchTerm.toLowerCase())       
      ),

      
    [projectData, searchTerm],

 );

 

useEffect(()=>{

if(projectData.length===0){
  setNotFound(true)
}else{
  setNotFound(false)
}
},[filteredProjects,projectData,])

  return (
    <div>
      
      <div className="bg-card border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
              <p className="text-muted-foreground font-bold text-sm">
                Control all your projects and monitor their activity in one place.
              </p>
            </div>

            {/* Create Project Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="cursor-pointer"
                  onClick={() => setCreateProject({ name: "", description: "" })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleProjectCreate}>
                  <DialogHeader>
                    <DialogTitle className="font-bold">Create Project</DialogTitle>
                    <DialogDescription>Add your new project details here.</DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4">
                    <div className="grid gap-3 mt-4">
                      <Label className="font-bold mt-3">Project Name</Label>
                      <input
                        type="text"
                        placeholder="Type your project name here."
                        name="name"
                        value={createProject.name}
                        onChange={handleProjectInput}
                        className="border border-input bg-background rounded-md px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label className="font-bold mt-3">Project Description</Label>
                      <Textarea
                        placeholder="Type your description here."
                        name="description"
                        value={createProject.description}
                        onChange={handleProjectInput}
                      />
                    </div>
                  </div>

                  <DialogFooter className="mt-5">
                    <DialogClose asChild>
                      <Button variant="outline" className="cursor-pointer">
                        Cancel
                      </Button>
                    </DialogClose>

                    <DialogClose asChild>
                      <Button
                        type="submit"
                        disabled={!createProject.name || !createProject.description}
                        className="cursor-pointer"
                      >
                        Create Project
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

    
      <div className="mt-6 px-6">
        <Input
          placeholder="Search Project Name"
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-6 space-y-6 px-6">
        {filteredProjects.map(project => (
          <Card key={project.id} className="p-6 hover:bg-muted transition-colors cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-12">
                <CodeIcon className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
                <CardDescription className="text-muted-foreground">{project.description}</CardDescription>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>
                      {project.updatedAt
                        ? `Updated on ${project.updatedAt}`
                        : `Created on ${project.createdAt}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                   
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="cursor-pointer">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            project details.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="cursor-pointer"
                            onClick={() => {
                              removeProject(project.id);
                              toast("Project Deleted", {
                                position: "top-right",
                                description: "Your Project Deleted Successfully!",
                              });
                            }}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    {/* Edit Project Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => handleEditId(project.id)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        >
                          <Edit2Icon className="h-4 w-4 cursor-pointer" />
                        </button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleEditProject}>
                          <DialogHeader>
                            <DialogTitle className="font-bold">Edit Project</DialogTitle>
                            <DialogDescription>Modify the details and click save.</DialogDescription>
                          </DialogHeader>

                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label className="font-bold mt-3">Project Name</Label>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleProjectInput}
                                className="border border-input bg-background rounded-md px-3 py-2 text-sm"
                              />
                            </div>

                            <div className="grid gap-3">
                              <Label className="font-bold mt-3">Project Description</Label>
                              <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleProjectInput}
                              />
                            </div>
                          </div>

                          <DialogFooter className="mt-4">
                            <DialogClose asChild>
                              <Button variant="outline" className="cursor-pointer">
                                Cancel
                              </Button>
                            </DialogClose>

                            <DialogClose asChild>
                              <Button
                                type="submit"
                                className="cursor-pointer"
                                disabled={!formData.name || !formData.description}
                              >
                                Save Changes
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {notFound && (
      <p className="text-center text-2sm  font-bold mt-10">Not Found</p>
      )}
    </div>
  );
};

export default Page;
