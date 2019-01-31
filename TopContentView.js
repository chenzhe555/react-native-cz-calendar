import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class TopContentView extends Component{

    /************************** 生命周期 **************************/
    constructor(props) {
        super(props);
        this.initializeParams();
    }

    componentDidMount() {
        if (this.props.evaluateView) this.props.evaluateView(this);
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
        this.state = {
            year: 0,
            month: 0
        }
    }
    /************************** 子组件回调方法 **************************/
    /************************** 外部调用方法 **************************/
    /*
    * 修改年月，此处不校验，外部保证数据可靠性
    * */
    modifyDay(data) {
        this.setState({
            year: data['year'],
            month: data['month']
        });
    }
    /************************** List相关方法 **************************/
    /************************** Render中方法 **************************/
    /*
    * 取消按钮事件
    * */
    _cancelAction() {
        if (this.props.hide) this.props.hide();
    }

    /*
    * 确定按钮事件
    * */
    _confirmAction() {
        if (this.props.confirm) this.props.confirm();
    }

    /*
    * 月份切换事件
    * */
    _monthModify(type) {
        if (this.props.modifyMonth) this.props.modifyMonth(type);
    }


    render() {
        const { year, month } = this.state;

        return (
            <View style={[styles.MainView]}>
                <TouchableOpacity onPress={this._cancelAction.bind(this)}>
                    <View style={[styles.CancelButtonView]}>
                        <Text style={[styles.CancelButtonTextView]}>取消</Text>
                    </View>
                </TouchableOpacity>
                <View style={[styles.RowCenter, {flex: 1}]}>
                    <View style={[styles.RowCenter, {flexDirection: 'row'}]}>
                        <TouchableOpacity onPress={this._monthModify.bind(this,1)}>
                            <View style={[styles.MonthButtonView]}>
                                <Image style={[styles.MonthButtonImageView]} source={require('./images/month_left_btn.png')}/>
                            </View>
                        </TouchableOpacity>
                        <Text style={[styles.YearTextView]}>{year + '年' + month + '月'}</Text>
                        <TouchableOpacity onPress={this._monthModify.bind(this,2)}>
                            <View style={[styles.MonthButtonView]}>
                                <Image style={[styles.MonthButtonImageView]} source={require('./images/month_right_btn.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={this._confirmAction.bind(this)}>
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
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },

    RowCenter: {
        justifyContent: 'center',
        alignItems: 'center'
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
    },

    MonthButtonView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40
    },

    MonthButtonImageView: {
        width: 16,
        height: 16
    },

    YearTextView: {
        fontSize: 16,
        color: '#111111'
    },
})