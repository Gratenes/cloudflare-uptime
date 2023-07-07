import React, { createContext, useState } from "react";
import {func} from "prop-types";

interface MyContextInterface {
  sites: SITES;
  data: DATA;
  updateSite: (name: string, url: string) => void;
  update: (sites: SITES, data: DATA) => void;
  updateData: (name: string, newData: STATUS[]) => void;
}

const SiteContext = createContext<MyContextInterface>({
  sites: {},
  data: {},
  updateSite: () => {},
  update: () => {},
  updateData: () => {},
});

function SiteContextProvider({ children, defaultSites, defaultData }: { children: React.ReactNode, defaultSites: SITES, defaultData: DATA }) {
  const [sites, setSites] = useState<SITES>(defaultSites || {});
  const [data, setData] = useState<DATA>(defaultData || {});

  // Create a function to update the state of the object
  function updateSite(name: string, url: string) {
    sites[name] = {
      name: name,
      url: url,
    }

    setSites(sites);
  }

  function updateData(name: string, newData: STATUS[]) {
    data[name] = newData;
    setData(data);
  }

  function  update(sites: SITES, data: DATA) {
    setSites(sites);
  }


  // Provide the context to your components
  return (
    <SiteContext.Provider value={{ sites, data, updateSite, updateData, update }}>
      {children}
    </SiteContext.Provider>
  );
}

export default SiteContextProvider;
export { SiteContext, SiteContextProvider };