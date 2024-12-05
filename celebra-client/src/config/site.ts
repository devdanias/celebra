export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Celebra",
  description: "sla",
  // navItems: [],
  navMenuItems: [
    /* {
      label: "Cadastre-se",
      href: "/cadastrar",
    }, */
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Noivos",
      href: "/noivos",
    },
    {
      label: "Casamentos",
      href: "/casamentos",
    },
    {
      label: "Fornecedores",
      href: "/fornecedores",
    },
    {
      label: "Convidados",
      href: "/convidados",
    },
    /*
    {
      label: "Pagamentos",
      href: "/pagamentos",
    },
    {
      label: "Logout",
      href: "/logout",
    }, */
  ],
};
