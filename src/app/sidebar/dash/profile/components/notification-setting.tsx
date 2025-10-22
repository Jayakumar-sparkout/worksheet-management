import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Bell,Globe } from "lucide-react"
export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
       
        <CardTitle className="flex text-2sm font-bold mr-2">Notification Settings 
          <Bell className="ml-6 h-5 w-5 text-black-600" />
           </CardTitle>
          
        <CardDescription>Configure how you receive notifications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications " >Email Notifications</Label>
              <div className="text-sm text-muted-foreground">Receive notifications via email.</div>
            </div>
            <Switch id="email-notifications" className="text-purple-600 cursor-pointer" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing-emails">Marketing Emails</Label>
              <div className="text-sm text-muted-foreground">Receive emails about new features and updates.</div>
            </div>
            <Switch id="marketing-emails" className="cursor-pointer" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="security-emails">Security Emails</Label>
              <div className="text-sm text-muted-foreground">Receive emails about your account security.</div>
            </div>
            <Switch id="security-emails" className="cursor-pointer" defaultChecked />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {/* <Button>Save Preferences</Button> */}
      </CardFooter>
    </Card>
  )
}

