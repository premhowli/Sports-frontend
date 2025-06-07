import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

interface ButtonProp {
  text: string;
  onPress?: () => void;
  disabled: boolean;
  showLoader?: boolean;
}

const Button: React.FC<ButtonProp> = ({
  text,
  onPress,
  disabled,
  showLoader = false,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => {
          onPress && onPress();
        }}
        disabled={disabled}
        activeOpacity={0.8}>
        {showLoader ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <Text style={[styles.buttonText]}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 14,
    marginVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  buttonText: {fontSize: 16, fontWeight: '600', color: '#000'},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Button;
