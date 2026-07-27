import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { COLORS, SIZES } from '../src/constants/theme';
import { Button } from '../src/components/Button';
import { Input } from '../src/components/Input';

export default function Schedule() {
  const [wasteType, setWasteType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const handleConfirm = () => {
    router.push({
      pathname: '/schedule-confirm',
      params: { wasteType, date, time, address, notes }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Schedule Pickup</Text>
        
        <View style={styles.form}>
          <Input 
            label="Waste Type" 
            placeholder="e.g. Plastic, General Waste"
            value={wasteType}
            onChangeText={setWasteType}
          />
          <Input 
            label="Pickup Date" 
            placeholder="DD/MM/YYYY"
            value={date}
            onChangeText={setDate}
          />
          <Input 
            label="Pickup Time" 
            placeholder="HH:MM AM/PM"
            value={time}
            onChangeText={setTime}
          />
          <Input 
            label="Pickup Address" 
            placeholder="Enter full address"
            value={address}
            onChangeText={setAddress}
          />
          <Input 
            label="Additional Notes (Optional)" 
            placeholder="Gate code, instructions..."
            value={notes}
            onChangeText={setNotes}
            multiline
            style={{ height: 80, textAlignVertical: 'top' }}
          />

          <Button 
            title="Next Step" 
            onPress={handleConfirm} 
            style={styles.button}
          />
        </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.xl,
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: SIZES.xl,
  }
});
