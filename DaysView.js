import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

export default class DaysView extends Component{

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
        this.SCREENW = Dimensions.get('window').width;
        this.state = {
            year: 0,
            month: 0,
            day: 0,
            originYear: 0,
            originMonth: 0,
            originDay: 0
        };
    }

    /*
    * 创建天数视图
    * */
    createDaysView() {
        //初始化参数
        const { year, month, day, originYear, originMonth, originDay } = this.state;
        let dayList = [];

        //当前月天数
        let days = this.getDaysOnMonth(year, month);
        //上个月天数
        let preDays = ( month == 1 ? this.getDaysOnMonth(year - 1,12) : this.getDaysOnMonth(year,month - 1) );
        //1号星期几
        let weekDay = this.getDayDay(year, month - 1, 1);
        //月底星期几
        let endWeekDay = this.getDayDay(year, month - 1, days);

        //上个月
        for (let i = weekDay - 1;i >= 0;--i) {
            dayList.push({
                'day': (preDays - i), //某天
                'isCurrentMonth': false, //是否是当前月
                'isSelect': false //是否是选中状态
            });
        }

        //当前月
        for (let i = 1; i <= days; ++i) {
            let item = {
                'day': i,
                'isCurrentMonth': true
            };
            if (i == day && year == originYear && month == originMonth) item['isSelect'] = true;
            else item['isSelect'] = false;
            dayList.push(item);
        }

        //下个月
        for (let i = 1; i <= (6 - endWeekDay); ++i) {
            dayList.push({
                'day': i,
                'isCurrentMonth': false,
                'isSelect': false
            });
        }

        return this.createDaysDetailView(dayList);
    }

    /*
    * 创建天数日期视图
    * */
    createDaysDetailView(list) {
        const { SCREENW } = this;

        //左边间隙
        let space = (SCREENW - 280)/8;
        //文本颜色,背景颜色,圆角
        let textColor, bgColor, radius;

        return list.map( (item) => {
            textColor = item['isCurrentMonth'] ? '#111111' : '#999999';
            bgColor = item['isSelect'] ? '#AAE039' : '#FFFFFF';
            radius = item['isSelect'] ? 13 : 0;
            return (
                <TouchableOpacity onPress={this.selectDay.bind(this,item)}>
                    <View style={[styles.RowCenter, {width: 40, height: 40, marginLeft: space}]}>
                        <View style={[styles.RowCenter, {width: 26, height: 26, borderRadius: radius, backgroundColor: bgColor}]}>
                            <Text style={[{fontSize: 11, color: textColor}]}>{item['day']}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        });
    }

    /*
    * 获取某年某月多少天
    * */
    getDaysOnMonth(year, month) {
        return (new Date(year, month, 0)).getDate();
    }

    /*
    * 获取某天是星期几
    * */
    getDayDay(year, month, day) {
        return (new Date(year, month, day)).getDay();
    }

    //选择某天
    selectDay(item) {
        if (item['isCurrentMonth']) {
            if (this.props.selectDay) this.props.selectDay(item['day']);
        }
    }
    /************************** 子组件回调方法 **************************/
    /************************** 外部调用方法 **************************/
    modifyDay(data = {}) {
        this.setState({
            year: data['year'],
            month: data['month'],
            day: data['day'],
            originYear: data['originYear'],
            originMonth: data['originMonth'],
            originDay: data['originDay']
        });
    }
    /************************** List相关方法 **************************/
    /************************** Render中方法 **************************/


    render() {
        const { year } = this.state;
        if (year == 0) return null;

        return (
            <View style={[styles.MainView]}>
                {this.createDaysView()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MainView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        flexWrap: 'wrap'
    },

    RowCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})