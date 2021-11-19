import axios from "axios";
import { useState } from "react"
import { Link, useHistory } from "react-router-dom";

const options = ['Others', 'Hip-Hop', 'R&b', 'Pop', 'Blues', 'Rock', 'Punk'];

const Create = () => {
    const [lyric, setLyric] = useState("");
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState(options[0]);
    const [link, setLink] = useState("");
    const [comment, setComment] = useState("N/A");
    const [idea, setIdea] = useState("N/A");
    let history = useHistory();
    const [errors, setErrors] = useState([]);
    const submit = (e) => {
        e.preventDefault();
        const newLyric = {
            lyric : lyric,
            title : title,
            genre : genre,
            link : link,
            comment : comment,
            idea : idea
        }
        axios.post("http://localhost:8000/api/lyrics/" , newLyric)
        .then(res => {
            console.log(res.data)
            history.push('/lyrics')
        })
        .catch(err => {
            const errorResponse = err.response.data.error.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        })
    }

    return(
        <div>
            <h2 class="show-header">CREATE MoLYRICS🎧</h2>
            <div>
                <form onSubmit={submit} class="flex-editCreate">
                    <div class="lyrics-editCreate">
                        <textarea cols="70" rows="55" placeholder="***ADD LYRICS HERE***" style={{padding: "20px", border: "2px solid brown", color: "red", fontSize: "15px"}} onChange={e => setLyric(e.target.value)} value={lyric}/>
                    </div>
                    <div class="container-info">
                        <label style={{marginBottom:"20px", fontWeight:"bold", marginRight: "9.5%"}}>Title: </label>
                        <input type="text" placeholder="Field required *" onChange={e => setTitle(e.target.value)} value={title} style={{marginBottom:"20px", border:"2px solid brown", padding: "5px", color: "red"}}/>
                        <br/>
                        <label style={{marginBottom:"20px", fontWeight:"bold", marginRight: "7.5%"}}>Genre: </label>
                            <select onChange={e => setGenre(e.target.value)} value={genre} style={{marginBottom:"20px", border:"2px solid brown", padding: "5px", color: "red"}}>
                                {options.map((option, idx) =>
                                    <option key={idx} value={option}>{option}</option>
                                )}
                            </select>
                        <br/>
                        <label style={{marginBottom:"50px", fontWeight:"bold", marginRight: "2.5%"}}>Beat Link: </label>
                        <input type="text" placeholder="***Optional***" onChange={e => setLink(e.target.value)} value={link} style={{marginBottom:"20px", border:"2px solid brown", padding: "5px", color: "red"}}/>
                        <br/>
                        <label style={{marginBottom:"20px", fontWeight:"bold"}}>Comments: </label>
                        <br/>
                        <textarea cols="15" rows="5" placeholder="***Optional***" style={{padding: "10px", width: "80%", color: "red", marginBottom: "20px", border:"2px solid brown"}} onChange={e => setComment(e.target.value)} value={comment}/>
                        <br/>
                        <label style={{marginBottom:"20px", fontWeight:"bold"}}>Ideas: </label>
                        <br/>
                        <textarea cols="15" rows="5" placeholder="***Optional***" style={{padding: "10px", width: "80%", color: "red", border:"2px solid brown"}} onChange={e => setIdea(e.target.value)} value={idea}/>
                        <br/>
                        <button style={{boxShadow:"3px 3px 3px black", width: "420px", height: "35px", marginTop: "40px"}}>Create ✅</button>
                        <br/>
                        <Link to="/lyrics"><button style={{boxShadow:"3px 3px 3px black", width: "420px", height: "35px", marginTop: "15px"}}>Home 🏠</button></Link>
                        {errors.map((err, index) => <p key={index} style={{color:"Black", fontWeight: "bold", backgroundColor: "red", marginTop: "20px", height: "20px", width: "81.5%", border: "2px solid brown", textAlign: "center", padding: "5px", boxShadow: "4px 4px 4px black"}}>❌{err}</p>)}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Create;