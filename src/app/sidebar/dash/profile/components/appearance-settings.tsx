"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme } from "./theme-provider"
import { Switch } from "@/components/ui/switch"
export function AppearanceSettings() {
  const { setTheme } = useTheme()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2sm font-bold">Appearance</CardTitle>
        <CardDescription>Customize how the application looks on your device.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <Label>Theme</Label>

<div className="flex items-center justify-between">
            <div className="space-y-0.5">
               <Label htmlFor="light">Light</Label>
              {/* <div className="text-sm text-muted-foreground">Receive emails about your account security.</div> */}
            </div>
            <Switch id="security-emails" className="cursor-pointer" defaultChecked />
          </div>


             </div>
             <div className="flex items-center justify-between">
            <div className="space-y-0.5">
               <Label htmlFor="dark">Dark</Label>
              </div>
            <Switch id="security-emails" className="cursor-pointer" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
               <Label htmlFor="dark">System</Label>
              </div>
            <Switch id="security-emails" className="cursor-pointer" defaultChecked />
          </div>
              {/* <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark">Dark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system">System</Label>
              </div> */}
            
          
        </div>
      </CardContent>
      <CardFooter>
        {/* <Button>Save Appearance</Button> */}
      </CardFooter>
    </Card>
  )
}

