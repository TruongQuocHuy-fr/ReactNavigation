import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import DetailListItem from '../components/DetailListItem'; 
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const Options = () => {
  const { t , i18n} = useTranslation();

  return (
    <View style={styles.container}>
      {/* <DetailListItem title={t('update_profile') || 'Default Title'} /> */}
      <DetailListItem 
        title={t('change_language') || 'Default Title'} 
        onPress={() => {
          Alert.alert(
            t('select_language'), 
            t('choose_language'),
            [
              {
                text: 'English',
                onPress: () => i18n.changeLanguage('en'),
              },
              {
                text: 'Tiếng Việt',
                onPress: () => i18n.changeLanguage('vi'),
              },
            ]
          );
        }}
      />
      <DetailListItem title={t('sign_out') || 'Default Title'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Options;
