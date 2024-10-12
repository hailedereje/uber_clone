import { fetchAPI } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from 'react-native';

const Chat = () => {
  const [data, setData] = useState<any>([])
  useEffect(() => {
    const data = async () => {
      const res = await fetchAPI("https://api.opencagedata.com/geocode/v1/json?q=Ethio&key=2a5b47e7802e471e95bc1d2077b583e9")
      console.log(JSON.stringify(res.results[0], null, 2))
      setData(res.results)
      return res
    }
    data()
  }, [])
  return (
    <SafeAreaView>
      {data.map((item, index) => (
        <>
          <Text>{item.formatted} </Text>
          <Text>{item.geometry.lat} , {item.geometry.lng}</Text>
        </>

      ))}
    </SafeAreaView>
  );
};

export default Chat;
