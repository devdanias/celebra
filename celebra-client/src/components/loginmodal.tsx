import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Dispatch, SetStateAction, useState } from "react";

export const LoginModal = ({
  isOpen,
  onOpenChange,
  setIsLoggedIn,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}) => {
  const [login, setLogin] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const onSubmit = async () => {
    if (login) {
      const res = await fetch(`${import.meta.env.VITE_BASE_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          alert("Faça login");
        } else if (res.status === 404) {
          alert("Essa conta não existe");
        } else {
          alert("Deu erro");
        }

        console.log(await res.json());

        return;
      }

      const data = await res.json();

      console.log(data);

      localStorage.setItem("accessToken", data.access_token);

      setIsLoggedIn(true);
      onOpenChange();

      return;
    }

    const res = await fetch(`${import.meta.env.VITE_BASE_API}/auth/cadastrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });

    if (!res.ok) {
      console.log(await res.json());
      return;
    }

    const data = await res.json();

    console.log(data);

    localStorage.setItem("accessToken", data.access_token);

    setIsLoggedIn(true);

    // onClose
  };

  // const onChange = (e) => {};

  return (
    <>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(_onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {login ? "Login" : "Nova conta"}
              </ModalHeader>
              <ModalBody>
                {!login && (
                  <Input
                    label="Nome"
                    variant="bordered"
                    onChange={(e) => setNome(e.target.value)}
                  />
                )}
                <Input
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  label="Email"
                  placeholder="Entre com email"
                  variant="bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Senha"
                  placeholder="Entre com a senha"
                  type="password"
                  variant="bordered"
                  onChange={(e) => setSenha(e.target.value)}
                />
                <div className="flex py-2 px-1 justify-between">
                  {/* <Link color="primary" href="#" size="sm"> */}
                  {/* Esqueceu a senha? */}
                  {/* </Link> */}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-pink-100"
                  variant="flat"
                  onPress={() => setLogin(!login)}
                >
                  {login ? "Criar conta" : "Login"}
                </Button>
                <Button className="bg-pink-400 text-white" onPress={onSubmit}>
                  {login ? "Entrar" : "Criar"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
