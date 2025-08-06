import React , {useState , useEffect } from "react";
import { StyleSheet , View , TouchableOpacity , ScrollView , Text} from "react-native";
import moment from "moment";

export default function CalendarStrip({ onDateSelect , style }){
   const [selectedDate,setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
   const [dates , setDates ]=useState([]);
    useEffect(()=>{
        const today = moment();
        const tempDates = [] ;
        for(let i = -2 ; i <= 10 ; i++ ){
            const date = moment(today).add(i,"days");
            tempDates.push({
                full: date.format("YYYY-MM-DD"),
                day: date.format("DD"),
                weekday: date.format("ddd"),
                month: date.format("MMM")
            });
        }
        setDates(tempDates);
    },[]);
    const handleSelect = (date) => {
         setSelectedDate(date.full);
        if (onDateSelect) onDateSelect(date.full);
    }
     return (
    <View style={[{ marginVertical: 10 },style]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dates.map((date) => {
          const isSelected = date.full === selectedDate;
          return (
            <TouchableOpacity key={date.full} onPress={() => handleSelect(date)}>
              <View style={[styles.dateContainer, isSelected && styles.selectedDate]}>
                <Text style={[styles.monthText, isSelected && styles.selectedText]}>{date.month}</Text>
                <Text style={[styles.dayText, isSelected && styles.selectedText]}>{date.day}</Text>
                <Text style={[styles.weekdayText, isSelected && styles.selectedText]}>{date.weekday}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

}
const styles = StyleSheet.create({
  dateContainer: {
    alignItems: "center",
    padding: 10,
    marginHorizontal: 6,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: 70,
  },
  selectedDate: {
    backgroundColor: "#5E3CF1", // purple background
  },
  monthText: {
    fontSize: 12,
    color: "#777",
  },
  dayText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
  weekdayText: {
    fontSize: 12,
    color: "#777",
  },
  selectedText: {
    color: "#ffffff",
  },
});