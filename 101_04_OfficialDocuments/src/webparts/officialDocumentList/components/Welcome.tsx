import * as React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IWelcomeProps } from '../interfaces/IWelcomeProps';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export default class Welcome extends React.Component<IWelcomeProps> {

  private webPartContext: IWebPartContext;

  constructor(props: IWelcomeProps){
    super(props);
    this.webPartContext = props.webPartContext;
  }

  public render(): React.ReactElement<any> {

    const wpContext = this.props.webPartContext;
    const propertyPane = wpContext.propertyPane;

    return(
      <div className="ms-Grid">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-md4">
            <PrimaryButton
            iconProps={{ iconName: 'Edit' }}
            onClick={(e)=>{
              e.preventDefault();
              propertyPane.open();
            }}
            >点击这里进行配置</PrimaryButton>
          </div>
          <div className="ms-Grid-col ms-md8">
            <MessageBar
            messageBarType={MessageBarType.info}
            isMultiline={true}
            dismissButtonAriaLabel="Close"
            >
            欢迎使用公文列表组件，请先配置本组件所使用的公文列表库名称，默认值为"OfficialDocuments"。
          </MessageBar>
          </div>
        </div>
      </div>
      );
  }
}
