
## PART 1





\# Backend Runtime



Animation Bible



Version 1.0



This document defines every animation used throughout Backend Runtime.



Animations exist for one reason only.



To communicate backend engineering concepts.



Animations are never decorative.



Animations never exist simply because motion looks attractive.



Every animation must answer one question.



"What happened?"



If an animation cannot answer that question, remove it.



\------------------------------------------------------------



ANIMATION PRINCIPLES



Principle 1



Motion communicates information.



Principle 2



Motion should never delay users.



Principle 3



Motion should never become repetitive.



Principle 4



Motion should remain subtle.



Principle 5



Motion should feel engineered.



\------------------------------------------------------------



Global Rules



Never use bounce.



Never use elastic animations.



Never rotate components.



Never shake components.



Never create infinite animations.



Never autoplay animations repeatedly.



Animations occur only after user interaction.



The application should remain visually calm while idle.



\------------------------------------------------------------



Animation Duration Scale



Extra Fast



100 ms



Fast



180 ms



Standard



250 ms



Medium



400 ms



Navigation



600 ms



Maximum



800 ms



No animation should exceed one second.



\------------------------------------------------------------



Animation Curves



Fade In



ease-out



Fade Out



ease-in



Page Transition



ease-in-out



Request Packet



linear



Hover



ease-out



\------------------------------------------------------------



PAGE TRANSITIONS



Purpose



Represent request routing.



Sequence



User clicks endpoint



â†“



Current page fades slightly



â†“



Request packet appears



â†“



Packet moves to destination



â†“



Destination endpoint highlights



â†“



New page fades in



â†“



Request packet disappears



Total Duration



Approximately 600 milliseconds.



Navigation should remain smooth.



\------------------------------------------------------------



REQUEST PACKET



Purpose



Represent every backend request.



Shape



Rounded square.



10px.



Color



Accent Blue.



Movement



Linear.



Constant speed.



No acceleration.



No bounce.



The request packet should never remain visible after the transition finishes.



\------------------------------------------------------------



SERVICE CARD



Idle



Static.



Hover



Border highlight.



Elevation



2 pixels.



Duration



180 milliseconds.



Click



No scaling.



Only route transition begins.



\------------------------------------------------------------



BUTTONS



Hover



Background brightness increases slightly.



Duration



150 milliseconds.



Click



Opacity reduces briefly.



Duration



80 milliseconds.



Never animate button size.



\------------------------------------------------------------



TERMINAL



New Log



Fade upward.



150 milliseconds.



Old Log



Fade out.



150 milliseconds.



Logs never scroll continuously.



\------------------------------------------------------------



CACHE DEMONSTRATION



First Visit



Redis



â†“



MISS



â†“



Database



â†“



Cache Updated



â†“



Response



Second Visit



Redis



â†“



HIT



â†“



Response



Each step appears sequentially.



Approximately



250 milliseconds



between steps.



Entire demonstration



Less than



2 seconds.



\------------------------------------------------------------



CONTACT PIPELINE



Submit



â†“



Validation



â†“



Queue



â†“



Worker



â†“



Delivered



â†“



Success



Each stage fades into the next.



No bouncing arrows.



No complex illustrations.



Simple vertical progression.



\------------------------------------------------------------



ACCESSIBILITY



Respect prefers-reduced-motion.



When reduced motion is enabled



Remove request packet movement.



Replace movement with instant state changes.



Keep timing consistent.



Never hide information because animations are disabled.



\------------------------------------------------------------



Performance Rules



Animate



Opacity



Transform



Never animate



Width



Height



Top



Left



Box Shadow



Filter



Animations should remain GPU accelerated.



Maintain smooth performance on lower end devices.



\------------------------------------------------------------



END OF PART 1





## Architect Review





This is the point where I want to become extremely disciplined.



We're going to stop thinking in terms of "cool animations."



Instead, every animation must pass three tests.



Test 1



Does it teach a backend concept?



If no, reject it.



Test 2



Can the user understand it immediately?



If no, simplify it.



Test 3



Can it run at 60 FPS on free hosting without unnecessary JavaScript work?



If no, redesign it.



One more improvement



I think we should completely remove loading spinners from page navigation.



Almost every portfolio has them.



Instead, the request packet itself becomes the loading indicator.



Example:



GET /services



â†“



â–¡â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–º



â†“



Service Loaded



No spinner.



No progress bar.



No fake loading screen.



Just one elegant animation.



It's simpler, faster, and more aligned with the backend story.



Where we are now



At this point, we've specified:



Product vision.

User journey.

All primary pages.

Design system.

Component library.

Animation principles.



The remaining documents will shift from UX into implementation. We'll define the React architecture, folder structure, state management, routing strategy, coding conventions, deployment strategy, and the AI rulebook that keeps every generated component consistent. That's where this specification becomes directly actionable for building the project.







Excellent. This is the point where most AI generated projects fail.



They spend 90% of their effort on UI and 10% on engineering.



We're going to do the opposite.



The UI is already largely defined. Now we define the engineering architecture that makes the project maintainable.



One thing first.



Architect Decision #8



I want to remove another common AI mistake.



Many AI generated React apps end up with folders like:



components/

components2/

newComponents/

common/

ui/

shared/

misc/

helpers/



Six months later, nobody knows where anything belongs.



We won't allow that.



Everything will have one obvious place.



That is part of Backend Runtime's philosophy.





