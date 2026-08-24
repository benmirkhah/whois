// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://wi.benmirkhah.com',
	output: 'static',
	server: { 
		host: 'wi.benmirkhah.com',
		port: 443, 
		allowedHosts: ['wi.benmirkhah.com', 'whois.benmirkhah.com'],
		//open: 'https://wi.benmirkhah.com'
	},

	vite: {
		server: {
			https: { //Certs made by https://github.com/FiloSottile/mkcert
				key: readFileSync('/dev/cert/key.pem'),
				cert: readFileSync('/dev/cert/cert.pem'),
			},
			port: 443,
			host: 'wi.benmirkhah.com',
			origin: 'https://wi.benmirkhah.com',
		},
	},

	integrations: [mdx(), sitemap()],

	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
