import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { COLORS, SIZES } from '../src/constants/theme';
import { Button } from '../src/components/Button';

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState('');
  
  // Hardcoded for demo purposes based on design document
  const amount = "GHS 30.00";

  const paymentMethods = [
    { id: 'momo', title: 'Mobile Money', icon: '📱' },
    { id: 'card', title: 'Debit/Credit Card', icon: '💳' },
    { id: 'cash', title: 'Cash on Pickup', icon: '💵' },
  ];

  const handlePayment = () => {
    if (!selectedMethod) return;
    router.push({
      pathname: '/payment-success',
      params: { amount, method: selectedMethod }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Payment</Text>
        <Text style={styles.subtitle}>Select a payment method</Text>

        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Amount to Pay</Text>
          <Text style={styles.amountValue}>{amount}</Text>
        </View>

        <View style={styles.methodsContainer}>
          {paymentMethods.map((method) => (
            <TouchableOpacity 
              key={method.id} 
              style={[
                styles.methodCard,
                selectedMethod === method.id && styles.methodCardSelected
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.methodInfo}>
                <Text style={styles.methodIcon}>{method.icon}</Text>
                <Text style={styles.methodTitle}>{method.title}</Text>
              </View>
              <View style={[
                styles.radio,
                selectedMethod === method.id && styles.radioSelected
              ]} />
            </TouchableOpacity>
          ))}
        </View>

        <Button 
          title="Pay Now" 
          onPress={handlePayment} 
          disabled={!selectedMethod}
          style={styles.button}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  container: {
    padding: SIZES.l,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: SIZES.xl,
    marginTop: 4,
  },
  amountCard: {
    backgroundColor: COLORS.primary,
    padding: SIZES.xl,
    borderRadius: SIZES.m,
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  amountLabel: {
    color: COLORS.secondary,
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 4,
  },
  amountValue: {
    color: COLORS.secondary,
    fontSize: 32,
    fontWeight: 'bold',
  },
  methodsContainer: {
    marginBottom: SIZES.xl,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    padding: SIZES.l,
    borderRadius: SIZES.m,
    marginBottom: SIZES.m,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  methodCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#F1F8F1',
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    fontSize: 24,
    marginRight: SIZES.m,
  },
  methodTitle: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  radioSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    borderWidth: 5,
  },
  button: {
    marginTop: 'auto',
  }
});
