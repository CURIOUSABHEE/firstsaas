import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function LayoutPrivate({ children }) {
  const session = await auth();

  if (!session) {
    //redirect session
    redirect("/");
  }

  return children;
}
