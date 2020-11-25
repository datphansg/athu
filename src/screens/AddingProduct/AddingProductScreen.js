import React, { Component, useState, useEffect  } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Button, TextInput } from "react-native";
import {Picker} from '@react-native-community/picker';
import Icon  from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker'
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
var uuid = require('react-native-uuid');
import { utils } from '@react-native-firebase/app';
import { useForm, Controller } from "react-hook-form";


export default function  AddingProductScreen({navigation}) { 
  const [picture, setPicture] = useState();
  const [photo,setPhoto] = useState();
  const [isDisable, setIsDisable] = useState();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // Update the document title using the browser API
    let array = [];
    const subscriber = firestore()
    .collection('Category')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          let obj = doc.data();
          obj ={...obj,'id':doc.id};  
          array.push(obj);            
      });
      setCategories(array);
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
      //this.setState({ products: array });
    });
  },[]);
  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log(response);
      if (response.uri) {
          setPicture(response);      
          console.log(response)   
          switch(response.type) {
                case 'image/jpeg':
                  setPhoto('images/'+uuid.v4()+'.jpg')
                  break; 
          }
          console.log(photo);
        }
    });
  };
  //myUsers =  categories.map((myValue,myIndex)=> {
  //  return(
  //    <Picker.Item label={myValue.name} value={myValue.id}/>
  //  )   
  //});
  const { control, handleSubmit, errors } = useForm();
  const   onSubmit = async data => {
    //console.log('babba');
    //setIsDisable(true);
    if(picture != null)
    {
        console.log(picture.path);
        console.log(data);
        let imagesRef = storage().ref(photo); 
        await imagesRef.putFile(picture.path).then(snapshot => {          
        });
        const url = await storage().ref(photo).getDownloadURL();
        console.log('url'+ url);
        firestore()
          .collection('Products')
          .add({
            'code':data.code,
            'name':data.name,
            'price':data.price,
            'category':data.category,
            'photo':url})
          .then(() => {
             navigation.navigate('products');
          });
    }
    //setIsDisable(false);
  }
  return (
     <View style={styles.container}>
        <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%', }}
                keyboardShouldPersistTaps="always">
                  <View style={styles.row}>
            <Text style={styles.lable}>Mã sản phẩm</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name="code"              
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.code && <Text  style={styles.errors}>This is required.</Text>}
            </View>
            <View style={styles.row}>
              <Text  style={styles.lable}>Tên sản phẩm</Text>        
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
                name="name"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.name && <Text  style={styles.errors}>This is required.</Text>}      
            </View>
             <View style={styles.row}>
              <Text  style={styles.lable}>Giá</Text>        
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    keyboardType='numeric'
                  />
                )}
                name="price"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.price && <Text>This is required.</Text>}      
            </View>
              <View style={styles.row}>
              <Text  style={styles.lable}>Danh mục sản phẩm</Text> 
               <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                 <Picker
                    style={{ height: 50, width: 150 }}
                    selectedValue={value}
                    onValueChange={(value, itemIndex) => onChange(value)}>                 
                    {
                      categories.map((myValue,myIndex)=> {
                          console.log("Error getting documents: ");
                        return(
                         <Picker.Item label={myValue.name} value={myValue.id} key={myIndex}/>
                        )   
                      })
                    }
                  </Picker>   
                )}
                name="category"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.category && <Text>This is required.</Text>} 
            </View>
            {picture && (
                <TouchableOpacity style={{width:'100%',  alignItems:"center"}} onPress={()=> handleChoosePhoto()}>
                   <View style={[styles.photos]}>
                      <Image
                        source={{ uri: picture.uri }}
                        style={{ width: 120, height: 120}}
                      />
                  </View>
                </TouchableOpacity>
              )}   
              {!picture && (
                <TouchableOpacity  style={{width:'100%',  alignItems:"center"}} onPress={()=> handleChoosePhoto()}>
                  <View style={styles.photos}>
                   <Text>Chọn hình sản phẩm</Text>
                </View>
                </TouchableOpacity>
              )} 
             <TouchableOpacity style={{width:'100%',  alignItems:"center", height:100}} onPress={handleSubmit(onSubmit)}> 
               <View style={styles.button}>
                 <Text style={styles.text}>LƯU</Text>
               </View>
             </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
}