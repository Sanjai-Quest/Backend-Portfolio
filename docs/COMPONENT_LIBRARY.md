
## PART 1



\# Backend Runtime



Component Library



Version 1.0



This document defines every reusable UI component used throughout Backend Runtime.



Every page must be assembled from these components.



No page should introduce one-off components unless they become part of this library.



The purpose of this document is consistency, reusability, maintainability, and predictable user interactions.



\---



\# COMPONENT DESIGN PRINCIPLES



Every component must satisfy the following requirements.



Simple.



Reusable.



Accessible.



Responsive.



Lightweight.



Animated only when necessary.



Visually consistent.



Easy to maintain.



Every component should communicate one responsibility.



Avoid components that attempt to solve multiple unrelated problems.



\---



\############################################################



COMPONENT 01



API Endpoint Chip



\############################################################



Purpose



Represent navigation and backend routes.



Examples



GET /



GET /about



GET /services



GET /operations



POST /contact



\------------------------------------------------------------



Visual Appearance



Rounded rectangle.



JetBrains Mono font.



Small colored badge for HTTP method.



Background slightly brighter than page.



Subtle border.



Padding



12px horizontal



8px vertical



\------------------------------------------------------------



Method Colors



GET



Blue



POST



Green



PUT



Orange



DELETE



Red



PATCH



Purple



\------------------------------------------------------------



States



Default



Hover



Active



Focused



Disabled



\------------------------------------------------------------



Hover Behavior



Background becomes slightly brighter.



Border changes to accent blue.



Cursor becomes pointer.



No scaling.



No bouncing.



\------------------------------------------------------------



Interaction



Clicking the chip triggers the request animation before navigation.



\------------------------------------------------------------



Accessibility



Keyboard focus.



Screen reader announces



"Navigate to GET slash services"



\------------------------------------------------------------



\############################################################



COMPONENT 02



Service Card



\############################################################



Purpose



Represent an individual deployed backend service.



Used On



Home



Service Catalog



Featured Services



Future pages



\------------------------------------------------------------



Structure



Service Status



â†“



Service Name



â†“



Description



â†“



Technology Tags



â†“



Deployment Status



â†“



Response Time



â†“



Inspect Service Button



\------------------------------------------------------------



Status Indicator



Small colored circle.



Green



Healthy



Yellow



Maintenance



Gray



Offline



Portfolio ships with Healthy only.



\------------------------------------------------------------



Technology Tags



Compact pills.



Maximum six visible.



Additional technologies collapse into



+2 More



\------------------------------------------------------------



Inspect Button



Label



Inspect Service



Clicking triggers routing animation.



\------------------------------------------------------------



Hover



Border highlight.



Very slight elevation.



Status indicator glows softly.



No movement greater than 2px.



\------------------------------------------------------------



Accessibility



Entire card focusable.



Meaningful ARIA labels.



Keyboard activation.



\------------------------------------------------------------



\############################################################



COMPONENT 03



System Status Badge



\############################################################



Purpose



Display operational state.



Examples



Healthy



Production



Running



Connected



Queued



Delivered



\------------------------------------------------------------



Appearance



Rounded pill.



Colored border.



Matching icon.



Monospaced label.



\------------------------------------------------------------



Colors



Healthy



Green



Running



Blue



Queued



Yellow



Delivered



Green



Maintenance



Orange



Error



Red



\------------------------------------------------------------



Animation



Fade only.



No pulsing.



\------------------------------------------------------------



\############################################################



COMPONENT 04



Request Packet



\############################################################



Purpose



Represent every request moving through the system.



This is the signature visual language of Backend Runtime.



\------------------------------------------------------------



Shape



Rounded square.



10px by 10px.



Accent blue.



Subtle glow.



\------------------------------------------------------------



Movement



Linear.



Constant speed.



No acceleration.



No bounce.



\------------------------------------------------------------



Usage



Navigation.



Cache animation.



Contact pipeline.



Gateway routing.



Future features.



\------------------------------------------------------------



Rules



Only one packet should animate at a time.



Avoid visual clutter.



Movement duration



400 to 700 milliseconds.



\------------------------------------------------------------



\############################################################



COMPONENT 05



Terminal Log



\############################################################



Purpose



Provide lightweight feedback after meaningful interactions.



\------------------------------------------------------------



Maximum Entries



Five.



Oldest entry removed automatically.



\------------------------------------------------------------



Example Messages



INFO Request received



INFO Routed to Identity Service



INFO Cache HIT



INFO Response generated



