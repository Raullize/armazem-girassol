# 🌻 Armazém Girassol - E-commerce de Produtos Naturais

[![en](https://img.shields.io/badge/lang-en-red.svg)](./README.en.md)

## 📋 Descrição do Projeto

O **Armazém Girassol** é um e-commerce moderno especializado em produtos naturais, oferecendo uma experiência de compra intuitiva e responsiva. Desenvolvido com Next.js e tecnologias modernas, o projeto foca na usabilidade, design limpo e facilidade de navegação para proporcionar a melhor experiência aos usuários.

## 🎬 Demonstração

Veja o Armazém Girassol em ação! Confira nossa demonstração completa das principais funcionalidades:

<div align="center">
  <img src="public/assets/demo/demo.gif" alt="Demonstração do Armazém Girassol" width="800">
</div>

> 📱 **Quer ver mais detalhes?** [Clique aqui para visualizar em tamanho completo](public/assets/demo/demo.gif)

> ⏳ **Nota**: A demonstração pode demorar alguns segundos para carregar devido ao tamanho do arquivo. Por favor, aguarde!

## ✨ Funcionalidades Principais

- �️ **Catálogo de produtos naturais** com navegação intuitiva
- 🔍 **Sistema de filtros avançados** por categoria e faixa de preço
- 🛒 **Carrinho de compras interativo** com Context API
- 📱 **Checkout via WhatsApp** para facilitar as vendas
- 📱 **Design totalmente responsivo** para todos os dispositivos
- 🎨 **Interface moderna** com CSS Modules
- 🔄 **Slideshow de imagens** para destacar produtos
- 📊 **Paginação inteligente** para melhor performance

## �️ Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React para produção
- **React 18** - Biblioteca para interfaces de usuário
- **CSS Modules** - Estilização modular e isolada
- **Context API** - Gerenciamento de estado global
- **Hooks personalizados** - Lógica reutilizável
- **Framer Motion** - Animações fluidas
- **React Icons** - Ícones modernos
- **React Slick** - Carrossel de imagens

## 📋 Requisitos do Sistema

### Para o Frontend (Next.js)
- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**

### Para o Backend e Banco de Dados
- **XAMPP** (Apache + MySQL + PHP)
- **phpMyAdmin** (incluído no XAMPP)
- **StockDeps** para gerenciamento de produtos

## 🗄️ Estrutura do Banco de Dados

O projeto utiliza um banco de dados MySQL com as seguintes tabelas principais:

- **`categorias`** - Categorias dos produtos
- **`produtos`** - Informações dos produtos (nome, preço, descrição, etc.)
- **`clientes`** - Dados dos clientes
- **`fornecedores`** - Informações dos fornecedores
- **`entradas`** - Controle de entrada de produtos no estoque
- **`saidas`** - Controle de saída de produtos do estoque
- **`users`** - Usuários do sistema de gerenciamento

## 🚀 Instalação e Configuração

### 1. Configurar o Ambiente de Banco de Dados

#### Instalar e Configurar o XAMPP
1. **Baixe e instale o XAMPP** do site oficial
2. **Inicie os serviços** Apache e MySQL no painel de controle do XAMPP
3. **Acesse o phpMyAdmin** através de `http://localhost/phpmyadmin`

#### Criar o Banco de Dados
1. No phpMyAdmin, **crie um novo banco de dados** chamado `armazem_girassol`
2. **Importe o arquivo SQL** localizado em `database/schema.sql`:
   - Clique na aba "Importar"
   - Selecione o arquivo `schema.sql`
   - Clique em "Executar"

### 2. Configurar o Frontend (Next.js)

1. **Clone o repositório:**
```bash
git clone https://github.com/Raullize/armazem-girassol.git
cd armazem-girassol
```

2. **Instale as dependências:**
```bash
npm install
```

### 3. Gerenciamento de Produtos com StockDeps

⚠️ **Importante:** Para ter produtos disponíveis no e-commerce, você precisa usar o sistema **StockDeps** para cadastrar e gerenciar o estoque.

#### Configurar o StockDeps
1. **Clone o repositório do StockDeps:**
```bash
git clone https://github.com/Raullize/stockDeps
```

2. **Siga as instruções de instalação** do StockDeps
3. **Configure o mesmo banco de dados** (`armazem_girassol`) no StockDeps
4. **Cadastre categorias e produtos** através da interface do StockDeps

#### Credenciais do StockDeps
- **Usuário:** `teste`
- **Senha:** `teste`

## 🎯 Rodando o Projeto

### 1. Certifique-se de que o XAMPP está rodando
- Apache: ✅ Ativo
- MySQL: ✅ Ativo

### 2. Inicie o servidor de desenvolvimento do Next.js
```bash
npm run dev
```

### 3. Acesse a aplicação
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
armazem-girassol/
├── src/                    # Código fonte principal
│   ├── app/               # App Router do Next.js
│   ├── components/        # Componentes React reutilizáveis
│   ├── context/          # Context API (CartContext)
│   ├── hooks/            # Hooks personalizados
│   ├── lib/              # Utilitários e configurações
│   └── utils/            # Funções auxiliares
├── public/               # Arquivos estáticos
│   └── assets/images/    # Imagens do projeto
├── database/             # Scripts do banco de dados
│   └── schema.sql        # Estrutura das tabelas
├── package.json          # Dependências e scripts
├── jsconfig.json         # Configuração de paths
└── next.config.js        # Configuração do Next.js
```

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera a build de produção
npm run start    # Inicia o servidor de produção
npm run lint     # Executa o linter
```

## 🌐 Integração com StockDeps

O Armazém Girassol foi projetado para trabalhar em conjunto com o **StockDeps**, um sistema completo de gerenciamento de estoque. Esta integração permite:

- ✅ **Cadastro de produtos** através de interface administrativa
- ✅ **Controle de estoque** em tempo real
- ✅ **Gerenciamento de categorias** organizadas
- ✅ **Relatórios de vendas** e movimentação
- ✅ **Dashboard administrativo** completo

### Por que usar o StockDeps?
- Interface administrativa robusta e intuitiva
- Controle completo de estoque e movimentações
- Relatórios em PDF e Excel
- Sistema testado e aprovado em ambiente empresarial
- Arquitetura MVC bem estruturada

---

**🌻 Armazém Girassol** - Produtos naturais com tecnologia moderna
