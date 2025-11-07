'use client';
import Image from 'next/image';
import { caregivers as initialCaregivers } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useTranslation } from '@/hooks/use-translation';

const caregiverAvatars = PlaceHolderImages.filter(p => p.id.startsWith('caregiver-avatar'));

export function FamilyHealthHub() {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [caregivers, setCaregivers] = useState(initialCaregivers);
    const [newName, setNewName] = useState('');
    const [newRelationship, setNewRelationship] = useState('');

    const handleAddMember = () => {
        if (!newName || !newRelationship) {
            toast({
                variant: 'destructive',
                title: "Missing Information",
                description: "Please enter a name and relationship.",
            });
            return;
        }

        const newMember = {
            id: `care-${Date.now()}`,
            name: newName,
            relationship: newRelationship,
            avatarUrl: '', // No avatar for new members for now
        };
        
        setCaregivers([...caregivers, newMember]);
        setNewName('');
        setNewRelationship('');

        toast({
            title: "Family Member Added",
            description: `${newName} has been added to your health hub.`,
        });
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <span>{t('caregivers_title')}</span>
        </CardTitle>
        <CardDescription>{t('caregivers_description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {caregivers.map((caregiver, index) => {
            const avatar = caregiverAvatars[index % caregiverAvatars.length];
            return (
              <div key={caregiver.id} className="flex items-center space-x-4">
                <Avatar>
                  {avatar && caregiver.avatarUrl && (
                     <AvatarImage src={avatar.imageUrl} alt={caregiver.name} data-ai-hint="person portrait" />
                  )}
                  <AvatarFallback>{caregiver.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{caregiver.name}</p>
                  <p className="text-sm text-muted-foreground">{caregiver.relationship}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <UserPlus className="mr-2 h-4 w-4" />
              {t('caregivers_add_member')}
            </Button>
          </DialogTrigger>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Add Family Member</DialogTitle>
                  <DialogDescription>
                      Enter the details of the new family member to add them to your hub.
                  </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Name</Label>
                      <Input id="name" value={newName} onChange={(e) => setNewName(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="relationship" className="text-right">Relationship</Label>
                      <Input id="relationship" value={newRelationship} onChange={(e) => setNewRelationship(e.target.value)} className="col-span-3" />
                  </div>
              </div>
              <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="submit" onClick={handleAddMember}>Add Member</Button>
                  </DialogClose>
              </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
