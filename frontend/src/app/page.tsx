import { getDataFromBackend } from "@/actions/predictionActions";
import DashBoard from "@/components/dashboard/DashBoard";

export default async function Page() {
  const initialData = await getDataFromBackend();

  if (!initialData) {
    return <div>Error loading data</div>;
  }

  return <DashBoard initialData={initialData} />;
}
