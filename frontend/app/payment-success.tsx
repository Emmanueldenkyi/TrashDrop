import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { COLORS, SIZES } from '../src/constants/theme';
import { Button } from '../src/components/Button';

export default function PaymentSuccess() {
  const { amount, method } = useLocalSearchParams();

  const getMethodName = (id: string | string[]) => {
    switch(id) {
      case 'momo': return 'Mobile Money';
      case 'card': return 'Debit/Credit Card';
      case 'cash': return 'Cash on Pickup';
      default: return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🎉</Text>
          </View>
          <Text style={styles.title}>Payment Successful!</Text>
          <Text style={styles.subtitle}>Thank you for your payment.</Text>

          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Transaction ID</Text>
              <Text style={styles.value}>#TXR{Math.floor(Math.random() * 100000000)}</Text>
            </View>
            <View style={styles.divider} />
            
            <View style={styles.row}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.label}>Amount</Text>
              <Text style={styles.value}>{amount}</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.label}>Payment Method</Text>
              <Text style={styles.value}>{getMethodName(method)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Button 
            title="Download Receipt" 
            onPress={() => {}} 
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
    alignItems: 'center',
    paddingTop: SIZES.xxl,
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
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: SIZES.xl,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.m,
    padding: SIZES.l,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.s,
  },
  label: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SIZES.xs,
  },
  footer: {
    width: '100%',
  },
  button: {
    marginBottom: SIZES.m,
  }
});
