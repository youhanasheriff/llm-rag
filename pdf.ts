// Bun's built-in BunFile handles PDFs
export async function extractText(pdfPath: string): Promise<string> {
  const file = Bun.file(pdfPath);
  const buffer = await file.arrayBuffer();
  const { default: pdf } = await import('pdf-parse');
  const data = await pdf(Buffer.from(buffer));
  return data.text;
}

export function chunkText(text: string, size = 500): string[] {
  const regex = new RegExp(`[\\s\\S]{1,${size}}(?=\\s|$)`, 'g');
  return text.match(regex) || [];
}
