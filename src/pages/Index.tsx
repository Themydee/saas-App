import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="max-w-2xl mx-auto glass-card p-8">
        <h1 className="text-4xl font-bold mb-4">TraceChain</h1>
        <p className="text-xl mb-8">
          Blockchain-powered supply chain transparency system
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/auth">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/home">
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
