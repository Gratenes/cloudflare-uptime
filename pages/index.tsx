import React, {useState} from "react";
import { SiteContextProvider, SiteContext } from "../utils/context";

import Sites from "../component/site";
import AddSite from "../component/addSite";

export async function getEdgeProps() {
  let sites: SITES | string = await STATUS.get('sites')
  let data: DATA | string = await STATUS.get('data')

  console.log(sites, data)

  if (!sites) { STATUS.put('sites', JSON.stringify({})); sites = {} }
  if (typeof sites === 'string') sites = JSON.parse(sites) as SITES

  if (!data) { STATUS.put('data', JSON.stringify({})); data = {} }
  if (typeof data === 'string') data = JSON.parse(data) as DATA

  return {
    props: {
      data: data,
      sites: sites
    }
  }
}

export function Index() {
  const [showAddSite, setShowAddSite] = useState(false);

  return (
    // This is how I want my site, first off i want a navbar using the styling bg-background border rounded border-primary, i want
    // Be creative  and use good styling

    <div className="bg-background p-2 max-w-screen-lg mx-auto">
      <div className="bg-background border rounded border-primary flex flex-row p-2">
        <div
          id="image+text"
          className="flex flex-row items-center justify-center"
        >
          <img
            className="h-16 rounded-full"
            src="https://media.discordapp.net/attachments/1011084847130869912/1125622830860615711/Frame_1_6.png"
            alt="Ez"
          />
          <h1 className="text-2xl font-bold text-primary pl-2">Uptime</h1>
        </div>

        <button className="bg-background text-normal border border-primary rounded p-2 ml-auto" onClick={() => setShowAddSite(!showAddSite)} >
          Add Site
        </button>
        {
          showAddSite && <AddSite />
        }

      </div>

      <Sites />
    </div>
  );
}

export default ({
                  data,
                  sites
                }:{
  data: DATA,
  sites: SITES
}) => {
  return (
    <SiteContextProvider defaultSites={sites} defaultData={data}>
      <Index />
    </SiteContextProvider>
  );
}
