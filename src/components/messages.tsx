"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Mic, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');
const doctorAvatar = PlaceHolderImages.find(p => p.id === 'doctor-avatar');

type Message = {
    id: number;
    sender: 'user' | 'doctor';
    text: string;
    timestamp: string;
};

const initialMessages: Message[] = [
    { id: 1, sender: 'doctor', text: "Hello! How are you feeling today?", timestamp: "10:00 AM" },
    { id: 2, sender: 'user', text: "I'm feeling a bit better, thank you for asking.", timestamp: "10:01 AM" },
];

export function Messages() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if(scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const message: Message = {
            id: messages.length + 1,
            sender: 'user',
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };

    const handleVoiceMessage = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            toast({
                variant: 'destructive',
                title: 'Voice Recognition Not Supported',
                description: 'Your browser does not support this feature.',
            });
            return;
        }

        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            toast({ title: 'Listening...', description: 'Please speak your message.' });
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (event: any) => {
            setIsListening(false);
            toast({
                variant: 'destructive',
                title: 'Voice Recognition Error',
                description: event.error === 'not-allowed' ? 'Microphone access denied.' : 'An error occurred.',
            });
        };

        recognition.onresult = (event: any) => {
            const spokenText = event.results[0][0].transcript;
            setNewMessage(spokenText);
            toast({ title: 'Message Transcribed', description: 'Your voice message has been converted to text.' });
        };

        recognition.start();
    };

    return (
        <Card className="flex flex-col flex-1">
            <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full" ref={scrollAreaRef}>
                    <div className="p-4 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={cn('flex items-end gap-2', msg.sender === 'user' ? 'justify-end' : '')}>
                                {msg.sender === 'doctor' && doctorAvatar && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={doctorAvatar.imageUrl} />
                                        <AvatarFallback>Dr</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn('max-w-2xl rounded-lg p-3 text-sm', msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                    <p>{msg.text}</p>
                                    <p className={cn("text-xs mt-1", msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{msg.timestamp}</p>
                                </div>
                                {msg.sender === 'user' && userAvatar &&(
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={userAvatar.imageUrl} />
                                        <AvatarFallback>Me</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 border-t">
                <div className="flex w-full items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button type="button" size="icon" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                    </Button>
                    <Button type="button" size="icon" variant="outline" onClick={handleVoiceMessage}>
                        {isListening ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
