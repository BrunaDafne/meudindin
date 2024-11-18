// AuthLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import { ButtonLabelMenu, ButtonMenu, Container, ContainerPages, Content, LogoImg, Menu, Sidebar } from "./styles";
import { Icon } from '@iconify/react';
import logoestagio from '../../assets/logoestagio2.png';

const routes = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: 'line-md:home-md-twotone',
    },
    {
        title: 'Transações',
        path: '/transactions',
        icon: 'line-md:arrows-vertical',
    },
    {
        title: 'Orçamentos',
        path: '/budget',
        icon: 'line-md:alert',
    },
    // {
    //     title: 'Relatórios',
    //     path: '/transactions',
    //     icon: 'line-md:clipboard-check-twotone',
    // },
    // {
    //     title: 'Carteiras',
    //     path: '/transactions',
    //     icon: 'ant-design:wallet-twotone',
    // },
];

export function Layout() {
  const navigate = useNavigate();

  return (
    <Container>
      <Sidebar>
        <LogoImg src={logoestagio} width={90} height={90} />
        <Menu>
            {
                routes.map(({title, path, icon}) => {
                    return (
                        <ButtonMenu onClick={() => {
                            navigate(path)
                            }}>
                            <Icon icon={icon} width="20" height="20" 
                            style={{marginRight: 10}}
                            />
                            <ButtonLabelMenu>{title}</ButtonLabelMenu>
                        </ButtonMenu>
                    )
                })
            }
            <ButtonMenu marginTop='50px' onClick={() => { 
                                localStorage.removeItem('token');
                                navigate('/');
                                return;
                            }}>
                            <Icon icon={'line-md:logout'} width="20" height="20" 
                            style={{marginRight: 10}}
                            />
                            <ButtonLabelMenu>Sair</ButtonLabelMenu>
                        </ButtonMenu>
        </Menu>
      </Sidebar>
      <Content>
        <ContainerPages>
        <Outlet />
        </ContainerPages>
      </Content>
    </Container>
  );
};
