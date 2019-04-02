import { h, Component } from 'preact';
import Fuse from 'fuse.js';
import ticketList from '../data';

const FUSE_OPTIONS = {
    shouldSort: true,
    tokenize: true,
    matchAllTokens: true,
    findAllMatches: true,
    includeScore: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['code', 'description']
};

export default class AutoComplete extends Component {

    constructor() {
        super();
        this.fuse = new Fuse(ticketList, FUSE_OPTIONS);
        this.state = {
            searchInput: '',
            results: []
        };
    }

    searchTickets(e) {
        const searchInput = e.target.value;
        this.setState({ searchInput });
        if (searchInput.length <= 1) {
            return;
        }
        const results = this.fuse.search(e.target.value);
        this.setState({ results });
    }

    renderList() {
        return this.state.results.map(({ item }) => (
            <div className="result-item">
                {item.code}: <span className="result-item__description">{item.description}</span>
            </div>
        ));
    }

    render(props, state) {
        return (
            <div className="autocomplete-wrap">
                <input onKeyDown={this.searchTickets.bind(this)} value={state.searchInput} />
                <div className="result-list">{this.renderList()}</div>
            </div>
        );
    }

}
