


\# Backend Runtime



Design System



Version 1.0



This document defines every visual decision used throughout Backend Runtime.



The purpose of this design system is consistency.



Every component must appear as though it belongs to one product.



Nothing should feel copied from another template.



Nothing should exist purely because it looks attractive.



Every design decision should reinforce engineering.



\--------------------------------------------------



DESIGN PHILOSOPHY



Backend Runtime is not dark because dark themes are popular.



Backend Runtime is dark because professional engineering dashboards frequently operate in low visual noise environments.



The design should communicate



Reliability



Precision



Confidence



Performance



Professionalism



The interface should feel engineered.



Not decorated.



Visitors should immediately believe they are interacting with internal software.



\--------------------------------------------------



VISUAL PERSONALITY



Keywords



Minimal



Structured



Predictable



Calm



Technical



Confident



Industrial



Premium



Modern



Purposeful



Avoid



Playful



Cartoonish



Overly futuristic



Cyberpunk



Gaming



Sci-Fi



Glassmorphism overload



Heavy gradients



Rainbow colors



Large glowing borders



Huge drop shadows



Floating decorations



\--------------------------------------------------



COLOR PHILOSOPHY



Every color communicates system state.



Color should never exist only for beauty.



Blue



Routing



Requests



Network



Information



Green



Healthy



Success



Cache Hit



Running



Yellow



Waiting



Processing



Queue



Orange



Warning



Cache Miss



Purple



Messaging



Kafka



RabbitMQ



Red



Reserved only for genuine errors.



Never use red as decoration.



\--------------------------------------------------



PRIMARY COLOR PALETTE



Background



\#0B0F14



Secondary Background



\#11161D



Card



\#171C24



Card Hover



\#1E2530



Border



\#2A3442



Primary Text



\#F5F7FA



Secondary Text



\#A6B0BF



Muted Text



\#768395



Accent Blue



\#3B82F6



Healthy Green



\#22C55E



Queue Yellow



\#EAB308



Cache Orange



\#F97316



Kafka Purple



\#8B5CF6



Danger



\#EF4444



\--------------------------------------------------



COLOR RULES



Never use more than three accent colors on one screen.



Never create rainbow interfaces.



Most screens should remain



90%



neutral colors



10%



accent colors.



Accent colors guide attention.



Neutral colors create professionalism.



\--------------------------------------------------



TYPOGRAPHY



Primary Font



Inter



Purpose



UI



Secondary Font



JetBrains Mono



Purpose



Code



Logs



Endpoints



Terminal



Architecture Labels



Never use decorative fonts.



Never mix more than two font families.



\--------------------------------------------------



TYPOGRAPHY SCALE



Hero



56 px



Bold



Page Title



36 px



SemiBold



Section Title



28 px



SemiBold



Card Title



20 px



Medium



Body



16 px



Regular



Caption



14 px



Regular



Terminal



13 px



JetBrains Mono



Logs



12 px



JetBrains Mono



\--------------------------------------------------



SPACING SYSTEM



Use an 8 point grid.



Spacing values



4



8



16



24



32



40



48



64



80



96



Never invent spacing values.



Consistency creates quality.



\--------------------------------------------------



BORDER RADIUS



Small Components



8 px



Cards



12 px



Large Containers



16 px



Floating Panels



20 px



Pills



999 px



Never mix random radius values.



\--------------------------------------------------



SHADOW SYSTEM



Very subtle.



Cards



0 4px 12px rgba(0,0,0,0.20)



Hover



0 10px 30px rgba(0,0,0,0.28)



Never create huge blurry shadows.



The interface should feel solid.



\--------------------------------------------------



GRID SYSTEM



Desktop



12 columns



Tablet



8 columns



Mobile



4 columns



Maximum Content Width



1440 px



Reading Width



760 px



Never allow content to stretch infinitely.



\--------------------------------------------------



ANIMATION PHILOSOPHY



Motion communicates engineering.



Motion never exists for decoration.



Every animation answers one question.



"What happened?"



Examples



Request sent.



Cache updated.



Service discovered.



Message queued.



Response returned.



If an animation cannot answer that question,



remove it.



\--------------------------------------------------



ANIMATION SPEED



Instant



100 ms



Fast



200 ms



Normal



350 ms



Request Transition



600 ms



Large Transition



700 ms



Maximum



900 ms



Never exceed one second.



