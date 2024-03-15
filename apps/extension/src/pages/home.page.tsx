import { Button } from "@hyperbitui/react";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div
      className="flex flex-col items-center justify-center flex-1 w-full gap-2 mx-auto"
      style={{ maxWidth: "200px" }}
    >
      <Button
        type="button"
        fullWidth
        asChild
        className="block text-center action:text-white"
      >
        <Link to="/onboarding">Get Started</Link>
      </Button>
    </div>
  );
}
