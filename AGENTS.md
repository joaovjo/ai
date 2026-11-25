# AGENTS.md — Pipeline de uso das skills

Este repositório é uma coleção de *skills* para agentes de IA, em `.agents/skills/`. Cada skill é um diretório com um `SKILL.md` (instruções de ativação e fluxo de trabalho) e, em geral, arquivos de apoio: `references/`, `scripts/`, `templates/`.

## Pipeline padrão

1. **Ação 1 — okf e prompt-contract:** invocá-los primeiro, na ordem okf → prompt-contract, e verificar que os recursos que eles criam não existem antes de prosseguir:
   - **okf:** verificar que não existem Knowledge Bundles (diretórios de knowledge bundles com `index.md`, `log.md` e concepts).
   - **prompt-contract:** verificar que não existe `prompt.txt` (contrato de prompt do projeto).
2. **Ler a solicitação** do usuário.
3. **Checar os triggers** dos skills abaixo. O `description` do frontmatter de cada `SKILL.md` é a fonte de verdade de quando o skill ativa; carregue o `SKILL.md` do skill e siga o pipeline que ele define.
4. **Executar a tarefa** conforme o skill diz. Quando o skill define critério de sucesso, cheque-o.
5. **Sem match:** não carregue outros skills.

## Índice de skills por trigger

| Skill | Quando ativar (excerpt do `description` do `SKILL.md`) |
|---|---|
| okf | Cria, audita e valida Knowledge Bundles no formato Open Knowledge Format (MD + YAML frontmatter, tipo obrigatório) |
| algorithmic-art | Arte generativa com p5.js: filosofia em `.md` + expressão em `.html`/`.js` interativos |
| anti-ai-slop-writing | Escrever textos que pareçam humanos: sem padrões estruturais de IA, palavras banidas em `references/` |
| avoid-ai-writing | Audit/rewrite removendo padrões de IA (v3.39.1); detect, edit in place, perfil de voz |
| canvas-design | Filosofia de design visual → arte `.png`/`.pdf` |
| chrome-extensions | Build e publish de extensões Chrome (Manifest V3) |
| discernment-nudge | Anexar 2–3 perguntas de confirmação em respostas substanciais |
| doc-coauthoring | Workflow estruturado coautoria de documentação (Context Gathering → Refinement → Reader Testing) |
| docx | Criar/editar/ler `.docx` e `.dotx` |
| frontend-design | Design distintivo e opinativo para UIs web |
| hallmark | Sites que parecem desenhados, não gerados |
| internal-comms | 3P updates, newsletters, FAQs, status reports |
| modern-web-guidance | Busca e retrieve de best practices modernos de web dev |
| no-slop-ui | UI limpa, humana, sem padrões genéricos de IA |
| pdf | Processamento de PDF (extração de texto/tabelas, merge, split, formulários, OCR) |
| pptx | Criar/editar apresentações (`pptxgenjs`, scripts de leitura) |
| prompt-contract | Gera/revisa `prompt.txt` em formato contrato (PRIORITIES, CONSTRAINTS, TARGET, ...) |
| skill-creator | Criar/melhorar skills; eval e benchmark de skills |
| theme-factory | Aplicar 10 temas pré-definidos a slides/docs/HTML |
| ui-unslop | Limpar tratamentos genéricos de UI existente, preservando produto |
| web-artifacts-builder | HTML artifacts elaborados (React + Tailwind + shadcn) como arquivo único |
| xlsx | Criar/editar/limpar planilhas (`.xlsx`, `.csv`, `.tsv`) |

## Regras do pipeline

- Skills de escrita aplicam em qualquer tarefa de texto.
- Skills de formato ativam quando o pedido envolve o formato: docx, pdf, pptx, xlsx...
- Avoid-ai-writing e ui-unslop têm `AGENTS.md` próprio dentro do skill: aplicam o fluxo deles.
