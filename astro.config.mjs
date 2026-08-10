// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// Required for sitemap generation and absolute canonical URLs.
	site: 'https://www.humanstandards.org',
	integrations: [
		starlight({
			title: 'Human Standards',
			head: [
				{
					tag: 'script',
					content: `try { if (!localStorage.getItem('starlight-theme')) localStorage.setItem('starlight-theme', 'light'); } catch {}`,
				},
			],
			editLink: {
				baseUrl: 'https://github.com/aklodhi98/humanstandards/edit/main/',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/aklodhi98/humanstandards' },
			],
			credits: false,
			// Stamp each page from git history rather than hand-maintaining dates in
			// headings — standards and citation freshness are the whole point here.
			lastUpdated: true,
			components: {
				Footer: './src/components/overrides/Footer.astro',
				Header: './src/components/overrides/Header.astro',
				Hero: './src/components/overrides/Hero.astro',
			},
			customCss: [
				'./src/styles/custom.css',
			],
			sidebar: [
				// Getting Started - always visible
				{
					label: 'Getting Started',
					items: [
						{ slug: 'human-overview/getting-started' },
						{ slug: 'human-overview/what-are-human-standards' },
						{ slug: 'human-overview/scope-and-roadmap' },
						{ slug: 'human-overview/key-principles-and-laws' },
						{ slug: 'human-overview/mcp-server', label: 'MCP Server', badge: { text: 'New', variant: 'success' } },
					],
				},

				// Understanding Humans - collapsed
				{
					label: 'Understanding Humans',
					collapsed: true,
					items: [
						{
							label: 'Cognition',
							autogenerate: { directory: 'cognition' },
						},
						{
							label: 'Perception',
							autogenerate: { directory: 'perception' },
						},
						{
							label: 'Emotions & Motivation',
							autogenerate: { directory: 'emotions-motivation' },
						},
						{
							label: 'Decision-Making & Errors',
							autogenerate: { directory: 'decision-making-errors' },
						},
					],
				},

				// Design Standards - collapsed
				{
					label: 'Design Standards',
					collapsed: true,
					items: [
						{
							label: 'Ergonomics',
							autogenerate: { directory: 'ergonomics' },
						},
						{
							label: 'Accessibility',
							autogenerate: { directory: 'accessibility' },
						},
						{
							label: 'Interaction Patterns',
							autogenerate: { directory: 'interaction-patterns' },
						},
					],
				},

				// Implementation - collapsed
				{
					label: 'Implementation',
					collapsed: true,
					items: [
						{
							label: 'Code & Design Tokens',
							autogenerate: { directory: 'code-design-tokens' },
						},
						{
							label: 'Real-World Examples',
							autogenerate: { directory: 'examples' },
						},
						{
							label: 'Checklists & Playbooks',
							autogenerate: { directory: 'checklists-playbooks' },
						},
					],
				},

				// Research & References - collapsed
				{
					label: 'Research & References',
					collapsed: true,
					items: [
						{
							label: 'Research Methods',
							autogenerate: { directory: 'research-methods-metrics' },
						},
						{
							label: 'Social & Cultural',
							autogenerate: { directory: 'social-cultural' },
						},
						{
							label: 'References',
							autogenerate: { directory: 'references' },
						},
					],
				},

				// Open studies - public process and recruitment, separate from standards guidance
				{
					label: 'Studies',
					collapsed: false,
					items: [
						{ slug: 'studies', label: 'Open Studies' },
						{ slug: 'studies/study-001-independent-reviewers', label: 'Study 001: Reviewer Call', badge: { text: 'Open', variant: 'success' } },
					],
				},
			],
		}),
	],
});
