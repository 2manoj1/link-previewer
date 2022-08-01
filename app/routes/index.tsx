import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createLinkPreview } from "~/models/linkpreviewer.server";
import { getMetaData } from "~/models/metascrapper.server";

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

const isUrl = (str: string) => {
  try {
    return Boolean(new URL(str));
  } catch (e) {
    return false;
  }
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const url = formData.get("url") as string;

  if (!isUrl(url)) {
    return badRequest({
      fieldErrors: { url: `URL is not valid.` },
    });
  }

  const metaData = await getMetaData(url);
  if (metaData) {
    const { title, image, description, url } = metaData;
    const { id } = await createLinkPreview({
      title,
      thumbnail: image,
      description,
      url,
    });
    return redirect("/" + id);
  }

  return { fields: { url } };

  // await createLinkPreview({ title, slug, markdown });
};

type ActionData = {
  formError?: string;
  fieldErrors?: {
    url: string | undefined;
  };
  fields?: {
    url: string;
  };
};

export default function () {
  const actionData = useActionData<ActionData>();
  return (
    <main className="mt-8 flex h-screen flex-1 flex-row justify-center">
      <Form method="post">
        <div>
          <label htmlFor="link-url">Provide Link URL</label>
          <input
            type="text"
            id="link-url"
            name="url"
            className={inputClassName}
            defaultValue={actionData?.fields?.url}
            aria-errormessage={
              actionData?.fieldErrors?.url ? "url-error" : undefined
            }
          />
          {actionData?.fieldErrors?.url ? (
            <p className="mt-2 text-red-900" role="alert" id="url-error">
              {actionData.fieldErrors.url}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          className="mt-4 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Get Link Preview
        </button>
      </Form>
    </main>
  );
}
