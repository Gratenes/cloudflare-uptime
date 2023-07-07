// add the site to some cloudflare object storage

import { FetchEvent } from "@cloudflare/workers-types";
import {func} from "prop-types";

function ErrorResponce(message: string) {
	return {
		error: message
	}
}

function statsticalFetch(url: string): Promise<{
	description: string;
	code: number;
	type: 'success' | 'warning' | 'error';
}> {
	// make sure this always returns a status object

		return fetch(url).then(res => {
			return {
				description: res.statusText,
				code: res.status,
				type: res.status >= 200 && res.status < 300 ? 'success' : res.status >= 300 && res.status < 400 ? 'warning' : 'error' as 'success' | 'warning' | 'error'
			}
		}).catch(err => {
			return {
				description: err.message,
				code: 0,
				type: 'error'
			}
		})
}

export async function logic(name: string, all: string) {
	if (!name && !all) return ErrorResponce('name or all is required')

	// append to STATUS.sites

	let sites: SITES | string = await STATUS.get('sites')
	if (!sites) return ErrorResponce('no sites found')
	if (typeof sites === 'string') sites = JSON.parse(sites) as SITES

	let data: DATA | string = await STATUS.get('data')
	if (typeof data === 'string') data = JSON.parse(data) as DATA
	if (!data) data = {}

	if (name) {
		const dataEntry = data[name] || []

		if (dataEntry.length >= 24) dataEntry.shift()
		dataEntry.push(await statsticalFetch(sites[name].url)) // fetch the data
		data[name] = dataEntry // update local data

	} else if (all || !name) {
		if (!sites || typeof sites == 'string') return ErrorResponce('no sites found')
		for (const siteName in sites) {
			const dataEntry = data[siteName] || []

			if (dataEntry.length >= 24) dataEntry.shift() // only keep 24 hours of data
			dataEntry.push(await statsticalFetch(sites[siteName].url)) // fetch the data
			data[siteName] = dataEntry // update local data
		}
	}

	await STATUS.put('data', JSON.stringify(data))
	return data
}

export default async (event: FetchEvent) => {
	const url = new URL(event.request.url);
	const name = url.searchParams.get('name');
	const all = url.searchParams.get('all');

	const data = await logic(name, all)

	return new Response(JSON.stringify({
		data: data
	}), {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		}
	})
};