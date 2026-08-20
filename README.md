# Mode Column

Uma extensão para o Visual Studio Code que facilita o uso da Seleção de Coluna e melhora o comportamento ao colar textos (Column Paste).

## Recursos (Features)

Esta extensão adiciona duas funcionalidades principais ao seu VS Code:

### 1. Botão Rápido para Alternar Modo Coluna
Um botão sempre visível na sua barra de status (canto inferior esquerdo) para ligar e desligar facilmente o modo de **Seleção de Coluna**. 
- Você não precisa mais usar a paleta de comandos para alternar.
- O botão mostra claramente se o modo está `ON` (Ligado) ou `OFF` (Desligado).

### 2. Colar em Coluna Inteligente (Column Paste Auto-filled)
Um comportamento inteligente e aprimorado ao colar (`Ctrl + V`) quando o modo de seleção de coluna está ativo. 
- Quando você possui múltiplos cursores ativos e cola um texto de várias linhas, a extensão formata e distribui automaticamente o texto para se alinhar perfeitamente em todas as linhas selecionadas.
- Caso você copie uma única linha e cole em múltiplos cursores, ele preencherá (auto-fill) todos os cursores com o mesmo valor.

> **Créditos:** A funcionalidade de colar (Column Paste) utiliza a lógica desenvolvida originalmente por [john-guo/columnpaste](https://github.com/john-guo/columnpaste).

## Como usar

![Demonstração de como ativar e usar a extensão](Exemplo.gif)

1. Clique no botão **`𝍡 Modo Coluna: OFF`** na barra de status para ativar a Seleção de Coluna.
2. Faça a sua seleção em bloco no código.
3. Aperte `Ctrl + V` (ou `Cmd + V` no Mac) para acionar a colagem inteligente na coluna selecionada.

## Atalhos (Keybindings)

- `Ctrl + V` (Windows/Linux) ou `Cmd + V` (Mac): Sobrescreve o atalho padrão de colar **apenas** quando o foco está no editor de texto e a configuração nativa de seleção de coluna (`editor.columnSelection`) está ativa.

## Requisitos

- Visual Studio Code versão 1.100.0 ou superior.

## Notas de Lançamento (Release Notes)

### 0.0.1

- Lançamento inicial.
- Adicionado botão de toggle na barra de status.
- Integrado o recurso de Colar em Coluna (Auto-filled).
