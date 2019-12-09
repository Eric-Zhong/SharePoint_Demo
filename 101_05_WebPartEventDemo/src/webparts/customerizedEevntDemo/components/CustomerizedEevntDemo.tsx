import * as React from 'react';
import styles from './CustomerizedEevntDemo.module.scss';
import { ICustomerizedEevntDemoProps } from './ICustomerizedEevntDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import ChildrenComponentLevel1, { IChildrenComponentLevel1Props } from './ChildrenComponentLevel1';
import { noWrap } from '@uifabric/styling/lib';

export interface ICustomerizedEevntDemoState{
  myName: string;
}

export default class CustomerizedEevntDemo extends React.Component<ICustomerizedEevntDemoProps, ICustomerizedEevntDemoState> {

  // 00300：定义一个Click后要执行的方法
  private clickMe(): void {
    let now = new Date();
    this.setState({
      myName: 'clicked - ' + now.getMilliseconds()
    })
  }


  // 00100: 定义自己Component的构造函数，将本组件的Props定义参数传递给构造函数
  constructor(props: ICustomerizedEevntDemoProps){

    super(props);   // 构造函数中，必须先执行 super(props) 方法。

    this.state = {
      myName: 'xuzhong'
    }

    // 00400：给Click方法绑定当前this。如果不加这个 bind 方法，click 中的 this 将指向 控件自己
    this.clickMe = this.clickMe.bind(this);
    this.createChildrenComponent = this.createChildrenComponent.bind(this);
  }

  public componentDidUpdate(prevProps: ICustomerizedEevntDemoProps, prevState: ICustomerizedEevntDemoState): void {
    console.log('CustomerizedEevntDemo.componentDidUpdate()');
    console.log(this.props);
  }

  private createChildrenComponent(): React.ReactElement<IChildrenComponentLevel1Props>{
    return (
      <ChildrenComponentLevel1 childrenName={this.state.myName}></ChildrenComponentLevel1>
    );
  }

  // 00200：定义 render() 方法输出 Element；这里同时声明了要 render 出来的 component 的特性。
  public render(): React.ReactElement<ICustomerizedEevntDemoProps> {

    console.log('CustomerizedEevntDemo.render()');
    console.log(this.state);

    return (
      <div className={styles.customerizedEevntDemo} >
        <div className={styles.container}>
        <div className={styles.row}>
          </div>
          <div className={styles.row}>
            <DefaultButton onClick={this.clickMe}>点我</DefaultButton>
          </div>
          <div className={styles.row}>当前“CustomerizedEevntDemo.props.description”：{this.props.description}</div>
          <div className={styles.row}>当前“CustomerizedEevntDemo.state.myName”：{this.state.myName}</div>
          <div className={styles.row}>
            {this.createChildrenComponent()}
          </div>
        </div>
      </div >
    );
  }
}
