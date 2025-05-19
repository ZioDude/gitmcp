import Image from "next/image";
import WordRotate from "@/components/magicui/word-rotate";
import { Button } from "@/components/ui/button";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import TypingAnimation from "@/components/magicui/typing-animation";
import AnimatedList from "@/components/magicui/animated-list";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PlaceholderIcon from "@/components/ui/placeholder-icon";

export default function HomePage() {
  const serviceFeatures = [
    { 
      Icon: PlaceholderIcon,
      name: "Targeted Ad Campaigns", 
      description: "Reach the right audience with precision-targeted ad campaigns on multiple platforms.", 
      href: "#", 
      cta: "Learn More", 
      background: <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black/50 to-purple-800/50 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>,
      className: "col-span-3 lg:col-span-1"
    },
    {
      Icon: PlaceholderIcon,
      name: "Content Marketing & SEO",
      description: "Engage prospects with valuable, SEO-optimized content that converts readers into leads.",
      href: "#",
      cta: "Learn More",
      background: <div className="absolute inset-0 bg-gradient-to-br from-purple-800/50 via-black/50 to-purple-900/50 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>,
      className: "col-span-3 lg:col-span-1"
    },
    { 
      Icon: PlaceholderIcon,
      name: "Conversion Rate Optimization", 
      description: "Turn more visitors into paying customers with our data-driven CRO strategies.", 
      href: "#", 
      cta: "Learn More", 
      background: <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black/50 to-purple-700/50 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>,
      className: "col-span-3 lg:col-span-1"
    },
     { 
      Icon: PlaceholderIcon,
      name: "Lead Nurturing Automation", 
      description: "Automate your follow-up process and nurture leads effectively through the sales funnel.", 
      href: "#", 
      cta: "Learn More", 
      background: <div className="absolute inset-0 bg-gradient-to-br from-purple-700/50 via-black/50 to-purple-800/50 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>,
      className: "col-span-3 lg:col-span-2"
    },
    {
      Icon: PlaceholderIcon,
      name: "Analytics & Reporting",
      description: "Track your success and optimize for better results with detailed insights and transparent reporting.",
      href: "#",
      cta: "Learn More",
      background: <div className="absolute inset-0 bg-gradient-to-br from-purple-800/50 via-black/50 to-purple-900/50 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>,
      className: "col-span-3 lg:col-span-1"
    },
  ];

  const benefits = [
    { title: "Increased Lead Quality", description: "Get more qualified leads ready to convert." },
    { title: "Higher Conversion Rates", description: "Optimize your funnel for maximum conversions." },
    { title: "Measurable ROI", description: "Track your investment and see tangible results." },
    { title: "Sustainable Growth", description: "Build a scalable lead generation engine for long-term success." },
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "$99",
      period: "/mo",
      description: "Perfect for individuals and small teams getting started.",
      features: ["Basic Lead Gen Tools", "Up to 500 Leads", "Email Support"],
      cta: "Choose Plan"
    },
    {
      name: "Pro",
      price: "$249",
      period: "/mo",
      description: "Ideal for growing businesses needing more power and support.",
      features: ["Advanced Lead Gen Tools", "Up to 2000 Leads", "Priority Email Support", "Analytics Dashboard"],
      cta: "Choose Plan",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored solutions for large organizations with specific needs.",
      features: ["All Pro Features", "Unlimited Leads", "Dedicated Account Manager", "Custom Integrations"],
      cta: "Contact Sales"
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black text-white overflow-x-hidden">
      <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]",
          "inset-0 h-full w-full",
        )}
      />
      
      <nav className="z-20 fixed top-0 left-0 right-0 p-4 bg-black/30 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-xl font-bold text-purple-400">LeadGen Magic</span>
          <div className="space-x-4">
            <a href="#services" className="hover:text-purple-300 transition-colors">Services</a>
            <a href="#about" className="hover:text-purple-300 transition-colors">About Us</a>
            <a href="#benefits" className="hover:text-purple-300 transition-colors">Benefits</a>
            <a href="#pricing" className="hover:text-purple-300 transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-purple-300 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main className="z-10 mt-20 flex flex-col items-center p-4 md:p-12 lg:p-24 w-full">
        <section id="hero" className="w-full max-w-5xl text-center py-16 md:py-28">
          <p className="text-lg md:text-xl text-purple-300 mb-4">
            Stop Searching, Start Converting
          </p>
          <WordRotate
            words={[
              "Supercharge Your Leads",
              "Boost Your Sales",
              "Grow Your Business",
              "Connect With Clients",
            ]}
            className="text-5xl md:text-7xl font-bold text-center text-white drop-shadow-lg"
            motionProps={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -20 },
              transition: { duration: 0.35, ease: "easeOut" },
            }}
          />
          <p className="mt-8 text-md md:text-lg text-purple-300/90 max-w-2xl mx-auto">
            We provide cutting-edge solutions to help you find and connect with your ideal customers. Turn prospects into loyal clients with our proven strategies and magical touch.
          </p>
          <Button size="lg" className="mt-10 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-150 ease-in-out hover:scale-105">
            Unlock Your Growth
          </Button>
        </section>

        <section id="services" className="w-full max-w-6xl py-16 md:py-24">
          <h2 className="text-4xl font-bold text-center mb-4 text-purple-300">Our Magical Services</h2>
          <p className="text-lg text-center text-purple-400/80 mb-12 max-w-2xl mx-auto">
            Discover how our tailored lead generation services can propel your business to new heights.
          </p>
          <BentoGrid className="lg:grid-cols-3">
            {serviceFeatures.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </section>

        <section id="about" className="w-full max-w-4xl py-16 md:py-24 text-center">
          <h2 className="text-4xl font-bold mb-6 text-purple-300">About LeadGen Magic</h2>
          <TypingAnimation
            className="text-xl text-purple-400/90 leading-relaxed max-w-3xl mx-auto"
            text="We are a team of passionate marketers and tech wizards dedicated to transforming your lead generation. With years of experience and a sprinkle of magic, we craft strategies that deliver real, measurable results. Our mission is to empower businesses like yours to connect with their ideal customers and achieve unprecedented growth."
          />
        </section>

        <section id="benefits" className="w-full max-w-5xl py-16 md:py-24">
          <h2 className="text-4xl font-bold text-center mb-12 text-purple-300">Why Choose Us?</h2>
          <AnimatedList
            className="grid md:grid-cols-2 gap-8"
            items={benefits.map((benefit, i) => ({
              id: i,
              component: (
                <div className="p-6 bg-black/40 border border-purple-700/50 rounded-lg shadow-xl backdrop-blur-sm">
                  <h3 className="text-2xl font-semibold text-purple-200 mb-3">{benefit.title}</h3>
                  <p className="text-purple-400/80">{benefit.description}</p>
                </div>
              )
            }))}
          />
        </section>

        <section id="pricing" className="w-full max-w-6xl py-16 md:py-24">
          <h2 className="text-4xl font-bold text-center mb-4 text-purple-300">Flexible Pricing Plans</h2>
          <p className="text-lg text-center text-purple-400/80 mb-12 max-w-2xl mx-auto">
            Choose the plan that best suits your business needs and budget. No hidden fees, just pure magic.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <Card key={tier.name} className={cn(
                "bg-black/40 border-purple-700/50 flex flex-col",
                tier.popular ? "border-2 border-purple-500 shadow-2xl shadow-purple-500/30" : ""
              )}>
                <CardHeader className="text-center">
                  {tier.popular && <div className="text-xs uppercase text-purple-400 font-semibold tracking-wider mb-2">Most Popular</div>}
                  <CardTitle className="text-3xl font-bold text-purple-200">{tier.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-5xl font-extrabold text-white">{tier.price}</span>
                    {tier.period && <span className="text-xl font-medium text-purple-400/80">{tier.period}</span>}
                  </div>
                  <CardDescription className="mt-3 text-purple-400/70">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <PlaceholderIcon className="h-5 w-5 mr-2 text-green-400" />
                        <span className="text-purple-300/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 transform transition-all duration-150 ease-in-out hover:scale-105">
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact" className="w-full max-w-2xl py-16 md:py-24">
          <h2 className="text-4xl font-bold text-center mb-4 text-purple-300">Get In Touch</h2>
          <p className="text-lg text-center text-purple-400/80 mb-12 max-w-xl mx-auto">
            Ready to experience the magic? Fill out the form below and let's discuss your project.
          </p>
          <form className="space-y-6 bg-black/40 border border-purple-700/50 p-8 rounded-lg shadow-xl backdrop-blur-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-purple-300">Full Name</Label>
                <Input id="name" type="text" placeholder="Your Name" className="mt-1 bg-black/50 border-purple-600/70 focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <Label htmlFor="email" className="text-purple-300">Email Address</Label>
                <Input id="email" type="email" placeholder="your@email.com" className="mt-1 bg-black/50 border-purple-600/70 focus:ring-purple-500 focus:border-purple-500" />
              </div>
            </div>
            <div>
              <Label htmlFor="company" className="text-purple-300">Company (Optional)</Label>
              <Input id="company" type="text" placeholder="Your Company" className="mt-1 bg-black/50 border-purple-600/70 focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <div>
              <Label htmlFor="message" className="text-purple-300">Message</Label>
              <Textarea id="message" placeholder="How can we help you?" rows={5} className="mt-1 bg-black/50 border-purple-600/70 focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 transform transition-all duration-150 ease-in-out hover:scale-105">
                Send Message
              </Button>
            </div>
          </form>
        </section>

      </main>

      <footer className="z-10 w-full py-8 text-center border-t border-purple-700/50 bg-black/30 backdrop-blur-sm">
        <p className="text-purple-400/70">&copy; {new Date().getFullYear()} LeadGen Magic. All rights reserved.</p>
      </footer>
    </div>
  );
}
