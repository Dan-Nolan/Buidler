import React, { Component } from 'react';
import apiMutation from 'utils/api/mutation';
import modifyCodeFile from 'mutations/codeFile/modify';
import UpdateWrapper from 'components/UpdateWrapper';
import CodeFileEditor from './CodeFileEditor';

class CodeFile extends Component {
  updateCode(code) {
    const { id } = this.props.codeFile;
    return apiMutation(modifyCodeFile, { id, initialCode: code });
  }
  render() {
    const { stage, codeFile } = this.props;
    const { initialCode, mode } = codeFile;
    const uniqueKey = `${codeFile.id}-initial`;
    return (
      <UpdateWrapper
        key={uniqueKey}
        debounceKey={uniqueKey}
        code={initialCode}
        child={CodeFileEditor}
        savePromise={({ code }) => this.updateCode(code)}
        onUpdate={(code) => this.updateCode(code)}
        codeFile={codeFile} stage={stage} mode={mode} />
    )
  }
}

export default CodeFile;
