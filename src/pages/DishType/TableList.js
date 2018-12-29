import React, {PureComponent} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Menu,
  InputNumber,
  DatePicker,
  message,
  Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FormItem from '@/components/FormItem';
import Detail from './Detail';

import styles from './TableList.less';

const {Option} = Select;

/* eslint react/no-multi-comp:0 */
@connect(({dishType, loading}) => ({
  dishType,
  loading: loading.models.dishType,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    record: null,
  };

  componentDidMount() {
    this.fetchDishType()
  }

  fetchDishType = (params) => {
    const {
      dishType: {
        currentPage,
        pageSize,
      },
      dispatch,
    } = this.props;
    dispatch({
      type: 'dishType/fetch',
      payload: {
        currentPage,
        pageSize,
        ...params
      },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const {formValues} = this.state;

    const params = {
      currentPage: pagination.current - 1,
      pageSize: pagination.pageSize,
      search: formValues,
    };

    this.fetchDishType(params)
  };

  handleFormReset = () => {
    const {form} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    this.fetchDishType()
  };


  handleSearch = e => {
    e.preventDefault();

    const {form} = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.setState({
        formValues: fieldsValue,
      });

      this.fetchDishType({search: fieldsValue})
    });
  }

  handleAdd = () => {
    this.setState({
      modalVisible: true,
      record: {}
    })
  }

  handleEdit = record => () => {
    this.setState({
      modalVisible: true,
      record
    })
  }

  handleModalCancel = () => {
    this.setState({
      modalVisible: false,
    })
    this.fetchDishType()
  }

  columns = [
    {
      title: '#',
      dataIndex: 'index',
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: '类型名称',
      dataIndex: 'name',
    },
    {
      title: '菜品简介',
      dataIndex: 'description',
    },
    {
      title: '操作',
      render: (text, record) => (
        <a onClick={this.handleEdit(record)}>编辑</a>
      ),
      width: 170,
      align: 'center',
    },
  ];

  render() {
    const {
      dishType: {
        data,
        currentPage,
        pageSize,
        total
      },
      form,
      loading,
    } = this.props;
    const {modalVisible, record} = this.state

    const formItems = [{
      id: 'keywords',
      children: <Input placeholder="请输入关键字"/>
    }]

    return (
      <PageHeaderWrapper title="菜品列表">
        <Card bordered={false}>
            <Form onSubmit={this.handleSearch} className={styles.tableListForm}>
              <Row gutter={{md: 8, lg: 24, xl: 48}}>
                {
                  formItems.map((itemProps, index) => {
                    return <Col md={8} sm={24} key={index}>
                      <FormItem form={form} {...itemProps}/>
                    </Col>
                  })
                }
                <Col md={16} sm={24} className={styles.submitButtons}>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>
                    重置
                  </Button>
                </Col>
              </Row>
            </Form>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.handleAdd}>
                新建
              </Button>
            </div>
            <Detail visible={modalVisible} data={record} onCancel={this.handleModalCancel}/>
            <StandardTable
              loading={loading}
              dataSource={data}
              pagination={{
                current: currentPage + 1,
                pageSize,
                total
              }}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
            />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
