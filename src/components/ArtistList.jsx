import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchArtists } from "../actions";

class ArtistList extends Component{
    componentDidMount(){
        this.props.fetchArtists();
    }
    renderList(){
        return this.props.artists.map(artists =>{
            return(
                <div key={artists.id}>
                <div>{artists.name}</div>
                </div>
            )
        })
    }
    render(){

        return <div>{this.renderList()}</div>
    }
}
const mapStateToProps = (state)=>{
    return {artists : state.artists}
}

export default connect(mapStateToProps, {fetchArtists})(ArtistList);