import React from "react";
import { mockAddOnSdk } from "./mockAddOnSdk";
import * as ReactDOMClient from "react-dom/client";
import App from "../src/ui/components/App";

const root = ReactDOMClient.createRoot(document.getElementById("root")!);
root.render(
  <App
    addOnUISdk={mockAddOnSdk}
    sandboxProxy={{
      createRectangle() {
        console.log("createRectangle");
      },
    }}
  />
);
