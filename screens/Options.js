import React from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const Options = () => {
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.chip}
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
      >
        <Text style={styles.chipText}>{t('change_language') || 'Default Title'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.chip}>
        <Text style={styles.chipText}>{t('sign_out') || 'Default Title'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  chip: {
    backgroundColor: 'blue',
    borderRadius: 16,
    padding: 10,
    marginVertical: 8,
    alignItems: 'center',
  },
  chipText: {
    color: 'white',
  },
});

export default Options;
