import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './assets/style';
interface NotificationItem {
    title: string;
    text: string;
    time: string;
  }
export default function MainScreen() {
  const [serverUrl, setServerUrl] = useState('');
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem('notifications');
      const allNotifications = storedNotifications
        ? JSON.parse(storedNotifications)
        : [];
      setNotifications(allNotifications.reverse().slice(0, 5));
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleSaveServerUrl = async () => {
    try {
      await AsyncStorage.setItem('serverUrl', serverUrl);
      Alert.alert('Success', 'Server URL saved successfully');
    } catch (error) {
      console.error('Error saving server URL:', error);
    }
  };

  useEffect(() => {
    loadNotifications();
  })
  const renderNotification = ({ item }: { item: NotificationItem }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationText}>{item.text}</Text>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Server URL for Notification Forwarding</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter server URL"
        placeholderTextColor="#888"
        value={serverUrl}
        onChangeText={setServerUrl}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveServerUrl}>
        <Text style={styles.buttonText}>Save URL</Text>
      </TouchableOpacity>
      
      <Text style={styles.sectionTitle}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderNotification}
        contentContainerStyle={styles.notificationList}
      />
    </View>
  );
}
