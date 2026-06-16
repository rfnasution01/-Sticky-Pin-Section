import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { portfolio } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type PinData = typeof portfolio.about | typeof portfolio.caseStudy;
type Visual = PinData["steps"][number]["visual"];

function App() {
	return (
		<main>
			<Hero />
			<PinShowcase data={portfolio.about} />
			<ProjectsGrid />
			<PinShowcase data={portfolio.caseStudy} dark />
			<Skills />
			<Contact />
		</main>
	);
}

function Hero() {
	return (
		<section className="section-hero" id="hero">
			<div className="hero-content">
				<span className="label-step">{portfolio.profile.availability}</span>
				<h1>{portfolio.profile.name}</h1>
				<p className="hero-subtitle">{portfolio.profile.subtitle}</p>
				<a className="cta-scroll" href="#about-pin" aria-label="Scroll to about showcase">
					{portfolio.profile.scrollLabel}
				</a>
			</div>
		</section>
	);
}

function PinShowcase({ data, dark = false }: { data: PinData; dark?: boolean }) {
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const [activeStep, setActiveStep] = useState(0);
	const activeRef = useRef(0);
	const triggerRef = useRef<ScrollTrigger | null>(null);

	useEffect(() => {
		const wrapper = wrapperRef.current;
		if (!wrapper) return;

		const mm = gsap.matchMedia();
		mm.add("(min-width: 1025px)", () => {
			const stepsText = wrapper.querySelectorAll(".step-text");
			const stepsVisual = wrapper.querySelectorAll(".step-visual");
			const dots = wrapper.querySelectorAll(".dot");
			const progressBar = wrapper.querySelector<HTMLElement>(".pin-progress-bar");
			const liveRegion = wrapper.querySelector<HTMLElement>("[aria-live]");
			const stickyContent = wrapper.querySelector<HTMLElement>(".sticky-content");
			const totalSteps = data.steps.length;

			const updateActiveStep = (index: number) => {
				if (index === activeRef.current) return;
				activeRef.current = index;
				setActiveStep(index);
				stepsText.forEach((el, current) => el.classList.toggle("active", current === index));
				stepsVisual.forEach((el, current) => el.classList.toggle("active", current === index));
				dots.forEach((el, current) => el.classList.toggle("active", current === index));
				liveRegion?.setAttribute("aria-label", `Step ${index + 1} of ${totalSteps}`);
			};

			const trigger = ScrollTrigger.create({
				trigger: wrapper,
				start: "top top",
				end: "bottom bottom",
				pin: stickyContent,
				scrub: 1,
				anticipatePin: 1,
				onUpdate: (self) => {
					if (progressBar) progressBar.style.width = `${self.progress * 100}%`;
					const activeIndex = Math.min(totalSteps - 1, Math.max(0, Math.floor(self.progress * totalSteps)));
					updateActiveStep(activeIndex);
				},
			});

			triggerRef.current = trigger;

			const handlers: Array<() => void> = [];
			dots.forEach((dot) => {
				const handler = () => {
					const targetStep = Number((dot as HTMLElement).dataset.step || 0);
					const scrollDistance = trigger.end - trigger.start;
					const targetScrollPos = trigger.start + scrollDistance * (targetStep / (totalSteps - 1));
					gsap.to(window, { scrollTo: targetScrollPos, duration: 0.8, ease: "power2.out" });
				};
				dot.addEventListener("click", handler);
				handlers.push(() => dot.removeEventListener("click", handler));
			});

			return () => {
				handlers.forEach((cleanup) => cleanup());
				trigger.kill();
				triggerRef.current = null;
			};
		});

		return () => mm.revert();
	}, [data.steps.length]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const trigger = triggerRef.current;
			if (!trigger?.isActive) return;
			const stepValue = (trigger.end - trigger.start) / Math.max(1, data.steps.length - 1);
			if (event.key === "ArrowDown") {
				event.preventDefault();
				gsap.to(window, { scrollTo: window.scrollY + stepValue, duration: 0.4, ease: "power2.out" });
			}
			if (event.key === "ArrowUp") {
				event.preventDefault();
				gsap.to(window, { scrollTo: window.scrollY - stepValue, duration: 0.4, ease: "power2.out" });
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [data.steps.length]);

	return (
		<div ref={wrapperRef} className={`pin-wrapper ${dark ? "dark-theme" : ""}`} id={data.id} aria-label={data.ariaLabel} style={{ height: `${data.steps.length * 100}vh` }}>
			<div className="pin-progress-bar" />
			<div className="sticky-content">
				<div className="container-split">
					<div className="split-left">
						<div className="sticky-nav-dots" role="tablist" aria-label={`${data.ariaLabel} steps`}>
							{data.steps.map((_, index) => (
								<button key={index} className={`dot ${index === activeStep ? "active" : ""}`} data-step={index} type="button" aria-label={`Go to step ${index + 1} of ${data.steps.length}`} aria-current={index === activeStep ? "step" : undefined} />
							))}
						</div>

						<div className="step-text-container" aria-live="polite" aria-label={`Step ${activeStep + 1} of ${data.steps.length}`}>
							{data.steps.map((step, index) => (
								<div key={step.label} className={`step-text ${index === activeStep ? "active" : ""}`}>
									<span className="label-step">{step.label}</span>
									<h2>{step.title}</h2>
									<p>{step.body}</p>
								</div>
							))}
						</div>
					</div>

					<div className="split-right">
						{data.steps.map((step, index) => (
							<div key={step.label} className={`step-visual ${index === activeStep ? "active" : ""}`}>
								<VisualRenderer visual={step.visual} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function VisualRenderer({ visual }: { visual: Visual }) {
	if (visual.type === "image") return <img src={visual.src} alt={visual.alt} />;
	if (visual.type === "icons") {
		return (
			<div className="skills-icon-grid">
				{visual.items.map((item) => <div className="icon-card" key={item}>{item}</div>)}
			</div>
		);
	}
	if (visual.type === "stack") return <div className="tech-stack-logos">{visual.items.map((item, index) => <span key={item}>{index > 0 ? " • " : ""}{item}</span>)}</div>;
	if (visual.type === "quote") return <blockquote className="large-quote">“{visual.quote}”</blockquote>;
	if (visual.type === "stat") return <div className="impact-stat"><span className="stat-number">{visual.number}</span><span className="stat-label">{visual.label}</span></div>;
	return <div className={`mockup-placeholder ${visual.className}`}>{visual.text}</div>;
}

function ProjectsGrid() {
	return (
		<section className="section-normal grid-bg">
			<div className="section-header">
				<span className="label-step">{portfolio.projects.label}</span>
				<h2>{portfolio.projects.title}</h2>
			</div>
			<div className="projects-grid">
				{portfolio.projects.items.map((project) => (
					<article className="project-card" key={project.title} style={{ backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.96)), url(${project.image})` }}>
						<h3>{project.title}</h3>
						<p>{project.category}</p>
					</article>
				))}
			</div>
		</section>
	);
}

function Skills() {
	return (
		<section className="section-normal">
			<div className="section-header">
				<span className="label-step">{portfolio.skills.label}</span>
				<h2>{portfolio.skills.title}</h2>
			</div>
			<div className="skills-4col">
				{portfolio.skills.items.map((skill) => (
					<article className="skill-item" key={skill.title}>
						<h4>{skill.title}</h4>
						<p>{skill.body}</p>
					</article>
				))}
			</div>
		</section>
	);
}

function Contact() {
	return (
		<section className="section-hero dark-theme">
			<div className="hero-content">
				<span className="label-step">{portfolio.contact.label}</span>
				<h2>{portfolio.contact.title}</h2>
				<a href={`mailto:${portfolio.contact.email}`} className="email-cta">{portfolio.contact.email}</a>
			</div>
		</section>
	);
}

export default App;
