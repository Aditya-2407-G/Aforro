import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ScreenLayout = () => {
    return (
        <>
            <StatusBar backgroundColor="#161622" style="light" />

            <Stack>
                <Stack.Screen
                    name="CategoryScreen/[id]"
                    options={{
                        headerShown: true,
                        title: "Category Products",
                    }}
                />
            </Stack>
        </>
    );
};

export default ScreenLayout;