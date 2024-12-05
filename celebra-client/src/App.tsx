import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import CasamentosPage from "@/pages/casamentos";
import NoivosPage from "@/pages/noivos";
import ConvidadosPage from "@/pages/convidados";
import FornecedoresPage from "@/pages/fornecedores";
import DashboardPage from "@/pages/dashboard";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<CasamentosPage />} path="/casamentos" />
      <Route element={<NoivosPage />} path="/noivos" />
      <Route element={<ConvidadosPage />} path="/convidados" />
      <Route element={<FornecedoresPage />} path="/fornecedores" />
      <Route element={<DashboardPage />} path="/dashboard" />
    </Routes>
  );
}

export default App;
