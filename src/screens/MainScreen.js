import React, { useEffect, useState } from 'react'
import { NavigationContainer,DarkTheme  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon  from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Home/HomeScreen'
import CartScreen from './Cart/CartScreen'
import ShopScreen from './Shop/ShopScreen'
import OrderScreen from './Order/OrderScreen'
import OrderedListScreen from './OrderedList/OrderedListScreen'
import ProfileScreen from './Profile/ProfileScreen'
import ProductsListScreen from './ProductsList/ProductsListScreen'
import AddingProductScreen from './AddingProduct/AddingProductScreen'
import CategoryListScreen from './CategoryList/CategoryListScreen'
import AddingCategoryScreen from './AddingCategory/AddingCategoryScreen'

import {Provider} from 'react-redux';
import store from '../../src/redux/store';

const Tab = createBottomTabNavigator();

//HOME
const HomeStackScreen = createStackNavigator();

function Home() {
  return (
    <HomeStackScreen.Navigator>
        <HomeStackScreen.Screen name="home" options={{headerShown: true, headerTitle: "BÁCH HÓA ANH THƯ",headerTitleAlign: 'center', tabBarVisible: true}} component={HomeScreen} /> 
       <HomeStackScreen.Screen name="shop" options={{headerShown: true, headerTitle: "BÁCH HÓA ANH THƯ",headerTitleAlign: 'center', tabBarVisible: true}} component={ShopScreen} />
       <HomeStackScreen.Screen name="cart" component={CartScreen} options={{headerShown: true, headerTitle: "Giỏ hàng",headerTitleAlign: 'center'}} />
    </HomeStackScreen.Navigator>
  );
}


const OrdersStackScreen = createStackNavigator();
function Orders() {
  return (
    <OrdersStackScreen.Navigator>
       <OrdersStackScreen.Screen name="orders" options={{headerShown: true, headerTitle: "Danh Sách Đơn Hàng",headerTitleAlign: 'center'}}  component={OrderedListScreen} />
       <OrdersStackScreen.Screen name="order" options={{headerShown: true, headerTitle: "Chi Tiết Đơn Hàng",headerTitleAlign: 'center'}}  component={OrderScreen} />
    </OrdersStackScreen.Navigator>
  );
}

const ProfileStackScreen = createStackNavigator();
function Profiles() {
  return (
    <ProfileStackScreen.Navigator>
       <ProfileStackScreen.Screen name="profie" options={{headerShown: false, headerTitle: "Thông Tin Tài Khoản",headerTitleAlign: 'center'}} component={ProfileScreen} />
       <ProfileStackScreen.Screen name="products" options={{headerShown: true, headerTitle: "Danh sách sản phẩm",headerTitleAlign: 'center'}} component={ProductsListScreen} />
       <ProfileStackScreen.Screen name="addingproduct" options={{headerShown: true, headerTitle: "Thêm mới sản phẩm",headerTitleAlign: 'center'}} component={AddingProductScreen} />
       <ProfileStackScreen.Screen name="categories" options={{headerShown: true, headerTitle: "Danh mục sản phẩm",headerTitleAlign: 'center'}} component={CategoryListScreen} />
       <ProfileStackScreen.Screen name="addingcategory" options={{headerShown: true, headerTitle: "Thêm Danh Mục Sản Phẩm",headerTitleAlign: 'center'}} component={AddingCategoryScreen} />
    </ProfileStackScreen.Navigator>
  );
}
getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name : '';
  if (routeName === 'shop' || routeName === '') {
    return true;
  }
  return false;
}
export default function MainScreen() {
    return (
    <Provider store = {store}>
      <NavigationContainer>
        <Tab.Navigator  
        	screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'home') {
                  iconName = focused ? 'md-home' : 'ios-home';
                } 
              if (route.name === 'cart') {
                  iconName = focused ? 'cart' : 'cart-outline';
                } 
              if (route.name === 'order') {
                  iconName = focused ? 'list-circle' : 'list-circle-outline';
                }
              if (route.name === 'profile') {
                  iconName = focused ? 'md-person-circle' : 'md-person-circle-outline';
                }   
                return <Icon name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'red',
              inactiveTintColor: 'gray',
            }}>
          <Tab.Screen name="home" options={({ route }) => ({ tabBarVisible: getTabBarVisibility(route), tabBarLabel: 'Trang chủ'})} component={Home}  
            listeners={({ navigation, route }) => ({
            tabPress: e => {
              navigation.navigate('home');
            },
          })}/>
          <Tab.Screen name="order" options={{ tabBarLabel: 'Đơn hàng' ,tabBarBadge: 3}} component={Orders} />
          <Tab.Screen name="profile" options={{ tabBarLabel: 'Tài khoản' }} component={Profiles} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>  
    )
}
