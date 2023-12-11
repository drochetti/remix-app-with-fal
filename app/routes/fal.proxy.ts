import { handleRequest } from "@fal-ai/serverless-proxy";
import type {
  ActionFunctionArgs,
  ActionFunction,
  LoaderFunctionArgs,
  LoaderFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";

const proxy = async ({ request }: ActionFunctionArgs | LoaderFunctionArgs) => {
  const responseHeaders = new Headers();
  return handleRequest({
    id: "remix",
    method: request.method,
    respondWith: (status, data) =>
      json(data, { status, headers: responseHeaders }),
    getHeaders: () => Object.fromEntries(request.headers.entries()),
    getHeader: (name) => request.headers.get(name),
    sendHeader: (name, value) => responseHeaders.set(name, value),
    getBody: async () => JSON.stringify(await request.json()),
  });
};

export const action: ActionFunction = proxy;

export const loader: LoaderFunction = proxy;
