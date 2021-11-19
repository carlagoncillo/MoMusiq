import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import { useHistory } from 'react-router'
import dateFormat from 'dateformat'

const Lyric = (props) => {
    const [lyric, setLyric] = useState({})
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:8000/api/lyrics/" + id)
        .then(res => setLyric(res.data.lyric))
        .catch(err => console.log(err));
    }, [id]);

    const deleteLyric = (deleteId) => {
        axios.delete('http://localhost:8000/api/lyrics/' + deleteId)
        .then(res => {
            history.push('/lyrics')
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <div class="show-header">
                <h2 class="song-title">Title: {lyric.title} 👑</h2>
            </div>
            <div class="show-flex">
                <div class="container-lyrics">
                    <h3>Lyrics:</h3>
                    <p>{lyric.lyric}</p>
                </div>
                <div class="container-info">
                    <p style={{marginBottom:"20px", fontWeight:"bold"}}>Genre:  {lyric.genre}</p>
                    <p style={{marginBottom:"20px", fontWeight:"bold"}}>Beat Link:  <a href={lyric.link}>{lyric.link}</a></p>
                    <p style={{marginBottom:"20px", fontWeight:"bold"}}>Date Made:  {dateFormat(lyric.createdAt, "dddd, mmmm dS, yyyy" )}</p>
                    <p style={{marginBottom:"20px", fontWeight:"bold"}}>Comments:  
                        <div style={{fontWeight:"lighter"}}>
                            {lyric.comment}
                        </div>
                    </p>
                    <p style={{fontWeight:"bold"}}>Ideas: 
                        <div style={{fontWeight:"lighter"}}> 
                            {lyric.idea}
                        </div>
                    </p>
                    <Link to={`/editLyrics/${lyric._id}`}><button style={{boxShadow:"3px 3px 3px black", width: "200px", height: "35px", marginRight: "20px"}}>Edit ✔</button></Link>
                    <button onClick={() => {deleteLyric(lyric._id)}} style={{boxShadow:"3px 3px 3px black", width: "200px", height: "35px", marginTop: "40px"}}> Delete ❌</button>
                    <br/>
                    <Link to="/lyrics"><button style={{boxShadow:"3px 3px 3px black", width: "420px", height: "35px", marginTop: "15px"}}>Home 🏠</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Lyric