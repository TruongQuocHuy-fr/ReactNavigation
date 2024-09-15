import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Contacts from '../screens/Contacts'
import Profile from '../screens/Profile'
import Favorites from '../screens/Favourites';
import colors from '../utility/colors'
import { MaterialIcons } from '@expo/vector-icons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Options from '../screens/Options';
import User from '../screens/User';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import UpdateUser from '../screens/UpdateUser';
const getDrawerItemIcon = icon => ({tintColor}) => (
    <MaterialIcons name={icon} size={22} style={{color: tintColor}} />
)

const getTabBarIcon = icon => ({tintColor}) => (
    <MaterialIcons name={icon} size={26} style={{color: tintColor}} />
)

const Stack = createStackNavigator();
const ContactsScreens = () => {
    return (
        <Stack.Navigator
            initialRouteName="Contacts"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'tomato' },
                headerTitleAlign: 'center',
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Contacts"
                component={Contacts}
                options={{ title: 'Contacts' }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={({ route }) => {
                    const { contact } = route.params;
                    const { name } = contact;
                    return {
                        title: name.split(' ')[0],
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: colors.blue,
                        },
                    };
                }}
            />
        </Stack.Navigator>
    );
};
const StackNavigation = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Contacts'
                screenOptions={{
                    headerTintColor: 'white',
                    headerStyle: {backgroundColor: 'tomato'},
                    headerTitleAlign: 'center',
                }}
            >
                <Stack.Screen name='Contacts' component={Contacts}
                    options={{title: "Contacts"}}/>
                <Stack.Screen 
                    name='Profile' 
                    component={Profile}
                    options={({route}) =>{
                        const {contact} = route.params;
                        const {name} = contact;
                        return {
                            title: name.split(' ')[0],
                            headerTintColor: 'white',
                            headerStyle:{
                                backgroundColor: colors.blue,
                            }
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
const FavoritesScreens = () =>
{
    return(
        <Stack.Navigator
            initialRouteName='Favorites'
            screenOptions={{
                headerShown:false
            }}
        >
            <Stack.Screen name='Favorites' component={Favorites}
                    options={{title: "Favorites"}}/>
            <Stack.Screen name='Profile' component={Profile}
                    options={{title: "Profile"}}/>
        </Stack.Navigator>
    )
}
const Drawer = createDrawerNavigator()
const DrawerNavigator = ()=>{
    const { t } = useTranslation();
    return(
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName='ContactsScreens'
                screenOptions={{
                    drawerActiveBackgroundColor: colors.grey,
                    headerStyle: {
                        backgroundColor: colors.grey, // Header color
                      },
                }}
            >
                <Drawer.Screen name='ContactsScreens' component={ContactsScreens}
                    options={{
                        drawerIcon: getDrawerItemIcon('list'),
                        title: t('contact-screen')
                    }}
                />
                <Drawer.Screen name='FavoritesScreens' component={FavoritesScreens}
                    options={{
                        drawerIcon: getDrawerItemIcon('star'),
                        title: t('favorite-screen')
                    }}
                />
                <Drawer.Screen name='UserScreens' component={UserScreens}
                    options={{
                        drawerIcon: getDrawerItemIcon('person'),
                        title: t('user-screen')
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
const UserScreens = ({navigation}) =>
{
    const { t } = useTranslation();
    return(
        <Stack.Navigator
            initialRouteName='User'
        >
            <Stack.Screen name='User' component={User}
                options={{
                    headerTitle:t('me'),
                    // headerTintColor: 'white',
                    // headerStyle:{
                    //     backgroundColor: colors.blue,
                    headerTintColor: 'black',
                    headerStyle:{
                        backgroundColor: 'white',
                    },
                    headerRight: ()=>(
                        <MaterialIcons
                            name='settings'
                            size={24}
                            style={{color: 'black', marginRight: 10}}
                            onPress={() => navigation.navigate('Options')}
                        />
                    )
                }}
            />
            <Stack.Screen name='Options' component={Options}
                options={{title: t('options')}}/>
            <Stack.Screen name='UpdateUser' component={UpdateUser}
                options={{title: t('update_profile')}}/>
                
        </Stack.Navigator>
    )
}
const Tab = createMaterialBottomTabNavigator();
const TabNavigation = () => {
    const { t } = useTranslation();
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="ContactsScreens"
                screenOptions={{
                    tabBarStyle: { backgroundColor: colors.blue },
                    tabBarActiveTintColor: colors.greyLight,
                    tabBarInactiveTintColor: colors.greyDark,
                    headerShown: false,  // Hide header for all screens in this navigator
                }}
                style={{paddingTop: 32}}
            >
                <Tab.Screen
                    name="ContactsScreens"
                    component={ContactsScreens}
                    options={{
                        tabBarIcon: getTabBarIcon('list'),
                        //tabBarLabel: 'Contacts',
                        title: t('contact-screen')
                    }}
                />
                <Tab.Screen
                    name="FavoritesScreens"
                    component={FavoritesScreens}
                    options={{
                        tabBarIcon: getTabBarIcon('star'),
                        //tabBarLabel: 'Favorites',
                        title: t('favorite-screen')
                    }}
                />
                <Tab.Screen
                    name="UserScreens"
                    component={UserScreens}
                    options={{
                        tabBarIcon: getTabBarIcon('person'),
                        //tabBarLabel: 'User',
                        title: t('user-screen')
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
export {TabNavigation, DrawerNavigator};