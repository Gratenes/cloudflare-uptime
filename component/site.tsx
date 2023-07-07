import React, {useContext} from "react";
import { SiteContext } from '../utils/context'; // Import the context

export default () => {
  const {sites, data} = useContext(SiteContext);


/*    <div className="p-2.5 flex flex-row flex-wrap gap-2.5 items-center justify-around shrink-0 relative overflow-auto w-full">
      <div className="flex flex-row items-center gap-4">
        <div className="text-normal text-left relative rounded bg-success p-2">
          100%
        </div>

        <div className="text-normal text-left relative">tiktokez.com</div>
      </div>

      <div className="rounded border-solid border-primary border p-2 flex flex-row items-center justify-between shrink-0 gap-2 relative overflow-hidden">
        <div className="bg-success rounded-full shrink-0 w-3.5 h-10 relative"></div>

        <div className="bg-warning rounded-full shrink-0 w-3.5 h-10 relative"></div>

        <div className="bg-error rounded-full shrink-0 w-3.5 h-10 relative"></div>
      </div>
    </div>*/

  return (
    <div>
      {Object.keys(sites)?.map((name) => (
        <div className="p-2.5 flex flex-row flex-wrap gap-2.5 items-center justify-between shrink-0 relative overflow-auto w-11/12 mx-auto">
          <div className="flex flex-row items-center gap-4">
            <div className={`text-normal text-left relative rounded ${
              data[name]?.every(d => d.type == 'success') ? 
              'bg-success' : 
                 data[name]?.some(d => d.type == 'success') ?
              'bg-warning' : 
                 'bg-error'
            } p-2`}>
              {data[name]?.filter((status) => status.type === 'success').length / data[name]?.length * 100}%
            </div>

            <a href={sites[name].url} className="text-normal text-left relative">{name}</a>
          </div>
          <div className="rounded border-solid border-primary border p-2 flex flex-row items-center justify-between shrink-0 gap-2 relative overflow-hidden">
          {
            data[name]?.map((status) =>
              <div className={`bg-${status.type} rounded-full shrink-0 w-3.5 h-10 relative`}></div>
            )
          }
          </div>
        </div>
      ))}
    </div>
  );
}