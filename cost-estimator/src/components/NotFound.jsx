import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-code">
        404
      </div>
      <h1 className="notfound-title">Page Not Found</h1>
      <p className="notfound-description">
        The URL path you entered does not match any existing page in this CRM application.
      </p>
      <Link to="/dashboard" className="btn-primary">
        🏠 Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
