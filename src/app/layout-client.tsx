// "use client";

// import { usePathname } from "next/navigation";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// export default function LayoutClient({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   const noSidebarRoutes = ["/user/auth/login", "/user/auth/register"];
//   const sidebarRoutes = ["/user/dashboard", "/sidebar/dash/addworksheet",];

//   const isNoSidebarPage = noSidebarRoutes.some(route => pathname.startsWith(route));
//   const isSidebarPage = sidebarRoutes.some(route => pathname.startsWith(route));

//   if (isNoSidebarPage) return <>{children}</>;

//   if (isSidebarPage)
//     return (
//       <SidebarProvider>
        
//         <div className="flex min-h-screen w-full">
           
//           <AppSidebar />
//           <main className="flex-1 p-6">
//               <div className="mb-4">
//               <SidebarTrigger />
//             </div>
//             {children}</main>
//         </div>
//       </SidebarProvider>
       
//     );

//   return <>{children}</>;
// }


"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const noSidebarRoutes = ["/user/auth/login", "/user/auth/register"];
  const sidebarRoutes = ["/user/dashboard", "/sidebar/dash/addworksheet","/sidebar/dash/worksheetdata","/sidebar/dash/addproject","/sidebar/dash/profile"];

  const isNoSidebarPage = noSidebarRoutes.some(route => pathname.startsWith(route));
  const isSidebarPage = sidebarRoutes.some(route => pathname.startsWith(route));

 
  if (isNoSidebarPage) return <>{children}</>;

  if (isSidebarPage)
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
     
          <AppSidebar />

          <main className="flex-1 p-6 overflow-x-auto">
      
            <div className="mb-4">
              <SidebarTrigger className="cursor-pointer" />
            </div>

            <div className="min-w-[300px]">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    );

  // Default fallback
  return <>{children}</>;
}

