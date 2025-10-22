import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Bell } from "lucide-react"
export function PrivacySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2sm font-bold">Privacy Settings</CardTitle>
        <CardDescription>Manage your privacy preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="profile-visibility" className="text-2sm font-bold">Profile Visibility</Label>
              <div className="text-sm text-muted-foreground">Control who can see your profile.</div>
            </div>
            <Switch id="profile-visibility" defaultChecked />
          </div>
          <Separator />
          <div className="space-y-3">
            <Label className="text-2sm font-bold">Who can see your activity</Label>
            <RadioGroup defaultValue="everyone">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="everyone" id="everyone" />
                <Label htmlFor="everyone">Everyone</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="followers" id="followers" />
                <Label htmlFor="followers">Followers only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nobody" id="nobody" />
                <Label htmlFor="nobody">Nobody</Label>
              </div>
            </RadioGroup>
          </div>
          <Separator />
          {/* <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="data-collection">Data Collection</Label>
              <div className="text-sm text-muted-foreground">
                Allow us to collect usage data to improve our service.
              </div>
            </div>
            <Switch id="data-collection" defaultChecked />
          </div> */}

          <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    
                    <h3 className=" text-2sm font-bold">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 cursor-pointer px-3">
                    Enable
                  </button>
                </div>


        </div>
      </CardContent>
      <CardFooter>
        {/* <Button>Save Privacy Settings</Button> */}
      </CardFooter>
    </Card>
  )
}