\--------------------------------------------------



EASING



Use



ease-out



for entrances.



Use



ease-in



for exits.



Use



linear



for moving request packets.



Never use bounce.



Never use elastic.



Never use overshoot.



Networking should feel deterministic.



\--------------------------------------------------



GLASSMORPHISM



Avoid.



Maximum opacity



5%



No blurry backgrounds.



No frosted interfaces.



This is engineering software.



Not a macOS concept demo.



\--------------------------------------------------



ICONS



Use



Lucide React



Only outline icons.



Consistent stroke width.



Do not mix icon libraries.



Do not use filled icons.



\--------------------------------------------------



BUTTON PHILOSOPHY



Buttons represent actions.



Buttons are not decorative.



Primary



Blue



Secondary



Dark



Danger



Red



Queue



Yellow



Never create gradient buttons.



Never animate buttons continuously.



Hover should remain subtle.



\--------------------------------------------------



END OF PART 1







Backend-Runtime/

â”‚

â”œâ”€â”€ README.md

â”‚

â”œâ”€â”€ docs/

â”‚   â”œâ”€â”€ PRODUCT\_SPEC.md

â”‚   â”œâ”€â”€ DESIGN\_SYSTEM.md

â”‚   â”œâ”€â”€ PAGE\_SPECIFICATIONS.md

â”‚   â”œâ”€â”€ COMPONENT\_LIBRARY.md

â”‚   â”œâ”€â”€ ANIMATION\_BIBLE.md

â”‚   â”œâ”€â”€ ARCHITECTURE.md

â”‚   â”œâ”€â”€ TECHNICAL\_ARCHITECTURE.md

â”‚   â”œâ”€â”€ AI\_RULEBOOK.md

â”‚   â”œâ”€â”€ DEPLOYMENT.md

â”‚   â”œâ”€â”€ TESTING\_GUIDE.md

â”‚   â”œâ”€â”€ FUTURE\_ROADMAP.md

â”‚   â””â”€â”€ CHANGELOG.md

â”‚

â”œâ”€â”€ prompts/

â”‚   â”œâ”€â”€ Phase01.md

â”‚   â”œâ”€â”€ Phase02.md

â”‚   â”œâ”€â”€ ...

â”‚   â””â”€â”€ Phase10.md

â”‚

â””â”€â”€ assets/







### Improvements:



One improvement I want to introduce



After thinking about your portfolio for the last few messages, I believe we can make it even more memorable.



Currently the visitor acts as an HTTP request.



That's good.



But we can make them feel like they are inside a real production system.



Instead of page transitions simply animating...



Every page should always expose part of the system.



Imagine opening Home.



You don't just see the Home page.



You see the entire system.



&#x20;               API Gateway

&#x20;                    â”‚

&#x20;     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”

&#x20;     â”‚              â”‚              â”‚

&#x20;About Service   Project Service   Contact Service

&#x20;     â”‚              â”‚              â”‚

&#x20;PostgreSQL       Redis         Kafka Queue



Now imagine clicking Projects.



The Project Service node softly highlights.



A request packet travels from the Gateway.



The rest of the architecture remains visible.



This means the visitor never loses context.



They're always inside one living distributed system.



This is much stronger than rebuilding the architecture on every page.



I think this should become the portfolio's signature experience.



Another improvement



I don't want Architecture Mode to be an optional toggle anymore.



I think the architecture should always exist.



Instead:



Normal Mode



The architecture is subtle.



Maybe 15 percent opacity in the background.



Small.



Elegant.



Always visible.



Architecture Focus Mode



When activated,



the architecture expands.



Labels appear.



Connections animate.



Services become interactive.



This keeps the engineering identity present at all times while still giving enthusiasts a deeper view.



Another improvement



The request packet should become the mascot of the portfolio.



Not a logo.



A design language.



Whenever anything happens:



Navigation.



Redis.



Kafka.



Project opening.



Contact.



API Playground.



The same packet moves.



Eventually the visitor recognizes it instinctively.



That's exactly what good products do.



Our workflow



From this point onward, every document will follow the same standard.



1\. Purpose



2\. Philosophy



3\. Rules



4\. Layout

5\. Components



6\. Interactions



7\. Animations



8\. Accessibility



9\. Mobile Behavior



10\. AI Implementation Notes



11\. Things Never Allowed



12\. Future Extensions



Nothing will be left to interpretation.





