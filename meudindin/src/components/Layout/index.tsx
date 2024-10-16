// AuthLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import { ButtonLabelMenu, ButtonMenu, Container, Content, Menu, Sidebar } from "./styles";
// import { Icon } from '@iconify/react';

const routes = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: '',
    },
    {
        title: 'Transações',
        path: '/transactions',
        icon: '',
    },
    {
        title: 'Relatórios',
        path: '/transactions',
        icon: '',
    },
    {
        title: 'Orçamentos',
        path: '/transactions',
        icon: '',
    },
    {
        title: 'Carteiras',
        path: '/transactions',
        icon: '',
    },
    {
        title: 'Cartões',
        path: '/transactions',
        icon: '',
    },
];

export function Layout() {
  const navigate = useNavigate();

  return (
    <Container>
      <Sidebar>
        <Menu>
            {
                routes.map(({title, path}) => {
                    return (
                        <ButtonMenu onClick={() => navigate(path)}>
                            {/* <Icon icon={'home'} size={24} /> */}
                            <ButtonLabelMenu>{title}</ButtonLabelMenu>
                        </ButtonMenu>
                    )
                })
            }
        </Menu>
      </Sidebar>
      <Content>
        {/* O `Outlet` irá renderizar as páginas internas */}
        <Outlet />
      </Content>
    </Container>
  );
};
