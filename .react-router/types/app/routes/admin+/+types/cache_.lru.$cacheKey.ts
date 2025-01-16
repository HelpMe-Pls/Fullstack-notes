// React Router generated types for route:
// routes/admin+/cache_.lru.$cacheKey.ts

import type * as T from "react-router/route-module"

import type { Info as Parent0 } from "../../../+types/root.js"

type Module = typeof import("../cache_.lru.$cacheKey.js")

export type Info = {
  parents: [Parent0],
  id: "routes/admin+/cache_.lru.$cacheKey"
  file: "routes/admin+/cache_.lru.$cacheKey.ts"
  path: "admin/cache/lru/:cacheKey"
  params: {"cacheKey": string} & { [key: string]: string | undefined }
  module: Module
  loaderData: T.CreateLoaderData<Module>
  actionData: T.CreateActionData<Module>
}

export namespace Route {
  export type LinkDescriptors = T.LinkDescriptors
  export type LinksFunction = () => LinkDescriptors

  export type MetaArgs = T.CreateMetaArgs<Info>
  export type MetaDescriptors = T.MetaDescriptors
  export type MetaFunction = (args: MetaArgs) => MetaDescriptors

  export type HeadersArgs = T.HeadersArgs
  export type HeadersFunction = (args: HeadersArgs) => Headers | HeadersInit

  export type LoaderArgs = T.CreateServerLoaderArgs<Info>
  export type ClientLoaderArgs = T.CreateClientLoaderArgs<Info>
  export type ActionArgs = T.CreateServerActionArgs<Info>
  export type ClientActionArgs = T.CreateClientActionArgs<Info>

  export type HydrateFallbackProps = T.CreateHydrateFallbackProps<Info>
  export type ComponentProps = T.CreateComponentProps<Info>
  export type ErrorBoundaryProps = T.CreateErrorBoundaryProps<Info>
}