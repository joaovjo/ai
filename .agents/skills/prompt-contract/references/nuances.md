# Nuances e regras duras

Estas regras são o que separa um prompt contrato de um pedido vago. Aplique todas.

## 1. Prioridades ordenadas

Liste em ordem de desempate. Sem ordem, o agente escolhe o caminho mais fácil. A ordem é o mecanismo de resolução de conflito.

## 2. Restrições negativas

Proíba explicitamente os atalhos: engine pronta, lib externa, wrapper fino, compatibilidade que não é necessária. Cada proibição reduz o espaço de solução e força o trabalho real.

## 3. Números no lugar de adjetivos

Troque "rápido/leve/bonito/robusto" por métricas: `≤ 11 ms`, `≤ 128 KB`, `≥ 90%`, `60 s`, `100%`. Se não souber, proponha e marque "(ajustável)". Adjetivo sem número é o principal modo de falha.

## 4. Inventário como checklist

Liste cada item de escopo em tabela. O inventário é a checklist que o implementador e o crítico usam. Item implícito vira item esquecido.

## 5. Crítico independente (cego)

O crítico é um subagente que:

- Vê apenas os artefatos: renders, app de exemplo, tipos públicos, README, respostas.
- Nunca vê o código interno nem o raciocínio do implementador.
- Devolve defeitos priorizados e concretos.
- O loop itera até não haver nada acima de "minor".

Isso impede a autoavaliação complacente. Sem crítico cego, o prompt vira "o modelo aprova o próprio trabalho".

## 6. Done when por dimensão

Não use "quando estiver pronto". Use um gate por eixo:

- Estético/funcional: crítico cego sem defeitos acima de "minor".
- Performance: avg/p99/max dentro do alvo.
- Funcional: testes, typecheck, app de exemplo, `doctor`.

## 7. Regra de wrapper (use / estenda / implemente)

- A plataforma tem o primitivo → use direto; só crie API do framework se adicionar tipagem, ciclo de vida, config ou composição.
- A plataforma tem parcial → estenda/componha, não embrulhe 1:1.
- A plataforma não tem → implemente.

Nada de wrapper fino: se o módulo só encaminha, apague e chame direto.

## 8. BDD + TDD

Toda feature começa com uma spec BDD que falha (`describe`/`it`, Given/When/Then no nome). Red → green → refactor. Nenhuma implementação sem teste que falhe primeiro.

## 9. Fail loud + diagnostics

Proíba: catch vazio, fallback silencioso, retry infinito, default escondendo dado faltando. Inclua um comando `doctor` que lista todas as ocorrências antes de corrigir. Erro tem que ser visível e acionável.

## 10. Docs oficiais como fonte de verdade

Cite as URLs oficiais e registre versão e data da consulta. Não confie na memória do modelo. Para Bun, inclua `llms.txt` e `llms-full.txt`; para TypeScript, os style guides e as notas da versão alvo.

## 11. Escala e layout não engessado

O projeto deve atender de microapp a enterprise. Adoção incremental, sem layout obrigatório. O monorepo é estrutura de desenvolvimento, não estrutura exigida do consumidor.

## 12. Bilingue

- Canônico no idioma nativo do autor (ex.: PT-BR).
- Tradução EN é a que alimenta modelos de código.
- Mudanças começam no canônico; a tradução é sincronizada.

## 13. Benchmarking com ferramentas oficiais

Siga a orientação da plataforma. Para Bun: `Bun.nanoseconds()`/`performance.now()`, `mitata`, `bombardier`/`oha`, `hyperfine`. Não use ferramentas mais lentas que o runtime (ex.: autocannon).

## 14. Segurança e segredos

Nunca imprima valores de secrets; use placeholders. Trate env vars como sensíveis. Inclua redação no logger.

## 15. Escopo explícito e non-goals

O que não está na especificação não está no escopo. Extras precisam ser registrados. `NON-GOALS` evita que o projeto nunca termine.