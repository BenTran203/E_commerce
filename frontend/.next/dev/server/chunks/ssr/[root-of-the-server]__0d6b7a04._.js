module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/e_com/E_commerce/frontend/src/store/slices/authSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearError",
    ()=>clearError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "loginFailure",
    ()=>loginFailure,
    "loginStart",
    ()=>loginStart,
    "loginSuccess",
    ()=>loginSuccess,
    "logout",
    ()=>logout,
    "setHydrated",
    ()=>setHydrated
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
// Initialize state from localStorage
const loadInitialState = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return {
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            isHydrated: false,
            error: null
        };
    }
    //TURBOPACK unreachable
    ;
};
const initialState = loadInitialState();
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state)=>{
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action)=>{
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isHydrated = true;
            state.error = null;
            // Sync to localStorage
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        },
        loginFailure: (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        logout: (state)=>{
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            // Clear localStorage
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        },
        clearError: (state)=>{
            state.error = null;
        },
        setHydrated: (state)=>{
            state.isHydrated = true;
        }
    }
});
const { loginStart, loginSuccess, loginFailure, logout, clearError, setHydrated } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
}),
"[project]/e_com/E_commerce/frontend/src/store/slices/cartSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToCart",
    ()=>addToCart,
    "clearCart",
    ()=>clearCart,
    "closeCart",
    ()=>closeCart,
    "default",
    ()=>__TURBOPACK__default__export__,
    "openCart",
    ()=>openCart,
    "removeFromCart",
    ()=>removeFromCart,
    "toggleCart",
    ()=>toggleCart,
    "updateQuantity",
    ()=>updateQuantity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    items: [],
    total: 0,
    itemCount: 0,
    isOpen: false
};
const cartSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action)=>{
            const { product, quantity, size, color } = action.payload;
            const existingItem = state.items.find((item)=>item.product.id === product.id && item.size === size && item.color === color);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    id: `${product.id}-${size}-${color}-${Date.now()}`,
                    product,
                    quantity,
                    size,
                    color
                });
            }
            // Recalculate totals
            state.itemCount = state.items.reduce((total, item)=>total + item.quantity, 0);
            state.total = state.items.reduce((total, item)=>total + item.product.price * item.quantity, 0);
        },
        removeFromCart: (state, action)=>{
            state.items = state.items.filter((item)=>item.id !== action.payload);
            state.itemCount = state.items.reduce((total, item)=>total + item.quantity, 0);
            state.total = state.items.reduce((total, item)=>total + item.product.price * item.quantity, 0);
        },
        updateQuantity: (state, action)=>{
            const item = state.items.find((item)=>item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
                if (item.quantity <= 0) {
                    state.items = state.items.filter((i)=>i.id !== action.payload.id);
                }
            }
            state.itemCount = state.items.reduce((total, item)=>total + item.quantity, 0);
            state.total = state.items.reduce((total, item)=>total + item.product.price * item.quantity, 0);
        },
        clearCart: (state)=>{
            state.items = [];
            state.total = 0;
            state.itemCount = 0;
        },
        toggleCart: (state)=>{
            state.isOpen = !state.isOpen;
        },
        openCart: (state)=>{
            state.isOpen = true;
        },
        closeCart: (state)=>{
            state.isOpen = false;
        }
    }
});
const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, openCart, closeCart } = cartSlice.actions;
const __TURBOPACK__default__export__ = cartSlice.reducer;
}),
"[project]/e_com/E_commerce/frontend/src/store/slices/productsSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearFilters",
    ()=>clearFilters,
    "default",
    ()=>__TURBOPACK__default__export__,
    "setCurrentPage",
    ()=>setCurrentPage,
    "setCurrentProduct",
    ()=>setCurrentProduct,
    "setError",
    ()=>setError,
    "setFeaturedProducts",
    ()=>setFeaturedProducts,
    "setFilters",
    ()=>setFilters,
    "setLoading",
    ()=>setLoading,
    "setProducts",
    ()=>setProducts,
    "setSearchQuery",
    ()=>setSearchQuery,
    "setSortBy",
    ()=>setSortBy,
    "setTotalPages",
    ()=>setTotalPages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    products: [],
    featuredProducts: [],
    currentProduct: null,
    filters: {
        categories: [],
        priceRange: [
            0,
            1000
        ],
        sizes: [],
        colors: [],
        brands: []
    },
    isLoading: false,
    error: null,
    searchQuery: "",
    sortBy: "newest",
    currentPage: 1,
    totalPages: 1
};
const productsSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action)=>{
            state.products = action.payload;
            state.isLoading = false;
        },
        setFeaturedProducts: (state, action)=>{
            state.featuredProducts = action.payload;
        },
        setCurrentProduct: (state, action)=>{
            state.currentProduct = action.payload;
        },
        setLoading: (state, action)=>{
            state.isLoading = action.payload;
        },
        setError: (state, action)=>{
            state.error = action.payload;
            state.isLoading = false;
        },
        setSearchQuery: (state, action)=>{
            state.searchQuery = action.payload;
            state.currentPage = 1;
        },
        setSortBy: (state, action)=>{
            state.sortBy = action.payload;
            state.currentPage = 1;
        },
        setFilters: (state, action)=>{
            state.filters = {
                ...state.filters,
                ...action.payload
            };
            state.currentPage = 1;
        },
        clearFilters: (state)=>{
            state.filters = initialState.filters;
            state.searchQuery = "";
            state.currentPage = 1;
        },
        setCurrentPage: (state, action)=>{
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action)=>{
            state.totalPages = action.payload;
        }
    }
});
const { setProducts, setFeaturedProducts, setCurrentProduct, setLoading, setError, setSearchQuery, setSortBy, setFilters, clearFilters, setCurrentPage, setTotalPages } = productsSlice.actions;
const __TURBOPACK__default__export__ = productsSlice.reducer;
}),
"[project]/e_com/E_commerce/frontend/src/store/slices/uiSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addNotification",
    ()=>addNotification,
    "clearAllNotifications",
    ()=>clearAllNotifications,
    "closeFilters",
    ()=>closeFilters,
    "closeMobileMenu",
    ()=>closeMobileMenu,
    "closeSearch",
    ()=>closeSearch,
    "default",
    ()=>__TURBOPACK__default__export__,
    "removeNotification",
    ()=>removeNotification,
    "setLoading",
    ()=>setLoading,
    "setTheme",
    ()=>setTheme,
    "toggleFilters",
    ()=>toggleFilters,
    "toggleMobileMenu",
    ()=>toggleMobileMenu,
    "toggleSearch",
    ()=>toggleSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    isMobileMenuOpen: false,
    isSearchOpen: false,
    isFiltersOpen: false,
    theme: "light",
    loading: {
        global: false,
        products: false,
        auth: false,
        checkout: false
    },
    notifications: []
};
const uiSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "ui",
    initialState,
    reducers: {
        toggleMobileMenu: (state)=>{
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        closeMobileMenu: (state)=>{
            state.isMobileMenuOpen = false;
        },
        toggleSearch: (state)=>{
            state.isSearchOpen = !state.isSearchOpen;
        },
        closeSearch: (state)=>{
            state.isSearchOpen = false;
        },
        toggleFilters: (state)=>{
            state.isFiltersOpen = !state.isFiltersOpen;
        },
        closeFilters: (state)=>{
            state.isFiltersOpen = false;
        },
        setTheme: (state, action)=>{
            state.theme = action.payload;
        },
        setLoading: (state, action)=>{
            state.loading[action.payload.key] = action.payload.value;
        },
        addNotification: (state, action)=>{
            const notification = {
                ...action.payload,
                id: Date.now().toString(),
                timestamp: Date.now()
            };
            state.notifications.push(notification);
        },
        removeNotification: (state, action)=>{
            state.notifications = state.notifications.filter((n)=>n.id !== action.payload);
        },
        clearAllNotifications: (state)=>{
            state.notifications = [];
        }
    }
});
const { toggleMobileMenu, closeMobileMenu, toggleSearch, closeSearch, toggleFilters, closeFilters, setTheme, setLoading, addNotification, removeNotification, clearAllNotifications } = uiSlice.actions;
const __TURBOPACK__default__export__ = uiSlice.reducer;
}),
"[project]/e_com/E_commerce/frontend/src/store/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "persistor",
    ()=>persistor,
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$redux$2d$persist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/redux-persist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__persistStore$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/redux-persist/es/persistStore.js [app-ssr] (ecmascript) <export default as persistStore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistReducer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__persistReducer$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/redux-persist/es/persistReducer.js [app-ssr] (ecmascript) <export default as persistReducer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$redux$2d$persist$2f$lib$2f$storage$2f$createWebStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/redux-persist/lib/storage/createWebStorage.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$redux$2f$dist$2f$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/redux/dist/redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/store/slices/authSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/store/slices/cartSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$productsSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/store/slices/productsSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$uiSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/store/slices/uiSlice.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
// Create a noop storage for SSR
const createNoopStorage = ()=>{
    return {
        getItem (_key) {
            return Promise.resolve(null);
        },
        setItem (_key, value) {
            return Promise.resolve(value);
        },
        removeItem (_key) {
            return Promise.resolve();
        }
    };
};
// Use localStorage on client, noop on server
const storage = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : createNoopStorage();
// Use noop storage on server, localStorage on client
const persistConfig = {
    key: "timeless-root",
    storage,
    whitelist: [
        "cart",
        "auth"
    ]
};
const rootReducer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$redux$2f$dist$2f$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["combineReducers"])({
    auth: __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    cart: __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    products: __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$productsSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    ui: __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$uiSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
const persistedReducer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistReducer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__persistReducer$3e$__["persistReducer"])(persistConfig, rootReducer);
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE"
                ]
            }
        }),
    devTools: ("TURBOPACK compile-time value", "development") !== "production"
});
const persistor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__persistStore$3e$__["persistStore"])(store);
}),
"[project]/e_com/E_commerce/frontend/src/utils/i18n/translation/en.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"nav\":{\"shop\":\"Shop\",\"collections\":\"Collections\",\"about\":\"About\",\"contact\":\"Contact\"},\"language\":{\"switch\":\"Switch Language\"},\"header\":{\"search\":{\"open\":\"Open search\",\"placeholder\":\"Search for products...\",\"submit\":\"Search\"},\"userMenu\":{\"open\":\"Open user menu\"},\"mobileMenu\":{\"toggle\":\"Toggle menu\"}},\"hero\":{\"title\":\"Timeless\",\"subtitle\":\"Elegance Redefined\",\"description\":\"Discover curated collections of premium clothing that transcend seasonal trends. Each piece is carefully selected to embody sophistication and lasting style.\",\"discover\":\"Discover More\",\"cta\":{\"explore\":\"Explore Collection\",\"story\":\"Our Story\"}},\"categories\":{\"title\":\"Shop by Category\",\"description\":\"Explore our carefully curated collections, each designed to complement your unique style and lifestyle.\",\"viewAll\":\"View All Products\",\"lookMore\":\"Look for more\",\"items\":\"items\",\"categories\":{\"casual-everyday\":{\"name\":\"Casual Everyday\",\"description\":\"Comfortable and stylish pieces for daily wear\"},\"formal-excellence\":{\"name\":\"Formal Excellence\",\"description\":\"Sophisticated formal wear for business and special occasions\"},\"premium-accessories\":{\"name\":\"Premium Accessories\",\"description\":\"Luxury accessories that elevate any outfit\"},\"winter-warmth\":{\"name\":\"Winter Warmth\",\"description\":\"Stay warm and stylish during the colder months\"},\"street-style-culture\":{\"name\":\"Street Style Culture\",\"description\":\"Urban-inspired fashion for the modern city dweller\"}}},\"featured\":{\"title\":\"Featured Collection\",\"description\":\"Handpicked pieces that embody our commitment to quality, style, and timeless appeal.\",\"quickView\":\"Quick View\",\"colors\":\"Colors\",\"viewAll\":\"View All Products\",\"reviews\":\"reviews\"},\"newsletter\":{\"title\":\"Stay Inspired\",\"description\":\"Join our community of style enthusiasts. Get exclusive access to new collections, styling tips, and special offers delivered directly to your inbox.\",\"benefits\":{\"earlyAccess\":{\"title\":\"Early Access\",\"description\":\"Be first to shop new arrivals and limited collections\"},\"exclusiveOffers\":{\"title\":\"Exclusive Offers\",\"description\":\"Receive subscriber-only discounts and special promotions\"},\"styleGuide\":{\"title\":\"Style Guide\",\"description\":\"Expert styling tips and seasonal trend insights\"}},\"placeholder\":\"Enter your email address\",\"subscribe\":\"Subscribe Now\",\"subscribing\":\"Subscribing...\",\"success\":{\"title\":\"Welcome to Timeless!\",\"message\":\"You've been successfully subscribed to our newsletter.\",\"another\":\"Subscribe another email\"},\"disclaimer\":\"By subscribing, you agree to receive marketing emails from Timeless. You can unsubscribe at any time. View our\",\"privacy\":\"Privacy Policy\"},\"shop\":{\"title\":\"Shop with us for the best quality\",\"description\":\"Giving you the best experience with our products\",\"search\":\"Search products...\",\"filters\":\"Filters\",\"showing\":\"Showing\",\"products\":\"products\",\"product\":\"product\",\"noProducts\":\"No products found\",\"noProductsDesc\":\"Try adjusting your filters or search query to find what you're looking for\",\"clearFilters\":\"Clear All Filters\",\"viewDetails\":\"View Details\",\"addToCart\":\"Add to Cart\",\"priceRange\":\"Price Range\",\"brands\":\"Brands\",\"colors\":\"Colors\",\"sizes\":\"Sizes\",\"applyInstantly\":\"✨ Filters apply instantly\",\"sortBy\":{\"newest\":\"Newest\",\"priceLow\":\"Price: Low to High\",\"priceHigh\":\"Price: High to Low\",\"name\":\"Name A-Z\"},\"pagination\":{\"previous\":\"Previous\",\"next\":\"Next\"}},\"collections\":{\"title\":\"Our Collections\",\"description\":\"Discover our carefully curated collections that blend timeless elegance with contemporary style. Each collection tells a unique story, crafted for the modern individual who appreciates quality and authenticity.\",\"featured\":{\"title\":\"Featured Collections\",\"description\":\"Our most popular and seasonally relevant collections, handpicked for their exceptional design and quality\",\"badge\":\"Featured\"},\"all\":{\"title\":\"All Collections\",\"description\":\"Explore our complete range of collections, each designed to cater to different styles and occasions\"},\"explore\":\"Explore\",\"exploreCollection\":\"Explore Collection\",\"items\":\"items\",\"popular\":\"Popular\",\"newsletter\":{\"title\":\"Stay Updated\",\"description\":\"Be the first to know about new collections, exclusive offers, and style inspiration. Join our community of fashion enthusiasts.\",\"placeholder\":\"Enter your email\",\"subscribe\":\"Subscribe\"}},\"about\":{\"hero\":{\"title\":\"Our Story\",\"description\":\"Born from a passion for timeless elegance and authentic craftsmanship, Timeless represents more than fashion—it's a celebration of heritage, quality, and the art of thoughtful design.\"},\"mission\":{\"title\":\"Crafting Timeless Elegance\",\"description1\":\"At Timeless, we believe that true style transcends seasonal trends. Our mission is to curate and create pieces that embody lasting elegance, superior quality, and authentic craftsmanship.\",\"description2\":\"Each item in our collection tells a story—of skilled artisans, premium materials, and a commitment to excellence that spans generations. We're not just selling clothing; we're preserving traditions and celebrating the art of fine fashion.\",\"cta\":\"Explore Our Collections\",\"badge\":{\"title\":\"Made with Love\",\"since\":\"Since 2025\"}},\"impact\":{\"title\":\"Our Impact\",\"description\":\"Numbers that reflect our commitment to excellence and the trust our customers place in us\",\"stats\":{\"customers\":\"Happy Customers\",\"products\":\"Products Sold\",\"countries\":\"Countries\",\"years\":\"Years of Excellence\"}},\"values\":{\"title\":\"Our Values\",\"description\":\"The principles that guide every decision we make and every product we create\",\"passion\":{\"title\":\"Passion for Quality\",\"description\":\"Every piece in our collection is carefully selected for its exceptional quality, craftsmanship, and attention to detail.\"},\"sustainable\":{\"title\":\"Sustainable Fashion\",\"description\":\"We believe in responsible fashion that respects both people and the planet, choosing eco-friendly materials and ethical practices.\"},\"customer\":{\"title\":\"Customer Focused\",\"description\":\"Our customers are at the heart of everything we do. We strive to exceed expectations and build lasting relationships.\"},\"global\":{\"title\":\"Global Community\",\"description\":\"Celebrating diversity and connecting fashion lovers worldwide through shared appreciation for timeless style.\"}},\"journey\":{\"title\":\"Our Journey\",\"description\":\"From humble beginnings to global recognition—the milestones that shaped our story\",\"timeline\":{\"2014\":{\"title\":\"The Beginning\",\"description\":\"Founded with a vision to make premium fashion accessible to everyone, starting from a small studio in Vietnam.\"},\"2016\":{\"title\":\"First Collection\",\"description\":\"Launched our signature Vietnamese Heritage collection, blending traditional craftsmanship with modern design.\"},\"2018\":{\"title\":\"International Expansion\",\"description\":\"Expanded to serve customers across Asia, bringing our unique aesthetic to a broader audience.\"},\"2020\":{\"title\":\"Digital Transformation\",\"description\":\"Embraced e-commerce and digital innovation, making our collections available worldwide.\"},\"2022\":{\"title\":\"Sustainable Initiative\",\"description\":\"Launched our sustainability program, partnering with eco-friendly suppliers and supporting local artisans.\"},\"2024\":{\"title\":\"Today\",\"description\":\"Continuing to evolve and innovate while staying true to our core values of quality, authenticity, and style.\"}}},\"team\":{\"title\":\"The Team Behind Timeless\",\"description\":\"Meet the passionate individuals who bring our vision to life every day\"}},\"contact\":{\"hero\":{\"title\":\"Get in Touch\",\"description\":\"We'd love to hear from you. Send us a message and we'll respond as soon as possible.\"},\"info\":{\"email\":{\"title\":\"Email Us\",\"description\":\"Send us an email and we'll respond within 24 hours\",\"value\":\"hello@timeless.com\"},\"phone\":{\"title\":\"Call Us\",\"description\":\"Mon-Fri from 8am to 6pm (GMT+7)\",\"value\":\"+84 123 456 789\"},\"visit\":{\"title\":\"Visit Us\",\"description\":\"Come visit our flagship store\",\"value\":\"Ho Chi Minh City, Vietnam\"}},\"form\":{\"title\":\"Send us a Message\",\"prefilled\":\"✨ We've pre-filled your information since you're logged in!\",\"name\":\"Name\",\"namePlaceholder\":\"Your full name\",\"email\":\"Email\",\"emailPlaceholder\":\"your@email.com\",\"phone\":\"Phone Number\",\"phonePlaceholder\":\"+84 123 456 789\",\"subject\":\"Subject\",\"subjectPlaceholder\":\"Select a subject\",\"subjects\":{\"general\":\"General Inquiry\",\"order\":\"Order Support\",\"product\":\"Product Question\",\"shipping\":\"Shipping Issue\",\"return\":\"Return Request\",\"partnership\":\"Partnership\",\"other\":\"Other\"},\"message\":\"Message\",\"messagePlaceholder\":\"Tell us how we can help you...\",\"terms\":\"I agree to the\",\"termsService\":\"Terms of Service\",\"and\":\"and\",\"privacyPolicy\":\"Privacy Policy\",\"send\":\"Send Message\",\"sending\":\"Sending...\",\"success\":{\"title\":\"Message Sent Successfully!\",\"description\":\"Thank you for contacting us. We'll get back to you within 24 hours.\",\"another\":\"Send Another Message\"}},\"faq\":{\"title\":\"Frequently Asked Questions\",\"questions\":{\"return\":{\"question\":\"What is your return policy?\",\"answer\":\"We offer a 30-day return policy for all unworn items with original tags. Items must be in original condition.\"},\"shipping\":{\"question\":\"How long does shipping take?\",\"answer\":\"Domestic shipping takes 2-3 business days. International shipping takes 5-10 business days depending on location.\"},\"international\":{\"question\":\"Do you offer international shipping?\",\"answer\":\"Yes, we ship worldwide. Shipping costs and delivery times vary by destination.\"},\"tracking\":{\"question\":\"How can I track my order?\",\"answer\":\"Once your order ships, you'll receive a tracking number via email. You can track your package on our website or the carrier's site.\"}},\"help\":{\"title\":\"Still have questions?\",\"description\":\"Can't find the answer you're looking for? Please chat with us.\",\"button\":\"Start Live Chat\"}}},\"footer\":{\"newsletter\":{\"title\":\"Stay in the Know\",\"description\":\"Subscribe to our newsletter for exclusive offers, style tips, and early access to new collections.\",\"placeholder\":\"Enter your email\",\"button\":\"Subscribe\"},\"brand\":{\"description\":\"Crafting timeless pieces that define modern elegance. Premium clothing for the discerning individual.\"},\"sections\":{\"shop\":{\"title\":\"Shop\",\"newArrivals\":\"New Arrivals\",\"bestSellers\":\"Best Sellers\",\"sale\":\"Sale\",\"giftCards\":\"Gift Cards\"},\"customerCare\":{\"title\":\"Customer Care\",\"contact\":\"Contact Us\",\"sizeGuide\":\"Size Guide\",\"shipping\":\"Shipping & Returns\",\"faq\":\"FAQ\"},\"company\":{\"title\":\"Company\",\"about\":\"About Us\",\"careers\":\"Careers\",\"press\":\"Press\",\"sustainability\":\"Sustainability\"},\"legal\":{\"title\":\"Legal\",\"privacy\":\"Privacy Policy\",\"terms\":\"Terms of Service\",\"cookies\":\"Cookie Policy\",\"accessibility\":\"Accessibility\"}},\"bottom\":{\"rights\":\"© {year} Timeless. All rights reserved.\",\"secure\":\"Secure Payments\",\"shipping\":\"Free Shipping Over $100\",\"returns\":\"30-Day Returns\"}},\"products\":{\"1\":{\"name\":\"Essential Cotton T-Shirt\",\"description\":\"Premium cotton t-shirt with minimalist design\"},\"2\":{\"name\":\"Insulated Puffer Jacket\",\"description\":\"Lightweight, water-resistant puffer jacket with premium insulation for cold-weather comfort.\"},\"3\":{\"name\":\"Modern Tailored Suit\",\"description\":\"Refined two-piece suit with a modern silhouette and breathable wool blend — perfect for formal occasions and office wear.\"},\"4\":{\"name\":\"Classic Heritage Watch\",\"description\":\"Precision quartz movement with a minimalist dial and stainless steel case — a timeless accessory.\"},\"5\":{\"name\":\"Linen Summer Shirt\",\"description\":\"Breathable linen shirt perfect for hot summer days. Lightweight and comfortable with a relaxed fit.\"},\"6\":{\"name\":\"Streetwear Cargo Pants\",\"description\":\"Modern cargo pants with multiple pockets and adjustable straps. Perfect for urban street style.\"},\"8\":{\"name\":\"Minimalist Leather Bag\",\"description\":\"Handcrafted leather messenger bag with clean lines and functional design.\"},\"9\":{\"name\":\"Business Casual Blazer\",\"description\":\"Versatile blazer that bridges the gap between formal and casual. Perfect for modern professionals.\"},\"10\":{\"name\":\"Winter Wool Scarf\",\"description\":\"Luxurious cashmere-wool blend scarf. Soft, warm, and stylish for cold weather.\"},\"11\":{\"name\":\"Formal White Shirt\",\"description\":\"Classic white shirt with French cuffs and spread collar. Essential for formal occasions.\"},\"12\":{\"name\":\"Denim Jacket Vintage\",\"description\":\"Classic denim jacket with vintage wash and modern fit. Perfect for layering and casual looks.\"},\"13\":{\"name\":\"Summer Floral Dress\",\"description\":\"Light and airy summer dress with delicate floral print. Perfect for warm weather occasions.\"},\"14\":{\"name\":\"Urban Sneakers\",\"description\":\"Modern urban sneakers with premium materials and comfortable sole. Perfect for street style.\"},\"15\":{\"name\":\"Silk Pocket Square\",\"description\":\"Premium silk pocket square with elegant pattern. Essential formal accessory.\"},\"16\":{\"name\":\"Bamboo Fiber Socks\",\"description\":\"Eco-friendly bamboo fiber socks. Antibacterial, moisture-wicking, and incredibly soft.\"},\"18\":{\"name\":\"Thermal Base Layer\",\"description\":\"High-performance thermal base layer for extreme cold weather. Moisture-wicking and insulating.\"},\"19\":{\"name\":\"High-waisted Jeans\",\"description\":\"Classic high-waisted jeans with stretch fabric for comfort and flattering fit.\"},\"20\":{\"name\":\"Tech-wear Crossbody Bag\",\"description\":\"Futuristic crossbody bag with multiple compartments and weather-resistant materials.\"}},\"productCollections\":{\"casual-everyday\":{\"name\":\"Casual Everyday\",\"description\":\"Comfortable and stylish pieces for daily wear. From basic tees to versatile jeans, everything you need for a relaxed yet put-together look.\"},\"formal-excellence\":{\"name\":\"Formal Excellence\",\"description\":\"Sophisticated formal wear for business meetings, special occasions, and professional events. Tailored to perfection.\"},\"premium-accessories\":{\"name\":\"Premium Accessories\",\"description\":\"Luxury accessories that elevate any outfit. From timepieces to leather goods, discover pieces that make a statement.\"},\"winter-warmth\":{\"name\":\"Winter Warmth\",\"description\":\"Stay warm and stylish during the colder months. Our winter collection features cozy layers and weather-resistant outerwear.\"},\"street-style-culture\":{\"name\":\"Street Style Culture\",\"description\":\"Urban-inspired fashion for the modern city dweller. Bold designs, functional details, and contemporary aesthetics.\"},\"summer-breeze\":{\"name\":\"Summer Breeze\",\"description\":\"Light, breathable pieces perfect for warm weather. From flowing dresses to linen shirts, embrace the sunshine in style.\"}},\"productCategories\":{\"casual\":\"Casual\",\"winter\":\"Winter\",\"formal\":\"Formal\",\"accessories\":\"Accessories\",\"summer\":\"Summer\",\"street-style\":\"Street Style\"},\"productBrands\":{\"timeless\":\"Timeless\",\"heritage\":\"Heritage\",\"aurum\":\"Aurum Tailoring\",\"aurum-time\":\"Aurum Timepieces\",\"coastal\":\"Coastal\",\"urban-edge\":\"Urban Edge\",\"craftsmen\":\"Craftsmen Co.\",\"professional\":\"Professional\",\"nordic\":\"Nordic\",\"executive\":\"Executive\",\"vintage-co\":\"Vintage Co.\",\"bloom\":\"Bloom\",\"metro\":\"Metro\",\"gentleman\":\"Gentleman\",\"ecowear\":\"EcoWear\",\"arctic-pro\":\"Arctic Pro\",\"denim-dreams\":\"Denim Dreams\",\"future-gear\":\"Future Gear\"},\"collectionPages\":{\"backToCollections\":\"Back to Collections\",\"products\":\"Products\",\"luxuryItems\":\"Luxury Items\",\"cozyEssentials\":\"Cozy Essentials\",\"urbanEssentials\":\"Urban Essentials\",\"trending\":\"Trending\",\"addToCart\":\"Add to Cart\",\"casualEveryday\":{\"name\":\"Casual Everyday\",\"description\":\"Comfortable and stylish pieces for daily wear. From basic tees to versatile jeans, everything you need for a relaxed yet put-together look.\",\"features\":{\"comfort\":{\"title\":\"Everyday Comfort\",\"description\":\"Designed for your daily routine with maximum comfort and style\"},\"versatile\":{\"title\":\"Versatile Style\",\"description\":\"Mix and match pieces that work for any casual occasion\"},\"quality\":{\"title\":\"Quality Materials\",\"description\":\"Premium fabrics that last through countless wears\"}}},\"formalExcellence\":{\"name\":\"Formal Excellence\",\"description\":\"Sophisticated formal wear for business meetings, special occasions, and professional events. Tailored to perfection.\",\"features\":{\"tailored\":{\"title\":\"Tailored Perfection\",\"description\":\"Precision-crafted formal wear for the most important occasions\"},\"fabrics\":{\"title\":\"Premium Fabrics\",\"description\":\"Finest materials selected for elegance and durability\"},\"design\":{\"title\":\"Timeless Design\",\"description\":\"Classic styles that never go out of fashion\"}},\"cta\":{\"title\":\"Need Custom Tailoring?\",\"description\":\"Our expert tailors can customize any piece to fit you perfectly. Schedule a consultation today.\",\"button\":\"Book Consultation\"}},\"premiumAccessories\":{\"name\":\"Premium Accessories\",\"description\":\"Luxury accessories that elevate any outfit. From timepieces to leather goods, discover pieces that make a statement.\",\"features\":{\"craftsmanship\":{\"title\":\"Luxury Craftsmanship\",\"description\":\"Each piece is meticulously crafted with attention to every detail\"},\"statement\":{\"title\":\"Statement Pieces\",\"description\":\"Accessories that elevate any outfit and make a lasting impression\"},\"investment\":{\"title\":\"Investment Quality\",\"description\":\"Timeless accessories designed to last and retain their value\"}},\"gift\":{\"title\":\"Luxury Gift Packaging\",\"description\":\"All premium accessories come with complimentary luxury gift packaging. Perfect for special occasions.\",\"button\":\"Learn More\"}},\"winterWarmth\":{\"name\":\"Winter Warmth\",\"description\":\"Stay warm and stylish during the colder months. Our winter collection features cozy layers and weather-resistant outerwear.\",\"features\":{\"protection\":{\"title\":\"Cold Weather Protection\",\"description\":\"Advanced insulation and weather-resistant materials keep you warm\"},\"warmth\":{\"title\":\"Premium Warmth\",\"description\":\"High-quality materials provide superior warmth without bulk\"},\"layering\":{\"title\":\"Stylish Layering\",\"description\":\"Versatile pieces that layer perfectly for any winter occasion\"}},\"care\":{\"title\":\"Winter Care Guide\",\"description\":\"Learn how to properly care for your winter essentials to ensure they last for seasons to come.\",\"button\":\"Download Guide\",\"storage\":{\"title\":\"Proper Storage\",\"description\":\"Clean and store in breathable bags\"},\"cleaning\":{\"title\":\"Cleaning Methods\",\"description\":\"Follow care labels for best results\"}}},\"streetStyleCulture\":{\"name\":\"Street Style Culture\",\"description\":\"Urban-inspired fashion for the modern city dweller. Bold designs, functional details, and contemporary aesthetics.\",\"features\":{\"urban\":{\"title\":\"Urban Edge\",\"description\":\"Bold designs that make a statement on city streets\"},\"trending\":{\"title\":\"Trend-Setting\",\"description\":\"Stay ahead with the latest urban fashion movements\"},\"functional\":{\"title\":\"Functional Design\",\"description\":\"Practical features that meet the demands of urban life\"}},\"styleGuide\":{\"title\":\"Street Style Guide\",\"description\":\"Master the art of urban fashion with our comprehensive styling tips and lookbook featuring the latest trends.\",\"button\":\"View Lookbook\",\"tips\":{\"layering\":{\"title\":\"Layering\",\"description\":\"Mix textures & proportions\"},\"color\":{\"title\":\"Color Play\",\"description\":\"Bold & monochrome\"},\"accessories\":{\"title\":\"Accessories\",\"description\":\"Statement pieces\"},\"footwear\":{\"title\":\"Footwear\",\"description\":\"Comfort meets style\"}}},\"community\":{\"title\":\"Join the Street Style Community\",\"description\":\"Share your looks and get inspired by urban fashion enthusiasts worldwide.\",\"share\":\"Share Your Style\",\"browse\":\"Browse Community\"}}},\"legalPages\":{\"lastUpdated\":\"Last Updated: {{date}}\",\"privacy\":{\"title\":\"Privacy Policy\",\"subtitle\":\"Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.\",\"intro\":{\"title\":\"Introduction\",\"p1\":\"Welcome to Timeless. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.\",\"p2\":\"This policy applies to information we collect when you use our website, mobile application, or interact with us through other channels. By using our services, you agree to the collection and use of information in accordance with this policy.\"},\"sections\":{\"collect\":{\"title\":\"Information We Collect\",\"personal\":\"We collect information you provide directly to us, including your name, email address, postal address, phone number, and payment information when you create an account, make a purchase, or contact us.\",\"automatic\":\"We automatically collect certain information about your device when you use our website, including IP address, browser type, operating system, referring URLs, and pages viewed.\",\"cookies\":\"We use cookies, web beacons, and similar technologies to collect information about your browsing activities and preferences. See our Cookie Policy for more details.\"},\"use\":{\"title\":\"How We Use Your Information\",\"orders\":\"We use your information to process and fulfill your orders, send order confirmations, and provide customer support.\",\"communication\":\"With your consent, we may send you promotional emails about new products, special offers, or other information we think you may find interesting.\",\"improvement\":\"We analyze usage data to improve our website, products, and services, and to understand how customers use our platform.\",\"legal\":\"We may use your information to comply with legal obligations, enforce our terms of service, and protect our rights and property.\"},\"security\":{\"title\":\"Data Security\",\"measures\":\"We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.\",\"payment\":\"All payment transactions are processed through secure payment gateways. We do not store complete credit card information on our servers.\",\"employee\":\"Access to personal information is restricted to employees, contractors, and agents who need to know that information to operate, develop, or improve our services.\"},\"rights\":{\"title\":\"Your Rights\",\"access\":\"You have the right to access, update, or correct your personal information at any time through your account settings or by contacting us.\",\"deletion\":\"You may request deletion of your personal information, subject to certain legal exceptions. We will respond to your request within 30 days.\",\"optout\":\"You can opt out of receiving promotional communications by clicking the unsubscribe link in our emails or updating your account preferences.\",\"portability\":\"You have the right to request a copy of your personal information in a structured, commonly used, and machine-readable format.\"}},\"thirdParty\":{\"title\":\"Third-Party Services\",\"description\":\"We may employ third-party companies and individuals to facilitate our service, provide service on our behalf, perform service-related services, or assist us in analyzing how our service is used. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.\",\"services\":\"Payment processors, shipping carriers, email service providers, analytics platforms, and customer support tools.\"},\"contact\":\"If you have any questions about this privacy policy or our privacy practices, please contact our Data Protection Officer.\"},\"terms\":{\"title\":\"Terms of Service\",\"subtitle\":\"Please read these terms carefully before using our services. By accessing or using our website, you agree to be bound by these terms.\",\"agreement\":{\"title\":\"Agreement to Terms\",\"p1\":\"These Terms of Service (\\\"Terms\\\") govern your access to and use of Timeless's website, mobile application, and services (collectively, the \\\"Services\\\"). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.\",\"p2\":\"If you do not agree to these Terms, you may not access or use our Services. We reserve the right to update these Terms at any time, and your continued use of the Services constitutes acceptance of any changes.\",\"important\":\"These Terms include an arbitration clause and class action waiver that affects your legal rights. Please review them carefully.\"},\"account\":{\"title\":\"Account Terms\",\"creation\":\"You must be at least 18 years old to use our services. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.\",\"responsibilities\":\"You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.\",\"termination\":\"We reserve the right to suspend or terminate your account if you violate these terms or engage in fraudulent, illegal, or harmful activities.\"},\"orders\":{\"title\":\"Orders and Products\",\"descriptions\":\"We strive to ensure that product descriptions, prices, and availability are accurate. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, or error-free.\",\"acceptance\":\"We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available for purchase, inaccuracies in product or pricing information, or problems identified by our fraud detection systems.\",\"pricing\":\"All prices are in USD and are subject to change without notice. We reserve the right to correct any pricing errors on our website or on pending orders.\"},\"contact\":\"If you have any questions about these Terms of Service, please contact our legal team.\"},\"cookies\":{\"title\":\"Cookie Policy\",\"subtitle\":\"Learn about how we use cookies and similar technologies to provide, protect, and improve our services.\",\"what\":{\"title\":\"What Are Cookies?\",\"p1\":\"Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.\",\"p2\":\"We use cookies and similar tracking technologies to track activity on our website and store certain information. These technologies help us understand how you interact with our services and allow us to improve your experience.\",\"control\":\"You can control and manage cookies in various ways. Please note that removing or blocking cookies may impact your user experience and parts of our website may no longer be fully accessible.\"},\"types\":{\"title\":\"Types of Cookies We Use\",\"essential\":{\"name\":\"Essential Cookies\",\"description\":\"These cookies are necessary for the website to function properly. They enable basic functions like page navigation, secure areas access, and shopping cart functionality. The website cannot function properly without these cookies.\",\"required\":\"Required\"},\"analytics\":{\"name\":\"Analytics Cookies\",\"description\":\"These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve our website and provide better user experiences.\"},\"marketing\":{\"name\":\"Marketing Cookies\",\"description\":\"These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for individual users, making them more valuable for publishers and third-party advertisers.\"},\"preference\":{\"name\":\"Preference Cookies\",\"description\":\"These cookies enable the website to remember information that changes the way the website behaves or looks, like your preferred language, region, or theme settings.\"}},\"manage\":{\"title\":\"Manage Your Cookie Preferences\",\"description\":\"Customize which cookies you want to allow. Essential cookies cannot be disabled as they are required for the website to function.\",\"acceptAll\":\"Accept All Cookies\",\"savePreferences\":\"Save Preferences\",\"rejectNonEssential\":\"Reject Non-Essential\"},\"contact\":\"If you have any questions about our use of cookies or other technologies, please contact us.\"},\"accessibility\":{\"title\":\"Accessibility Statement\",\"subtitle\":\"We're committed to making our website accessible and usable for all people, regardless of their abilities or disabilities.\",\"commitment\":{\"title\":\"Our Commitment\",\"p1\":\"At Timeless, we believe that everyone should have equal access to our products and services. We are committed to ensuring that our website is accessible to people with disabilities, including those who use assistive technologies.\",\"p2\":\"We continuously work to improve the accessibility of our website and services, and we regularly review and update our practices to ensure we meet or exceed applicable accessibility standards.\",\"feedback\":\"We welcome feedback on the accessibility of our website. If you encounter any barriers or have suggestions for improvement, please contact us.\"},\"features\":{\"title\":\"Accessibility Features\",\"keyboard\":{\"title\":\"Keyboard Navigation\",\"description\":\"Our website is fully navigable using only a keyboard. All interactive elements can be accessed using Tab, Enter, and Arrow keys.\"},\"screenReader\":{\"title\":\"Screen Reader Support\",\"description\":\"We ensure compatibility with popular screen readers like JAWS, NVDA, and VoiceOver by using semantic HTML and ARIA labels.\"},\"visual\":{\"title\":\"Visual Accessibility\",\"description\":\"Our design considers various visual needs with high contrast ratios, resizable text, and clear visual indicators.\"},\"audio\":{\"title\":\"Audio & Video\",\"description\":\"All multimedia content includes captions, transcripts, and audio descriptions where applicable.\"}},\"contact\":{\"title\":\"Feedback & Assistance\",\"description\":\"We welcome your feedback on the accessibility of our website. If you have difficulty accessing any content or feature, please let us know.\",\"email\":\"Email:\",\"phone\":\"Phone:\",\"response\":\"Response Time: We aim to respond within 2 business days\",\"reportIssue\":\"Report an Issue\",\"contactSupport\":\"Contact Support\"},\"standards\":{\"title\":\"Standards & Compliance\",\"description\":\"We are committed to conforming to the following accessibility standards:\",\"wcag\":\"We strive to meet Web Content Accessibility Guidelines 2.1 Level AA standards\",\"ada\":\"Our website aims to comply with the Americans with Disabilities Act\",\"section508\":\"We work to meet Section 508 standards for federal accessibility\",\"inProgress\":\"In Progress\"},\"assistiveTech\":{\"title\":\"Compatible Assistive Technologies\",\"description\":\"Our website is designed to work with the following assistive technologies:\",\"screenReaders\":\"Screen Readers\",\"browserExtensions\":\"Browser Extensions\",\"osFeatures\":\"Operating System Features\"},\"limitations\":{\"title\":\"Known Limitations\",\"description\":\"Despite our best efforts, some content on our website may not yet be fully accessible. We are actively working to address these issues:\",\"alternativeTitle\":\"Need an alternative format?\",\"alternativeText\":\"If you encounter content that is not accessible, please contact us. We will work with you to provide the information in an alternative format.\"},\"browserSettings\":{\"title\":\"Adjusting Your Browser Settings\",\"description\":\"Most browsers allow you to adjust settings to improve accessibility:\",\"textSize\":\"Text Size\",\"highContrast\":\"High Contrast\",\"readerMode\":\"Reader Mode\",\"zoom\":\"Zoom\"},\"testing\":{\"title\":\"Testing & Continuous Improvement\",\"description\":\"We regularly evaluate our website's accessibility through:\",\"automated\":\"Automated accessibility testing tools\",\"manual\":\"Manual testing with screen readers and keyboard navigation\",\"userFeedback\":\"User feedback from people with disabilities\",\"audits\":\"Regular accessibility audits by third-party experts\",\"training\":\"Ongoing training for our development and content teams\"}}}}"));}),
"[project]/e_com/E_commerce/frontend/src/utils/i18n/translation/vi.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"nav\":{\"shop\":\"Cửa Hàng\",\"collections\":\"Bộ Sưu Tập\",\"about\":\"Giới Thiệu\",\"contact\":\"Liên Hệ\"},\"language\":{\"switch\":\"Đổi Ngôn Ngữ\"},\"header\":{\"search\":{\"open\":\"Mở tìm kiếm\",\"placeholder\":\"Tìm kiếm sản phẩm...\",\"submit\":\"Tìm kiếm\"},\"userMenu\":{\"open\":\"Mở menu người dùng\"},\"mobileMenu\":{\"toggle\":\"Bật/tắt menu\"}},\"hero\":{\"title\":\"Timeless\",\"subtitle\":\"Định Nghĩa Lại Sự Thanh Lịch\",\"description\":\"Khám phá các bộ sưu tập thời trang cao cấp được tuyển chọn kỹ lưỡng, vượt qua xu hướng theo mùa. Mỗi sản phẩm được lựa chọn cẩn thận để thể hiện sự tinh tế và phong cách bền vững.\",\"discover\":\"Khám Phá Thêm\",\"cta\":{\"explore\":\"Khám Phá Bộ Sưu Tập\",\"story\":\"Câu Chuyện Của Chúng Tôi\"}},\"categories\":{\"title\":\"Mua Sắm Theo Danh Mục\",\"description\":\"Khám phá các bộ sưu tập được tuyển chọn cẩn thận, được thiết kế để bổ sung cho phong cách và lối sống độc đáo của bạn.\",\"viewAll\":\"Xem Tất Cả Sản Phẩm\",\"lookMore\":\"Xem thêm\",\"items\":\"sản phẩm\",\"categories\":{\"casual-everyday\":{\"name\":\"Hằng Ngày Thoải Mái\",\"description\":\"Những món đồ thoải mái và phong cách cho trang phục hàng ngày\"},\"formal-excellence\":{\"name\":\"Quý Phái\",\"description\":\"Trang phục trang trọng tinh tế cho công việc và dịp đặc biệt\"},\"premium-accessories\":{\"name\":\"Phụ Kiện Cao Cấp\",\"description\":\"Phụ kiện sang trọng nâng tầm mọi trang phục\"},\"winter-warmth\":{\"name\":\"Ấm Áp Mùa Đông\",\"description\":\"Giữ ấm và phong cách trong những tháng lạnh giá\"},\"street-style-culture\":{\"name\":\"Văn Hóa Phong Cách Đường Phố\",\"description\":\"Thời trang lấy cảm hứng từ đô thị cho người sống ở thành phố hiện đại\"}}},\"featured\":{\"title\":\"Bộ Sưu Tập Nổi Bật\",\"description\":\"Những sản phẩm được chọn lọc thể hiện cam kết của chúng tôi về chất lượng, phong cách và sự hấp dẫn vượt thời gian.\",\"quickView\":\"Xem Nhanh\",\"colors\":\"Màu Sắc\",\"viewAll\":\"Xem Tất Cả Sản Phẩm\",\"reviews\":\"đánh giá\"},\"newsletter\":{\"title\":\"Luôn Được Truyền Cảm Hứng\",\"description\":\"Tham gia cộng đồng những người đam mê phong cách của chúng tôi. Nhận quyền truy cập độc quyền vào các bộ sưu tập mới, mẹo tạo kiểu và ưu đãi đặc biệt được gửi trực tiếp đến hộp thư của bạn.\",\"benefits\":{\"earlyAccess\":{\"title\":\"Truy Cập Sớm\",\"description\":\"Trở thành người đầu tiên mua sắm hàng mới về và bộ sưu tập giới hạn\"},\"exclusiveOffers\":{\"title\":\"Ưu Đãi Độc Quyền\",\"description\":\"Nhận giảm giá và khuyến mãi đặc biệt chỉ dành cho người đăng ký\"},\"styleGuide\":{\"title\":\"Hướng Dẫn Phong Cách\",\"description\":\"Mẹo tạo kiểu từ chuyên gia và thông tin xu hướng theo mùa\"}},\"placeholder\":\"Nhập địa chỉ email của bạn\",\"subscribe\":\"Đăng Ký Ngay\",\"subscribing\":\"Đang đăng ký...\",\"success\":{\"title\":\"Chào Mừng Đến Với Timeless!\",\"message\":\"Bạn đã đăng ký nhận bản tin thành công.\",\"another\":\"Đăng ký email khác\"},\"disclaimer\":\"Bằng cách đăng ký, bạn đồng ý nhận email tiếp thị từ Timeless. Bạn có thể hủy đăng ký bất cứ lúc nào. Xem\",\"privacy\":\"Chính Sách Bảo Mật\"},\"shop\":{\"title\":\"Cùng khám phá bộ sưu tập\",\"description\":\"Cho bạn trải nghiệm tốt nhất với sản phẩm của chúng tôi\",\"search\":\"Tìm kiếm sản phẩm...\",\"filters\":\"Bộ Lọc\",\"showing\":\"Hiển thị\",\"products\":\"sản phẩm\",\"product\":\"sản phẩm\",\"noProducts\":\"Không tìm thấy sản phẩm nào\",\"noProductsDesc\":\"Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm để tìm những gì bạn đang tìm\",\"clearFilters\":\"Xóa Tất Cả Bộ Lọc\",\"viewDetails\":\"Xem Chi Tiết\",\"addToCart\":\"Thêm Vào Giỏ\",\"priceRange\":\"Khoảng Giá\",\"brands\":\"Thương Hiệu\",\"colors\":\"Màu Sắc\",\"sizes\":\"Kích Thước\",\"applyInstantly\":\"✨ Bộ lọc áp dụng ngay lập tức\",\"sortBy\":{\"newest\":\"Mới Nhất\",\"priceLow\":\"Giá: Thấp Đến Cao\",\"priceHigh\":\"Giá: Cao Đến Thấp\",\"name\":\"Tên A-Z\"},\"pagination\":{\"previous\":\"Trước\",\"next\":\"Tiếp\"}},\"collections\":{\"title\":\"Bộ Sưu Tập Của Chúng Tôi\",\"description\":\"Khám phá các bộ sưu tập được tuyển chọn cẩn thận, kết hợp sự thanh lịch vượt thời gian với phong cách đương đại. Mỗi bộ sưu tập kể một câu chuyện độc đáo, được tạo ra cho những cá nhân hiện đại đánh giá cao chất lượng và tính xác thực.\",\"featured\":{\"title\":\"Bộ Sưu Tập Nổi Bật\",\"description\":\"Các bộ sưu tập phổ biến nhất và phù hợp với mùa của chúng tôi, được chọn lọc vì thiết kế và chất lượng đặc biệt\",\"badge\":\"Nổi Bật\"},\"all\":{\"title\":\"Tất Cả Bộ Sưu Tập\",\"description\":\"Khám phá toàn bộ các bộ sưu tập của chúng tôi, mỗi bộ được thiết kế để phục vụ các phong cách và dịp khác nhau\"},\"explore\":\"Khám Phá\",\"exploreCollection\":\"Khám Phá Bộ Sưu Tập\",\"items\":\"sản phẩm\",\"popular\":\"Phổ Biến\",\"newsletter\":{\"title\":\"Cập Nhật Thông Tin\",\"description\":\"Trở thành người đầu tiên biết về bộ sưu tập mới, ưu đãi độc quyền và cảm hứng phong cách. Tham gia cộng đồng những người đam mê thời trang của chúng tôi.\",\"placeholder\":\"Nhập email của bạn\",\"subscribe\":\"Đăng Ký\"}},\"about\":{\"hero\":{\"title\":\"Câu Chuyện Của Chúng Tôi\",\"description\":\"Ra đời từ niềm đam mê về sự thanh lịch vượt thời gian và nghệ thuật thủ công chân thực, Timeless đại diện cho nhiều hơn cả thời trang—đó là sự tôn vinh di sản, chất lượng và nghệ thuật thiết kế chu đáo.\"},\"mission\":{\"title\":\"Tạo Nên Sự Thanh Lịch Vượt Thời Gian\",\"description1\":\"Tại Timeless, chúng tôi tin rằng phong cách thực sự vượt qua xu hướng theo mùa. Sứ mệnh của chúng tôi là tuyển chọn và tạo ra những sản phẩm thể hiện sự thanh lịch bền vững, chất lượng vượt trội và nghệ thuật thủ công chân thực.\",\"description2\":\"Mỗi món đồ trong bộ sưu tập của chúng tôi kể một câu chuyện—về những nghệ nhân tài ba, vật liệu cao cấp và cam kết về sự xuất sắc trải qua nhiều thế hệ. Chúng tôi không chỉ bán quần áo; chúng tôi đang bảo tồn truyền thống và tôn vinh nghệ thuật thời trang cao cấp.\",\"cta\":\"Khám Phá Bộ Sưu Tập\",\"badge\":{\"title\":\"Làm Bằng Cả Tấm Lòng\",\"since\":\"Từ Năm 2025\"}},\"impact\":{\"title\":\"Tác Động Của Chúng Tôi\",\"description\":\"Con số phản ánh cam kết của chúng tôi về sự xuất sắc và niềm tin mà khách hàng dành cho chúng tôi\",\"stats\":{\"customers\":\"Khách Hàng Hài Lòng\",\"products\":\"Sản Phẩm Đã Bán\",\"countries\":\"Quốc Gia\",\"years\":\"Năm Xuất Sắc\"}},\"values\":{\"title\":\"Giá Trị Của Chúng Tôi\",\"description\":\"Những nguyên tắc định hướng mọi quyết định chúng tôi đưa ra và mọi sản phẩm chúng tôi tạo ra\",\"passion\":{\"title\":\"Đam Mê Chất Lượng\",\"description\":\"Mỗi sản phẩm trong bộ sưu tập của chúng tôi được lựa chọn cẩn thận vì chất lượng đặc biệt, nghệ thuật và sự chú ý đến từng chi tiết.\"},\"sustainable\":{\"title\":\"Thời Trang Bền Vững\",\"description\":\"Chúng tôi tin vào thời trang có trách nhiệm, tôn trọng cả con người và hành tinh, lựa chọn vật liệu thân thiện với môi trường và thực hành đạo đức.\"},\"customer\":{\"title\":\"Tập Trung Vào Khách Hàng\",\"description\":\"Khách hàng là trung tâm của mọi việc chúng tôi làm. Chúng tôi nỗ lực vượt qua mong đợi và xây dựng mối quan hệ lâu dài.\"},\"global\":{\"title\":\"Cộng Đồng Toàn Cầu\",\"description\":\"Tôn vinh sự đa dạng và kết nối những người yêu thời trang trên toàn thế giới thông qua sự đánh giá chung về phong cách vượt thời gian.\"}},\"journey\":{\"title\":\"Hành Trình Của Chúng Tôi\",\"description\":\"Từ khởi đầu khiêm tốn đến được công nhận toàn cầu—những cột mốc hình thành câu chuyện của chúng tôi\",\"timeline\":{\"2014\":{\"title\":\"Khởi Đầu\",\"description\":\"Được thành lập với tầm nhìn làm cho thời trang cao cấp có thể tiếp cận được với mọi người, bắt đầu từ một studio nhỏ ở Việt Nam.\"},\"2016\":{\"title\":\"Bộ Sưu Tập Đầu Tiên\",\"description\":\"Ra mắt bộ sưu tập Di Sản Việt Nam đặc trưng, kết hợp nghệ thuật thủ công truyền thống với thiết kế hiện đại.\"},\"2018\":{\"title\":\"Mở Rộng Quốc Tế\",\"description\":\"Mở rộng phục vụ khách hàng trên khắp châu Á, mang thẩm mỹ độc đáo của chúng tôi đến với đông đảo khán giả.\"},\"2020\":{\"title\":\"Chuyển Đổi Số\",\"description\":\"Áp dụng thương mại điện tử và đổi mới số hóa, làm cho các bộ sưu tập của chúng tôi có sẵn trên toàn thế giới.\"},\"2022\":{\"title\":\"Sáng Kiến Bền Vững\",\"description\":\"Ra mắt chương trình phát triển bền vững, hợp tác với các nhà cung cấp thân thiện với môi trường và hỗ trợ nghệ nhân địa phương.\"},\"2024\":{\"title\":\"Ngày Nay\",\"description\":\"Tiếp tục phát triển và đổi mới trong khi vẫn trung thành với các giá trị cốt lõi của chúng tôi về chất lượng, tính xác thực và phong cách.\"}}},\"team\":{\"title\":\"Đội Ngũ Đằng Sau Timeless\",\"description\":\"Gặp gỡ những cá nhân đam mê mang tầm nhìn của chúng tôi vào cuộc sống mỗi ngày\"}},\"contact\":{\"hero\":{\"title\":\"Liên Hệ\",\"description\":\"Chúng tôi rất mong được nghe từ bạn. Gửi cho chúng tôi tin nhắn và chúng tôi sẽ phản hồi sớm nhất có thể.\"},\"info\":{\"email\":{\"title\":\"Email Cho Chúng Tôi\",\"description\":\"Gửi email cho chúng tôi và chúng tôi sẽ phản hồi trong vòng 24 giờ\",\"value\":\"hello@timeless.com\"},\"phone\":{\"title\":\"Gọi Cho Chúng Tôi\",\"description\":\"Thứ 2-6 từ 8 giờ sáng đến 6 giờ chiều (GMT+7)\",\"value\":\"+84 123 456 789\"},\"visit\":{\"title\":\"Ghé Thăm Chúng Tôi\",\"description\":\"Đến thăm cửa hàng hàng đầu của chúng tôi\",\"value\":\"Thành Phố Hồ Chí Minh, Việt Nam\"}},\"form\":{\"title\":\"Gửi Tin Nhắn Cho Chúng Tôi\",\"prefilled\":\"✨ Chúng tôi đã điền sẵn thông tin của bạn vì bạn đã đăng nhập!\",\"name\":\"Họ Tên\",\"namePlaceholder\":\"Họ và tên đầy đủ của bạn\",\"email\":\"Email\",\"emailPlaceholder\":\"email@cua-ban.com\",\"phone\":\"Số Điện Thoại\",\"phonePlaceholder\":\"+84 123 456 789\",\"subject\":\"Chủ Đề\",\"subjectPlaceholder\":\"Chọn một chủ đề\",\"subjects\":{\"general\":\"Thắc Mắc Chung\",\"order\":\"Hỗ Trợ Đơn Hàng\",\"product\":\"Câu Hỏi Về Sản Phẩm\",\"shipping\":\"Vấn Đề Vận Chuyển\",\"return\":\"Yêu Cầu Trả Hàng\",\"partnership\":\"Hợp Tác\",\"other\":\"Khác\"},\"message\":\"Tin Nhắn\",\"messagePlaceholder\":\"Cho chúng tôi biết chúng tôi có thể giúp bạn như thế nào...\",\"terms\":\"Tôi đồng ý với\",\"termsService\":\"Điều Khoản Dịch Vụ\",\"and\":\"và\",\"privacyPolicy\":\"Chính Sách Bảo Mật\",\"send\":\"Gửi Tin Nhắn\",\"sending\":\"Đang gửi...\",\"success\":{\"title\":\"Tin Nhắn Đã Được Gửi Thành Công!\",\"description\":\"Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ liên hệ lại với bạn trong vòng 24 giờ.\",\"another\":\"Gửi Tin Nhắn Khác\"}},\"faq\":{\"title\":\"Câu Hỏi Thường Gặp\",\"questions\":{\"return\":{\"question\":\"Chính sách trả hàng của bạn là gì?\",\"answer\":\"Chúng tôi cung cấp chính sách đổi trả trong 30 ngày cho tất cả các sản phẩm chưa mặc với nhãn gốc. Sản phẩm phải ở tình trạng ban đầu.\"},\"shipping\":{\"question\":\"Vận chuyển mất bao lâu?\",\"answer\":\"Vận chuyển nội địa mất 2-3 ngày làm việc. Vận chuyển quốc tế mất 5-10 ngày làm việc tùy thuộc vào địa điểm.\"},\"international\":{\"question\":\"Bạn có cung cấp vận chuyển quốc tế không?\",\"answer\":\"Có, chúng tôi giao hàng toàn cầu. Chi phí vận chuyển và thời gian giao hàng thay đổi theo địa điểm.\"},\"tracking\":{\"question\":\"Làm thế nào tôi có thể theo dõi đơn hàng của mình?\",\"answer\":\"Khi đơn hàng của bạn được gửi đi, bạn sẽ nhận được mã theo dõi qua email. Bạn có thể theo dõi gói hàng của mình trên trang web của chúng tôi hoặc trang web của người vận chuyển.\"}},\"help\":{\"title\":\"Vẫn Còn Câu Hỏi?\",\"description\":\"Không tìm thấy câu trả lời bạn đang tìm kiếm? Vui lòng trò chuyện với chúng tôi.\",\"button\":\"Bắt Đầu Trò Chuyện Trực Tiếp\"}}},\"footer\":{\"newsletter\":{\"title\":\"Cập Nhật Xu Hướng\",\"description\":\"Đăng ký nhận thông tin về ưu đãi độc quyền, bí quyết phong cách và các bộ sưu tập mới.\",\"placeholder\":\"Nhập email của bạn\",\"button\":\"Đăng Ký\"},\"brand\":{\"description\":\"Tạo nên những thiết kế vượt thời gian định hình nên sự thanh lịch hiện đại. Trang phục cao cấp cho những cá nhân tinh tế.\"},\"sections\":{\"shop\":{\"title\":\"Cửa Hàng\",\"newArrivals\":\"Hàng Mới Về\",\"bestSellers\":\"Bán Chạy Nhất\",\"sale\":\"Khuyến Mãi\",\"giftCards\":\"Thẻ Quà Tặng\"},\"customerCare\":{\"title\":\"Chăm Sóc Khách Hàng\",\"contact\":\"Liên Hệ\",\"sizeGuide\":\"Hướng Dẫn Chọn Size\",\"shipping\":\"Vận Chuyển & Đổi Trả\",\"faq\":\"Câu Hỏi Thường Gặp\"},\"company\":{\"title\":\"Công Ty\",\"about\":\"Về Chúng Tôi\",\"careers\":\"Tuyển Dụng\",\"press\":\"Báo Chí\",\"sustainability\":\"Phát Triển Bền Vững\"},\"legal\":{\"title\":\"Pháp Lý\",\"privacy\":\"Chính Sách Bảo Mật\",\"terms\":\"Điều Khoản Dịch Vụ\",\"cookies\":\"Chính Sách Cookie\",\"accessibility\":\"Khả Năng Tiếp Cận\"}},\"bottom\":{\"rights\":\"© {year} Timeless. Bảo lưu mọi quyền.\",\"secure\":\"Thanh Toán An Toàn\",\"shipping\":\"Miễn Phí Vận Chuyển Trên $100\",\"returns\":\"Đổi Trả Trong 30 Ngày\"}},\"products\":{\"1\":{\"name\":\"Áo Thun Cotton Cơ Bản\",\"description\":\"Áo thun cotton cao cấp với thiết kế tối giản\"},\"2\":{\"name\":\"Áo Khoác Phao Cách Nhiệt\",\"description\":\"Áo khoác phao nhẹ, chống nước với lớp cách nhiệt cao cấp cho sự ấm áp trong thời tiết lạnh.\"},\"3\":{\"name\":\"Bộ Vest May Đo Hiện Đại\",\"description\":\"Bộ vest hai mảnh tinh tế với phom dáng hiện đại và chất liệu len pha thoáng khí — hoàn hảo cho các dịp trang trọng và văn phòng.\"},\"4\":{\"name\":\"Đồng Hồ Di Sản Cổ Điển\",\"description\":\"Bộ máy thạch anh chính xác với mặt số tối giản và vỏ thép không gỉ — phụ kiện vượt thời gian.\"},\"5\":{\"name\":\"Áo Sơ Mi Lanh Mùa Hè\",\"description\":\"Áo sơ mi lanh thoáng khí hoàn hảo cho những ngày hè nóng nực. Nhẹ nhàng và thoải mái với form dáng rộng rãi.\"},\"6\":{\"name\":\"Quần Cargo Phong Cách Đường Phố\",\"description\":\"Quần cargo hiện đại với nhiều túi và dây điều chỉnh. Hoàn hảo cho phong cách đường phố đô thị.\"},\"8\":{\"name\":\"Túi Da Tối Giản\",\"description\":\"Túi đeo chéo bằng da thủ công với đường nét sạch sẽ và thiết kế chức năng.\"},\"9\":{\"name\":\"Áo Blazer Công Sở Thoải Mái\",\"description\":\"Áo blazer đa năng kết hợp giữa trang trọng và thoải mái. Hoàn hảo cho các chuyên gia hiện đại.\"},\"10\":{\"name\":\"Khăn Len Mùa Đông\",\"description\":\"Khăn len cashmere pha trộn sang trọng. Mềm mại, ấm áp và thời trang cho thời tiết lạnh.\"},\"11\":{\"name\":\"Áo Sơ Mi Trắng Trang Trọng\",\"description\":\"Áo sơ mi trắng cổ điển với mu măng sét Pháp và cổ áo rộng. Thiết yếu cho các dịp trang trọng.\"},\"12\":{\"name\":\"Áo Khoác Denim Cổ Điển\",\"description\":\"Áo khoác denim cổ điển với kiểu giặt vintage và form dáng hiện đại. Hoàn hảo để mặc nhiều lớp và phong cách thoải mái.\"},\"13\":{\"name\":\"Váy Hoa Mùa Hè\",\"description\":\"Váy mùa hè nhẹ nhàng và thoáng mát với họa tiết hoa tinh tế. Hoàn hảo cho các dịp thời tiết ấm áp.\"},\"14\":{\"name\":\"Giày Thể Thao Đô Thị\",\"description\":\"Giày thể thao đô thị hiện đại với vật liệu cao cấp và đế thoải mái. Hoàn hảo cho phong cách đường phố.\"},\"15\":{\"name\":\"Khăn Tay Lụa Túi Ngực\",\"description\":\"Khăn tay lụa cao cấp với họa tiết thanh lịch. Phụ kiện trang trọng thiết yếu.\"},\"16\":{\"name\":\"Tất Sợi Tre\",\"description\":\"Tất sợi tre thân thiện với môi trường. Kháng khuẩn, thấm hút ẩm và cực kỳ mềm mại.\"},\"18\":{\"name\":\"Lớp Lót Giữ Nhiệt\",\"description\":\"Lớp lót giữ nhiệt hiệu suất cao cho thời tiết cực lạnh. Thấm hút ẩm và cách nhiệt.\"},\"19\":{\"name\":\"Quần Jean Lưng Cao\",\"description\":\"Quần jean lưng cao cổ điển với vải co giãn cho sự thoải mái và form dáng đẹp.\"},\"20\":{\"name\":\"Túi Đeo Chéo Công Nghệ\",\"description\":\"Túi đeo chéo tương lai với nhiều ngăn và vật liệu chống thời tiết.\"}},\"productCollections\":{\"casual-everyday\":{\"name\":\"Hằng Ngày Thoải Mái\",\"description\":\"Những món đồ thoải mái và phong cách cho trang phục hàng ngày. Từ áo thun cơ bản đến quần jean đa năng, mọi thứ bạn cần cho vẻ ngoài thoải mái nhưng gọn gàng.\"},\"formal-excellence\":{\"name\":\"Quý Phái\",\"description\":\"Trang phục trang trọng tinh tế cho các cuộc họp công việc, dịp đặc biệt và sự kiện chuyên nghiệp. May đo hoàn hảo.\"},\"premium-accessories\":{\"name\":\"Phụ Kiện Cao Cấp\",\"description\":\"Phụ kiện sang trọng nâng tầm mọi trang phục. Từ đồng hồ đến đồ da, khám phá những món đồ tạo nên dấu ấn.\"},\"winter-warmth\":{\"name\":\"Ấm Áp Mùa Đông\",\"description\":\"Giữ ấm và phong cách trong những tháng lạnh giá. Bộ sưu tập mùa đông của chúng tôi có các lớp ấm áp và áo khoác chống thời tiết.\"},\"street-style-culture\":{\"name\":\"Văn Hóa Phong Cách Đường Phố\",\"description\":\"Thời trang lấy cảm hứng từ đô thị cho người sống ở thành phố hiện đại. Thiết kế táo bạo, chi tiết chức năng và thẩm mỹ đương đại.\"},\"summer-breeze\":{\"name\":\"Gió Hè Mát Mẻ\",\"description\":\"Những món đồ nhẹ nhàng, thoáng khí hoàn hảo cho thời tiết ấm áp. Từ váy bay bổng đến áo sơ mi lanh, đón ánh nắng với phong cách.\"}},\"productCategories\":{\"casual\":\"Thoải Mái\",\"winter\":\"Mùa Đông\",\"formal\":\"Trang Trọng\",\"accessories\":\"Phụ Kiện\",\"summer\":\"Mùa Hè\",\"street-style\":\"Phong Cách Đường Phố\"},\"productBrands\":{\"timeless\":\"Timeless\",\"heritage\":\"Heritage\",\"aurum\":\"Aurum Tailoring\",\"aurum-time\":\"Aurum Timepieces\",\"coastal\":\"Coastal\",\"urban-edge\":\"Urban Edge\",\"craftsmen\":\"Craftsmen Co.\",\"professional\":\"Professional\",\"nordic\":\"Nordic\",\"executive\":\"Executive\",\"vintage-co\":\"Vintage Co.\",\"bloom\":\"Bloom\",\"metro\":\"Metro\",\"gentleman\":\"Gentleman\",\"ecowear\":\"EcoWear\",\"arctic-pro\":\"Arctic Pro\",\"denim-dreams\":\"Denim Dreams\",\"future-gear\":\"Future Gear\"},\"collectionPages\":{\"backToCollections\":\"Quay Lại Bộ Sưu Tập\",\"products\":\"Sản Phẩm\",\"luxuryItems\":\"Món Đồ Sang Trọng\",\"cozyEssentials\":\"Món Đồ Ấm Áp Thiết Yếu\",\"urbanEssentials\":\"Món Đồ Đô Thị Thiết Yếu\",\"trending\":\"Xu Hướng\",\"addToCart\":\"Thêm Vào Giỏ\",\"casualEveryday\":{\"name\":\"Hằng Ngày Thoải Mái\",\"description\":\"Những món đồ thoải mái và phong cách cho trang phục hàng ngày. Từ áo thun cơ bản đến quần jean đa năng, mọi thứ bạn cần cho vẻ ngoài thoải mái nhưng gọn gàng.\",\"features\":{\"comfort\":{\"title\":\"Thoải Mái Hằng Ngày\",\"description\":\"Được thiết kế cho thói quen hàng ngày của bạn với sự thoải mái và phong cách tối đa\"},\"versatile\":{\"title\":\"Phong Cách Đa Năng\",\"description\":\"Kết hợp và phối đồ phù hợp cho mọi dịp thoải mái\"},\"quality\":{\"title\":\"Chất Liệu Chất Lượng\",\"description\":\"Vải cao cấp bền bỉ qua vô số lần mặc\"}}},\"formalExcellence\":{\"name\":\"Quý Phái\",\"description\":\"Trang phục trang trọng tinh tế cho các cuộc họp công việc, dịp đặc biệt và sự kiện chuyên nghiệp. May đo hoàn hảo.\",\"features\":{\"tailored\":{\"title\":\"May Đo Hoàn Hảo\",\"description\":\"Trang phục trang trọng được chế tác chính xác cho những dịp quan trọng nhất\"},\"fabrics\":{\"title\":\"Vải Cao Cấp\",\"description\":\"Vật liệu tốt nhất được lựa chọn cho sự thanh lịch và độ bền\"},\"design\":{\"title\":\"Thiết Kế Vượt Thời Gian\",\"description\":\"Phong cách cổ điển không bao giờ lỗi mốt\"}},\"cta\":{\"title\":\"Cần May Đo Tùy Chỉnh?\",\"description\":\"Thợ may chuyên nghiệp của chúng tôi có thể tùy chỉnh bất kỳ món đồ nào để vừa vặn hoàn hảo với bạn. Đặt lịch tư vấn hôm nay.\",\"button\":\"Đặt Lịch Tư Vấn\"}},\"premiumAccessories\":{\"name\":\"Phụ Kiện Cao Cấp\",\"description\":\"Phụ kiện sang trọng nâng tầm mọi trang phục. Từ đồng hồ đến đồ da, khám phá những món đồ tạo nên dấu ấn.\",\"features\":{\"craftsmanship\":{\"title\":\"Nghệ Thuật Thủ Công Sang Trọng\",\"description\":\"Mỗi món đồ được chế tác tỉ mỉ với sự chú ý đến từng chi tiết\"},\"statement\":{\"title\":\"Món Đồ Tạo Điểm Nhấn\",\"description\":\"Phụ kiện nâng tầm mọi trang phục và tạo ấn tượng lâu dài\"},\"investment\":{\"title\":\"Chất Lượng Đầu Tư\",\"description\":\"Phụ kiện vượt thời gian được thiết kế để bền bỉ và giữ giá trị\"}},\"gift\":{\"title\":\"Bao Bì Quà Tặng Sang Trọng\",\"description\":\"Tất cả phụ kiện cao cấp đều đi kèm với bao bì quà tặng sang trọng miễn phí. Hoàn hảo cho những dịp đặc biệt.\",\"button\":\"Tìm Hiểu Thêm\"}},\"winterWarmth\":{\"name\":\"Ấm Áp Mùa Đông\",\"description\":\"Giữ ấm và phong cách trong những tháng lạnh giá. Bộ sưu tập mùa đông của chúng tôi có các lớp ấm áp và áo khoác chống thời tiết.\",\"features\":{\"protection\":{\"title\":\"Bảo Vệ Thời Tiết Lạnh\",\"description\":\"Lớp cách nhiệt tiên tiến và vật liệu chống thời tiết giữ bạn ấm áp\"},\"warmth\":{\"title\":\"Ấm Áp Cao Cấp\",\"description\":\"Vật liệu chất lượng cao mang lại sự ấm áp vượt trội mà không cồng kềnh\"},\"layering\":{\"title\":\"Phối Lớp Thời Trang\",\"description\":\"Những món đồ đa năng phối lớp hoàn hảo cho mọi dịp mùa đông\"}},\"care\":{\"title\":\"Hướng Dẫn Chăm Sóc Mùa Đông\",\"description\":\"Tìm hiểu cách chăm sóc đúng cách các món đồ mùa đông thiết yếu để đảm bảo chúng bền bỉ qua nhiều mùa.\",\"button\":\"Tải Hướng Dẫn\",\"storage\":{\"title\":\"Bảo Quản Đúng Cách\",\"description\":\"Giặt sạch và cất trong túi thoáng khí\"},\"cleaning\":{\"title\":\"Phương Pháp Giặt\",\"description\":\"Tuân theo nhãn chăm sóc để có kết quả tốt nhất\"}}},\"streetStyleCulture\":{\"name\":\"Văn Hóa Phong Cách Đường Phố\",\"description\":\"Thời trang lấy cảm hứng từ đô thị cho người sống ở thành phố hiện đại. Thiết kế táo bạo, chi tiết chức năng và thẩm mỹ đương đại.\",\"features\":{\"urban\":{\"title\":\"Phong Cách Đô Thị\",\"description\":\"Thiết kế táo bạo tạo dấu ấn trên đường phố thành phố\"},\"trending\":{\"title\":\"Dẫn Đầu Xu Hướng\",\"description\":\"Luôn dẫn đầu với những phong trào thời trang đô thị mới nhất\"},\"functional\":{\"title\":\"Thiết Kế Chức Năng\",\"description\":\"Tính năng thực tiễn đáp ứng nhu cầu của cuộc sống đô thị\"}},\"styleGuide\":{\"title\":\"Hướng Dẫn Phong Cách Đường Phố\",\"description\":\"Làm chủ nghệ thuật thời trang đô thị với các mẹo tạo kiểu toàn diện và lookbook về những xu hướng mới nhất.\",\"button\":\"Xem Lookbook\",\"tips\":{\"layering\":{\"title\":\"Phối Lớp\",\"description\":\"Kết hợp chất liệu & tỷ lệ\"},\"color\":{\"title\":\"Chơi Màu\",\"description\":\"Táo bạo & đơn sắc\"},\"accessories\":{\"title\":\"Phụ Kiện\",\"description\":\"Món đồ tạo điểm nhấn\"},\"footwear\":{\"title\":\"Giày Dép\",\"description\":\"Thoải mái gặp phong cách\"}}},\"community\":{\"title\":\"Tham Gia Cộng Đồng Phong Cách Đường Phố\",\"description\":\"Chia sẻ phong cách của bạn và lấy cảm hứng từ những người đam mê thời trang đô thị trên toàn thế giới.\",\"share\":\"Chia Sẻ Phong Cách Của Bạn\",\"browse\":\"Duyệt Cộng Đồng\"}}},\"legalPages\":{\"lastUpdated\":\"Cập nhật lần cuối: {{date}}\",\"privacy\":{\"title\":\"Chính Sách Bảo Mật\",\"subtitle\":\"Quyền riêng tư của bạn rất quan trọng đối với chúng tôi. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.\",\"intro\":{\"title\":\"Giới Thiệu\",\"p1\":\"Chào mừng đến với Timeless. Chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ dữ liệu cá nhân của bạn. Chính sách bảo mật này sẽ thông báo cho bạn về cách chúng tôi chăm sóc dữ liệu cá nhân của bạn khi bạn truy cập trang web của chúng tôi và cho bạn biết về quyền riêng tư của bạn và cách pháp luật bảo vệ bạn.\",\"p2\":\"Chính sách này áp dụng cho thông tin chúng tôi thu thập khi bạn sử dụng trang web, ứng dụng di động của chúng tôi hoặc tương tác với chúng tôi thông qua các kênh khác. Bằng cách sử dụng dịch vụ của chúng tôi, bạn đồng ý với việc thu thập và sử dụng thông tin theo chính sách này.\"},\"sections\":{\"collect\":{\"title\":\"Thông Tin Chúng Tôi Thu Thập\",\"personal\":\"Chúng tôi thu thập thông tin bạn cung cấp trực tiếp cho chúng tôi, bao gồm tên, địa chỉ email, địa chỉ bưu điện, số điện thoại và thông tin thanh toán khi bạn tạo tài khoản, mua hàng hoặc liên hệ với chúng tôi.\",\"automatic\":\"Chúng tôi tự động thu thập một số thông tin nhất định về thiết bị của bạn khi bạn sử dụng trang web của chúng tôi, bao gồm địa chỉ IP, loại trình duyệt, hệ điều hành, URL giới thiệu và các trang đã xem.\",\"cookies\":\"Chúng tôi sử dụng cookie, web beacon và các công nghệ tương tự để thu thập thông tin về hoạt động duyệt web và sở thích của bạn. Xem Chính sách Cookie của chúng tôi để biết thêm chi tiết.\"},\"use\":{\"title\":\"Cách Chúng Tôi Sử Dụng Thông Tin\",\"orders\":\"Chúng tôi sử dụng thông tin của bạn để xử lý và hoàn thành đơn hàng, gửi xác nhận đơn hàng và cung cấp hỗ trợ khách hàng.\",\"communication\":\"Với sự đồng ý của bạn, chúng tôi có thể gửi email quảng cáo về sản phẩm mới, ưu đãi đặc biệt hoặc thông tin khác mà chúng tôi nghĩ bạn có thể quan tâm.\",\"improvement\":\"Chúng tôi phân tích dữ liệu sử dụng để cải thiện trang web, sản phẩm và dịch vụ của chúng tôi, đồng thời hiểu cách khách hàng sử dụng nền tảng của chúng tôi.\",\"legal\":\"Chúng tôi có thể sử dụng thông tin của bạn để tuân thủ các nghĩa vụ pháp lý, thực thi điều khoản dịch vụ và bảo vệ quyền và tài sản của chúng tôi.\"},\"security\":{\"title\":\"Bảo Mật Dữ Liệu\",\"measures\":\"Chúng tôi thực hiện các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin cá nhân của bạn khỏi bị truy cập, thay đổi, tiết lộ hoặc phá hủy trái phép.\",\"payment\":\"Tất cả các giao dịch thanh toán được xử lý thông qua các cổng thanh toán an toàn. Chúng tôi không lưu trữ thông tin thẻ tín dụng đầy đủ trên máy chủ của mình.\",\"employee\":\"Quyền truy cập vào thông tin cá nhân bị hạn chế đối với nhân viên, nhà thầu và đại lý cần biết thông tin đó để vận hành, phát triển hoặc cải thiện dịch vụ của chúng tôi.\"},\"rights\":{\"title\":\"Quyền Của Bạn\",\"access\":\"Bạn có quyền truy cập, cập nhật hoặc sửa thông tin cá nhân của mình bất kỳ lúc nào thông qua cài đặt tài khoản hoặc liên hệ với chúng tôi.\",\"deletion\":\"Bạn có thể yêu cầu xóa thông tin cá nhân của mình, tùy thuộc vào một số trường hợp ngoại lệ pháp lý. Chúng tôi sẽ trả lời yêu cầu của bạn trong vòng 30 ngày.\",\"optout\":\"Bạn có thể chọn không nhận thông tin quảng cáo bằng cách nhấp vào liên kết hủy đăng ký trong email của chúng tôi hoặc cập nhật tùy chọn tài khoản.\",\"portability\":\"Bạn có quyền yêu cầu một bản sao thông tin cá nhân của mình ở định dạng có cấu trúc, thông dụng và có thể đọc được bằng máy.\"}},\"thirdParty\":{\"title\":\"Dịch Vụ Bên Thứ Ba\",\"description\":\"Chúng tôi có thể sử dụng các công ty và cá nhân bên thứ ba để hỗ trợ dịch vụ của mình, cung cấp dịch vụ thay mặt chúng tôi, thực hiện các dịch vụ liên quan hoặc hỗ trợ chúng tôi phân tích cách dịch vụ được sử dụng. Các bên thứ ba này chỉ có quyền truy cập thông tin cá nhân của bạn để thực hiện các nhiệm vụ cụ thể thay mặt chúng tôi và có nghĩa vụ không tiết lộ hoặc sử dụng nó cho bất kỳ mục đích nào khác.\",\"services\":\"Bộ xử lý thanh toán, đơn vị vận chuyển, nhà cung cấp dịch vụ email, nền tảng phân tích và công cụ hỗ trợ khách hàng.\"},\"contact\":\"Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này hoặc thực tiễn bảo mật của chúng tôi, vui lòng liên hệ với Nhân viên Bảo vệ Dữ liệu của chúng tôi.\"},\"terms\":{\"title\":\"Điều Khoản Dịch Vụ\",\"subtitle\":\"Vui lòng đọc kỹ các điều khoản này trước khi sử dụng dịch vụ của chúng tôi. Bằng cách truy cập hoặc sử dụng trang web của chúng tôi, bạn đồng ý bị ràng buộc bởi các điều khoản này.\",\"agreement\":{\"title\":\"Thỏa Thuận Điều Khoản\",\"p1\":\"Các Điều khoản Dịch vụ này (\\\"Điều khoản\\\") điều chỉnh quyền truy cập và sử dụng trang web, ứng dụng di động và dịch vụ của Timeless (gọi chung là \\\"Dịch vụ\\\"). Bằng cách truy cập hoặc sử dụng Dịch vụ của chúng tôi, bạn đồng ý bị ràng buộc bởi các Điều khoản này và Chính sách Bảo mật của chúng tôi.\",\"p2\":\"Nếu bạn không đồng ý với các Điều khoản này, bạn không được truy cập hoặc sử dụng Dịch vụ của chúng tôi. Chúng tôi có quyền cập nhật các Điều khoản này bất kỳ lúc nào và việc bạn tiếp tục sử dụng Dịch vụ cấu thành sự chấp nhận bất kỳ thay đổi nào.\",\"important\":\"Các Điều khoản này bao gồm điều khoản trọng tài và từ bỏ quyền khởi kiện tập thể ảnh hưởng đến quyền lợi pháp lý của bạn. Vui lòng xem xét chúng cẩn thận.\"},\"account\":{\"title\":\"Điều Khoản Tài Khoản\",\"creation\":\"Bạn phải đủ 18 tuổi trở lên để sử dụng dịch vụ của chúng tôi. Bạn có trách nhiệm duy trì tính bảo mật của thông tin đăng nhập tài khoản và tất cả các hoạt động xảy ra trong tài khoản của bạn.\",\"responsibilities\":\"Bạn đồng ý cung cấp thông tin chính xác, hiện tại và đầy đủ trong quá trình đăng ký và cập nhật thông tin đó để giữ cho nó chính xác, hiện tại và đầy đủ.\",\"termination\":\"Chúng tôi có quyền tạm ngưng hoặc chấm dứt tài khoản của bạn nếu bạn vi phạm các điều khoản này hoặc tham gia vào các hoạt động gian lận, bất hợp pháp hoặc có hại.\"},\"orders\":{\"title\":\"Đơn Hàng và Sản Phẩm\",\"descriptions\":\"Chúng tôi cố gắng đảm bảo rằng mô tả sản phẩm, giá cả và tính khả dụng là chính xác. Tuy nhiên, chúng tôi không đảm bảo rằng mô tả sản phẩm hoặc nội dung khác là chính xác, đầy đủ, đáng tin cậy hoặc không có lỗi.\",\"acceptance\":\"Chúng tôi có quyền từ chối hoặc hủy bất kỳ đơn hàng nào vì bất kỳ lý do gì, bao gồm giới hạn về số lượng có sẵn để mua, sai sót trong thông tin sản phẩm hoặc giá cả, hoặc các vấn đề được xác định bởi hệ thống phát hiện gian lận của chúng tôi.\",\"pricing\":\"Tất cả giá được tính bằng USD và có thể thay đổi mà không cần thông báo. Chúng tôi có quyền sửa bất kỳ lỗi định giá nào trên trang web hoặc đơn hàng đang chờ xử lý.\"},\"contact\":\"Nếu bạn có bất kỳ câu hỏi nào về Điều khoản Dịch vụ này, vui lòng liên hệ với nhóm pháp lý của chúng tôi.\"},\"cookies\":{\"title\":\"Chính Sách Cookie\",\"subtitle\":\"Tìm hiểu về cách chúng tôi sử dụng cookie và các công nghệ tương tự để cung cấp, bảo vệ và cải thiện dịch vụ của chúng tôi.\",\"what\":{\"title\":\"Cookie Là Gì?\",\"p1\":\"Cookie là các tệp văn bản nhỏ được đặt trên thiết bị của bạn khi bạn truy cập một trang web. Chúng được sử dụng rộng rãi để làm cho các trang web hoạt động hiệu quả hơn và cung cấp thông tin cho chủ sở hữu trang web.\",\"p2\":\"Chúng tôi sử dụng cookie và các công nghệ theo dõi tương tự để theo dõi hoạt động trên trang web của chúng tôi và lưu trữ một số thông tin nhất định. Các công nghệ này giúp chúng tôi hiểu cách bạn tương tác với dịch vụ của chúng tôi và cho phép chúng tôi cải thiện trải nghiệm của bạn.\",\"control\":\"Bạn có thể kiểm soát và quản lý cookie theo nhiều cách khác nhau. Xin lưu ý rằng việc xóa hoặc chặn cookie có thể ảnh hưởng đến trải nghiệm người dùng của bạn và một số phần của trang web có thể không còn truy cập được đầy đủ.\"},\"types\":{\"title\":\"Các Loại Cookie Chúng Tôi Sử Dụng\",\"essential\":{\"name\":\"Cookie Thiết Yếu\",\"description\":\"Các cookie này là cần thiết để trang web hoạt động bình thường. Chúng cho phép các chức năng cơ bản như điều hướng trang, truy cập khu vực an toàn và chức năng giỏ hàng. Trang web không thể hoạt động bình thường nếu không có các cookie này.\",\"required\":\"Bắt Buộc\"},\"analytics\":{\"name\":\"Cookie Phân Tích\",\"description\":\"Các cookie này giúp chúng tôi hiểu cách khách truy cập tương tác với trang web của chúng tôi bằng cách thu thập và báo cáo thông tin một cách ẩn danh. Chúng giúp chúng tôi cải thiện trang web và cung cấp trải nghiệm người dùng tốt hơn.\"},\"marketing\":{\"name\":\"Cookie Tiếp Thị\",\"description\":\"Các cookie này được sử dụng để theo dõi khách truy cập trên các trang web. Mục đích là hiển thị quảng cáo phù hợp và hấp dẫn cho từng người dùng, làm cho chúng có giá trị hơn đối với nhà xuất bản và nhà quảng cáo bên thứ ba.\"},\"preference\":{\"name\":\"Cookie Tùy Chỉnh\",\"description\":\"Các cookie này cho phép trang web ghi nhớ thông tin thay đổi cách trang web hoạt động hoặc hiển thị, như ngôn ngữ ưa thích, khu vực hoặc cài đặt chủ đề của bạn.\"}},\"manage\":{\"title\":\"Quản Lý Tùy Chọn Cookie\",\"description\":\"Tùy chỉnh cookie bạn muốn cho phép. Cookie thiết yếu không thể bị vô hiệu hóa vì chúng là bắt buộc để trang web hoạt động.\",\"acceptAll\":\"Chấp Nhận Tất Cả Cookie\",\"savePreferences\":\"Lưu Tùy Chọn\",\"rejectNonEssential\":\"Từ Chối Cookie Không Thiết Yếu\"},\"contact\":\"Nếu bạn có bất kỳ câu hỏi nào về việc sử dụng cookie hoặc các công nghệ khác của chúng tôi, vui lòng liên hệ với chúng tôi.\"},\"accessibility\":{\"title\":\"Tuyên Bố Truy Cập\",\"subtitle\":\"Chúng tôi cam kết làm cho trang web của chúng tôi có thể truy cập và sử dụng được cho tất cả mọi người, bất kể khả năng hoặc khuyết tật của họ.\",\"commitment\":{\"title\":\"Cam Kết Của Chúng Tôi\",\"p1\":\"Tại Timeless, chúng tôi tin rằng mọi người đều nên có quyền truy cập bình đẳng vào sản phẩm và dịch vụ của chúng tôi. Chúng tôi cam kết đảm bảo rằng trang web của chúng tôi có thể truy cập được đối với người khuyết tật, bao gồm những người sử dụng công nghệ hỗ trợ.\",\"p2\":\"Chúng tôi liên tục làm việc để cải thiện khả năng truy cập của trang web và dịch vụ, đồng thời thường xuyên xem xét và cập nhật các phương pháp của mình để đảm bảo chúng tôi đáp ứng hoặc vượt quá các tiêu chuẩn truy cập áp dụng.\",\"feedback\":\"Chúng tôi hoan nghênh phản hồi về khả năng truy cập của trang web. Nếu bạn gặp bất kỳ rào cản nào hoặc có đề xuất cải thiện, vui lòng liên hệ với chúng tôi.\"},\"features\":{\"title\":\"Tính Năng Truy Cập\",\"keyboard\":{\"title\":\"Điều Hướng Bằng Bàn Phím\",\"description\":\"Trang web của chúng tôi có thể điều hướng hoàn toàn chỉ bằng bàn phím. Tất cả các yếu tố tương tác có thể được truy cập bằng các phím Tab, Enter và Mũi tên.\"},\"screenReader\":{\"title\":\"Hỗ Trợ Trình Đọc Màn Hình\",\"description\":\"Chúng tôi đảm bảo khả năng tương thích với các trình đọc màn hình phổ biến như JAWS, NVDA và VoiceOver bằng cách sử dụng HTML ngữ nghĩa và nhãn ARIA.\"},\"visual\":{\"title\":\"Truy Cập Hình Ảnh\",\"description\":\"Thiết kế của chúng tôi xem xét các nhu cầu hình ảnh khác nhau với tỷ lệ tương phản cao, văn bản có thể thay đổi kích thước và các chỉ báo hình ảnh rõ ràng.\"},\"audio\":{\"title\":\"Âm Thanh & Video\",\"description\":\"Tất cả nội dung đa phương tiện bao gồm phụ đề, bản ghi và mô tả âm thanh khi áp dụng.\"}},\"contact\":{\"title\":\"Phản Hồi & Hỗ Trợ\",\"description\":\"Chúng tôi hoan nghênh phản hồi của bạn về khả năng truy cập của trang web. Nếu bạn gặp khó khăn trong việc truy cập bất kỳ nội dung hoặc tính năng nào, vui lòng cho chúng tôi biết.\",\"email\":\"Email:\",\"phone\":\"Điện Thoại:\",\"response\":\"Thời Gian Phản Hồi: Chúng tôi sẽ phản hồi trong vòng 2 ngày làm việc\",\"reportIssue\":\"Báo Cáo Vấn Đề\",\"contactSupport\":\"Liên Hệ Hỗ Trợ\"},\"standards\":{\"title\":\"Tiêu Chuẩn & Tuân Thủ\",\"description\":\"Chúng tôi cam kết tuân thủ các tiêu chuẩn truy cập sau:\",\"wcag\":\"Chúng tôi cố gắng đáp ứng tiêu chuẩn Hướng dẫn Truy cập Nội dung Web 2.1 Cấp độ AA\",\"ada\":\"Trang web của chúng tôi nhằm mục đích tuân thủ Đạo luật Người Mỹ Khuyết tật\",\"section508\":\"Chúng tôi làm việc để đáp ứng tiêu chuẩn Mục 508 về khả năng truy cập liên bang\",\"inProgress\":\"Đang Tiến Hành\"},\"assistiveTech\":{\"title\":\"Công Nghệ Hỗ Trợ Tương Thích\",\"description\":\"Trang web của chúng tôi được thiết kế để hoạt động với các công nghệ hỗ trợ sau:\",\"screenReaders\":\"Trình Đọc Màn Hình\",\"browserExtensions\":\"Tiện Ích Mở Rộng Trình Duyệt\",\"osFeatures\":\"Tính Năng Hệ Điều Hành\"},\"limitations\":{\"title\":\"Hạn Chế Đã Biết\",\"description\":\"Mặc dù đã nỗ lực hết sức, một số nội dung trên trang web của chúng tôi có thể chưa hoàn toàn có thể truy cập được. Chúng tôi đang tích cực làm việc để giải quyết các vấn đề này:\",\"alternativeTitle\":\"Cần định dạng thay thế?\",\"alternativeText\":\"Nếu bạn gặp nội dung không thể truy cập, vui lòng liên hệ với chúng tôi. Chúng tôi sẽ làm việc với bạn để cung cấp thông tin ở định dạng thay thế.\"},\"browserSettings\":{\"title\":\"Điều Chỉnh Cài Đặt Trình Duyệt\",\"description\":\"Hầu hết các trình duyệt cho phép bạn điều chỉnh cài đặt để cải thiện khả năng truy cập:\",\"textSize\":\"Kích Thước Văn Bản\",\"highContrast\":\"Độ Tương Phản Cao\",\"readerMode\":\"Chế Độ Đọc\",\"zoom\":\"Thu Phóng\"},\"testing\":{\"title\":\"Kiểm Tra & Cải Tiến Liên Tục\",\"description\":\"Chúng tôi thường xuyên đánh giá khả năng truy cập của trang web thông qua:\",\"automated\":\"Công cụ kiểm tra khả năng truy cập tự động\",\"manual\":\"Kiểm tra thủ công với trình đọc màn hình và điều hướng bằng bàn phím\",\"userFeedback\":\"Phản hồi của người dùng từ người khuyết tật\",\"audits\":\"Kiểm toán khả năng truy cập thường xuyên bởi chuyên gia bên thứ ba\",\"training\":\"Đào tạo liên tục cho nhóm phát triển và nội dung của chúng tôi\"}}}}"));}),
"[project]/e_com/E_commerce/frontend/src/i18n/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/i18next/dist/esm/i18next.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$i18next$2d$browser$2d$languagedetector$2f$dist$2f$esm$2f$i18nextBrowserLanguageDetector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/i18next-browser-languagedetector/dist/esm/i18nextBrowserLanguageDetector.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$utils$2f$i18n$2f$translation$2f$en$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/utils/i18n/translation/en.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$utils$2f$i18n$2f$translation$2f$vi$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/utils/i18n/translation/vi.json (json)");
"use client";
;
;
;
;
;
const isProd = ("TURBOPACK compile-time value", "development") === "production";
// Initialize i18next once (client-side)
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/e_com/E_commerce/frontend/src/app/providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next-auth/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/store/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$redux$2d$persist$2f$es$2f$integration$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/redux-persist/es/integration/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$I18nextProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/react-i18next/dist/es/I18nextProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$i18n$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/i18n/client.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
// Create a client
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClient"]({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000
        }
    }
});
function Providers({ children }) {
    const [i18nReady, setI18nReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Ensure i18n is initialized
        if (__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$i18n$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInitialized) {
            setI18nReady(true);
        } else {
            // Wait for initialization
            __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$i18n$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].on('initialized', ()=>{
                setI18nReady(true);
            });
        }
    }, []);
    // Show nothing until i18n is ready to prevent flash of untranslated content
    if (!i18nReady) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SessionProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"], {
            store: __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"],
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$redux$2d$persist$2f$es$2f$integration$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PersistGate"], {
                loading: null,
                persistor: __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persistor"],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$I18nextProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["I18nextProvider"], {
                    i18n: __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$i18n$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
                        client: queryClient,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
                                position: "top-right",
                                toastOptions: {
                                    duration: 3000,
                                    style: {
                                        background: '#363636',
                                        color: '#fff'
                                    },
                                    success: {
                                        duration: 3000,
                                        iconTheme: {
                                            primary: '#10b981',
                                            secondary: '#fff'
                                        }
                                    },
                                    error: {
                                        duration: 4000,
                                        iconTheme: {
                                            primary: '#ef4444',
                                            secondary: '#fff'
                                        }
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/app/providers.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this),
                            children
                        ]
                    }, void 0, true, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/app/providers.tsx",
                        lineNumber: 49,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/e_com/E_commerce/frontend/src/app/providers.tsx",
                    lineNumber: 48,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/e_com/E_commerce/frontend/src/app/providers.tsx",
                lineNumber: 47,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/e_com/E_commerce/frontend/src/app/providers.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/e_com/E_commerce/frontend/src/app/providers.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
}),
"[project]/e_com/E_commerce/frontend/src/hooks/useCart.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/store/slices/cartSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
function useCart() {
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDispatch"])();
    const { items, total, itemCount, isOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])((state)=>state.cart);
    const addItem = (product, quantity = 1, size, color)=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addToCart"])({
            product,
            quantity,
            size,
            color
        }));
        __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success(`${product.name} added to cart`);
    };
    const removeItem = (itemId)=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeFromCart"])(itemId));
        __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success("Item removed from cart");
    };
    const updateItemQuantity = (itemId, quantity)=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateQuantity"])({
            id: itemId,
            quantity
        }));
    };
    const clearAllItems = ()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearCart"])());
        __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success("Cart cleared");
    };
    const toggle = ()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toggleCart"])());
    };
    const open = ()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["openCart"])());
    };
    const close = ()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["closeCart"])());
    };
    const getItemById = (itemId)=>{
        return items.find((item)=>item.id === itemId);
    };
    const isProductInCart = (productId, size, color)=>{
        return items.some((item)=>item.product.id === productId && item.size === size && item.color === color);
    };
    const getProductQuantity = (productId, size, color)=>{
        const item = items.find((item)=>item.product.id === productId && item.size === size && item.color === color);
        return item?.quantity || 0;
    };
    return {
        items,
        total,
        itemCount,
        isOpen,
        addItem,
        removeItem,
        updateItemQuantity,
        clearAllItems,
        toggle,
        open,
        close,
        getItemById,
        isProductInCart,
        getProductQuantity
    };
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/e_com/E_commerce/frontend/src/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * API Client
 * Centralized API communication with the backend
 */ __turbopack_context__.s([
    "authAPI",
    ()=>authAPI,
    "cartAPI",
    ()=>cartAPI,
    "contactAPI",
    ()=>contactAPI,
    "default",
    ()=>__TURBOPACK__default__export__,
    "ordersAPI",
    ()=>ordersAPI,
    "paymentsAPI",
    ()=>paymentsAPI,
    "productsAPI",
    ()=>productsAPI,
    "removeAuthToken",
    ()=>removeAuthToken,
    "reviewsAPI",
    ()=>reviewsAPI,
    "setAuthToken",
    ()=>setAuthToken,
    "userAPI",
    ()=>userAPI
]);
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001") + "/api";
// Helper function to get auth token from Redux persisted state
function getAuthToken() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function setAuthToken(token) {
    // This is kept for backward compatibility but Redux should handle persistence
    console.warn("setAuthToken is deprecated. Use Redux dispatch(loginSuccess) instead.");
}
function removeAuthToken() {
    // This is kept for backward compatibility but Redux should handle persistence
    console.warn("removeAuthToken is deprecated. Use Redux dispatch(logout) instead.");
}
// Base fetch function with auth headers
async function apiFetch(endpoint, options = {}) {
    const token = getAuthToken();
    const headers = {
        "Content-Type": "application/json",
        ...options.headers
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
    });
    if (!response.ok) {
        const error = await response.json().catch(()=>({
                message: "Network error"
            }));
        throw new Error(error.message || "API request failed");
    }
    return response.json();
}
const authAPI = {
    register: async (userData)=>{
        const response = await apiFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify(userData)
        });
        if (response.data.tokens.accessToken) {
            setAuthToken(response.data.tokens.accessToken);
        }
        return response.data;
    },
    login: async (credentials)=>{
        const response = await apiFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials)
        });
        if (response.data.tokens.accessToken) {
            setAuthToken(response.data.tokens.accessToken);
        }
        return response.data;
    },
    logout: async ()=>{
        await apiFetch("/auth/logout", {
            method: "POST"
        });
        removeAuthToken();
    },
    getCurrentUser: async ()=>{
        const response = await apiFetch("/auth/me");
        return response.data.user;
    },
    refreshToken: async (refreshToken)=>{
        const response = await apiFetch("/auth/refresh", {
            method: "POST",
            body: JSON.stringify({
                refreshToken
            })
        });
        if (response.data.accessToken) {
            setAuthToken(response.data.accessToken);
        }
        return response.data;
    },
    verifyEmail: async (token)=>{
        const response = await apiFetch("/auth/verify-email", {
            method: "POST",
            body: JSON.stringify({
                token
            })
        });
        return response;
    },
    resendVerification: async ()=>{
        const response = await apiFetch("/auth/resend-verification", {
            method: "POST"
        });
        return response;
    }
};
const productsAPI = {
    getAll: async (params)=>{
        const queryString = params ? `?${new URLSearchParams(params)}` : "";
        const response = await apiFetch(`/products${queryString}`);
        return response.data;
    },
    getById: async (id)=>{
        const response = await apiFetch(`/products/${id}`);
        return response.data.product;
    },
    getFeatured: async ()=>{
        const response = await apiFetch("/products/featured");
        return response.data.products;
    }
};
const cartAPI = {
    get: async ()=>{
        const response = await apiFetch("/cart");
        return response.data;
    },
    add: async (productId, quantity = 1, variantId)=>{
        const response = await apiFetch("/cart", {
            method: "POST",
            body: JSON.stringify({
                productId,
                quantity,
                variantId
            })
        });
        return response.data;
    },
    update: async (itemId, quantity)=>{
        const response = await apiFetch(`/cart/${itemId}`, {
            method: "PUT",
            body: JSON.stringify({
                quantity
            })
        });
        return response.data;
    },
    remove: async (itemId)=>{
        await apiFetch(`/cart/${itemId}`, {
            method: "DELETE"
        });
    },
    clear: async ()=>{
        await apiFetch("/cart", {
            method: "DELETE"
        });
    }
};
const ordersAPI = {
    create: async (orderData)=>{
        const response = await apiFetch("/orders", {
            method: "POST",
            body: JSON.stringify(orderData)
        });
        return response.data.order;
    },
    getAll: async (params)=>{
        const queryString = params ? `?${new URLSearchParams(params)}` : "";
        const response = await apiFetch(`/orders${queryString}`);
        return response.data;
    },
    getById: async (id)=>{
        const response = await apiFetch(`/orders/${id}`);
        return response.data.order;
    },
    cancel: async (id)=>{
        const response = await apiFetch(`/orders/${id}/cancel`, {
            method: "POST"
        });
        return response.data.order;
    }
};
const userAPI = {
    getProfile: async ()=>{
        const response = await apiFetch("/users/profile");
        return response.data.user;
    },
    updateProfile: async (userData)=>{
        const response = await apiFetch("/users/profile", {
            method: "PUT",
            body: JSON.stringify(userData)
        });
        return response.data.user;
    },
    changePassword: async (passwordData)=>{
        await apiFetch("/users/change-password", {
            method: "POST",
            body: JSON.stringify(passwordData)
        });
    },
    // Addresses
    getAddresses: async ()=>{
        const response = await apiFetch("/users/addresses");
        return response.data.addresses;
    },
    createAddress: async (addressData)=>{
        const response = await apiFetch("/users/addresses", {
            method: "POST",
            body: JSON.stringify(addressData)
        });
        return response.data.address;
    },
    updateAddress: async (id, addressData)=>{
        const response = await apiFetch(`/users/addresses/${id}`, {
            method: "PUT",
            body: JSON.stringify(addressData)
        });
        return response.data.address;
    },
    deleteAddress: async (id)=>{
        await apiFetch(`/users/addresses/${id}`, {
            method: "DELETE"
        });
    },
    // Wishlist
    getWishlist: async ()=>{
        const response = await apiFetch("/users/wishlist");
        return response.data.wishlistItems;
    },
    addToWishlist: async (productId)=>{
        const response = await apiFetch("/users/wishlist", {
            method: "POST",
            body: JSON.stringify({
                productId
            })
        });
        return response.data.wishlistItem;
    },
    removeFromWishlist: async (productId)=>{
        await apiFetch(`/users/wishlist/${productId}`, {
            method: "DELETE"
        });
    }
};
const reviewsAPI = {
    getProductReviews: async (productId, params)=>{
        const queryString = params ? `?${new URLSearchParams(params)}` : "";
        const response = await apiFetch(`/reviews/product/${productId}${queryString}`);
        return response.data;
    },
    create: async (reviewData)=>{
        const response = await apiFetch("/reviews", {
            method: "POST",
            body: JSON.stringify(reviewData)
        });
        return response.data.review;
    },
    update: async (id, reviewData)=>{
        const response = await apiFetch(`/reviews/${id}`, {
            method: "PUT",
            body: JSON.stringify(reviewData)
        });
        return response.data.review;
    },
    delete: async (id)=>{
        await apiFetch(`/reviews/${id}`, {
            method: "DELETE"
        });
    },
    voteHelpful: async (id)=>{
        const response = await apiFetch(`/reviews/${id}/helpful`, {
            method: "POST"
        });
        return response.data.review;
    }
};
const paymentsAPI = {
    createIntent: async (orderId)=>{
        const response = await apiFetch("/payments/create-intent", {
            method: "POST",
            body: JSON.stringify({
                orderId
            })
        });
        return response.data;
    },
    confirmPayment: async (paymentIntentId, orderId)=>{
        const response = await apiFetch("/payments/confirm", {
            method: "POST",
            body: JSON.stringify({
                paymentIntentId,
                orderId
            })
        });
        return response.data.payment;
    }
};
const contactAPI = {
    submit: async (contactData)=>{
        const response = await apiFetch("/contact", {
            method: "POST",
            body: JSON.stringify(contactData)
        });
        return response;
    }
};
const __TURBOPACK__default__export__ = {
    auth: authAPI,
    products: productsAPI,
    cart: cartAPI,
    orders: ordersAPI,
    user: userAPI,
    reviews: reviewsAPI,
    payments: paymentsAPI,
    contact: contactAPI
};
}),
"[project]/e_com/E_commerce/frontend/src/hooks/useAuth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/store/slices/authSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/lib/api.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function useAuth() {
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDispatch"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, token, isAuthenticated, isLoading, isHydrated, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])((state)=>state.auth);
    // Fetch current user on mount if authenticated
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchCurrentUser = async ()=>{
            if (token && !user && isHydrated) {
                try {
                    const currentUser = await __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAPI"].getCurrentUser();
                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginSuccess"])({
                        user: currentUser,
                        token
                    }));
                } catch (err) {
                    console.error("Failed to fetch current user:", err);
                    // If token is invalid, logout
                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logout"])());
                }
            }
        };
        fetchCurrentUser();
    }, [
        token,
        user,
        isHydrated,
        dispatch
    ]);
    const login = async (credentials)=>{
        try {
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginStart"])());
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAPI"].login(credentials);
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginSuccess"])({
                user: response.user,
                token: response.tokens.accessToken
            }));
            __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success("Welcome back!");
            router.push("/");
        } catch (err) {
            const errorMessage = err?.message || "Login failed";
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginFailure"])(errorMessage));
            __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(errorMessage);
        }
    };
    const register = async (userData)=>{
        try {
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginStart"])());
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAPI"].register(userData);
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginSuccess"])({
                user: response.user,
                token: response.tokens.accessToken
            }));
            __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success("Account created successfully!");
            router.push("/");
        } catch (err) {
            const errorMessage = err?.message || "Registration failed";
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginFailure"])(errorMessage));
            __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(errorMessage);
        }
    };
    const signOut = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAPI"].logout();
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logout"])());
            __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success("Signed out successfully");
            router.push("/");
        } catch (err) {
            console.error("Logout error:", err);
            // Force logout even if API call fails
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logout"])());
            router.push("/");
        }
    };
    const refreshUser = async ()=>{
        if (!token) return;
        try {
            const currentUser = await __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAPI"].getCurrentUser();
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginSuccess"])({
                user: currentUser,
                token
            }));
        } catch (err) {
            console.error("Failed to refresh user:", err);
        }
    };
    const clearAuthError = ()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearError"])());
    };
    return {
        user,
        token,
        isAuthenticated,
        isLoading,
        isHydrated,
        error,
        login,
        register,
        signOut,
        refreshUser,
        clearAuthError
    };
}
}),
"[project]/e_com/E_commerce/frontend/src/utils/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateDiscount",
    ()=>calculateDiscount,
    "cn",
    ()=>cn,
    "colorUtils",
    ()=>colorUtils,
    "debounce",
    ()=>debounce,
    "deepMerge",
    ()=>deepMerge,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDate",
    ()=>formatDate,
    "formatFileSize",
    ()=>formatFileSize,
    "generateId",
    ()=>generateId,
    "generateSlug",
    ()=>generateSlug,
    "getInitials",
    ()=>getInitials,
    "isMobile",
    ()=>isMobile,
    "isValidEmail",
    ()=>isValidEmail,
    "localStorage",
    ()=>localStorage,
    "parseSearchParams",
    ()=>parseSearchParams,
    "scrollToElement",
    ()=>scrollToElement,
    "truncateText",
    ()=>truncateText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatCurrency(amount, currency = "USD", locale = "en-US") {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency
    }).format(amount);
}
function formatDate(date, options = {
    year: "numeric",
    month: "long",
    day: "numeric"
}) {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", options);
}
function calculateDiscount(originalPrice, salePrice) {
    return Math.round((originalPrice - salePrice) / originalPrice * 100);
}
function generateSlug(text) {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
}
function debounce(func, delay) {
    let timeoutId;
    return (...args)=>{
        clearTimeout(timeoutId);
        timeoutId = setTimeout(()=>func(...args), delay);
    };
}
function getInitials(firstName, lastName) {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return firstInitial + lastInitial;
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function generateId(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for(let i = 0; i < length; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
function parseSearchParams(searchParams) {
    const params = {};
    Array.from(searchParams.entries()).forEach(([key, value])=>{
        if (params[key]) {
            if (Array.isArray(params[key])) {
                params[key].push(value);
            } else {
                params[key] = [
                    params[key],
                    value
                ];
            }
        } else {
            params[key] = value;
        }
    });
    return params;
}
function deepMerge(target, source) {
    const result = {
        ...target
    };
    for(const key in source){
        if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
            result[key] = deepMerge(result[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }
    return result;
}
function isMobile() {
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
}
function scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (element) {
        const top = element.offsetTop - offset;
        window.scrollTo({
            top,
            behavior: "smooth"
        });
    }
}
function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
const colorUtils = {
    hexToRgb (hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    rgbToHex (r, g, b) {
        return "#" + [
            r,
            g,
            b
        ].map((x)=>{
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    },
    isLightColor (hex) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return false;
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        return brightness > 128;
    }
};
const localStorage = {
    set (key, value) {
        try {
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        } catch (error) {
            console.warn("Failed to save to localStorage:", error);
        }
    },
    get (key, defaultValue) {
        try {
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        } catch (error) {
            console.warn("Failed to read from localStorage:", error);
        }
        return defaultValue || null;
    },
    remove (key) {
        try {
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        } catch (error) {
            console.warn("Failed to remove from localStorage:", error);
        }
    },
    clear () {
        try {
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        } catch (error) {
            console.warn("Failed to clear localStorage:", error);
        }
    }
};
}),
"[project]/e_com/E_commerce/frontend/src/components/ui/Button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/utils/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
;
;
;
const Button = ({ variant = "primary", size = "md", isLoading = false, disabled = false, fullWidth = false, children, onClick, type = "button", className, ...props })=>{
    const baseStyles = `
    inline-flex items-center justify-center font-medium transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
    border-0 rounded-none
  `;
    const variants = {
        primary: `
      bg-primary-900 text-white hover:bg-primary-800 
      focus:ring-primary-500 shadow-luxury hover:shadow-luxury-lg
    `,
        secondary: `
      border border-primary-900 text-primary-900 bg-transparent
      hover:bg-primary-900 hover:text-white focus:ring-primary-500
    `,
        ghost: `
      text-primary-700 bg-transparent hover:text-primary-900 hover:bg-primary-50
      focus:ring-primary-500
    `,
        danger: `
      bg-red-600 text-white hover:bg-red-700 
      focus:ring-red-500 shadow-luxury hover:shadow-luxury-lg
    `
    };
    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };
    const widthClass = fullWidth ? "w-full" : "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: type,
        onClick: onClick,
        disabled: disabled || isLoading,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(baseStyles, variants[variant], sizes[size], widthClass, className),
        ...props,
        children: [
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "mr-2 h-4 w-4 animate-spin"
            }, void 0, false, {
                fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/Button.tsx",
                lineNumber: 65,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/Button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Button;
}),
"[project]/e_com/E_commerce/frontend/src/components/ui/LanguageSwitcher.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LanguageSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const languages = [
    {
        code: "en",
        name: "English",
        flag: "🇺🇸"
    },
    {
        code: "vi",
        name: "Tiếng Việt",
        flag: "🇻🇳"
    }
];
function LanguageSwitcher() {
    const { i18n, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const currentLanguage = languages.find((lang)=>lang.code === i18n.language);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(!isOpen),
                className: "flex items-center gap-2 px-3 py-2 rounded-lg border border-primary-200 hover:border-primary-300 transition-colors bg-white",
                "aria-label": t("language.switch"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                        size: 16,
                        className: "text-primary-600"
                    }, void 0, false, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/LanguageSwitcher.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium text-primary-700",
                        children: [
                            currentLanguage?.flag,
                            " ",
                            currentLanguage?.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/LanguageSwitcher.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        size: 14,
                        className: `text-primary-400 transition-transform ${isOpen ? "rotate-180" : ""}`
                    }, void 0, false, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/LanguageSwitcher.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/LanguageSwitcher.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "fixed inset-0 z-40",
                            onClick: ()=>setIsOpen(false)
                        }, void 0, false, {
                            fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/LanguageSwitcher.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: -10,
                                scale: 0.95
                            },
                            animate: {
                                opacity: 1,
                                y: 0,
                                scale: 1
                            },
                            exit: {
                                opacity: 0,
                                y: -10,
                                scale: 0.95
                            },
                            transition: {
                                duration: 0.2
                            },
                            className: "absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-primary-100 overflow-hidden z-50",
                            children: languages.map((lang)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        i18n.changeLanguage(lang.code);
                                        setIsOpen(false);
                                    },
                                    className: `w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-primary-50 transition-colors ${i18n.language === lang.code ? "bg-primary-50 text-primary-900" : "text-primary-700"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-lg",
                                            children: lang.flag
                                        }, void 0, false, {
                                            fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/LanguageSwitcher.tsx",
                                            lineNumber: 68,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: lang.name
                                        }, void 0, false, {
                                            fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/LanguageSwitcher.tsx",
                                            lineNumber: 69,
                                            columnNumber: 19
                                        }, this),
                                        i18n.language === lang.code && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                scale: 0
                                            },
                                            animate: {
                                                scale: 1
                                            },
                                            className: "ml-auto w-2 h-2 bg-primary-600 rounded-full"
                                        }, void 0, false, {
                                            fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/LanguageSwitcher.tsx",
                                            lineNumber: 71,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, lang.code, true, {
                                    fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/LanguageSwitcher.tsx",
                                    lineNumber: 56,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/LanguageSwitcher.tsx",
                            lineNumber: 48,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/LanguageSwitcher.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/LanguageSwitcher.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-ssr] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/hooks/useCart.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/hooks/useAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
// import { cn } from '@/utils'
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/components/ui/Button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/components/ui/LanguageSwitcher.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
const Header = ()=>{
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSearchOpen, setIsSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { itemCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    const { user, isAuthenticated, signOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    const userMenuContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const navigationItems = [
        {
            name: t("nav.shop"),
            href: "/pages/shop"
        },
        {
            name: t("nav.collections"),
            href: "/pages/collections"
        },
        {
            name: t("nav.about"),
            href: "/pages/about"
        },
        {
            name: t("nav.contact"),
            href: "/pages/contact"
        }
    ];
    const handleSearch = (e)=>{
        e.preventDefault();
        // Handle search logic here
        setIsSearchOpen(false);
    };
    // Close overlays on ESC, and close user menu on outside-click.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onKeyDown = (e)=>{
            if (e.key !== "Escape") return;
            setIsSearchOpen(false);
            setIsUserMenuOpen(false);
        };
        const onPointerDown = (e)=>{
            if (!isUserMenuOpen) return;
            const el = userMenuContainerRef.current;
            if (!el) return;
            if (e.target instanceof Node && !el.contains(e.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("pointerdown", onPointerDown);
        return ()=>{
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("pointerdown", onPointerDown);
        };
    }, [
        isUserMenuOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 bg-luxury-cream border-b border-primary-200 backdrop-blur-luxury",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container-luxury",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between h-16 md:h-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "flex-shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-2xl md:text-3xl font-serif font-bold text-primary-900",
                                    children: "Timeless"
                                }, void 0, false, {
                                    fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "hidden md:flex items-center space-x-8",
                                children: navigationItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: "text-primary-700 hover:text-primary-900 font-medium transition-colors duration-200",
                                        children: item.name
                                    }, item.name, false, {
                                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                        lineNumber: 85,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setIsSearchOpen(true);
                                            setIsUserMenuOpen(false);
                                        },
                                        className: "p-2 text-primary-700 hover:text-primary-900 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                                        "aria-label": t("header.search.open"),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/pages/cart",
                                        className: "relative p-2 text-primary-700 hover:text-primary-900 transition-colors duration-200",
                                        "aria-label": "Shopping cart",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                lineNumber: 118,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            itemCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute -top-1 -right-1 bg-primary-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center",
                                                children: itemCount
                                            }, void 0, false, {
                                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                lineNumber: 120,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        ref: userMenuContainerRef,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setIsUserMenuOpen(!isUserMenuOpen),
                                                className: "p-2 text-primary-700 hover:text-primary-900 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                                                "aria-label": t("header.userMenu.open"),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                lineNumber: 128,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                children: isUserMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        y: 10
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        y: 0
                                                    },
                                                    exit: {
                                                        opacity: 0,
                                                        y: 10
                                                    },
                                                    className: "absolute right-0 mt-2 w-48 bg-white shadow-luxury-lg border border-primary-200 z-50",
                                                    children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "py-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "px-4 py-2 border-b border-primary-200",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-medium text-primary-900",
                                                                        children: [
                                                                            user?.firstName,
                                                                            " ",
                                                                            user?.lastName
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                                        lineNumber: 147,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-primary-600",
                                                                        children: user?.email
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                                        lineNumber: 150,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                                lineNumber: 146,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/account",
                                                                className: "flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50",
                                                                onClick: ()=>setIsUserMenuOpen(false),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                                        size: 16,
                                                                        className: "mr-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                                        lineNumber: 159,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    "Account"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                                lineNumber: 154,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            user?.role?.toLowerCase() === "admin" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/admin",
                                                                className: "flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 border-l-2 border-blue-600",
                                                                onClick: ()=>setIsUserMenuOpen(false),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium",
                                                                    children: "Admin Dashboard"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                                    lineNumber: 169,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                                lineNumber: 164,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            user?.role?.toLowerCase() !== "admin" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/orders",
                                                                className: "flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50",
                                                                onClick: ()=>setIsUserMenuOpen(false),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                                        size: 16,
                                                                        className: "mr-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                                        lineNumber: 179,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    "Orders"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                                lineNumber: 174,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>{
                                                                    signOut();
                                                                    setIsUserMenuOpen(false);
                                                                },
                                                                className: "flex items-center w-full px-4 py-2 text-sm text-primary-700 hover:bg-primary-50",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                                        size: 16,
                                                                        className: "mr-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                                        lineNumber: 190,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    "Sign Out"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                                lineNumber: 183,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "py-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/auth",
                                                                className: "block px-4 py-2 text-sm text-primary-700 hover:bg-primary-50",
                                                                onClick: ()=>setIsUserMenuOpen(false),
                                                                children: "Sign In"
                                                            }, void 0, false, {
                                                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                                lineNumber: 196,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/auth?register=true",
                                                                className: "block px-4 py-2 text-sm text-primary-700 hover:bg-primary-50",
                                                                onClick: ()=>setIsUserMenuOpen(false),
                                                                children: "Create Account"
                                                            }, void 0, false, {
                                                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                                lineNumber: 203,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                                lineNumber: 136,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsMenuOpen(!isMenuOpen),
                                        className: "md:hidden p-2 text-primary-700 hover:text-primary-900 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                                        "aria-label": t("header.mobileMenu.toggle"),
                                        children: isMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                            lineNumber: 223,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                            lineNumber: 223,
                                            columnNumber: 47
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                        lineNumber: 218,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].nav, {
                            initial: {
                                opacity: 0,
                                height: 0
                            },
                            animate: {
                                opacity: 1,
                                height: "auto"
                            },
                            exit: {
                                opacity: 0,
                                height: 0
                            },
                            className: "md:hidden border-t border-primary-200 py-4",
                            children: navigationItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: "block py-2 text-primary-700 hover:text-primary-900 font-medium",
                                    onClick: ()=>setIsMenuOpen(false),
                                    children: item.name
                                }, item.name, false, {
                                    fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                    lineNumber: 238,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                            lineNumber: 231,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isSearchOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20",
                    onClick: ()=>setIsSearchOpen(false),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: -20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            y: -20
                        },
                        className: "bg-white w-full max-w-2xl mx-4 p-6 shadow-luxury-lg",
                        onClick: (e)=>e.stopPropagation(),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSearch,
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: t("header.search.placeholder"),
                                    className: "flex-1 px-4 py-3 border-b-2 border-primary-200 focus:border-primary-500 outline-none text-lg",
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                    lineNumber: 270,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    type: "submit",
                                    variant: "ghost",
                                    className: "ml-4",
                                    children: t("header.search.submit")
                                }, void 0, false, {
                                    fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                                    lineNumber: 276,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                            lineNumber: 269,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                        lineNumber: 262,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                    lineNumber: 255,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
                lineNumber: 253,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Header.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Header;
}),
"[project]/e_com/E_commerce/frontend/src/utils/i18n/withTranslation.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTranslation",
    ()=>useTranslation,
    "withTranslation",
    ()=>withTranslation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
"use client";
;
;
function withTranslation(WrappedComponent) {
    return function TranslatedComponent(props) {
        const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WrappedComponent, {
            ...props,
            t: t
        }, void 0, false, {
            fileName: "[project]/e_com/E_commerce/frontend/src/utils/i18n/withTranslation.tsx",
            lineNumber: 15,
            columnNumber: 12
        }, this);
    };
}
function useTranslation() {
    const { t, i18n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    return {
        t,
        language: i18n.language
    };
}
}),
"[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/camera.js [app-ssr] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$utils$2f$i18n$2f$withTranslation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/utils/i18n/withTranslation.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const SOCIAL_LINKS = [
    {
        name: "Instagram",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"],
        href: "https://instagram.com"
    },
    {
        name: "X",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"],
        href: "https://x.com"
    },
    {
        name: "Facebook",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        href: "https://facebook.com"
    }
];
function buildFooterSections(t) {
    return [
        {
            title: t("footer.sections.shop.title"),
            links: [
                {
                    name: t("footer.sections.shop.newArrivals"),
                    href: "/pages/shop?filter=new-arrivals"
                },
                {
                    name: t("footer.sections.shop.bestSellers"),
                    href: "/pages/shop?filter=best-sellers"
                },
                {
                    name: t("footer.sections.shop.sale"),
                    href: "/pages/shop?filter=sale"
                },
                {
                    name: t("footer.sections.shop.giftCards"),
                    href: "/pages/shop"
                }
            ]
        },
        {
            title: t("footer.sections.customerCare.title"),
            links: [
                {
                    name: t("footer.sections.customerCare.contact"),
                    href: "/pages/contact"
                },
                {
                    name: t("footer.sections.customerCare.sizeGuide"),
                    href: "/pages/size-guide"
                },
                {
                    name: t("footer.sections.customerCare.shipping"),
                    href: "/pages/shipping-returns"
                },
                {
                    name: t("footer.sections.customerCare.faq"),
                    href: "/pages/faq"
                }
            ]
        },
        {
            title: t("footer.sections.company.title"),
            links: [
                {
                    name: t("footer.sections.company.about"),
                    href: "/pages/about"
                },
                {
                    name: t("footer.sections.company.careers"),
                    href: "/pages/contact"
                },
                {
                    name: t("footer.sections.company.press"),
                    href: "/pages/press"
                },
                {
                    name: t("footer.sections.company.sustainability"),
                    href: "/pages/sustainability"
                }
            ]
        },
        {
            title: t("footer.sections.legal.title"),
            links: [
                {
                    name: t("footer.sections.legal.privacy"),
                    href: "/pages/privacy"
                },
                {
                    name: t("footer.sections.legal.terms"),
                    href: "/pages/terms"
                },
                {
                    name: t("footer.sections.legal.cookies"),
                    href: "/pages/cookies"
                },
                {
                    name: t("footer.sections.legal.accessibility"),
                    href: "/pages/accessibility"
                }
            ]
        }
    ];
}
function BrandSection({ t, links }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "lg:col-span-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: "inline-block mb-6 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-3xl font-serif font-bold",
                    children: "Timeless"
                }, void 0, false, {
                    fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-primary-300 mb-6 leading-relaxed",
                children: t("footer.brand.description")
            }, void 0, false, {
                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex space-x-4",
                children: links.map((link)=>{
                    const Icon = link.icon;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: link.href,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "p-2 border border-primary-600 rounded-md hover:border-primary-400 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900",
                        "aria-label": link.name,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                            lineNumber: 122,
                            columnNumber: 15
                        }, this)
                    }, link.name, false, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                        lineNumber: 114,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
function LinksGrid({ sections }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-semibold mb-6 text-lg",
                        children: section.title
                    }, void 0, false, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-3",
                        children: section.links.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: link.href,
                                    className: "text-primary-300 hover:text-white transition-colors duration-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900",
                                    children: link.name
                                }, void 0, false, {
                                    fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                                    lineNumber: 140,
                                    columnNumber: 17
                                }, this)
                            }, `${section.title}-${link.href}`, false, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                                lineNumber: 139,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this)
                ]
            }, section.title, true, {
                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                lineNumber: 135,
                columnNumber: 9
            }, this))
    }, void 0, false);
}
function BottomBar({ t, year }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-t border-primary-700",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container-luxury py-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-primary-400 text-sm",
                        children: t("footer.bottom.rights", {
                            year
                        })
                    }, void 0, false, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-6 text-sm text-primary-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t("footer.bottom.secure")
                            }, void 0, false, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t("footer.bottom.shipping")
                            }, void 0, false, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                                lineNumber: 166,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                                lineNumber: 167,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t("footer.bottom.returns")
                            }, void 0, false, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                lineNumber: 159,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
            lineNumber: 158,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
const Footer = ({ t })=>{
    const currentYear = new Date().getFullYear();
    const sections = buildFooterSections(t);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-primary-900 text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container-luxury py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandSection, {
                            t: t,
                            links: SOCIAL_LINKS
                        }, void 0, false, {
                            fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LinksGrid, {
                            sections: sections
                        }, void 0, false, {
                            fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                            lineNumber: 185,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                    lineNumber: 183,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BottomBar, {
                t: t,
                year: currentYear
            }, void 0, false, {
                fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/e_com/E_commerce/frontend/src/components/sections/Footer.tsx",
        lineNumber: 181,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$utils$2f$i18n$2f$withTranslation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withTranslation"])(Footer);
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0d6b7a04._.js.map