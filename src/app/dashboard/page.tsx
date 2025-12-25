import SimpleAuthCheck from "@/components/simple-auth-check";
import DashboardPage from "@/pages/dashboard-page";

export default function Dashboard() {
  return (
    <SimpleAuthCheck>
      <DashboardPage />
    </SimpleAuthCheck>
  );
}
