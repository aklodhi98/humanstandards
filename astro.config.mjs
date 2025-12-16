// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Human Standards',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/humanstandards' },
			],
			customCss: [
				'./src/styles/custom.css',
			],
			sidebar: [
				{
					label: 'Home',
					autogenerate: { directory: 'home' },
				},
				{
					label: 'Human Overview',
					autogenerate: { directory: 'human-overview' },
				},
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
				{
					label: 'Code & Design Tokens',
					autogenerate: { directory: 'code-design-tokens' },
				},
				{
					label: 'Checklists & Playbooks',
					autogenerate: { directory: 'checklists-playbooks' },
				},
				{
					label: 'Case Studies',
					autogenerate: { directory: 'case-studies' },
				},
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
		}),
	],
});
