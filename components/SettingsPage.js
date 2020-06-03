import React, { useState, useEffect, Component  } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';


const SettingsPage = ({route,navigation}) => {
    
    const initialDistance = route.params.distanceUnit;
    const initialBearing = route.params.bearingUnit;

    const [distanceUnit, setDistance] = useState(initialDistance) 
    const [bearingUnit, setBearing] = useState(initialBearing) 

   navigation.setOptions({
        headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Geo Calculator')}>
            <Text> Cancel </Text>
        </TouchableOpacity>
        ),
        headerLeft: () => (
        <TouchableOpacity
            onPress={() => {
            navigation.navigate('Geo Calculator', {
                distanceUnit,bearingUnit
            });
            }}
        >
            <Text> Save </Text>
        </TouchableOpacity>
        ),
    });

        let distanceData = [{
        value: 'km',
        }, {
        value: 'mi',
        }];

        let bearingData = [{
        value: 'degrees',
        }, {
        value: 'mils',
        }];
    
        return(
        <View style={styles.container}> 
            <Dropdown 
            label='Distance'
            data={distanceData}
            value={distanceUnit}
            onChangeText = {setDistance}
            />
            <Dropdown
            label='Bearing'
            data={bearingData}
            value={bearingUnit}
            onChangeText = {setBearing}
            />
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 20,
    },
    item: {
        padding: 2,
    },
    button: {
        marginBottom: 100,
    }
  });

export default SettingsPage;
