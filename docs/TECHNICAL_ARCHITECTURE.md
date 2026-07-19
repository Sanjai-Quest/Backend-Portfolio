
## PART 1







\# Backend Runtime



Technical Architecture



Version 1.0



Purpose



This document defines how Backend Runtime is engineered.



Unlike PRODUCT\_SPEC.md, which defines what users experience, this document defines how developers build and maintain the application.



Every implementation decision should prioritize simplicity, maintainability, performance, and consistency.



The frontend is intentionally lightweight.



The engineering quality comes from structure rather than complexity.



\------------------------------------------------------------



TECH STACK



Frontend



React 19



TypeScript



Vite



Tailwind CSS



Framer Motion



React Router



Lucide React



Backend



Java 21



Spring Boot



Spring Security



JWT



PostgreSQL



Redis



Deployment



Frontend



Vercel



Backend



Render



Database



Neon PostgreSQL



Redis



Upstash Redis



Version Control



Git



GitHub



\------------------------------------------------------------



ARCHITECTURE PRINCIPLES



Principle 1



Prefer composition over inheritance.



Principle 2



Prefer reusable components.



Principle 3



Prefer simple state.



Principle 4



Avoid unnecessary libraries.



Principle 5



Avoid deeply nested components.



Principle 6



One responsibility per component.



Principle 7



Predictable folder structure.



\------------------------------------------------------------



APPLICATION STRUCTURE



src/



app/



pages/



components/



layouts/



animations/



hooks/



services/



data/



constants/



types/



utils/



assets/



styles/



Each folder has one clear responsibility.



Never duplicate responsibilities.



\------------------------------------------------------------



APP



Contains



Application entry.



Router.



Global providers.



Theme.



Application shell.



Nothing else.



\------------------------------------------------------------



PAGES



Contains route level pages only.



Example



Home



Identity



Services



Backend



Contact



Pages should never contain reusable UI.



Pages compose components.



\------------------------------------------------------------



COMPONENTS



Contains reusable UI.



Examples



Buttons



Cards



Endpoint Chips



Topology



Terminal



Timeline



Badges



Widgets



Every component should be reusable.



\------------------------------------------------------------



LAYOUTS



Contains application layouts.



Examples



Main Layout



Page Layout



Section Layout



These define page structure.



\------------------------------------------------------------



ANIMATIONS



Contains reusable Framer Motion variants.



Never duplicate animation definitions.



Examples



Fade



Slide



Page Transition



Request Packet



Card Reveal



\------------------------------------------------------------



HOOKS



Contains reusable React hooks.



Examples



useRequestAnimation



useReducedMotion



useScrollPosition



useTerminal



Hooks contain behavior.



Never UI.



\------------------------------------------------------------



SERVICES



Contains API communication.



Examples



contactService



portfolioService



backendService



Every HTTP request originates here.



\------------------------------------------------------------



DATA



Contains static data.



Projects



Timeline



Technologies



Navigation



Nothing dynamic belongs here.



\------------------------------------------------------------



CONSTANTS



Application wide constants.



Animation durations.



Status codes.



Theme colors.



Routes.



\------------------------------------------------------------



UTILS



Pure helper functions.



No React.



No JSX.



No side effects.



\------------------------------------------------------------



TYPES



Global TypeScript types.



Interfaces.



Enums.



Shared models.



\------------------------------------------------------------



ASSETS



Fonts.



Icons.



Images.



SVG.



Lottie files if required.



\------------------------------------------------------------



STYLES



Global CSS.



Tailwind extensions.



Fonts.



Design tokens.



\------------------------------------------------------------



STATE MANAGEMENT



Global state should remain minimal.



Use React Context only when truly necessary.



Avoid Redux.



Avoid Zustand unless future complexity requires it.



Keep most state local.



The application is primarily presentational.



\------------------------------------------------------------



ROUTING



Use React Router.



Every route maps directly to one service.



/



â†“



Home



/about



â†“



Identity



/services



â†“



Service Catalog



/backend



â†“



Backend Overview



/contact



â†“



Messaging Service



\------------------------------------------------------------



PERFORMANCE



Lazy load route pages.



Memoize expensive components.



Avoid unnecessary renders.



Keep bundle size low.



Target Lighthouse score above 95.



\------------------------------------------------------------



END OF PART 1



### Architect Review



I want to make what I think is the biggest engineering decision of the entire project.



We should avoid a real backend for most of the portfolio.



This might sound surprising.



Here's why.



Your portfolio is demonstrating backend engineering, not serving millions of users.



So instead of making every interaction depend on a Spring Boot server, we should separate the project into two layers.



Layer 1: Portfolio Experience



Runs entirely on Vercel.



Fast.



Static.



Instant.



Everything except the contact form and live project links works without a backend.



Layer 2: Real Backend



Spring Boot.



Render.



Handles:



Contact form.

Resume download analytics (optional).

Future APIs.

Health endpoint.

Authentication if ever needed.



This gives you several advantages:



Faster loading.

Better Lighthouse scores.

No waiting for Render cold starts during normal navigation.

Lower hosting costs.

Better reliability.

Easier deployment.

Cleaner architecture.



Most importantly, the backend concepts are communicated through the UX, not by forcing every page to make a real API call.



I think this aligns perfectly with your original goal and keeps the portfolio silky smooth on free infrastructure.



Current Progress



We've now completed roughly 40% of the full specification.



The remaining work will focus on:



AI\_RULEBOOK.md, the constitution for any AI coding assistant.

DEPLOYMENT.md, guaranteeing smooth deployment on free platforms.

TESTING\_GUIDE.md, ensuring quality and consistency.

The implementation phases that translate this specification into a build plan.



At this stage, the project has a coherent vision, a stable architecture, and clear engineering principles. The remaining documents will make it executable.





I think this is the perfect point to write what I consider the most valuable document in the entire project.



Not because it's long.



Because it'll save you hundreds of hours.



Remember your goal:



"I want to give an AI this documentation and it should build exactly what I imagined."



That means we need a constitution.



Not coding instructions.



A constitution.



This is the document every future prompt will reference.





