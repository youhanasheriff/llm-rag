import { FeatureExtractionPipeline, pipeline } from '@xenova/transformers';

let embedder: FeatureExtractionPipeline;

export async function getEmbedding(text: string): Promise<number[]> {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
      progress_callback: (progress: any) =>
        console.log(
          `Loading model: ${
            progress.status !== 'progress'
              ? progress.status
              : progress.progress + '%'
          }`
        ),
    });
  }
  const output = await embedder(text, { pooling: 'mean' });
  return Array.from(output.data);
}
