import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { envs } from "@/core/config";
import { CACHE_TAGS } from "@/lib/cache-config";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");

  if (!secret || secret !== envs.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(CACHE_TAGS.promoLinks, "frequent");

  return NextResponse.json({ revalidated: true, tag: CACHE_TAGS.promoLinks });
}
