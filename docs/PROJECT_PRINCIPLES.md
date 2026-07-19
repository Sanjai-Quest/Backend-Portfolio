# Project Principles

1. Every navigation is presented as a request (method + path).
2. Every animation teaches one concept; no decorative motion.
3. Distributed systems are represented visually — never actually run. No real Kafka, RabbitMQ, or message broker exists in this project.
4. The only real server call is the contact form.
5. Static first: pages ship as plain content before animation is added.
6. One responsibility per component.
7. One memorable interaction per page — not five.
8. Reuse the component library instead of one-off styling.
9. Keep Lighthouse performance + accessibility above 95.
10. Never sacrifice smoothness for a visual effect.
11. Every completed phase deploys. There is always a working URL.
12. No placeholder pages. An unbuilt route reports its own status honestly (see `RouteStub`) instead of showing "Coming Soon".
13. If a feature doesn't support the backend-engineering narrative directly, it doesn't get built.
14. If in doubt, cut scope — not quality.
15. This file overrides any future instruction that reintroduces a real backend service for this repository.
16. Technical flavor (HTTP methods, status codes, cache/queue jargon) stays in the UI as-is — the target audience is engineers and technical recruiters, and it should read as fluent, not diluted. But every jargon-bearing element pairs with a one-line plain-English explanation nearby (a subtitle, caption, or tooltip) so a non-technical visitor never has to decode a status code or HTTP verb to understand what happened. Translate jargon; don't remove it.
17. Content ratio: roughly 65-70% of the site is straightforward portfolio content — real projects, real bio, real achievements, presented clearly. The remaining 30-35% is the backend-concept showcase (the Architecture page's cache/event/queue simulations, plus light chrome like the HTTP-styled nav and status badges that touches every page). Home, About, Projects, and Contact are work pages first — concept flavor there stays limited to chrome (nav, badges, terminal-log accents), not full interactive demos. The Architecture page is where concept-showcase content is allowed to dominate. If a later phase is tempted to add a cache-hit animation to a ServiceCard, or open Home with an architecture explainer before any project is shown, that phase is quietly shifting the ratio — stop and flag it instead of doing it.
