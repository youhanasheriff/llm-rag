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
- OpenRouter API key // or other open compatible provider

## Setup

1. Install dependencies:

```bash
bun install
```

2. Set up your OpenRouter API key:
   - Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` and replace `your-api-key-here` with your actual OpenRouter API key

## Project Structure

- `main.ts`: Entry point for the application
- `pdf.ts`: PDF processing and text extraction
- `embeddings.ts`: Document embedding generation
- `vectorDB.ts`: Vector database operations
- `rag.ts`: RAG implementation and query handling

## Usage

1. Run the application with a PDF file:

```bash
bun main.ts <pdf_file>
```

Example:

```bash
bun main.ts AyaMohsenResume.pdf
```

2. Once the PDF is processed, you can ask questions about its content. The system will:
   - Generate embeddings for your question
   - Find relevant context from the PDF
   - Use the DeepSeek Chat model to generate accurate answers

## Dependencies

- `@xenova/transformers`: For generating embeddings
- `openai`: For interacting with the OpenRouter API
- `pdf-parse`: For extracting text from PDF documents
