/**
 * Created by DengYiKun on 2017/2/14.
 */
import React from 'react'
import {Form, Col, Input} from 'antd'

const FormItem = Form.Item

/**
 * 封装 antd Form.Item
 */
const CustomFormItem = props => {
  const {
    form, //来自经过 Form.create 包装过的父组件
    render, //自定义渲染方法，渲染返回值，传入 form 作为参数
    label, //label 标签的文本，同 Form.Item label
    help, //控件下的提示信息，同 Form.Item help
    id, //Form.Item 以及组件的 key
    children, //将被 getFieldDecorator 包装的控件
    required, //是否必填
    span, //组件整体布局
    onChange, //控件改变时的回调，传入 value, form, data(组件自定义的附加参数) 作为参数
    initialValue, //设置控件初始值的方法，传入 formData 作为参数
    rules, //校验规则，同 options.rules
    valuePropName, //控件值的属性，同 options.valuePropName
    trigger, //收集子节点的值的时机，同 options.trigger
    validateTrigger, //校验子节点值的时机，同 options.validateTrigger
  } = props
  const {getFieldDecorator} = form
  return render ? render(form) :
    <FormItem {...span} style={props.style} label={label} help={help}>
      {getFieldDecorator(id, {
        initialValue,
        rules: [...(rules || []), {
          required: required, message: '这是必填项！'
        }],
        valuePropName: valuePropName || 'value',
        trigger: trigger || 'onChange',
        validateTrigger: validateTrigger || 'onChange',
        onChange: (value, data) => {
          if (onChange) {
            onChange(value, form, data)
          }
        }
      })(children || <Input placeholder={'请输入' + label}/>)}
    </FormItem>
}

export default CustomFormItem
