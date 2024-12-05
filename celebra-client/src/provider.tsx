import { NextUIProvider } from "@nextui-org/system";
import { useNavigate } from "react-router-dom";
import { createContext, useState, ReactNode } from "react";

export function Provider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  return <NextUIProvider navigate={navigate}>{children}</NextUIProvider>;
}

export const UserDataContext = createContext({});

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<{
    id: number;
    nome: string;
  }>();

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
