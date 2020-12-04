import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  Animated,
  Easing,
  Platform,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';

//import common components back button hamburger
import * as CommonComponents from '../CommonComponents/index';
//import all home screens
import * as MainScreen from '../screens/HomeScreens/index';
//import all items detail screens
import * as StoreDetailScreen from '../screens/HomeScreens/Home/StoreDetail/index';
import * as CheckOutScreen from '../screens/HomeScreens/Home/CheckOut/index';
import * as AddToCart from '../screens/HomeScreens/Home/AddToCartScreen/index';
import * as ProductCategoryDetail from '../screens/HomeScreens/Home/ProductCategoryDetailScreen/index';
import * as AuthScreens from '../screens/AuthScreens/index';
import * as AllProduct from '../screens/HomeScreens/Home/ProductsScreen/index';
import SettingScreen from '../screens/HomeScreens/AppSettings/SettingScreen';
import SettingTittle from '../screens/HomeScreens/AppSettings/SettingTittle';
import LinearGradient from 'react-native-linear-gradient';

//Stack Navigation for Notification Screen
const Notification_StackNavigator = createStackNavigator({
  Notification: {
    screen: MainScreen.NotificationScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: () => (
        <CommonComponents.HamBurger navigationProps={navigation} />
      ),

      safeAreaInsets: {top: 0},

      headerTitle: () => <MainScreen.NotificationTittle />,
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => (
        <CommonComponents.ShopButton navigationProps={navigation} />
      ),
    }),
  },
});
const Location_StackNavigator = createStackNavigator({
  Location: {
    screen: MainScreen.LocationScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: () => (
        <CommonComponents.HamBurger navigationProps={navigation} />
      ),
      safeAreaInsets: {top: 0},
      headerTitle: '',
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
    }),
  },
});

const Home_StackNavigator = createStackNavigator({
  Home: {
    screen: MainScreen.HomeScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: () => (
        <CommonComponents.HamBurger navigationProps={navigation} />
      ),
      safeAreaInsets: {top: 0},
      headerTitle: () => <MainScreen.HomeTittle />,
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),

      headerRight: () => (
        <CommonComponents.ShopButton navigationProps={navigation} />
      ),
    }),
  },
  ProductCategoryDetailScreen: {
    screen: ProductCategoryDetail.ProductCategoryDetailScreen,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTitle: () => <ProductCategoryDetail.ProductCategoryDetailTittle />,

      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => (
        <CommonComponents.ShopButton navigationProps={navigation} />
      ),
    }),
  },
});

const Shop_StackNavigator = createStackNavigator({
  Shop: {
    screen: MainScreen.ShopScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: () => (
        <CommonComponents.HamBurger navigationProps={navigation} />
      ),
      safeAreaInsets: {top: 0},
      headerTitle: () => <MainScreen.ShopTittle />,
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => (
        <CommonComponents.ShopButton navigationProps={navigation} />
      ),
    }),
  },
});

const Favorite_StackNavigator = createStackNavigator({
  Favorite: {
    screen: MainScreen.FavoriteScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: () => (
        <CommonComponents.HamBurger navigationProps={navigation} />
      ),
      safeAreaInsets: {top: 0},
      headerTitle: () => <MainScreen.FavoriteTittle />,
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => (
        <CommonComponents.ShopButton navigationProps={navigation} />
      ),
    }),
  },
});
const CheckOut_StackNavigator = createStackNavigator({
  CartScreen: {
    screen: CheckOutScreen.CheckOut,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: () => (
        <CheckOutScreen.CheckOutTittle navigationProps={navigation} />
      ),
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => <View />,
    }),
  },
  CheckOutDetailScreen: {
    screen: CheckOutScreen.CheckOutDetailScreen,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: () => (
        <CheckOutScreen.CheckOutDetailTittle navigationProps={navigation} />
      ),
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => <View />,
    }),
  },
  Payment: {
    screen: CheckOutScreen.PaymentScreen,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: () => (
        <CheckOutScreen.PaymentTittle navigationProps={navigation} />
      ),
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => <View />,
    }),
  },
});

