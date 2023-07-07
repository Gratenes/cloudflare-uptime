import React, { useContext } from "react";
import { SiteContext } from "../utils/context"; // Import the context

export default () => {
  const { sites, updateSite } = useContext(SiteContext);

  return  <></>

  return (
    // center the form
    <div
      className="absolute max-w-md 
left-0
right-0
top-1/2
-translate-y-1/2
mx-auto
z-10
"
    >
      <form
        className="bg-background rounded border border-primary p-2 flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
          updateSite({
            // @ts-ignore
            name: e.target.name.value,
            // @ts-ignore
            url: e.target.url.value,
            status: [
              {
                description: "test",
                code: 200,
                type: "success",
              },
            ],
          });
        }}
      >
        <label className="text-normal text-left relative">Site Name</label>
        <input
          type="text"
          name="name"
          className="bg-background rounded border border-primary p-2 text-normal ring-primary"
        />
        <label className="text-normal text-left relative">Site URL</label>
        <input
          type="text"
          name="url"
          className="bg-background rounded border border-primary p-2 text-normal ring-primary"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
