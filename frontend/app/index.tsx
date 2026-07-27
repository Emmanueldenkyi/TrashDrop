import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { COLORS } from '../src/constants/theme';

export default function Splash() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TrashDrop</Text>
      <Link href="/welcome" style={styles.link}>Go to Welcome</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.secondary,
    fontSize: 32,
    fontWeight: 'bold',
  },
  link: {
    color: COLORS.secondary,
    marginTop: 20,
    fontSize: 16,
  },
});
