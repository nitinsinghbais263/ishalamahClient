import React, {Component} from 'react';
import { ScrollView, Text, View, Image, FlatList, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from "react-native-modal";
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import i18n from '../../../lang/i18n'
import { connect } from 'react-redux';
import { imageUrl } from '../../constants/API'
import {getAdjustedFontSize} from '../../responsive/responsive';

class ProductsCategory extends Component {
  constructor(props) {
    super(props);
  }

state = {
  isModalVisible: false,
  selectedValue: i18n.t('filter.all'),
  active:0,
  data: [
    { title: i18n.t('filter.all') }
  ],
};

toggleModal = () => {
  this.setState({ isModalVisible: !this.state.isModalVisible});
};


componentDidMount() {
    this.setState(prevState => ({ data: prevState.data.concat(this.props.category) }))
}

  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);

    return (
        <View style={{flexDirection: 'row',}}>
          {/*Filter*/}

            <View style={{width: '100%',flexDirection:'row', justifyContent: 'space-between', alignItems:'center',padding:10}}>
              <View>
                <Text style={{fontSize: getAdjustedFontSize(18)}}>{i18n.t('shop.filter')}</Text>
              </View>
              <View style={{width: '60%'}}>

                <TouchableOpacity onPress={() => this.toggleModal()}>
                  <View style={{height:35, padding:10, backgroundColor: '#FFFFFF', borderRadius:5, overflow: 'hidden', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                    <View>
                      <Text style={{fontSize: getAdjustedFontSize(16)}}>{this.state.selectedValue}</Text>
                    </View>

                    <View style={{height: 10, width: 10}}>
                      <Image style={{ width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../../assets/images/drop.svg')} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

          {/*Filter*/}
          <Modal
              animationIn="fadeIn"
              animationOut="fadeOut"
              isVisible={this.state.isModalVisible}
              onBackdropPress={() => this.toggleModal()}
              backdropOpacity={0.1}>
              <View style={{ position:'absolute',top: screenHeight/6,right: -10}}>
               <View style={{}}>
                 <View style={{width: screenWidth/2+30, borderRadius: 10, padding: 10, backgroundColor: '#FFFFFF'}}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    extraData={this.state.active}
                    ItemSeparatorComponent={() => (
                        <View style={{width: '100%', height: 1, backgroundColor: "#ECECEC"}} />
                    )}
                    renderItem={ ({item: rowData, index,}) =>{
                      return(
                             <View style={{ flexDirection: 'row',}}>
                               <TouchableOpacity style={{width: '100%',paddingVertical: 10,}} onPress={() =>{ this.setState({ active: index, selectedValue: rowData.title }); this.props.selectedCategory(rowData.uuid); this.toggleModal();}}>
                                 <Text style={{fontSize: 18, color: this.state.active === index ? '#285DB3' : '#707070'}}>{rowData.title}</Text>
                               </TouchableOpacity>
                             </View>
                      )
                    }
                  }
                    keyExtractor={(item, index) => index}/>
                 </View>
               </View>
              </View>
          </Modal>
        </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.success ,
    error: state.error,
    message: state.message,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductsCategory);
