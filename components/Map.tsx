import { icons } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { calculateRegion, generateMarkersFromData } from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store"
import { MarkerData } from "@/types/type";
import { useEffect, useState } from "react";
import { View, Text, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps"

const drivers = [
    {
        driver_id: 1,
        first_name: "James",
        last_name: "Wilson",
        profile_image_url:
            "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
        car_image_url:
            "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
        car_seats: 4,
        rating: 4.80,
    },
    {
        driver_id: 2,
        first_name: "David",
        last_name: "Brown",
        profile_image_url:
            "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
        car_image_url:
            "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
        car_seats: 5,
        rating: 4.60,
    },
    {
        driver_id: 3,
        first_name: "Michael",
        last_name: "Johnson",
        profile_image_url:
            "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
        car_image_url:
            "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
        car_seats: 4,
        rating: 4.70,
    },
    {
        driver_id: 4,
        first_name: "Robert",
        last_name: "Green",
        profile_image_url:
            "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
        car_image_url:
            "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
        car_seats: 4,
        rating: 4.90,
    },
];

const Map = () => {
    const {
        userLongitude,
        userLatitude,
        destinationLatitude,
        destinationLongitude
    } = useLocationStore();
    const region = calculateRegion({
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude
    })

    const { selectedDriver, setDrivers } = useDriverStore()
    const [markers, setMarkers] = useState<MarkerData[]>([])
    const [data, setData] = useState<any>([])

    useEffect(() => {
        if (Array.isArray(drivers)) {
            if (!userLatitude || !userLongitude) return
            const newMarkers = generateMarkersFromData({ data: drivers, userLatitude, userLongitude })
            setMarkers(newMarkers)

        }
        const data = async () => {
            const res = await fetchAPI("https://api.opencagedata.com/geocode/v1/json?q=Ethiopia&key=2a5b47e7802e471e95bc1d2077b583e9")
            console.log(res.results)
            setData(res.results)
            return res
        }
        data()
    }, [drivers])

    return (
        // <MapView
        //     provider={PROVIDER_DEFAULT}
        //     className="w-full h-full rounded-2xl"
        //     tintColor="black"
        //     mapType="mutedStandard"
        //     showsPointsOfInterest={false}
        //     initialRegion={region}
        //     showsUserLocation={true}
        //     userInterfaceStyle="light"
        // >
        //     {markers.map(marker => (
        //         <Marker
        //             key={marker.driver_id}
        //             coordinate={{
        //                 latitude: marker.latitude,
        //                 longitude: marker.longitude
        //             }}
        //             title={marker.title}
        //             image={selectedDriver === marker.driver_id ? icons.selectedMarker : icons.marker}
        //         />
        //     ))}
        // </MapView>
        <View className="flex flex-col items-center justify-between gap-2 overflow-auto">
            {data.map((item: any) => (
                <LocationDetails key={item} />

            ))}
        </View>
    )
}

export default Map


// Sample Data Object
const locationData = {
    annotations: {
        flag: "🇪🇹",
        callingcode: 251,
        currency: { iso_code: "ETB", name: "Ethiopian Birr" },
        timezone: { name: "Africa/Addis_Ababa", offset_string: "+03:00", short_name: "EAT" },
        qibla: 5.6,
        sun: { rise: "06:14", set: "18:22" },
        what3words: { words: "engage.coffee.light" }
    },
    components: {
        country: "Ethiopia",
        continent: "Africa",
        country_code: "et"
    },
    geometry: {
        lat: 10.2116702,
        lng: 38.6521203
    }
};

// Main Component
const LocationDetails = () => {
    const { annotations, components, geometry } = locationData;

    return (
        <ScrollView className="flex-1 bg-white p-5">
            <View className="flex-row justify-between items-center mb-5">
                <Text className="text-2xl font-bold">{components.country}</Text>
                <Text className="text-3xl">{annotations.flag}</Text>
            </View>

            <View className="py-3 border-b border-gray-300 flex-row justify-between">
                <Text className="text-base text-gray-600 font-semibold">Continent:</Text>
                <Text className="text-base text-gray-800">{components.continent}</Text>
            </View>

            <View className="py-3 border-b border-gray-300 flex-row justify-between">
                <Text className="text-base text-gray-600 font-semibold">Coordinates:</Text>
                <Text className="text-base text-gray-800">Lat: {geometry.lat}, Lng: {geometry.lng}</Text>
            </View>

            <View className="py-3 border-b border-gray-300 flex-row justify-between">
                <Text className="text-base text-gray-600 font-semibold">Calling Code:</Text>
                <Text className="text-base text-gray-800">+{annotations.callingcode}</Text>
            </View>

            <View className="py-3 border-b border-gray-300 flex-row justify-between">
                <Text className="text-base text-gray-600 font-semibold">Currency:</Text>
                <Text className="text-base text-gray-800">{annotations.currency.name} ({annotations.currency.iso_code})</Text>
            </View>

            <View className="py-3 border-b border-gray-300 flex-row justify-between">
                <Text className="text-base text-gray-600 font-semibold">Timezone:</Text>
                <Text className="text-base text-gray-800">{annotations.timezone.name} (UTC {annotations.timezone.offset_string})</Text>
            </View>

            <View className="py-3 border-b border-gray-300 flex-row justify-between">
                <Text className="text-base text-gray-600 font-semibold">Sunrise / Sunset:</Text>
                <Text className="text-base text-gray-800">{annotations.sun.rise} / {annotations.sun.set}</Text>
            </View>

            <View className="py-3 border-b border-gray-300 flex-row justify-between">
                <Text className="text-base text-gray-600 font-semibold">Qibla Direction:</Text>
                <Text className="text-base text-gray-800">{annotations.qibla}°</Text>
            </View>

            <View className="py-3 border-b border-gray-300 flex-row justify-between">
                <Text className="text-base text-gray-600 font-semibold">What3Words:</Text>
                <Text className="text-base text-gray-800">{annotations.what3words.words}</Text>
            </View>
        </ScrollView>
    );
};
