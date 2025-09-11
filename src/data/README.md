# Database Setup Guide

This directory contains all the necessary files for setting up your PostgreSQL database for the Timeless E-commerce platform.

## Files Overview

- `products.json` - Complete product catalog with 20 items across 7 categories
- `postgres-migration.sql` - Database schema creation script
- `postgres-seed.sql` - Initial data insertion script
- `README.md` - This setup guide

## Database Schema

The database is designed to support a full-featured e-commerce platform with:

### Core Tables
- **products** - Product catalog with pricing, descriptions, inventory
- **categories** - Product categorization system
- **brands** - Brand management
- **vendors** - Multi-vendor support
- **collections** - Curated product collections

### User & Orders
- **users** - Customer accounts with profiles
- **orders** - Order management system
- **order_items** - Individual order line items
- **user_addresses** - Customer shipping/billing addresses

### Product Attributes
- **colors** - Color options for products
- **sizes** - Size variations
- **materials** - Material specifications
- **product_images** - Multiple images per product

### Relationships & Features
- **reviews** - Customer product reviews
- **wishlist_items** - Customer wishlists
- **newsletter_subscribers** - Email marketing
- **notifications** - In-app notifications

## Setup Instructions

### 1. Prerequisites
- PostgreSQL 13+ installed
- Database administration tool (pgAdmin, DBeaver, or psql)
- Appropriate database user with CREATE privileges

### 2. Create Database
```sql
CREATE DATABASE timeless_ecommerce;
```

### 3. Run Migration Script
```bash
psql -U your_username -d timeless_ecommerce -f postgres-migration.sql
```

### 4. Seed Initial Data
```bash
psql -U your_username -d timeless_ecommerce -f postgres-seed.sql
```

### 5. Verify Installation
```sql
-- Check table creation
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check sample data
SELECT COUNT(*) FROM categories;
SELECT COUNT(*) FROM brands;
SELECT COUNT(*) FROM colors;
```

## Environment Configuration

Add these environment variables to your `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/timeless_ecommerce"
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=timeless_ecommerce
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
```

## Production Considerations

### Performance Optimization
- Indexes are already created for common queries
- Consider adding more indexes based on your query patterns
- Use connection pooling (PgBouncer recommended)

### Security
- Use separate database users for different environments
- Enable SSL connections in production
- Regularly update PostgreSQL version
- Use strong passwords and rotate them regularly

### Backup Strategy
```bash
# Daily backup
pg_dump -U username -h localhost timeless_ecommerce > backup_$(date +%Y%m%d).sql

# Automated backup with cron
0 2 * * * pg_dump -U username timeless_ecommerce > /backups/daily_$(date +\%Y\%m\%d).sql
```

### Monitoring
- Enable slow query logging
- Monitor connection counts
- Set up alerts for disk space
- Track query performance

## Data Migration from JSON

The `products.json` file contains structured data that can be imported using:

### Option 1: Manual SQL Scripts
Create insertion scripts based on the JSON structure (example provided in seed file).

### Option 2: Programming Language
```javascript
// Node.js example
const products = require('./products.json');
// Process and insert using your preferred ORM or raw SQL
```

### Option 3: Database Tools
Use tools like pgAdmin's import wizard or custom ETL scripts.

## Scaling Considerations

### Read Replicas
Set up read replicas for heavy read workloads:
- Product browsing
- Search functionality
- Analytics queries

### Partitioning
Consider partitioning large tables:
- **orders** by date (monthly/yearly)
- **reviews** by product_id
- **notifications** by created_at

### Caching Strategy
- Product catalog caching (Redis)
- Session storage (Redis)
- Query result caching
- CDN for product images

## Development vs Production

### Development
- Use local PostgreSQL instance
- Enable verbose logging
- Use development-specific data

### Production
- Use managed database service (AWS RDS, GCP Cloud SQL)
- Enable automated backups
- Set up monitoring and alerting
- Use production-optimized configuration

## Troubleshooting

### Common Issues

1. **Connection refused**
   - Check PostgreSQL service status
   - Verify connection parameters
   - Check firewall settings

2. **Permission denied**
   - Ensure user has necessary privileges
   - Check database ownership
   - Verify authentication method

3. **Slow queries**
   - Check for missing indexes
   - Analyze query execution plans
   - Consider query optimization

### Useful Commands
```sql
-- Show database size
SELECT pg_size_pretty(pg_database_size('timeless_ecommerce'));

-- Show table sizes
SELECT schemaname,tablename,pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) 
FROM pg_tables WHERE schemaname = 'public' ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Show active connections
SELECT * FROM pg_stat_activity WHERE datname = 'timeless_ecommerce';

-- Show slow queries
SELECT query, mean_time, calls, total_time 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;
```

## Support

For questions or issues with database setup:
1. Check PostgreSQL logs
2. Review this documentation
3. Consult PostgreSQL official documentation
4. Consider database-specific support channels

## License

This database schema is designed for the Timeless E-commerce platform and can be adapted for similar use cases.