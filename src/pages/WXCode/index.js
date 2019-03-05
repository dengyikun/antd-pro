import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Input,
  InputNumber,
  Button,
  Card,
  message,
  Spin,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';
import fileSaver from 'file-saver'

const InputGroup = Input.Group

@connect(({loading}) => ({
  loading: loading.models.code,
}))
class Detail extends PureComponent {
  state = {
    isAdd: true,
    data: {
      orderItems: [],
      totalFee: 0,
    }
  }

  handleSubmit = (mix, max) => () => {
    const {dispatch, form} = this.props;
    dispatch({
      type: 'code/getCode',
      payload: {
        startTableNum: mix,
        endTableNum: max,
      },
      callback: (res) => {
        if (res.ok) {
          res.blob()
            .then(file => {
              fileSaver.saveAs(file, '转角故事餐桌小程序码.zip')
              message.success('生成成功！请耐心等待下载……')
            })
        }
      }
    });
  };

  render() {
    const {loading} = this.props;
    const {number, min, max} = this.state;

    return (
      <PageHeaderWrapper
        title={'餐桌小程序码生成'}
      >
        <Spin spinning={!!loading}>
          <Card bordered={false} style={{marginBottom: 80}}>
            <InputGroup compact style={{marginBottom: 20}}>
              <InputNumber style={{width: 330}} size="large" min={1} precision={0}
                           value={number}
                           onChange={number => this.setState({number})}
                           placeholder="桌号"/>
              <Button type={'primary'} style={{width: 96}} size="large"
                      onClick={this.handleSubmit(number, number)}>生成</Button>
            </InputGroup>
            <InputGroup compact>
              <InputNumber style={{width: 150, textAlign: 'center'}} size="large"
                           value={min} min={1} precision={0}
                           onChange={min => this.setState({min})}
                           placeholder="起始桌号"/>
              <Input
                style={{
                  width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff',
                }}
                size="large"
                placeholder="~"
                disabled
              />
              <InputNumber style={{width: 150, textAlign: 'center'}} size="large"
                           value={max} min={min || 1} precision={0}
                           onChange={max => this.setState({max})}
                           placeholder="结束桌号"/>
              <Button type={'primary'} size="large"
                      onClick={this.handleSubmit(min, max)}>批量生成</Button>
            </InputGroup>
          </Card>
        </Spin>
      </PageHeaderWrapper>
    );
  }
}

export default Detail;
