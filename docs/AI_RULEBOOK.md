
## PART 1



\# Backend Runtime



AI Rulebook



Version 1.0



Priority



CRITICAL



This document overrides every other document.



If another document conflicts with this Rulebook, the Rulebook always wins.



Purpose



The purpose of this document is to ensure that every AI assistant implementing Backend Runtime produces a consistent, maintainable, performant, and production quality result.



The AI should never invent features.



The AI should never redesign the application.



The AI should implement the existing vision faithfully.



\------------------------------------------------------------



PROJECT MISSION



Backend Runtime is a portfolio that communicates backend engineering through interaction.



It is not a dashboard.



It is not an admin panel.



It is not a cyberpunk showcase.



It is not an animation demo.



It is not a UI experiment.



Every implementation decision should reinforce this mission.



\------------------------------------------------------------



CORE EXPERIENCE



Visitors should experience backend concepts naturally.



Backend concepts should never interrupt normal browsing.



The website must remain familiar.



Backend interactions are enhancements.



The portfolio must always remain usable for non technical visitors.



\------------------------------------------------------------



THE 80 / 20 RULE



80%



Professional Portfolio



20%



Backend Storytelling



If a feature shifts the balance toward becoming a dashboard or simulation platform, reject the feature.



\------------------------------------------------------------



THE THREE SECOND RULE



A visitor should understand the purpose of every page within three seconds.



If additional explanation is required, simplify the design.



\------------------------------------------------------------



THE FIVE SECOND RULE



Every backend concept must become understandable within approximately five seconds.



Examples



Cache



Request Routing



Queue



Gateway



Service Discovery



Animations should communicate these concepts without requiring documentation.



\------------------------------------------------------------



SIMPLICITY FIRST



When multiple implementations are possible,



always choose the simplest implementation that produces the same user experience.



Avoid unnecessary abstraction.



Avoid unnecessary dependencies.



Avoid unnecessary configuration.



\------------------------------------------------------------



PERFORMANCE FIRST



The application should feel instant.



Animations should never reduce responsiveness.



Bundle size should remain small.



Prefer CSS and Framer Motion transforms over JavaScript heavy animations.



\------------------------------------------------------------



RESPONSIVE FIRST



Every page must function equally well on



Desktop



Tablet



Mobile



Never remove backend concepts on smaller screens.



Simplify layouts instead.



\------------------------------------------------------------



ACCESSIBILITY FIRST



Every interactive component must support



Keyboard navigation



Visible focus states



Screen readers



Reduced motion



Semantic HTML



Accessibility is mandatory.



\------------------------------------------------------------



COMPONENT REUSE



Never duplicate components.



Before creating a component,



check whether an existing component can be reused.



Component consistency is more valuable than minor visual differences.



\------------------------------------------------------------



VISUAL CONSISTENCY



Colors



Spacing



Typography



Borders



Animation timing



Shadows



Icons



must follow the Design System exactly.



Never invent new styles.



\------------------------------------------------------------



ANIMATION RULES



Animations communicate events.



Animations never exist for decoration.



Animations only occur after user interaction.



Animations remain subtle.



Animations finish quickly.



Animations never loop forever.



\------------------------------------------------------------



NAVIGATION



Navigation always represents request routing.



Navigation should remain fast.



Users should never wait for fake loading screens.



Request packet animations should never block interaction.



\------------------------------------------------------------



TERMINAL



Terminal logs update only after meaningful user interactions.



Never simulate thousands of log entries.



Never create fake hacking effects.



Keep logs readable.



Keep logs relevant.



\------------------------------------------------------------



SERVICE TOPOLOGY



The Service Topology provides orientation.



It is not a network editor.



It is not interactive infrastructure software.



Keep it simple.



Keep it lightweight.



\------------------------------------------------------------



TECHNOLOGY DISPLAY



Technologies should be grouped by responsibility.



Never display skill percentages.



Never display progress bars.



Never display star ratings.



Never display experience meters.



\------------------------------------------------------------



CONTENT



The portfolio should explain engineering decisions.



