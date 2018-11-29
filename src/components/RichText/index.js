import React, {PureComponent} from 'react';
import {connect} from "dva";
import {Spin} from 'antd';
import WangEditor from 'wangeditor'
import './index.less';

@connect()
class RichText extends PureComponent {
  state = {
    isInitialled: false,
    loading: false,
  };

  componentDidMount() {
    const {onChange} = this.props
    let editor = new WangEditor(this.editor)
    editor.customConfig.onchangeTimeout = 500
    editor.customConfig.onchange = onChange
    editor.customConfig.uploadImgServer = '/upload'
    editor.customConfig.customUploadImg = this.customUploadImg
    editor.customConfig.menus = [
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      'fontName',  // 字体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      // 'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      'emoticon',  // 表情
      'image',  // 插入图片
      // 'table',  // 表格
      // 'video',  // 插入视频
      // 'code',  // 插入代码
      'undo',  // 撤销
      'redo',  // 重复
    ]
    editor.create()
    this.setState({
      editor
    })
  }

  customUploadImg = (files, insert) => {
    const {dispatch} = this.props
    this.setState({loading: true})
    let count = 0
    files.map(file => {
      count += 1
      dispatch({
        type: 'upload/upload',
        payload: {
          file
        },
        callback: file => {
          if (files.length === count) {
            this.setState({loading: false})
          }
          insert(file.url)
        }
      });
    })
  }

  componentDidUpdate(prevProps) {
    const {value} = this.props
    const {editor, isInitialled} = this.state
    if (editor && value && !isInitialled) {
      editor.txt.html(value)
      this.setState({
        isInitialled: true
      })
    }
  }

  render() {
    const {loading} = this.state
    return (
      <Spin spinning={loading}>
        <div ref={editor => this.editor = editor}>
        </div>
      </Spin>
    );
  }
}

export default RichText;
