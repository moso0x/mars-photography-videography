import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (location.pathname === "/") return null; // hide on home

  return (
    <nav className="bg-muted/30 px-6 py-3 text-sm">
      <ol className="flex flex-wrap items-center space-x-2">
        <li>
          <Link to="/" className="text-muted-foreground hover:text-primary">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const label =
            value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");

          return (
            <li key={to} className="flex items-center space-x-2">
              <span className="text-muted-foreground">/</span>
              {isLast ? (
                <span className="text-foreground font-medium">{label}</span>
              ) : (
                <Link
                  to={to}
                  className="text-muted-foreground hover:text-primary"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
