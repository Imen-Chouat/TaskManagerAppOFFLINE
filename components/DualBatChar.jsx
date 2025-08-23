import React from "react";
import { View, Dimensions ,Text } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function DualBarChart({data,type,title}) {
  const screenWidth = Dimensions.get("window").width - 32 ;
  const abriviateDay = (day )=>{
    switch(day){
      case "Saturday" :{
        return(sat);
      }
    }
  }
  const dataC = {
    labels: data.map(item => item.day),
    datasets: type == "completed"  ? [
      {
        data: data.map(item=>item.completedTasks) , // Completed
        color: (opacity = 1) => `rgba(0, 200, 0, ${opacity})` // Green bars
      },
    ] : [
      {
        data: data.map(item=>item.missedTasks) , // Completed
        color: (opacity = 1) => `rgba(200, 200, 0, ${opacity})` // Green bars
      },
    ],
    legend: ["Completed", "Mistaken"]
  };
  const getBarColor = (opacity = 1) => {
    if(type == "completed"){
      return `rgba(0, 200, 0, ${opacity})`;
    }else {
      return `rgba(255,0, 0, ${opacity})`;
    }
  }
  const colorTitle = () => {
    if(type == "completed"){
      return ("rgba(14, 168, 40, 1)");
    }else{
      return ("rgba(224, 41, 41, 1)")
    }
  }
  return (
    <View style={{
          borderColor: "rgb(100,100,100)" ,
          borderWidth: 1 ,
          borderRadius:34 , 
          paddingTop: 10 ,
          marginBottom: 15
    }}>
      <Text style={{alignSelf:"center" , fontWeight:"700", color: colorTitle() , fontSize:16}} >{title}</Text>
      <BarChart
        data={dataC}
        width={screenWidth}
        height={160}
        fromZero
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#b38787ff",
          backgroundGradientFrom: "#ffffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: getBarColor ,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          barPercentage: 0.5
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16 ,
          alignSelf:"center" ,
          paddingBottom: 15
        }}
      />
    </View>
  );
}
