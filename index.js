import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Platform, NativeModules, Dimensions } from 'react-native';
import TopButtonsView from './TopButtonsView';
import SelectDateView from './SelectDateView';
import DayTextView from './DayTextView';
import DaysView from './DaysView';
const { RNCzCalendar } = NativeModules;

/*
* props:
* type: 1.单选组件 2.双选组件
* bottomSpace: 类型iPhoneX这种底部给间隙，不然会被遮挡部分底部
*
* func:
* evaluateView: 赋值当前对象
* confirmAction: 点击确定按钮回调: {'date': 2010-05-10,'arr': [2010,5,10]}
*
* export func:
* show(data): 显示日历: {'date': '2010-05-10'}
* hide: 隐藏日历
* */
export default class CZCalendar extends Component{
    
    /************************** 生命周期 **************************/
    constructor(props) {
        super(props);
        this.initializeParams();
    }

    componentDidMount() {
        if (typeof this.props.bottomSpace == 'undefined' && typeof CZCalendar.BottomSpace == 'undefined' && Platform.OS == 'ios') {
            RNCzCalendar.getBottomSpace( (result) => {
                CZCalendar.BottomSpace = result;
                this.bottomSpace = result;
                this.forceUpdate();
            })
        }
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
        //获取当前屏幕宽度
        this.SCREENW = Dimensions.get('window').width;
        let date = new Date();
        //获取当前年月日
        this.year = this.originYear = parseInt(date.getFullYear());
        this.month = this.originMonth = parseInt(date.getMonth() + 1);
        this.day = this.originDay = parseInt(date.getDate());
        //获取底部间隙
        this.bottomSpace = this.props.bottomSpace ? this.props.bottomSpace : CZCalendar.getBottomSpace();
    }

    /*
    * 修改当前年月日
    * */
    modifyDate = () => {
        //月份组件
        this.oneSelectDateView.modifyDate({'year': this.year, 'month': this.month});
        //底部日期组件
        this.oneDaysView.modifyDay({
            'year': this.year,
            'month': this.month,
            'day': this.day,
            'originYear': this.originYear,
            'originMonth': this.originMonth,
            'originDay': this.originDay
        });
    }

    /*
    * 获取底部间隙
    * */
    static getBottomSpace = () => {
        return CZCalendar.BottomSpace ? CZCalendar.BottomSpace : 0;
    }

    /************************** 子组件回调方法 **************************/
    /************************** 外部调用方法 **************************/
    /*
    * 显示日历
    * data = {'date': '2010-05-10'}
    * */
    show = (data = {}) => {
        let dateArr = [];
        //如果没有传入日期，取今日,如果选择过一次，则取当时选择的
        if (data['date']) {
            dateArr = data['date'].split('-');
        } else {
            dateArr = [this.year, this.month, this.day];
        }
        //年月日数组
        if (dateArr.length != 3) return;

        //赋值年月日
        this.year = this.originYear = parseInt(dateArr[0]);
        this.month = this.originMonth = parseInt(dateArr[1]);
        this.day = this.originDay = parseInt(dateArr[2]);

        //如果OneSelectDateView还未加载，则等setState执行完后再执行
        this.setState({
            show: true
        }, () => {
            this.modifyDate();
        });
    }

    /*
    * 隐藏日历
    * */
    hide = () => {
        this.setState({
            show: false
        });
    }
    /************************** List相关方法 **************************/
    /************************** Render中方法 **************************/
    /*
    * 修改月份
    * */
    _modifyMonth = (type) => {
        const { year, month } = this;
        if (type == 1) {
            //减
            if (month <= 1) {
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
        this.modifyDate();
    }

    /*
    * 点击确定按钮事件
    * */
    _confirmAction = () => {
        if (this.props.confirmAction) this.props.confirmAction({
            'date': this.originYear + '-' + (this.originMonth < 10 ? '0' + this.originMonth : this.originMonth) + '-' + (this.originDay < 10 ? '0' + this.originDay : this.originDay),
            'arr': [this.originYear, this.originMonth, this.originDay]
        });
        this.hide();
    }

    render() {
        const { year, month, bottomSpace, SCREENW } = this;
        const { show } = this.state;

        return (
            <Modal
                visible={show}
                animationType={'fade'}
                transparent={true}
            >
                <View style={[styles.MainView]}>
                    <View>
                        <TopButtonsView
                            confirm={this._confirmAction}
                            cancel={this.hide}
                        />
                        <SelectDateView
                            evaluateView={ (oneSelectDateView) => {this.oneSelectDateView = oneSelectDateView} }
                            modifyMonth={this._modifyMonth}
                        />
                        <DayTextView
                            width={SCREENW}
                        />
                        <DaysView
                            evaluateView={ (oneDaysView) => {this.oneDaysView = oneDaysView} }
                            width={SCREENW}
                            selectDay={this._selectDay.bind(this)}
                        />
                    </View>
                    {
                        bottomSpace > 0 ? (
                            <View style={[{height: bottomSpace, backgroundColor: 'white'}]}/>
                        ) : null
                    }
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
        backgroundColor: 'rgba(0,0,0,0.6)'
    }
})
