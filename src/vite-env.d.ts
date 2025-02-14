/// <reference types="vite/client" />

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.tsx" {
  import React from "react";
  const component: React.ComponentType;
  export default component;
}
