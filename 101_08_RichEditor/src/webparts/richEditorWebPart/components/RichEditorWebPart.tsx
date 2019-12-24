import * as React from 'react';
import styles from './RichEditorWebPart.module.scss';
import { IRichEditorWebPartProps } from './IRichEditorWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';

import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import ClassicEditor from 'ckeditor5-classic';

export default class RichEditorWebPart extends React.Component<IRichEditorWebPartProps, {}> {

  private CKEDITOR_CONFIG = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        'link',
        'bulletedList',
        'numberedList',
        'imageUpload',
        'insertTable',
        'blockQuote',
        'undo',
        'redo'
      ]
    },
    image: {
      toolbar: [
        'imageStyle:full',
        'imageStyle:side',
        '|',
        'imageTextAlternative'
      ]
    },
    fontFamily: {
      options: [
        'Arial',
        'Helvetica, sans-serif',
        'Courier New, Courier, monospace',
        'Georgia, serif',
        'Lucida Sans Unicode, Lucida Grande, sans-serif',
        'Tahoma, Geneva, sans-serif',
        'Times New Roman, Times, serif',
        'Trebuchet MS, Helvetica, sans-serif',
        'Verdana, Geneva, sans-serif'
      ]
    },
    language: 'en'
  };


  /* Load CKeditor RTE*/
  public InitializeCKeditor(): void {
    try {
      ClassicEditor.defaultConfig = this.CKEDITOR_CONFIG;
      /*Replace textarea with classic editor*/
      ClassicEditor
        .create(document.querySelector("#editor1"), {
        }).then(editor => {
          console.log("CKEditor5 initiated");
        }).catch(error => {
          console.log("Error in Classic Editor Create " + error);
        });
    } catch (error) {
      console.log("Error in  InitializeCKeditor " + error);
    }
  }

  componentDidMount(){    
    this.InitializeCKeditor();    
  } 


  public render(): React.ReactElement<IRichEditorWebPartProps> {
    return (
      <div>
        <textarea id="editor1"></textarea>
      </div>
    );
  }
}
