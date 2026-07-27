import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { COLORS, SIZES } from '../../src/constants/theme';
import { useAuth } from '../../src/contexts/AuthContext';
import { supabase } from '../../src/utils/supabase';

export default function Profile() {
  const { user } = useAuth();

  const profileOptions = [
    { id: 'edit', title: 'Edit Profile', icon: '👤', route: '/edit-profile' },
    { id: 'addresses', title: 'Addresses', icon: '📍', route: null },
    { id: 'payment', title: 'Payment Methods', icon: '💳', route: null },
    { id: 'settings', title: 'Settings', icon: '⚙️', route: '/settings' },
    { id: 'notifications', title: 'Notifications', icon: '🔔', route: '/notifications' },
    { id: 'help', title: 'Help Center', icon: '❓', route: '/(tabs)/support' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/(auth)/login');
  };

  const displayName = user?.user_metadata?.full_name || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.email}>{user?.email || 'No email'}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {profileOptions.map((option) => (
            <TouchableOpacity 
              key={option.id} 
              style={styles.optionRow}
              onPress={() => {
                if (option.route) router.push(option.route as any);
              }}
            >
              <View style={styles.optionLeft}>
                <Text style={styles.optionIcon}>{option.icon}</Text>
                <Text style={styles.optionTitle}>{option.title}</Text>
              </View>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    marginBottom: SIZES.xxl,
    marginTop: SIZES.m,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.m,
  },
  avatarText: {
    fontSize: 40,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  optionsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.m,
    overflow: 'hidden',
    marginBottom: SIZES.xl,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 20,
    marginRight: SIZES.m,
  },
  optionTitle: {
    fontSize: 16,
    color: COLORS.text,
  },
  optionArrow: {
    fontSize: 24,
    color: COLORS.textLight,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.m,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.m,
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: SIZES.m,
  },
  logoutText: {
    fontSize: 16,
    color: COLORS.error,
    fontWeight: '600',
  }
});
