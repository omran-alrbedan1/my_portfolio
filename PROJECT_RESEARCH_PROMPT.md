# Project Research Prompt

Use this prompt to research Omran's portfolio projects for a resume and portfolio refresh.

```text
Research the projects listed below using only public, user-provided live URLs and repositories that are accessible without authentication.

For each project, inspect its README, package manifest and lockfile, source tree, screenshots/assets, and deployment metadata. Confirm technologies from actual imports/configuration rather than inferring them from the project name. Distinguish installed dependencies from technologies demonstrably used by the app.

Collect, when verifiable:
- One-sentence product summary and intended audience
- Project type and key user-facing features
- Exact frontend, backend, mobile, database, styling, animation, testing, and deployment technologies
- My role and contributions only when supported by repository history or details I provide
- Architecture and integrations that are evident in the code
- Deployment/live URL and source repository
- Useful desktop and mobile screenshots
- Evidence URL/file path and confidence for each fact
- Resume bullet drafts that use only verified facts and never invent metrics or outcomes

Screenshot rules:
- Capture desktop and narrow-mobile views only from publicly accessible pages I own or have permission to document.
- Save screenshots under `public/images/portfolio/projects/<project-slug>/`.
- Never bypass login, probe protected dashboards, or capture personal/customer data. If a dashboard is private or unavailable, record that a screenshot needs to be supplied by me.
- Do not use stock images or another project's screenshots as substitutes.

Safety and accuracy:
- Do not read, print, copy, or commit `.env` files, credentials, tokens, private user data, or secrets.
- Do not guess a project's stack, features, role, dates, team size, or outcomes. Mark unavailable details as “Needs confirmation”.
- Do not install dependencies or run project code from these external repositories.
- Preserve my existing website architecture and design system. Update only the portfolio project data/UI and research documentation needed for this task.

Return a research table with project, live URL, repository, verified stack, verified features, screenshot status, and open questions. Then update the portfolio project data and cards with verified information only.

Projects and links:
1. CarePulse — live: https://carepulse-jiub.vercel.app — repo: https://github.com/omran-alrbedan1/carepulse.git
2. Restate — React Native mobile app — repo: https://github.com/omran-alrbedan1/Restate.git
3. FoodApp — React Native food app — repo: https://github.com/omran-alrbedan1/FoodApp.git
4. Abu Sara jewelry shop — live: https://abu-sara.vercel.app — repo: https://github.com/omran-alrbedan1/Abu_sara.git
5. LiTaskunu website — live: https://litaskunu.com/en — repo: https://gitlab.com/litaskunu/litaskunu_front.git
6. LiTaskunu dashboard — live: https://litaskunu.com/en/admin — repo: https://gitlab.com/litaskunu/litaskunu_front.git
7. Tigre landing page — live: https://tigre-blush.vercel.app — repo: https://github.com/omran-alrbedan1/Tigre.git
8. Beyond Gluten landing page — live: https://beyond-gluten.vercel.app/en — repo: https://github.com/omran-alrbedan1/Beyond-Gluten.git
9. Beyond Gluten dashboard — live: https://gluten.futxtech.com — repository not supplied
10. Adonis website — repository: https://gitlab.com/adonis-website/adonis-website-front.git
11. Wise Zone — live: https://www.wisezone-jo.com/en — repo: https://gitlab.com/wise-zone/wise-zone-front.git
12. FutXTech website — live: https://futxtech.com — repo: https://gitlab.com/futurex-website/futurex-website.git
13. Optimal — repo: https://gitlab.com/optimal2/optimal_front.git
14. Workey graduation project — live: https://workey-ten.vercel.app — repo: https://github.com/omran-alrbedan1/workey.git
15. Red Power — live: https://red-power.vercel.app — repo: https://github.com/omran-alrbedan1/Red-Power.git
16. Bonitto — live: https://bonitto-rose.vercel.app — repo: https://github.com/omran-alrbedan1/Bonitto.git
17. eSIM — live: https://esim-wine.vercel.app/en — repo: https://github.com/omran-alrbedan1/esim.git
18. Net eSIM agent dashboard — live: https://dev.net-esim.futxtech.com/agent — repo: https://gitlab.futxtech.com/net-esim/net-esim-front.git
19. Red Power dashboard — repo: https://github.com/omran-alrbedan1/red-power-dashboard.git
20. Nexa dashboard — live: https://nexalogist.com — repo: https://gitlab.futxtech.com/nexa/nexa-dashboard.git
21. WAF — live: https://waf-nine.vercel.app/ar — repo: https://github.com/omran-alrbedan1/WAF.git
22. Balagh — React Native app — repo: https://github.com/omran-alrbedan1/Balagh.git
23. GLogo dashboard — live: https://dashboard.glogoltd.com — repo: https://gitlab.futxtech.com/glogo/glogo_dashboard.git
```
