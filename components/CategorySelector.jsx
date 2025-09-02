import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Modal, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Icons from "../constants/Icons";
import { Image } from "expo-image";
export default function CategorySelector({ categories, category, onPress ,style , page }) {
    const [modalVisibility, setVisibility] = useState(false);
    const [selected, setSelected] = useState(category);

    useEffect(() => {
        setSelected(category);
    }, [category]);

    const handleSelectCategory = (item) => {
        onPress(item);
        setVisibility(false);
        setSelected(item);
    };

    const getIcon = () => {
        
    }
    return (
        <View style={style}>
            <View style={page == "project" ? styles.block : styles.blockTask }>
                <Image source={Icons[selected.icon]} style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.label}>Project Category</Text>
                    <Text style={styles.categoryName}>{selected.name}</Text>
                </View>
                <TouchableOpacity onPress={() => setVisibility(true)}>
                    <MaterialIcons name="edit" size={24} color="#007BFF" />
                </TouchableOpacity>
            </View>

            <Modal
                visible={modalVisibility}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setVisibility(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Category</Text>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.categoryItem}
                                    onPress={() => handleSelectCategory(item)}
                                >   
                                    <Image source={Icons[item.icon]} style={styles.icon} />
                                    <Text style={styles.categoryText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={() => setVisibility(false)}>
                            <Text style={styles.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        backgroundColor: "#fff",
    },blockTask:{
        flexDirection: "row",
        alignItems: "center",
        padding: 6 ,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        backgroundColor: "#fff", 
        marginVertical: 5
    },textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    label: {
        fontSize: 12,
        color: "#666",
    },
    icon:{
        width:40 ,
        height: 40    
    },
    categoryName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    categoryItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
    },
    categoryText: {
        marginLeft: 8,
        fontSize: 16,
    },
    closeButton: {
        marginTop: 12,
        textAlign: "center",
        color: "red",
    },
});
