(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/e_com/E_commerce/frontend/src/components/ui/Input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/utils/index.ts [app-client] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ label, placeholder, type = "text", value, defaultValue, onChange, error, disabled = false, required = false, className, ...props }, ref)=>{
    const handleChange = (e)=>{
        if (onChange) {
            onChange(e.target.value);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-medium text-primary-700 mb-2",
                children: [
                    label,
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500 ml-1",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/Input.tsx",
                        lineNumber: 33,
                        columnNumber: 26
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/Input.tsx",
                lineNumber: 31,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: ref,
                type: type,
                placeholder: placeholder,
                value: value,
                defaultValue: defaultValue,
                onChange: handleChange,
                disabled: disabled,
                required: required,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(`w-full px-4 py-3 border rounded-none transition-colors duration-200
             bg-white text-primary-900 placeholder-primary-400
             focus:outline-none focus:ring-2 focus:ring-offset-0
             disabled:bg-primary-50 disabled:cursor-not-allowed`, error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-primary-300 focus:border-primary-500 focus:ring-primary-500", className),
                ...props
            }, void 0, false, {
                fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/Input.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-red-600",
                children: error
            }, void 0, false, {
                fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/Input.tsx",
                lineNumber: 57,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/e_com/E_commerce/frontend/src/components/ui/Input.tsx",
        lineNumber: 29,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Input;
Input.displayName = "Input";
const __TURBOPACK__default__export__ = Input;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/e_com/E_commerce/frontend/src/components/checkout/CheckoutWrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckoutWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/@stripe/react-stripe-js/dist/react-stripe.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/@stripe/stripe-js/lib/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/@stripe/stripe-js/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
// Initialize Stripe
const stripePromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadStripe"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.STRIPE_PUBLISHABLE_KEY || "");
function CheckoutWrapper({ clientSecret, children }) {
    _s();
    const [stripe, setStripe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutWrapper.useEffect": ()=>{
            setStripe(stripePromise);
        }
    }["CheckoutWrapper.useEffect"], []);
    if (!clientSecret || !stripe) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-xl p-6 md:p-8 shadow-sm",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"
                }, void 0, false, {
                    fileName: "[project]/e_com/E_commerce/frontend/src/components/checkout/CheckoutWrapper.tsx",
                    lineNumber: 31,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/e_com/E_commerce/frontend/src/components/checkout/CheckoutWrapper.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/e_com/E_commerce/frontend/src/components/checkout/CheckoutWrapper.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Elements"], {
        stripe: stripe,
        options: {
            clientSecret,
            appearance: {
                theme: "stripe",
                variables: {
                    colorPrimary: "#2c3e50",
                    colorBackground: "#ffffff",
                    colorText: "#2c3e50",
                    colorDanger: "#ef4444",
                    fontFamily: "system-ui, sans-serif",
                    borderRadius: "8px"
                }
            }
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/e_com/E_commerce/frontend/src/components/checkout/CheckoutWrapper.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(CheckoutWrapper, "8sT450h1a+3hnXoGschv1nc5w1I=");
_c = CheckoutWrapper;
var _c;
__turbopack_context__.k.register(_c, "CheckoutWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/e_com/E_commerce/frontend/src/components/checkout/StripePaymentForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StripePaymentForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/@stripe/react-stripe-js/dist/react-stripe.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/components/ui/Button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function StripePaymentForm({ amount, onSuccess, onError }) {
    _s();
    const stripe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStripe"])();
    const elements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useElements"])();
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsProcessing(true);
        try {
            // Confirm the payment with Stripe
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/pages/checkout?success=true`
                },
                redirect: "if_required"
            });
            if (error) {
                onError(error.message || "Payment failed");
                setIsProcessing(false);
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                onSuccess();
            }
        } catch (err) {
            onError(err.message || "Payment failed");
            setIsProcessing(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "space-y-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-xl p-6 md:p-8 shadow-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-serif text-primary-900 mb-6",
                    children: "Payment Information"
                }, void 0, false, {
                    fileName: "[project]/e_com/E_commerce/frontend/src/components/checkout/StripePaymentForm.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaymentElement"], {
                        options: {
                            layout: "tabs",
                            paymentMethodOrder: [
                                "card",
                                "apple_pay",
                                "google_pay"
                            ]
                        }
                    }, void 0, false, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/components/checkout/StripePaymentForm.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/e_com/E_commerce/frontend/src/components/checkout/StripePaymentForm.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 text-sm text-primary-600 p-4 bg-primary-50 rounded-lg mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/e_com/E_commerce/frontend/src/components/checkout/StripePaymentForm.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Your payment information is secure and encrypted by Stripe"
                        }, void 0, false, {
                            fileName: "[project]/e_com/E_commerce/frontend/src/components/checkout/StripePaymentForm.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/e_com/E_commerce/frontend/src/components/checkout/StripePaymentForm.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    type: "submit",
                    size: "lg",
                    className: "w-full flex items-center justify-center gap-2",
                    disabled: !stripe || isProcessing,
                    children: isProcessing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white"
                            }, void 0, false, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/components/checkout/StripePaymentForm.tsx",
                                lineNumber: 92,
                                columnNumber: 15
                            }, this),
                            "Processing..."
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/components/checkout/StripePaymentForm.tsx",
                                lineNumber: 97,
                                columnNumber: 15
                            }, this),
                            "Pay $",
                            amount.toFixed(2)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/e_com/E_commerce/frontend/src/components/checkout/StripePaymentForm.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/e_com/E_commerce/frontend/src/components/checkout/StripePaymentForm.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/e_com/E_commerce/frontend/src/components/checkout/StripePaymentForm.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s(StripePaymentForm, "6R/6jl7awcKDJ4bsiwxr8o4noHI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStripe"],
        __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useElements"]
    ];
});
_c = StripePaymentForm;
var _c;
__turbopack_context__.k.register(_c, "StripePaymentForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckoutPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/hooks/useCart.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/components/ui/Input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$checkout$2f$CheckoutWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/components/checkout/CheckoutWrapper.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$checkout$2f$StripePaymentForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/components/checkout/StripePaymentForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/frontend/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/e_com/E_commerce/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
;
;
function CheckoutPageContent() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { items, total, clearAllItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("details");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Payment states
    const [orderId, setOrderId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [clientSecret, setClientSecret] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Form states
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: ""
    });
    const shippingCost = total > 100 ? 0 : 10;
    const tax = total * 0.1;
    const finalTotal = total + shippingCost + tax;
    // Check authentication on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPageContent.useEffect": ()=>{
            const token = localStorage.getItem("auth_token");
            if (!token) {
                __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Please login to continue with checkout");
                router.push("/auth/login?redirect=/pages/checkout");
                return;
            }
            setIsAuthenticated(true);
        }
    }["CheckoutPageContent.useEffect"], [
        router
    ]);
    // Check for payment success from redirect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPageContent.useEffect": ()=>{
            if (searchParams.get("success") === "true" && orderId) {
                handlePaymentSuccess();
            }
        }
    }["CheckoutPageContent.useEffect"], [
        searchParams
    ]);
    const handleInputChange = (field)=>(value)=>{
            setFormData((prev)=>({
                    ...prev,
                    [field]: value
                }));
        };
    const handleContinueToPayment = async (e)=>{
        e.preventDefault();
        setError(null);
        // Check authentication before proceeding
        const token = localStorage.getItem("auth_token");
        if (!token) {
            setError("Please login to continue");
            __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Please login to continue with checkout");
            router.push("/auth/login?redirect=/pages/checkout");
            return;
        }
        // Validate shipping details
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.country) {
            setError("Please fill in all required fields including country");
            __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Please fill in all required fields including country");
            return;
        }
        setIsLoading(true);
        try {
            // Step 1: Create addresses
            // Note: Backend expects address1 field, not street
            const addressData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                address1: formData.address,
                city: formData.city,
                state: formData.state,
                postalCode: formData.zipCode,
                country: formData.country,
                phone: formData.phone,
                isDefault: false
            };
            // For simplicity, using the same address for shipping and billing
            // In production, you might want separate address forms
            const shippingAddressResponse = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/users/addresses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(addressData)
            });
            if (!shippingAddressResponse.ok) {
                const errorData = await shippingAddressResponse.json().catch(()=>({}));
                if (shippingAddressResponse.status === 401) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Session expired. Please login again.");
                    localStorage.removeItem("auth_token");
                    router.push("/auth/login?redirect=/pages/checkout");
                    return;
                }
                throw new Error(errorData.message || "Failed to create address");
            }
            const shippingAddressResult = await shippingAddressResponse.json();
            const shippingAddressId = shippingAddressResult.data.address.id;
            const billingAddressId = shippingAddressId; // Using same address
            // Step 2: Create order
            const orderData = {
                items: items.map((item)=>({
                        productId: item.product.id,
                        quantity: item.quantity,
                        variantId: item.selectedVariant?.id || undefined
                    })),
                shippingAddressId,
                billingAddressId,
                paymentMethod: "CARD",
                customerNotes: ""
            };
            const order = await __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ordersAPI"].create(orderData);
            setOrderId(order.id);
            // Step 3: Create payment intent
            const paymentIntent = await __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["paymentsAPI"].createIntent(order.id);
            setClientSecret(paymentIntent.clientSecret);
            // Move to payment step
            setStep("payment");
            __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Order created! Please complete payment.");
        } catch (err) {
            console.error("Checkout error:", err);
            setError(err.message || "Failed to process order");
            __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(err.message || "Failed to process order");
        } finally{
            setIsLoading(false);
        }
    };
    const handlePaymentSuccess = async ()=>{
        try {
            // Confirm payment with backend
            if (orderId && clientSecret) {
                const paymentIntentId = clientSecret.split("_secret_")[0];
                await __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["paymentsAPI"].confirmPayment(paymentIntentId, orderId);
            }
            setStep("success");
            clearAllItems();
            __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Payment successful!");
        } catch (err) {
            console.error("Payment confirmation error:", err);
            __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Payment processed but confirmation failed");
            setStep("success"); // Still show success since payment went through
            clearAllItems();
        }
    };
    const handlePaymentError = (errorMessage)=>{
        setError(errorMessage);
        __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(errorMessage);
    };
    // Show loading while checking authentication
    if (!isAuthenticated && step !== "success") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-luxury-cream flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"
            }, void 0, false, {
                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                lineNumber: 204,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
            lineNumber: 203,
            columnNumber: 7
        }, this);
    }
    if (items.length === 0 && step !== "success") {
        router.push("/pages/cart");
        return null;
    }
    if (step === "success") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-luxury-cream flex items-center justify-center py-16",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    scale: 0.9
                },
                animate: {
                    opacity: 1,
                    scale: 1
                },
                className: "bg-white rounded-2xl p-8 md:p-12 max-w-md text-center shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                        size: 80,
                        className: "text-green-500 mx-auto mb-6"
                    }, void 0, false, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                        lineNumber: 222,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-serif text-primary-900 mb-4",
                        children: "Order Placed Successfully!"
                    }, void 0, false, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-primary-600 mb-8",
                        children: "Thank you for your purchase. You will receive a confirmation email shortly."
                    }, void 0, false, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                        lineNumber: 226,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/pages/shop",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    className: "w-full",
                                    children: "Continue Shopping"
                                }, void 0, false, {
                                    fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                    lineNumber: 232,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                lineNumber: 231,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onClick: ()=>router.push("/account/orders"),
                                variant: "secondary",
                                className: "w-full",
                                children: "View Orders"
                            }, void 0, false, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                        lineNumber: 230,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                lineNumber: 217,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
            lineNumber: 216,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-luxury-cream py-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container-luxury max-w-6xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    className: "mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>step === "payment" ? setStep("details") : router.push("/pages/cart"),
                            className: "flex items-center gap-2 text-primary-600 hover:text-primary-900 mb-4 transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                    lineNumber: 264,
                                    columnNumber: 13
                                }, this),
                                step === "payment" ? "Back to Shipping" : "Back to Cart"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                            lineNumber: 256,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl md:text-4xl font-serif text-primary-900",
                            children: "Checkout"
                        }, void 0, false, {
                            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                            lineNumber: 267,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-8 h-8 rounded-full flex items-center justify-center ${step === "details" ? "bg-primary-900 text-white" : "bg-green-500 text-white"}`,
                                            children: step === "details" ? "1" : "✓"
                                        }, void 0, false, {
                                            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                            lineNumber: 274,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium",
                                            children: "Shipping"
                                        }, void 0, false, {
                                            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                            lineNumber: 283,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                    lineNumber: 273,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 h-0.5 bg-primary-200"
                                }, void 0, false, {
                                    fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                    lineNumber: 285,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-8 h-8 rounded-full flex items-center justify-center ${step === "payment" ? "bg-primary-900 text-white" : "bg-primary-200 text-primary-600"}`,
                                            children: "2"
                                        }, void 0, false, {
                                            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                            lineNumber: 287,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium",
                                            children: "Payment"
                                        }, void 0, false, {
                                            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                            lineNumber: 296,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                    lineNumber: 286,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                            lineNumber: 272,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: -10
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            className: "mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    className: "text-red-500 flex-shrink-0 mt-0.5",
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                    lineNumber: 307,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-red-800 font-medium",
                                            children: "Error"
                                        }, void 0, false, {
                                            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                            lineNumber: 312,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-red-600",
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                            lineNumber: 313,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                    lineNumber: 311,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                            lineNumber: 302,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                    lineNumber: 251,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2",
                            children: step === "details" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].form, {
                                initial: {
                                    opacity: 0,
                                    x: -20
                                },
                                animate: {
                                    opacity: 1,
                                    x: 0
                                },
                                onSubmit: handleContinueToPayment,
                                className: "bg-white rounded-xl p-6 md:p-8 shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-serif text-primary-900 mb-6",
                                        children: "Shipping Information"
                                    }, void 0, false, {
                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                        lineNumber: 329,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "First Name",
                                                        value: formData.firstName,
                                                        onChange: handleInputChange("firstName"),
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "Last Name",
                                                        value: formData.lastName,
                                                        onChange: handleInputChange("lastName"),
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                lineNumber: 334,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Email",
                                                type: "email",
                                                value: formData.email,
                                                onChange: handleInputChange("email"),
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                lineNumber: 349,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Phone Number",
                                                type: "tel",
                                                value: formData.phone,
                                                onChange: handleInputChange("phone")
                                            }, void 0, false, {
                                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                lineNumber: 357,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Address",
                                                value: formData.address,
                                                onChange: handleInputChange("address"),
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                lineNumber: 364,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "City",
                                                        value: formData.city,
                                                        onChange: handleInputChange("city"),
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                        lineNumber: 372,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "State / Province",
                                                        value: formData.state,
                                                        onChange: handleInputChange("state"),
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                lineNumber: 371,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "ZIP / Postal Code",
                                                        value: formData.zipCode,
                                                        onChange: handleInputChange("zipCode"),
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-primary-700 mb-2",
                                                                children: [
                                                                    "Country ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-red-500",
                                                                        children: "*"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 397,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                lineNumber: 396,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: formData.country,
                                                                onChange: (e)=>handleInputChange("country")(e.target.value),
                                                                required: true,
                                                                className: "w-full px-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-primary-900",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "",
                                                                        children: "Select Country"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 407,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "US",
                                                                        children: "United States"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 408,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "CA",
                                                                        children: "Canada"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 409,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "GB",
                                                                        children: "United Kingdom"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 410,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "AU",
                                                                        children: "Australia"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 411,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "NZ",
                                                                        children: "New Zealand"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 412,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "DE",
                                                                        children: "Germany"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 413,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "FR",
                                                                        children: "France"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 414,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "IT",
                                                                        children: "Italy"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 415,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "ES",
                                                                        children: "Spain"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 416,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "NL",
                                                                        children: "Netherlands"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 417,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "BE",
                                                                        children: "Belgium"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 418,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "CH",
                                                                        children: "Switzerland"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 419,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "AT",
                                                                        children: "Austria"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 420,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "SE",
                                                                        children: "Sweden"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 421,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "NO",
                                                                        children: "Norway"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 422,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "DK",
                                                                        children: "Denmark"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 423,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "FI",
                                                                        children: "Finland"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 424,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "IE",
                                                                        children: "Ireland"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 425,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "PT",
                                                                        children: "Portugal"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 426,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "GR",
                                                                        children: "Greece"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 427,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "PL",
                                                                        children: "Poland"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 428,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "CZ",
                                                                        children: "Czech Republic"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 429,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "HU",
                                                                        children: "Hungary"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 430,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "RO",
                                                                        children: "Romania"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 431,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "BG",
                                                                        children: "Bulgaria"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 432,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "HR",
                                                                        children: "Croatia"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 433,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "SI",
                                                                        children: "Slovenia"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 434,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "SK",
                                                                        children: "Slovakia"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 435,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "LT",
                                                                        children: "Lithuania"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 436,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "LV",
                                                                        children: "Latvia"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 437,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "EE",
                                                                        children: "Estonia"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 438,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "JP",
                                                                        children: "Japan"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 439,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "KR",
                                                                        children: "South Korea"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 440,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "CN",
                                                                        children: "China"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 441,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "IN",
                                                                        children: "India"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 442,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "SG",
                                                                        children: "Singapore"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 443,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "MY",
                                                                        children: "Malaysia"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 444,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "TH",
                                                                        children: "Thailand"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 445,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "ID",
                                                                        children: "Indonesia"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 446,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "PH",
                                                                        children: "Philippines"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 447,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "VN",
                                                                        children: "Vietnam"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 448,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "AE",
                                                                        children: "United Arab Emirates"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 449,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "SA",
                                                                        children: "Saudi Arabia"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 450,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "IL",
                                                                        children: "Israel"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 451,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "TR",
                                                                        children: "Turkey"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 452,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "ZA",
                                                                        children: "South Africa"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 453,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "NG",
                                                                        children: "Nigeria"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 454,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "KE",
                                                                        children: "Kenya"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 455,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "EG",
                                                                        children: "Egypt"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 456,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "BR",
                                                                        children: "Brazil"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 457,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "MX",
                                                                        children: "Mexico"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 458,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "AR",
                                                                        children: "Argentina"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 459,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "CL",
                                                                        children: "Chile"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 460,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "CO",
                                                                        children: "Colombia"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 461,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "PE",
                                                                        children: "Peru"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                        lineNumber: 462,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                lineNumber: 399,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                        lineNumber: 395,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                lineNumber: 386,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                        lineNumber: 333,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        type: "submit",
                                        size: "lg",
                                        className: "w-full mt-6",
                                        disabled: isLoading,
                                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                    lineNumber: 476,
                                                    columnNumber: 23
                                                }, this),
                                                "Processing..."
                                            ]
                                        }, void 0, true) : "Continue to Payment"
                                    }, void 0, false, {
                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                        lineNumber: 468,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                lineNumber: 323,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    x: -20
                                },
                                animate: {
                                    opacity: 1,
                                    x: 0
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$checkout$2f$CheckoutWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    clientSecret: clientSecret,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$components$2f$checkout$2f$StripePaymentForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        amount: finalTotal,
                                        onSuccess: handlePaymentSuccess,
                                        onError: handlePaymentError
                                    }, void 0, false, {
                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                        lineNumber: 490,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                    lineNumber: 489,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                lineNumber: 485,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                            lineNumber: 321,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                className: "bg-white rounded-xl p-6 shadow-sm sticky top-24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-serif text-primary-900 mb-4",
                                        children: "Order Summary"
                                    }, void 0, false, {
                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                        lineNumber: 507,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 mb-4 max-h-64 overflow-y-auto",
                                        children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: item.product.images[0]?.url,
                                                        alt: item.product.name,
                                                        className: "w-16 h-16 object-cover rounded"
                                                    }, void 0, false, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                        lineNumber: 515,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-primary-900 truncate",
                                                                children: item.product.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                lineNumber: 521,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-primary-600",
                                                                children: [
                                                                    "Qty: ",
                                                                    item.quantity,
                                                                    " ",
                                                                    item.size && `• ${item.size}`
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                lineNumber: 524,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-semibold text-primary-900",
                                                                children: [
                                                                    "$",
                                                                    (item.product.price * item.quantity).toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                                lineNumber: 527,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                        lineNumber: 520,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, item.id, true, {
                                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                lineNumber: 514,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                        lineNumber: 512,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 pt-4 border-t border-primary-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-primary-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Subtotal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                        lineNumber: 538,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "$",
                                                            total.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                        lineNumber: 539,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                lineNumber: 537,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-primary-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Shipping"
                                                    }, void 0, false, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                        lineNumber: 542,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                        lineNumber: 543,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                lineNumber: 541,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-primary-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Tax"
                                                    }, void 0, false, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                        lineNumber: 550,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "$",
                                                            tax.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                        lineNumber: 551,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                lineNumber: 549,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-lg font-bold text-primary-900 pt-2 border-t border-primary-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Total"
                                                    }, void 0, false, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                        lineNumber: 554,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "$",
                                                            finalTotal.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                        lineNumber: 555,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                                lineNumber: 553,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                        lineNumber: 536,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                                lineNumber: 502,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                            lineNumber: 501,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                    lineNumber: 319,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
            lineNumber: 249,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
        lineNumber: 248,
        columnNumber: 5
    }, this);
}
_s(CheckoutPageContent, "uBlUJcaUVNXiMH+TSIp9LBbRkAw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$frontend$2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = CheckoutPageContent;
function CheckoutPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-gray-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
            }, void 0, false, {
                fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
                lineNumber: 570,
                columnNumber: 9
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
            lineNumber: 569,
            columnNumber: 7
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$e_com$2f$E_commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckoutPageContent, {}, void 0, false, {
            fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
            lineNumber: 573,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/e_com/E_commerce/frontend/src/app/pages/checkout/page.tsx",
        lineNumber: 568,
        columnNumber: 5
    }, this);
}
_c1 = CheckoutPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "CheckoutPageContent");
__turbopack_context__.k.register(_c1, "CheckoutPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=e_com_E_commerce_frontend_src_f69536d2._.js.map