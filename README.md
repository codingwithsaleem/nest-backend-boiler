<h1 align="center">🚀 Todo Backend</h1>

A modern NestJS backend for a Todo project, featuring CRUD, pagination, and robust architecture.

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the project root and paste the following (edit values as needed):

```env
# Development
API_NAME=Todo Project API
API_URL=http://localhost:3001
AUTH_JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_PUBLIC_BUCKET_NAME=your_aws_public_bucket_name
AWS_REGION=eu-west-2
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
FRONTEND_RECOVER_URL=http://localhost:3000/auth/recover/confirm
FRONTEND_URL=http://localhost:3000
FRONTEND_URL_REDIRECTION_PROFILE=http://localhost:3000/account/matches
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_PRIMARY_CLIENT_SECRET=your_google_primary_client_secret
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_PRIMARY_CLIENT_SECRET=your_linkedin_primary_client_secret
LOGGER_ERROR_EMAILS=your_email@example.com
LOGGER_WARN_EMAILS=your_email@example.com
POSTMARK_ACCOUNT_API_KEY=your_postmark_account_api_key
POSTMARK_SERVER_API_KEY=your_postmark_server_api_key
SESSION_SECRET=your_session_secret
STORAGE_PUBLIC_URL=https://dnmirg01ifa6a.cloudfront.net

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
PORT=3001

# Database
DB_HOST=localhost
DB_NAME=todo_project_db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=root

# Email
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_SENDER=your_email_sender@example.com
EMAIL_ENABLED=true
```

### 3. Start Redis
Run Redis on the specified port (use Linux, WSL, or Docker):

```bash
docker run -p 6379:6379 redis
```

### 4. Update Database Credentials
Edit `.env` and set your local DB password and user if needed.

### 5. Run Migrations
```bash
npx mikro-orm migration:create
npx mikro-orm migration:up
```

### 6. Start the API
```bash
npm run start:dev
```

### 7. Test the API (Swagger UI)
Visit: [http://localhost:3001/API](http://localhost:3001/API)

---

## 📚 Features
- Full Todo CRUD (Create, Read, Update, Delete)
- Pagination & filtering
- Swagger API docs
- MikroORM + PostgreSQL
- Redis integration
- Modular, scalable codebase



