import { combineReducers } from 'redux';
import * as logInReducers from './login';
import * as registrationReducers from './registration';
import * as profileReducers from './user';
import * as servicesReducers from './services';
import * as ticketsReducers from './tickets';
import * as notesReducers from './notes';
import * as productsReducers from  './products';
import * as cartReducers from './cart';
import * as invoicesReducers from './invoices';
import * as cashbookReducers from './cashbook'

export default combineReducers(Object.assign(
  logInReducers,
  registrationReducers,
  profileReducers,
  servicesReducers,
  ticketsReducers,
  notesReducers,
  productsReducers,
  cartReducers,
  invoicesReducers,
  cashbookReducers
));
