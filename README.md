# LLM RAG Application

A Retrieval-Augmented Generation (RAG) system that allows you to query PDF documents using Large Language Models. This application uses DeepSeek Chat for natural language processing and OpenRouter API for model access.

## Features

- PDF document processing and text extraction
- Efficient document embedding generation
- Vector database for similarity search
- RAG-powered question answering
- Integration with DeepSeek Chat model

## Prerequisites

- [Bun](https://bun.sh/) runtime environment
- OpenRouter API key (or other OpenAI-compatible provider)

## Setup

1. Install dependencies:

```bash
bun install
```

2. Set up your OpenAI/OpenRouter API key:
   - Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` and replace `your-api-key-here` with your actual OpenAI/OpenRouter API key

## Project Structure

- `main.ts`: Entry point for the application
- `pdf.ts`: PDF processing and text extraction
- `embeddings.ts`: Document embedding generation
- `vectorDB.ts`: Vector database operations
- `rag.ts`: RAG implementation and query handling

## Usage

The application supports two main commands:

### 1. Ingesting a PDF

To embed a PDF document into the vector database:

```bash
bun main.ts ingest <pdf_file>
```

Example:

```bash
bun main.ts ingest AyaMohsenResume.pdf
```

This will:

- Extract text from the PDF
- Split the text into manageable chunks
- Generate embeddings for each chunk
- Store the chunks and embeddings in the vector database

### 2. Querying the Embedded Document

To ask questions about the ingested document:

```bash
bun main.ts query "<your question>"
```

Example:

```bash
bun main.ts query "Explain who this person is and can they be good for game development?"
```

The system will:

- Generate an embedding for your question
- Find relevant context from the PDF using similarity search
- Use the DeepSeek Chat model to generate an accurate answer based on the retrieved context

## Dependencies

- `@xenova/transformers`: For generating embeddings
- `openai`: For interacting with the OpenAI/OpenRouter API
- `pdf-parse`: For extracting text from PDF documents