//Bottom Tab
const BottomTabScreen = createBottomTabNavigator(
  {
    Notification: {
      screen: Notification_StackNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/notificationBig.png')}
              style={{height: '100%', width: '100%', resizeMode: 'contain'}}
            />
          </View>
        ),
      },
    },
    Location: {
      screen: Location_StackNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/location.png')}
              style={{height: '100%', width: '100%', resizeMode: 'contain'}}
            />
          </View>
        ),
      },
    },
    Home: {
      screen: Home_StackNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View
            style={{
              width: 45,
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/homeIcon.png')}
              style={{height: '100%', width: '100%', resizeMode: 'contain'}}
            />
          </View>
        ),
      },
    },

    Shop: {
      screen: Shop_StackNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View
            style={{
              width: 55,
              height: 55,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/Shoppingbag.png')}
              style={{height: '100%', width: '100%', resizeMode: 'contain'}}
            />
          </View>
        ),
      },
    },

    Favorite: {
      screen: Favorite_StackNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/FavoriteBig.png')}
              style={{height: '100%', width: '100%', resizeMode: 'contain'}}
            />
          </View>
        ),
      },
    },
  },
  {
    tabBarComponent: (props) => {
      return (
        <LinearGradient
          colors={['#e9ba00', '#fdf963', '#e9ba00']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}>
          <BottomTabBar
            {...props}
            style={{
              backgroundColor: 'transparent',
              paddingTop: 2,
              paddingBottom: 2,
              height: 60,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 20,
              shadowOffset: {width: 0, height: 0},
            }}
          />
        </LinearGradient>
      );
    },

    tabBarOptions: {
      showLabel: false,
    },

    initialRouteName: 'Home',
  },
);

const HomeBottom = createStackNavigator({
  HomeScreens: {
    screen: BottomTabScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  storedetail: {
    screen: StoreDetailScreen.StoreDetail,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: () => (
        <StoreDetailScreen.StoreDetailTittle navigationProps={navigation} />
      ),

      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => (
        <CommonComponents.ShopButton navigationProps={navigation} />
      ),
    }),
  },
  AddToCartScreen: {
    screen: AddToCart.AddToCartScreen,

    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: () => (
        <AddToCart.AddToCartTittle navigationProps={navigation} />
      ),

      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => (
        <CommonComponents.ShopButton navigationProps={navigation} />
      ),
    }),
  },

  ShopScreen: {
    screen: CheckOutScreen.CheckOut,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: () => (
        <CheckOutScreen.CheckOutTittle navigationProps={navigation} />
      ),
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => <View />,
    }),
  },
  CheckOutDetailScreen: {
    screen: CheckOutScreen.CheckOutDetailScreen,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: () => (
        <CheckOutScreen.CheckOutDetailTittle navigationProps={navigation} />
      ),
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => <View />,
    }),
  },
  Payment: {
    screen: CheckOutScreen.PaymentScreen,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: () => (
        <CheckOutScreen.PaymentTittle navigationProps={navigation} />
      ),
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => <View />,
    }),
  },
  AddressScreen: {
    screen: CheckOutScreen.AddressScreen,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: () => (
        <CheckOutScreen.AddressTittle navigationProps={navigation} />
      ),
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => <View />,
    }),
  },
  PhoneScreen: {
    screen: CheckOutScreen.PhoneScreen,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: () => (
        <CheckOutScreen.PhoneTittle navigationProps={navigation} />
      ),
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
     
    }),
  },
  DisherScreen: {
    screen: CheckOutScreen.DisherTipScreen,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: '',
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
     
    }),
  },
  DropOffScreen: {
    screen: CheckOutScreen.DropOffScreen,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: () => (
        <CheckOutScreen.DropOffTittle navigationProps={navigation} />
      ),
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
     
    }),
  },
  Paypal: {
    screen: CheckOutScreen.PaypalScreen,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: '',
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
     
    }),
  },
  ScheduleScreen: {
    screen: CheckOutScreen.DeliverySchedule,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: '',
      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
     
    }),
  },
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: () => <SettingTittle />,
      headerStyle: {
        backgroundColor: 'transparent',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => <View />,
    }),
  },
  ShowAllProducts: {
    screen: AllProduct.ProductScreen,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: () => (
        <AllProduct.ProductTittle navigationProps={navigation} />
      ),

      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => (
        <CommonComponents.ShopButton navigationProps={navigation} />
      ),
    }),
  },
  CategoryDetailScreen: {
    screen: AllProduct.CategoryDetail,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerTitle: () => (
        <AllProduct.ProductTittle navigationProps={navigation} />
      ),

      headerBackground: () => (
        <LinearGradient
          colors={['#481b74', '#6a349f', '#481b74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{flex: 1}}
        />
      ),
      headerTintColor: '#e9ba00',
      headerStyle: {
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => (
        <CommonComponents.ShopButton navigationProps={navigation} />
      ),
    }),
  },
});
//Drawer Navigator Which will provide the structure of our App
const DrawerNavigator = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    HomeScreen: {
      screen: HomeBottom,
    },
  },
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: CommonComponents.CustomSidebarMenu,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width - 80,
    drawerPosition: 'left',
  },
);

const RootNavigator = createSwitchNavigator({
  SplashScreen: AuthScreens.SplashScreen,
  Login: AuthScreens.LoginScreen,
  Register: AuthScreens.RegisterScreen,
  ForgotPassword: AuthScreens.ForgotPasswordScreen,

  Drawer: DrawerNavigator,

  SearchScreen: MainScreen.SwipePanel,
});

const MainNavigator = createAppContainer(RootNavigator);

export default MainNavigator;
