import * as loginActions from './login';
import * as registrationActions from './registration';
import * as profileActions from './user';
import * as servicesActions from './services';
import * as ticketsActions from './tickets';
import * as notesActions from './notes';
import * as productsActions from './products';
import * as cartActions from './cart';
import * as invoicesActions from './invoices';
import * as cashbookActions from './cashbook';


export const ActionCreators = Object.assign({},
  loginActions,
  registrationActions,
  profileActions,
  servicesActions,
  ticketsActions,
  notesActions,
  productsActions,
  cartActions,
  invoicesActions,
  cashbookActions
);
