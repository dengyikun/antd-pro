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
@Form.create({
  mapPropsToFields(props) {
    let fields = {}
    if (props.data) {
      Object.keys(props.data).map(key =>  {
        fields[key] = Form.createFormField({
          value: props.data[key],
        })
      })
    }
    return fields;
  },
})
class Detail extends PureComponent {
  state = {}

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.data && nextProps.form) {
  //     nextProps.form.setFieldsValue({
  //       ...nextProps.data
  //     })
  //   }
  //   return null
  // }

  handleSubmit = e => {
    const {dispatch, form} = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: values.id ? 'dishType/update' : 'dishType/add',
          payload: values,
          callback: () => {
            message.success(values.id ? '修改成功！' : '新增成功！', 2)
            setTimeout(this.handleCancel, 700)
          }
        });
      }
    });
  };

  handleCancel = () => {
    this.props.form.resetFields()
    this.props.onCancel()
  }

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
             okText={'保存'}
             onOk={this.handleSubmit}
             {...this.props}
             onCancel={this.handleCancel}>
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
