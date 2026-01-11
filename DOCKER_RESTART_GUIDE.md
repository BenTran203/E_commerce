# Docker Backend Restart Guide

## Quick Commands

```bash
# Stop and remove the backend container
docker-compose down backend

# Rebuild and restart the backend
docker-compose up -d --build backend

# View logs to confirm it's working
docker-compose logs -f backend
```

## Alternative: Full Reset (If needed)

```bash
# Stop all services
docker-compose down

# Rebuild and start all services
docker-compose up -d --build

# View backend logs
docker-compose logs -f backend
```

## Verify Resend Configuration

After restart, check the logs for:
```
✅ Email sent successfully to user@example.com via Resend
```

Or if API key is missing:
```
⚠️  RESEND_API_KEY not configured. Falling back to console logging.
```

## Test Email Sending

Register a new user to test:
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123456",
    "firstName": "Test",
    "lastName": "User"
  }'
```

