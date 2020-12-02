import {StyleSheet, Dimensions} from 'react-native';
import {getAdjustedFontSize} from '../../responsive/responsive';
const deviceWidth = Math.round(Dimensions.get('window').width);
module.exports = StyleSheet.create({
  Container: {flex: 1, resizeMode: 'contain', justifyContent: 'center'},

  //Content

  ContentSubContainer: {flex: 1, padding: 5},

  ContentNextServiceContainer: {width: '100%', height: 70},

  ContentNextServiceTitle: {
    fontSize: getAdjustedFontSize(18),
    color: '#6C6C6C',
    fontFamily: 'SegoeUI',
  },

  ContentNextServiceBody: {
    fontSize: getAdjustedFontSize(36),
    color: '#6C6C6C',
    paddingTop: 10,
    fontFamily: 'SegoeUI',
  },

  ContentDashboardContainer: {width: '100%', height: 410},

  ContentDashboardTitle: {
    fontSize: getAdjustedFontSize(18),
    padding: 10,
    color: '#6C6C6C',
    paddingTop: 20,
    fontFamily: 'SegoeUI',
  },

  ContentBoxContainer1: {
    width: '100%',
    height: 180,
    flexDirection: 'row',
    marginTop: 10,
  },

  ContentServiceContainer: {flex: 1, padding: 5},

  ContentServiceSubContainer: {flex: 1, backgroundColor: '#285DB3'},

  ContentServiceLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    position: 'absolute',
    top: 25,
    left: 15,
  },

  ContentServiceNextArrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    position: 'absolute',
    top: 25,
    right: 15,
  },

  ContentServiceTitle: {
    fontSize: getAdjustedFontSize(24),
    color: '#ffffff',
    position: 'absolute',
    left: 15,
    bottom: 40,
  },

  ContentShopContainer: {flex: 1, padding: 5},

  ContentShopSubContainer: {flex: 1, backgroundColor: '#2383C3'},

  ContentShopLogo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    position: 'absolute',
    top: 20,
    left: 15,
  },

  ContentShopNextArrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    position: 'absolute',
    top: 25,
    right: 15,
  },

  ContentShopTitle: {
    fontSize: getAdjustedFontSize(24),
    color: '#ffffff',
    position: 'absolute',
    left: 15,
    bottom: 40,
    fontFamily: 'SegoeUI',
  },

  ContentShopCartTitle: {
    fontSize: getAdjustedFontSize(12),
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'SegoeUI',
    textAlign: 'right',
  },

  ContentShopCartLableEN: {
    fontSize: getAdjustedFontSize(12),
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'SegoeUI',
    textAlign: 'right',
  },

  ContentShopCartLableAR: {
    fontSize: getAdjustedFontSize(12),
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'SegoeUI',
  },

  ContentBoxContainer2: {width: '100%', height: 180, flexDirection: 'row'},

  ContentTicketContainer: {flex: 1, padding: 5},

  ContentTicketSubContainer: {flex: 1, backgroundColor: '#14B5F2'},

  ContentTicketLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    position: 'absolute',
    top: 25,
    left: 15,
  },

  ContentTicketNextArrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    position: 'absolute',
    top: 25,
    right: 15,
  },

  ContentTicketTitle: {
    fontSize: getAdjustedFontSize(24),
    color: '#ffffff',
    position: 'absolute',
    left: 15,
    bottom: 40,
    fontFamily: 'SegoeUI',
  },

  ContentCashContainer: {flex: 1, padding: 5},

  ContentCashSubContainer: {flex: 1, backgroundColor: '#23BDE4'},

  ContentCashLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    position: 'absolute',
    top: 25,
    left: 15,
  },

  ContentCashNextArrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    position: 'absolute',
    top: 25,
    right: 15,
  },

  ContentCashTitle: {
    fontSize: getAdjustedFontSize(24),
    color: '#ffffff',
    position: 'absolute',
    left: 15,
    bottom: 40,
    fontFamily: 'SegoeUI',
  },

  //Expiring Services

  ServicesContainer: {flex: 1},

  ServicesTitle: {
    fontSize: getAdjustedFontSize(18),
    padding: 5,
    color: '#6C6C6C',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'SegoeUI',
  },

  ServicesCard: {
    width: 280,
    height: 370,
    shadowColor: '#00000021',
    shadowOffset: {width: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: '#F24214',
  },

  ServicesCardHeader: {
    width: '100%',
    height: '85%',
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },

  ServicesRenewLogo: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: -10,
  },

  ServicesHeaderTitle: {
    fontSize: getAdjustedFontSize(24),
    color: '#ffffff',
    fontFamily: 'SegoeUI',
  },

  ServicesDateContainer: {
    width: '100%',
    height: 60,
    alignSelf: 'flex-start',
    marginTop: 25,
  },

  ServicesDateTitle: {
    fontSize: getAdjustedFontSize(16),
    color: '#ffffff',
    fontFamily: 'SegoeUI',
  },

  ServicesDateContent: {
    fontSize: getAdjustedFontSize(20),
    color: '#ffffff',
    marginTop: 15,
    fontFamily: 'SegoeUI',
  },

  ServicesLocationContainer: {
    width: '100%',
    height: '50%',
    alignSelf: 'flex-start',
    marginTop: 20,
  },

  ServicesLocationTitle: {
    fontSize: getAdjustedFontSize(16),
    color: '#ffffff',
    fontFamily: 'SegoeUI',
  },

  ServicesLocationContent: {
    fontSize: getAdjustedFontSize(20),
    color: '#ffffff',
    marginTop: 15,
    fontFamily: 'SegoeUI',
  },

  ServicesLocationContent2: {
    fontSize: getAdjustedFontSize(20),
    color: '#ffffff',
    marginTop: 5,
    fontFamily: 'SegoeUI',
  },

  ServicesCardFooter: {
    width: '100%',
    height: '15%',
    padding: 5,
    justifyContent: 'center',
    backgroundColor: '#BB2801',
  },

  ServicesFooterImage: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 75,
  },

  ServicesFooterContent: {
    fontSize: getAdjustedFontSize(20),
    fontWeight: '600',
    color: '#ffffff',
    alignSelf: 'flex-end',
    fontFamily: 'SegoeUI',
  },

  //Latest Orders

  OrdersContainer: {flex: 1},

  OrdersTitle: {
    fontSize: getAdjustedFontSize(18),
    padding: 10,
    color: '#6C6C6C',
    fontFamily: 'SegoeUI',
  },

  OrdersCard: {
    width: 280,
    height: 200,
    shadowColor: '#00000021',
    shadowOffset: {width: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: '#F8F8F8',
  },

  OrdersCardHeader: {
    width: '100%',
    height: '80%',
    padding: 10,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    justifyContent: 'space-between',
  },

  OrdersOrderLogo: {
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 0,
  },

  OrdersHeaderTitle: {
    fontSize: getAdjustedFontSize(24),
    color: '#285DB3',
    fontFamily: 'SegoeUI',
    textTransform: 'uppercase',
  },

  OrdersHeaderDate: {
    fontSize: getAdjustedFontSize(11),
    color: '#888',
    marginTop: 5,
    fontFamily: 'SegoeUI',
  },

  OrdersOrderTotal: {
    fontSize: getAdjustedFontSize(18),
    color: '#808080',
    marginTop: 15,
    fontFamily: 'SegoeUI',
  },

  OrdersPriceContainer: {marginBottom: 5, flexDirection: 'row'},

  OrdersPriceTitle: {
    fontSize: getAdjustedFontSize(24),
    color: '#808080',
    fontWeight: '600',
    fontFamily: 'SegoeUI',
  },

  OrdersPriceContent: {
    fontSize: getAdjustedFontSize(14),
    color: '#808080',
    marginTop: 10,
    marginLeft: 5,
    fontFamily: 'SegoeUI',
  },

  OrdersCardFooter: {
    width: '100%',
    height: '20%',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#23BDE4',
  },

  OrdersFooterImage: {
    width: 22,
    height: 22,
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 95,
    top: 2,
  },

  OrdersFooterContent: {
    fontSize: getAdjustedFontSize(18),
    fontWeight: '600',
    color: '#ffffff',
    alignSelf: 'flex-end',
    fontFamily: 'SegoeUI',
  },

  // Ongoing Tickets

  TicketsContainer: {flex: 1},

  TicketsTitle: {
    fontSize: getAdjustedFontSize(18),
    padding: 5,
    color: '#6C6C6C',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'SegoeUI',
  },

  TicketsCard: {
    width: 280,
    shadowColor: '#00000021',
    shadowOffset: {width: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: '#F8F8F8',
  },

  TicketsCardHeader: {
    width: '100%',
    height: '100%',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },

  TicketsLogo: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: -10,
  },

  TicketsHeaderTitle: {
    fontSize: getAdjustedFontSize(24),
    color: '#285DB3',
    fontFamily: 'SegoeUI',
    textTransform: 'uppercase',
  },

  TicketsAgentContainer: {
    width: '100%',
    height: 60,
    alignSelf: 'flex-start',
    marginTop: 15,
  },

  TicketsAgentTitle: {
    fontSize: getAdjustedFontSize(16),
    color: '#888',
    fontFamily: 'SegoeUI',
  },

  TicketsAgentContent: {
    fontSize: getAdjustedFontSize(20),
    color: '#888',
    marginTop: 10,
    fontFamily: 'SegoeUI',
  },

  TicketsLocationContainer: {
    width: '100%',
    height: '50%',
    alignSelf: 'flex-start',
    marginTop: 20,
  },

  TicketsLocationTitle: {
    fontSize: getAdjustedFontSize(16),
    color: '#888',
    fontWeight: 'bold',
  },

  TicketsLocationContent: {
    fontSize: getAdjustedFontSize(20),
    color: '#888',
    marginTop: 15,
    fontFamily: 'SegoeUI',
  },

  TicketsLocationContent2: {
    fontSize: getAdjustedFontSize(20),
    color: '#888',
    marginTop: 5,
    fontFamily: 'SegoeUI',
  },
});
