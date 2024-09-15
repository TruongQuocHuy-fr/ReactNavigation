import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../utility/colors';

const DetailListItem = ({ icon, title, subtitle, onPress }) => {
  return (
    <TouchableOpacity style={styles.borderContainer} onPress={onPress}>
      <View style={styles.wrapper}>
        {icon && (
          <Icon
            name={icon}
            size={24}
            style={{
              color: colors.black,
              marginRight: 20,
            }}
          />
        )}
        <View style={styles.contentContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

DetailListItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  borderContainer: {
    paddingLeft: 24,
  },
  wrapper: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 24,
    borderBottomColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 6,
  },
  subtitle: {
    color: 'black',
  },
});

export default DetailListItem;
