import { auth } from "@/auth";
import { redirect } from "next/navigation";

import ProviderLogins from "../components/provider-logins/provider-logins";

async function SignIn() {
  const session = await auth();

  const user = session?.user;

  if (user) return redirect("/profile");

  return (
    <main>
      <ProviderLogins />
    </main>
  );
}

export default SignIn;
