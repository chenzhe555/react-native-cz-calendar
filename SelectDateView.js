import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class SelectDateView extends Component{

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
    modifyDate = (date) => {
        this.setState({
            year: date['year'],
            month: date['month']
        });
    }
    /************************** List相关方法 **************************/
    /************************** Render中方法 **************************/
    /*
    * 月份切换事件
    * type: 1.减月份 2.加月份
    * */
    _monthModify = (type) => {
        if (this.props.modifyMonth) this.props.modifyMonth(type);
    }


    render() {
        const { year, month } = this.state;

        return (
            <View style={[styles.MainView]}>
                <View style={[styles.YearAndMonthMainView]}>
                    <TouchableOpacity onPress={this._monthModify.bind(this,1)}>
                        <View style={[styles.MonthButtonView]}>
                            <Image style={[styles.MonthButtonImageView]} source={require('./images/month_left_btn.png')}/>
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.YearMonthTextView]}>{year + '年' + month + '月'}</Text>
                    <TouchableOpacity onPress={this._monthModify.bind(this,2)}>
                        <View style={[styles.MonthButtonView]}>
                            <Image style={[styles.MonthButtonImageView]} source={require('./images/month_right_btn.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MainView: {
        backgroundColor: 'white',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    YearAndMonthMainView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    MonthButtonView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30
    },

    MonthButtonImageView: {
        width: 16,
        height: 16
    },

    YearMonthTextView: {
        fontSize: 16,
        color: '#111111'
    },
})