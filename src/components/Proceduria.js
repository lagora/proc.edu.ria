import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../redux/actions';

import Pillar from './Pillar';
import Player from './Player';

export class Proceduria extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {seed: 'proc.edu.ria', size: 1}
    // }
    // componentWillMount() {
    //     console.info('Proceduria', {...this.props});
    //     this.props.actions.setSeed(this.state.seed);
    //     this.props.actions.setSize(this.state.size);
    // }
    render() {
        const {mixins} = this.props;
        console.info('render', this.props);
        return (
            <a-scene>
                <a-assets>
                    {mixins && mixins.map(mixin => <a-mixins key={mixin.id} {...mixin}/>)}
                </a-assets>
                <Pillar {...this.props.props}/>
                <Player {...{props: this.props.props.player}}/>
            </a-scene>
        );
    }
};

export default connect(
    state => ({...state.proceduria}),
    (dispatch, props) => ({actions: bindActionCreators(actions, dispatch)})
)(Proceduria);