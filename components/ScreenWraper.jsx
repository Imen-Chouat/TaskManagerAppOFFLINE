import React from "react";
import { View , StyleSheet } from "react-native";
import Background from "./Background.jsx";

export default function ScreenWraper({children}) {
    return (
        <View style={styles.container}>
            <Background/>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // base color
  },
  content: {
    flex: 1,
    padding: 20,
    zIndex: 1,
  },
});