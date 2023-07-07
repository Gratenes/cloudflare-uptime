
// we need to make a few things




import React, {useContext, useEffect, useState} from "react";

export async function getEdgeProps() {
	let sites: SITES | string = await STATUS.get('sites')

	console.log(sites)

	if (!sites) { STATUS.put('sites', JSON.stringify({})); sites = {} }
	if (typeof sites === 'string') sites = JSON.parse(sites) as SITES

	return {
		props: {
			sites: sites
		}
	}
}

function LoadingSvg() {
	return <svg version="1.1" id="L4" className={'h-16'} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	            viewBox="0 0 100 100" enableBackground="new 0 0 0 0">
		<circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
			<animate
				attributeName="opacity"
				dur="1s"
				values="0;1;0"
				repeatCount="indefinite"
				begin="0.1"/>
		</circle>
		<circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
			<animate
				attributeName="opacity"
				dur="1s"
				values="0;1;0"
				repeatCount="indefinite"
				begin="0.2"/>
		</circle>
		<circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
			<animate
				attributeName="opacity"
				dur="1s"
				values="0;1;0"
				repeatCount="indefinite"
				begin="0.3"/>
		</circle>
	</svg>
}

export default function Settings({
	                                 sites
                                 }:{
	sites: SITES
}) {
	const [addingSite, setAddingSite] = useState(false)
	const [siteObject, setSiteObject] = useState(sites)

	async function addSite(e: React.FormEvent<HTMLFormElement>) {
		setAddingSite(true)
		setSiteObject({})

		// @ts-ignore
		const name = e.target.name.value
		// @ts-ignore
		const url = e.target.url.value

		if (!name || !url) {
			setSiteObject(sites)
			alert('Please fill out all the fields')
			return setAddingSite(false)
		}

		const data = await fetch('/api/new?name=' + name + '&url=' + url).then(r => r.json())

		if (data.error) {
			setSiteObject(sites)
			alert(data.error)
			setAddingSite(false)
		}
		else {
			fetch('/api/ping?name=' + name)
			setAddingSite(false)

			sites[name] = {
				url: url,
				name: name,
			}
			setSiteObject(sites)

			// @ts-ignore
			e.target.name.value = ''
			// @ts-ignore
			e.target.url.value = ''
		}

	}

	useEffect(() => {
		console.log('siteObject')
		console.log(siteObject, sites)
	}, [siteObject])

	async function deleteSite(site: string) {
		setSiteObject({})
		const data = await fetch('/api/delete?name=' + site).then(r => r.json())

		if (data.error) {
			setSiteObject(sites)
			alert(data.error)
		} else {
			// update the siteObject
			sites[site] = undefined
			delete sites[site]
			setSiteObject(sites)
			//alert('Site deleted successfully')
		}
	}

	// Object.keys(sites) will return all the sites, here we need to dispaly and have a button to delete the site
	return <div className="bg-background p-2 max-w-screen-lg mx-auto space-y-4 ">
		{/*add a refresh button for testing*/}
		<div className={'flex min-h-[120px] flex-col gap-2'} style={{minHeight: '120px'}}>
			<p className={'text-normal text-xl text-left'}>Current Sites: </p>

			<div
				className={'bg-background border border-primary rounded max-w-full gap-2 flex flex-row flex-wrap items-center justify-center'}>
				{
					siteObject &&
					Object.keys(siteObject).map((site) => {
						return <div className={'bg-background rounded p-2 m-2 gap-2 flex flex-col items-center'}>
							<p className={'text-normal text-xl'}>{site}</p>
							<button className={'bg-background text-normal rounded p-2 m-2 hover:bg-error hover:border-error animate duration-200 border border-primary'} onClick={() => {
								deleteSite(site)
							}}>Delete</button>
						</div>
					})
				}
			</div>
		</div>

		<div className={'flex flex-col gap-2'}>
			<p className={'text-normal text-xl text-left'}>Add A Site </p>

			<div className={'bg-background border border-primary rounded max-w-full gap-2 flex flex-row flex-wrap'}>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						addSite(e)
					}}
					className={'max-w-full gap-2 flex flex-row flex-wrap items-center justify-center  p-2 m-2'}
				>
					{/* We need 2 forms one for the url and for the name styled with taiwlinds*/}

						<div className={'flex flex-col'}>
							<label className={'text-normal text-xl'}>Site Name</label>
							<input type="text" name={'name'} placeholder={'Example'} className={'bg-background text-normal border border-primary rounded p-2 m-2'}/>
						</div>

						<div className={'flex flex-col'}>
							<label className={'text-normal text-xl'}>Site URL</label>
							<input type="text" name={'url'} placeholder={'https://example.com'} className={'bg-background text-normal border border-primary rounded p-2 m-2'}/>
						</div>

					{/* when the user clicks the button change the text to loading and then add the site */ }
					<button type="submit" className={'bg-background text-normal rounded p-2 m-2 hover:bg-success hover:border-success animate duration-200 border border-primary flex flex-col items-center justify-center'}>{
						addingSite ? <LoadingSvg/> : 'Add Site'
					}</button>
				</form>
			</div>
		</div>
	</div>
}