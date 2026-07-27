import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { COLORS, SIZES } from '../src/constants/theme';
import { Button } from '../src/components/Button';

export default function ScheduleSuccess() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>✅</Text>
          </View>
          <Text style={styles.title}>Pickup Scheduled!</Text>
          <Text style={styles.subtitle}>Your waste pickup has been scheduled successfully. We will notify you when the collector is on the way.</Text>
        </View>

        <View style={styles.footer}>
          <Button 
            title="View Pickup History" 
            onPress={() => router.replace('/(tabs)/history' as any)} 
            style={styles.button}
          />
          <Button 
            title="Back to Home" 
            variant="outline"
            onPress={() => router.replace('/(tabs)/')} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: SIZES.l,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.l,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.s,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: SIZES.l,
  },
  footer: {
    width: '100%',
  },
  button: {
    marginBottom: SIZES.m,
  }
});
