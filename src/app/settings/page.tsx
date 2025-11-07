
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <main className="space-y-4">
        <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="p-0">
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                    Settings
                </h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Aarav Sharma" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="aarav.sharma@example.com" />
                </div>
                <Button>Save Changes</Button>
            </CardContent>
        </Card>
      </main>
    </DashboardLayout>
  );
}
