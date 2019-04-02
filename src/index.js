import { h, render } from 'preact';
import 'preact/debug';
import AutoComplete from './modules/autocomplete';

render(<AutoComplete />, document.getElementById('app'));
