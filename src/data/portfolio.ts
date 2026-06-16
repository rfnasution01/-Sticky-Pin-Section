export const portfolio = {
	profile: {
		name: "John Doe",
		availability: "Available for Freelance",
		subtitle: "Crafting digital products with pixel-perfect storytelling.",
		scrollLabel: "Scroll to explore ↓",
	},
	about: {
		id: "about-pin",
		ariaLabel: "About Me Showcase",
		steps: [
			{
				label: "01 / WHO I AM",
				title: "Driven by Design, Rooted in Code.",
				body: "I am a digital product designer specializing in clean, intentional user experiences that bridge the gap between human emotion and technical execution.",
				visual: { type: "image", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85", alt: "John Doe portrait for premium portfolio" },
			},
			{
				label: "02 / WHAT I DO",
				title: "Turning Complexity into Simplicity.",
				body: "I architect scalable design systems, design high-fidelity interactive prototypes, and write clean front-end code that brings static designs to life seamlessly.",
				visual: { type: "icons", items: ["UI/UX", "Dev", "Motion"] },
			},
			{
				label: "03 / TOOLS I USE",
				title: "The Modern Stack for Premium Products.",
				body: "My daily workflow centers around Figma for visual design, React and Next.js for development, GSAP for rich motion design, and Tailwind CSS for rapid styling.",
				visual: { type: "stack", items: ["Figma", "Next.js", "GSAP", "Tailwind"] },
			},
			{
				label: "04 / MY PHILOSOPHY",
				title: "Less, But Better.",
				body: "Good design is as little design as possible. I believe every pixel, transition, and line of code must serve a functional purpose to create an unforgettable user journey.",
				visual: { type: "quote", quote: "Simplicity is the ultimate sophistication." },
			},
		],
	},
	projects: {
		label: "Selected Works",
		title: "Featured Projects",
		items: [
			{ title: "Linear Redesign", category: "Product Design", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80" },
			{ title: "Stripe Dash", category: "Development", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80" },
			{ title: "Vercel Analytics", category: "Motion Graphics", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80" },
		],
	},
	caseStudy: {
		id: "case-pin",
		ariaLabel: "Case Study Deep Dive",
		steps: [
			{ label: "01 / THE PROBLEM", title: "Fragmented Checkout Experience.", body: "The client's SaaS platform suffered a 42% drop-off rate at the final payment step due to a cluttered interface and lack of localized payment options.", visual: { type: "mockup", className: "color-1", text: "Before: Cluttered Form UI" } },
			{ label: "02 / RESEARCH & INSIGHT", title: "Mapping User Friction.", body: "Through more than 20 user interviews and behavioral heatmaps, we discovered that users felt overwhelmed by non-essential form fields and security concerns.", visual: { type: "mockup", className: "color-2", text: "User Flow Diagram Mapping" } },
			{ label: "03 / DESIGN PROCESS", title: "Iterating the Solution.", body: "We completely restructured the information architecture, reducing checkout steps from five screens into a single dynamically updating checkout flow.", visual: { type: "mockup", className: "color-3", text: "Wireframe Iterations" } },
			{ label: "04 / THE FINAL UI", title: "The One-Click Checkout.", body: "A beautifully minimalist, Apple Pay-style interaction pattern built with high-fidelity micro-interactions to foster trust and accelerate conversion.", visual: { type: "mockup", className: "color-4", text: "Final Premium Smooth UI" } },
			{ label: "05 / BUSINESS IMPACT", title: "Proven Results in Production.", body: "Post-launch metrics revealed an immediate 58% increase in completed transactions, a 30% reduction in support tickets, and stronger user satisfaction.", visual: { type: "stat", number: "+58%", label: "Conversion Rate Boost" } },
		],
	},
	skills: {
		label: "Capabilities",
		title: "Core Competencies",
		items: [
			{ title: "Interaction Design", body: "Micro-interactions, smooth easing, and user control." },
			{ title: "Design Systems", body: "Atomic tokens, scalable components, and documentation." },
			{ title: "Front-End Engineering", body: "Production-ready HTML, CSS, JavaScript, and framework code." },
			{ title: "Product Strategy", body: "Aligning product features with user needs and business metrics." },
		],
	},
	contact: {
		label: "Get In Touch",
		title: "Let’s build something truly iconic.",
		email: "hello@domain.com",
	},
} as const;
