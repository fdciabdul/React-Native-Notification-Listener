import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';

const requestPermission = async () => {
    await RNAndroidNotificationListener.requestPermission();
};

const MintaPermission: React.FC = () => {
    return (
        <View style={{ alignItems: 'center', padding: 20 }}>
            <TouchableOpacity
                onPress={requestPermission}
                style={{
                    backgroundColor: '#007bff',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 20, 
                    alignItems: 'center',
                    marginTop: 20
                }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Izinkan Permission Notifikasi</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MintaPermission;
