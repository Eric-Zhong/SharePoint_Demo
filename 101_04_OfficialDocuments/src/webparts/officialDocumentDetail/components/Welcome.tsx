import * as React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export default class Welcome extends React.Component<any> {

  constructor(props: any){
    super(props);
  }

  public render(): React.ReactElement<any> {

    return(
      <div className="ms-Grid">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-md12">
            <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={true}
            dismissButtonAriaLabel="Close"
            >
              如果你看到这个信息，说明该组件运行正常。它需要通过“公文列表”中跳转到此页面才能正常显示相关信息。
              如果你搞不定，请联系网站管理员或系统管理员，谢谢。
          </MessageBar>
          </div>
        </div>
      </div>
      );
  }
}
