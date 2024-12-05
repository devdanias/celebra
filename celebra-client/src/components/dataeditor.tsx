import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { ChangeEvent, useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { AsyncListData } from "@react-stately/data";

import { DataPath, Orcamento, Row } from "@/types";
import { data } from "@/config/data";
import { SharedSelection } from "@nextui-org/system";

export const DataEditor = ({
  item,
  dataPath,
  itemMode,
  onClose,
  list,
}: {
  item: any;
  dataPath: DataPath;
  itemMode: "edit" | "create";
  onClose: () => void;
  list: AsyncListData<Row>;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentItem, setCurrentItem] = useState(item);
  const [selectValue, setSelectValue] = useState<string[]>([]);
  const [changedFields, setChangedFields] = useState({});
  const [convidados, setConvidados] = useState<{ id: number; nome: string }[]>(
    []
  );
  const [fornecedores, setFornecedores] = useState<
    { id: number; nomeFantasia: string }[]
  >([]);
  const [noivos, setNoivos] = useState<{ id: number; nome: string }[]>([]);
  const [selectForm, setSelectForm] = useState<{
    numeroConvidados: string[];
    fornecedores: string[];
    noivos: string[];
  }>({ numeroConvidados: [], fornecedores: [], noivos: [] });

  const getLabel = (i: string) =>
    // @ts-ignore
    data[dataPath].columns.find((c) => c.key === i).label;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    console.log(e.target.value);
    // const fieldChanged = e.target.getAttribute("data-field");
    console.log(field);
    console.log(item);

    setChangedFields({ ...changedFields, [field]: e.target.value });
  };

  // nem lembro pq criei isso aqui
  const onFocusHandler = (e) => {};

  const onSelect = (e: SharedSelection, i: string) => {
    // console.log("i: ", i);
    console.log("e: ", e);
    const data = (
      i === "fornecedores" ? [...e] : [...e].slice(0, 2)
    ) as string[];

    // @ts-ignore
    const _selectForm = { ...selectForm, [i]: data };

    setSelectForm({ ..._selectForm });
    console.log("data: ", data);
    console.log(selectValue);
    // Validar esses select
    setSelectValue(data);
  };

  const renderList = (list: "fornecedores" | "noivos" | "numeroConvidados") => {
    // console.log("i: ", list);
    const options = { fornecedores, noivos, numeroConvidados: convidados };

    return options[list];
  };

  useEffect(() => {
    loadData("convidados").then((data) => {
      setConvidados(data.convidados);
    });
    loadData("fornecedores").then((data) => {
      setFornecedores(data.fornecedores);
    });
    loadData("noivos").then((data) => {
      setNoivos(data.noivos);
    });
  }, []);

  const loadData = async (route: string) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_API}/${route}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!res.ok) {
      console.log("erro: ", await res.json());

      if (res.status === 401) {
        alert("Faça login");
      }

      return [];
    }

    return await res.json();
  };

  const parseDate = (str: string) => {
    if (
      !isNaN(Date.parse(str)) &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(str)
    ) {
      return new Date(str).toLocaleDateString("pt-BR");
    }

    return str;
  };

  const saveData = async () => {
    if (itemMode === "edit") {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API}/${dataPath}/${currentItem.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(changedFields),
        }
      );

      if (res.ok) {
        // list.append(await res.json());
        list.update(currentItem.id, await res.json());
        onClose();

        return;
      }

      if (res.status === 401) {
        alert("Faça login");
      }

      console.log("Deu algum erro, verifique o console");
      console.error(await res.json());

      return; // mensagem de erro aqui
    }

    const body = changedFields;

    console.log("body: ", body);

    if (dataPath === "casamentos") {
      // @ts-ignore
      body.orcamentos = selectForm.fornecedores.map((f) => ({
        fornecedorId: f,
      }));
      // @ts-ignore
      body.convites = selectForm.numeroConvidados.map((c) => ({
        convidadoId: c,
      }));
      // @ts-ignore
      body.noivos = selectForm.noivos;

      console.log("body casamento: ", body);
    }

    const res = await fetch(`${import.meta.env.VITE_BASE_API}/${dataPath}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (res.ok) {
      list.append(await res.json());
      onClose();

      return;
    }

    if (res.status === 401) {
      alert("Faça login");
    }

    // colocar algum comportamento de erro aqui
    onClose();
  };

  const shouldRemoveId = (prop: string) =>
    getLabel(prop) === "ID" && itemMode === "create";

  const shouldRenderRelations = (prop: string) => {
    // console.log("shouldRenderRelations prop: ", prop, "dataPath: ", dataPath);

    return (
      dataPath === "casamentos" &&
      ["noivos", "fornecedores", "numeroConvidados"].includes(prop) &&
      itemMode === "edit"
    );
  };

  const shouldRenderSelect = (prop: string) => {
    // console.log("prop: ", prop);

    return (
      (prop === "noivos" ||
        prop === "fornecedores" ||
        prop === "numeroConvidados") &&
      itemMode === "create"
    );
  };

  const RelationTag = ({ i }: { i: string }) => {
    console.log("RelationTag i: ", i);

    i = i === "fornecedores" ? "orcamentos" : i;

    if (i === "orcamentos") {
      item[i] = item[i].map((o: Orcamento) => ({
        ...o,
        fornecedor: fornecedores.find((f) => f.id == o.fornecedorId),
      }));
    }

    if (i === "numeroConvidados") {
      console.log("item: ", item);
      // item.convidados = convidados.filter((c) =>
      // item.convites.some((conv) => conv.convidadoId == c.id)
      // );
      console.log("item: ", item);
    }

    const fornecedorData = (n: unknown) => {
      // console.log("seila: ", n);

      // @ts-ignore
      const _fornecedor = n!.fornecedor;
      // @ts-ignore
      const _valor = n!.valor;

      return (
        `${_fornecedor?.nomeFantasia}\n` +
        `${_valor}\n` +
        `${_fornecedor?.cnpj}\n` +
        `${_fornecedor?.tipo}\n` +
        `${_fornecedor?.contato}`
      );
    };

    const noivosData = (n: unknown) => {
      return `${n.nome}`;
    };

    const convidadosData = (n: unknown) => {
      console.log("convidados n: ", n);

      return `${n.nome}\n` + `${n.contato}\n` + `${n.status}`;
    };

    console.log("item[i]: ", item[i]);
    console.log("item: ", item);

    const PopoverFornecedor = ({
      fornecedor,
    }: {
      fornecedor: {
        nomeFantasia: string;
        cnpj: string;
        tipo: string;
        contato: string;
      };
    }) => {
      return (
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button size="sm">{fornecedor.nomeFantasia}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-tiny">
                {fornecedor.tipo} {fornecedor.contato} {fornecedor.cnpj}{" "}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      );
    };

    const PopoverNoivo = ({
      nome,
      contato,
      status,
    }: {
      nome: string;
      status: string;
      contato: string;
    }) => {
      return (
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button size="sm">{nome}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-tiny">
                {contato} {status}{" "}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      );
    };

    const PopoverConvidado = ({
      nome,
      contato,
      status,
    }: {
      nome: string;
      status: string;
      contato: string;
    }) => {
      return (
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button size="sm">{nome}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-tiny">
                {contato} {status}{" "}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      );
    };

    return (
      <div className="flex flex-row gap-2 pl-2">
        <p className="text-small font-normal text-gray-600">
          {i === "numeroConvidados" ? "CONVIDADOS" : i.toUpperCase()}
        </p>
        {Array.isArray(item[i]) &&
          item[i].map((n: any, index: number) => {
            console.log("n: ", n);
            console.log("i: ", i);

            let convidado;

            if (i === "numeroConvidados") {
              convidado = convidados.find(
                (c) => c.id == item.convites[index].id
              );
            }

            const getConvidado = (
              data: any
            ): { contato: string; nome: string; status: string } => ({
              contato: data.contato,
              nome: data.contato,
              status: data.status,
            });

            return (
              <>
                {i === "orcamentos" && (
                  <PopoverFornecedor
                    fornecedor={{
                      nomeFantasia: n.fornecedor?.nomeFantasia || "",
                      cnpj: n.fornecedor?.cnpj || "",
                      contato: n.fornecedor?.contato || "",
                      tipo: n.fornecedor?.tipo || "",
                    }}
                  />
                )}
                {i === "noivos" && (
                  <PopoverNoivo
                    contato={n.contato}
                    nome={n.nome}
                    status={n.status}
                  />
                )}
                {i === "numeroConvidados" && (
                  <PopoverConvidado
                    contato={getConvidado(convidado).contato}
                    nome={getConvidado(convidado).nome}
                    status={getConvidado(convidado).status}
                  />
                )}
              </>
            );
          })}
      </div>
    );
  };

  const SelectData = ({
    i,
    selectForm,
  }: {
    i: "numeroConvidados" | "fornecedores" | "noivos";
    selectForm: {
      numeroConvidados: string[];
      fornecedores: string[];
      noivos: string[];
    };
  }) => (
    <Select
      key={i}
      className="max-w-xs"
      label={i === "numeroConvidados" ? "CONVIDADOS" : i.toUpperCase()}
      selectedKeys={selectForm[i]}
      selectionMode="multiple"
      variant="bordered"
      onSelectionChange={(e) => onSelect(e, i)}
    >
      {renderList(i).map((data) => (
        <SelectItem key={data.id}>
          {"nome" in data ? data.nome : data.nomeFantasia}
        </SelectItem>
      ))}
    </Select>
  );

  return (
    <ScrollShadow>
      <div className="max-h-[600px] flex flex-col gap-2">
        {data[dataPath].columns
          .map((c) => c.key)
          .filter((c) => getLabel(c) !== "CASAMENTO")
          .map((i) =>
            shouldRemoveId(i) ? null : shouldRenderRelations(i) ? (
              <RelationTag i={i} />
            ) : shouldRenderSelect(i) ? (
              <SelectData i={i} selectForm={selectForm} />
            ) : (
              // FIXME: resolver isso aqui
              <>
                <Input
                  key={i}
                  defaultValue={parseDate(item ? item[i] : "")}
                  disabled={getLabel(i) === "ID" || i === "status"}
                  label={getLabel(i)}
                  size="sm"
                  // hidden={getLabel(i) === "CASAMENTOS" && dataPath === "noivos"}
                  onChange={(e) => onChangeHandler(e, i)}
                  onFocus={(e) => onFocusHandler(e)}
                />
              </>
            )
          )}
        <div className="flex justify-end gap-2">
          <Button
            className="font-medium w-2 bg-pink-400 text-white"
            onPress={saveData}
          >
            Salvar
          </Button>
        </div>
      </div>
    </ScrollShadow>
  );
};
