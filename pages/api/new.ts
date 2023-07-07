// add the site to some cloudflare object storage

import { FetchEvent } from "@cloudflare/workers-types";

function ErrorResponce(message: string) {
	return new Response(JSON.stringify({
		error: message
	}), {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		}
	})
}

export default async (event: FetchEvent) => {
	// expect query to be ?url=example.com and ?name=Example
	const url = new URL(event.request.url);
	const siteUrl = url.searchParams.get('url');
	const siteName = url.searchParams.get('name');

	if (!siteUrl ) return ErrorResponce('url is required')
	if (!siteName ) return ErrorResponce('name is required')

	// append to STATUS.sites

	let sites: SITES | string = await STATUS.get('sites')
	if (!sites) sites = {}
	if (typeof sites === 'string') sites = JSON.parse(sites) as SITES

	sites[siteName] = {
		name: siteName,
		url: siteUrl
	}

	await STATUS.put('sites', JSON.stringify(sites))

	return new Response(JSON.stringify({
		sites: sites
	}), {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		}
	})
};