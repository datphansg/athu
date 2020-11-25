import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-phone-number-input/react-native-input';
import metadata from 'libphonenumber-js/metadata.min.json'
import labels from 'react-phone-number-input/locale/en.json'

export default function UpdateProfileScreen({navigation}) {     
    const [displayName, setDisplayName] = useState('');

    async function updateProfile() {
            const update = {
        displayName: displayName
      };
      await auth().currentUser.updateProfile(update);
      console.log(displayName);
    }
    return (
          <View style={styles.container}> 
              <Text style={styles.title}>Họ và tên</Text>              
              <TextInput
                  style={styles.input}
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setDisplayName(text)}
                  value={displayName}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
              />                
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => updateProfile()}>
                  <Text style={styles.buttonTitle}>Lưu</Text>
              </TouchableOpacity>
          </View>
      );
}
