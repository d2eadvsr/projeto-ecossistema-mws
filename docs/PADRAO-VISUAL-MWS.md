# Especificação de Padrão Visual e Identidade da Marca — Ecossistema MWS

> **Documento de Engenharia Reversa e Diretrizes de Design System**  
> **Versão do Código:** v0.0.46+  
> **Data:** 03/03/2026 (Extraído por análise estrita do código real)  
> **Finalidade:** Servir como guia definitivo e exaustivo para replicação fidedigna do padrão visual, tokens cromáticos, componentes de navegação, estrutura de layout e hierarquia tipográfica do Ecossistema MWS em qualquer nova conta, ambiente ou projeto Skip.

---

## Sumário

1. [Princípio Fundamental e Restrição Cromática de Fundo](#1-princípio-fundamental-e-restrição-cromática-de-fundo)
2. [Logotipo Oficial (`MWSLogo`)](#2-logotipo-oficial-mwslogo)
   - 2.1 [Conceito do Símbolo e Biomecânica Lingual](#21-conceito-do-símbolo-e-biomecânica-lingual)
   - 2.2 [Wordmark Mandatório e Subtítulo](#22-wordmark-mandatório-e-subtítulo)
   - 2.3 [Gradiente Dourado Metálico do Símbolo](#23-gradiente-dourado-metálico-do-símbolo)
   - 2.4 [Variantes de Uso e Ocorrências no Código](#24-variantes-de-uso-e-ocorrências-no-código)
3. [Paleta de Cores e Tokens do Design System](#3-paleta-de-cores-e-tokens-do-design-system)
   - 3.1 [Tabela Completa de Tokens Reais](#31-tabela-completa-de-tokens-reais)
   - 3.2 [Gradientes Oficiais em CSS](#32-gradientes-oficiais-em-css)
   - 3.3 [Regras Restritivas de Uso (Onde Usar vs. Onde NÃO Usar)](#33-regras-restritivas-de-uso-onde-usar-vs-onde-não-usar)
4. [Testeira Superior (`Header` / Topbar Oficial)](#4-testeira-superior-header--topbar-oficial)
   - 4.1 [Estrutura e Dimensões](#41-estrutura-e-dimensões)
   - 4.2 [Composição de Elementos (Desktop vs. Mobile)](#42-composição-de-elementos-desktop-vs-mobile)
   - 4.3 [Avatar Institucional e Identificação do Perfil](#43-avatar-institucional-e-identificação-do-perfil)
5. [Rodapé Institucional (`Footer`)](#5-rodapé-institucional-footer)
   - 5.1 [Estrutura e Cores](#51-estrutura-e-cores)
   - 5.2 [Textos Oficiais e Indicadores](#52-textos-oficiais-e-indicadores)
   - 5.3 [Presença por Tela](#53-presença-por-tela)
6. [Tipografia e Hierarquia de Textos](#6-tipografia-e-hierarquia-de-textos)
   - 6.1 [Famílias Tipográficas](#61-famílias-tipográficas)
   - 6.2 [Régua de Escalas, Pesos e Casos de Uso](#62-régua-de-escalas-pesos-e-casos-de-uso)
7. [Navegação e Menus — Estados Interativos](#7-navegação-e-menus--estados-interativos)
   - 7.1 [Sidebar Desktop (`Navigation.tsx`)](#71-sidebar-desktop-navigationtsx)
   - 7.2 [Estados dos Links do Menu Lateral (Normal, Hover e Ativo)](#72-estados-dos-links-do-menu-lateral-normal-hover-e-ativo)
   - 7.3 [Bottom Navigation Mobile](#73-bottom-navigation-mobile)
   - 7.4 [Botões e Variantes de Ação (`Button.tsx`)](#74-botões-e-variantes-de-ação-buttontsx)
8. [Exemplo Concreto e Canônico: `AdminDashboard` (`/admin/dashboard`)](#8-exemplo-concreto-e-canônico-admindashboard-admindashboard)
   - 8.1 [Composição da Tela e Integração com o Layout](#81-composição-da-tela-e-integração-com-o-layout)
   - 8.2 [Hero / Top Banner de Boas-Vindas](#82-hero--top-banner-de-boas-vindas)
   - 8.3 [Cards de KPI Principais](#83-cards-de-kpi-principais)
   - 8.4 [Pipeline da Esteira Laboratorial e Badges](#84-pipeline-da-esteira-laboratorial-e-badges)
   - 8.5 [Fila de Ações Imediatas ADM](#85-fila-de-ações-imediatas-adm)
   - 8.6 [Cards de Acesso Rápido](#86-cards-de-acesso-rápido)
   - 8.7 [Diferenças de Navegação e Menus entre Perfis](#87-diferenças-de-navegação-e-menus-entre-perfis)
9. [Checklist Prático para Replicação Visual em Outra Conta](#9-checklist-prático-para-replicação-visual-em-outra-conta)
10. [Documentação Relacionada](#10-documentação-relacionada)

---

## 1. Princípio Fundamental e Restrição Cromática de Fundo

> ### ⚠️ REGRA MANDATÓRIA DE DESIGN (Diretriz do Usuário Daniel & Código Real):
>
> 1. **O plano de fundo de TODAS as páginas do ecossistema é estritamente CLARO** (`bg-slate-50`, `bg-slate-50/90`, `bg-white` ou tokens base `hsl(210 40% 98%)`).
> 2. O **Verde Escuro Institucional** (`#0d3b2e`, `#082019`, `#061712`, `#124d3d`) é **ESTRITAMENTE RESTRITO** a:
>    - Testeiras superiores (`header`);
>    - Rodapés (`footer`);
>    - Barras de navegação lateral (`sidebar` desktop e `BottomNav` mobile);
>    - Botões primários de ação (`Button variant="default"` / `bg-primary`);
>    - Acentos e selos pontuais de autoridade institucional.
> 3. **PROIBIÇÃO ABSOLUTA:** É terminantemente vedado aplicar verde escuro ou preto como cor de fundo geral do container `<main>` ou das páginas operacionais. A legibilidade clínica de dados de pacientes, prontuários, boletos, odontogramas e kanbans requer contraste ótimo sobre fundo claro.

---

## 2. Logotipo Oficial (`MWSLogo`)

O logotipo do Ecossistema MWS é encapsulado no componente oficial `src/components/MWSLogo.tsx`.

```
┌─────────────────────────────────────────────────────────────┐
│  [  SÍMBOLO VETORIAL  ]   MAGIC WIRE  [SYSTEM]              │
│  [ Dois "V" cruzados  ]   ────────────────────              │
│  [ Arco lingual ouro  ]   A VERDADEIRA ORTODONTIA INVISÍVEL │
└─────────────────────────────────────────────────────────────┘
```

### 2.1 Conceito do Símbolo e Biomecânica Lingual

- **Origem do Símbolo:** Mantido fielmente da identidade original da marca Magic Wire System (extraído do site oficial _magicwire.com.br_).
- **Geometria:** O símbolo SVG vetorial (viewBox `0 0 48 48`) estiliza a conformação tridimensional de um arco lingual contínuo com nós de torque biomecânicos e alças cruzadas (dois arcos em "V" entrelaçados):
  - Traçado principal: `<path d="M 10 32 C 12 18, 17 14, 21 26 C 23 31, 25 31, 27 26 C 31 14, 36 18, 38 32" stroke="url(#mws-gold-gradient)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />`.
  - Traçado de reforço superior e brilho: `<path d="M 15 28 C 19 19, 21 19, 24 24 C 27 19, 29 19, 33 28" stroke="url(#mws-gold-sheen)" strokeWidth="1.6" strokeLinecap="round" />`.
  - Esferas de ativação e ancoragem de precisão nos três vértices:
    - Vértice esquerdo: `<circle cx="10" cy="32" r="2.2" fill="#eed89f" />`
    - Vértice central: `<circle cx="24" cy="18" r="2.4" fill="#eed89f" stroke="#8c6a28" strokeWidth="0.8" />`
    - Vértice direito: `<circle cx="38" cy="32" r="2.2" fill="#eed89f" />`
  - Fundo do pictograma: Retângulo de cantos arredondados (`rx="12"`) preenchido com verde noturno profundo `#061a14` e borda metálica `stroke="url(#mws-gold-gradient)" strokeWidth="1.2"`.

### 2.2 Wordmark Mandatório e Subtítulo

A tipografia da marca no componente é padronizada rigorosamente com as seguintes regras de nomenclatura:

| Elemento              | Texto Literal no Código             | Estilo Tailwind / CSS                                                                                                        | Regra Mandatória                                                                                       |
| :-------------------- | :---------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| **Palavra 1 e 2**     | `MAGIC WIRE`                        | `font-extrabold tracking-widest uppercase text-[15px]` com gradiente `gold-gradient-text` (ou `text-gold` / `text-white`)    | **Obrigatório:** grafia em caixa alta.                                                                 |
| **Palavra 3 (Badge)** | `SYSTEM`                            | `text-gold-light text-[10px] font-semibold tracking-widest uppercase px-1.5 py-0.2 rounded bg-gold/15 border border-gold/30` | **PROIBIDO:** Nunca grafar _"MAGIC WIRE TECHNIC"_. O nome oficial consolidado é **MAGIC WIRE SYSTEM**. |
| **Subtítulo**         | `A Verdadeira Ortodontia Invisível` | `text-[9px] uppercase tracking-[0.22em] text-slate-300/80 font-medium mt-0.5`                                                | Slogan oficial registrado da 3ª Geração da Ortodontia.                                                 |

### 2.3 Gradiente Dourado Metálico do Símbolo

O gradiente do símbolo é montado por duas definições vetoriais no `<defs>` do SVG:

1. **`mws-gold-gradient` (Gradiente Principal em 4 pontos):**
   - `offset="0%"`: `#eed89f` (Ouro Claro Metálico)
   - `offset="35%"`: `#c5a059` (Ouro Nobre Médio)
   - `offset="70%"`: `#b38a42` (Ouro Âmbar Corporativo)
   - `offset="100%"`: `#8c6a28` (Bronze Envelhecido de Sombra)
2. **`mws-gold-sheen` (Brilho de Reflexo em 3 pontos):**
   - `offset="0%"`: `#9e7d3b` (Bronze Médio)
   - `offset="50%"`: `#dfc282` (Ouro Claro Luminoso)
   - `offset="100%"`: `#eed89f` (Brilho Especular Ouro)
3. **Filtro de Sombra `mws-gold-glow`:** `<feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.3" />`.

### 2.4 Variantes de Uso e Ocorrências no Código

O componente `MWSLogo` aceita as seguintes propriedades:

```typescript
interface MWSLogoProps {
  className?: string
  showWordmark?: boolean
  wordmarkClassName?: string
  symbolSize?: number
  variant?: 'gold-gradient' | 'gold-solid' | 'gold-white' | 'dark'
}
```

Mapeamento exato de onde cada variante aparece no código:

| Local no Código                      | Arquivo                                     | Tamanho (`symbolSize`) | Variante                 | `showWordmark` | Contexto de Uso                                                              |
| :----------------------------------- | :------------------------------------------ | :--------------------: | :----------------------- | :------------: | :--------------------------------------------------------------------------- |
| **Sidebar Desktop**                  | `src/components/Navigation.tsx` (linha 121) |         `34px`         | `gold-gradient`          |     `true`     | Topo fixo da barra de navegação lateral sobre fundo verde noturno `#082019`. |
| **Testeira Mobile**                  | `src/components/Layout.tsx` (linha 31)      |         `30px`         | Padrão (`gold-gradient`) |     `true`     | Canto superior esquerdo da barra em telas `< 768px`.                         |
| **Testeira da Tela de Login**        | `src/pages/Login.tsx` (linha 76)            |         `38px`         | `gold-gradient`          |     `true`     | Barra superior institucional externa pré-autenticação.                       |
| **Card Central da Tela de Login**    | `src/pages/Login.tsx` (linha 87)            |         `48px`         | Padrão                   |    `false`     | Ícone central de destaque acima do título "Magic Wire System".               |
| **Testeira da Tela de Cadastro**     | `src/pages/SignUp.tsx` (linha 65)           |         `38px`         | `gold-gradient`          |     `true`     | Barra superior institucional externa no fluxo de registro.                   |
| **Card Central da Tela de Cadastro** | `src/pages/SignUp.tsx` (linha 75)           |         `44px`         | Padrão                   |    `false`     | Ícone central de destaque acima do título "Credenciamento MWS".              |

---

## 3. Paleta de Cores e Tokens do Design System

A paleta de cores do ecossistema é definida no arquivo `src/main.css` (camada `@layer base`) e mapeada no `tailwind.config.ts`.

### 3.1 Tabela Completa de Tokens Reais

| Nome do Token        | HSL no `main.css`   | Hex Aproximado | Classe Tailwind                           | Onde é Usada                                                                      | Onde NÃO é Usada                                |
| :------------------- | :------------------ | :------------- | :---------------------------------------- | :-------------------------------------------------------------------------------- | :---------------------------------------------- |
| `--primary`          | `164 64% 14%`       | `#0d3b2e`      | `bg-primary`, `text-primary`              | Botões primários, gradiente da testeira, bordas de acento, badges institucionais  | **NUNCA como fundo geral da tela**              |
| `--secondary`        | `164 60% 8%`        | `#082019`      | `bg-secondary`, `bg-[#082019]`            | Sidebar desktop, BottomNav mobile, fundo escuro de contraste                      | Fundo de cards clínicos, tabelas ou formulários |
| `--gold`             | `40 48% 56%`        | `#c5a059`      | `text-gold`, `bg-gold`, `border-gold`     | Ícones de destaque, pulsos de status no rodapé, bordas de foco (`ring`), estrelas | Textos longos ou fundos com baixo contraste     |
| `--gold-light`       | `42 62% 70%`        | `#dfc282`      | `text-gold-light`, `bg-gold-light`        | Subtítulo de papéis na testeira, texto ativo da sidebar, badge `SYSTEM`           | Fundo sólido sem texto escuro                   |
| `--gold-dark`        | `38 46% 42%`        | `#9e7d3b`      | `text-gold-dark`, `border-gold-dark`      | Sombras douradas, gradientes de texto, bordas de acento                           | Elementos textuais finos sem peso               |
| `--background`       | `210 40% 98%`       | `#f8fafc`      | `bg-background`, `bg-slate-50`            | Fundo de todas as telas, `<main>`, containers de conteúdo                         | Barras institucionais e testeiras               |
| `--card`             | `0 0% 100%`         | `#ffffff`      | `bg-card`, `bg-white`                     | Superfície de cards, modais, gavetas e tabelas                                    | Elementos de cabeçalho global                   |
| `--foreground`       | `222.2 84% 4.9%`    | `#020817`      | `text-foreground`, `text-slate-900`       | Títulos h1/h2, valores de KPI, cabeçalhos de tabela                               | Superfícies com fundo verde escuro              |
| `--muted`            | `210 40% 96.1%`     | `#f1f5f9`      | `bg-muted`, `bg-slate-100`                | Fundo de badges neutros, linhas de tabelas alternadas, inputs                     | Áreas de destaque visual                        |
| `--muted-foreground` | `215.4 16.3% 46.9%` | `#64748b`      | `text-muted-foreground`, `text-slate-500` | Subtítulos explicativos, rótulos de apoio, datas                                  | Títulos primários e valores de KPIs             |
| `--destructive`      | `0 84.2% 60.2%`     | `#ef4444`      | `bg-destructive`, `text-destructive`      | Botões de logout, exclusão, badges de erro e atraso crítico de SLA                | Superfícies informativas regulares              |
| `--ring`             | `40 48% 56%`        | `#c5a059`      | `focus-visible:ring-gold`                 | Anel de foco acessível em inputs e botões                                         | Bordas estáticas decorativas                    |

#### Cores Semânticas de Apoio (Tailwind)

| Semântica                  | Classes de Fundo                                    | Classes de Texto                                        | Classes de Borda                           | Aplicação no Ecossistema                                                                    |
| :------------------------- | :-------------------------------------------------- | :------------------------------------------------------ | :----------------------------------------- | :------------------------------------------------------------------------------------------ |
| **Sucesso / Concluído**    | `bg-emerald-50`, `bg-emerald-100`, `bg-emerald-600` | `text-emerald-700`, `text-emerald-800`                  | `border-emerald-200`, `border-emerald-300` | Planejamento entregue, boletos liquidados, NPS Zona de Excelência, credenciamento aprovado. |
| **Em Análise / Alerta**    | `bg-amber-50`, `bg-amber-100`, `bg-amber-500`       | `text-amber-700`, `text-amber-800`, `text-amber-900`    | `border-amber-200`, `border-amber-300`     | Casos sob análise técnica, alerta de proximidade de estouro de SLA, fichas pendentes.       |
| **Fase de Planejamento**   | `bg-purple-50`, `bg-purple-100`, `bg-purple-600`    | `text-purple-700`, `text-purple-800`, `text-purple-900` | `border-purple-200`, `border-purple-300`   | Casos em planejamento pelo mentor, moderação de perfis públicos, módulos da Escola MWS.     |
| **Logística / Informação** | `bg-blue-50`, `bg-blue-100`, `bg-blue-600`          | `text-blue-700`, `text-blue-800`, `text-blue-900`       | `border-blue-200`, `border-blue-300`       | Licenciados em onboarding, remessas de kits em transporte, integração de software via API.  |
| **Crítico / Inadimplente** | `bg-red-50`, `bg-red-100`, `bg-red-600`             | `text-red-700`, `text-red-800`                          | `border-red-200`, `border-red-300`         | Estouro de SLA de entrega, boletos em atraso, documentação rejeitada, alertas clínicos.     |

### 3.2 Gradientes Oficiais em CSS

Conforme implementado no arquivo `src/main.css`:

```css
/* 1. Texto Metálico Dourado */
.gold-gradient-text {
  background: linear-gradient(135deg, #dfc282 0%, #c5a059 45%, #9e7d3b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 2. Fundo Metálico Dourado */
.gold-gradient-bg {
  background: linear-gradient(135deg, #dfc282 0%, #c5a059 50%, #9e7d3b 100%);
}

/* 3. Testeira Oficial Institucional MWS */
.mws-header-gradient {
  background: linear-gradient(135deg, #061a14 0%, #0d3b2e 60%, #124d3d 100%);
}
```

### 3.3 Regras Restritivas de Uso (Onde Usar vs. Onde NÃO Usar)

| Token / Cor                                  | Onde DEVE Ser Usado                                                                              | Onde NÃO PODE Ser Usado                                                             |
| :------------------------------------------- | :----------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| **Verde Noturno (`#082019` / `#061712`)**    | Sidebar (`bg-secondary`), rodapé fixo desktop, bottom navigation mobile                          | Fundo de páginas de pacientes, cartões de métricas de formulários                   |
| **Verde Gradiente (`.mws-header-gradient`)** | Topbar fixa autenticada (`<header>`), testeira de login e signup                                 | Fundo de modais de formulário ou tabelas                                            |
| **Dourado (`#c5a059` / `--gold`)**           | Símbolo MWS, indicador de rota ativa na sidebar (`border-gold`), anéis de foco, pulsos de rodapé | Corpo de textos corridos com menos de 14px em fundo claro (falha de contraste WCAG) |
| **Fundo Claro (`bg-slate-50` / `#f8fafc`)**  | Container global `<main>`, corpo de páginas, tabelas, seções de dashboard                        | Elementos institucionais de barra e menu que exigem identidade de marca             |

---

## 4. Testeira Superior (`Header` / Topbar Oficial)

A barra superior é implementada no componente `src/components/Layout.tsx` (linhas 28 a 62).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [MWSLogo (Mobile)]  🛡️ Ecossistema Digital Magic Wire System    [Nome] [Role] (A) [Sair]│
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Estrutura e Dimensões

- **Elemento HTML:** `<header className="h-16 mws-header-gradient text-white border-b border-[#153e32] flex items-center justify-between px-4 sm:px-6 shadow-md z-20 flex-shrink-0">`.
- **Altura:** Exatos `64px` (`h-16`).
- **Fundo:** Classe utilitária `.mws-header-gradient` (`linear-gradient(135deg, #061a14 0%, #0d3b2e 60%, #124d3d 100%)`).
- **Borda Inferior:** Linha sutil de `1px` em verde escuro corporativo `border-[#153e32]`.
- **Sombra e Elevação:** `shadow-md z-20`.

### 4.2 Composição de Elementos (Desktop vs. Mobile)

1. **Lado Esquerdo:**
   - **Mobile (`md:hidden`):** Exibe o componente `<MWSLogo symbolSize={30} showWordmark={true} />`.
   - **Desktop (`hidden md:flex`):** Exibe o indicador de contexto institucional:
     - Ícone: `<Shield className="w-4 h-4 text-gold" />`.
     - Texto: `<span className="font-medium text-xs text-slate-300">Ecossistema Digital Magic Wire System</span>`.
2. **Lado Direito (Área do Usuário Autenticado):**
   - Container flexível com espaçamento `gap-3 sm:gap-4`:
     - Coluna de texto alinhada à direita:
       - Linha 1: `user?.name` em `text-xs sm:text-sm font-semibold text-white tracking-wide`.
       - Linha 2: Papel formatado via `ROLE_DISPLAY_NAMES` em `text-[11px] text-gold-light/90 font-medium tracking-wide`.
     - Avatar Institucional estilizado.
     - Botão mobile de logout (`md:hidden`): `<Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-white/10" onClick={signOut}>` com ícone `LogOut`.

### 4.3 Avatar Institucional e Identificação do Perfil

O avatar do cabeçalho possui dimensões e acabamento metálico exclusivos:

- **Dimensões:** `w-9 h-9` (`36px × 36px`) totalmente arredondado (`rounded-full`).
- **Fundo:** Gradiente diagonal `bg-gradient-to-br from-[#124d3d] to-[#082019]`.
- **Borda:** Contorno dourado sutil `border border-gold/40`.
- **Tipografia:** Inicial do usuário (`user?.name?.charAt(0) || 'U'`) em `text-gold font-bold text-sm`.
- **Mapeamento Canônico de Papéis (`ROLE_DISPLAY_NAMES`):**
  - `dentist`: `"Ortodontista Credenciado"`
  - `patient`: `"Paciente MWS"`
  - `admin`: `"Time ADM MWS"`
  - `lab`: `"Laboratório MWS"`
  - `mentor`: `"Mentor MWS"`
  - `lead`: `"Lead Qualificado"`

---

## 5. Rodapé Institucional (`Footer`)

O rodapé oficial da plataforma é renderizado pelo componente `src/components/Layout.tsx` (linhas 70 a 81) para o ambiente autenticado desktop, e possui versões equivalentes nas telas públicas de login e cadastro.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  🟢 Magic Wire System  •  3ª Geração da Ortodontia • Fio Lingual Invisível    v0.0.46  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 5.1 Estrutura e Cores

- **Elemento HTML:** `<footer className="hidden md:flex items-center justify-between px-6 py-2.5 bg-[#061712] border-t border-[#12382d] text-xs text-slate-400 z-10 flex-shrink-0">`.
- **Visibilidade:** Oculto em telas mobile (`hidden md:flex`) para dar lugar à `BottomNav`.
- **Cor de Fundo:** Fundo verde escuro noturno `#061712`.
- **Borda Superior:** Linha de acabamento `border-t border-[#12382d]`.
- **Padding:** `px-6 py-2.5` (compacto e elegante).

### 5.2 Textos Oficiais e Indicadores

1. **Bloco Esquerdo:**
   - Indicador de status pulsante: `<span className="w-2 h-2 rounded-full bg-gold animate-pulse" />`.
   - Nome da operadora: `<span className="text-slate-300 font-medium">Magic Wire System</span>`.
   - Separador: `<span className="text-slate-600">•</span>`.
   - Assinatura tecnológica: `<span className="text-slate-400">3ª Geração da Ortodontia • Fio Lingual Invisível</span>`.
2. **Bloco Direito:**
   - Chave institucional: `<span>Rede Oficial Credenciada</span>`.
   - Tag de versão técnica: `<span className="text-gold-light/80 font-mono">v0.0.46-mws</span>`.

### 5.3 Presença por Tela

- **Telas Internas Autenticadas (Todos os 6 Perfis):** Exibido de forma unificada no desktop através de `src/components/Layout.tsx`.
- **Tela de Login (`/login`):** Exibido no rodapé do container com a inscrição `"2026 - Todos os direitos reservados | Magic Wire"`.
- **Tela de Cadastro (`/signup`):** Exibido no rodapé com o mesmo padrão institucional.

---

## 6. Tipografia e Hierarquia de Textos

A tipografia do projeto utiliza a família **Inter** combinada com **SF Pro Display** e fontes de sistema modernas.

### 6.1 Famílias Tipográficas

Conforme configurado em `src/main.css` e `tailwind.config.ts`:

- **Importação Google Fonts:** `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');`
- **Configuração no Tailwind:**
  - `fontFamily.sans`: `['Inter var', 'SF Pro Display', 'system-ui', 'sans-serif']`
  - `fontFamily.display`: `['SF Pro Display', 'Inter var', 'system-ui', 'sans-serif']`
  - `font-mono`: Família monoespaçada do sistema para códigos de casos (`CAS-2026-001`), CROs e valores de boletos.

### 6.2 Régua de Escalas, Pesos e Casos de Uso

| Nível Hierárquico                  | Classes Tailwind                                               | Tamanho / Peso Real      | Onde é Aplicado                                        | Exemplo Literal no Código                                      |
| :--------------------------------- | :------------------------------------------------------------- | :----------------------- | :----------------------------------------------------- | :------------------------------------------------------------- |
| **Título de Página (H1)**          | `text-2xl md:text-3xl font-bold tracking-tight text-slate-900` | `24px - 30px` / Peso 700 | Título superior das páginas operacionais               | _"Time ADM MWS • Visão Executiva"_                             |
| **Subtítulo de Página**            | `text-sm text-slate-500 max-w-2xl`                             | `14px` / Peso 400        | Texto descritivo logo abaixo do H1                     | _"Gestão operacional, financeira e clínica do ecossistema..."_ |
| **Título de Seção / Card (H2/H3)** | `text-base font-bold text-slate-900`                           | `16px` / Peso 700        | Cabeçalhos de cards de gráficos, tabelas e kanban      | _"Pipeline da Esteira Laboratorial MWS"_                       |
| **KPIs e Métricas Numéricas**      | `text-2xl md:text-3xl font-bold text-slate-900`                | `24px - 30px` / Peso 700 | Valores numéricos principais de indicadores            | _"R$ 145.000"_, _"182"_, _"54"_                                |
| **Rótulos de KPIs (CardTitle)**    | `text-xs font-medium text-slate-600`                           | `12px` / Peso 500        | Rótulo superior de cada indicador                      | _"Receita Recorrente (MRR)"_, _"Ortodontistas Licenciados"_    |
| **Corpo de Texto (Body)**          | `text-sm text-slate-700`                                       | `14px` / Peso 400        | Parágrafos explicativos, itens de listas               | Descrições de ações, notas clínicas                            |
| **Textos Secundários / Notas**     | `text-xs text-slate-400` ou `text-[11px]`                      | `11px - 12px` / Peso 400 | Legendas de gráficos, subtextos de cards               | _"Licenciamentos + Splits de Casos"_, _"3ª Geração"_           |
| **Badges e Tags Técnicas**         | `text-[10px]` ou `text-xs font-semibold`                       | `10px - 12px` / Peso 600 | Status de casos, chips de protocolos, tags de mentoria | _"Aguardando Análise"_, _"Classe II"_, _"Zona de Excelência"_  |
| **Micro-legendas Institucionais**  | `text-[9px] uppercase tracking-[0.22em]`                       | `9px` / Peso 500         | Subtítulo do logotipo no componente `MWSLogo`          | _"A VERDADEIRA ORTODONTIA INVISÍVEL"_                          |

---

## 7. Navegação e Menus — Estados Interativos

A navegação principal é implementada em `src/components/Navigation.tsx`.

### 7.1 Sidebar Desktop (`Navigation.tsx`)

- **Elemento HTML:** `<div className="hidden md:flex flex-col w-64 bg-secondary text-secondary-foreground h-screen border-r border-[#153e32] flex-shrink-0 shadow-lg">`.
- **Largura:** `w-64` (`256px` fixos).
- **Cor de Fundo:** `bg-secondary` (`hsl(164 60% 8%)` / `#082019`).
- **Borda Direita:** `border-r border-[#153e32]` (divisor verde profundo).
- **Sombra:** `shadow-lg`.
- **Seção Superior:** Topo com `p-5 pb-4 border-b border-[#12382d]` contendo `<MWSLogo symbolSize={34} variant="gold-gradient" />`.
- **Seção Inferior:** Rodapé com `p-4 border-t border-[#12382d] bg-[#061712]` contendo o botão de logout:
  - `<Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-gold hover:bg-white/5 text-xs font-medium transition-colors" onClick={signOut}>` com `<LogOut className="w-4 h-4 mr-3" /> Sair da Plataforma`.

### 7.2 Estados dos Links do Menu Lateral (Normal, Hover e Ativo)

Cada link de navegação é estilizado pelas classes condicionais no método `map()`:

```tsx
<Link
  key={link.href}
  to={link.href}
  title={link.label}
  className={cn(
    'flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-xs font-medium group',
    isActive
      ? 'bg-gradient-to-r from-[#0f4435] to-[#145341] text-gold-light font-semibold shadow-md border-l-4 border-gold'
      : 'hover:bg-white/5 text-slate-300 hover:text-white',
  )}
>
  <Icon
    className={cn(
      'w-4 h-4 flex-shrink-0 transition-colors',
      isActive ? 'text-gold' : 'text-slate-400 group-hover:text-gold-light',
    )}
  />
  <span className="truncate">{link.label}</span>
</Link>
```

#### Tabela Comparativa de Estados do Menu Lateral

| Elemento / Propriedade    | Estado Normal (Inativo) | Estado Hover (Foco) | Estado Ativo (`isActive = true`)                             |
| :------------------------ | :---------------------- | :------------------ | :----------------------------------------------------------- |
| **Fundo do Item**         | Transparente            | `bg-white/5`        | Gradiente: `bg-gradient-to-r from-[#0f4435] to-[#145341]`    |
| **Cor do Texto**          | `text-slate-300`        | `text-white`        | `text-gold-light` (`#dfc282`)                                |
| **Peso da Fonte**         | `font-medium`           | `font-medium`       | `font-semibold`                                              |
| **Cor do Ícone (Lucide)** | `text-slate-400`        | `text-gold-light`   | `text-gold` (`#c5a059`)                                      |
| **Borda / Indicador**     | Nenhuma borda           | Nenhuma borda       | **Barra lateral esquerda dourada:** `border-l-4 border-gold` |
| **Sombra e Elevação**     | Nenhuma                 | Nenhuma             | `shadow-md`                                                  |
| **Transição**             | `transition-all`        | `transition-all`    | Suave e instantânea                                          |

### 7.3 Bottom Navigation Mobile

Para dispositivos móveis (`< 768px`), o componente `BottomNav` substitui a sidebar:

- **Elemento:** `<div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#082019] border-t border-[#1a4a3c] flex justify-around p-1.5 z-50 shadow-2xl">`.
- **Itens Exibidos:** Os 7 primeiros atalhos do perfil (`links.slice(0, 7)`).
- **Estado Inativo:** `text-slate-300 hover:text-white` com ícone `text-slate-400`.
- **Estado Ativo:** `text-gold font-bold scale-105` com ícone `text-gold`.

### 7.4 Botões e Variantes de Ação (`Button.tsx`)

O design system utiliza o componente `src/components/ui/button.tsx` customizado com as variantes do ecossistema:

| Variante                         | Classes do Componente                                                                        | Visual Resultante                                                                         | Casos de Uso no Ecossistema                                                                      |
| :------------------------------- | :------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| **Primário (`default`)**         | `bg-primary text-primary-foreground hover:bg-primary/90`                                     | Verde escuro institucional `#0d3b2e`, texto claro `#fbfaf6`, hover em verde mais profundo | Botão principal de submissão ("Acessar Plataforma", "Salvar Planejamento", "Novo Caso Clínico"). |
| **Primário com Ouro (Destaque)** | `bg-primary hover:bg-[#082019] text-white border border-gold/30 hover:border-gold shadow-md` | Verde institucional com contorno dourado metálico sutil                                   | Ações administrativas críticas e botões de login/cadastro.                                       |
| **Secundário (`secondary`)**     | `bg-secondary text-secondary-foreground hover:bg-secondary/80`                               | Fundo verde escuro noturno `#082019`                                                      | Ações de apoio em áreas claras.                                                                  |
| **Contorno (`outline`)**         | `border border-input bg-transparent text-foreground hover:bg-accent`                         | Borda cinza suave `border-slate-300`, fundo transparente, hover sutil                     | Ações secundárias ("Cancelar", "Voltar", "182 Licenciados").                                     |
| **Fantasma (`ghost`)**           | `text-foreground hover:bg-accent hover:text-accent-foreground`                               | Transparente, acento no hover                                                             | Ações de saída, ícones de ferramentas na tabela, "Ver todos →".                                  |
| **Destrutivo (`destructive`)**   | `bg-destructive text-destructive-foreground hover:bg-destructive/90`                         | Fundo vermelho `#ef4444`, texto branco                                                    | Revogação de acesso de prontuário, cancelamento de caso.                                         |
| **Desabilitado (`disabled`)**    | `disabled:pointer-events-none disabled:opacity-50`                                           | Opacidade em 50% sem resposta a cliques                                                   | Botões de formulário durante carregamento (`isLoading`).                                         |

---

## 8. Exemplo Concreto e Canônico: `AdminDashboard` (`/admin/dashboard`)

A tela `AdminDashboard` (`src/pages/Admin/Dashboard.tsx`) é a referência visual mais completa do ecossistema. Ela demonstra exatamente como a hierarquia visual e a restrição de fundo claro se manifestam na prática.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  TESTEIRA: .mws-header-gradient (Verde #061a14 -> #0d3b2e) • Símbolo MWS Dourado       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ SIDEBAR:         │ CONTEÚDO PRINCIPAL (Fundo Claro: bg-slate-50 / bg-white)            │
│ bg-[#082019]     │ ┌────────────────────────────────────────────────────────────────┐  │
│                  │ │ Top Banner Hero: from-slate-900 via-slate-800 to-emerald-950   │  │
│ [MWSLogo 34px]   │ │ "Time ADM MWS • Visão Executiva" • [54 Casos] [182 Licenciados]│  │
│                  │ └────────────────────────────────────────────────────────────────┘  │
│ Item Ativo:      │                                                                     │
│ • Visão Executiva│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────┐ │
│   bg-[#0f4435]   │ │ MRR           │ │ Licenciados   │ │ Casos Lab     │ │ NPS 88    │ │
│   border-l-4     │ │ R$ 145.000    │ │ 182           │ │ 54            │ │ Excelência│ │
│   border-gold    │ └───────────────┘ └───────────────┘ └───────────────┘ └───────────┘ │
│                  │                                                                     │
│ Demais Itens:    │ ┌───────────────────────────────────────────────┐ ┌───────────────┐ │
│ • Ortodontistas  │ │ Pipeline da Esteira Laboratorial (54 Casos)   │ │ Ações ADM     │ │
│ • Mentores MWS   │ │ [12 Aguard.] [18 Em Anál.] [14 Plan.] [10 Ent]│ │ • 10 Fichas   │ │
│ • Casos Clínicos │ │ Gráfico BarChart de Evolução Mensal           │ │ • 6 Perfis    │ │
│ • Financeiro     │ └───────────────────────────────────────────────┘ └───────────────┘ │
│                  │                                                                     │
│ [Sair]           │ ┌─────────────────────────────────────────────────────────────────┐ │
│                  │ │ 4 Cards Rápidos: Financeiro | Logística | Programas | Escola    │ │
│                  │ └─────────────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ RODAPÉ: bg-[#061712] • 🟢 Magic Wire System • 3ª Geração • v0.0.46-mws                 │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 8.1 Composição da Tela e Integração com o Layout

- **Container:** `<div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto animate-fade-in-up">`.
- **Fundo do Conteúdo:** Herda `bg-slate-50/90` do container `<main>` em `Layout.tsx`, garantindo que os cards brancos (`bg-card` / `#ffffff`) saltem visualmente com sombras sutis (`shadow-sm border-slate-200`).

### 8.2 Hero / Top Banner de Boas-Vindas

- **Fundo:** Gradiente horizontal exclusivo `<div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-6 rounded-2xl shadow-md border border-slate-700">`.
- **Badge Superior:** `<div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide">` com ícone `Sparkles`.
- **Ações Rápidas no Hero:**
  - Botão Primário Verde: `bg-emerald-600 hover:bg-emerald-500 text-white shadow` com `FolderOpen` ("54 Casos Ativos").
  - Botão Secundário Contorno: `border-slate-500 text-slate-100 hover:bg-slate-800` com `Users` ("182 Licenciados").

### 8.3 Cards de KPI Principais

Grid de 4 colunas (`grid gap-4 sm:grid-cols-2 lg:grid-cols-4`):

1. **MRR / Receita Recorrente:**
   - Ícone: `DollarSign` em caixa arredondada verde `bg-emerald-100 text-emerald-700`.
   - Valor: `R$ 145.000` em `text-slate-900 font-bold`.
   - Variação: `+12% vs mês anterior` em `text-emerald-600 font-medium`.
2. **Ortodontistas Licenciados:**
   - Ícone: `Users` em caixa azul `bg-blue-100 text-blue-700`.
   - Valor: `182`.
   - Apoio: `160 ativos • 22 em onboarding` em `text-blue-600`.
3. **Casos no Laboratório MWS:**
   - Ícone: `FolderOpen` em caixa roxa `bg-purple-100 text-purple-700`.
   - Valor: `54`.
   - Alerta: `3 casos próximos do limite SLA` em `text-amber-600` com ícone `AlertTriangle`.
4. **NPS Global da Rede:**
   - Ícone: `ShieldCheck` em caixa verde `bg-emerald-100 text-emerald-700`.
   - Valor: `88` em `text-emerald-700 font-bold`.
   - Selo: `Zona de Excelência` com ícone `CheckCircle2`.

### 8.4 Pipeline da Esteira Laboratorial e Badges

A esteira divide os 54 casos clínicos oficiais nos 4 estágios da esteira:

- **Aguardando Análise (12 casos):** Fundo neutro `bg-slate-50 border-slate-200`, número `text-slate-900`.
- **Em Análise Técnica (18 casos):** Fundo âmbar `bg-amber-50/60 border-amber-200`, número `text-amber-900`.
- **Planejamento Elaborado (14 casos):** Fundo roxo `bg-purple-50/60 border-purple-200`, número `text-purple-900`.
- **Planejamento Entregue (10 casos):** Fundo esmeralda `bg-emerald-50/60 border-emerald-200`, número `text-emerald-900`.
- **Gráfico Mensal:** `BarChart` com barras verde esmeralda (`#059669`) para volume de casos e azul (`#60a5fa`) para faturamento em R$ mil.

### 8.5 Fila de Ações Imediatas ADM

Card lateral com fila de pendências (`border-slate-200 bg-white`):

- **10 Novas Fichas de Adesão:** Fundo `bg-amber-50/50 border-amber-200`, botão `border-amber-300 text-amber-900`.
- **6 Perfis Públicos Submetidos:** Fundo `bg-purple-50/50 border-purple-200`, botão `border-purple-300 text-purple-900`.
- **2 Mobilidades Geográficas:** Fundo `bg-blue-50/50 border-blue-200`, botão `border-blue-300 text-blue-900`.
- **1 Insumo Fio Mágico Pendente:** Fundo `bg-slate-50 border-slate-200`, botão `border-slate-300 text-slate-800`.
- **Tempo Médio de Resposta ADM:** Métrica `2.4 horas (SLA Meta: 4h)` em `text-emerald-700 font-semibold`.

### 8.6 Cards de Acesso Rápido

Grid inferior com 4 cartões clicáveis com efeito hover corporativo:

- Fundo do card: `bg-white border-slate-200 hover:border-emerald-400`.
- Ícone: Transição de `bg-[cor]-50` para `group-hover:bg-[cor]-600 group-hover:text-white`.
- Módulos:
  - _Financeiro & Split_ (Ícone `DollarSign` esmeralda)
  - _Logística & Fios Mágicos_ (Ícone `Package` azul)
  - _Programas de Expansão_ (Ícone `Megaphone` âmbar)
  - _Escola MWS & Fórum_ (Ícone `GraduationCap` roxo)

### 8.7 Diferenças de Navegação e Menus entre Perfis

O ecossistema utiliza o mesmo invólucro (`Layout.tsx`), porém o menu lateral (`Navigation.tsx`) adapta sua lista conforme o papel:

| Perfil (`role`)               | Rota Inicial         | Quantidade de Itens de Menu | Foco Visual do Menu                                                                  |
| :---------------------------- | :------------------- | :-------------------------: | :----------------------------------------------------------------------------------- |
| **Time ADM (`admin`)**        | `/admin/dashboard`   |          11 itens           | Visão corporativa, auditoria, conciliação e governança da rede nacional.             |
| **Ortodontista (`dentist`)**  | `/dashboard/dentist` |          15 itens           | Foco clínico: prontuário lingual, kanban de casos, chat técnico e manutenções.       |
| **Mentor MWS (`mentor`)**     | `/mentor/dashboard`  |           3 itens           | Foco em análise biomecânica: kanban de mentoria, booking de agenda e perfil docente. |
| **Laboratório (`lab`)**       | `/lab/dashboard`     |           7 itens           | Foco industrial: ordens de fabricação CNC, etapas de manufatura robótica e SLAs.     |
| **Paciente (`patient`)**      | `/dashboard/patient` |           7 itens           | Foco pessoal: timeline das 8 sessões, parcelas/PIX, programa de pontos e exames.     |
| **Lead Qualificado (`lead`)** | `/lead/dashboard`    |           5 itens           | Foco na conversão: funil de 5 etapas, 1ª consulta, proposta e tecnologia 3D.         |

---

## 9. Checklist Prático para Replicação Visual em Outra Conta

Para reproduzir exatamente este padrão visual em um novo projeto ou conta Skip:

### Passo 1: Tokens e Variáveis Globais (`src/main.css`)

- [ ] Inserir a importação da fonte Inter: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');`
- [ ] Configurar as variáveis CSS no `:root`:
  - `--background: 210 40% 98%;`
  - `--primary: 164 64% 14%;` (Verde Escuro `#0d3b2e`)
  - `--secondary: 164 60% 8%;` (Verde Noturno `#082019`)
  - `--gold: 40 48% 56%;` (`#c5a059`)
  - `--gold-light: 42 62% 70%;` (`#dfc282`)
  - `--gold-dark: 38 46% 42%;` (`#9e7d3b`)
- [ ] Adicionar as classes de gradiente `.gold-gradient-text`, `.gold-gradient-bg` e `.mws-header-gradient`.
- [ ] Adicionar a classe `.custom-scrollbar` para as barras de rolagem da sidebar escura.

### Passo 2: Configuração do Tailwind (`tailwind.config.ts`)

- [ ] Mapear as fontes `sans` e `display` para `['Inter var', 'SF Pro Display', 'system-ui', 'sans-serif']`.
- [ ] Registrar os tokens de cores `gold`, `primary`, `secondary` no objeto `colors`.
- [ ] Definir o raio padrão de bordas: `--radius: 0.75rem`.

### Passo 3: Componente de Logotipo (`src/components/MWSLogo.tsx`)

- [ ] Replicar fielmente o SVG vetorial dos dois arcos em "V" entrelaçados com as 3 esferas e gradiente `mws-gold-gradient`.
- [ ] Garantir o wordmark literal: `"MAGIC WIRE"` + badge `"SYSTEM"` + subtítulo `"A Verdadeira Ortodontia Invisível"`.
- [ ] Suportar os tamanhos padrão `30px`, `34px`, `38px`, `44px` e `48px`.

### Passo 4: Estrutura do Layout Mestre (`src/components/Layout.tsx`)

- [ ] Container pai: `<div className="flex h-screen bg-slate-50 overflow-hidden">`.
- [ ] Testeira: `<header className="h-16 mws-header-gradient text-white border-b border-[#153e32] ...">` com o escudo, avatar em degradê e identificador do papel.
- [ ] Área principal: `<main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 md:pb-6 bg-slate-50/90 text-slate-900">`.
- [ ] Rodapé desktop: `<footer className="hidden md:flex items-center justify-between px-6 py-2.5 bg-[#061712] border-t border-[#12382d] ...">`.

### Passo 5: Barra de Navegação (`src/components/Navigation.tsx`)

- [ ] Sidebar desktop com largura `w-64`, fundo `bg-secondary` (`#082019`), borda `border-[#153e32]`.
- [ ] Item ativo com gradiente `bg-gradient-to-r from-[#0f4435] to-[#145341]`, texto `text-gold-light` e barra dourada `border-l-4 border-gold`.
- [ ] Item inativo com `text-slate-300 hover:text-white hover:bg-white/5`.
- [ ] BottomNav mobile fixada com `bg-[#082019] border-t border-[#1a4a3c]` e ícones dourados quando ativos.

---

## 10. Documentação Relacionada

Para obter o detalhamento completo das regras de negócio, esteiras clínicas e especificações funcionais de cada tela citada neste documento, consulte:

- **[Documento-Mestre de Requisitos MWS](../docs/REQUISITOS-MWS.md):** Especificação funcional exaustiva de todo o ecossistema, regras de mentoria, esteira robótica e banco de dados PocketBase.
- **Dossiês Técnicos por Perfil de Acesso:**
  - [Dossiê Perfil Ortodontista](perfis/ORTODONTISTA.md) (`docs/perfis/ORTODONTISTA.md`)
  - [Dossiê Perfil Time ADM MWS](perfis/TIME-ADM.md) (`docs/perfis/TIME-ADM.md`)
  - [Dossiê Perfil Mentor MWS](perfis/MENTOR.md) (`docs/perfis/MENTOR.md`)
  - [Dossiê Perfil Laboratório MWS](perfis/LABORATORIO.md) (`docs/perfis/LABORATORIO.md`)
  - [Dossiê Perfil Paciente](perfis/PACIENTE.md) (`docs/perfis/PACIENTE.md`)
  - [Dossiê Perfil Lead Qualificado](perfis/LEAD-QUALIFICADO.md) (`docs/perfis/LEAD-QUALIFICADO.md`)
