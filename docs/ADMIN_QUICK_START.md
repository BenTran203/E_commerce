# ⚡ Admin Dashboard - Quick Start

## 🚀 Start in 5 Minutes

### 1️⃣ Start Services

```bash
# In project root
docker compose up -d

# Or manually
cd backend && npm run dev
```

### 2️⃣ Make Yourself Admin

**Option A - Prisma Studio:**
```bash
cd backend
npx prisma studio
```
- Open `users` table
- Find your email
- Change `role` to `ADMIN`

**Option B - SQL:**
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
```

### 3️⃣ Login & Access

1. Go to: `http://localhost:3000/auth`
2. Login with your credentials
3. Visit: `http://localhost:3000/admin`

---

## 📍 Admin URLs

| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | `/admin` | Overview & stats |
| Products | `/admin/products` | Manage products |
| Add Product | `/admin/products/new` | Create new product |
| Orders | `/admin/orders` | Track sales |
| Categories | `/admin/categories` | Manage collections |

---

## ➕ Adding Your First Product

1. **Create a Category First**
   - Go to `/admin/categories`
   - Click "Add Category"
   - Name it (e.g., "Winter Collection")

2. **Add Product**
   - Go to `/admin/products/new`
   - Fill in:
     - Name: "Cozy Knit Sweater"
     - Description: "Warm and stylish..."
     - SKU: "SW-001"
     - Price: 79.99
     - Category: Select "Winter Collection"
   
3. **Add Colors (Optional)**
   - Name: "Navy Blue"
   - Pick color
   - Stock: 50
   - Click "Add"

4. **Add Images**
   - Paste image URL
   - Click "Add Image"
   - Add 3-4 images

5. **Click "Create Product"** ✅

---

## 🎯 Key Features

### Products Management
- ✅ Add/Edit/Delete products
- ✅ Color variants with individual stock
- ✅ Multiple images
- ✅ Collection assignment
- ✅ Sale pricing
- ✅ Featured products

### Orders Management
- ✅ View all orders
- ✅ Update status (Pending → Delivered)
- ✅ Track revenue
- ✅ Search orders

### Categories
- ✅ Create collections
- ✅ Organize products
- ✅ Track product count

---

## 🔍 Common Tasks

### Make Product Featured
1. Edit product
2. Check "Featured product" ✓
3. Save

### Put Product On Sale
1. Edit product
2. Set Original Price: $99.99
3. Set Regular Price: $79.99
4. Check "On sale" ✓
5. Shows 20% off badge!

### Change Order Status
1. Go to Orders
2. Select new status from dropdown
3. Auto-saves

---

## ⚠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't access /admin | Make sure role = ADMIN in database |
| "Failed to fetch" | Start backend: `docker compose up -d` |
| Images not showing | Use full URLs (https://...) |
| No categories | Create categories first! |

---

## 🎨 Dashboard Structure

```
/admin
├── / ..................... Dashboard (Overview)
├── /products ............. Products List
│   └── /new .............. Add Product Form
├── /orders ............... Orders Management
└── /categories ........... Collections Management
```

---

## 🔐 Security Note

The dashboard checks:
1. ✅ User is logged in
2. ✅ User role is ADMIN
3. ✅ Valid auth token

Not admin? → Redirects to login

---

## 💡 Pro Tips

1. **Create categories before products** - Products need a collection
2. **Use clear SKUs** - Like "JK-BLK-M" for Black Jacket Medium
3. **Add multiple images** - First image is the main one
4. **Use descriptive names** - Helps customers find products
5. **Set stock levels** - Track inventory per color

---

## 📱 Responsive Design

The dashboard works on:
- 💻 Desktop
- 📱 Tablet
- 📞 Mobile

Sidebar collapses on mobile!

---

## 🎓 Next Steps

1. ✅ Access admin dashboard
2. ✅ Create 2-3 categories
3. ✅ Add 5-10 products
4. ✅ Test order management
5. ✅ Explore all features

Read `ADMIN_DASHBOARD_GUIDE.md` for detailed documentation!

---

**Ready to manage your store! 🎉**

