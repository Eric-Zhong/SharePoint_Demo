import * as React from 'react';

export interface IChildrenComponentLevel1Props {
    childrenName: string;
}

export interface IChildrenComponentLevel1State {
    childrenName: string;
    currentName: string;
}

export default class ChildrenComponentLevel1 extends React.Component<IChildrenComponentLevel1Props, IChildrenComponentLevel1State> {

    private name: string;

    constructor(props: IChildrenComponentLevel1Props) {
        super(props);
        this.state = {
            childrenName: this.props.childrenName,
            currentName: ''
        }
        this.name = '';
    }

    public componentWillMount(): void {
        console.log('ChildrenComponentLevel1.componentWillMount()');
    }

    public componentDidUpdate(prevProps: IChildrenComponentLevel1Props, prevState: IChildrenComponentLevel1State): void {
        console.log('ChildrenComponentLevel1.componentDidUpdate()');
        console.log(prevProps);
        console.log(this.props);
        this.name = prevProps.childrenName + ' -> ' + this.props.childrenName;
    }


    public render(): React.ReactElement<IChildrenComponentLevel1Props> {
        console.log("this.name: " + this.name);
        return (
            <div className="ms-Grid">
                <div className="ms-Row">
                    <div className="ms-Col ms-md12">组件“ChildrenComponentLevel1.state.childrenName”：{this.state.childrenName}</div>
                    <div className="ms-Col ms-md12">组件“ChildrenComponentLevel1.props.childrenName”：{this.props.childrenName}</div>
                    <div className="ms-Col ms-md12">组件“ChildrenComponentLevel1.name"：{this.name}</div>
                </div>
            </div>
        );
    }
}
