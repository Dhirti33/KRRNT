import Link from 'next/link';
import { usePostStore } from '@/lib/zustand/store';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import Person2Icon from '@mui/icons-material/Person2';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function NavigationButtons() {
  const { ID } = usePostStore();
  // Helper to determine profile/settings link
  const profileHref = ID ? '/tweet/profile' : '/login';
  const settingsHref = ID ? '/tweet/settings' : '/login';

  return (
    <nav className="navigation_btn h-3/5 w-4/5 flex flex-col gap-4 font-bold mx-auto mt-8">
      <Link
        href="/tweet"
        className="flex gap-3 items-center px-4 py-2 rounded-lg hover:bg-gray-100/70 transition group"
      >
       <HomeFilledIcon className="w-5 h-5" />
        <span className="text text-xl text-gray-800 transition">Home</span>
      </Link>
      <Link
        href={profileHref}
        className="flex gap-3 items-center px-4 py-2 rounded-lg hover:bg-gray-100/70 transition group"
      >
      <Person2Icon className="w-5 h-5" />
        <span className="text text-xl text-gray-800 transition">Profile</span>
      </Link>
      <Link
        href={settingsHref}
        className="flex gap-3 items-center px-4 py-2 rounded-lg hover:bg-gray-100/70 transition group"
      >
      <SettingsIcon className="w-5 h-5" />
        <span className="text text-xl text-gray-800 transition">Settings</span>
      </Link>
      <Link
        href="/tweet/create_post"
        className="flex gap-3 items-center px-4 py-2 rounded-lg hover:bg-gray-100/70 transition group"
      >
        <AddCircleIcon className="w-5 h-5" />
        <span className="text text-xl text-gray-800 transition">Create Post</span>
      </Link>
    </nav>
  );
}
