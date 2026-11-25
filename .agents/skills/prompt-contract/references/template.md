# Template para preencher

Copie, preencha e apague os comentários `<!-- -->`. O arquivo final é texto puro (sem markdown de comentário). A versão canônica (PT-BR) e a tradução EN têm os mesmos blocos.

```text
Build <descrição do produto em uma frase>.

PRIORITIES (in this order when they conflict)

1. <principal>
2. <secundário>
3. <terciário>
4. <performance/alvo>

CONSTRAINTS

- <stack e versão>; siga <style guide>. Consulte <notas da versão>.
- <runtime/plataforma>; APIs nativas primeiro. Docs oficiais: <urls>. Consulte antes de usar; registre versão e data.
- Zero dependências de runtime; dev deps: <lista>.
- Simplicidade primeiro. <regra anti-sobreengenharia>.
- DX amigável. <nomes previsíveis, erros consistentes, boilerplate mínimo>.
- Manutenibilidade. <módulos pequenos, deps explícitas, sem mágica>.
- Fail loud. Sem catch vazio, fallback silencioso, retry infinito, default escondendo dado faltando.
- Escala <microapp a enterprise>. Adoção incremental; sem layout obrigatório.
- BDD + TDD. Spec que falha primeiro; red -> green -> refactor.
- Sem wrappers finos. Regra: usar / estender / implementar.
- <frontend agnóstico / sem acoplamento>.
- <empacotamento: monorepo, módulos internos, imports # e subpaths>.
- Sem <compatibilidade não necessária>.
- Sem `any` público; sem `@ts-ignore`; sem <recursos não suportados>.
- Tree-shakeable.
- Erros tipados com <status/código>.
- Validação: <Standard Schema / equivalente>.
- Bancos: <lista> via <driver>, conforme <doc>. Sem drivers de terceiros.

TARGET

- <runtime> <versão>, <SO/alvos>.
- <throughput>, <concorrência>, <tamanho de resposta>, <hardware>.
- <p99>, <cold start>.
- <RSS/memória>.
- <typecheck/testes>.
- API pública: <limite de exports>; sem vazamento de tipos.
- Sem erros/warnings no console ao iniciar.

ARCHITECTURE

- Módulos internos: <lista>.
- Direção de dependência: <setas>.
- Sem ciclos; imports internos via `#`; públicos via subpath.
- <estrutura de diretórios em tree>.
- <regra de empacotamento e adoção>.

FEATURES

| Área | O que entra |
|---|---|
| <área 1> | <itens> |
| <área 2> | <itens> |

API SURFACE

<exemplo hello world>

<exemplo com middleware/validação/DI>

<exemplo com ORM/auth>

Naming: <convenções>.

DIAGNOSTICS

O projeto inclui um comando `doctor` que encontra todo lugar onde um erro acontece e ninguém fica sabendo: catch vazio, fallback silencioso, retry infinito, valor padrão escondendo dado faltando. Lista antes de corrigir.

```bash
<comando> doctor
```

<instrução literal do autor, se houver>

REFERENCES

- Docs oficiais: <urls>.
- <base local de referências>.
- <base de conhecimento>.

VERIFICATION

- BDD specs antes do código; `<test command>` passa; cobertura >= <n>% <core>.
- TDD: red -> green -> refactor.
- `<typecheck command>` limpo.
- `<example command>` inicia; smoke test bate em todas as rotas.
- `<bench command>` segue <doc de bench>: <ferramentas>; reporte avg, p99, max, RSS.
- Crítico independente: vê spec, README, exemplos, tipos, respostas; nunca o código interno. Itere até nada acima de "minor".
- Sem erros/warnings; sem `any` público; sem `@ts-ignore`.
- Docs oficiais consultadas; versão/data registradas no README.
- `doctor` lista zero falhas silenciosas não listadas.

DONE WHEN

- Todos os gates passam.
- Entregáveis: <lista>.
- <app de exemplo demonstra tudo>.
- <base de conhecimento atualizada>.
- `doctor` não reporta erros escondidos.

NON-GOALS

- <o que fica fora>.
- <compatibilidade não necessária>.
- <layout rígido>.
- <compatibilidade retroativa antes do 1.0>.
```