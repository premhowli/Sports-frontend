import { StyleSheet, Text } from 'react-native';

export const getTabBarIcon =
  (route: {name: string}) =>
  ({focused}: {focused: boolean; color: string; size: number}) => {
    let icon: string;
    switch (route.name) {
      case 'Games':
        icon = '🎲';
        break;
      case 'Profile':
        icon = '👤';
        break;
      default:
        icon = '';
    }
    return (
      <Text style={[focused ? styles.activeOpacity : styles.inactiveOpacity]}>
        {icon}
      </Text>
    );
  };

  const styles = StyleSheet.create({
  activeOpacity: {
    opacity: 1,
  },
  inactiveOpacity: {
    opacity: 0.5,
  },
});
