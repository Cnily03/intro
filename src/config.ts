import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parse } from 'yaml';
import { z } from 'zod';

// Empty YAML values become null; whitespace-only strings hide optional content.
const optionalText = z
  .string()
  .trim()
  .nullish()
  .transform((value) => value || undefined);

const schema = z.object({
  meta: z.preprocess(
    (value) => value ?? {},
    z.object({
      title: optionalText,
      description: optionalText,
    }),
  ),
  profile: z.object({
    avatar: optionalText,
    name: optionalText,
    github: optionalText,
    orcid: optionalText,
    bilibili: optionalText,
    discord: optionalText,
  }),
  footer: z.preprocess(
    (value) => value ?? {},
    z.object({
      copyright: optionalText,
      icp: optionalText,
      police: optionalText,
    }),
  ),
});

export type Config = z.infer<typeof schema>;

// Load the default file only when no override is provided.
const defaultConfig = import.meta.glob<string>('../config.yaml', {
  query: '?raw',
  import: 'default',
})['../config.yaml'];

async function loadConfig(source = process.env.SITE_CONFIG): Promise<Config> {
  let rawConfig: string;

  if (!source) {
    // default config
    if (!defaultConfig) {
      throw new Error('config.yaml is missing. Create it or set SITE_CONFIG.');
    }
    rawConfig = await defaultConfig();
  } else if (/^https?:/i.test(source)) {
    // remote config
    const response = await fetch(source, { signal: AbortSignal.timeout(15_000) });

    if (!response.ok) {
      throw new Error(`Could not load SITE_CONFIG: HTTP ${response.status}.`);
    }
    rawConfig = await response.text();
  } else {
    // local config
    rawConfig = await readFile(resolve(process.cwd(), source), 'utf8');
  }

  return schema.parse(parse(rawConfig));
}

const config = await loadConfig();

export default config;
