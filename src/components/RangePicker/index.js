import React, {PureComponent} from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn'
import {DatePicker} from 'antd';

const {RangePicker: AntRangePicker} = DatePicker

moment.locale('zh-cn')

class RangePicker extends PureComponent {

  render() {
    const {value, onChange} = this.props
    return (
      <AntRangePicker {...this.props}
                      onChange={(dates, dateStrings) => {
                        onChange(dates.length > 0 ? dateStrings : null)
                      }}
                      value={
                        value ?
                          [
                            value[0] ? moment(value[0]) : null,
                            value[1] ? moment(value[1]) : null,
                          ] :
                          null
                      }
      />
    );
  }
}

export default RangePicker;
