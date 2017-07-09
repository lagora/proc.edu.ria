import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../redux/actions';

import Pillar from './Pillar';
import District from './District';
import Sector from './Sector';
import Area from './Area';
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
        // const {mixins} = this.props;
        const {player} = this.props;
        console.info(this.props.district);
        return (
            <a-scene
                proceduria
            >
                {/*<a-assets>
                    {mixins && mixins.map(mixin => <a-mixins key={mixin.id} {...mixin}/>)}
                </a-assets>*/}
                <Pillar {...this.props.pillar}/>
                <Player {...player}/>
                {this.props.district.data.map(District)}
                {/*{this.props.sector.data.map(Sector)}
                {this.props.area.data.map(Area)}*/}
                <a-sky
                    color="#eeeeff"
                />
            </a-scene>
        );
    }
};

export default connect(
    state => ({...state}),
    (dispatch, props) => ({actions: bindActionCreators(actions, dispatch)})
)(Proceduria);