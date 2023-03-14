import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { colors } from '../../colors';
const CustomDrawer = (props) => {
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props} style={[styles.DrawerContentStyle]}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    );
};
export default CustomDrawer;

const styles = StyleSheet.create({
    DrawerContentStyle:{
        backgroundColor:colors.dark_purple,
    },
});
