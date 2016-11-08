import React, { Component, PropTypes } from 'react';
import { Form, Slider, Button } from 'antd';

const FormItem = Form.Item;

const URL = {
    'smooth night': 'http://mr3.doubanio.com/a6336b5a2f2e572f33950494ccfb08a5/0/fm/song/p1835658_128k.mp3',
    'rain mood': 'http://107.182.230.196/audio1110/0.m4a'
};

let playing = false;

export default class Time extends Component {
    static propTypes = {
        // 暂时没有
    };

    state = {
    };

    start = () => {
        let that = this;
        if (playing) {
            return;
        }
        playing = true;
        this.audio.play();
        this.timerToStop = setTimeout(() => {
            that.audio.pause();
            playing = false;
        }, 20 * 1000);
        this.timerToStart = setTimeout(() => {
            that.audio.play();
            playing = true;
        }, that.interval * 60 * 1000);
    };

    slideChange = (val) => {
        this.interval = val;
    };

    stop = () => {
        this.audio.pause();
        if (this.timerToStop) {
            clearTimeout(this.timerToStop);
        }
        if (this.timerToStart) {
            clearTimeout(this.timerToStart);
        }
        playing = false;
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="间隔">
                    <Slider
                        marks={{ 0: '0', 15: '15', 25: '25', 30: '30', 45: '45', 60: '60'}}
                        onChange = {this.slideChange}
                        defaultValue={25}
                        max="60"/>
                </FormItem>
                <FormItem wrapperCol={{ span: 16, offset: 6 }}>
                    <Button type="primary" htmlType="button" size="large"  style={{ marginRight: 8 }} onClick={this.start}>开始</Button>
                    <Button htmlType="button" size="large" onClick={this.stop}>结束</Button>
                </FormItem>
                <audio src={URL['smooth night']} preload="true" ref={(input) => {
                    this.audio = input;
                }}></audio>
            </Form>
        )
    }
}