import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Form,
  Input,
  Button,
  Card,
  Switch,
  message,
  Spin,
  Select,
  Rate,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FooterToolbar from '@/components/FooterToolbar';
import FormItem from '@/components/FormItem';
import Image from '@/components/Image';
import InputNumber from '@/components/InputNumber';

const {TextArea} = Input;
const {Option} = Select;

@connect(({loading}) => ({
  loading: loading.models.dish,
}))
@Form.create()
class Detail extends PureComponent {
  state = {
    isAdd: true
  }

  componentDidMount() {
    // const {match, dispatch} = this.props
    // const id = match.params.id
    // if (id) {
    //   this.setState({isAdd: false})
    //   dispatch({
    //     type: 'poi/getById',
    //     payload: {
    //       id
    //     },
    //     callback: (data) => {
    //       this.props.form.setFieldsValue({
    //         ...data,
    //         id
    //       })
    //     }
    //   });
    // }
  }

  handleSubmit = e => {
    const {dispatch, form} = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: values.id ? 'poi/put' : 'dish/add',
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

  render() {
    const {form, loading } = this.props;
    const {isAdd} = this.state;

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

    const formItems = [
      {
        label: '菜品名称',
        id: 'name',
        required: true,
        span: formItemLayout
      },
      {
        label: '菜品价格',
        id: 'price',
        children: <InputNumber style={{width: '100%'}}/>,
        required: true,
        span: formItemLayout
      },
      {
        label: '菜品类型',
        id: 'dishTypeId',
        span: formItemLayout
      },
      {
        label: '菜品封面',
        id: 'picUrl',
        children: <Image accept={'image/png,image/jpeg'}/>,
        span: formItemLayout
      },
      {
        label: '备注',
        id: 'description',
        children: <TextArea style={{minHeight: 32}} placeholder="请输入备注" rows={4}/>,
        span: formItemLayout
      },
      {
        id: 'id',
        style: {display: 'none'}
      },
    ]

    return (
      <PageHeaderWrapper
        title={(isAdd ? '新增' : '修改') + '菜品'}
      >
        <Spin spinning={!!loading}>
          <Card bordered={false} style={{marginBottom: 80}}>
            <Form onSubmit={this.handleSubmit} style={{marginTop: 20}}>
              {
                formItems.map((itemProps, index) => {
                  return <FormItem key={index} form={form} {...itemProps}/>
                })
              }
            </Form>
          </Card>
        </Spin>
        <FooterToolbar>
          <Button onClick={this.cancel} loading={loading}>
            取消
          </Button>
          <Button onClick={this.handleSubmit} loading={loading}
                  type={'primary'} style={{marginLeft: 8}}>
            保存
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default Detail;
