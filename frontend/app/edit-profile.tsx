import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { COLORS, SIZES } from '../src/constants/theme';
import { Button } from '../src/components/Button';
import { Input } from '../src/components/Input';
import { useAuth } from '../src/contexts/AuthContext';
import { supabase } from '../src/utils/supabase';

export default function EditProfile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.user_metadata?.full_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    await supabase.auth.updateUser({
      data: { full_name: formData.name, phone: formData.phone }
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backText}>‹ Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Edit Profile</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.form}>
            <Input 
              label="Name" 
              value={formData.name}
              onChangeText={(t) => setFormData({...formData, name: t})}
            />
            <Input 
              label="Email" 
              value={formData.email}
              onChangeText={(t) => setFormData({...formData, email: t})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input 
              label="Phone Number" 
              value={formData.phone}
              onChangeText={(t) => setFormData({...formData, phone: t})}
              keyboardType="phone-pad"
            />

            <Button 
              title="Save Changes" 
              onPress={handleSave} 
              style={styles.saveButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  scrollContent: {
    padding: SIZES.l,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  backButton: {
    paddingVertical: SIZES.s,
    width: 60,
  },
  backText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  placeholder: {
    width: 60,
  },
  form: {
    width: '100%',
  },
  saveButton: {
    marginTop: SIZES.xl,
  }
});
