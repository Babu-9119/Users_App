import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

// fetch using class based components
// class User extends React.Component {
//     constructor(props){
//         super(props);

//         this.state = {
//             items : [],
//             isLoaded : false
//         }
//     }

//     componentDidMount(){
//         fetch('https://jsonplaceholder.typicode.com/users')
//         .then(res => res.json())
//         .then(json => {
//             // console.log(json)
//             this.setState({
//                 items:json,
//                 isLoaded:true
//             })
//         })
//     }
    
//     render(){
//         const {items,isLoaded} = this.state;
//         return(
//             <div className="App">
//                 <h1>Users</h1>
//                 {
//                     items.map((user,index) => {
//                         const {id,name,username,email} = user;
                        
//                         return(
//                         <div key={id} className="col-6">
//                              <div className="card">
//                                 <div className="container">
//                                     <h4>
//                                         <b>User Name: {username} </b>
//                                     </h4>
//                                     <p>Full Name: {name}</p>
//                                     <p>User_email {email} </p>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                     )
//                 }
//             </div>
//         )
//     }
// }

function User(){
    const [users,setUsers] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);
    // useEffect(()=>{
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(res => res.json())
    //     .then(json => {
    //         setUsers(json);
    //         setIsLoaded(true)
    //     })
    // },[])

    //using async await
    async function fetchUsers(){
        try{
            const res = await fetch("https://jsonplaceholder.typicode.com/posts")
        const json = await res.json();
        console.log(json);
        setUsers(json);
        setIsLoaded(true);
        }catch(error){
            console.log("error while fetching users"+error)
        }
        
    }
    useEffect(()=>{
        fetchUsers();
    },[])
    async function postUsers(){
        try{
            await fetch("https://jsonplaceholder.typicode.com/posts",
            {
                method: "post",
                headers:{"content-type" : 'application/json'},
                body:JSON.stringify({
                    "userId": 2000,
                    "id": 12,
                    "title": "Babu",
                    "body": "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio"
                  },)
            })
            console.log("user posted")
        }catch(error){
            console.log("error while posting users"+error)
        }
        
    }
    useEffect(()=>{
        postUsers();
    },[])
    if(!isLoaded){
        return <h1>Loding users....</h1>
    }
    return(
        <div>
            <h1>Users</h1>
            {
               users.map( user => {
                const {userId,id, title,body} = user;
                return(
                    <div key={id} className='row'>
                        <div className="card col">
                            <h1>name : {title}</h1>
                            
                            <p>body : {body}</p>
                        </div>
                    </div>
                )
               }) 
            }
        </div>
    )
}

export default User;