import { Wedding } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center w-full gap-4 py-4">
        <Wedding size={300} />
      </div>
    </DefaultLayout>
  );
}
