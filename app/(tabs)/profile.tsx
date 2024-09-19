import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

const Profile = () => {
  const { user, logout } = useContext(AuthContext)
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.replace('/login')
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={100} color="#007AFF" />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <View style={styles.infoContainer}>
          <InfoItem icon="call-outline" label="Phone" value={user.phone} />
          <InfoItem icon="globe-outline" label="Website" value={user.website} />
          <InfoItem icon="business-outline" label="Company" value={user.company.name} />
          <InfoItem icon="briefcase-outline" label="Catch Phrase" value={user.company.catchPhrase} />
          <InfoItem icon="location-outline" label="Address" 
            value={`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`} 
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const InfoItem = ({ icon, label, value }:any) => (
  <View style={styles.infoItem}>
    <Ionicons name={icon} size={24} color="#007AFF" />
    <View style={styles.infoText}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  username: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  infoContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 30,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Profile