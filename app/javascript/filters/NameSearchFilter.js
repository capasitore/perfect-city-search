import React from 'react';
import Aux from '../components/Aux'

class NameSearchFilter extends React.Component {
    constructor(props){
        super(props)
        this.state = {timeout: 0}
        this.handleChange = this.handleChange.bind(this)
        this.defaultVal = this.defaultVal.bind(this)
        this.didSwitchParentObject = true;
    }

    componentDidUpdate ()
	{
	    if (this.didSwitchParentObject)
	    {
	        this.didSwitchParentObject= false;
	        this.refs.myTextInput.value = this.props.searchTerm;
	    }
	}

    handleChange = (event) => {
    
        var value = event.target.value; // this is the search text
        if(this.state.timeout) clearTimeout(this.state.timeout);
        this.state.timeout = setTimeout(() => {
            if (value === "") {
                this.props.onFilterChange("NameSearchFilter","");
            } else {
                this.props.onFilterChange("NameSearchFilter",`[term]=${value}`,`name=${value}`); 
            }
            }, 300);
        }

        defaultVal = () => {
            if (this.props.isActive) {
                this.setState({
                    filterValue: "true"
                })
            } else {
                this.setState({
                    filterValue: "false"
                })
            }

        
        }



    componentDidMount(){
        console.log(this.props.isActive)
    }

    
       
    

    render(){  
        
       
        return (
            <Aux>
            <div>
                <input type="search" id="seachbox" name="focus" required className="search-box" onChange={this.handleChange} placeholder="Filter by city name..." ref = "myTextInput"/>
            </div>
                
            </Aux>
            )
        }
}

export default NameSearchFilter;











