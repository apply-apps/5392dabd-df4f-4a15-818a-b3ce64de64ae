// Filename: index.js
import React from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, View, Image } from 'react-native';

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

const FairyTales = () => {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    return (
        <FlatList
            data={fairyTales}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
        />
    );
};

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerTitle}>Fairy Tales for Kids</Text>
            <FairyTales />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
    description: {
        marginTop: 10,
        fontSize: 16,
    },
});