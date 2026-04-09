import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center section-dark-1">
      <div className="text-center">
        <h1 className="mb-4 font-hero text-8xl text-primary text-shadow-lg">404</h1>
        <p className="mb-6 text-xl text-white/50 font-body">Oops! Page not found</p>
        <Link to="/" className="btn-primary-cta inline-block text-sm">Return to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
