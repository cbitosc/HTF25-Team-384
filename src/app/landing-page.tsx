
import { Stethoscope, HeartPulse, User, ArrowRight, BrainCircuit, ShieldCheck, BellRing, Check, Lightbulb, BookOpen, FileHeart, BadgeHelp, Users, ListFilter, TrendingUp, Link as LinkIcon, Target, Languages, Video, PersonStanding, Siren } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const heroImage = PlaceHolderImages.find(p => p.id === 'landing-hero');
const heroBgImage = PlaceHolderImages.find(p => p.id === 'landing-hero-bg');

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <Link href="/" className="flex items-center justify-center">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold font-headline tracking-wider text-primary">MediHub</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#audience" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            For Patients & Doctors
          </Link>
           <Link href="/dashboard">
              <Button>Go to App</Button>
            </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
          {heroBgImage && (
            <Image
              src={heroBgImage.imageUrl}
              alt="Abstract medical background"
              fill
              className="object-cover z-0 blur-2xl opacity-20"
              data-ai-hint="abstract medical"
            />
          )}
          <div className="container px-4 md:px-6 z-10 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                   <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold">Your Health, Simplified</div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-foreground">
                    Intelligent Healthcare at Your Fingertips
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    MediHub provides AI-powered insights, secure document storage, and seamless health management to empower your wellness journey.
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button size="lg" className="shadow-md">
                      <User className="mr-2 h-5 w-5" />
                      I am a Patient
                    </Button>
                  </Link>
                  <Link href="/doctor-dashboard">
                    <Button size="lg" variant="outline" className="text-foreground">
                      <Stethoscope className="mr-2 h-5 w-5" />
                      I am a Doctor
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative flex justify-center items-center mt-8 lg:mt-0">
                {heroImage && (
                    <Image
                      src={heroImage.imageUrl}
                      alt="A doctor consulting with a patient in a futuristic setting"
                      width={600}
                      height={400}
                      className="rounded-xl shadow-2xl object-cover"
                      data-ai-hint="futuristic healthcare"
                    />
                )}
             </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A New Era of Personal Health</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover how MediHub's integrated features for patients and doctors provide a comprehensive and proactive approach to health.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-12 mt-12">
              <div className="bg-background rounded-xl shadow-md p-6 flex flex-col gap-3 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <BrainCircuit className="w-7 h-7"/>
                  </div>
                  <h3 className="text-xl font-bold">AI Symptom Checker</h3>
                </div>
                <p className="text-sm text-muted-foreground">Get instant, AI-driven analysis of your symptoms to make informed decisions about your health.</p>
              </div>
              <div className="bg-background rounded-xl shadow-md p-6 flex flex-col gap-3 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <ListFilter className="w-7 h-7"/>
                    </div>
                    <h3 className="text-xl font-bold">Patient Prioritization</h3>
                </div>
                <p className="text-sm text-muted-foreground">For doctors: AI ranks patients by risk level, ensuring critical cases get immediate attention.</p>
              </div>
              <div className="bg-background rounded-xl shadow-md p-6 flex flex-col gap-3 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <BellRing className="w-7 h-7"/>
                    </div>
                    <h3 className="text-xl font-bold">Preventive Nudges</h3>
                </div>
                <p className="text-sm text-muted-foreground">Receive smart alerts based on your vitals to proactively manage your health and prevent issues.</p>
              </div>
               <div className="bg-background rounded-xl shadow-md p-6 flex flex-col gap-3 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <BadgeHelp className="w-7 h-7"/>
                    </div>
                    <h3 className="text-xl font-bold">ELI5 Mode</h3>
                </div>
                <p className="text-sm text-muted-foreground">Simplify complex medical terms and instructions into easy-to-understand language with audio.</p>
              </div>
               <div className="bg-background rounded-xl shadow-md p-6 flex flex-col gap-3 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <TrendingUp className="w-7 h-7"/>
                    </div>
                    <h3 className="text-xl font-bold">Community Health Insights</h3>
                </div>
                <p className="text-sm text-muted-foreground">Doctors can view aggregate health trends to detect outbreaks and improve public health.</p>
              </div>
               <div className="bg-background rounded-xl shadow-md p-6 flex flex-col gap-3 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <LinkIcon className="w-7 h-7"/>
                    </div>
                    <h3 className="text-xl font-bold">One-Click Pharmacy Connect</h3>
                </div>
                <p className="text-sm text-muted-foreground">Doctors can approve and send prescriptions directly to a local pharmacy, closing the loop on patient care.</p>
              </div>
               <div className="bg-background rounded-xl shadow-md p-6 flex flex-col gap-3 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <ShieldCheck className="w-7 h-7"/>
                    </div>
                    <h3 className="text-xl font-bold">Emergency Red-Flag Alerts</h3>
                </div>
                <p className="text-sm text-muted-foreground">Doctors get real-time alerts for dangerous symptom patterns, enabling immediate action.</p>
              </div>
              <div className="bg-background rounded-xl shadow-md p-6 flex flex-col gap-3 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <Video className="w-7 h-7"/>
                    </div>
                    <h3 className="text-xl font-bold">Live Teleconsultation</h3>
                </div>
                <p className="text-sm text-muted-foreground">Connect with your doctor for a face-to-face consultation from the comfort of your home.</p>
              </div>
              <div className="bg-background rounded-xl shadow-md p-6 flex flex-col gap-3 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <Languages className="w-7 h-7"/>
                    </div>
                    <h3 className="text-xl font-bold">Multilingual Support</h3>
                </div>
                <p className="text-sm text-muted-foreground">Access healthcare information and support in your preferred local language.</p>
              </div>
              <div className="bg-background rounded-xl shadow-md p-6 flex flex-col gap-3 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <FileHeart className="w-7 h-7"/>
                    </div>
                    <h3 className="text-xl font-bold">Explain My Report</h3>
                </div>
                <p className="text-sm text-muted-foreground">AI translates complex lab reports into simple, understandable summaries and explanations.</p>
              </div>
              <div className="bg-background rounded-xl shadow-md p-6 flex flex-col gap-3 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <Target className="w-7 h-7"/>
                    </div>
                    <h3 className="text-xl font-bold">Personalized Health Plan</h3>
                </div>
                <p className="text-sm text-muted-foreground">Track daily health goals for hydration, exercise, and diet, tailored just for you.</p>
              </div>
              <div className="bg-background rounded-xl shadow-md p-6 flex flex-col gap-3 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <PersonStanding className="w-7 h-7"/>
                    </div>
                    <h3 className="text-xl font-bold">Mental Wellness</h3>
                </div>
                <p className="text-sm text-muted-foreground">Find calm and relaxation with guided meditations and mood tracking features.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="audience" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">For Patients & Doctors</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Empowering every user in the healthcare ecosystem.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-1 md:grid-cols-2 md:gap-12 mt-12">
              <div className="bg-background rounded-xl shadow-md p-8 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <User className="w-7 h-7"/>
                  </div>
                  <h3 className="text-2xl font-bold">For Patients</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-1 text-primary flex-shrink-0"/>
                        <span>Get instant analysis of your symptoms with our AI Health Assistant.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-1 text-primary flex-shrink-0"/>
                        <span>Understand complex medical terms with our AI-powered "Explain Like I'm 5" mode.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-1 text-primary flex-shrink-0"/>
                        <span>Securely store and access all your health records and prescriptions in one place.</span>
                    </li>
                     <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-1 text-primary flex-shrink-0"/>
                        <span>Book appointments and order medicines with just a few clicks.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-1 text-primary flex-shrink-0"/>
                        <span>Send an SOS alert to emergency contacts and local services in case of an emergency.</span>
                    </li>
                </ul>
              </div>
              <div className="bg-background rounded-xl shadow-md p-8 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <Stethoscope className="w-7 h-7"/>
                    </div>
                    <h3 className="text-2xl font-bold">For Doctors</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-1 text-primary flex-shrink-0"/>
                        <span>Prioritize critical patients with the AI-powered Smart Patient Queue.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-1 text-primary flex-shrink-0"/>
                        <span>Monitor community health trends to detect and act on outbreaks early.</span>
                    </li>
                     <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-1 text-primary flex-shrink-0"/>
                        <span>Engage with patient caregivers and send reminders to improve compliance.</span>
                    </li>
                     <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-1 text-primary flex-shrink-0"/>
                        <span>Approve prescriptions and connect directly with pharmacies in one click.</span>
                    </li>
                     <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-1 text-primary flex-shrink-0"/>
                        <span>Track patient medication adherence with an easy-to-read compliance score.</span>
                    </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>
      <footer className="bg-secondary border-t py-12">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-6">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center">
              <HeartPulse className="h-7 w-7 text-primary" />
              <span className="ml-2 text-2xl font-bold font-headline tracking-wider text-primary">MediHub</span>
            </Link>
            <p className="text-sm max-w-md text-muted-foreground">
             Empowering your health journey with AI-driven insights and a user-centric design.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Navigate</h4>
            <nav className="grid gap-2">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Join Our Newsletter</h4>
            <p className="text-sm text-muted-foreground">Stay updated on health tech and MediHub features.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input type="email" placeholder="Enter your email" className="bg-background border-border" />
              <Button type="submit" variant="secondary" className="bg-secondary/90 hover:bg-secondary text-secondary-foreground">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="container mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; MediHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

    