import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function TaskCardCalendar({ task }) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrapper,{backgroundColor:task.underProject ?  "rgba(255, 208, 249, 1)" : "rgba(122, 174, 248, 1)"}]}>
        <Icon
          name={task.underProject ? "cube" : "clipboard"}
          size={20}
          color={task.underProject ? "#be0912ff" : "#000000ff"}
        />
      </View>

      <View style={styles.containerText}>
        <View style={styles.topRow}>
          <Text style={styles.timeText}>{task.time}</Text>
          <Text
            style={[
              styles.status,
              task.state === "Done"
                ? styles.done
                : task.state === "Ongoing"
                ? styles.ongoing
                : task.state === "Missed"
                ? styles.missed
                : styles.coming,
            ]}
          >
            {task.state}
          </Text>
        </View>

        <Text style={styles.titleText} numberOfLines={2}>
          {task.title}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 30,
    marginRight: 15,
  },
  containerText: {
    flex: 1,
    flexDirection: "column",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  timeText: {
    fontSize: 17,
    color: "#FFA600",
    fontWeight: "900",
  },
  titleText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#222",
    maxWidth: "100%",
  },
  status: {
    fontSize: 13,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    overflow: "hidden",
    textAlign: "center",
    fontWeight: "600",
  },
  done: {
    backgroundColor: "#81d69cff",
    color: "#ffffffff",
  },
  ongoing: {
    backgroundColor: "#cd36dbff",
    color: "#fff",
  },
  missed: {
    backgroundColor: "#cf0023ff",
    color: "#fff",
  },
  coming: {
    backgroundColor: "#ffd000ff",
    color: "#ffffffff",
  },
});
