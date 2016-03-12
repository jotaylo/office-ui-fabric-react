import * as React from 'react';
import './ExampleCard.scss';
import { default as Button, ButtonType } from '../../../components/Button/index';

let Highlight = require('react-highlight');

export interface IExampleCardProps {
  title: string;
  isOptIn?: boolean;
  code?: string;
  children?: any;
}

export interface IExampleCardState {
  isCodeVisible?: boolean;
  isExampleShown?: boolean;
}

export default class ExampleCard extends React.Component<IExampleCardProps, IExampleCardState> {

  constructor(props: IExampleCardProps) {
    super(props);

    this.state = {
      isCodeVisible: false,
      isExampleShown: props.isOptIn ? false : true
    };

    this._onToggleCodeClick = this._onToggleCodeClick.bind(this);
    this._onShowExampleClick = this._onShowExampleClick.bind(this);
  }

  public render() {
    const { title, code, children } = this.props;
    const { isCodeVisible, isExampleShown } = this.state;
    let rootClass = 'ExampleCard' + (this.state.isCodeVisible ? ' is-codeVisible' : '');
    let codeExample;

    if (code) {
      codeExample = (
        <div className='ExampleCard-code'>
          <Highlight className='typescript'>
            { code }
          </Highlight>
        </div>
      );
    }

    return (
      <div className={ rootClass }>
        <div className='ExampleCard-header'>
          <span className='ExampleCard-title ms-font-l'>{ title }</span>
          { (code ? (
          <span className='ExampleCard-toggleCode ms-font-l'>
            <Button type={ ButtonType.primary } onClick={ this._onToggleCodeClick }>{ isCodeVisible ? 'Hide code' : 'Show code' }</Button>
          </span>
          ) : null) }
        </div>
        <div className={ 'ExampleCard-content' + (isCodeVisible ? ' ms-u-slideDownIn20' : '') }>
          { codeExample }
            { isExampleShown ? (
            <div className='ExampleCard-example'>
              { children }
            </div>
            ) : (
            <Button type={ ButtonType.primary } onClick={ this._onShowExampleClick }>Show example</Button>
            ) }
        </div>
      </div>
    );
  }

  private _onToggleCodeClick() {
    this.setState({
      isCodeVisible: !this.state.isCodeVisible
    });
  }

  private _onShowExampleClick() {
    this.setState({
      isExampleShown: !this.state.isExampleShown
    })
  }
}