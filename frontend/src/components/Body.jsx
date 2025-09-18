import React from 'react'
import { useState } from 'react'

const Body = () => {
    const [text1, setText] = useState();

    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    //  const [file, setFile] = useState(null);




    const handleSubmit = async (e) => {
        e.preventDefault();

        
        // const formData = new FormData();

        // formData.append('profileImage', file);

        const res = await fetch("http://localhost:5000/synthesize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: text1 }),
        });

        alert(`You entered ${text1}`);

        // alert(`You Entered name ${text},age is ${age} weight is ${weight}`);
        // const data = await res.json();
        // alert(data.message); // Show confirmation
        
        // Clear input fields
        setText("");

    }


    const fetchUsers = async () => {

        const res = await fetch("http://localhost:5000/info/api/users");
        const data = await res.json();
        console.log(data);
        setUsers(data);
        console.log(users);
        setShow(!show);

    }


    return (
        <div className='text-center items-center'>

            <form onSubmit={handleSubmit}>

                <span>Enter Text to Transform- <input onChange={(e) => setText(e.target.value)} className='bg-slate-300 w-80 m-1' placeholder='Enter Text to Transcribe' type="text" /> </span>
                <br />
                <button className='p-2 bg-green-300 rounded-lg m-2 ' type="submit">Submit here</button>

            </form>








        </div>
    )
}

export default Body
