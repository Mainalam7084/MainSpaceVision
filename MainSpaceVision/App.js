import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { FavoritesProvider } from './src/hooks/useFavorites';
import HomeScreen from './src/screens/HomeScreen';
import MarsScreen from './src/screens/MarsScreen';
import NeosScreen from './src/screens/NeosScreen';
import SearchScreen from './src/screens/SearchScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

const Tab = createBottomTabNavigator();

const ScreenOptions = {
    headerShown: false,
    tabBarStyle: {
        backgroundColor: '#0f0c29',
        borderTopColor: '#333',
        height: 60,
        paddingBottom: 10,
    },
    tabBarActiveTintColor: '#4da6ff',
    tabBarInactiveTintColor: '#888',
};

export default function App() {
    return (
        <SafeAreaProvider>
            <FavoritesProvider>
                <NavigationContainer>
                    <StatusBar style="light" />
                    <Tab.Navigator screenOptions={ScreenOptions}>
                        <Tab.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{
                                tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={24} />,
                            }}
                        />
                        <Tab.Screen
                            name="Mars"
                            component={MarsScreen}
                            options={{
                                tabBarIcon: ({ color }) => <Ionicons name="planet" color={color} size={24} />,
                            }}
                        />
                        <Tab.Screen
                            name="NEOs"
                            component={NeosScreen}
                            options={{
                                tabBarIcon: ({ color }) => <Ionicons name="rocket" color={color} size={24} />,
                            }}
                        />
                        <Tab.Screen
                            name="Search"
                            component={SearchScreen}
                            options={{
                                tabBarIcon: ({ color }) => <Ionicons name="search" color={color} size={24} />,
                            }}
                        />
                        <Tab.Screen
                            name="Favorites"
                            component={FavoritesScreen}
                            options={{
                                tabBarIcon: ({ color }) => <Ionicons name="heart" color={color} size={24} />,
                            }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </FavoritesProvider>
        </SafeAreaProvider>
    );
}
