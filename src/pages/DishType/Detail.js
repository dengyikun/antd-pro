import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Form,
  Input,
  Button,
  Card,
  Modal,
  message,
  Spin,
  Select,
  Rate,
} from 'antd';
import FormItem from '@/components/FormItem';

const {TextArea} = Input;
const {Option} = Select;

@connect(({loading}) => ({
  loading: loading.models.dishType,
}))
@Form.create()
class Detail extends PureComponent {
  state = {}

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
    const {dispatch, form, onCancel} = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: values.id ? 'dishType/put' : 'dishType/add',
          payload: values,
          callback: () => {
            message.success(values.id ? '修改成功！' : '新增成功！', 2)
            setTimeout(onCancel, 2000)
          }
        });
      }
    });
  };

  render() {
    const {form, loading, data} = this.props;

    const formItems = [
      {
        label: '类型名称',
        id: 'name',
        required: true,
      },
      {
        label: '类型描述',
        id: 'description',
        children: <TextArea style={{minHeight: 32}} placeholder="请输入备注" rows={4}/>,
      },
      {
        id: 'id',
        style: {display: 'none'}
      },
    ]

    return (
      <Modal title={(data ? '修改' : '新增') + '菜品类型'}
             okText={'保存'} onOk={this.handleSubmit}
             {...this.props}>
        <Spin spinning={!!loading}>
          <Form layout={'vertical'}>
            {
              formItems.map((itemProps, index) => {
                return <FormItem key={index} form={form} {...itemProps}/>
              })
            }
          </Form>
        </Spin>
      </Modal>
    );
  }
}

export default Detail;
