import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dateFormat from 'dateformat'

const Lyrics = (props) => {
    const [data, setData] = useState([]);
    const destroyFromDB = Id => {
        setData(data.filter(lyric => lyric._id !== Id));
    }
    const [color, setColor] = useState("");
    const [count, setCount] = useState(0);



    useEffect(() => {
        axios.get("http://localhost:8000/api/lyrics")
            .then(res => {
                setData(res.data.lyrics)
            })
            .catch(err => console.log(err));
    }, []);

    const deleteLyric = (deleteId) => {
        axios.delete("http://localhost:8000/api/lyrics/" + deleteId)
            .then(res => {
                console.log(res.data)
                destroyFromDB(deleteId)
            })
            .catch(err => console.log(err))
    }

    const night = () => {
        setCount(1)
        setColor("black")
    }

    const day = () => {
        setCount(0)
        setColor("sandybrown")
    }

    return (
        <div>
            <div class="main-header" style={{backgroundColor: color}}>
                <div class="title">
                    <h1>MoMusiq📝</h1>
                </div>
                <div id="display-end">
                    <Link to={'/createLyrics'}><button style={{ boxShadow: "3px 3px 3px black", padding: "5px", width: "150px", backgroundColor: 'brown', color: "burlywood", fontWeight: "bold", border: "3px solid black", height: "35px" }}>ADD LYRICS 💘</button></Link>
                </div>
                <div style={{marginRight:"100px", marginLeft:"-200px", marginBottom:"30px", height: "5px"}}>
                    { 
                        count === 0 ? 
                        <button onClick={night} style={{ boxShadow: "3px 3px 3px black", padding: "5px", width: "150px", backgroundColor: 'brown', color: "burlywood", fontWeight: "bold", border: "3px solid black", height: "35px" }}>NIGHTMODE🌙</button>
                        :
                        <button onClick={day}style={{ boxShadow: "3px 3px 3px black", padding: "5px", width: "150px", backgroundColor: 'brown', color: "burlywood", fontWeight: "bold", border: "3px solid pink" }}>COLORED🌈</button>

                    }
                </div>
            </div>
            <div>
                {
                    data.map((e, idx) => (
                        <div key={idx} class="info">
                            <div class="link-box">
                                <h2 style={{ marginTop: "15px", paddingTop: "5px" }}>Title: <Link to={`/showLyrics/${e._id}`}>{e.title}</Link> 👑</h2>
                                <p style={{ paddingBottom: "5px" }}>Date Made: {dateFormat(e.createdAt, "dddd, mmmm dS, yyyy")}</p>
                            </div>
                            <Link to={`/editLyrics/${e._id}`}><button style={{ boxShadow: "3px 3px 3px black", width: "100px", height: "30px" }}>Edit ✔</button></Link>
                            <button onClick={() => { deleteLyric(e._id) }} style={{ boxShadow: "3px 3px 3px black", margin: "15px", width: "100px", height: "30px" }}>Delete ❌</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Lyrics;