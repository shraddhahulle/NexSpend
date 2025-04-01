
# Finance App Backend

This is a simple Express.js backend for the Finance Tracking Application. It uses JSON files as a mock database.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

   Or for development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

### Transactions
- GET `/api/transactions` - Get all transactions
- POST `/api/transactions` - Create a new transaction
- PUT `/api/transactions/:id` - Update a transaction
- DELETE `/api/transactions/:id` - Delete a transaction

### Categories
- GET `/api/categories` - Get all categories
- POST `/api/categories` - Create a new category
- PUT `/api/categories/:id` - Update a category
- DELETE `/api/categories/:id` - Delete a category

### Products
- GET `/api/products` - Get all products
- POST `/api/products` - Create a new product
- PUT `/api/products/:id` - Update a product
- DELETE `/api/products/:id` - Delete a product

### Users
- POST `/api/register` - Register a new user
- POST `/api/login` - Login a user
- GET `/api/user/:id` - Get user details
- PUT `/api/user/:id` - Update user details

### Data Export
- GET `/api/export` - Export all data (transactions, categories, products)

## Database

The mock database is stored in JSON files in the `db` directory:
- `transactions.json`
- `categories.json`
- `products.json`
- `users.json`

## Notes

This is a simplified backend intended for development and testing. In a production environment, you would:
- Use a real database like MongoDB, PostgreSQL, etc.
- Implement proper authentication with JWT
- Hash passwords
- Add validation and error handling
- Add more comprehensive testing
