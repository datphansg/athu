import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Alert,FlatList, StatusBar, Dimensions } from "react-native";
import { Block, Text, theme } from 'galio-framework';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Icon  from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import auth from '@react-native-firebase/auth';
const photo ="https://image.thanhnien.vn/768/uploaded/thanhlongn/2019_07_02/nghe-si-viet-huong-bat-ngo-huy-show-vao-phut-chot-xin-loi-khan-gia-hu2-1557557322-width960height960_kkng.jpg";
const STORES = require('./stores.json');
const { width, height } = Dimensions.get('screen');
import { PERMISSIONS, checkMultiple , requestMultiple, RESULTS } from 'react-native-permissions'
import { Category } from '../../components/';
const spacing = 10;
class HomeScreen extends Component { 
    constructor(props) {
    super(props);
    this.state={        
        customerName :''
    }
  }  
  componentDidMount() {
     this.checkPermissions(); 
  }
  onPress(id)
  {  
    this.props.navigation.navigate('shop');
  }
  checkPermissions(){
    console.log('Platform.OS' + Platform.OS);
    const iosPermissions = [PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE];
    const androidPermissions = [
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    ];
    
    checkMultiple(
      Platform.OS === 'ios' ? iosPermissions : androidPermissions,
      ).then((statuses) => {
        const [FINE_LOCATION, COARSE_LOCATION] = Platform.OS === 'ios' ? iosPermissions : androidPermissions;
      if (        statuses[FINE_LOCATION] === RESULTS.UNAVAILABLE || statuses[COARSE_LOCATION] === RESULTS.UNAVAILABLE ) 
      {
        console.log(
          'Hardware to support video calls is not available',
        );
      } else if (
        statuses[FINE_LOCATION] === RESULTS.BLOCKED ||
        statuses[COARSE_LOCATION] === RESULTS.BLOCKED
      ) 
      {
        console.log(
          'Permission to access hardware was blocked, please grant manually',
        );
      } else 
      {
        if (
          statuses[FINE_LOCATION] === RESULTS.DENIED &&
          statuses[COARSE_LOCATION] === RESULTS.DENIED
        ) {
          requestMultiple(
            Platform.OS === 'ios' ? iosPermissions : androidPermissions,
          ).then((newStatuses) => {
            if (
              newStatuses[FINE_LOCATION] === RESULTS.GRANTED &&
              newStatuses[COARSE_LOCATION] === RESULTS.GRANTED
            ) {
              //callback && callback();
            } else {
              console.log('One of the permissions was not granted');
            }
          });
        } else if (
          statuses[FINE_LOCATION] === RESULTS.DENIED ||
          statuses[AUDIO] === RESULTS.DENIED
        ) {
          request(statuses[FINE_LOCATION] === RESULTS.FINE_LOCATION ? FINE_LOCATION : COARSE_LOCATION).then(
            (result) => {
              if (result === RESULTS.GRANTED) {
               // callback && callback();
              } else {
                console.log('Permission not granted');
              }
            },
          );
        } else if (
          statuses[FINE_LOCATION] === RESULTS.GRANTED ||
          statuses[COARSE_LOCATION] === RESULTS.GRANTED
        ) {
          //callback && callback();
        }
      }
    });
  };
  renderStore = ({item}) => (
    <TouchableOpacity   onPress={()=>this.onPress(item.id)}>
      <View style={styles.listItem}>
        <Image source={{uri:photo}}  style={{width:90, height:90,borderRadius:30}} />
        <View style={{alignItems:"center",flex:1, padding:10}}>
          <Text style={{fontWeight:"bold"}}>{item.name}</Text>
          <Text>{item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  _renderItem = ({item, index}) => {
        return (
            <View style={styles.slide}>
                <Image   source={{uri:item.id}}  style={{width:width, height:200,borderRadius:5}} />
            </View>
        );
  }
  get pagination () {
        return (
           <Pagination
              dotsLength={STORES.length}
              containerStyle={{backgroundColor:'rgba(0,0,0, 0.1)',width}}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }
  render() {
      return (
           <View style={styles.container}>
             <StatusBar backgroundColor="#3B5998" />
             <Carousel  autoplay={true}
              ref={(c) => { this._carousel = c; }}
              data={STORES}
              renderItem={this._renderItem}
              sliderWidth={width}
              itemWidth={width}
               onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            />   
            <Block style={{height:45, width:width- 15, flexDirection:'row', alignItems:'center', backgroundColor:'#FF9C09'}}>
                 <View style={{height:45, width:45,  justifyContent:'center',alignItems:'center'}}>
                     <Icon name="rocket" size={24} color="#900" />
                 </View>
                 <Text style={{marginHorizontal:5,color:'white'}}>139 Pastuer Phường 6, Quận 3, Hồ Chí Minh</Text>
            </Block>
            <FlatList
                contentContainerStyle={{justifyContent: 'center'}}
                numColumns={2}
                data={STORES}                     
                renderItem={({ item, index, separators }) => (<Category product ={item} />)}
                horizontal={false} />
           </View>
        );
    }
}
export default HomeScreen