import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useState, useEffect, ReactNode } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useAsyncList } from "@react-stately/data";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Casamento, Orcamento } from "@/types";
import { ModalOrcamento } from "@/components/modalorcamento";

// const [isLoading, setIsLoading] = React.useState(true);

export default function DashboardPage() {
  const {
    isOpen: isOrcamentoOpen,
    onOpen: onOrcamentoOpen,
    onOpenChange: onOrcamentoOpenChange,
  } = useDisclosure();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_casamentos, setCasamentos] = useState<Casamento[]>([]);
  // const [editOrcamento, setEditOrcamento] = useState(false);

  const getData = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_API}/casamentos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return { casamentos: (await res.json()) as Casamento[] };
  };

  useEffect(() => {
    getData().then((c) => setCasamentos(c.casamentos));
  }, []);

  const getTableData = (item: Orcamento, columnKey: string) => {
    // console.log("list.items: ", list.items);
    // console.log("item: ", item, "columnKey: ", columnKey);

    if (columnKey === "casamentoId") {
      // @ts-ignore
      const { casamento } = list.items.find(
        (o) => o.casamentoId === item.casamentoId
      );

      return (
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button size="sm">Casamento</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-tiny">ID {casamento?.id}</div>
              <div className="text-tiny">
                DATA CASAMENTO{" "}
                {new Date(casamento?.dataCasamento).toLocaleDateString("pt-BR")}
              </div>
              <div className="text-tiny">LOCAL {casamento?.local}</div>
            </div>
          </PopoverContent>
        </Popover>
      );
    }

    if (columnKey === "criadoEm") {
      console.log("item.criadoEm antes: ", item.criadoEm);

      return new Date(item.criadoEm).toLocaleDateString("pt-BR");
      console.log("item.criadoEm depois: ", item.criadoEm);
    }

    if (columnKey === "fornecedorId") {
      // @ts-ignore
      const { fornecedor } = list.items.find(
        (o) => o.fornecedorId === item.fornecedorId
      );
      // console.log("fornecedor: ", fornecedor);

      return (
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button size="sm">Fornecedor</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              {/* <div className="text-small font-bold">Popover Content</div> */}
              <div className="text-tiny">ID {fornecedor?.id}</div>
              <div className="text-tiny">TIPO {fornecedor?.tipo}</div>
              <div className="text-tiny">CNPJ {fornecedor?.cnpj}</div>
              <div className="text-tiny">CONTATO {fornecedor?.contato}</div>
            </div>
          </PopoverContent>
        </Popover>
      );
    }

    return item[columnKey as keyof Orcamento];
  };

  let list = useAsyncList<Orcamento>({
    async load({ signal }) {
      let res = await fetch(`${import.meta.env.VITE_BASE_API}/orcamentos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        signal,
      });

      if (!res.ok) {
        if (res.status === 401) {
          alert("Faça login");

          return { items: [] };
        }

        alert("Deu erro");
        console.log(await res.json());

        return { items: [] };
      }

      let { orcamentos } = (await res.json()) as { orcamentos: Orcamento[] };

      // const orcamentos = json;

      console.log(orcamentos);

      return {
        items: orcamentos,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column as keyof Orcamento];
          let second = b[sortDescriptor.column as keyof Orcamento];
          let cmp =
            (parseInt(first as string) || first) <
            (parseInt(second as string) || second)
              ? -1
              : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const CardStatus = ({
    children,
    status,
    quantidade,
    borderColor,
  }: {
    children: ReactNode;
    status: string;
    quantidade: number;
    borderColor: string;
  }) => (
    <div
      className={`${borderColor} border-l-4 border-solid flex flex-col justify-center items-center md:px-4 bg-gray-100 dark:bg-gray-950 h-52 w-64 rounded-md shadow-md`}
    >
      <p>{status}</p>
      <br />
      <p>{quantidade}</p>
      <br />
      {children}
    </div>
  );

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <div className="flex flex-col items-center gap-16 h-full w-80 md:w-full px-2">
          {/* gap-36 */}
          <h1 className={title()}>Dashboard</h1>
          {/* <div className="w-40 h-60"> */}
          <Button
            className="absolute top-40 right-6"
            color="success"
            size="sm"
            onPress={onOpen}
          >
            Orçamentos
          </Button>
          {/* </div> */}
          {/* <ScrollShadow orientation="vertical"> */}

          <h1 className="w-full text-xl font-medium">MEUS PRÓXIMOS EVENTOS</h1>
          <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap lg:items-start gap-6 h-full w-full justify-center items-center h-30">
            <CardStatus
              borderColor="border-l-sky-400"
              quantidade={5}
              status="EM ANDAMENTO"
            >
              <Button className="bg-sky-400" size="sm">
                Clique para visualizar
              </Button>
            </CardStatus>
            <CardStatus
              borderColor="border-l-green-400"
              quantidade={5}
              status="CONCLUÍDO"
            >
              <Button className="bg-green-400" size="sm">
                Clique para visualizar
              </Button>
            </CardStatus>
            <CardStatus
              borderColor="border-l-yellow-300"
              quantidade={5}
              status="CANCELADO"
            >
              <Button className="bg-yellow-300" size="sm">
                Clique para visualizar
              </Button>
            </CardStatus>
            <CardStatus
              borderColor="border-l-red-500"
              quantidade={5}
              status="PENDENTE"
            >
              <Button className="bg-red-500" size="sm">
                Clique para visualizar
              </Button>
            </CardStatus>
          </div>
          {/* </ScrollShadow> */}

          <Modal
            isOpen={isOpen}
            placement="top-center"
            size="full"
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(_onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    ORÇAMENTOS
                  </ModalHeader>
                  <ModalBody>
                    <Table
                      aria-label="Example table with client side sorting"
                      classNames={{
                        table: "min-h-[400px]",
                      }}
                      sortDescriptor={list.sortDescriptor}
                      onRowAction={() => onOrcamentoOpen()}
                      onSortChange={list.sort}
                    >
                      <TableHeader>
                        <TableColumn key="id" allowsSorting>
                          ID
                        </TableColumn>
                        <TableColumn key="valor" allowsSorting>
                          VALOR
                        </TableColumn>
                        <TableColumn key="criadoEm" allowsSorting>
                          ORÇADO EM
                        </TableColumn>
                        <TableColumn key="fornecedorId" allowsSorting>
                          FORNECEDOR
                        </TableColumn>
                        <TableColumn key="casamentoId" allowsSorting>
                          CASAMENTO
                        </TableColumn>
                      </TableHeader>
                      <TableBody
                        items={list.items}
                        // isLoading={isLoading}
                        // loadingContent={<Spinner label="Loading..." />}
                      >
                        {(item) => (
                          <TableRow key={item.id}>
                            {(columnKey) => (
                              <TableCell>
                                {/* {getKeyValue(item, columnKey)} */}
                                {getTableData(item, columnKey as string)}
                              </TableCell>
                            )}
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <ModalOrcamento
            isOpen={isOrcamentoOpen}
            onOpenChange={onOrcamentoOpenChange}
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
