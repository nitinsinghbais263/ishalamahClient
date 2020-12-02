import React, {Component} from 'react';
import { Text, View, Image, Alert, SafeAreaView, TouchableOpacity, AsyncStorage, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
// import { DrawerActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


// import screens
import SplashScreen from '../screens/Splash/index'
import SelectLang from '../screens/IntroSlide/selectLang'
import IntroScreen from '../screens/IntroSlide/index'
import LoginScreen from '../screens/Login/index'
import Register1 from '../screens/Registration/Register-1';
import Register2 from '../screens/Registration/Register-2';
import Register3 from '../screens/Registration/Register-3';
import Register4 from '../screens/Registration/Register-4';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import ForgetPassword2 from '../screens/ForgetPassword/ForgetPassword2';
import ForgetPassword3 from '../screens/ForgetPassword/ForgetPassword3';
import Drawer from '../components/Drawer';
import Header from '../components/Header';
import UserProfile from '../screens/User/userProfile';
import DashboardScreen from '../screens/Dashboard/index';
import Invoices from '../screens/Invoices/index';
import Settings from '../screens/Settings/index';
import About from '../screens/About/index';
import TicketsList from '../screens/Tickets/TicketsList';
import NewTicket from '../screens/Tickets/NewTicket';
import TicketDetails from '../screens/Tickets/TicketDetails';
import TicketsCategory from '../screens/Tickets/TicketsCategory';
import ReportView from '../screens/Tickets/ReportView';
import WaitingTicket from '../screens/Tickets/WaitingTicket';
import Notes from '../screens/Notes/index';
import TextArea from '../screens/Notes/TextArea';
import ServicesList from '../screens/Services/ServicesList';
import ServicesCategory from '../screens/Services/ServicesCategory';
import AddService from '../screens/Services/AddService';
import AddServiceLocation from '../screens/Services/AddServiceLocation';
import Step5 from '../screens/Services/Step5';
import RenewService from '../screens/Services/RenewService';
import Purchase from '../screens/Services/PurchaseScreen';
import ServicePurchare from '../screens/Services/PurchaseScreen2';
import ServiceAccountDetails from '../screens/Services/ServiceAccountDetails';
import Shop from '../screens/Shop/index';
import ProductsCategory from '../screens/Shop/ProductsCategory';
import ProductsList from '../screens/Shop/ProductsList';
import ProductView from '../screens/Shop/ProductView';
import ProductsAdded from '../screens/Shop/ProductsAdded';
import Cart from '../screens/Shop/Cart';
import InvoicesList from '../screens/Invoices/InvoicesList';
import ServiceInvoice from '../screens/Invoices/ServiceInvoice';
import OrderInvoice from '../screens/Invoices/OrderInvoice';
import TicketInvoice from '../screens/Invoices/TicketInvoice';
import OrdersList from '../screens/Orders/OrdersList';
import OrderDetail from '../screens/Orders/OrderDetail';
import CashBook from '../screens/CashBook/CashBook';
import DataLoader from '../components/DataLoader';
import Payment from '../screens/Payment/index'


// Setup the stack navigation
const AppScreens = createStackNavigator({
      SelectLang: { screen: SelectLang, navigationOptions: { header: null } },
      Intro: { screen: IntroScreen, navigationOptions: { header: null } },
      Login: { screen: LoginScreen, navigationOptions: { header: null, gesturesEnabled: false } },
      Register1: { screen: Register1, navigationOptions: { header: null } },
      Register2: { screen: Register2, navigationOptions: { header: null } },
      Register3: { screen: Register3, navigationOptions: { header: null } },
      Register4: { screen: Register4, navigationOptions: { header: null } },
      ForgetPassword: { screen: ForgetPassword, navigationOptions: { header: null, gesturesEnabled: false } },
      ForgetPassword2: { screen: ForgetPassword2, navigationOptions: { header: null } },
      ForgetPassword3: { screen: ForgetPassword3, navigationOptions: { header: null } },
      Drawer: { screen: Drawer, navigationOptions: { header: null } },
      Header: { screen: Header, navigationOptions: { header: null } },
      UserProfile: { screen: UserProfile, navigationOptions: { header: null, gesturesEnabled: false  } },
      Dashboard: { screen: DashboardScreen, navigationOptions: { header: null, gesturesEnabled: false } },
      TicketsList: { screen: TicketsList, navigationOptions: { header: null } },
      NewTicket: { screen: NewTicket, navigationOptions: { header: null } },
      TicketDetails: { screen: TicketDetails, navigationOptions: { header: null } },
      TicketsCategory: { screen: TicketsCategory, navigationOptions: { header: null } },
      ReportView: { screen: ReportView, navigationOptions: { header: null } },
      WaitingTicket: { screen: WaitingTicket, navigationOptions: { header: null } },
      Notes: { screen: Notes, navigationOptions: { header: null } },
      TextArea: { screen: TextArea, navigationOptions: { header: null } },
      ServicesCategory: { screen: ServicesCategory, navigationOptions: { header: null } },
      ServicesList: { screen: ServicesList, navigationOptions: { header: null } },
      AddService: { screen: AddService, navigationOptions: { header: null } },
      AddServiceLocation: { screen: AddServiceLocation, navigationOptions: { header: null } },
      Step5: { screen: Step5, navigationOptions: { header: null} },
      RenewService: { screen: RenewService, navigationOptions: { header: null } },
      Purchase: { screen: Purchase, navigationOptions: { header: null, gesturesEnabled: false  } },
      ServicePurchare: { screen: ServicePurchare, navigationOptions: { header: null, gesturesEnabled: false } },
      ServiceAccountDetails: { screen: ServiceAccountDetails, navigationOptions: { header: null } },
      Shop: { screen: Shop, navigationOptions: { header: null } },
      ProductsCategory: { screen: ProductsCategory, navigationOptions: { header: null } },
      ProductsList: { screen: ProductsList, navigationOptions: { header: null } },
      ProductView: { screen: ProductView, navigationOptions: { header: null } },
      ProductsAdded: { screen: ProductsAdded, navigationOptions: { header: null } },
      Cart: { screen: Cart, navigationOptions: { header: null } },
      InvoicesList: { screen: InvoicesList, navigationOptions: { header: null } },
      ServiceInvoice: { screen: ServiceInvoice, navigationOptions: { header: null } },
      OrderInvoice: { screen: OrderInvoice, navigationOptions: { header: null } },
      TicketInvoice: { screen: TicketInvoice, navigationOptions: { header: null } },
      OrdersList: { screen: OrdersList, navigationOptions: { header: null } },
      OrderDetail: { screen: OrderDetail, navigationOptions: { header: null } },
      CashBook: { screen: CashBook, navigationOptions: { header: null } },
      About: { screen: About, navigationOptions: { header: null } },
      Settings: { screen: Settings, navigationOptions: { header: null } },
      DataLoader: { screen: DataLoader, navigationOptions: {header: null } },
      Payment: { screen: Payment, navigationOptions: {header: null } }

    },
    {
      initialRouteName: "SelectLang"
    }
);

const MainApp = createAppContainer(
  createSwitchNavigator({
    Splash: SplashScreen,
    Login: LoginScreen,
    MainStack: AppScreens
  })
)


export default MainApp
