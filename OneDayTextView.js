import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default class OneDayTextView extends Component{

    /************************** 生命周期 **************************/
    constructor(props) {
        super(props);
        this.initializeParams();
    }
    /************************** 继承方法 **************************/
    /************************** 通知 **************************/
    /************************** 创建视图 **************************/
    /************************** 网络请求 **************************/
    /************************** 自定义方法 **************************/
    /*
    * 初始化参数
    * */
    initializeParams() {

    }
    /************************** 子组件回调方法 **************************/
    /************************** 外部调用方法 **************************/
    /************************** List相关方法 **************************/
    /************************** Render中方法 **************************/
    render() {
        const { width } = this.props;
        let days = ['日','一','二','三','四','五','六'];
        let space = (width - 40*7)/8;
        let daysView =  days.map( (day) => {
            return (
                <View style={[styles.ItemMainView, {marginLeft: space}]}>
                    <View style={[styles.ContentView]}>
                        <Text style={[styles.TextView]}>{day}</Text>
                    </View>
                </View>
            );
        });
        return (
            <View style={[styles.MainView]}>
                {daysView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainView: {
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'white'
    },

    ItemMainView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40
    },

    ContentView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20
    },

    TextView: {
        fontSize: 11,
        color: '#111111'
    }
})

