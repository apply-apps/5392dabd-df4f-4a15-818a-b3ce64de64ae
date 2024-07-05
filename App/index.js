// Filename: index.js
// Combined code from all files

import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';

const CELL_SIZE = 20;
const BOARD_SIZE = 300;

const getRandomCoordinate = () => {
    const max = BOARD_SIZE / CELL_SIZE;
    return Math.floor(Math.random() * max) * CELL_SIZE;
};

const App = () => {
    const [snake, setSnake] = useState([
        { x: 100, y: 100 }
    ]);
    const [direction, setDirection] = useState({ x: 0, y: -CELL_SIZE });
    const [food, setFood] = useState({ x: getRandomCoordinate(), y: getRandomCoordinate() });
    const [isGameOver, setIsGameOver] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp') setDirection({ x: 0, y: -CELL_SIZE });
            else if (e.key === 'ArrowDown') setDirection({ x: 0, y: CELL_SIZE });
            else if (e.key === 'ArrowLeft') setDirection({ x: -CELL_SIZE, y: 0 });
            else if (e.key === 'ArrowRight') setDirection({ x: CELL_SIZE, y: 0 });
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (!isGameOver) {
            intervalRef.current = setInterval(moveSnake, 200);
        }
        return () => clearInterval(intervalRef.current);
    }, [snake, direction, food, isGameOver]);

    const moveSnake = () => {
        let newSnake = [...snake];
        let head = { ...newSnake[0] };

        head.x += direction.x;
        head.y += direction.y;

        if (head.x < 0 || head.y < 0 || head.x >= BOARD_SIZE || head.y >= BOARD_SIZE ||
            newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
            setIsGameOver(true);
            clearInterval(intervalRef.current);
            return;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            setFood({ x: getRandomCoordinate(), y: getRandomCoordinate() });
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    };

    const resetGame = () => {
        setSnake([{ x: 100, y: 100 }]);
        setDirection({ x: 0, y: -CELL_SIZE });
        setFood({ x: getRandomCoordinate(), y: getRandomCoordinate() });
        setIsGameOver(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Snake Game</Text>
            <View style={styles.board}>
                {snake.map((segment, index) => (
                    <View key={index} style={[styles.snake, { left: segment.x, top: segment.y }]} />
                ))}
                <View style={[styles.food, { left: food.x, top: food.y }]} />
            </View>
            {isGameOver && (
                <View style={styles.gameOver}>
                    <Text style={styles.gameOverText}>Game Over</Text>
                    <Button title="Restart" onPress={resetGame} />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    board: {
        width: BOARD_SIZE,
        height: BOARD_SIZE,
        backgroundColor: '#FFF',
        borderColor: '#000',
        borderWidth: 1,
        position: 'relative',
    },
    snake: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        position: 'absolute',
        backgroundColor: 'green',
    },
    food: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        position: 'absolute',
        backgroundColor: 'red',
    },
    gameOver: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        alignItems: 'center',
    },
    gameOverText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default App;