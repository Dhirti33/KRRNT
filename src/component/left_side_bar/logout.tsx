import {signOutUser} from '@/lib/supabase/auth';
import { usePostStore } from '@/lib/zustand/store';

export default function Logout() {
  const { reset } = usePostStore();

  const handleLogout = async () => {
    try {
      await signOutUser();
      reset(); // Reset the post store on logout
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');}
  };
  return (
    <div className="w-full flex justify-center mb-4">
      <button
        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow hover:from-blue-600 hover:to-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
