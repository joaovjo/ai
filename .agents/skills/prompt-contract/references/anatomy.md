# Anatomia dos blocos

Cada bloco do `prompt.txt` tem uma função. Escreva em frases curtas, uma regra por linha, e prefira listas e tabelas a prosa.

## 1. PRIORITIES

Lista numerada, em ordem de desempate. Quando dois objetivos conflitarem, o de número menor vence.

```text
PRIORITIES (in this order when they conflict)

1. Simplicity and correctness
2. Friendly, predictable developer experience
3. Maintainability and minimal surface
4. Performance within the target
```

Regra: sem ordem, o agente otimiza o que for mais fácil. A ordem é o que evita isso.

## 2. CONSTRAINTS

Proibições e regras que fecham o espaço de solução. Inclua:

- Stack e versão (ex.: TypeScript 7.x, Bun 1.3+).
- Restrições negativas ("no engine", "no thin wrappers", "no Node compat").
- Regra de decisão wrapper (use / estenda / implemente).
- Zero dependências de runtime (e o que é permitido em dev deps).
- BDD + TDD.
- Fail loud.
- Escala e layout não engessado.
- Erros tipados, validação (Standard Schema), bancos permitidos.

Exemplo de regra de wrapper:

```text
- No thin wrappers. Decision rule:
  * Platform has the primitive -> call it directly.
  * Platform has it partially -> extend/compose, not 1:1.
  * Platform lacks it -> implement.
```

## 3. TARGET

Números, não adjetivos. Hardware, versões, throughput, latência, memória, tempo de build/teste, cobertura.

```text
TARGET

- Bun 1.3+, TypeScript 7.x, Windows 11 / Linux / macOS.
- 50k req/s JSON route, 100 concurrent, ~1 KB response.
- p99 < 5 ms at 10k req/s; cold start < 100 ms.
- RSS < 50 MB hello world; < 100 MB with ORM.
- Typecheck < 5 s warm; tests < 30 s.
```

Se não souber o número, proponha um e marque "(ajustável)".

## 4. ARCHITECTURE

Módulos, direção de dependência, empacotamento e imports. Declare:

- Lista de módulos/pacotes.
- Setas de dependência (`core` ← `http` ← `cli`).
- Regra de imports (interno via `#`, público via subpath).
- Estrutura de diretórios (tree).
- Regra de "batteries embarcam juntas, adoção por importação".

## 5. FEATURES

Tabela com uma linha por capacidade. Cada linha diz o que entra, sem prosa.

```text
| Area | What goes in |
|---|---|
| HTTP | server, router, middleware, request/response, SSE, static |
| ORM | query builder, relations, migrations, transactions |
```

O inventário é a checklist de escopo. Não deixe item implícito.

## 6. API SURFACE

Exemplos de código reais (hello world, middleware, ORM, auth) e convenções de nome. É o que o crítico e o implementador usam para julgar DX.

## 7. DIAGNOSTICS

Descreva o comando que encontra erros escondidos: catch vazio, fallback silencioso, retry infinito, default escondendo dado faltando. Ele lista antes de corrigir.

```text
DIAGNOSTICS

`doctor` finds every place where an error happens and nobody finds out:
empty catch, silent fallback, infinite retry, default hiding missing data.
It lists every occurrence before changing anything.
```

Inclua a instrução literal do autor, se houver.

## 8. REFERENCES

Docs oficiais que são fonte de verdade, com URLs, e bases locais (ex.: `exemplos/`). Registre versão e data da consulta.

## 9. VERIFICATION

Gates por dimensão:

- BDD specs antes do código; `bun test` passa; cobertura alvo.
- Typecheck limpo.
- App de exemplo inicia e smoke test bate em tudo.
- Bench com ferramentas oficiais (mitata/bombardier/oha/hyperfine).
- Crítico independente: vê spec, README, exemplos, tipos e respostas; nunca o código interno. Itere até nada acima de "minor".
- Sem erros no console; sem `any` público.

## 10. DONE WHEN

Condição de saída objetiva, por dimensão. Entregáveis explícitos.

## 11. NON-GOALS

O que fica fora. Evita scope creep e dá critério de recusa.