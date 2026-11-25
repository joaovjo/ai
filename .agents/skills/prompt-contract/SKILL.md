---
name: prompt-contract
description: >-
  Gera e revisa o prompt.txt de um projeto no formato contrato: prioridades ordenadas,
  restrições, alvo numérico, arquitetura, inventário de features, API surface, diagnostics,
  referências oficiais, verificação com crítico independente, done when e non-goals.
  Ative quando o usuário pedir para criar/atualizar o prompt.txt, escrever a especificação
  mestra de um projeto, transformar uma ideia em um contrato executável para agentes de IA,
  ou revisar um prompt existente para torná-lo verificável.
---

# Prompt Contract (prompt.txt)

Um `prompt.txt` bom não descreve o código: descreve o **produto** e o **teste de aceite**. Esta skill gera esse contrato em blocos curtos, com prioridades que resolvem conflitos, números no lugar de adjetivos e um crítico independente que nunca vê o código.

O formato é reaproveitável entre domínios (backend, frontend, CLI, biblioteca, jogo, data). Os exemplos usam Bun + TypeScript, mas o método é agnóstico de stack: adapte os valores ao projeto.

## Quando usar

- Criar o `prompt.txt` de um projeto novo.
- Reescrever um pedido vago ("crie um app bonito e rápido") em contrato verificável.
- Revisar um prompt existente que não tem critério de aceite.
- Definir a especificação mestra de uma feature grande antes de implementar.

## Princípios do próprio prompt (nesta ordem)

1. Simplicidade e correção.
2. DX amigável e previsível.
3. Manutenibilidade e superfície mínima.
4. Performance dentro do alvo.

Estes princípios vão no bloco `PRIORITIES` e resolvem conflitos sem o agente adivinhar.

## Estrutura (10 blocos, nesta ordem)

| # | Bloco | Função |
|---|---|---|
| 1 | `PRIORITIES` | Ordem de desempate quando dois objetivos conflitam. |
| 2 | `CONSTRAINTS` | Proibições e regras que fecham o espaço de solução. |
| 3 | `TARGET` | Hardware/versões e números de aceite (não adjetivos). |
| 4 | `ARCHITECTURE` | Módulos, direção de dependência, empacotamento, imports. |
| 5 | `FEATURES` | Inventário em tabela: cada battery/capacidade e o que entra. |
| 6 | `API SURFACE` | Exemplos de código e convenções de nome. |
| 7 | `DIAGNOSTICS` | Como o projeto expõe erros escondidos (comando `doctor`). |
| 8 | `REFERENCES` | Docs oficiais que são fonte de verdade + bases locais. |
| 9 | `VERIFICATION` | Gates: testes, typecheck, app de exemplo, bench, crítico cego. |
| 10 | `DONE WHEN` | Condição de saída objetiva. |
| 11 | `NON-GOALS` | O que fica fora (evita scope creep). |

Detalhe bloco a bloco em [references/anatomy.md](references/anatomy.md). Regras duras em [references/nuances.md](references/nuances.md). Esqueleto para preencher em [references/template.md](references/template.md).

## Nuances obrigatórias

1. **Prioridades ordenadas**: liste o que importa em ordem; é o que resolve conflito.
2. **Restrições negativas**: proíba caminhos fáceis (engine, lib pronta, wrapper fino).
3. **Números no lugar de adjetivos**: `≤ 11 ms`, `≤ 128 KB`, `≥ 90%`, `60 s` — não "rápido", "leve".
4. **Inventário como checklist**: liste cada item de escopo; evita esquecimento.
5. **Crítico independente**: um subagente que vê só os artefatos (renders, app, tipos, docs), nunca o código nem o raciocínio. Ele devolve defeitos priorizados; itere até não haver nada acima de "minor".
6. **Done when por dimensão**: um gate por eixo (estético/funcional/performance), não um "está pronto".
7. **Decisão de wrapper**: se a plataforma já tem o primitivo, use; se tem parcial, estenda; se não tem, implemente. Nada de wrapper 1:1.
8. **BDD + TDD**: toda feature começa com spec que falha; red → green → refactor.
9. **Fail loud + diagnostics**: sem catch vazio, fallback silencioso, retry infinito ou default escondendo dado faltando; inclua um comando `doctor` que lista antes de corrigir.
10. **Docs oficiais como fonte de verdade**: cite URLs, registre versão e data da consulta.
11. **Escala e layout não engessado**: microapp a enterprise; adoção incremental; sem layout obrigatório.
12. **Bilingue**: canônico no idioma nativo do autor; tradução EN é a que alimenta modelos de código.

## Fluxo de geração

1. **Coletar contexto**: domínio, stack, restrições reais, o que "pronto" significa, referências locais (ex.: `exemplos/`), docs oficiais.
2. **Preencher os 10 blocos** usando [references/template.md](references/template.md). Se faltar um número, proponha um e marque como ajustável.
3. **Escrever o canônico** (PT-BR ou idioma do autor) e a **tradução EN** (`prompt.txt` na raiz).
4. **Validar** com o script:
   ```bash
   bun run .agents/skills/prompt-contract/scripts/validate.ts ./prompt.txt
   ```
5. **Revisar com o checklist** abaixo antes de entregar.

## Checklist de qualidade

- [ ] `PRIORITIES` é lista numerada e ordenada.
- [ ] `CONSTRAINTS` tem ao menos uma restrição negativa.
- [ ] `TARGET` tem números (não só adjetivos).
- [ ] `ARCHITECTURE` declara módulos, direção de dependência e empacotamento.
- [ ] `FEATURES` é tabela com uma linha por capacidade.
- [ ] `API SURFACE` tem exemplos de código reais.
- [ ] `DIAGNOSTICS` descreve o `doctor` (ou equivalente).
- [ ] `REFERENCES` cita docs oficiais com URLs.
- [ ] `VERIFICATION` inclui crítico independente e gates por dimensão.
- [ ] `DONE WHEN` é objetivo e verificável.
- [ ] `NON-GOALS` existe e evita scope creep.
- [ ] Versão canônica e tradução EN estão sincronizadas.

## Erros comuns

- **Adjetivo sem número**: "rápido", "leve", "bonito" sem métrica.
- **Prioridades não ordenadas**: lista de desejos sem desempate.
- **Crítico que vê o código**: vira autoavaliação complacente.
- **Done when vago**: "quando estiver bom".
- **Wrapper fino**: embrulhar 1:1 o que a plataforma já dá.
- **Escopo sem non-goals**: o projeto nunca termina.
- **Sem docs oficiais**: o agente inventa APIs de memória.

## Referências

- [Anatomia dos blocos](references/anatomy.md)
- [Nuances e regras duras](references/nuances.md)
- [Template para preencher](references/template.md)
- [Validador](scripts/validate.ts)