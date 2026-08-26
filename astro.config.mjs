// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { defineConfig, fontProviders } from 'astro/config';

console.log('MODE:' + import.meta.env.MODE);

const DEV  = (import.meta.env.MODE == 'development') ? 1 : 0;
const key  = DEV ? '/dev/cert/key.pem'  : './key.pem';
const cert = DEV ? '/dev/cert/cert.pem' : './cert.pem';
const subd = DEV ? 'wi' : 'whois';
const port = DEV ? 443 : 80;
const host = subd+'.benmirkhah.com';
const site = 'https://'+host;

const SSLOptions = { //Certs made by https://github.com/FiloSottile/mkcert
	key:  DEV ? readFileSync(key) : key,
	cert: DEV ? readFileSync(cert): cert,
}

const viteDEV = {
  mode: 'development',
	server: {
		https: SSLOptions,
		port: port,
		host: host,
		origin: site,
	}
}

const vitePROD   = { mode: 'production' }
const viteOtions = DEV ? viteDEV : vitePROD;

export default defineConfig({
	site: site,
	output: 'static',
	server: { 
		host: host,
		port: port, 
		allowedHosts: [ site ],
	},

	vite: viteOtions,

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
