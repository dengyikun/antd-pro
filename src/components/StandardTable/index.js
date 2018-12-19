import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';

class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  render() {
    const {
      dataSource,
      pagination,
      rowKey,
      ...rest
    } = this.props;

    return (
      <div className={styles.standardTable}>
        <Table
          rowKey={rowKey || 'id'}
          dataSource={dataSource}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            ...pagination,
          }}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

export default StandardTable;