Not list technologies.



Not repeat rÃ©sumÃ© content.



Architecture matters more than tool names.



\------------------------------------------------------------



USER EXPERIENCE



Every visitor should leave with this impression.



"This person thinks like a backend engineer."



Not



"This person knows many technologies."



\------------------------------------------------------------



END OF PART 1







### ðŸ— Architect Review





Now that we've written a large part of the specification, I want to pause and evaluate the product as if I were a senior engineer reviewing a design proposal.



What I think is excellent

1\. One consistent story



Everything revolves around one idea:



Backend engineering through interaction.



There are no disconnected features anymore.



2\. It is memorable



Most portfolios:



Hero



â†“



About



â†“



Skills



â†“



Projects



Ours:



Gateway



â†“



Identity



â†“



Services



â†“



Backend



â†“



Messaging



That difference is enough to make people remember it.



3\. It is actually buildable



This is important.



Nothing we've specified requires:



Three.js

WebGL

Canvas rendering

Heavy particle systems

Custom physics

Enterprise infrastructure



React + Framer Motion is enough.



That means:



Smooth.

Fast.

Easy to maintain.

Easy to deploy.

One thing I still want to improve



This is the only thing I think is still missing.



Emotional connection.



Right now the portfolio says:



"I'm a backend engineer."



But I want it to quietly answer another question:



"Why does this engineer build software this way?"



Not through a long biography.



Not through motivational quotes.



Instead, through small engineering notes.



For example, on your project pages, instead of only listing technologies, include a short section called:



Engineering Decision



Example:



"Redis was introduced to reduce repeated database reads and improve response time for frequently accessed data."



Or:



"Kafka was selected because multiple services need to react independently to the same event."



These aren't tutorials. They're concise explanations of your reasoning.



A recruiter reading three or four of these immediately sees that you understand tradeoffs, not just APIs.



In my opinion, that will be the difference between:



"This student built projects."



and



"This engineer makes architectural decisions."



I think that's one of the highest value additions we can make, and it fits perfectly within the philosophy we've established.





I think we're entering the final stretch.



Up to this point, we've described the product. Now we need to make sure any AI can actually build it without drifting from the vision.



This next document is one I rarely see, but it is incredibly valuable.



It defines what the AI is not allowed to do.



That prevents the project from slowly turning into something else after dozens of prompts.






## PART 2



\############################################################



IMPLEMENTATION RULES



\############################################################



Every implementation should prioritize clarity over cleverness.



Never implement a feature simply because it is technically possible.



Every line of code should support the product vision.



\------------------------------------------------------------



WHAT THE AI MUST DO



Build reusable components.



Prefer composition.



Keep components small.



Write readable code.



Use meaningful variable names.



Use TypeScript everywhere.



Create reusable animation variants.



Keep styling consistent.



Follow the documented folder structure.



Optimize images.



Lazy load pages.



Maintain accessibility.



Write maintainable code before clever code.



\------------------------------------------------------------



WHAT THE AI MUST NEVER DO



Never redesign pages.



Never rename routes.



Never introduce additional pages.



Never invent new color palettes.



Never add cyberpunk effects.



Never add matrix rain.



Never add terminal hacking effects.



Never add glowing particle backgrounds.



Never add animated wallpapers.



Never add unnecessary dashboards.



Never add fake production metrics.



Never add spinning loaders.



Never replace documented animations.



Never add libraries without justification.



Never duplicate components.



Never hardcode repeated values.



Never mix business logic inside UI components.



\------------------------------------------------------------



REACT RULES



Prefer functional components.



Use hooks.



Avoid class components.



Keep props minimal.



Prefer derived state.



Avoid deeply nested prop chains.



Extract reusable logic into hooks.



Do not overuse Context.



\------------------------------------------------------------



TAILWIND RULES



Prefer utility classes.



Avoid unnecessary custom CSS.



Extract repeated patterns into reusable components.



Spacing should follow one consistent scale.



Never mix multiple visual styles.



\------------------------------------------------------------



