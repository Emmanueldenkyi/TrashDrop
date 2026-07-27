import { View, Text, StyleSheet, SafeAreaView, Platform, Alert, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { COLORS, SIZES } from '../src/constants/theme';
import { Button } from '../src/components/Button';
import { supabase } from '../src/utils/supabase';
import { useAuth } from '../src/contexts/AuthContext';

export default function ScheduleConfirm() {
  const { wasteType, date, time, address, notes } = useLocalSearchParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to schedule a pickup');
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.from('pickups').insert([
      {
        user_id: user.id,
        waste_type: wasteType,
        pickup_date: date,
        pickup_time: time,
        address: address,
        notes: notes,
      }
    ]);
    setIsLoading(false);

    if (error) {
      Alert.alert('Error scheduling pickup', error.message);
    } else {
      router.replace('/schedule-success');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Confirm Pickup</Text>
        <Text style={styles.subtitle}>Please review your details</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Waste Type</Text>
            <Text style={styles.value}>{wasteType || 'N/A'}</Text>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{date || 'N/A'}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>{time || 'N/A'}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{address || 'N/A'}</Text>
          </View>
          
          {notes ? (
            <>
              <View style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.label}>Notes</Text>
                <Text style={styles.value}>{notes}</Text>
              </View>
            </>
          ) : null}
        </View>

        <Button 
          title="Confirm & Schedule" 
          onPress={handleConfirm} 
          isLoading={isLoading}
          style={styles.button}
        />
        <Button 
          title="Go Back" 
          variant="outline"
          onPress={() => router.back()} 
        />
      </View>
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
    flex: 1,
    padding: SIZES.l,
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
  card: {
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
  button: {
    marginTop: SIZES.xxl,
    marginBottom: SIZES.m,
  }
});
