import { Link } from "react-router-dom";
export default function ErrorElement() {
  return (
    <div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <p>Please check the URL and try again.</p>
      <p>If the problem persists, please contact us.</p>
      <p>
        <Link to="/">Go to Home Page</Link>
      </p>
    </div>
  );
}
