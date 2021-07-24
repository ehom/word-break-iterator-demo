class App extends React.Component {  
  state = {
    tokens: []
  }
  
  handleResult(tokens) {
    console.debug("Tokens Returned: ", tokens);
    this.setState({
      tokens: tokens
    });
  }
  
  render() {
    return (
      <div className="container mt-5">
        <h2 className="m-4">Word Break Iterator Demo</h2>
        <InputForm onResult={this.handleResult.bind(this)} />
        <hr />
        <div className="p-5 border">
          <h4>Tokens:</h4>
          <Output tokens={this.state.tokens} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
