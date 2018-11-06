import React, { Component } from 'react';
import { Motion, spring, StaggeredMotion, TransitionMotion } from 'react-motion';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messageInput: '',
      currentId: 4,
      messages: [
        {
          id: 1,
          text: 'Hello World',
        },
        {
          id: 2,
          text: 'Its Ya Boi',
        },
        {
          id: 3,
          text: 'Dev 4Lyfe',
        },
      ],
      menuOpen: false,
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      messageInput: value,
    });
  };

  deleteMessage = key => {
    const { messages } = this.state;
    const newMessages = messages.filter(({ id }) => id !== key);
    this.setState({
      messages: newMessages,
    });
  };

  handleSubmit = e => {
    const { messages, messageInput, currentId } = this.state;
    e.preventDefault();
    this.setState({
      messages: [...messages, { text: messageInput, id: currentId }],
      messageInput: '',
      currentId: currentId + 1,
    });
  };

  willEnter = () => {
    return {
      height: 0,
    };
  };

  willLeave = () => {
    return {
      height: spring(0),
    };
  };

  getDefaultStyles = () => {
    const { messages } = this.state;
    return messages.map(({ id, text }) => ({ key: id, data: text, style: { height: 0 } }));
  };

  getStyles = () => {
    const { messages } = this.state;
    const mapped = messages.map(({ id, text }) => ({ key: id, data: text, style: { height: spring(60) } }));
    return mapped;
  };

  listItems = styles => {
    const styledList = styles.map(({ key, data, style }) => {
      return (
        <div
          className="message"
          style={{ height: style.height }}
          onClick={() => this.deleteMessage(key)}
          onKeyDown={() => null}
          key={key}
        >
          {data}
        </div>
      );
    });

    return <React.Fragment>{styledList}</React.Fragment>;
  };

  render() {
    const { menuOpen, messageInput } = this.state;
    return (
      <div className="App">
        <Motion
          defaultStyle={{ height: 0, opacity: 0 }}
          style={{ height: spring(menuOpen ? 600 : 0), opacity: spring(1) }}
        >
          {style => (
            <div>
              <nav className="nav">
                React Motion
                <div>
                  Dropdown height is: {style.height} Opacity: {style.opacity}
                </div>
                <button type="button" className="menu-toggle" onClick={() => this.setState({ menuOpen: !menuOpen })}>
                  <div />
                  <div />
                  <div />
                </button>
              </nav>

              <div className="nav-drop" style={{ height: style.height, opacity: style.opacity }}>
                <h1> Surprise! </h1>
              </div>
            </div>
          )}
        </Motion>
        <header className="App-header">
          <StaggeredMotion
            defaultStyles={[{ left: 1090 }, { left: 1090 }, { left: 1090 }]}
            styles={prevStyles => [
              { left: spring(0, { precision: 90, stiffness: 60, damping: 5 }) },
              { left: prevStyles[0].left },
              { left: prevStyles[1].left },
            ]}
          >
            {styles => (
              <div>
                <img style={{ left: styles[0].left }} src={logo} className="App-logo" alt="logo" />
                <h1 style={{ left: styles[1].left }} className="App-title title">
                  Welcome to React Motion
                </h1>
                <h3 style={{ left: styles[2].left }} className="App-title subtitle">
                  Watch This Workshop Change Your Life
                </h3>
              </div>
            )}
          </StaggeredMotion>
        </header>

        <form onSubmit={this.handleSubmit}>
          <input type="text" value={messageInput} onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
        <TransitionMotion
          defaultStyles={this.getDefaultStyles()}
          styles={this.getStyles()}
          willEnter={this.willEnter}
          willLeave={this.willLeave}
        >
          {this.listItems}
        </TransitionMotion>
      </div>
    );
  }
}

export default App;
