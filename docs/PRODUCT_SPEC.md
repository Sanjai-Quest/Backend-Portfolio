


\# 37. Product Flow



Backend Runtime is not a collection of independent web pages.



The entire application is one continuous journey through a distributed backend system.



The visitor never "changes pages."



Instead, the visitor's request is continuously routed between services.



Every transition should reinforce this illusion.



The visitor should subconsciously believe they are exploring infrastructure rather than navigating a website.



\---



\# 38. Complete User Journey



The complete journey should feel like this.



Browser opens website.



â†“



DNS Resolution.



â†“



TLS Handshake.



â†“



Gateway Boot Sequence.



â†“



Landing Page.



â†“



Visitor selects GET /about.



â†“



Gateway routes request.



â†“



Service Registry resolves service.



â†“



About Service responds.



â†“



Visitor selects GET /projects.



â†“



Gateway routes request.



â†“



Redis lookup.



â†“



Cache MISS.



â†“



Database query.



â†“



Project Service responds.



â†“



Visitor returns.



â†“



Gateway routes request.



â†“



Redis lookup.



â†“



Cache HIT.



â†“



Project Service responds.



â†“



Visitor explores projects.



â†“



Visitor opens Backend Capabilities.



â†“



Infrastructure Dashboard appears.



â†“



Visitor submits POST /contact.



â†“



Validation.



â†“



Message Queue.



â†“



Worker.



â†“



Success Response.



â†“



Journey Complete.



The visitor should never consciously think about backend architecture.



Instead they should naturally understand it.



\---



\# 39. Navigation Behavior



Navigation should never instantly replace one page with another.



Every navigation follows four visual stages.



Stage 1



Request Created



The clicked navigation item briefly transforms into an outgoing request.



Duration



100 milliseconds.



Stage 2



Gateway Processing



A small animated packet moves toward the gateway.



Duration



200 milliseconds.



Stage 3



Service Resolution



Gateway highlights the destination service.



Duration



200 milliseconds.



Stage 4



Response



Destination page fades in.



Duration



200 milliseconds.



Total animation



Approximately 700 milliseconds.



\---



\# 40. Request Packet



Throughout the application, requests are represented by one reusable animated object.



Shape



Small rounded rectangle.



Width



10 px.



Height



10 px.



Color



Accent Blue.



Glow



Very subtle.



Movement



Smooth.



Linear.



Never bouncy.



Never elastic.



This packet becomes the visual language of networking throughout the application.



\---



\# 41. API Gateway



The API Gateway is the central character of the portfolio.



Every request passes through it.



Responsibilities



Receive incoming requests.



Validate routing.



Determine destination.



Forward requests.



Return responses.



The Gateway should never feel like a decorative UI element.



It should feel alive.



Whenever navigation occurs,



Gateway briefly pulses.



Outgoing request appears.



Destination lights up.



Response returns.



The entire animation should finish before users become impatient.



\---



\# 42. Service Registry



The Service Registry represents discovery.



Purpose



Allow services to locate one another.



Visual Representation



A tree of registered services.



Gateway.



â†“



About Service.



â†“



Projects Service.



â†“



Infrastructure Service.



â†“



Contact Service.



Healthy services display



Green indicator.



Inactive services should never appear.



This portfolio represents production.



Not failure.



\---



\# 43. Microservice Registry



Every project represents an independent deployed service.



Project cards should resemble internal deployment dashboards.



Each card contains



Service Name.



Description.



Architecture Pattern.



Primary Language.



Framework.



Database.



Messaging.



Cache.



Container.



Deployment Status.



Average Response Time.



Status Badge.



Example



Service



DevSecWatch



Status



Healthy



Architecture



Microservices



Database



PostgreSQL



Messaging



Kafka



Cache



Redis



Deployment



Production



Average Response



47 milliseconds



The visitor should feel like browsing running infrastructure.



Not browsing portfolio cards.



\---



\# 44. Backend Capabilities



This section intentionally avoids traditional skill displays.



No progress bars.



No percentages.



No stars.



No ratings.



Instead,



technologies are grouped by responsibility.



Runtime



Java 21



Framework



Spring Boot



Persistence



PostgreSQL



Cache



Redis



Messaging



Kafka



RabbitMQ



Authentication



JWT



Containerization



Docker



Version Control



Git



Every category should resemble production infrastructure.



Not a rÃ©sumÃ©.



\---



\# 45. Contact Pipeline



The Contact page demonstrates asynchronous communication.



Pipeline



Client



â†“



Validation



â†“



Accepted



â†“



Publish Event



â†“



Queue



â†“



Email Worker



â†“



Delivered



â†“



200 OK



The visitor should understand that backend work often continues after the client receives a response.



No lengthy explanations.



Only interaction.



\---



\# 46. Redis Demonstration



Redis should appear exactly once.



Purpose



Teach cache behavior.



First visit



GET /projects



â†“



Redis Lookup



â†“



MISS



â†“



Database Query



â†“



Redis Update



â†“



Response



Second visit



GET /projects



â†“



Redis Lookup



â†“



HIT



â†“



Response



The animation should last approximately three seconds.



The visitor should immediately recognize why caching exists.



\---



\# 47. Kafka Demonstration



Kafka appears during Contact.



Animation



POST /contact



â†“



Publish Event



â†“



Topic



â†“



Consumer



â†“



Email Worker



â†“



Success



Represent events using moving packets.



No technical explanation.



Visitors learn by observation.



\---



\# 48. RabbitMQ Demonstration



RabbitMQ should appear only inside projects that actually use it.



Do not duplicate Kafka.



Its visualization should communicate queue based processing rather than event streaming.



Keep animations subtle.



\---



\# 49. Architecture Mode



Architecture Mode is the signature feature.



When enabled,



the portfolio transforms into a system topology.



The normal interface fades into the background.



The architecture graph becomes primary.



Every page becomes a node.



Gateway.



â†“



About Service.



â†“



Projects Service.



â†“



Infrastructure.



â†“



Contact.



Projects expand into their own services.



Current page glows softly.



Animated packets continue moving between services whenever navigation occurs.



The architecture graph should remain visible on every page.



The visitor should feel as though they are exploring a production system.



Architecture Mode must remain lightweight.



Never sacrifice performance.



\---



\# 50. Learning Philosophy



The portfolio should teach without becoming educational software.



Avoid paragraphs explaining backend concepts.



Instead,



allow the visitor to observe repeated engineering patterns.



Gateway.



Routing.



Discovery.



Caching.



Messaging.



Responses.



Repeated exposure creates understanding.



This is the central educational principle of Backend Runtime.



\---



End of PRODUCT\_SPEC.md Part 3





