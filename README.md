# MedIntel — AI Medical Research Assistant

## Live Demo

**Frontend:** https://medical-research-assistant-kwff1e5ts-vijateam.vercel.app

**Backend API:** https://medical-research-assistant-production-6965.up.railway.app

**API Documentation:** https://medical-research-assistant-production-6965.up.railway.app/docs

## 1. Project Overview

**MedIntel** is an AI-powered medical research assistant designed to help users interact with medical research documents through a conversational interface.

The application combines **Retrieval-Augmented Generation (RAG)** with large language models to retrieve relevant information from uploaded medical documents and generate contextual responses. Users can upload research PDFs, ask questions, review generated responses, and access conversation history through a secure web application.

> **Note:** MedIntel is designed as a research assistance tool and is not intended to replace qualified medical professionals or provide medical diagnosis or treatment.

---

## 2. Key Features

* Medical research PDF upload and processing
* Retrieval-Augmented Generation (RAG)
* Semantic document search using embeddings
* ChromaDB vector storage
* AI-generated responses using an LLM
* Source-aware responses based on uploaded documents
* User registration and authentication
* Protected application routes
* Conversation management
* Chat history
* Responsive web interface
* Loading, error, and upload status handling
* Separate frontend and backend architecture
* Production deployment support

---

## 3. System Architecture

MedIntel follows a client-server architecture consisting of a React frontend and FastAPI backend.

```text
User
 │
 ▼
React Frontend
 │
 ▼
FastAPI Backend
 │
 ├── Authentication
 │
 ├── PDF Processing
 │      │
 │      ├── PDF Loader
 │      ├── Text Splitter
 │      └── Embeddings
 │
 ├── ChromaDB Vector Store
 │
 ├── RAG Pipeline
 │
 ├── LLM Service
 │
 └── Conversation / Memory Services
 │
 ▼
AI-Generated Response
```

---

## 4. RAG Pipeline

The core research functionality is implemented using Retrieval-Augmented Generation.

The processing flow is:

```text
Medical PDF
    ↓
Document Loading
    ↓
Text Splitting
    ↓
Embedding Generation
    ↓
Vector Storage
    ↓
Semantic Retrieval
    ↓
Relevant Context
    ↓
LLM
    ↓
Research Response
```

This allows the system to ground responses in the content of the uploaded medical documents rather than relying only on the model's general knowledge.

---

## 5. Technology Stack

### Frontend

* React
* Vite
* JavaScript
* CSS
* React Context
* Custom React Hooks

### Backend

* Python
* FastAPI
* Uvicorn
* Pydantic
* LangChain
* ChromaDB

### AI / RAG

* Large Language Model integration
* Embedding model
* Retrieval-Augmented Generation
* Semantic similarity search
* Vector database

### Database & Authentication

* SQLite
* Authentication services
* Password/security handling
* Protected API routes

### Deployment

* Frontend: Vercel
* Backend: Railway / production hosting environment

---

## 6. Backend Structure

```text
backend/
└── app/
    ├── auth/
    ├── database/
    ├── models/
    ├── rag/
    ├── routers/
    ├── services/
    ├── utils/
    ├── config.py
    └── main.py
```

### `auth/`

Contains authentication and authorization functionality.

### `database/`

Contains database configuration and database models.

### `models/`

Contains Pydantic schemas used for API request and response validation.

### `rag/`

Contains the document processing and RAG pipeline, including:

* PDF loading
* Document splitting
* Embedding generation
* Vector store creation
* Retrieval pipeline

### `routers/`

Contains FastAPI API routes for:

* Authentication
* Chat
* Conversations
* Health checks
* PDF uploads

### `services/`

Contains application-level services such as:

* LLM interaction
* Conversation management
* Memory
* Message handling

### `utils/`

Contains reusable utility functionality such as logging.

### `main.py`

Application entry point that initializes the FastAPI application and registers the API routers.

---

## 7. Frontend Structure

