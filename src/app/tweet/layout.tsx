'use client';
import NavigationButtons from "@/component/left_side_bar/navigation_buttons";
import Logout from "@/component/left_side_bar/logout";
import AppName from "@/component/left_side_bar/app_name";
import Weather from "@/component/post/weather";
import Trending from "@/component/post/trending";

export default function TweetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full flex">
      {/* Sidebar */}
      <aside className="w-1/5 min-w-[220px] max-w-xs h-screen flex flex-col items-center py-10 px-4 gap-10 bg-white/80 border-r border-blue-100 shadow-lg">
        <AppName />
        <NavigationButtons />
        <div className="flex-grow" />
        <Logout />
      </aside>
      {/* Main Content */}
      <main className="flex-1 min-h-screen p-0 md:p-8 overflow-y-auto   scrollbar-hide">
        {children}
      </main>
      {/* Sidebar */}
        <aside className="hidden md:flex flex-col gap-8 sticky top-10 h-full border-l border-blue-100 shadow-lg">
          <div className="p-6">
            <Weather />
          </div>
          <div className="p-6">
            <Trending />
          </div>
        </aside>
    </div>
  );
}