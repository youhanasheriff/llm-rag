import { extractText, chunkText } from './pdf';
import { getEmbedding } from './embeddings';
import { storeDocument } from './vectorDB';
import { ragQuery } from './rag';

// Ingest PDF
async function ingest(pdfPath: string) {
  console.log('Ingesting PDF:', pdfPath);
  const text = await extractText(pdfPath);
  const chunks = chunkText(text);

  console.log(`Processing ${chunks.length} chunks...`);
  for (const chunk of chunks) {
    const embedding = await getEmbedding(chunk);
    storeDocument(chunk, embedding);
  }
  console.log('Ingestion complete!');
}

// Query
async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is required');
    process.exit(1);
  }

  const pdfPath = process.argv[2];
  if (!pdfPath) {
    console.error('Error: Please provide a PDF file path');
    console.log('Usage: bun main.ts <pdf_file>');
    process.exit(1);
  }

  try {
    await ingest(pdfPath);

    // Example query
    const question =
      'Explain who this person is and can they be good for game development?';
    console.log('\nQuestion:', question);
    const answer = await ragQuery(question);
    console.log('Answer:', answer);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
