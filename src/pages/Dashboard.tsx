import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FundraisingJourney } from "@/components/dashboard/FundraisingJourney";

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard" breadcrumb="Dashboard">
      <FundraisingJourney />
    </DashboardLayout>
  );
}
