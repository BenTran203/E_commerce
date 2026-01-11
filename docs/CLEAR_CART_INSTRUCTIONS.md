# 🔧 Fix "Product 2 not found" Error

## Problem

Your cart has items with old product IDs (like "2") that don't exist in the database. The database uses UUID-style IDs like `cmi49lqor000so8b4s7l6awya`, not simple numbers.

## ✅ Solution: Clear Your Browser Cart

### Option 1: Clear Cart via Browser Console (Fastest)

1. **Open your browser DevTools**:
   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux)
   - Or `Cmd+Option+I` (Mac)

2. **Go to Console tab**

3. **Paste this command and press Enter**:
   ```javascript
   localStorage.removeItem('cart');
   location.reload();
   ```

This will clear your cart and reload the page.

### Option 2: Clear All localStorage

1. **Open DevTools** (`F12`)
2. **Go to Application tab** (or Storage in Firefox)
3. **Click "Local Storage"** in the left sidebar
4. **Select your domain** (e.g., `http://localhost:3000`)
5. **Right-click and select "Clear"**
6. **Refresh the page** (`F5`)

### Option 3: Clear Via Settings

Some browsers allow clearing site data:
- **Chrome**: Click lock icon → Site Settings → Clear Data
- **Firefox**: Click lock icon → Clear Cookies and Site Data

## 🛒 After Clearing

1. **Refresh the page** (`F5`)
2. **Browse products** at http://localhost:3000/pages/shop
3. **Add new products to cart** (these will have correct IDs)
4. **Try checkout again**

The error should be gone! ✅

## 🔍 Why This Happened

- Frontend cart stores product data in `localStorage`
- You added products before the database was seeded
- Those products had simple IDs (1, 2, 3) from the JSON file
- Database now has different IDs (UUIDs)
- Old cart items reference non-existent product IDs

## ⚠️ Note

This only affects your local development environment. In production, this wouldn't happen because:
1. Database would be seeded before launch
2. Products would have consistent IDs
3. Cart would sync with backend API

---

After clearing your cart, everything should work smoothly! 🎉

