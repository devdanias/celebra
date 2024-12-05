import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

import { TableApp } from "@/components/table";

export default function ConvidadosPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <div className="flex flex-col items-center gap-60 h-full md:w-full px-2">
          <h1 className={title()}>Convidados</h1>
          <ScrollShadow orientation="horizontal">
            <TableApp dataPath="convidados" />
          </ScrollShadow>
        </div>
      </section>
    </DefaultLayout>
  );
}
