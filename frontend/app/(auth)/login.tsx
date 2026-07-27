import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { COLORS, SIZES } from '../../src/constants/theme';
import { Button } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { supabase } from '../../src/utils/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
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
        style={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>Login to continue</Text>
        </View>

        <View style={styles.form}>
          <Input 
            label="Email or Phone" 
            placeholder="Enter email or phone"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input 
            label="Password" 
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button 
            title="Login" 
            onPress={handleLogin} 
            isLoading={isLoading}
            style={styles.loginButton}
          />

          <View style={styles.demoContainer}>
            <Text style={styles.demoText}>For Testing Purposes (Create these in Supabase):</Text>
            <View style={styles.demoButtonsRow}>
              <TouchableOpacity 
                style={styles.demoButton} 
                onPress={() => { setEmail('user@trashdrop.com'); setPassword('password123'); }}
              >
                <Text style={styles.demoButtonText}>Demo User</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.demoButton} 
                onPress={() => { setEmail('admin@trashdrop.com'); setPassword('admin123'); }}
              >
                <Text style={styles.demoButtonText}>Demo Admin</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    justifyContent: 'center',
  },
  header: {
    marginBottom: SIZES.xl,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SIZES.l,
  },
  forgotPasswordText: {
    color: COLORS.textLight,
    fontSize: 14,
  },
  loginButton: {
    marginTop: SIZES.m,
  },
  demoContainer: {
    marginTop: SIZES.xl,
    padding: SIZES.m,
    backgroundColor: '#FFF3E0',
    borderRadius: SIZES.s,
    borderWidth: 1,
    borderColor: '#FFB74D',
  },
  demoText: {
    fontSize: 12,
    color: '#E65100',
    marginBottom: SIZES.s,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  demoButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  demoButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  demoButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.xl,
  },
  signupText: {
    color: COLORS.text,
    fontSize: 14,
  },
  signupLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  }
});
