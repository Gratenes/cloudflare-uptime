import {KVNamespace} from '@cloudflare/workers-types'
import site from "../../component/site";
interface status {
	description: string;
	code: number;
	type: 'success' | 'warning' | 'error';
}

interface Site {
	name: string;
	url: string;
}

declare global {
	const STATUS: KVNamespace
	interface SITES {
		[key: string]: Site;
	}
	type SITE = Site
	interface DATA {
		[key: string]: status[];
	}
	type STATUS = status
}

export default async (event) => {

	let sites: SITES | string = await STATUS.get('sites')
	let data: DATA | string = await STATUS.get('data')

	if (!sites) { STATUS.put('sites', JSON.stringify({})); sites = {} }
	if (typeof sites === 'string') sites = JSON.parse(sites) as SITES

	if (!data) { STATUS.put('data', JSON.stringify({})); data = {} }
	if (typeof data === 'string') data = JSON.parse(data) as DATA

	return new Response(JSON.stringify({
		data: data,
		sites: sites
	}), {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		}
	})
}