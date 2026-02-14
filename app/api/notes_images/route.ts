import { error } from "console";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
    try {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder");

  const baseDir = path.join(process.cwd(), "public/icons/notes");
  const imgDir = path.normalize(path.resolve(baseDir, folder));
  const files = fs.readdirSync(imgDir);

  if (!imgDir.startsWith(baseDir)) {
    throw error
  }

  return Response.json(files);
}catch (error)  {
    return Response.json({error: "Folder not found"}, {status: 404})
}
}
