import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../src/constants/theme';
import { router } from 'expo-router';

export default function Settings() {
  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>‹ Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionTitle}>Appearance</Text>
            <View style={styles.optionRight}>
              <Text style={styles.optionValue}>System Default</Text>
              <Text style={styles.optionArrow}>›</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionTitle}>Language</Text>
            <View style={styles.optionRight}>
              <Text style={styles.optionValue}>English</Text>
              <Text style={styles.optionArrow}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.dangerContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
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
  optionTitle: {
    fontSize: 16,
    color: COLORS.text,
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionValue: {
    fontSize: 14,
    color: COLORS.textLight,
    marginRight: SIZES.s,
  },
  optionArrow: {
    fontSize: 20,
    color: COLORS.textLight,
  },
  dangerContainer: {
    marginTop: 'auto',
  },
  logoutButton: {
    backgroundColor: COLORS.surface,
    padding: SIZES.m,
    borderRadius: SIZES.m,
    alignItems: 'center',
    marginBottom: SIZES.m,
  },
  logoutText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: COLORS.surface,
    padding: SIZES.m,
    borderRadius: SIZES.m,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  deleteText: {
    fontSize: 16,
    color: COLORS.error,
    fontWeight: '600',
  }
});
