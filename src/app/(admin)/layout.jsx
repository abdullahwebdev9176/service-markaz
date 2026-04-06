import Link from "next/link";
import { LayoutDashboard, Users, Building2, ListChecks, Star, MessageSquare, Settings } from "lucide-react";

export const metadata = {
  robots: { index: false, follow: false },
};

const sidebarLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Businesses", href: "/admin/businesses", icon: Building2 },
  { name: "Categories", href: "/admin/categories", icon: ListChecks },
  { name: "Reviews", href: "/admin/reviews", icon: Star },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:block">
        <div className="p-6 text-xl font-bold border-b">
          ServiceMarkaz Admin
        </div>
        <nav className="p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition"
              >
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Admin</span>
            <button className="bg-red-500 text-white px-4 py-2 rounded-xl">
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
