import React, {PureComponent} from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn'
import {InputNumber as AntInputNumber} from 'antd';

moment.locale('zh-cn')

class InputNumber extends PureComponent {

  render() {
    const {onChange} = this.props
    return (
      <AntInputNumber {...this.props}
                     onChange={(value) => {
                       onChange(value ? value : null)
                     }}/>
    );
  }
}

export default InputNumber;
