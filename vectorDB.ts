import { Database } from 'bun:sqlite';

const db = new Database('rag.db', { create: true });

// Initialize with vector similarity extension
db.exec(`
  CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY,
    text TEXT,
    embedding BLOB
  );
`);

export function storeDocument(text: string, embedding: number[]) {
  const stmt = db.prepare(`
    INSERT INTO documents (text, embedding) VALUES (?, ?)
  `);
  stmt.run(text, JSON.stringify(embedding));
}

export function searchSimilar(queryEmbedding: number[], limit = 3) {
  const embeddingJson = JSON.stringify(queryEmbedding);
  const stmt = db.prepare(`
    WITH RECURSIVE
    indices(i) AS (
      SELECT 0
      UNION ALL
      SELECT i + 1 FROM indices
      WHERE i < json_array_length(?) - 1
    ),
    distances AS (
      SELECT text,
        SUM(
          (json_extract(embedding, '$[' || i || ']') - json_extract(?, '$[' || i || ']')) *
          (json_extract(embedding, '$[' || i || ']') - json_extract(?, '$[' || i || ']'))
        ) as distance
      FROM documents
      CROSS JOIN indices
      GROUP BY id
    )
    SELECT text
    FROM distances
    ORDER BY distance ASC
    LIMIT ?
  `);
  return stmt.all(embeddingJson, embeddingJson, embeddingJson, limit) as {
    text: string;
  }[];
}
