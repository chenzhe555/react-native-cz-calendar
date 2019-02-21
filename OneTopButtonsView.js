import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class OneTopButtonsView extends Component{

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
    /*
    * 取消按钮事件
    * */
    _cancelAction = () => {
        if (this.props.cancel) this.props.cancel();
    }

    /*
    * 确定按钮事件
    * */
    _confirmAction = () => {
        if (this.props.confirm) this.props.confirm();
    }


    render() {
        return (
            <View style={[styles.MainView]}>
                <TouchableOpacity onPress={this._cancelAction}>
                    <View style={[styles.CancelButtonView]}>
                        <Text style={[styles.CancelButtonTextView]}>取消</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._confirmAction}>
                    <View style={[styles.ConfirmButtonView]}>
                        <Text style={[styles.ConfirmButtonTextView]}>确定</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MainView: {
        backgroundColor: 'white',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    CancelButtonView: {
        marginLeft: 20,
        width: 60,
        flex: 1,
        justifyContent: 'center'
    },

    CancelButtonTextView: {
        fontSize: 16,
        color: 'red'
    },

    ConfirmButtonView: {
        marginRight: 20,
        width: 60,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    ConfirmButtonTextView: {
        fontSize: 16
    }
})