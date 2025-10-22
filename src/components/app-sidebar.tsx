"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user"
import { Workflow, DatabaseZap, ProjectorIcon, User2 } from "lucide-react"

const data = {
  user: {
    name: "jayakumar",
    email: "vjayakumar@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Building Your Application",
      url: "#",
      items: [
        {
          title: "Add Worksheet",
          url: "/sidebar/dash/addworksheet",
          icon: Workflow,
        },
        {
          title: "Worksheet Data",
          url: "/sidebar/dash/worksheetdata",
          icon: DatabaseZap,
        },
        {
          title: "Add Project",
          url: "/sidebar/dash/addproject",
          icon: ProjectorIcon,
        },
        {
          title: "Profile",
          url: "/sidebar/dash/profile",
          icon: User2,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h1 className="text-sm mt-2 text-green-600 text-center">
          Manage your Worksheet
        </h1>
        {/* <SearchForm /> */}
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url
                  const Icon = item.icon

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`text-sm transition-colors ${isActive
                            ? "text-sm bg-black-200  font-bold"
                            : "text-sm"
                          }`}
                      >
                        <Link href={item.url}>
                          {Icon && <Icon className="mr-2 h-4 w-4" />}
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
