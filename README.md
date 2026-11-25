# ai

Coleção de *skills* para agentes de IA — boas práticas, ferramentas e pipelines.

## Sobre

- Repositório público: `joaovjo/ai` no GitHub.
- 22 skills em `.agents/skills/`, cada uma como diretório com `SKILL.md` como ponto de entrada.
- `skills-lock.json` — origem e commit de cada skill instalada.

## Como usar

Leia o [AGENTS.md](AGENTS.md) para o pipeline de uso: o okf e o prompt-contract são invocados primeiro, e depois verifica-se que os recursos que eles criam (Knowledge Bundles, `prompt.txt`) não existem; após isso, os demais skills ativam por trigger.

## Skills disponíveis

| Skill | O que faz |
|---|---|
| okf | Cria, audita e valida Knowledge Bundles no formato Open Knowledge Format |
| algorithmic-art | Arte generativa com p5.js (filosofia `.md` + expressão `.html`/`.js`) |
| anti-ai-slop-writing | Textos que pareçam humanos — remove padrões estruturais de IA |
| avoid-ai-writing | Audit/rewrite removendo padrões de IA |
| canvas-design | Filosofia de design visual → arte `.png`/`.pdf` |
| chrome-extensions | Build e publish de extensões Chrome (Manifest V3) |
| discernment-nudge | Anexa perguntas de confirmação em respostas substanciais |
| doc-coauthoring | Workflow estruturado de coautoria de documentação |
| docx | Criar/editar/ler `.docx` e `.dotx` |
| frontend-design | Design distintivo e opinativo para UIs web |
| hallmark | Sites que parecem desenhados, não gerados |
| internal-comms | 3P updates, newsletters, FAQs, status reports |
| modern-web-guidance | Busca e retrieve de best practices modernos de web dev |
| no-slop-ui | UI limpa e humana, sem padrões genéricos de IA |
| pdf | Processamento de PDF (extração, merge, split, formulários, OCR) |
| pptx | Criar/editar apresentações (`.pptx`/`.potx`) |
| prompt-contract | Gera/revisa `prompt.txt` em formato contrato |
| skill-creator | Criar/melhorar skills; eval e benchmark de skills |
| theme-factory | Aplicar 10 temas pré-definidos a slides/docs/HTML |
| ui-unslop | Limpar UI existente de tratamentos genéricos |
| web-artifacts-builder | HTML artifacts elaborados (React + Tailwind + shadcn) |
| xlsx | Criar/editar/limpar planilhas |

## Início rápido

- Tarefa de formato (PDF, Word, Excel, slides): use a skill específica (tabela acima).
- Escrita de texto: anti-ai-slop-writing / avoid-ai-writing / doc-coauthoring / internal-comms.
- Design web: frontend-design, hallmark, no-slop-ui, ui-unslop.
- Documentação estruturada: doc-coauthoring, docx, pptx, theme-factory, okf, prompt-contract.

## Contribuindo

Novo skill: crie o diretório em `.agents/skills/<nome>/` com `SKILL.md` (frontmatter com `name` e `description`) e atualize `skills-lock.json`.
