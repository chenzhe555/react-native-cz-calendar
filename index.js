import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal } from 'react-native';
import DaysView from './DaysView';
import TopContentView from './TopContentView';

export default class CZCalendar extends Component{
    
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
            show: false
        };
        this.SCREENW = Dimensions.get('window').width;
        let date = new Date();
        //获取当前年月日
        this.year = this.originYear = parseInt(date.getFullYear());
        this.month = this.originMonth = parseInt(date.getMonth() + 1);
        this.day = this.originDay = parseInt(date.getDate());
    }

    /*
    * 创建星期日到星期六视图
    * */
    createDayWeeksConstantView() {
        const { SCREENW } = this;
        let days = ['日','一','二','三','四','五','六'];
        let space = (SCREENW - 280)/8;
        return days.map( (day) => {
            return (
                <View style={[styles.RowCenter, {width: 40, height: 40, marginLeft: space}]}>
                    <View style={[styles.RowCenter, {width: 20, height: 20}]}>
                        <Text style={[{fontSize: 11, color: '#111111'}]}>{day}</Text>
                    </View>
                </View>
            );
        });
    }

    /*
    * 修改当前年月日
    * */
    modifyDate(type = 1) {
        if (type == 1) {
            this.topContentView.modifyDay({'year': this.year, 'month': this.month});
        }
        this.daysView.modifyDay({
            'year': this.year,
            'month': this.month,
            'day': this.day,
            'originYear': this.originYear,
            'originMonth': this.originMonth,
            'originDay': this.originDay
        });
    }

    /************************** 子组件回调方法 **************************/
    /************************** 外部调用方法 **************************/
    /*
    * 显示日历
    * */
    show(data = {}) {
        let date = data['date'] ? data['date'] : '';
        let dateArr = date.split('-');
        if (dateArr.length != 3) return;

        //获取当前年月日
        this.year = this.originYear = parseInt(dateArr[0]);
        this.month = this.originMonth = parseInt(dateArr[1]);
        this.day = this.originDay = parseInt(dateArr[2]);
        if (!this.state.show) {
            if (this.topContentView) {
                this.setState({
                    show: true
                });
                this.modifyDate();
            } else {
                this.setState({
                    show: true
                }, () => {
                    this.modifyDate();
                });
            }
        }
    }

    /*
    * 隐藏日历
    * */
    hide() {
        this.setState({
            show: false
        });
    }
    /************************** List相关方法 **************************/
    /************************** Render中方法 **************************/
    /*
    * 修改月份
    * */
    _modifyMonth(type) {
        const { year, month } = this;
        if (type == 1) {
            //减
            if (month == 1) {
                this.year = year - 1;
                this.month = 12;
            }
            else {
                this.month = month - 1;
            }
        } else {
            //加
            if (month >= 12) {
                this.year = year + 1;
                this.month = 1;
            }
            else {
                this.month = month + 1;
            }
        }
        this.modifyDate();
    }

    /*
    * 选择了某一天
    * */
    _selectDay(day) {
        this.originYear = this.year;
        this.originMonth = this.month;
        this.day = this.originDay = day;
        this.modifyDate(2);
    }

    /*
    * 点击确定按钮事件
    * */
    _confirmAction() {
        if (this.props.confirmAction) this.props.confirmAction({
            'date': this.originYear + '-' + (this.originMonth < 10 ? '0' + this.originMonth : this.originMonth) + '-' + (this.originDay < 10 ? '0' + this.originDay : this.originDay)
        });
    }

    render() {
        const { year, month } = this;
        const { show } = this.state;

        return (
            <Modal
                visible={show}
                animationType={'fade'}
                transparent={true}
            >
                <View style={[styles.MainView]}>
                    <View>
                        <TopContentView modifyMonth={this._modifyMonth.bind(this)} evaluateView={ (topContentView) => {this.topContentView = topContentView;} } hide={this.hide.bind(this)} confirm={this._confirmAction.bind(this)}></TopContentView>
                        <View style={[styles.DayConstantView]}>
                            {this.createDayWeeksConstantView()}
                        </View>
                        <DaysView evaluateView={ (daysView) => {this.daysView = daysView} } selectDay={this._selectDay.bind(this)}></DaysView>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    MainView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },

    RowCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    DayConstantView: {
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'white'
    }
})
