import React, { Component } from 'react';
import fs from 'fs-extra';

class GetFile extends Component {
  componentDidMount() {
    // 获取public文件夹的路径
    const publicPath = process.env.PUBLIC_URL;

    // 使用fs-extra模块读取public文件夹下的所有文件
    fs.readdir(publicPath, (err, files) => {
      if (err) {
        console.error('无法读取public文件夹:', err);
        return;
      }

      // 打印public文件夹下的所有文件名
      console.log('public文件夹下的所有文件:', files);
      
      // 这里可以将文件名存储在组件的状态中，以便在渲染中使用
      // this.setState({ files });
    });
  }

  render() {
    // 在渲染中使用文件名
    // const { files } = this.state;

    return (
      <div>
        {/* 在这里渲染你的组件内容 */}
      </div>
    );
  }
}

export default GetFile;
