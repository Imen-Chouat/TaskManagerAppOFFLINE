import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, TouchableOpacity } from "react-native";
let activeTab = "home";
export default function TabBar({ style }) {
  const navigation = useNavigation();

  const tabs = [
    { name: "home", icon: "home", screen: "Home" },
    { name: "calendar", icon: "calendar", screen: "CalenderPage" },
    { name: "clipboard", icon: "clipboard", screen: "TasksPage" },
    { name: "cube", icon: "cube", screen: "ProjectsPage" },
  ];

  const handleTabPress = (tabName, screen) => {
    activeTab = tabName;
      navigation.navigate(screen);

  };

  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => handleTabPress(tab.name, tab.screen)}
          activeOpacity={0.7}
        >
          <View style={activeTab === tab.name ? styles.iconWrapperActive : styles.iconWrapper}>
            <Icon
              name={tab.icon}
              size={26}
              color={activeTab === tab.name ? "#8ecedfff" : "#0e76b3ff"}
            />
          </View>
        </TouchableOpacity>
      ))}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left:0 ,
    right:0 ,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ebebebff",
    paddingTop: 2 ,
    borderRadius: 24,
    flex:1 ,
    alignItems:"center",
    backfaceVisibility:"hidden"
  },
  iconWrapper: {
    padding: 10,
  },
  iconWrapperActive: {
    padding: 11,
    backgroundColor: "#ffffffff",
    borderRadius: 40,
    transform: [{ translateY: -16 }],
    zIndex: -1 ,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
});
/*    
, */
