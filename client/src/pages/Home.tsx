import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center py-16 sm:py-20">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to LMS Platform
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Start your learning journey today with our comprehensive courses
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/courses"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Browse Courses
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Sign up now <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}