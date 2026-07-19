
#### PART 2: Layout System, Component Anatomy \& Engineering Language







\# Backend Runtime



Design System



Version 1.0



Part 2



Layout System

Component Anatomy

Visual Hierarchy

Engineering Language



\---



\# 1. Layout Philosophy



Backend Runtime should never resemble a marketing website.



Traditional portfolios follow a simple structure.



Navigation



â†“



Hero



â†“



About



â†“



Skills



â†“



Projects



â†“



Contact



â†“



Footer



Backend Runtime intentionally rejects this pattern.



Instead, every screen should resemble an internal engineering platform where information is organized according to operational importance.



Users should immediately feel they are interacting with production software rather than promotional content.



Whitespace is not empty space.



Whitespace is used to separate independent services.



Cards are not decorative containers.



Cards represent backend services.



Panels represent infrastructure modules.



Widgets represent operational information.



Everything visible on the screen should appear to have a purpose.



\---



\# 2. Application Shell



Every page shares one global application shell.



+--------------------------------------------------------------+

| Header                                                       |

+--------------------------------------------------------------+



+---------+-----------------------------------------+-----------+

|         |                                         |           |

|         |                                         |           |

|         |                                         |           |

| System  |            Active Service               | Response  |

| Map     |                                         | Metrics   |

|         |                                         |           |

|         |                                         |           |

+---------+-----------------------------------------+-----------+



+--------------------------------------------------------------+

| Terminal Logs                                                 |

+--------------------------------------------------------------+



+--------------------------------------------------------------+

| Footer                                                       |

+--------------------------------------------------------------+



Every page fits inside this structure.



Only the Active Service changes.



The surrounding infrastructure remains visible.



\---



\# 3. Persistent System Map



The left side of the application contains a simplified architecture map.



Purpose



Maintain context.



Users should never lose awareness of where they are inside the distributed system.



Example



API Gateway



â†“



About Service



â†“



Projects Service



â†“



Infrastructure



â†“



Contact



The currently active service is highlighted.



Request packets travel between nodes during navigation.



The map is intentionally minimal.



Avoid complex enterprise architecture diagrams.



\---



\# 4. Header



Purpose



Global routing.



Identity.



Current request information.



The header contains



Application Logo



Current Route



Navigation



Architecture Focus Button



Current Response Time



Theme Toggle (optional)



The header height remains consistent across every page.



Recommended Height



72 pixels.



\---



\# 5. Navigation



Navigation behaves like API routing.



Never use



About



Projects



Contact



Instead display



GET /



GET /about



GET /projects



GET /backend-capabilities



POST /contact



The active endpoint receives a subtle blue indicator.



Hovering over an endpoint displays



Expected Response



Estimated Latency



Destination Service



These tooltips should feel similar to API documentation.



\---



\# 6. Main Workspace



The center workspace is the most important region.



Everything here changes depending on the selected service.



Maximum Width



1440 pixels.



Reading Width



760 pixels.



Workspace Padding



48 pixels.



Never stretch content edge to edge.



Professional dashboards breathe.



\---



\# 7. Response Metrics Panel



Position



Top Right.



Purpose



Reinforce backend thinking.



Displays



Current Route



Status Code



Latency



Request ID



Environment



Example



GET /projects



200 OK



48 ms



REQ-01A7D2



Production



Values are simulated.



They should remain believable.



\---



\# 8. Terminal Panel



Purpose



Communicate backend activity.



Location



Bottom of every page.



Appearance



Dark.



Monospaced.



Minimal.



Maximum Height



160 pixels.



Visible Entries



Six.



Old entries disappear automatically.



Never auto-scroll continuously.



Terminal updates only after meaningful actions.



Example



INFO Gateway accepted request



INFO Service discovered



INFO Cache HIT



INFO Response generated



The terminal should reinforce interaction.



Not distract from it.



\---



\# 9. Footer



The footer represents deployment metadata.



Example



Backend Runtime



Version 1.0.0



Java 21



Spring Boot



Production



Last Deployment



Healthy



Avoid copyright messages.



The footer should feel like infrastructure status.



\---



\# 10. Card Philosophy



Cards are infrastructure.



Cards are never decoration.



Every card represents one independent backend component.



Examples



Project



Database



Cache



Message Broker



Infrastructure Module



Service



Cards should feel stable.



Border



1 pixel.



Radius



12 pixels.



Background



Slightly brighter than page background.



Shadow



Very subtle.



Hover



Elevation increases slightly.



Never animate cards unnecessarily.



\---



\# 11. Service Card Anatomy



Every service card follows one consistent structure.



+------------------------------------------------+



Service Status



Service Name



Description



\----------------------------------------------



Architecture



Technology



Database



Messaging



Cache



Container



\----------------------------------------------



Deployment Status



Average Latency



Open Service â†’



+------------------------------------------------+



Every project follows this layout.



No exceptions.



\---



\# 12. Infrastructure Widget



Infrastructure widgets represent backend technologies.



Example



Redis



Healthy



Cache Layer



Used By



Projects Service



Response Time



2 ms



Rather than displaying



Redis â­â­â­â­â­



The widget behaves like a monitoring dashboard.



\---



\# 13. Empty Space



Empty space is intentional.



Never fill areas with



Particles



Random icons



Floating graphics



Unnecessary illustrations



Animated gradients



If space feels empty,



leave it empty.



Professional software is comfortable with whitespace.



\---



\# 14. Alignment Rules



Every component aligns to the grid.



Never manually offset elements.



Every heading begins on the same vertical rhythm.



Every card follows identical spacing.



Users should unconsciously notice consistency.



\---



\# 15. Section Titles



Section titles follow one structure.



Large Title



One sentence description.



Divider.



Content.



Avoid decorative headings.



Avoid oversized typography.



Clarity wins.



\---



\# 16. Dashboard Widgets



Widgets should resemble operational dashboards.



Examples



Redis



Healthy



Hit Ratio



98%



Latency



2 ms



or



Kafka



Running



Events



128



Consumers



3



Even if values are simulated,



they should remain realistic.



\---



\# 17. Information Density



The application should balance information carefully.



Too little information feels empty.



Too much information feels overwhelming.



Every screen should communicate one primary idea.



Never attempt to teach five backend concepts simultaneously.



\---



\# 18. Engineering Language



Throughout the interface,



prefer engineering terminology.



Instead of



Skills



Use



Infrastructure



Instead of



Projects



Use



Services



Instead of



Contact



Use



Messaging Service



Instead of



Open



Use



Invoke



Instead of



View



Use



Inspect



Instead of



Visit



Use



Route



The wording should consistently reinforce the illusion that the visitor is interacting with infrastructure.



\---



\# 19. Things Never Allowed



Never use progress bars.



Never use percentage skill indicators.



Never use circular skill meters.



Never use floating social media icons.



Never use oversized profile pictures.



Never use animated backgrounds.



Never use infinite glowing effects.



Never use stock illustrations.



Never use meaningless dashboard widgets.



Every visual element must justify its existence.



\---



End of Part 2





New Product Rule (Adding to the Specification)



Every screen must answer exactly one engineering question.



For example:



Home answers:



"How does a request enter a system?"



About answers:



"Who owns this system?"



Projects answers:



"What services are deployed?"



Backend Capabilities answers:



"What infrastructure powers this system?"



Contact answers:



"How are requests processed asynchronously?"



This prevents pages from becoming cluttered.