```text
frontend/
└── src/
    ├── assets/
    ├── components/
    ├── context/
    ├── hooks/
    ├── pages/
    ├── services/
    ├── styles/
    └── utils/
```

### Components

Reusable UI components are separated into chat, common, layout, and upload components.

### Pages

Contains major application screens such as:

* Login
* Registration
* Chat
* Unauthorized
* Not Found

### Services

Handles communication between the frontend and backend APIs.

### Context

Provides application-wide authentication state.

### Hooks

Provides reusable frontend logic for authentication, chat, and document upload functionality.

---

## 8. Authentication

MedIntel provides user authentication to protect application functionality.

The authentication flow includes:

```text
Registration
    ↓
Login
    ↓
Authentication
    ↓
Protected Routes
    ↓
Medical Research Assistant
```

Protected frontend routes prevent unauthorized users from accessing application functionality.

---

## 9. API Endpoints

The backend exposes RESTful API endpoints through FastAPI.

Major API areas include:

| Area           | Purpose                                 |
| -------------- | --------------------------------------- |
| Authentication | Registration and login                  |
| Health         | Application/service health verification |
| Upload         | Medical PDF upload and indexing         |
| Chat           | AI research conversations               |
| Conversations  | Conversation management                 |

FastAPI also provides interactive API documentation through the `/docs` endpoint when the backend is running.

---

## 10. Local Development

### Backend

Create and activate a Python virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the backend:

```bash
python -m uvicorn app.main:app --reload
```

The backend is available locally through the configured FastAPI server.

### Frontend

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend runs through the Vite development server.

---

## 11. Environment Configuration

Sensitive configuration values are stored using environment variables rather than being committed directly to source control.

Examples include:

* LLM API credentials
* Authentication secrets
* Application configuration

Environment files such as `.env` are excluded from Git using `.gitignore`.

---

## 12. Deployment

The application uses separate deployment environments for the frontend and backend.

### Frontend

The React/Vite frontend is deployed using Vercel.

### Backend

The FastAPI backend is deployed as a Python web service.

The production backend uses Uvicorn and binds to the hosting platform's assigned port:

```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Environment variables required by the backend are configured through the deployment platform.

---

## 13. Project Screenshots

Application screenshots are available in:

```text
screenshots/
```

The screenshots demonstrate major application functionality including authentication, document upload, chat interaction, and the deployed application interface.

---

## 14. Documentation

Detailed project documentation is available in:

```text
docs/
```

The documentation includes:

* Initial project documentation
* Final project documentation

---

## 15. Repository Structure

```text
medical-research-assistant/
│
├── README.md
│
├── backend/
│   ├── .gitignore
│   ├── requirements.txt
│   └── app/
│
├── frontend/
│   ├── .gitignore
│   ├── package.json
│   └── src/
│
├── docs/
│   ├── project-documentation.md
│   └── initial-project-documentation.md
│
└── screenshots/
```

Generated files, local databases, uploaded documents, vector stores, environment files, virtual environments, and dependency folders are excluded from version control where appropriate.

---

## 16. Limitations

* The quality of generated responses depends on the quality and content of the uploaded research documents.
* The system should not be used as a replacement for professional medical advice.
* Responses generated by an AI model may require verification against the original research material.
* The application is primarily designed for document-based medical research assistance.

---

## 17. Future Enhancements

Potential future improvements include:

* Support for additional document formats
* Advanced citation and reference management
* Improved document filtering and search
* More sophisticated research workflows
* Enhanced user and conversation management
* Additional LLM providers
* Advanced medical research analytics
* Improved observability and monitoring
* Scalable production vector database infrastructure

---

## 18. Conclusion

MedIntel demonstrates the implementation of a production-oriented AI application combining modern web development, backend APIs, authentication, document processing, vector search, embeddings, and Large Language Model capabilities.

The project provides an end-to-end workflow for transforming medical research documents into an interactive AI-assisted research experience.
