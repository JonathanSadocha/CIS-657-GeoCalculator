import React, { useState, useEffect, Component  } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity  } from 'react-native';
import { ThemeProvider, Button, Input } from 'react-native-elements';
import { Feather } from '@expo/vector-icons'; 
import { Dropdown } from 'react-native-material-dropdown';

const GeoCalc = ({route,navigation}) => {
    




    const [state, setState] = useState({lat1: "", long1: "", lat2: "", long2: "", range: "", bearing: "" })
    const [distanceUnit, setDistance] = useState("km" ) 
    const [bearingUnit, setBearing] = useState("degrees") 



    const updateStateObject = (vals) => {
        setState({
            ...state,
            ...vals,
        })
    }

    useEffect(() => {
        if (route.params?.distanceUnit) {
            setDistance(route.params.distanceUnit)
        }
        if (route.params?.distanceUnit) {
            setBearing(route.params.bearingUnit);
        }
      }, [route.params?.distanceUnit, route.params?.bearingUnit]);

    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity style={styles.container}
            onPress={() => {
            navigation.navigate('Settings Page', {
                distanceUnit,bearingUnit
            });
            }}
        >
            <Feather style={{ marginRight: 10, color: '#ffff' }} name="settings" size={24} />
          </TouchableOpacity>
        ),
      });

    return(
        <View style={styles.container}>
            <Input 
                style={styles.input}
                placeholder="Enter latitude for point 1"
                onChangeText={(val) => {updateStateObject({lat1: val})}}
                value={state.lat1}
            />
            <Input
                style={styles.input}
                placeholder="Enter longitude for point 1"
                onChangeText={(val) => updateStateObject({long1: val})} 
                value={state.long1}
            />
            <Input
                style={styles.input}
                placeholder="Enter latitude for point 2"
                onChangeText={(val) => updateStateObject({lat2: val})} 
                value={state.lat2}
            />
            <Input
                style={styles.input}
                placeholder="Enter longitude for point 2"
                onChangeText={(val) => updateStateObject({long2: val})} 
                value={state.long2}
            />
            <Button 
                style={styles.buttons}
                title = {'Calculate'}
                onPress = { () => {Calculate()}} 
            />
            <Button 
                style={styles.buttons}
                title = {'Clear'}
                onPress = { () => updateStateObject({lat1: "", long1: "", lat2: "", long2: "", range: "", bearing: "" })}
            />
            <View style={styles.row}>
                <Text style={styles.output}>Distance:</Text>
            <Text style={styles.output}>{state.range} </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.output}>Bearing:</Text>
                <Text style={styles.output}>{state.bearing} </Text>
            </View>
        </View>       
    );

    function Calculate(){
        if (validation() !=true) Alert.alert(validation())
        else{
            updateStateObject({
                range: `${computeDistance(state.lat1, state.long1, state.lat2, state.long2)} ${distanceUnit}`,
                bearing: `${computeBearing(state.lat1, state.long1, state.lat2, state.long2)} ${bearingUnit}`,
            })
            
        }
    }
        // Converts from degrees to radians.
    function toRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }
 
    // Converts from radians to degrees.
    function toDegrees(radians) {
        return (radians * 180) / Math.PI;
    }
    
    // Computes distance between two geo coordinates in kilometers.
    function computeDistance(lat1, lon1, lat2, lon2) {
        console.log(`p1={${lat1},${lon1}} p2={${lat2},${lon2}}`);
        var R = 6371; // km (change this constant to get miles)
        var dLat = ((lat2 - lat1) * Math.PI) / 180;
        var dLon = ((lon2 - lon1) * Math.PI) / 180;
        var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        if (distanceUnit === 'mi'){
            let m = d * 0.621371;
            return round(m, 3);         
        }
        else{
            return round(d, 3);
        }
        
    }
    
    // Computes bearing between two geo coordinates in degrees.
    function computeBearing(startLat, startLng, destLat, destLng) {
        startLat = toRadians(startLat);
        startLng = toRadians(startLng);
        destLat = toRadians(destLat);
        destLng = toRadians(destLng);
        var y = Math.sin(destLng - startLng) * Math.cos(destLat);
        var x =
        Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
        var brng = Math.atan2(y, x);
        brng = toDegrees(brng);

        if (bearingUnit === 'mils'){
            let mils = brng * 17.777777777778;
            return round(mils, 3);         
        }
        else{
            return round((brng + 360) % 360,3);
        }
    }
    
    function round(value, decimals) {
        return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }

    function validation(){
        if (state.lat1 === "") return('Please enter something for Latitude 1')
        else if(state.long1 === "") return('Please enter something for longitude 1')
        else if (state.lat2 === "") return('Please enter something for Latitude 2')
        else if (state.long2 === "") return('Please enter something for longitude 2')
        else if (isNaN(state.lat1)) return('Please enter a number for Latitude 1')
        else if (isNaN(state.long1)) return('Please enter a number for longitude 1')
        else if (isNaN(state.lat2)) return('Please enter a number for Latitude 2')
        else if (isNaN(state.long2)) return('Please enter a number for longitude 2')
        else return(true)  
        }
}

const styles = StyleSheet.create({
    buttons: {
      margin: 10,
    },
    input: {
      color: 'red'
    },
    output: {
        flex: 1,
        borderColor: '#3F3F3F',
        borderWidth: 1,
        alignItems: 'stretch',
        justifyContent: "flex-start",
        padding: 5,
        
    },
    row: {
        flexDirection: 'row'
    },
    container: {
        flex: 1,
        margin: 20,
      },
  });



export default GeoCalc;