import React, { Component, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Button, TextInput, Picker } from "react-native";
import Icon  from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker'
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
var uuid = require('react-native-uuid');
import { utils } from '@react-native-firebase/app';
import { useForm, Controller } from "react-hook-form";

export default function  AddingCategoryScreen({navigation}) { 
  const { control, handleSubmit, errors } = useForm();
  const   onSubmit = async data => {
     firestore()
          .collection('Category')
          .add({
            'name':data.name,
           })
          .then(() => {
             navigation.navigate('categories');
      });
  }
  return (
     <View style={styles.container}>
        <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%', }}
                keyboardShouldPersistTaps="always">
                  <View style={styles.row}>
            <Text style={styles.lable}>Tên danh mục</Text>
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
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.name && <Text  style={styles.errors}>This is required.</Text>}
            </View>                   
            <TouchableOpacity style={{width:'100%',  alignItems:"center", height:100}} onPress={handleSubmit(onSubmit)}> 
               <View style={styles.button}>
                 <Text style={styles.text}>LƯU</Text>
               </View>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
}