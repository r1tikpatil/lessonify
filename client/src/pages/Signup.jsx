import React ,{useState}from 'react'
import { Link } from 'react-router-dom'
import "./Auth.css"
import { useNavigate } from 'react-router-dom'


const Signup = () => {
let navigate = useNavigate()
    const [values,setValues] = useState({
        name : "",
        email : "",
        password : "",
    })

    const {name,email,password} = values

    const handleSubmit = async (e)=>{
        console.log(values)
        e.preventDefault()
        const result = await fetch('https://rose-upset-raven.cyclic.app/api/signup',{
            method: 'POST',
            headers  : {
                accept : 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(values)
        })
      const response =await result.json()
      if(response.message === 'success'){
        navigate('/login_pg')
      }
    }

    return (
            
        <div className="signupDiv" >
              <form className="signupForm" onSubmit={handleSubmit}  >
                  <h3>Sign Up</h3>
                  <div className="form-group">
                      <label>Name</label>
                      <input onChange={e=> setValues({...values,name : e.target.value})} value={name} type="text" className="form-control" placeholder="Name" />
                  </div>
                  <div className="form-group">
                      <label>Email address</label>
                      <input onChange={e=>setValues({...values,email : e.target.value})} type="email" value={email} className="form-control" placeholder="Enter email" />
                  </div>
                  <div className="form-group">
                      <label>Email address</label>
                      <input onChange={e=>setValues({...values,password : e.target.value })} type="password" value={password} className="form-control" placeholder="Enter password" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                  <p className="forgot-password text-right">
                      Already registered <Link to="/login_pg">sign in?</Link>
                  </p>
              </form>
              </div>
  
          )
}

export default Signup
