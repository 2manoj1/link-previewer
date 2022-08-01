import type { LoaderFunction } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

import { getLinkPreviewerById } from "~/models/linkpreviewer.server";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

async function getLoaderData(linkUrlId: string) {
  const linkPreviewerDetails = await getLinkPreviewerById(linkUrlId);

  return linkPreviewerDetails;
}

export const loader: LoaderFunction = async ({ params }) => {
  return json<LoaderData>(await getLoaderData(params.linkUrlId ?? ""));
};

export default function Product() {
  const linkPreviewerDetails = useLoaderData<LoaderData>();

  if (!linkPreviewerDetails) return <div>404</div>;

  console.log(linkPreviewerDetails);
  const { thumbnail, title, url, description } = linkPreviewerDetails;
  return (
    <main className="flex h-screen flex-1 flex-row items-center justify-center bg-gray-100">
      <div className="max-w-sm overflow-hidden rounded bg-white shadow-2xl">
        <img className="w-full" src={thumbnail} alt={title} />
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">{title}</div>
          <p className="text-base text-gray-700">{description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
            {url}
          </span>
        </div>
      </div>
    </main>
  );
}
