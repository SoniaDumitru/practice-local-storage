import './App.css';
import React from 'react';

class App extends React.Component {
  state = {
    notes: [],
    currentNote: ""
  }

  addNote = () => {
    let notes = [...this.state.notes];
    notes.push(this.state.currentNote);
    this.setState({notes, currentNote:""})
  }

  deleteNote = (indexToDelete) => {
    let notes = [...this.state.notes].filter((note, index) => index !== indexToDelete);
    this.setState({ notes })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.notes.length !== this.state.notes.length) {
      const json = JSON.stringify(this.state.notes);
      localStorage.setItem("notes", json);
    }
  }

  componentDidMount() {
    const json = localStorage.getItem("notes");
    const notes = JSON.parse(json);
    if (notes) {
      this.setState(() => ({ notes }));
    }
  }

  render(){
    console.log(this.state.notes)
    return (
      <div className="App">
        <h1>Local Storage Note-Taking</h1>
        <textarea 
          onChange={event => this.setState({
            currentNote: event.target.value
          })}
          value={this.state.currentNote}
          className='input' 
          placeholder='Notes'
        />
        <br/>

        <button 
          onClick={this.addNote}
          className="submitButton"
        >
          Submit
        </button>
          <ul>
          {this.state.notes.map((note, index) => 
          <div key={index}>
            <li>{note}</li>
            <button 
              className="deleteButton" 
              onClick={() => this.deleteNote(index)}
            >
              Delete
            </button>
        </div>)}
        </ul>
      </div>
    );
  }
}

export default App;
