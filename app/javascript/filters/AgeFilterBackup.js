import React from 'react';
import Aux from '../components/Aux'
import {withCommas} from '../components/utils/filterFunctions'

class AgeFilter extends React.Component {
    constructor(props){
        super(props)
        this.state = {agePopup:false}

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleOuterClick = this.handleOuterClick.bind(this)

        this.setAgePopupRef = this.setAgePopupRef.bind(this);
        this.setAgeButtonRef = this.setAgeButtonRef.bind(this);
        this.setAgeXRef = this.setAgeXRef.bind(this);

    }

    

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOuterClick);
        
      }
    
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOuterClick);
      }

      setAgePopupRef(node) {
        this.agePopupRef = node;
      }
      
      setAgeButtonRef(node) {
        this.ageButtonRef = node;
      }
      setAgeXRef(node) {
        this.ageXRef = node;
      }

      handleOuterClick(event) {
        if (this.agePopupRef && !this.agePopupRef.contains(event.target) && !this.ageButtonRef.contains(event.target)) {
            this.setState({
                agePopup: false
            })
        }
      }

  

    handleClear() {
        this.props.onFilterChange("AgeFilter", "")
    }

    handleClick(event){
        if (this.props.activeFilters.includes("AgeFilter") && this.ageXRef.contains(event.target)){
            this.setState({
                agePopup: false
            })
        } else {
            this.setState({
                agePopup: !this.state.agePopup
            })
        }

    }


    handleChange(event){
        this.props.onFilterChange("AgeFilter", `${event.target.value}`, `median-age=${event.target.value.split("[age_from]=").join("").split("&[age_to]=")[0]}to${event.target.value.split("[age_from]=").join("").split("&[age_to]=")[1]}`)
    }

    render(){ 
        const AGEMAPPING = {
            "[age_from]=0&[age_to]=20": "Gen Z",
            "[age_from]=21&[age_to]=39": "Millenial",
            "[age_from]=40&[age_to]=51": "Gen X",
            "[age_from]=52&[age_to]=70": "Baby Boomer",
            "[age_from]=71&[age_to]=150": "Silent Age"
        }    

        return (
            <Aux>
                <div className="filter-popup-parent">
                    <div className={this.props.activeFilters.includes("AgeFilter") ? "filter-div filter-on tooltip-top" : "filter-div filter-off" } data-tooltip="test test yoyo" onClick={this.handleClick} ref={this.setAgeButtonRef}>
                        {this.props.activeFilters.includes("AgeFilter") ? 
                            <img src={require('../../assets/images/ageblue.png')} className="filter-icon"/> 
                            : <img src={require('../../assets/images/agegrey.png')} className="filter-icon"/>}
                        {this.props.activeFilters.includes("AgeFilter") === true ?
                            <span>&nbsp;&nbsp;<span className="bold">{AGEMAPPING[Object.values(this.props.params.filter((filter) => {return Object.keys(filter)[0] === "AgeFilter"})[0])[0]]}</span><span onClick={this.handleClear}>&nbsp;&nbsp;&nbsp;<img src={require('../../assets/images/xout2.png')} className="filter-icon-sm" ref={this.setAgeXRef}/></span></span>
                            : <span>&nbsp;Median Age</span>}<label htmlFor="Age"></label>
                    </div>
                    {this.state.agePopup ?
                    <span> 
                        <div className="filter-popup-div region-div" ref={this.setAgePopupRef}>
                            <span className="bold">Median Age:</span>
                            <br></br>
                            <select defaultValue={this.props.activeFilters.includes("AgeFilter") ? Object.values(this.props.params.filter((filter) => {return Object.keys(filter)[0] === "AgeFilter"})[0])[0].split("&")[0].split("=").pop() : "" } id="AgeFilter" onChange={this.handleChange}>
                                <option value="">Any</option>
                                <option value="[age_from]=0&[age_to]=20">Gen Z</option>
                                <option value="[age_from]=21&[age_to]=39">Millenial</option>
                                <option value="[age_from]=40&[age_to]=51">Gen X</option>
                                <option value="[age_from]=52&[age_to]=70">Baby Boomer</option>
                                <option value="[age_from]=71&[age_to]=150">Silent Age</option>
                            </select>
                        </div>
                    </span> : null }                       
                </div>
            </Aux>
            )
        }
}

export default AgeFilter;







