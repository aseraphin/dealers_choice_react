import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], newCategory: {} };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.setState({ categories: (await axios.get("/api/categories")).data });
  }

  handleDelete(e) {
    const newCategories = this.state.categories.filter(
      (category) => category.id !== e.target.id
    );
    this.setState({ categories: newCategories });
  }

  handleChange(e) {
    const input = { id: Date.now().toString(), name: e.target.value };
    this.setState({ newCategory: input });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newCategory.name) return;
    this.setState({
      categories: [this.state.newCategory, ...this.state.categories],
      newCategory: {},
    });
  }

  render() {
    const { categories, newCategory } = this.state;

    return (
      <div>
        <header>2021 Oscars | Categories</header>
        <form onSubmit={this.handleSubmit}>
          <input
            name="name"
            placeholder="New Category"
            value={newCategory.name || ""}
            onChange={this.handleChange}
          />
          <button type="submit">Add Category</button>
        </form>
        <div className="nominees">
          {categories.map((category) => {
            return (
              <div className="nominee">
                <p>{category.name}</p>
                <button id={category.id} onClick={this.handleDelete}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
