import { auth0 } from "@/lib/auth0";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-switch";
import {
  UserIcon,
  LogInIcon,
  UserPlusIcon,
  LogOutIcon,
  NotebookPen,
} from "lucide-react";

export default async function Home() {
  const session = await auth0.getSession();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      {!session ? (
        <div className="flex flex-col items-center gap-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome to NoteStack
            </h1>
            <p className="text-muted-foreground text-lg">
              Your secure, multi-tenant notetaking app.
            </p>
          </div>
          <div className="flex gap-4">
            <a href="/auth/login?screen_hint=signup">
              <Button variant="default" size="lg">
                <UserPlusIcon className="mr-2 h-5 w-5" />
                Sign up
              </Button>
            </a>
            <a href="/auth/login">
              <Button variant="secondary" size="lg">
                <LogInIcon className="mr-2 h-5 w-5" />
                Log in
              </Button>
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <UserIcon className="h-12 w-12 text-primary" />
            <h1 className="text-3xl font-semibold">
              Welcome, {session.user.name}!
            </h1>
            <p className="text-muted-foreground">Ready to take some notes?</p>
          </div>
          <div className="flex gap-4">
            <a href="/notes">
              <Button size="lg">
                <NotebookPen className="mr-2 h-5 w-5" />
                Take Notes
              </Button>
            </a>
            <a href="/auth/logout">
              <Button variant="destructive" size="lg">
                <LogOutIcon className="mr-2 h-5 w-5" />
                Log out
              </Button>
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
