import React from 'react';
import Icon from 'react-fontawesome';

// Search.SearchForm
export default class SearchForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      keyword: this.props.keyword,
      searchedKeyword: this.props.keyword,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  search() {
    if (this.state.searchedKeyword != this.state.keyword) {
      this.props.onSearchFormChanged({keyword: this.state.keyword});
      this.setState({searchedKeyword: this.state.keyword});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.search({keyword: this.state.keyword});
  }

  handleChange(event) {
    const keyword = event.target.value;
    this.setState({keyword});
  }

  render() {
    return (
      <form className="form form-group input-group" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="q"
          value={this.state.keyword}
          onChange={this.handleChange}
          className="form-control"
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-default">
              <Icon className="search-top-icon" name="search" />
            </button>
          </span>
      </form>
    );
  }
}

SearchForm.propTypes = {
  onSearchFormChanged: React.PropTypes.func.isRequired,
};
SearchForm.defaultProps = {
};
