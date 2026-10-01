-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 01/10/2026 às 16:34
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ellenco`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `fotos`
--

CREATE TABLE `fotos` (
  `id` bigint(20) NOT NULL,
  `relatorio_id` bigint(20) NOT NULL,
  `nome_arquivo` varchar(255) NOT NULL,
  `caminho_arquivo` varchar(500) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `data_foto` datetime DEFAULT NULL,
  `criada_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `fotos`
--

INSERT INTO `fotos` (`id`, `relatorio_id`, `nome_arquivo`, `caminho_arquivo`, `latitude`, `longitude`, `data_foto`, `criada_em`) VALUES
(11, 1, 'foto_obra_01.jpg', 'uploads/fotos/foto_obra_01.jpg', -23.5505200, -46.6333080, '2026-09-24 08:30:00', '2026-10-01 10:49:02'),
(12, 1, 'foto_obra_02.jpg', 'uploads/fotos/foto_obra_02.jpg', -23.5505200, -46.6333080, '2026-09-24 09:15:00', '2026-10-01 10:49:02'),
(13, 1, 'foto_obra_03.jpg', 'uploads/fotos/foto_obra_03.jpg', -23.5505200, -46.6333080, '2026-09-24 10:00:00', '2026-10-01 10:49:02'),
(14, 1, 'foto_obra_04.jpg', 'uploads/fotos/foto_obra_04.jpg', -23.5512000, -46.6341000, '2026-09-24 10:30:00', '2026-10-01 10:49:02'),
(15, 1, 'foto_obra_05.jpg', 'uploads/fotos/foto_obra_05.jpg', -23.5512000, -46.6341000, '2026-09-24 11:00:00', '2026-10-01 10:49:02');

-- --------------------------------------------------------

--
-- Estrutura para tabela `relatorios`
--

CREATE TABLE `relatorios` (
  `id` bigint(20) NOT NULL,
  `usuario_id` bigint(20) NOT NULL,
  `data_relatorio` date NOT NULL,
  `periodo` enum('MANHA','TARDE','NOITE') NOT NULL,
  `descricao` text NOT NULL,
  `status` enum('PENDENTE','SINCRONIZADO') DEFAULT 'PENDENTE',
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `relatorios`
--

INSERT INTO `relatorios` (`id`, `usuario_id`, `data_relatorio`, `periodo`, `descricao`, `status`, `criado_em`) VALUES
(1, 1, '2026-09-24', 'MANHA', 'Concretagem da fundação do setor A.', 'PENDENTE', '2026-10-01 10:44:21');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `token_recuperacao` varchar(255) DEFAULT NULL,
  `token_expiracao` bigint(20) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `login`, `senha`, `token_recuperacao`, `token_expiracao`, `criado_em`) VALUES
(1, 'Maria Clara', 'maria@ellenco.com.br', 'mariaclara', 'TESTE', NULL, NULL, '2026-10-01 10:43:54'),
(2, 'Maria Clara', 'maria@email.com', 'maria123', '$2a$10$2LKrSM9DgQ89yBdZ6ua5TO9h.C6MXH2Ow9yZCGoYUz6opPOAIaz7u', 'f0d2eaf6-a40c-4644-918b-531f5c571753', 1790863707588, '2026-10-01 13:35:07');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `fotos`
--
ALTER TABLE `fotos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_foto_relatorio` (`relatorio_id`);

--
-- Índices de tabela `relatorios`
--
ALTER TABLE `relatorios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_relatorio_usuario` (`usuario_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `fotos`
--
ALTER TABLE `fotos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `relatorios`
--
ALTER TABLE `relatorios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `fotos`
--
ALTER TABLE `fotos`
  ADD CONSTRAINT `fk_foto_relatorio` FOREIGN KEY (`relatorio_id`) REFERENCES `relatorios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `relatorios`
--
ALTER TABLE `relatorios`
  ADD CONSTRAINT `fk_relatorio_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
