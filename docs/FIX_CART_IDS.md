# 🔧 Fix: Product ID Mismatch in Cart

## The Problem

Your cart contains **old product IDs from the JSON file** (like "1", "2", "3"), but the database now has **new CUID IDs** (like `cmi49lqor000so8b4s7l6awya`). When checkout tries to create an order, it can't find "Product 2" because that ID doesn't exist in the database.

## Quick Fix: Clear Cart and Re-add Products

### Option 1: Clear Cart in Browser (Recommended)

1. Open browser console (F12)
2. Go to **Application** tab → **Local Storage** → `http://localhost:3000`
3. Find and delete the `cart` or `persist:root` key
4. Refresh the page
5. Browse products and add them to cart again with the new IDs

### Option 2: Clear Cart via Redux

Add this temporary button to clear the cart programmatically.

1. Open browser console (F12)
2. Run this command:

```javascript
localStorage.clear()
location.reload()
```

### Option 3: Clear Cart from Database (if using server-side cart)

```bash
# Clear all cart items
docker-compose exec postgres psql -U postgres -d ecommerce_db -c "DELETE FROM cart_items;"
```

## Why This Happened

1. **Before seeding**: Products.json had IDs: "1", "2", "3"...
2. **After seeding**: Database generated new CUIDs: `cmi49lqor000so8b4s7l6awya`...
3. **Cart still has**: Old IDs from before seeding
4. **Checkout fails**: Can't find product with ID "2" in database

## Verify Products Have New IDs

```bash
docker-compose exec postgres psql -U postgres -d ecommerce_db -c "SELECT id, name, sku FROM products LIMIT 5;"
```

Output should show CUID IDs:
```
            id             |           name           |  sku   
---------------------------+--------------------------+--------
 cmi49lqnn000po8b4ib99u6yz | Essential Cotton T-Shirt | TS-001
 cmi49lqor000so8b4s7l6awya | Insulated Puffer Jacket  | PJ-002
```

## Testing After Fix

1. Clear cart (using option above)
2. Restart frontend: `npm run dev`
3. Go to shop page: http://localhost:3000/pages/shop
4. Add products to cart (they'll have the new database IDs)
5. Go to checkout
6. Should work now! ✅

## Prevent This in the Future

If you need to seed the database again, always clear the cart first:

```javascript
// In browser console before seeding
localStorage.clear()
```

---

**Status**: Cart needs to be cleared and repopulated with fresh product IDs from the database.

