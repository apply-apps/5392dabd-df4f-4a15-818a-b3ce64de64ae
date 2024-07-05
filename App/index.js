// Filename: index.js
// Combined code from all files

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, Text, FlatList, View, Image, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

const fairyTales = [
    {
        id: '1',
        title: 'Cinderella',
        image: 'https://picsum.photos/200/300',
        description: 'Once upon a time, in a faraway kingdom, lived a kind-hearted girl named Cinderella...'
    },
    {
        id: '2',
        title: 'Snow White',
        image: 'https://picsum.photos/200/300',
        description: 'Once upon a time, in a small village, a beautiful young girl named Snow White lived...'
    },
    {
        id: '3',
        title: 'Sleeping Beauty',
        image: 'https://picsum.photos/200/300',
        description: 'Once upon a time, in a faraway land, a princess named Aurora was born...'
    }
];

const HomeScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Details', { story: item })}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={fairyTales}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    list: {
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#FFFBF0',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
});

const DetailsScreen = ({ route }) => {
    const { story } = route.params;

    return (
        <SafeAreaView style={detailsStyles.container}>
            <Image source={{ uri: story.image }} style={detailsStyles.image} />
            <Text style={detailsStyles.title}>{story.title}</Text>
            <Text style={detailsStyles.description}>{story.description}</Text>
        </SafeAreaView>
    );
};

const detailsStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
    },
});

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Fairy Tales' }} />
                <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Story Details' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}