import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Table,
  Button,
  Menu,
  Modal,
  InputNumber,
  DatePicker,
  message,
  Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FormItem from '@/components/FormItem';

import styles from './TableList.less';

const {Option} = Select;

/* eslint react/no-multi-comp:0 */
@connect(({order, loading}) => ({
  order,
  loading: loading.models.order,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    expandForm: false,
    formValues: {
      status: 'finish'
    },
  };

  componentDidMount() {
    this.fetchOrder()
  }

  fetchOrder = (params) => {
    const {
      order: {
        currentPage,
        pageSize,
      },
      dispatch,
    } = this.props;
    const {formValues} = this.state;

    dispatch({
      type: 'order/fetch',
      payload: {
        ...formValues,
        currentPage,
        pageSize,
        ...params
      },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const params = {
      currentPage: pagination.current - 1,
      pageSize: pagination.pageSize,
    };

    this.fetchOrder(params)
  };

  handleFormReset = () => {
    const {form,} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    }, this.fetchOrder);
  };

  toggleForm = () => {
    const {expandForm} = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const {form} = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.setState({
        formValues: fieldsValue,
      }, this.fetchOrder);

    });
  }

  handleAdd = () => {
    this.props.history.push('/order/detail')
  }

  handleEdit = record => () => {
    this.props.history.push('/order/detail/' + record.id)
  }

  handleShowDish = record => () => {
    this.props.dispatch({
      type: 'order/fetchById',
      payload: {
        id: record.id
      },
      callback: data => {
        Modal.info({
          title: '点菜信息',
          width: 600,
          content: (
            <Table
              style={{ marginBottom: 24 }}
              pagination={false}
              dataSource={data.orderItems}
              columns={[{
                title: '菜品名称',
                dataIndex: 'name',
                key: 'name',
              }, {
                title: '数量',
                dataIndex: 'dishNum',
                key: 'dishNum',
              }, {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                render: text => text ? `￥ ${text}` : '',
              }]}
              rowKey="id"
            />
          ),
          onOk() {},
        })
      }
    })
  }

  columns = [
    {
      title: '#',
      dataIndex: 'index',
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: '桌号',
      dataIndex: 'diningTableNum',
      width: 120,
      align: 'center',
    },
    {
      title: '订单金额',
      dataIndex: 'totalFee',
      render: text => text ? `￥ ${text}` : '',
      width: 140,
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    // {
    //   title: '上线',
    //   dataIndex: 'deleteFlag',
    //   width: 70,
    //   align: 'center',
    // },
    {
      title: '操作',
      render: (text, record) => (
        <>
          <a onClick={this.handleShowDish(record)}>点菜信息</a>
          <Divider type="vertical"/>
          <a onClick={this.handleEdit(record)}>详情</a>
        </>
      ),
      width: 150,
      align: 'center',
    },
  ];

  render() {
    const {
      order: {
        data,
        currentPage,
        pageSize,
        total
      },
      form,
      loading,
    } = this.props;
    const {expandForm} = this.state

    const formItems = [{
      id: 'status',
      label: '订单状态',
      initialValue: 'finish',
      children:
        <Select placeholder="请选择" style={{width: '100%'}}>
          <Option value="paying">待支付</Option>
          <Option value="finish">已完成</Option>
          <Option value="cancel">已取消</Option>
        </Select>
    }]

    const expandFormItems = [{
      id: 'name',
      label: '规则名称',
      children: <Input placeholder="请输入"/>
    }, {
      id: 'status',
      label: '使用状态',
      children: <Select placeholder="请选择" style={{width: '100%'}}>
        <Option value="0">关闭</Option>
        <Option value="1">运行中</Option>
      </Select>
    }, {
      id: 'number',
      label: '调用次数',
      children: <InputNumber style={{width: '100%'}}/>
    }, {
      id: 'date',
      label: '更新日期',
      children: <DatePicker style={{width: '100%'}} placeholder="请输入更新日期"/>
    }, {
      id: 'status3',
      label: '使用状态',
      children: <Select placeholder="请选择" style={{width: '100%'}}>
        <Option value="0">关闭</Option>
        <Option value="1">运行中</Option>
      </Select>
    }, {
      id: 'status4',
      label: '使用状态',
      children: <Select placeholder="请选择" style={{width: '100%'}}>
        <Option value="0">关闭</Option>
        <Option value="1">运行中</Option>
      </Select>
    }]

    return (
      <PageHeaderWrapper title="已完成订单列表">
        <Card bordered={false}>
          <Form className={styles.tableListForm}>
            <Row gutter={{md: 8, lg: 24, xl: 48}}>
              {
                (expandForm ? expandFormItems : formItems).map((itemProps, index) => {
                  return <Col md={8} sm={24} key={index}>
                    <FormItem form={form} {...itemProps}/>
                  </Col>
                })
              }
              <Col md={expandForm ? 24 : 8} sm={24} className={styles.submitButtons}>
                {
                  // expandForm ?
                  //   <a onClick={this.toggleForm}>
                  //     收起 <Icon type="up"/>
                  //   </a> :
                  //   <a onClick={this.toggleForm}>
                  //     展开 <Icon type="down"/>
                  //   </a>
                }
                <Button style={{marginLeft: 8}} type="primary" onClick={this.handleSearch}>
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
