import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-phone-number-input/react-native-input';
import metadata from 'libphonenumber-js/metadata.min.json'
import labels from 'react-phone-number-input/locale/en.json'

export default function RegistrationScreen({navigation}) {
       // If null, no SMS has been sent
      const [confirm, setConfirm] = useState(null);

      const [code, setCode] = useState('');

      const [fullName, setFullName] = useState(null);

      const [phoneNumber, setPhoneNumber] = useState(null);
      
      // Handle the button press
      async function signInWithPhoneNumber() {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
      }

      async function confirmCode() {
        try {
          await confirm.confirm(code);
        } catch (error) {
          console.log(error);
          console.log('Invalid code.');
        }
      }
      if (!confirm) {
       return (
            <View style={styles.container}>         
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <Text style={styles.title}>Chào mừng bạn đến với ATHU!</Text>
                <Text style={styles.subTitle}>Vui lòng điền một số thông tin dưới đây</Text>
                <PhoneInput
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  metadata={metadata}
                  labels={labels}
                  defaultCountry="VN"
                 />
                <TextInput
                    style={styles.input}
                    placeholder='Họ và tên'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => signInWithPhoneNumber()}>
                    <Text style={styles.buttonTitle}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        );
      }

      return (
        <>
          <TextInput value={code} onChangeText={text => setCode(text)} />
          <TouchableOpacity
                    style={styles.button}
                    onPress={() => confirmCode()}>
                    <Text style={styles.buttonTitle}>Xác nhận</Text>
          </TouchableOpacity>
        </>
      );

   
}
