import { Stack } from 'expo-router';
import { AuthProvider } from "@/context/AuthContext";
import AuthWrapper from "@/app/AuthWrapper";
import { CartProvider } from '../context/CartContext';

export default function Layout() {
  return (
    <CartProvider>
      <AuthProvider>
        <AuthWrapper>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(screens)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
          </Stack>
        </AuthWrapper>
      </AuthProvider>
    </CartProvider>
  );
}