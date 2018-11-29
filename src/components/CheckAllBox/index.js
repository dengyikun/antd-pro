import React, {PureComponent} from 'react';
import {Checkbox} from 'antd';

const {Group} = Checkbox

class CheckAllBox extends PureComponent {
  state = {
    indeterminate: false,
    checkAll: false,
  };

  onChange = (checkedList) => {
    debugger
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < [].length),
      checkAll: checkedList.length === [].length,
    });
  }

  onCheckAllChange = (e) => {
    const {options, onChange} = this.props
    onChange(e.target.checked ? Array.from(options, option => option.value) : [])
  }

  render() {
    const {options, value, onChange} = this.props
    let hasCheck = false
    const checkAll = (options || []).every(option => {
      const isInValue = (value || []).includes(option.value)
      if (isInValue) {
        hasCheck = true
      }
      return isInValue
    })
    console.log(checkAll)
    return (
      <div>
        <div style={{ borderBottom: '1px solid #E9E9E9', marginBottom: 10 }}>
          <Checkbox
            indeterminate={hasCheck && !checkAll}
            onChange={this.onCheckAllChange}
            checked={checkAll}
          >
            全选 (All Select)
          </Checkbox>
        </div>
        <Group options={options} value={value} onChange={onChange} />
      </div>
    );
  }
}

export default CheckAllBox;
