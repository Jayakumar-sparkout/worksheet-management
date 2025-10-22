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


