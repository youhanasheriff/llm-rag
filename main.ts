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

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is required');
    process.exit(1);
  }

  const command = process.argv[2];

  if (!command || (command !== 'ingest' && command !== 'query')) {
    console.error('Error: Please specify a command (ingest or query)');
    console.log('Usage:');
    console.log('  To embed a PDF: bun main.ts ingest <pdf_file>');
    console.log('  To query: bun main.ts query "<your question>"');
    process.exit(1);
  }

  try {
    if (command === 'ingest') {
      const pdfPath = process.argv[3];
      if (!pdfPath) {
        console.error('Error: Please provide a PDF file path');
        console.log('Usage: bun main.ts ingest <pdf_file>');
        process.exit(1);
      }
      await ingest(pdfPath);
      console.log(
        '\nPDF successfully embedded. You can now run queries against it.'
      );
    } else if (command === 'query') {
      const question =
        process.argv[3] ??
        'Explain who this person is and can they be good for game development?';
      if (!question) {
        console.error('Error: Please provide a question');
        console.log('Usage: bun main.ts query "<your question>"');
        process.exit(1);
      }
      console.log('\nQuestion:', question);
      const answer = await ragQuery(question);
      console.log('Answer:', answer);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
