// import { create, getUserById } from "@/prisma/User";
// import { type NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const id = searchParams.get("id");

//   if (!id) return new Response("ID NOT FOUND", { status: 400 });

//   const user = await getUserById(id);

//   console.log("user di GET : ", user);

//   return Response.json({ data: user });
// }

// export async function POST(request: Request) {
//   const res = await request.json();

//   await create(res);

//   return new Response("Success!", {
//     status: 200,
//   });
// }
