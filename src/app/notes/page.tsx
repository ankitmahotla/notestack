import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { NotesDashboard } from "@/components/notes-dashboard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default async function NotesPage() {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/");
  }

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Link href="/" passHref>
          <Button variant="outline">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      <NotesDashboard userId={session.user.sub} />
    </main>
  );
}
