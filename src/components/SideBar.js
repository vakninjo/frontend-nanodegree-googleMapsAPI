import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import '../App.css';

class SideBar extends Component {
    //js styles due to issues with using class names
    styles = {
        divList: {
            width: "auto",
            padding: "0px 20px"
        },
        ul: {
            listStyleType: "none",
            padding: 1
        },
        li: {
            marginBottom: "20px",

        },
        listButton: {
            background: "transparent",
            border: "none",
            color: "#057ead",
            cursor: "pointer"
        },
        input: {
            border: "2px solid gray",
            padding: "2.3px",
            margin: "30px 0px 10px",
            width: "100%"
        },
        drawer: {
            background: '#057ead'
        }

    };
render = () => {
    return (
        <div>
            <Drawer open={this.props.open} onClose={this.props.openCloseSideBar} onRequestChange={this.props.openCloseSideBar}>
                <div style={this.styles.divList}>
                    <h3>Sushi place by name</h3>
                    <input
                        aria-label='Filter Sushi resturants'
                        style={this.styles.input}
                        type="text"
                        placeholder="Filter Sushi resturants"
                        name="filter"
                        onChange={event => this.props.updateQuery(event.target.value)}
                        value={this.props.query} />

                    <ul style={this.styles.ul}>
                        {this.props.searchResults && this.props.searchResults.map((place, index) => {
                            return (
                                <li style={this.styles.li} key={index}>
                                    <button
                                        style={this.styles.listButton}
                                        key={index}
                                        onClick={() => this.props.selectedSearchResult(place.name)}
                                        aria-label='Sushi location'
                                    >
                                        {place.name}
                                    </button>
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


