import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function AppHeader() {
    return (
        <header className="bg-primary text-white px-4 py-3 shadow-md sticky top-0 z-50">
            <h1 className="text-lg font-bold">HomeCyclHome</h1>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="w-6 h-6 text-white" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-sm">
                    <div className="p-6 space-y-6">
                        <h2 className="text-xl font-semibold">Menu</h2>
                        <nav className="space-y-4">
                            <Button asChild variant="outline" className="w-full justify-start">
                                <Link href="/dashboard">Planning</Link>
                            </Button>
                            <Button asChild variant="destructive" className="w-full justify-start">
                                <Link href="#">Déconnexion</Link>
                            </Button>
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    );
}
