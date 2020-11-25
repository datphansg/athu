import React, {  useState } from "react";
import { Dimensions , View, Image, TouchableOpacity, ScrollView,FlatList, StatusBar } from "react-native";
import {  Block, Text, Input, theme } from 'galio-framework';

import Icon  from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import InputSpinner from "react-native-input-spinner";
import NumberFormat from 'react-number-format';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import geohash from "ngeohash";
import { Product, Button } from '../../components/';
const spacing = 10;
const { width, height } = Dimensions.get('screen');

const Categories = require('./categories.json')
const photo ="https://image.thanhnien.vn/768/uploaded/thanhlongn/2019_07_02/nghe-si-viet-huong-bat-ngo-huy-show-vao-phut-chot-xin-loi-khan-gia-hu2-1557557322-width960height960_kkng.jpg";

import { getProducts , getProductsWithCategoryId, addToCart, subQuantity, addQuantity , setAddress} from '../../redux/actions/cartActions';
import { connect } from 'react-redux';

class ShopScreen extends React.Component {   
  constructor(props) {
    super(props);
    this.state = {
            latitude: 0,
            longitude: 0,
            error: null,
            Address: null
        }
    Geocoder.init("AIzaSyCCl0H-g0ZBUcZnICjHa49I2S3f2oPHqS8",{language : "en"});
    Geolocation.getCurrentPosition(info => console.log(info));
    Geolocation.watchPosition(this.success,this.error);
  }  
  success(pos) {
      var crd = pos.coords;
  }
  async componentDidMount() {
    this.getAddressLocation();
    await this.props.getProducts();      
  }
  getAddressLocation()
  {
     Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });              
              
                const currentgeo = geohash.encode(this.state.latitude,this.state.longitude);
              
                Geocoder.from(position.coords.latitude, position.coords.longitude)
                  .then(json => {
                        var addressComponent = json.results[0].formatted_address;
                        this.setState({
                           Address: addressComponent
                        })
                        this.props.navigation.setOptions({
                           headerTitle: this.state.Address,
                        });
                        this.setShipToAddress(addressComponent);
                      })
                  .catch(error => console.warn(error));
            },
            (error) => {
                this.setState({
                        error: error.message
                    }),
                    console.log(error.code, error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 100000
            }
        );
  }
  async selectCategory(id)
  {
     await this.props.getProductsWithCategoryId(id);  
  }
  buyItem(item)
  {
    this.props.addToCart(item);
  }
  onDecrease(item)
  {   
    this.props.subQuantity(item);
  }
  onIncrease(item)
  {
     this.props.addQuantity(item);
  }
  gotoCart()
  {
     this.props.navigation.navigate('cart');
  }
  setShipToAddress(address)
  {
     this.props.setAddress(address);
  }
  renderStore = ({item}) => (
      <TouchableOpacity onPress={()=>this.selectCategory(item.categoryId)}>
          <View style={styles.category}>
            <Image source={{uri:photo}}  style={{width:90, height:90,borderRadius:10}} />
            <View style={{alignItems:"center",flex:1}}>
              <Text style={{fontWeight:"bold"}}>{item.name}</Text>
            </View>
          </View>
      </TouchableOpacity>
  );
  
   gotoCartButton = (totalQuantity, totalAmount) => {
        if (totalQuantity > 0) 
        {
            return (
                 <View style={[styles.cartButton]}>
                    <View style={[styles.cAmount]}>
                      <NumberFormat value={totalAmount} displayType={'text'} thousandSeparator={true}  renderText={value => <Text style={{margin:10, fontWeight:'bold'}}>{value}</Text>}  />
                    </View>
                    <TouchableOpacity onPress={()=>this.gotoCart()} style={styles.vButton}>
                        <View >                      
                            <Text style={{color:'white'}}> Giỏ hàng </Text>
                        </View>
                    </TouchableOpacity>
                 </View>
               
            );
        } 
        else 
        {
            return null;
        }
    };

  render() {
      return (
           <View style={styles.container}>
             <StatusBar barStyle="light-content" />
             <View style={styles.categories}>
                <FlatList
                  data={Categories}
                  horizontal={true}
                  ref={(ref) => { this.flatListRef = ref; }}
                  keyExtractor={item => item.id.toString()}
                  showsHorizontalScrollIndicator={false}
                  renderItem={this.renderStore}
                 />      
              </View>
              <Block flex row>
                  <FlatList
                    data={this.props.products}                 
                    ref={(ref) => { this.flatListRef = ref; }}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index, separators }) => (<Product product ={item} style={{ margin: 5 }}  />)}
                    numColumns={2}
                    columnWrapperStyle={styles.column}
                   />    
              </Block> 
               {this.gotoCartButton(this.props.totalQuantity,this.props.totalAmount)}                 
           </View>
          
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.cart.products,
    totalQuantity : state.cart.totalQuantity,
    totalAmount: state.cart.totalAmount,
    address: state.cart.address
})

export default connect(mapStateToProps, { getProducts, getProductsWithCategoryId, addToCart, subQuantity, addQuantity, setAddress })(ShopScreen);