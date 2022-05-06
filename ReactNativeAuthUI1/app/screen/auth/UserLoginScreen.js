import { View, Text, Button, TextInput, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, toastConfig } from '../../../style';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
// import Checkbox from 'expo-checkbox';

import { useLoginUserMutation } from '../../../services/userAuthApi';

import { storeToken } from '../../../services/AsyncStorageService';

const UserLoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const clearTextInput = () => {
    setEmail('')
    setPassword('')
  }
  const navigation = useNavigation()

  const [loginUser] = useLoginUserMutation()

  const handleFormSubmit = async () => {
    const formData = {email, password}
    const res = await loginUser(formData)
    if (res.data) {
      // console.log("Response Data", res.data)
      await storeToken(res.data)  // Store Token in Storage
      clearTextInput()
      navigation.navigate('UserPanelTab')
    }
    if (res.error) {
      // console.log("Response Error", res.error.data.errors)
      Toast.show({
        type: 'warning',
        position: 'top',
        topOffset: 0,
     
        ...(res.error.data.errors.email ? { text1: res.error.data.errors.email[0] } : ''),
        ...(res.error.data.errors.password ? { text1: res.error.data.errors.password[0] } : ''),
        ...(res.error.data.errors.non_field_errors ? { text1: res.error.data.errors.non_field_errors[0] } : '')
      })
    }
  }
  return (
    <SafeAreaView>
      <Toast config={toastConfig} />
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={{ marginHorizontal: 30 }}>
          <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Write Your Email" keyboardType='email-address' />
          </View>
          <View style={styles.inputWithLabel}>
            <Text style={styles.labelText}>Password</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Write Your Password" secureTextEntry={true} />
          </View>
          {/* <View style={{ flex: 1, flexDirection: 'row' }}>
            <Checkbox value={tc} onValueChange={setTc} color={tc ? '#4630EB' : undefined} />
            <Text style={styles.labelText}>I agree to term and condition.</Text>
          </View> */}
          <View style={{ width: 200, alignSelf: 'center', margin: 20 }}>
            <Button title='Join' onPress={handleFormSubmit} color='purple' />
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableWithoutFeedback onPress={() => { navigation.navigate('Registration') }}>
              <Text style={{ fontWeight: 'bold' }}>Not Registered ? Register</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ alignSelf: 'center', marginBottom: 10 }}>
            <MaterialIcon name='shopping-bag' color='purple' size={100} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserLoginScreen