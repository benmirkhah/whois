// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import basicSSL from '@vitejs/plugin-basic-ssl';
//import injectHTML from 'vite-plugin-html-inject';
import { defineConfig, fontProviders } from 'astro/config';
import { readFileSync } from 'node:fs';

const SSLoptions = {
  key: readFileSync('/dev/cert/private-key.pem'),
  cert: readFileSync('/dev/cert/certificate.pem'),
};


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
			//https: SSLoptions,
			// {
			// 	key: '/dev/cert/private-key.pem',
			// 	cert: '/dev/cert/certificate.pem',
			// },
			port: 443,
			host: 'wi.benmirkhah.com',
			origin: 'https://wi.benmirkhah.com',
		},

		plugins: [
			basicSSL({
				name: 'wildcard',
				domains: ['*.benmirkhah.com'],
				ttlDays: 30,
				certDir: '/dev/cert',
			}),
		],

	},

  security: {
    allowedDomains: [
      {
        hostname: '*.benmirkhah.com',
        protocol: 'https',
				port: '443'
      },
      {
        hostname: 'wi.benmirkhah.com',
        protocol: 'https',
        port: '443'
      }
    ]
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
