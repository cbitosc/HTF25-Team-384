
"use client";

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Maximize, Minimize } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const doctorAvatar = PlaceHolderImages.find(p => p.id === 'doctor-avatar');

export function Teleconsultation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();
  }, [toast]);

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOff(!isVideoOff);
  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
        setIsFullscreen(true);
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
        <Card className="relative overflow-hidden aspect-video md:aspect-auto">
          <CardContent className="p-0 h-full">
            {doctorAvatar && (
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <AvatarImage src={doctorAvatar.imageUrl} alt="Doctor" />
                <AvatarFallback>Dr</AvatarFallback>
              </Avatar>
            )}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <p className="text-white font-semibold text-base sm:text-lg">Dr. Verma is connecting...</p>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden aspect-video md:aspect-auto">
          <CardContent className="p-0 h-full">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            {hasCameraPermission === false && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4">
                    <Alert variant="destructive">
                      <AlertTitle>Camera Access Required</AlertTitle>
                      <AlertDescription>
                        Please allow camera access in your browser settings to use video consultation.
                      </AlertDescription>
                    </Alert>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="bg-background border-t p-2 sm:p-4 flex justify-center items-center gap-2 sm:gap-4">
        <Button variant="outline" size="icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" onClick={toggleMute}>
          {isMuted ? <MicOff /> : <Mic />}
        </Button>
        <Button variant="outline" size="icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" onClick={toggleVideo}>
          {isVideoOff ? <VideoOff /> : <Video />}
        </Button>
        <Button variant="destructive" size="icon" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full">
          <PhoneOff />
        </Button>
        <Button variant="outline" size="icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" onClick={toggleFullscreen}>
          {isFullscreen ? <Minimize /> : <Maximize />}
        </Button>
      </div>
    </div>
  );
}

    