'use client'
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router

// Define YourComponent first
const YourComponent = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/"); // This will navigate to the homepage
  };

  return (
    <div>
      <p>What you have been looking for has been merged with the home page .</p>
      <button onClick={handleNavigation}>Go to Homepage</button>
    </div>
  );
};

// Now define the TestPage component
const TestPage = () => {
  return (
    <div>
      <h1>Test Page</h1>
      <YourComponent />
    </div>
  );
};

export default TestPage;
