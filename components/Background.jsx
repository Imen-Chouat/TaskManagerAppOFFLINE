import { BlurView } from "expo-blur";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function Background() {
    return (
        <View style={StyleSheet.absoluteFill}>
            {circles.map((circle, index) => (
                <View 
                    key={index} 
                    style={[
                        styles.circleContainer, 
                        {
                            width: circle.size,
                            height: circle.size,
                            top: circle.top,
                            left: circle.left
                        }
                    ]}
                >
                    <BlurView
                        intensity={15} // Adjust blur intensity (0-100)
                        tint="light" // "light", "dark", "default", or "extraLight"
                        style={[
                            styles.blurCircle,
                            {
                                backgroundColor: circle.color,
                            }
                        ]}
                    />
                </View>
            ))}
        </View>
    );
}

const circles = [
    { size: 68, color: 'rgba(96, 255, 91, 0.10)', top: -10, left: -15 },
    { size: 180, color: 'rgba(164, 248, 192, 0.10)', top: 20, left: 30 },
    { size: 50, color: 'rgba(183, 226, 255, 0.1)', top: 160, left: 210 },
    { size: 190, color: 'rgba(122, 234, 253, 0.10)', top: -60, left: 250 },
    { size: 100, color: 'rgba(122, 234, 253, 0.10)', top: 190, left: 280 },
    { size: 100, color: 'rgba(157, 255, 239, 0.11)', top: 210, left: 140 },
    { size: 100, color: 'rgba(145, 255, 178, 0.10)', top: 290, left: 10 },
    { size: 50, color: 'rgba(118, 250, 250, 0.10)', top: 370, left: 110 },
    { size: 160, color: 'rgba(151, 250, 142, 0.10)', top: 320, left: 210 },
    { size: 110, color: 'hsla(187, 100.00%, 73.10%, 0.10)', top: 500, left: 70 },
    { size: 130, color: 'rgba(0, 200, 83, 0.10)', top: 620, left: -15 },
    { size: 150, color: 'rgba(123, 202, 255, 0.1)', top: 550, left: 200 },
    { size: 50, color: 'rgba(145, 255, 178, 0.10)', top: 490, left: 10 },
    { size: 30, color: 'rgba(145, 255, 178, 0.10)', top: 390, left: 50 },
    { size: 30, color: 'rgba(177, 117, 255, 0.1)', top: 760, left: -10 },
    { size: 130, color: 'rgba(122, 255, 117, 0.1)', top: 750, left: 150 },
];

const styles = StyleSheet.create({
    circleContainer: {
        position: 'absolute',
        borderRadius: 1000,
        overflow: 'hidden', // This is crucial for the blur effect
    },
    blurCircle: {
        flex: 1,
        borderRadius: 1000,
    }
});