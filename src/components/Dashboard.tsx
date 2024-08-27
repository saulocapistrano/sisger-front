import React from 'react';
import { Box, Flex, Heading, Text, IconButton, Grid, GridItem } from '@chakra-ui/react';
import { FaBell, FaUserCircle, FaChartBar, FaCog, FaHome, FaTable, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './style/dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove o token do local storage
    localStorage.removeItem('token');
    // Redireciona para a página de login
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Cabeçalho (Header) */}
      <div className="navbar">
        <div className="logo">PMCE: Sistema de Gestão</div>
        <div className="user-profile">
          <IconButton
            icon={<FaBell />}
            aria-label="Notificações"
            variant="ghost"
            colorScheme="whiteAlpha"
            mr="4"
            className="icon"
          />
          <IconButton
            icon={<FaUserCircle />}
            aria-label="Perfil"
            variant="ghost"
            colorScheme="whiteAlpha"
            mr="4"
            className="icon"
          />
          <IconButton
            icon={<FaSignOutAlt />}
            aria-label="Logout"
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={handleLogout}
            className="icon"
          />
        </div>
      </div>

      {/* Barra Lateral (Sidebar) */}
      <div className="sidebar">
        <a href="/dashboard"><FaHome /> Dashboard</a>
        <a href="/relatorios"><FaChartBar /> Relatórios</a>
        <a href="/configuracoes"><FaCog /> Configurações</a>
        <a href="/usuarios"><FaUsers /> Usuários</a>
        <a href="/tabelas"><FaTable /> Tabelas</a>
      </div>

      {/* Corpo Principal (Main Content) */}
      <div className="main-content">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem>
            <Box className="card">
              <Heading as="h3" size="md">Total de Usuários</Heading>
              <Text>1,500</Text>
            </Box>
          </GridItem>
          <GridItem>
            <Box className="card">
              <Heading as="h3" size="md">Relatórios Gerados</Heading>
              <Text>245</Text>
            </Box>
          </GridItem>
          <GridItem>
            <Box className="card">
              <Heading as="h3" size="md">Métricas Importantes</Heading>
              <Text>...</Text>
            </Box>
          </GridItem>
        </Grid>

        <Box className="chart-card">
          <Heading as="h2" size="lg">Gráfico de Desempenho</Heading>
          <Text>Gráfico detalhado ou tabela aqui</Text>
        </Box>
      </div>

      {/* Rodapé (Footer) */}
      <div className="footer">
        © 2024 PMCE - CETIC Todos os direitos reservados.
        <br />
        Versão do Sistema: 1.0.0
      </div>
    </div>
  );
}
