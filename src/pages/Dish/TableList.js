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

import styles from './TableList.less';

const {Option} = Select;

/* eslint react/no-multi-comp:0 */
@connect(({dish, loading}) => ({
  dish,
  loading: loading.models.dish,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  componentDidMount() {
    this.fetchDish()
  }

  fetchDish = (params) => {
    const {
      dish: {
        currentPage,
        pageSize,
      },
      dispatch,
    } = this.props;
    dispatch({
      type: 'dish/fetch',
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
      ...formValues,
    };

    this.fetchDish(params)
  };

  handleFormReset = () => {
    const {form,} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    this.fetchDish()
  };

  toggleForm = () => {
    const {expandForm} = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const {dispatch, form} = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.setState({
        formValues: fieldsValue,
      });

      this.fetchDish(fieldsValue)
    });
  }

  handleAdd = () => {
    this.props.history.push('/dish/detail')
  }

  handleEdit = record => () => {
    this.props.history.push('/dish/detail/' + record.id)
  }

  columns = [
    {
      title: '#',
      dataIndex: 'index',
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: '菜品封面图',
      dataIndex: 'picUrl',
      render: text => text ?
        <div className={styles.cover}
             style={{backgroundImage: `url(${text})`}}>
        </div> : '暂无图片',
      width: 120,
      align: 'center',
    },
    {
      title: '菜品名称',
      dataIndex: 'name',
      width: 140,
    },
    {
      title: '菜品价格',
      dataIndex: 'price',
      render: text => text ? `￥ ${text}` : '',
      width: 120,
    },
    {
      title: '菜品类型',
      dataIndex: 'typeName',
      width: 140,
    },
    {
      title: '菜品简介',
      dataIndex: 'description',
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
        <a onClick={this.handleEdit(record)}>编辑</a>
      ),
      width: 70,
      align: 'center',
    },
  ];

  render() {
    const {
      dish: {
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
      id: 'name',
      label: '规则名称',
      children: <Input placeholder="请输入"/>
    }, {
      id: 'status',
      label: '使用状态',
      children:
        <Select placeholder="请选择" style={{width: '100%'}}>
          <Option value="0">关闭</Option>
          <Option value="1">运行中</Option>
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
      <PageHeaderWrapper title="菜品列表">
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
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>
                  重置
                </Button>
                {
                  expandForm ?
                    <a style={{marginLeft: 8}} onClick={this.toggleForm}>
                      收起 <Icon type="up"/>
                    </a> :
                    <a style={{marginLeft: 8}} onClick={this.toggleForm}>
                      展开 <Icon type="down"/>
                    </a>
                }
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
