import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';

class SideBar extends Component {
    state = {
        open: true,
        query: ""
    }

    styles = {
        divList: {
            width: "200px",
            padding: "0px 20px"
        },
        ul: {
            listStyleType: "none",
            padding: 1
        },
        li: {
            marginBottom: "20px"
        },
        listButton: {
            background: "transparent",
            border: "none",
            color: "#057ead"
        },
        input: {
            border: "2px solid gray",
            padding: "2.3px",
            margin: "30px 0px 10px",
            width: "100%"
        }
    };
    updateQuery = (newQuery) => {
        // Save the new query string in state and pass the string
        // up the call tree
        this.setState({ query: newQuery });
        this.props.filterLocations(newQuery);
    }

//     render = () => {
//         return (
//             <div>
//                 <Drawer open={this.props.open} onClose={this.props.toggleDrawer}>
//                     <div >
//                         <input
//                             // style={this.styles.filterEntry}
//                             type="text"
//                             placeholder="Filter list"
//                             name="filter"
//                             onChange={e => console.log(e.target.value)}
//                             value={this.state.query} />
//                         <ul className="menu-sidebar-list">
//                             {this.props.updatedLivePlaces && this.props.updatedLivePlaces.map((place, index) => {
//                                     return (
//                                         <li key={index}>
//                                             <button key={index} onClick={e => this.props.clickListItem(index)}>{place.name}</button>
//                                         </li>
//                                     )
//                                 })}
//                         </ul>
//                     </div>
//                 </Drawer>
//             </div>
//         )
//     }
// }

render = () => {
    return (
        <div>
            <Drawer open={this.props.open} onClose={this.props.toggleDrawer}>
                <div style={this.styles.divList}>
                    <input
                        style={this.styles.input}
                        type="text"
                        placeholder="Filter list"
                        name="filter"
                        onChange={e => console.log(e.target.value)}
                        value={this.state.query} />
                    <ul style={this.styles.ul}>
                        {this.props.updatedLivePlaces && this.props.updatedLivePlaces.map((place, index) => {
                                return (
                                    <li style={this.styles.li} key={index}>
                                        <button style={this.styles.listButton} key={index} onClick={e => this.props.clickListItem(index)}>{place.name}</button>
                                    </li>
                                )
                            })}
                    </ul>
                </div>
            </Drawer>
        </div>
    )
}
}

export default SideBar;