import React, {PureComponent} from 'react';
import ImageList from '@/components/ImageList';

class Image extends PureComponent {
  render() {
    const {value, onChange, accept} = this.props
    return (
      <ImageList value={value ? [value] : []} onChange={value => {
        onChange(value[0] || '')
      }} accept={accept}/>
    );
  }
}

export default Image;
