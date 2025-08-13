import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center p-6">
      <h1 className="text-5xl font-bold text-green-700 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! Looks like you wandered off the garden path.
      </p>
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
