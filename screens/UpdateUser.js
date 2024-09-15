import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

const UpdateUser = ({ route, navigation }) => {
  const { user, setUser } = route.params; 

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const { t } = useTranslation();

  const handleUpdate = () => {
    const updatedUser = { ...user, name, phone };
    if (setUser) {
      setUser(updatedUser);
    }
    Alert.alert(t('success'), t('update-success'));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('name')}:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>{t('phone')}:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />
      <Button title={t('update')} onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});

export default UpdateUser;
