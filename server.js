
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database file paths
const DB_DIR = path.join(__dirname, 'db');
const TRANSACTIONS_FILE = path.join(DB_DIR, 'transactions.json');
const CATEGORIES_FILE = path.join(DB_DIR, 'categories.json');
const PRODUCTS_FILE = path.join(DB_DIR, 'products.json');
const USERS_FILE = path.join(DB_DIR, 'users.json');

// Ensure DB directory exists
const ensureDbExists = async () => {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    
    // Initialize empty databases if they don't exist
    const files = [
      { path: TRANSACTIONS_FILE, defaultContent: '[]' },
      { path: CATEGORIES_FILE, defaultContent: '[]' },
      { path: PRODUCTS_FILE, defaultContent: '[]' },
      { path: USERS_FILE, defaultContent: '[]' }
    ];
    
    for (const file of files) {
      try {
        await fs.access(file.path);
      } catch (err) {
        // File doesn't exist, create it with default content
        await fs.writeFile(file.path, file.defaultContent);
      }
    }
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  }
};

// Helper functions to read/write data
const readDataFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
};

const writeDataFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err);
    return false;
  }
};

// Routes for Transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await readDataFile(TRANSACTIONS_FILE);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    const transactions = await readDataFile(TRANSACTIONS_FILE);
    const newTransaction = {
      id: uuidv4(),
      ...req.body,
      date: req.body.date || new Date().toISOString().split('T')[0]
    };
    
    transactions.unshift(newTransaction);
    await writeDataFile(TRANSACTIONS_FILE, transactions);
    
    // If there's a product name in the transaction, make sure it exists in the products list
    if (req.body.productName) {
      const products = await readDataFile(PRODUCTS_FILE);
      const existingProduct = products.find(p => p.name.toLowerCase() === req.body.productName.toLowerCase());
      
      if (!existingProduct) {
        // Create a new product
        const newProduct = {
          id: uuidv4(),
          name: req.body.productName,
          description: req.body.description || 'Added from transaction',
          transactions: 1,
          hasImage: false,
          imageType: null
        };
        products.unshift(newProduct);
        await writeDataFile(PRODUCTS_FILE, products);
      } else {
        // Update transaction count for existing product
        existingProduct.transactions += 1;
        await writeDataFile(PRODUCTS_FILE, products);
      }
    }
    
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

app.put('/api/transactions/:id', async (req, res) => {
  try {
    const transactions = await readDataFile(TRANSACTIONS_FILE);
    const index = transactions.findIndex(t => t.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    transactions[index] = { ...transactions[index], ...req.body };
    await writeDataFile(TRANSACTIONS_FILE, transactions);
    
    res.json(transactions[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update transaction' });
  }
});

app.delete('/api/transactions/:id', async (req, res) => {
  try {
    const transactions = await readDataFile(TRANSACTIONS_FILE);
    const filteredTransactions = transactions.filter(t => t.id !== req.params.id);
    
    if (filteredTransactions.length === transactions.length) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    await writeDataFile(TRANSACTIONS_FILE, filteredTransactions);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

// Routes for Categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await readDataFile(CATEGORIES_FILE);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const categories = await readDataFile(CATEGORIES_FILE);
    const newCategory = {
      id: uuidv4(),
      ...req.body,
      transactionCount: 0
    };
    
    categories.push(newCategory);
    await writeDataFile(CATEGORIES_FILE, categories);
    
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const categories = await readDataFile(CATEGORIES_FILE);
    const index = categories.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    categories[index] = { ...categories[index], ...req.body };
    await writeDataFile(CATEGORIES_FILE, categories);
    
    res.json(categories[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const categories = await readDataFile(CATEGORIES_FILE);
    const transactions = await readDataFile(TRANSACTIONS_FILE);
    
    // Check if category is in use
    const categoryInUse = transactions.some(t => t.category === categories.find(c => c.id === req.params.id)?.name);
    
    if (categoryInUse) {
      return res.status(400).json({ error: 'Cannot delete category that is in use by transactions' });
    }
    
    const filteredCategories = categories.filter(c => c.id !== req.params.id);
    
    if (filteredCategories.length === categories.length) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    await writeDataFile(CATEGORIES_FILE, filteredCategories);
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// Routes for Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await readDataFile(PRODUCTS_FILE);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const products = await readDataFile(PRODUCTS_FILE);
    const newProduct = {
      id: uuidv4(),
      ...req.body,
      transactions: 0
    };
    
    products.push(newProduct);
    await writeDataFile(PRODUCTS_FILE, products);
    
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const products = await readDataFile(PRODUCTS_FILE);
    const index = products.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    products[index] = { ...products[index], ...req.body };
    await writeDataFile(PRODUCTS_FILE, products);
    
    res.json(products[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const products = await readDataFile(PRODUCTS_FILE);
    const product = products.find(p => p.id === req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (product.transactions > 0) {
      return res.status(400).json({ 
        error: `Cannot delete product that is used in ${product.transactions} transaction(s)` 
      });
    }
    
    const filteredProducts = products.filter(p => p.id !== req.params.id);
    await writeDataFile(PRODUCTS_FILE, filteredProducts);
    
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// User Routes (Basic implementation)
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const users = await readDataFile(USERS_FILE);
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const newUser = {
      id: uuidv4(),
      email,
      password, // In a real app, you would hash this password
      name,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    await writeDataFile(USERS_FILE, users);
    
    // Don't send password back
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const users = await readDataFile(USERS_FILE);
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      user: userWithoutPassword,
      token: `mock-jwt-token-${user.id}` // In a real app, generate a proper JWT token
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

app.get('/api/user/:id', async (req, res) => {
  try {
    const users = await readDataFile(USERS_FILE);
    const user = users.find(u => u.id === req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Don't send password back
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.put('/api/user/:id', async (req, res) => {
  try {
    const users = await readDataFile(USERS_FILE);
    const index = users.findIndex(u => u.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Don't allow changing email to an existing one
    if (req.body.email && req.body.email !== users[index].email) {
      const emailExists = users.some(u => u.email === req.body.email && u.id !== req.params.id);
      if (emailExists) {
        return res.status(400).json({ error: 'Email already in use' });
      }
    }
    
    users[index] = { ...users[index], ...req.body };
    await writeDataFile(USERS_FILE, users);
    
    // Don't send password back
    const { password, ...userWithoutPassword } = users[index];
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Export data (for Excel download)
app.get('/api/export', async (req, res) => {
  try {
    const transactions = await readDataFile(TRANSACTIONS_FILE);
    const categories = await readDataFile(CATEGORIES_FILE);
    const products = await readDataFile(PRODUCTS_FILE);
    
    res.json({ transactions, categories, products });
  } catch (err) {
    res.status(500).json({ error: 'Failed to export data' });
  }
});

// Initialize server
(async () => {
  await ensureDbExists();
  
  // Create initial data if databases are empty
  const categories = await readDataFile(CATEGORIES_FILE);
  const products = await readDataFile(PRODUCTS_FILE);
  const transactions = await readDataFile(TRANSACTIONS_FILE);
  
  // Add initial categories if empty
  if (categories.length === 0) {
    const initialCategories = [
      {
        id: uuidv4(),
        name: "Income",
        type: "income",
        color: "#22c55e",
        transactionCount: 0
      },
      {
        id: uuidv4(),
        name: "Housing",
        type: "expense",
        color: "#ef4444",
        transactionCount: 0
      },
      {
        id: uuidv4(),
        name: "Food",
        type: "expense",
        color: "#f97316",
        transactionCount: 0
      },
      {
        id: uuidv4(),
        name: "Transport",
        type: "expense",
        color: "#3b82f6",
        transactionCount: 0
      },
      {
        id: uuidv4(),
        name: "Utilities",
        type: "expense",
        color: "#6366f1",
        transactionCount: 0
      },
      {
        id: uuidv4(),
        name: "Entertainment",
        type: "expense",
        color: "#ec4899",
        transactionCount: 0
      }
    ];
    await writeDataFile(CATEGORIES_FILE, initialCategories);
    console.log('Created initial categories');
  }
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
