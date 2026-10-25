type TemplateValue = string | number | boolean | null | undefined;

export function render(tmpl: string, ctx: Record<string, TemplateValue>): string {
  return tmpl.replace(/\{\{\s*([\w-]+)\s*\}\}/g, (placeholder, key: string) => {
    // Read only keys defined directly on the context object.
    if (!Object.hasOwn(ctx, key)) return placeholder;

    return String(ctx[key] ?? '');
  });
}
