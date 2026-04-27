# 🌻 Plano de Implementação: Armazém Girassol v2.0.0

Este documento detalha o plano de desenvolvimento para a versão 2.0.0 do e-commerce Armazém Girassol. O projeto será **reconstruído do zero** para garantir uma arquitetura limpa, desacoplamento total do sistema legado (`StockDeps`) e uma base de código moderna e escalável.

---

## 1. Stack Tecnológica
*   **Framework:** Next.js 15 (App Router)
*   **Linguagem:** TypeScript (Desenvolvimento nativo em TS para maior robustez e tipagem segura)
*   **Estilização:** Tailwind CSS (Sistema de design utility-first para desenvolvimento ágil)
*   **Dados:** JSON Mockado (Arquitetura preparada para API futura, sem dependências de legado)
*   **Gerenciamento de Estado:** Context API (Implementação limpa para carrinho e preferências)

### 1.1 Identidade Visual (MIV)
A identidade visual deve refletir a natureza orgânica e acolhedora da marca, utilizando tons que remetem à terra, ao sol e à vitalidade.

*   **Paleta de Cores (Tailwind):**
    *   🌻 **Primária (Girassol):** `yellow-400` (#FACC15) a `yellow-500` - Usado em botões de ação (CTA), destaques e ícones principais. Transmite energia e calor.
    *   🌿 **Secundária (Natureza):** `green-600` (#16A34A) a `green-700` - Usado em badges de "Saudável", preços e mensagens de sucesso. Remete a frescor e saúde.
    *   🟤 **Terciária (Terra):** `amber-900` (#78350F) - Usado em rodapés, textos de destaque e bordas sutis. Conecta com a terra e grãos.
    *   ☁️ **Fundo (Neutro):** `yellow-50` (#FEFCE8) ou `stone-50` - Fundo das páginas para evitar o branco absoluto, trazendo conforto visual.
    *   📝 **Texto:** `gray-800` (#1F2937) para títulos e `gray-600` (#4B5563) para parágrafos - Garante legibilidade e contraste suave.

*   **Tipografia:**
    *   **Títulos:** Fontes com personalidade, levemente arredondadas ou serifadas modernas (Sugestão: `Nunito` ou `Fredoka`) para transmitir proximidade.
    *   **Corpo:** Fontes sans-serif limpas e legíveis (Sugestão: `Inter` ou `Open Sans`) para descrições de produtos e textos longos.

*   **Estilo Visual:**
    *   **Bordas:** Arredondadas (`rounded-xl` ou `rounded-2xl`) em cards e botões para um visual amigável e orgânico.
    *   **Sombras:** Suaves e difusas (`shadow-sm` a `shadow-lg`) para criar profundidade sem pesar o layout.
    *   **Espaçamento:** Generoso (Whitespace), permitindo que o conteúdo respire e destaque as imagens dos produtos.

---

## 2. Estrutura de Dados (Mock)
A "fonte da verdade" inicial será um arquivo `src/data/db.json`. Isso permite desenvolver o frontend com dados consistentes antes da integração com um novo backend.

### Arquivo: `src/data/db.json` (Exemplo da Estrutura)

```json
{
  "categories": [
    {
      "id": 1,
      "name": "Temperos",
      "slug": "temperos",
      "image": "/assets/images/temperos.webp"
    },
    {
      "id": 2,
      "name": "Grãos e Sementes",
      "slug": "graos-sementes",
      "image": "/assets/images/graos.webp"
    }
  ],
  "products": [
    {
      "id": 101,
      "categoryId": 1,
      "name": "Páprica Defumada",
      "description": "Páprica defumada de alta qualidade, ideal para carnes e molhos.",
      "price": 4.50,
      "unit": "100g",
      "isBestSeller": true,
      "image": "/assets/images/products/paprica.webp",
      "stock": 50
    },
    {
      "id": 201,
      "categoryId": 2,
      "name": "Chia",
      "description": "Semente de chia rica em ômega 3.",
      "price": 6.00,
      "unit": "100g",
      "isBestSeller": false,
      "image": "/assets/images/products/chia.webp",
      "stock": 20
    }
  ],
  "featuredCollections": [
    {
      "id": "best-sellers",
      "title": "Os Mais Queridinhos",
      "subtitle": "Produtos que nossos clientes amam",
      "productIds": [101, 201] 
    },
    {
      "id": "new-arrivals",
      "title": "Novidades Fresquinhas",
      "subtitle": "Acabaram de chegar no armazém",
      "productIds": [201]
    }
  ]
}
```

### 2.1 Estrutura de Arquivos Estáticos (`/public`)
Para garantir organização e facilidade de manutenção, adotaremos esta estrutura para imagens e assets:

```
public/
├── images/
│   ├── products/      # Fotos dos produtos (ex: paprica-defumada.webp)
│   ├── categories/    # Capas das categorias (ex: temperos.webp)
│   ├── banners/       # Banners da Home e promoções
│   └── about/         # Fotos institucionais (loja, equipe)
├── branding/          # Logos e identidade visual
├── icons/             # Favicons e ícones do sistema
└── demo/              # Demonstrações do projeto (ex: demo.gif para README)
```

---

## 3. Páginas e Conteúdo

### 🏠 Home (`/`)
*   **Hero Section:**
    *   **Título:** "O a granel mais queridinho da região."
    *   **Subtítulo:** "Dê um giro na sua vida com os produtos naturais do Armazém Girassol."
    *   **CTA Principal:** Botão "Ver Produtos" -> leva para `/products`
    *   **Imagem de Fundo:** Imagem de alta qualidade do interior da loja ou produtos.
*   **Categorias:** Grid visual com ícones/fotos das categorias principais.
*   **Carrosséis Dinâmicos:**
    1.  "Mais Vendidos" (Filtrado por `featuredCollections.best-sellers`)
    2.  "Novidades"
    3.  "Ofertas Especiais"
*   **Footer:** Links sociais, endereço e direitos autorais.

### 🛍️ Produtos (`/products`)
*   **Filtros:**
    *   Sidebar ou Topbar com filtros por Categoria e Faixa de Preço.
    *   Ordenação (Menor Preço, Maior Preço, A-Z).
*   **Grid de Produtos:** Cards modernos com botão de "Adicionar Rápido" ao carrinho.
*   **Paginação/Infinite Scroll:** Carregar produtos sob demanda.

### ℹ️ Sobre (`/about`)
*   **Texto Institucional:**
    > "Era uma vez, em uma cidade acolhedora, uma família dedicada a promover a saúde e o bem estar de todos. Inspirados pelo desejo de transformar vidas, eles começaram a trabalhar juntos em um projeto que oferecia cuidados de saúde alimentar e programas de bem estar. Surgindo assim o Armazém Girassol."
*   **Missão:** "Proporcionar aos nossos clientes uma experiência única de compra, oferecendo produtos selecionados, atendimento personalizado e preços competitivos."
*   **Valores:** "Comprometimento com a qualidade, respeito ao meio ambiente e valorização da saúde e bem-estar."
*   **Diferencial:** Focar no atendimento humanizado e na curadoria dos produtos.

### 🚫 404 - Not Found (`/not-found.tsx`)
*   **Design:** Uma ilustração amigável (ex: um girassol "perdido" ou murcho).
*   **Texto:** "Ops! Parece que esse produto colheu férias." ou "Página não encontrada."
*   **Ação:** Botão "Voltar para a Loja" em destaque.

---

## 4. Funcionalidades Críticas (Implementação Nova)

### 🛒 Carrinho & Checkout (Implementação em TS)
*   **Hooks:** `useCart` criado do zero com tipagem forte (`CartItem`, `CartContextType`).
*   **Persistência:** Implementar `localStorage` para salvar o carrinho entre sessões.
*   **Checkout Modal:**
    *   **Passo 1:** Dados Pessoais (Nome, Telefone).
    *   **Passo 2:** Entrega (Retirada vs Entrega).
        *   *Regra de Negócio:* Se `Entrega` + Cidade `Charqueadas` -> Adicionar Taxa Fixa de **R$ 8,00**.
    *   **Passo 3:** Pagamento (PIX, Dinheiro, Cartão).
    *   **Finalização:** Gerar link do WhatsApp pré-formatado com o resumo do pedido.

### 🔍 Navbar & Busca
*   **Search Bar:**
    *   Input com *debounce*.
    *   **Dropdown de Preview:** Mostra miniatura + nome + preço dos 5 primeiros resultados encontrados.
    *   Link "Ver todos os resultados" leva para a página de busca completa.

---

## 5. Roteiro de Desenvolvimento

1.  **Setup:** Inicializar projeto Next.js 15 + TypeScript + Tailwind (Clean Install).
2.  **Data Layer:** Criar `src/data/db.json` e funções helpers (`getProducts`, `getFeatured`).
3.  **Components:** Criar componentes base (Button, Input, Card) com Tailwind.
4.  **Pages:** Implementar Home, Products, About e 404.
5.  **Logic:** Implementar CartContext e CheckoutLogic em TypeScript.
