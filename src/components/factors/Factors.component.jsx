import React from 'react';
import FACTORS_DATA from './factors.data';
import FactorsPreview from '../factors-preview/FactorsPreview.component';
import './Factors.style.css';

class Factors extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            collections: FACTORS_DATA
        }
    }
    render(){
        const {collections} = this.state;
        return(
            <div className="factors">
                <h3>wow factors</h3>
                <div className="factors-preview-collection">
                    {
                        collections.map(({id, ...otherAdditionalProps})=>(
                            <FactorsPreview key={id} {...otherAdditionalProps}/>
                        ))
                    }
                </div>
            </div>
        )
    }
}
export default Factors;