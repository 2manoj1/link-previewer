import type { LinkPreviewer, Prisma } from "@prisma/client";

import { prisma } from "~/db.server";

export type { LinkPreviewer } from "@prisma/client";

export function getLinkPreviewer(url: string) {
  return prisma.linkPreviewer.findFirst({
    where: { url },
  });
}

export function getLinkPreviewerById(id: string) {
  return prisma.linkPreviewer.findFirst({
    where: { id },
  });
}

export async function createLinkPreview(data: Prisma.LinkPreviewerCreateInput) {
  const urlPreview = await getLinkPreviewer(data.url);
  if (urlPreview) {
    return updateLinkPreview({ id: urlPreview.id, ...data });
  }
  return prisma.linkPreviewer.create({
    data,
  });
}

export function updateLinkPreview({
  id,
  ...data
}: Prisma.LinkPreviewerCreateInput) {
  return prisma.linkPreviewer.update({
    where: { id },
    data: data,
  });
}

export function deleteLinkPreview({ id }: Pick<LinkPreviewer, "id">) {
  return prisma.linkPreviewer.deleteMany({
    where: { id },
  });
}
