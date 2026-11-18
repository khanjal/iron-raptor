/** Strip document-level tags from imported legacy HTML so it can't restyle the whole app. */
export function cleanImportedHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<(link|meta|base|title)\b[^>]*>(\s*<\/title>)?/gi, '')
    .replace(/<title[\s\S]*?<\/title>/gi, '');
}
