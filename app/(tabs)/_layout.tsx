import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

const TabLayout = () => {
    return (
        <>
            <StatusBar backgroundColor="#161622" style="light" />
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "#3A83F4",
                    tabBarInactiveTintColor: "#CDCDE0",
                    tabBarStyle: {
                        height: 60,
                        backgroundColor: '#FFFFFF',
                        borderTopWidth: 1,
                        borderTopColor: '#E0E0E0',
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <AntDesign name="home" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="categories"
                    options={{
                        title: "Categories",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <AntDesign name="appstore-o" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="cart"
                    options={{
                        title: "Cart",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <AntDesign name="shoppingcart" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <AntDesign name="user" size={24} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabLayout;