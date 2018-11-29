import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Upload, Icon, Modal, message} from 'antd';

const beforeUpload = (file) => {
  const isLt = file.size / 1024 / 1024  < 5;
  if (!isLt) {
    message.error('请上传小于 5M 的图片');
  }
  return isLt;
}

@connect()
class Image extends PureComponent {
  state = {
    previewVisible: false,
    previewImage: '',
    loading: false,
  };

  handleCancel = () => this.setState({previewVisible: false})

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  customRequest = ({file}) => {
    const {dispatch, onChange, value} = this.props;
    this.setState({
      loading: true
    })

    dispatch({
      type: 'upload/upload',
      payload: {
        file
      },
      callback: file => {
        onChange([...(value || []),file.url])
        this.setState({
          loading: false
        })
      }
    });
  }

  onRemove = data => {
    const {onChange, value} = this.props;
    let newValue = [...value]
    newValue.splice(newValue.findIndex(item => item === data.url), 1)
    onChange(newValue)
    return true
  }

  render() {
    const {previewVisible, previewImage, loading,} = this.state;
    const {value, accept, size} = this.props
    let fileList = []
    if (value) {
      fileList = Array.from(value, (item, index) => ({
        uid: index,
        url: item
      }))
    }
    return (
      <div className="clearfix">
        <Upload
          accept={accept}
          listType="picture-card"
          fileList={fileList}
          beforeUpload={beforeUpload}
          onPreview={this.handlePreview}
          onRemove={this.onRemove}
          customRequest={this.customRequest}
        >
          {
            fileList.length < (size || 1) &&
            <div>
              <Icon style={{fontSize: '32px', color: '#999'}}
                    type={loading ? 'loading' : 'plus'}/>
              <div style={{marginTop: '8px', color: '#666'}}>Upload</div>
            </div>
          }
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
    );
  }
}

export default Image;
