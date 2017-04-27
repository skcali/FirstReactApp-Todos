import React, { Component } from 'react';
import Projects from './Components/projects'
import $ from 'jquery'
import AddProject from './Components/addProject'
import uuid from 'uuid'
import Todos from './Components/todos'

class App extends Component {
  constructor(){
    super();
    this.state = {
      projects: [],
      todos: []
    }
  }

  getTodos(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      datatype: 'json',
      cache: false,
      success: function(data){
        this.setState({todos: data}, function(){
          console.log(this.state);
        })
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    });
  }

  getProjects(){
    this.setState({projects: [{
          id: uuid.v4(),
          title: 'Buisness Website',
          category: 'Web Design'
        },
        {
          id: uuid.v4(),
          title: 'Social App',
          category: 'Mobile Deveilopment'
        },
        {
          id: uuid.v4(),
          title: 'Ecommerce Shopping Cart',
          category: 'Web Development'
        }
        ]});
  }

  componentWillMount() {
        this.getTodos();
  }

  componentDidMount(){
    this.getTodos();
  }

  handleAddProject(project) {
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects:projects})
  }

  handleDeleteProject(id){
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({projects:projects})
  }

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)} />
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
        <hr />
        <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;
