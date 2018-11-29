import React, {PureComponent} from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn'
import {DatePicker as AntDatePicker} from 'antd';

moment.locale('zh-cn')

class DatePicker extends PureComponent {

  render() {
    const {value, onChange} = this.props
    return (
      <AntDatePicker {...this.props}
                     onChange={(date, dateString) => {
                       onChange(date ? dateString : null)
                     }}
                     value={
                       value ? moment(value) : null
                     }/>
    );
  }
}

export default DatePicker;
