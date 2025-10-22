import { ProfileHeader } from "./components/profile-header"
import { AccountSettings } from "./components/account-settings"
import { NotificationSettings } from "./components/notification-setting"
import { PrivacySettings } from "./components/privacy-settings"
import { AppearanceSettings } from "./components/appearance-settings"

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-10 space-y-8 ">
      <h1 className="text-2xl font-bold">Profile & Settings</h1> 
     
      <div className="grid gap-8">
        <ProfileHeader />
        <div className="flex gap-8 ">
          {/* <div className="hidden md:block space-y-2">
             <div className="font-medium text-lg">Settings</div>
            <nav className="grid gap-1">
              <a href="#account" className="px-3 py-2 text-sm rounded-md bg-muted">
                Account
              </a>
              <a href="#notifications" className="px-3 py-2 text-sm rounded-md hover:bg-muted">
                Notifications
              </a>
              <a href="#privacy" className="px-3 py-2 text-sm rounded-md hover:bg-muted">
                Privacy
              </a>
              <a href="#appearance" className="px-3 py-2 text-sm rounded-md hover:bg-muted">
                Appearance
              </a>
            </nav>
          </div>  */}
          <div className="space-y-10 w-full">
            <section id="account">
              <AccountSettings />
            </section>
            <section id="notifications">
              <NotificationSettings />
            </section>
            <section id="privacy">
              <PrivacySettings />
            </section>
            <section id="appearance">
              <AppearanceSettings />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}



//



// 'use client'
// import React from 'react';
// import { ArrowLeft, User, Mail, Calendar, Shield, Key, Bell, Globe } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// const ProfilePage = () => {
//   const router = useRouter();

//   const handleBack = () => {
//     router.back();
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
      

//       {/* Content */}
//       <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
//         <div className="space-y-6">
//           {/* Profile Information */}
//           <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
//             <div className="p-6">
//               <h2 className="text-lg font-semibold flex items-center">
//                 <User className="mr-2 h-5 w-5 text-blue-600" />
//                 Profile Information
//               </h2>
//               <p className="text-sm text-muted-foreground">Your personal account details</p>
//             </div>
//             <div className="p-6 pt-0">
//               <div className="grid gap-6 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Full Name</label>
//                   <div className="flex items-center space-x-2">
//                     <User className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm">John Doe</span>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Email Address</label>
//                   <div className="flex items-center space-x-2">
//                     <Mail className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm">john@example.com</span>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Member Since</label>
//                   <div className="flex items-center space-x-2">
//                     <Calendar className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm">January 15, 2024</span>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Account Status</label>
//                   <div className="flex items-center space-x-2">
//                     <Shield className="h-4 w-4 text-green-600" />
//                     <span className="text-sm text-green-600">Active</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Security Settings */}
//           <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
//             <div className="p-6">
//               <h2 className="text-lg font-semibold flex items-center">
//                 <Key className="mr-2 h-5 w-5 text-orange-600" />
//                 Security Settings
//               </h2>
//               <p className="text-sm text-muted-foreground">Manage your account security</p>
//             </div>
//             <div className="p-6 pt-0">
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-4 border rounded-lg">
//                   <div>
//                     <h3 className="font-medium">Change Password</h3>
//                     <p className="text-sm text-muted-foreground">Update your account password</p>
//                   </div>
//                   <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
//                     Change
//                   </button>
//                 </div>
                
//                 <div className="flex items-center justify-between p-4 border rounded-lg">
//                   <div>
//                     <h3 className="font-medium">Two-Factor Authentication</h3>
//                     <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
//                   </div>
//                   <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
//                     Enable
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Preferences */}
//           <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
//             <div className="p-6">
//               <h2 className="text-lg font-semibold flex items-center">
//                 <Bell className="mr-2 h-5 w-5 text-purple-600" />
//                 Preferences
//               </h2>
//               <p className="text-sm text-muted-foreground">Customize your experience</p>
//             </div>
//             <div className="p-6 pt-0">
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-4 border rounded-lg">
//                   <div>
//                     <h3 className="font-medium">Email Notifications</h3>
//                     <p className="text-sm text-muted-foreground">Receive updates about your projects</p>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input type="checkbox" className="sr-only peer" defaultChecked />
//                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                   </label>
//                 </div>
                
//                 <div className="flex items-center justify-between p-4 border rounded-lg">
//                   <div>
//                     <h3 className="font-medium">Dark Mode</h3>
//                     <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input type="checkbox" className="sr-only peer" />
//                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* API Usage */}
//           <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
//             <div className="p-6">
//               <h2 className="text-lg font-semibold flex items-center">
//                 <Globe className="mr-2 h-5 w-5 text-green-600" />
//                 API Usage
//               </h2>
//               <p className="text-sm text-muted-foreground">Monitor your API consumption</p>
//             </div>
//             <div className="p-6 pt-0">
//               <div className="grid gap-4 md:grid-cols-3">
//                 <div className="text-center p-4 border rounded-lg">
//                   <div className="text-2xl font-bold text-blue-600">1,247</div>
//                   <div className="text-sm text-muted-foreground">Requests Today</div>
//                 </div>
//                 <div className="text-center p-4 border rounded-lg">
//                   <div className="text-2xl font-bold text-green-600">99.2%</div>
//                   <div className="text-sm text-muted-foreground">Success Rate</div>
//                 </div>
//                 <div className="text-center p-4 border rounded-lg">
//                   <div className="text-2xl font-bold text-orange-600">45ms</div>
//                   <div className="text-sm text-muted-foreground">Avg Response</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
