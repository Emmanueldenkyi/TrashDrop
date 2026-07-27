import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { COLORS, SIZES } from '../../src/constants/theme';
import { Button } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { supabase } from '../../src/utils/supabase';

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          phone: formData.phone,
        }
      }
    });
    
    setIsLoading(false);
    
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      router.replace('/(tabs)/');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us to get started!</Text>
          </View>

          <View style={styles.form}>
            <Input 
              label="Full Name" 
              placeholder="Enter your full name"
              value={formData.fullName}
              onChangeText={(t) => setFormData({...formData, fullName: t})}
            />
            <Input 
              label="Email" 
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(t) => setFormData({...formData, email: t})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input 
              label="Phone Number" 
              placeholder="Enter your phone number"
              value={formData.phone}
              onChangeText={(t) => setFormData({...formData, phone: t})}
              keyboardType="phone-pad"
            />
            <Input 
              label="Password" 
              placeholder="Create a password"
              value={formData.password}
              onChangeText={(t) => setFormData({...formData, password: t})}
              secureTextEntry
            />
            <Input 
              label="Confirm Password" 
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChangeText={(t) => setFormData({...formData, confirmPassword: t})}
              secureTextEntry
            />

            <Button 
              title="Sign Up" 
              onPress={handleSignUp} 
              style={styles.signupButton}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SIZES.l,
    justifyContent: 'center',
  },
  header: {
    marginBottom: SIZES.xl,
    marginTop: SIZES.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  form: {
    width: '100%',
  },
  signupButton: {
    marginTop: SIZES.l,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.xl,
    marginBottom: SIZES.xl,
  },
  loginText: {
    color: COLORS.text,
    fontSize: 14,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  }
});
