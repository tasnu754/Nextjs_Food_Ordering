import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-4 text-gray-600">
          You do not have permission to access this page.
        </p>
        <Link
          href="/"
          className="mt-6 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
