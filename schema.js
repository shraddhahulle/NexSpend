
/**
 * This file documents the schema for our JSON "database" files.
 * This is for documentation purposes only - not used in the actual code.
 */

// Transaction schema
const transactionSchema = {
  id: "string", // UUID
  title: "string", // Transaction name/title
  amount: "number", // Amount of the transaction
  date: "string", // ISO date string (YYYY-MM-DD)
  category: "string", // Category name
  type: "string", // "income" or "expense"
  // Optional fields
  productName: "string", // Name of the product/service associated with this transaction
  description: "string" // Additional description
};

// Category schema
const categorySchema = {
  id: "string", // UUID
  name: "string", // Category name
  type: "string", // "income" or "expense"
  color: "string", // Color code (hex)
  transactionCount: "number" // Number of transactions using this category
};

// Product schema
const productSchema = {
  id: "string", // UUID
  name: "string", // Product/service name
  description: "string", // Description
  transactions: "number", // Number of transactions using this product
  hasImage: "boolean", // Whether there's an image associated with this product
  imageType: "string" // "image" or "document" or null
};

// User schema
const userSchema = {
  id: "string", // UUID
  name: "string", // User's full name
  email: "string", // User's email (used for login)
  password: "string", // User's password (should be hashed in a real app)
  createdAt: "string" // ISO date string of when the account was created
};
