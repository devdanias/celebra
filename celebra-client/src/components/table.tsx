import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { getKeyValue } from "@nextui-org/shared-utils";
import { useAsyncList } from "@react-stately/data";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

import { data } from "@/config/data";
import { DataEditor } from "@/components/dataeditor";
import { DataPath, Row } from "@/types";

export const TableApp = ({ dataPath }: { dataPath: DataPath }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<Row | null>(null);
  const [itemMode, setItemMode] = useState<"edit" | "create">("edit");

  const newItem = () => {
    setSelectedItem(null);
    setItemMode("create");
    onOpen();
  };

  let list = useAsyncList<Row>({
    async load({ signal }) {
      let res = await fetch(`${import.meta.env.VITE_BASE_API}/${dataPath}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        signal,
      });

      if (!res.ok) {
        return { items: [] };
      }

      let json = await res.json();
      console.log(json);

      return { items: json[dataPath] };
    },

    async sort({ items, sortDescriptor }) {
      const sortedItems = items.sort((a, b) => {
        const columnKey = sortDescriptor.column!;
        // @ts-ignore
        const aValue = a[columnKey] as string;
        // @ts-ignore
        const bValue = b[columnKey] as string;

        if (sortDescriptor.direction === "ascending") {
          return aValue < bValue ? -1 : 1;
        } else {
          return aValue > bValue ? -1 : 1;
        }
      });

      return { items: sortedItems };
    },
  });

  const parseDate = (str: string) => {
    if (
      !isNaN(Date.parse(str)) &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(str)
    ) {
      return new Date(str).toLocaleDateString("pt-BR");
    }

    return str;
  };

  const formatData = (item: unknown, columnKey: string) => {
    console.log("item: ", item);
    console.log("columnKey: ", columnKey);

    if (columnKey === "fornecedores") {
      console.log("é fornecedores aqui");

      return (item as { orcamentos: unknown[] }).orcamentos.length;
    }

    if (columnKey === "noivos") {
      return (item as { noivos: { nome: string }[] }).noivos
        .map((n) => n.nome)
        .join(", ");
    }

    if (columnKey === "numeroConvidados") {
      return (item as { convites: unknown[] }).convites.length;
    }

    let data = getKeyValue(item, columnKey);

    if (!data) return "Nenhum";

    data = Array.isArray(data) ? data.join(", ") : data;

    data = parseDate(data);

    return data;
  };

  return (
    <>
      <div className="flex justify-end mr-5 mb-6 gap-1">
        {/* <Button color="danger"> Apagar </Button> */}
        <Button
          className="font-medium bg-pink-400 text-white"
          onPress={newItem}
        >
          Novo
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <Table
          aria-label="Rows actions table example with dynamic content"
          className="h-[280px] max-w-[400px] lg:max-w-[1400px]"
          selectionBehavior="toggle"
          selectionMode="multiple"
          sortDescriptor={list.sortDescriptor}
          onRowAction={(key) => {
            // lembrar de verficar os tipos do id (string ou number)
            setSelectedItem(list.getItem(Number(key)));
            setItemMode("edit");
            onOpen();
          }}
          onSortChange={list.sort}
        >
          <TableHeader
            columns={
              (data[dataPath] as { columns: { key: string; label: string }[] })
                .columns
            }
          >
            {(column) => (
              <TableColumn key={column.key} allowsSorting>
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={list.items}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{formatData(item, columnKey as string)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {dataPath.toUpperCase()}
                </ModalHeader>
                <ModalBody>
                  <DataEditor
                    dataPath={dataPath}
                    item={selectedItem}
                    itemMode={itemMode}
                    list={list}
                    onClose={onClose}
                  />
                </ModalBody>
                <ModalFooter></ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
