'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import LogIn from './login/page';
import Register from './register/page';

export default function AuthSwitcher() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isLogin = !(searchParams.get('register') === 'true');

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center opacity-80 z--10"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop")' }}
        >
            <div className="relative w-full max-w-md bg-white bg-opacity-90 p-8 rounded shadow-md">
                <AnimatePresence initial={false} mode="wait">
                    {isLogin ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <LogIn />
                           
                        </motion.div>
                    ) : (
                        <motion.div
                            key="register"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Register />
                           
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
