import React, {PureComponent} from 'react';
import {Upload, Icon, Modal, message} from 'antd';
import {getAuthority} from '@/utils/authority';

const beforeUpload = (file) => {
  const isLt = file.size / 1024 / 1024 < 5;
  if (!isLt) {
    message.error('请上传小于 5M 的图片');
  }
  return isLt;
}

class Image extends PureComponent {
  state = {
    previewVisible: false,
    previewImage: '',
    loading: false,
  };

  handleCancel = () => this.setState({previewVisible: false})

  handleChange = (info) => {
    const {onChange, value} = this.props;
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      this.setState({
        loading: true
      })
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      onChange([...(value || []), info.file.response.data])
      this.setState({
        loading: false
      })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
      this.setState({
        loading: false
      })
    }
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleRemove = data => {
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
        uid: item,
        url: item
      }))
    }
    return (
      <div className="clearfix">
        <Upload
          name={'file'}
          action={'/api/oss/uploading'}
          headers={{
            token: getAuthority('token'),
          }}
          accept={accept}
          listType="picture-card"
          defaultFileList={fileList}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
          onPreview={this.handlePreview}
          onRemove={this.handleRemove}
        >
          {
            fileList.length < (size || 1) &&
            <>
              <Icon style={{fontSize: '32px', color: '#999'}}
                    type={loading ? 'loading' : 'plus'}/>
              <div style={{marginTop: '8px', color: '#666'}}>Upload</div>
            </>
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
