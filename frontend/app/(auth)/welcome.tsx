import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { COLORS, SIZES } from '../../src/constants/theme';
import { Button } from '../../src/components/Button';

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>TrashDrop</Text>
          <Text style={styles.subtitle}>Smart waste collection for a cleaner and greener environment.</Text>
        </View>

        <View style={styles.footer}>
          <Button 
            title="Get Started" 
            onPress={() => router.push('/(auth)/signup')} 
          />
          <Button 
            title="Log In" 
            variant="outline"
            onPress={() => router.push('/(auth)/login')} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SIZES.l,
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.s,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    paddingHorizontal: SIZES.l,
  },
  footer: {
    paddingBottom: SIZES.xl,
  }
});
