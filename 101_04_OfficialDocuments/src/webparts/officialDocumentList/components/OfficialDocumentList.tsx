import * as React from 'react';
import { IOfficialDocumentListProps } from './IOfficialDocumentListProps';
import { IOfficialDocumentListState } from '../interfaces/IOfficialDocumentListState';
import { OfficialDocumentService } from '../../services/OfficialDocumentService';
import { IOfficialDocumentService } from '../../services/IOfficialDocumentService';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class OfficialDocumentList
  extends React.Component
    <
      IOfficialDocumentListProps, // properties interface
      IOfficialDocumentListState  // states interface
    >
{

  private _services: IOfficialDocumentService;

  constructor(props: IOfficialDocumentListProps, state: IOfficialDocumentListState){
    super(props);

    this.state = {
      total: 0,
      items: []
    }

    // 0001200: 通过父级WebPart中的Context里的SPHttpClient对象，传递到内部React Component中
    this._services = new OfficialDocumentService(this.props.context.spHttpClient);
  }

  public async componentDidMount() {
    let resp = await this._services.readItems("", "");
    console.info(resp);
    this.setState({
      items: resp.value
    });
  }

  private onItemInvoked = (item: any) : void => {
    console.log(item);
  }

  public render(): React.ReactElement<IOfficialDocumentListProps> {

    const columns: IColumn[] = [{
      key: '_column1',
      name: 'File Type',
      iconName: 'Page',
      isIconOnly: true,
      fieldName: 'name',
      minWidth: 16,
      maxWidth: 16,
      onRender: (item) => {
        return <Icon  iconName="Airplane"></Icon>;
      }
    },{
      key: '_subject',
      name: 'Subject',
      fieldName: 'Subject',
      minWidth: 70,
      maxWidth: 200,
      isResizable: true,
      data: 'string',
      isPadded: true,
      onRender: (item) => {
        return (
          <a href={"/sites/develop/SitePages/Official-Document-Content.aspx?p_id=" + item.Id} target="_blank">{item.Subject}</a>
        );
      }
    },{
      key: '_Modified',
      name: 'Modified',
      fieldName: 'Modified',
      minWidth: 70,
      maxWidth: 200,
      isResizable: true,
      data: 'datetime',
      isPadded: true
    },{
      key: '_Top',
      name: 'Is Top1',
      fieldName: 'IstOP',
      minWidth: 40,
      maxWidth: 80,
      isResizable: true,
      data: 'string',
      isPadded: true,
      onRender: (item) => {
        if(item.IsTop){
          return <Icon  iconName="BugSolid"></Icon>;
        }
      }
    }];

    console.info(this.state.items);

    return(
      <div>
        <DetailsList
            items={this.state.items}
            columns={columns}
            selectionMode={SelectionMode.none}
            setKey="none"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            isHeaderVisible={true}
            onItemInvoked={this.onItemInvoked}
        ></DetailsList>
      </div>
    );
  }
}
