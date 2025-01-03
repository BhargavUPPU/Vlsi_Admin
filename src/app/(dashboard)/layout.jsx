import { AppSidebar } from "../../components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "../../components/components/ui/sidebar";
import Notification from "../../components/notification";
import BreadcrumbSection from "../../components/breadcrumb-section";
import AuthProvider from "../../context/AuthProvider";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <AuthProvider>
        <SidebarProvider className="flex">
          <AppSidebar />
          <div className="flex flex-col flex-1">
            <header className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <SidebarTrigger />
                <div className="flex xl:hidden font-semibold text-sm">
                  Admin
                </div>
                <BreadcrumbSection />
              </div>
              <Notification />
            </header>

            <main className="px-7 py-4 text-zinc-900">
              <BreadcrumbSection className="flex xl:hidden mb-6" />
              {children}
            </main>
          </div>
        </SidebarProvider>
      </AuthProvider>
    </div>
  );
}