FRAMER MOTION RULES



Reuse animation variants.



Never inline complex animation objects repeatedly.



Keep transitions consistent.



Avoid long animation chains.



Motion should support interaction.



\------------------------------------------------------------



ROUTING RULES



Every navigation begins with a request animation.



Every route has exactly one page.



No hidden routes.



No unnecessary nested routing.



Routes should remain predictable.



\------------------------------------------------------------



CONTENT RULES



Technical writing should be concise.



Avoid marketing language.



Avoid exaggerated claims.



Avoid buzzwords.



Explain engineering decisions simply.



Prefer diagrams over long paragraphs where appropriate.



\------------------------------------------------------------



PROJECT PAGE RULES



Every project follows the same structure.



Problem



â†“



Architecture



â†“



Engineering Decisions



â†“



Technology Responsibilities



â†“



Deployment



â†“



Repository



â†“



Result



Never change this order.



Architecture always comes before implementation.



\------------------------------------------------------------



BACKEND CONCEPT RULES



Every backend concept should appear through interaction.



Never require users to read documentation to understand animations.



Animations explain.



Text supports.



\------------------------------------------------------------



END OF IMPLEMENTATION RULES



\############################################################



CODE QUALITY RULES



\############################################################



Every component should have one responsibility.



Every hook should have one responsibility.



Every utility should have one responsibility.



Prefer many small files over very large files.



Avoid files larger than approximately 300 lines unless justified.



\------------------------------------------------------------



Naming Conventions



Components



PascalCase



Hooks



useCamelCase



Utilities



camelCase



Constants



UPPER\_SNAKE\_CASE



Types



PascalCase



\------------------------------------------------------------



Imports



Group imports consistently.



External libraries.



â†“



Internal modules.



â†“



Styles.



Avoid circular dependencies.



\------------------------------------------------------------



Error Handling



Handle failures gracefully.



Display user friendly messages.



Do not expose technical errors.



Never crash the UI because one component fails.



\------------------------------------------------------------



Future Growth



Every new feature should integrate into the existing design system.



Do not create parallel systems.



Extend existing components whenever reasonable.



\############################################################



END OF PART 2





### Architect Review



I think we should make one more important architectural decision.



Keep the portfolio mostly data driven.



Instead of writing project information directly inside React components, store it in structured data.



For example:



src/



data/



projects.ts



technologies.ts



timeline.ts



navigation.ts



backendConcepts.ts



Then your components simply render the data.



This gives you several advantages:



Adding a new project requires editing one file.

The UI automatically updates.

The AI has less opportunity to introduce inconsistencies.

Future redesigns become much easier.

Another improvement



Let's avoid hidden "magic."



For example, if a page displays:



Healthy



That value should come from data.



If the request animation duration is 600 ms, it should come from a constant.



If the navigation labels change, they should come from one configuration file.



This keeps the project easy to maintain and reinforces the idea that everything has a single source of truth.



Overall Assessment



At this point, I think the project has reached a very mature state.



It has:



A clear product vision.

A coherent user journey.

A defined page structure.

A reusable component library.

Animation principles.

Technical architecture.

AI implementation rules.



What's left are the operational documents:



DEPLOYMENT.md, ensuring frictionless free hosting on Vercel, Render, Neon, and Upstash.

IMPLEMENTATION\_PHASES.md, breaking the build into small, testable milestones.

QUALITY\_CHECKLIST.md, a final acceptance checklist to verify the portfolio before launch.



Those three documents will turn this from a specification into a complete execution blueprint. I would recommend finishing them before writing a single line of code. They will keep the implementation focused and prevent costly redesigns later.







I think we've reached the point where I want to stop thinking like a UI designer and start thinking like a tech lead.



Because your goal isn't just:



"Build a nice portfolio."



Your goal is:



"Finish it."



And the biggest reason projects never finish is because there is no execution plan.



So instead of immediately writing DEPLOYMENT.md, I think the next document should be the one that every engineer opens every morning.



The implementation roadmap.



This becomes the checklist for both you and any AI.





