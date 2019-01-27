import React, {PureComponent} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {
  Form,
  Button,
  Card,
  Divider,
  message,
  Spin,
  Table,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FooterToolbar from '@/components/FooterToolbar';
import DescriptionList from '@/components/DescriptionList';

const {Description} = DescriptionList;

@connect(({loading}) => ({
  loading: loading.models.order,
}))
@Form.create()
class Detail extends PureComponent {
  state = {
    isAdd: true,
    data: {
      orderItems: [],
      totalFee: 0,
    }
  }

  componentDidMount() {
    const {match, dispatch} = this.props
    const id = match.params.id
    if (id) {
      this.setState({isAdd: false})
      dispatch({
        type: 'order/fetchById',
        payload: {
          id
        },
        callback: (data) => {
          this.props.form.setFieldsValue({
            ...data,
            id
          })
          this.setState({data})
        }
      });
    }
  }

  handleSubmit = e => {
    const {dispatch, form} = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: values.id ? 'dish/update' : 'dish/add',
          payload: values,
          callback: () => {
            message.success(values.id ? '修改成功！' : '新增成功！', 2)
            setTimeout(() => {
              this.props.history.goBack()
            }, 2000)
          }
        });
      }
    });
  };

  cancel = () => {
    this.props.history.goBack()
  }



  columns = [
    {
      title: '菜品名称',
      dataIndex: 'name',
    },
    {
      title: '数量',
      dataIndex: 'dishNum',
      key: 'dishNum',
    },
    {
      title: '菜品封面图',
      dataIndex: 'picUrl',
      render: text => text ?
        <div style={{
          width: '75px',
          height: '75px',
          background: '#f1f1f1 no-repeat center center / cover',
          display: 'inline-block',
          backgroundImage: `url(${text})`,
        }}>
        </div> : '暂无图片',
      align: 'center',
    },
    {
      title: '菜品价格',
      dataIndex: 'price',
      render: text => text ? `￥ ${text}` : '',
    },
  ];

  render() {
    const {form, loading } = this.props;
    const {isAdd, data} = this.state;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };

    return (
      <PageHeaderWrapper
        title={(isAdd ? '新增' : '修改') + '菜品'}
      >
        <Spin spinning={!!loading}>
          <Card bordered={false} style={{marginBottom: 80}}>
            <Form onSubmit={this.handleSubmit} style={{marginTop: 20}}>
              <DescriptionList size="large" style={{ marginBottom: 32 }}>
                <Description term="订单编号">{data.id}</Description>
                <Description term="下单时间">{moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')}</Description>
                <Description term="下单客户">1234123421</Description>
                <Description term="用餐桌号">{data.diningTableNum}</Description>
                <Description term="用餐人数">{data.mealsNum}</Description>
                <Description term="用餐时间">{}</Description>
              </DescriptionList>
              <Divider style={{ marginBottom: 32 }} />
              <DescriptionList size="large" title={'菜品信息'} style={{ marginBottom: 32 }}>
                {
                  data.orderItems.map((item, index) =>
                    <Description term={item.name}>{item.dishNum} 份</Description>
                  )
                }
              </DescriptionList>
              <Divider style={{ marginBottom: 32 }} />
              <DescriptionList size="large" col={1} style={{ marginBottom: 32 }}>
                <Description term="备注信息">{data.remark}</Description>
                <Description term="订单价格">{data.totalFee.toFixed(2)} ￥</Description>
                <Description term="联系人">{data.payer}</Description>
              </DescriptionList>
            </Form>
          </Card>
        </Spin>
        <FooterToolbar>
          <Button onClick={this.cancel} loading={loading}>
            取消
          </Button>
          {/*<Button onClick={this.handleSubmit} loading={loading}*/}
                  {/*type={'primary'} style={{marginLeft: 8}}>*/}
            {/*保存*/}
          {/*</Button>*/}
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default Detail;
