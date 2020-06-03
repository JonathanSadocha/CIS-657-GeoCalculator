import React, { useState, useRef,   useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, FlatList, TouchableHighlight, } from "react-native";

import {
    initRecordDB,
    storeRecordItem,
    setupRecordListener,
    updateRecord,
    deleteRecord,
  } from '../helpers/fb-calc';
import { ScreenStackHeaderRightView } from "react-native-screens";


const HistoryScreen = ({ route, navigation }) => {

const [records, setRecords] = useState([]);

useEffect(() => {
    setupRecordListener((items) => {
      setRecords(items);
    });
  }, []);

  const onPress = (start1,start2,end1,end2) => {
    navigation.navigate('Geo Calculator', {
        start1,
        start2,
        end1,
        end2
      });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
          <View >
            <FlatList
                keyExtractor={(item) =>item.id}
                data={records}
                ItemSeparatorComponent={({highlighted}) => (
                    <View style={[styles.separator, highlighted && {marginLeft: 0}]} />
                )}
                renderItem={({index,item,separators}) => {
                    return(
                        <TouchableOpacity
                        onPress={() => onPress(item.start1,item.start2,item.end1,item.end2)}
                        >
                            <View>
                                <Text style={styles.list}> 
                                    Start: {item.start1}, {item.start2} {"\n"}
                                    End: {item.end1}, {item.end2}
                                </Text>
                                <Text style={styles.listDate}>Date: {item.date}</Text>
                            </View>
                        </TouchableOpacity>
                    );       
                }}
            />
        </View>
      </View>
    </View>
  );
};

/* 
Start: {item.start1}, {item.start2} {"\n"}
End: {item.end1}, {item.end2}{"\n"}
Date: {item.date}
 */

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 4,
        paddingTop: 10,
        backgroundColor: "#E8EAF6",
    },
    container: {
        marginHorizontal: 4,
        marginVertical: 8,
        paddingHorizontal: 8,
        flex: 1,
    },
    headerButton: {
        color: '#fff',
        fontWeight: 'bold',
    },
    separator: {
        borderTopWidth: 1,
        borderTopColor: '#000',
    },
    list: {
        fontSize: 20,
        fontSize:20,
    },
    listDate: {
        fontStyle: 'italic',
        flex: 1,
        textAlign: 'right'
    }

});

export default HistoryScreen;
