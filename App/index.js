// Filename: index.js
// Combined code from all files

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View } from 'react-native';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import axios from 'axios';

const CLIENT_ID = 'YOUR_CLIENT_ID';
const DISCOVERY = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
};

const App = () => {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['https://www.googleapis.com/auth/fitness.activity.read'],
      redirectUri: makeRedirectUri({ useProxy: true }),
    },
    DISCOVERY
  );

  const [accessToken, setAccessToken] = useState(null);
  const [healthData, setHealthData] = useState(null);

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      setAccessToken(authentication.accessToken);
    }
  }, [response]);

  const getHealthData = async () => {
    if (!accessToken) return;

    try {
      const res = await axios.get('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          aggregateBy: [{ dataTypeName: 'com.google.step_count.delta' }],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: new Date().setHours(0, 0, 0, 0),
          endTimeMillis: new Date().getTime(),
        },
      });
      setHealthData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Google Health Data</Text>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => promptAsync()}
      />
      {accessToken && (
        <Button title="Fetch Health Data" onPress={getHealthData} />
      )}
      {healthData && (
        <View style={styles.dataContainer}>
          <Text>Health Data:</Text>
          <Text>{JSON.stringify(healthData, null, 2)}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  dataContainer: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 8,
  },
});

export default App;