// @ts-check
import { loadEnv } from "vite";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { defineConfig, fontProviders } from 'astro/config';

const mode  = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const env   = loadEnv(mode, process.cwd(), "");
const local = (env.SERVER_MODE == 'local') ? true : false; 

console.log('SERVER_MODE: ' + (local ? 'local' : 'not-local'));

const DEV  = local ? true : false;
const key  = DEV ? '/dev/cert/key.pem'  : './key.pem';
const cert = DEV ? '/dev/cert/cert.pem' : './cert.pem';
const subd = DEV ? 'wi' : 'whois';
const port = DEV ? 443 : 80;
const host = subd+'.benmirkhah.com';
const site = 'https://'+host;

const experimental = DEV ? { chromeDevtoolsWorkspace: true } : {}

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

  experimental: experimental,

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
