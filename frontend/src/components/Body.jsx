import React from 'react'
import { useState } from 'react'

const Body = () => {
    const [text, setText] = useState();
    const [age, setAge] = useState();
    const [weight, setWeight] = useState();

    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/info/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: text, age: age, weight: weight }),
        });

        alert(`You Entered name ${text},age is ${age} weight is ${weight}`);
        const data = await res.json();
        alert(data.message); // Show confirmation

        // Clear input fields

        setText("");
        setAge("");
        setWeight("");
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

                <span>Name- <input onChange={(e) => setText(e.target.value)} className='bg-slate-300 w-80 m-1' placeholder='Enter Name ' type="text" /> </span>
                <br />
                <span>Age--  <input onChange={(e) => setAge(e.target.value)} className='bg-slate-300 w-80 m-1 ' placeholder='Enter Age ' type="number" /> </span>
                <br />
                <span>Weight   <input onChange={(e) => setWeight(e.target.value)} className='bg-slate-300 w-80 m-1' placeholder='Enter Weight ' type="number" /> </span>
                <br />
                <button className='p-2 bg-green-300 rounded-lg m-2 ' type="submit">Submit here</button>

            </form>


            <button onClick={fetchUsers} >Click to Show</button>

            <div>
                {show ? (<>
                    {users.map((user) => (
                        <li key={user._id} className="p-1">
                            <strong>Name:</strong> {user.name} |{" "}
                            <strong>Age:</strong> {user.age} |{" "}
                            <strong>Weight:</strong> {user.weight}
                        </li>
                    ))}


                </>) : (<>hello </>)}
            </div>



            {/* <form action="/uploads" method="POST" enctype="multipart/form-data"  >
                
                <input type="file" name="profileImage"  />
                <button type="submit"  > Upload </button>

            </form> */}





        </div>
    )
}

export default Body
