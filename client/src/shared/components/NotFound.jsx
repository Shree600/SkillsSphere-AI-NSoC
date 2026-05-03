import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p>Page not found</p>
      <Link to="/" className="text-blue-400 underline">
        Go back home
      </Link>
    </div>
  );
}