import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView,FlatList } from "react-native";
import Icon  from 'react-native-vector-icons/Ionicons';
import styles from './styles';
const photo ="https://image.thanhnien.vn/768/uploaded/thanhlongn/2019_07_02/nghe-si-viet-huong-bat-ngo-huy-show-vao-phut-chot-xin-loi-khan-gia-hu2-1557557322-width960height960_kkng.jpg";

class CartScreen extends Component { 
  render() {
      return (
           <View style={styles.container}>
	            <View style={{alignItems:"flex-start", padding:20, flexDirection:"row",height:120}}>
              	    <Image source={{uri:photo}}  style={{width:90, height:90,borderRadius:50}} />
              	   	<View>
	              	    <Text style={{paddingLeft:10,fontSize:21,fontWeight:'bold'}}>Dat Phan</Text>	
	              	    <Text style={{paddingLeft:10,fontSize:14}}>Chỉnh sửa tài khoản ></Text>	
              	    </View>
	            </View>
	           <View style={styles.menu}>
		      	   <View style={{alignItems:"flex-start",flex:3, }}> 
		           		 <Text>Bạch kim</Text>	
		           </View>
		           <View style={{alignItems:"flex-end",flex:1, paddingRight:20 }}> 
		           		<Text>560 điểm</Text>	
		           </View>
	           </View>
	            <View style={styles.menu}>
		      	   <View style={{alignItems:"flex-start",flex:3, }}> 
		           		 <Text>Ưu đãi</Text>	
		           </View>
		           <View style={{alignItems:"flex-end",flex:1, paddingRight:20 }}> 
		           		<Text>></Text>	
		           </View>
	           </View>
	           <View style={styles.menu}>
		      	   <View style={{alignItems:"flex-start",flex:3, }}> 
		           		 <Text>Danh sách cửa hàng</Text>	
		           </View>
		           <View style={{alignItems:"flex-end",flex:1, paddingRight:20 }}> 
		           		<Text>></Text>	
		           </View>
	           </View>
	           <TouchableOpacity  onPress={()=> this.props.navigation.navigate('products')}>
		           <View style={styles.menu}>
			      	   <View style={{alignItems:"flex-start",flex:3, }}> 
			           		 <Text>Danh sách sản phẩm</Text>	
			           </View>
			           <View style={{alignItems:"flex-end",flex:1, paddingRight:20 }}> 
			           		<Text>></Text>	
			           </View>
		           </View>
	           </TouchableOpacity>
               <TouchableOpacity  onPress={()=> this.props.navigation.navigate('categories')}>
	             <View style={styles.menu}>
		      	   <View style={{alignItems:"flex-start",flex:3, }}> 
		           		 <Text>Danh mục sản phẩm</Text>	
		           </View>
		           <View style={{alignItems:"flex-end",flex:1, paddingRight:20 }}> 
		           		<Text>></Text>	
		           </View>
	             </View>
	           </TouchableOpacity>
	           <View style={styles.menu}>
		      	   <View style={{alignItems:"flex-start",flex:3, }}> 
		           		 <Text>Sổ địa chỉ</Text>	
		           </View>
		           <View style={{alignItems:"flex-end",flex:1, paddingRight:20 }}> 
		           		<Text>></Text>	
		           </View>
	           </View>
           </View>
        );
    }
}
export default CartScreen