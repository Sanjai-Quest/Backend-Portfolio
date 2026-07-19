
## PART 1





\# Backend Runtime



Deployment Guide



Version 1.0



Purpose



This document defines how Backend Runtime is deployed, hosted, and maintained using free services.



The deployment architecture prioritizes speed, reliability, simplicity, and minimal operational overhead.



The portfolio should remain fully usable even if optional backend services are unavailable.



\------------------------------------------------------------



DEPLOYMENT PHILOSOPHY



Static First.



Backend Only When Necessary.



The frontend should never depend on the backend for rendering.



Pages should load instantly from static assets.



Interactive backend concepts are visual demonstrations unless real server interaction is required.



\------------------------------------------------------------



ARCHITECTURE



Frontend



â†“



Vercel



â†“



Static Assets



â†“



React Application



\----------------------------



Backend



â†“



Render



â†“



Spring Boot



â†“



REST API



\----------------------------



Database



â†“



Neon PostgreSQL



\----------------------------



Cache



â†“



Upstash Redis



\------------------------------------------------------------



FRONTEND



Hosting



Vercel



Responsibilities



Serve the React application.



Serve static assets.



Handle client side routing.



Render portfolio pages.



Deliver animations.



Render project data.



Requirements



Fast global delivery.



Automatic deployments from GitHub.



HTTPS enabled.



Compression enabled.



\------------------------------------------------------------



BACKEND



Hosting



Render



Responsibilities



Handle contact form.



Validate requests.



Send emails.



Expose health endpoint.



Support future APIs.



Requirements



Keep startup lightweight.



Minimize cold start impact.



Return concise JSON responses.



\------------------------------------------------------------



DATABASE



Provider



Neon PostgreSQL



Responsibilities



Store contact submissions if persistence is required.



Optional analytics.



Future application data.



Avoid storing unnecessary information.



\------------------------------------------------------------



CACHE



Provider



Upstash Redis



Responsibilities



Support backend demonstrations if needed.



Future caching examples.



Do not make frontend navigation depend on Redis.



\------------------------------------------------------------



ENVIRONMENT VARIABLES



Frontend



VITE\_API\_BASE\_URL



VITE\_APP\_VERSION



Backend



DATABASE\_URL



REDIS\_URL



JWT\_SECRET



EMAIL\_USERNAME



EMAIL\_PASSWORD



Never commit secrets.



Use platform environment variable management.



\------------------------------------------------------------



CUSTOM DOMAIN



Optional.



The application must work correctly before a custom domain is added.



Domain configuration should not affect application behavior.



\------------------------------------------------------------



DEPLOYMENT WORKFLOW



Local Development



â†“



Git Commit



â†“



GitHub Push



â†“



Automatic Vercel Deployment



â†“



Automatic Render Deployment



â†“



Verification



Every successful deployment should produce a working application.



\------------------------------------------------------------



FAILURE STRATEGY



If Backend Is Offline



Portfolio remains fully functional.



Contact page displays a friendly retry message.



Navigation continues to work.



Projects remain available.



Animations continue to function.



No blank screens.



\------------------------------------------------------------



PERFORMANCE TARGETS



First Contentful Paint



Under 1.5 seconds.



Largest Contentful Paint



Under 2.5 seconds.



Interaction to Next Paint



Under 200 milliseconds.



Lighthouse



Performance



95+



Accessibility



100



Best Practices



100



SEO



100



\------------------------------------------------------------



END OF PART 1





### Architect Review



Now that we've almost completed the specification, I want to step back and review the project as if I were a recruiter.



If I landed on this portfolio, here's what I'd expect to happen



I open the site.



I see:



GET /



I click it.



A request packet moves.



The page transitions smoothly.



I immediately understand the backend theme.



I don't have to read instructions.



I don't have to learn a custom interface.



Everything behaves like a polished portfolio, with backend ideas woven into the interactions.



That's exactly the balance we were aiming for.



One last recommendation



I would add a small footer line to every page:



Backend Runtime v1.0.0



Built with React, Spring Boot, PostgreSQL, Redis, Kafka and Docker.



Simple.



Professional.



It reinforces the engineering identity without drawing attention away from the content.



My final suggestion before implementation



When we eventually start building, I recommend one additional document that isn't about the product at all.



It should be called:



DO\_NOT\_BREAK.md



It would contain rules like:



Never change the navigation style.

Never replace endpoint chips with normal links.

Never introduce random animations.

Never change the request animation timing without updating the Animation Bible.

Never create one off components.

Never hardcode project data into pages.

Never let a page exceed its defined responsibility.



It sounds trivial, but on long projects, these guardrails prevent gradual drift. They keep the implementation aligned with the original vision from the first commit to the final deployment.



I think we've now reached a point where the documentation isn't just descriptive. It's prescriptive. A developer, or an AI, can follow it step by step and produce a portfolio that remains faithful to the concept we've refined together.





I think we're finally at the document that separates a good project from an exceptional one.



Not because it contains features.



Because it defines quality.



One thing I've noticed over years of software projects is this:



Teams know what they're building.

Very few know when they're finished.



So the last major document shouldn't describe implementation.



It should describe acceptance.



If a feature doesn't satisfy this checklist, it isn't complete.



This is how mature engineering teams work.