INFO Request completed



\------------------------------------------------------------



Appearance



JetBrains Mono.



Small font.



Dark background.



Rounded container.



\------------------------------------------------------------



Rules



Logs update only after user actions.



No continuous streaming.



No fake log spam.



\------------------------------------------------------------



\############################################################



COMPONENT 06



Response Badge



\############################################################



Purpose



Display response information.



Examples



200 OK



201 Created



204 No Content



\------------------------------------------------------------



Layout



Status code.



Response text.



Optional latency.



\------------------------------------------------------------



Example



200 OK



41 ms



\------------------------------------------------------------



Animation



Fade.



150 milliseconds.



\------------------------------------------------------------



END OF COMPONENT LIBRARY PART 1







Architect Review



I want to make one important adjustment before we continue.



Keep animations invisible until needed.



For example:



âŒ Constant request packets moving across the screen.



âŒ Endless glowing nodes.



âŒ Infinite animated topology.



Instead:



The UI is calm.



Nothing moves.



The moment you click:



GET /services



The request packet appears.



Travels.



Disappears.



The terminal updates.



The page changes.



Then everything becomes still again.



This follows a principle used by excellent software products:



Motion is feedback, not decoration.



I think this change is critical. It will make the portfolio feel polished, reduce CPU usage, improve battery life on laptops, and keep deployment on Vercel or Cloudflare Pages extremely smooth. It also makes every animation meaningful because it only happens in response to the user's actions.



I think we've now found the right balance between backend storytelling and a clean, user friendly portfolio. From here on, every new component and interaction should follow this philosophy.







## Product Evolution Proposal #6



Before continuing, I want to simplify something.



Earlier we had:



GET /

GET /about

GET /services

GET /operations

POST /contact



I think Operations still feels too "dashboard."



Remember our rule:



80% Portfolio

20% Backend



So instead, let's rename it to:



GET /stack



Internally:



Technology Stack Service



Why?



Because recruiters naturally want to know:



"What does this person build with?"



We can still present it using backend concepts, but it becomes much more intuitive than "Operations."



Final routes become:



GET /



GET /about



GET /services



GET /stack



POST /contact



Simple.



Memorable.








## PART 2



\############################################################



COMPONENT 07



Page Header



\############################################################



Purpose



Provide consistent identity across every page.



Every page begins with the same structural header.



\------------------------------------------------------------



Layout



Endpoint Chip



â†“



Page Title



â†“



One Sentence Description



\------------------------------------------------------------



Example



GET /services



Service Catalog



Browse every deployed backend service powering Backend Runtime.



\------------------------------------------------------------



Rules



Never exceed one descriptive sentence.



Avoid paragraphs.



Keep the purpose immediately understandable.



\------------------------------------------------------------



Animation



Fade Down



Duration



200 milliseconds.



\------------------------------------------------------------



\############################################################



COMPONENT 08



Technology Badge



\############################################################



Purpose



Display technologies consistently throughout the application.



\------------------------------------------------------------



Examples



Java 21



Spring Boot



PostgreSQL



Redis



Kafka



Docker



JWT



React



\------------------------------------------------------------



Appearance



Rounded pill.



Border.



Small icon.



Technology name.



\------------------------------------------------------------



Behavior



Hover



Display concise tooltip.



Example



Redis



"In memory cache used to reduce database reads."



Maximum tooltip length



One sentence.



\------------------------------------------------------------



Rules



Never use oversized logos.



Never use logo walls.



Technology is supporting information.



Architecture remains primary.



\------------------------------------------------------------



\############################################################



COMPONENT 09



Request Timeline



\############################################################



Purpose



Visualize lightweight backend processing.



\------------------------------------------------------------



Structure



Request



â†“



Gateway



â†“



Destination



â†“



Response



\------------------------------------------------------------



Example



REQ-A82F91



â†“



Gateway



â†“



Identity Service



â†“



200 OK



\------------------------------------------------------------



Usage



Page transitions.



Resume download.



Contact submission.



Service inspection.



\------------------------------------------------------------



Animation



Each step appears sequentially.



Approximately



150 milliseconds



between steps.



Total duration



Less than



700 milliseconds.



\------------------------------------------------------------



Rules



Never block navigation.



Timeline is feedback.



Not a loading screen.



\------------------------------------------------------------



\############################################################



COMPONENT 10



Topology Mini Map



\############################################################



Purpose



Maintain awareness of where the visitor is.



\------------------------------------------------------------



Example



Gateway



â”‚



