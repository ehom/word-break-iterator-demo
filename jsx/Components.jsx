const URL = {
  CLOUD_FUNCTION: "https://us-central1-ehom-gcp-demo.cloudfunctions.net/word-tokenize"
}

class InputForm extends React.Component {
  state = {
    locale: 'en-US',
    text: '',
  }
  
  handleInput(event) {
    console.debug("on text change: ", event.target.value);
    this.setState({
      text: event.target.value
    });
  }
  
  handleClick() {
    console.debug("click");
    console.debug("text to be tokenized: ", this.state.text);
    
    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        locale: this.state.locale,
        text: this.state.text
      })
    };

    fetch(URL.CLOUD_FUNCTION, requestOptions)
      .then(response => {
        console.debug("Response:", response);
        return response.json();
      })
      .then(json => {
        console.debug(json);
        this.props.onResult(json.tokens);
      })
      .catch(error => {
        console.error("[App Error]", error);
      });
  }
  
  handleLocale(event) {
    console.debug("locale:", event.target.value);
  }
  
  render() {
    return (
      <div className="p-5 border">
        <div className="mb-2">
          <p className="text-weight-bold mb-0">Locale:</p>
          <Selector onChange={this.handleLocale.bind(this)} />
        </div>
        <div className="mb-4">
          <p className="text-weight-bold mb-0">Input:</p>
          <TextInput onChange={this.handleInput.bind(this)} />
        </div>
        <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>Submit</button>
      </div>
    );
  }
}

const TextInput = ({onChange}) => {
  return (
    <input type="texst" className="form-control" placeholder="Enter text to be tokenized" onChange={onChange}/>
  );
};

const Output = ({tokens}) => {
  const badges = tokens.map((token, index) => {
    return <span key={index} className="app-badge">{token}</span>;
  })
  return <div>{badges}</div>;
};

const Selector = ({onChange}) => {
  // todo....pass this in
  const options = {
    "en-US": "English",
    "ja-JP": "Japanese",
    "zh-CN": "Chinese",
    "zh-TW": "Chinese",
    "zh-HK": "Chinese",
  };
  const menuItems = Object.entries(options).map((entry) => {
    const [key, value] = entry;
    return <option key={key}>{value} ({key})</option>;
  });
  return <select className="form-control" onChange={onChange}>{menuItems}</select>;
};
