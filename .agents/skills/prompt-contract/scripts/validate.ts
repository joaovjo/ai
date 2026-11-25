#!/usr/bin/env bun
/**
 * Validador de prompt.txt no formato contrato.
 *
 * Uso:
 *   bun run .agents/skills/prompt-contract/scripts/validate.ts [arquivo]
 *
 * Padrão: ./prompt.txt
 *
 * Verifica:
 *   - blocos obrigatórios presentes (EN e PT-BR);
 *   - PRIORITIES é lista numerada;
 *   - TARGET tem números;
 *   - VERIFICATION menciona crítico independente;
 *   - DIAGNOSTICS e REFERENCES recomendados;
 *   - DONE WHEN e NON-GOALS presentes.
 *
 * Saída: 0 se válido (warnings ok), 1 se houver erro.
 */

const file = process.argv[2] ?? "prompt.txt";

const text = await Bun.file(file).text();

if (text.trim().length === 0) {
  console.error(`ERRO: ${file} está vazio.`);
  process.exit(1);
}

interface SectionCheck {
  readonly id: string;
  readonly label: string;
  readonly re: RegExp;
  readonly required: boolean;
}

const sections: readonly SectionCheck[] = [
  { id: "priorities", label: "PRIORITIES", re: /^#{0,3}\s*(priorities|prioridades)\b/im, required: true },
  { id: "constraints", label: "CONSTRAINTS", re: /^#{0,3}\s*(constraints|restri[cç][oõ]es)\b/im, required: true },
  { id: "target", label: "TARGET", re: /^#{0,3}\s*(target|alvo)\b/im, required: true },
  { id: "architecture", label: "ARCHITECTURE", re: /^#{0,3}\s*(architecture|arquitetura)\b/im, required: true },
  { id: "features", label: "FEATURES", re: /^#{0,3}\s*(features|funcionalidades|recursos)\b/im, required: true },
  { id: "api", label: "API SURFACE", re: /^#{0,3}\s*(api surface|api|superf[íi]cie de api)\b/im, required: false },
  { id: "diagnostics", label: "DIAGNOSTICS", re: /^#{0,3}\s*(diagnostics|diagn[óo]sticos)\b/im, required: false },
  { id: "references", label: "REFERENCES", re: /^#{0,3}\s*(references|refer[êe]ncias)\b/im, required: false },
  { id: "verification", label: "VERIFICATION", re: /^#{0,3}\s*(verification|verifica[cç][aã]o)\b/im, required: true },
  { id: "done", label: "DONE WHEN", re: /^#{0,3}\s*(done when|pronto quando|conclu[íi]do quando)\b/im, required: true },
  { id: "nongoals", label: "NON-GOALS", re: /^#{0,3}\s*(non-goals|n[ãa]o-objetivos|fora de escopo)\b/im, required: true },
];

const errors: string[] = [];
const warnings: string[] = [];

for (const section of sections) {
  if (!section.re.test(text)) {
    const message = `${section.label} ausente`;
    if (section.required) errors.push(message);
    else warnings.push(`${message} (recomendado)`);
  }
}

// PRIORITIES precisa ser lista numerada.
const prioritiesMatch = text.match(/(?:^|\n)(?:#{0,3}\s*(?:priorities|prioridades)\b[^\n]*\n)([\s\S]*?)(?=\n#{0,3}\s*(?:constraints|restri[cç][oõ]es)\b|$)/i);
if (prioritiesMatch) {
  const body = prioritiesMatch[1] ?? "";
  const numbered = /^\s*\d+\.\s+\S+/m.test(body);
  if (!numbered) errors.push("PRIORITIES não é uma lista numerada (1. 2. 3.).");
}

// TARGET precisa de números.
const targetMatch = text.match(/(?:^|\n)(?:#{0,3}\s*(?:target|alvo)\b[^\n]*\n)([\s\S]*?)(?=\n#{0,3}\s*(?:architecture|arquitetura)\b|$)/i);
if (targetMatch) {
  const body = targetMatch[1] ?? "";
  if (!/\d/.test(body)) warnings.push("TARGET não tem números (use métricas, não adjetivos).");
}

// VERIFICATION precisa mencionar crítico independente.
const verificationMatch = text.match(/(?:^|\n)(?:#{0,3}\s*(?:verification|verifica[cç][aã]o)\b[^\n]*\n)([\s\S]*?)(?=\n#{0,3}\s*(?:done when|pronto quando|conclu[íi]do quando)\b|$)/i);
if (verificationMatch) {
  const body = verificationMatch[1] ?? "";
  if (!/critic|cr[íi]tic|crítico/i.test(body)) {
    warnings.push("VERIFICATION não menciona crítico independente (recomendado).");
  }
}

// NON-GOALS não pode estar vazio.
const nongoalsMatch = text.match(/(?:^|\n)(?:#{0,3}\s*(?:non-goals|n[ãa]o-objetivos|fora de escopo)\b[^\n]*\n)([\s\S]*)$/i);
if (nongoalsMatch) {
  const body = (nongoalsMatch[1] ?? "").trim();
  if (body.length === 0) errors.push("NON-GOALS está vazio.");
}

console.log(`Validação de prompt: ${file}`);
console.log(`  linhas: ${text.split(/\r?\n/).length}`);
console.log(`  bytes:  ${text.length}`);
console.log("");

if (warnings.length > 0) {
  console.log("Avisos:");
  for (const warning of warnings) console.log(`  - ${warning}`);
  console.log("");
}

if (errors.length > 0) {
  console.error("Erros:");
  for (const error of errors) console.error(`  - ${error}`);
  console.error("");
  console.error("❌ Prompt NÃO CONFORMANTE.");
  process.exit(1);
}

console.log("✅ Prompt CONFORMANTE com o formato contrato.");
process.exit(0);