â”œâ”€â”€ Identity



â”œâ”€â”€ Services



â”œâ”€â”€ Stack



â””â”€â”€ Contact



\------------------------------------------------------------



Behavior



Current node highlighted.



Previous node lightly colored.



Remaining nodes neutral.



\------------------------------------------------------------



Rules



Minimal.



No zooming.



No dragging.



No node editing.



This is orientation.



Not a diagram editor.



\------------------------------------------------------------



\############################################################



COMPONENT 11



Section Divider



\############################################################



Purpose



Separate logical sections.



\------------------------------------------------------------



Structure



Title



Description



Thin Divider



\------------------------------------------------------------



Example



Featured Services



Applications currently deployed within Backend Runtime.



â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€



\------------------------------------------------------------



Rules



Maintain identical spacing throughout the application.



\------------------------------------------------------------



\############################################################



COMPONENT 12



Info Card



\############################################################



Purpose



Display concise engineering information.



\------------------------------------------------------------



Used For



Engineering Philosophy.



Current Focus.



Learning.



Deployment Notes.



Architecture Decisions.



\------------------------------------------------------------



Structure



Title



â†“



Short Description



â†“



Optional Action



\------------------------------------------------------------



Rules



Maximum



120 words.



Cards should remain concise.



\------------------------------------------------------------



\############################################################



COMPONENT 13



Empty State



\############################################################



Purpose



Provide graceful fallback.



\------------------------------------------------------------



Example



No services found.



Try another filter.



\------------------------------------------------------------



Animation



Fade.



\------------------------------------------------------------



Rules



Never leave blank screens.



Never use humorous error messages.



Maintain professional tone.



\------------------------------------------------------------



\############################################################



COMPONENT 14



Primary Button



\############################################################



Purpose



Primary call to action.



\------------------------------------------------------------



Examples



Inspect Service



Download Resume



POST /contact



\------------------------------------------------------------



Height



44px



Radius



10px



Padding



16px



\------------------------------------------------------------



Hover



Slight brightness increase.



\------------------------------------------------------------



Focus



Blue outline.



\------------------------------------------------------------



Disabled



Reduced opacity.



\------------------------------------------------------------



Rules



One primary button per section.



\------------------------------------------------------------



\############################################################



COMPONENT 15



Secondary Button



\############################################################



Purpose



Alternative actions.



\------------------------------------------------------------



Examples



Return Home



Back



View Repository



Live Demo



\------------------------------------------------------------



Appearance



Transparent background.



Border.



\------------------------------------------------------------



Hover



Background tint.



\------------------------------------------------------------



Rules



Should never compete visually with the primary button.



\############################################################



END OF COMPONENT LIBRARY PART 2







### Architect Review

I want to introduce one philosophy that I think will define the quality of the implementation.



The Three Second Rule



A recruiter should understand every page in under three seconds.



For example:



Home



"I enter through the Gateway."



Identity



"This is the engineer who built the system."



Services



"These are the deployed backend applications."



Stack



"These are the technologies behind the applications."



Contact



"My message flows through a backend pipeline."



That's it.



If a page requires explanation, we've failed.



Another observation



I think we've finally reached the point where we should stop inventing features.



From now on, our job is to perfect what we already have.



That means the remaining documents will focus on precision:



ANIMATION\_BIBLE.md will define every transition to the millisecond.

TECHNICAL\_ARCHITECTURE.md will define the React project structure, routing, state management, and folder organization.

AI\_RULEBOOK.md will ensure any AI coding assistant implements the project consistently.

DEPLOYMENT.md will guarantee the application runs smoothly on free platforms like Vercel, Cloudflare Pages, and Render without unnecessary complexity.



I think that's the right direction. The foundation is now strong enough that refining it will add far more value than introducing additional ideas.





This is where I think we transition from "designing" to "engineering."



We've decided what the product is. Now we define how it should feel.



I also want to make one correction before we continue.



Revision 1 (Official)



I want to replace:



GET /stack



with



GET /technology



or simply



GET /tech



Neither feels right.



After thinking about it, I actually think our original idea was stronger.



Final Navigation

GET /



GET /about



GET /services



GET /backend



POST /contact



Why?



Because the entire portfolio is about backend engineering.



"Backend" immediately tells recruiters:



This page explains how everything works.



Inside /backend, we organize technologies by responsibility:



Runtime

Framework

Database

Cache

Messaging

Security

Containerization



It stays intuitive without pretending to be an operations dashboard.



This is now frozen unless we later discover a substantially better alternative.







