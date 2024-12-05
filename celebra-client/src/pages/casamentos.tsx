import { ScrollShadow } from "@nextui-org/scroll-shadow";

import DefaultLayout from "@/layouts/default";
import { TableApp } from "@/components/table";
import { title } from "@/components/primitives";

export default function CasamentosPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <div className="flex flex-col items-center gap-60 h-full md:w-full px-2">
          <h1 className={title()}>Casamentos</h1>
          <ScrollShadow orientation="horizontal">
            <TableApp dataPath="casamentos" />
          </ScrollShadow>
        </div>
      </section>
    </DefaultLayout>
  );
}
