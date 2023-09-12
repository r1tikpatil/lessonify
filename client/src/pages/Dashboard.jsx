import React,{useEffect,useState} from 'react'
import './dashboard.css'
const Dashboard = () => {
  let user = JSON.parse(localStorage.getItem('user'))
  const [report,setReport] = useState([])

  const getData = async () => {
     const result = await fetch(`https://rose-upset-raven.cyclic.app/api/tests/${user.email}`,{
      method: 'GET',
     })
     const response = await result.json();
     console.log(response)
     setReport(response.tests)
  }

  useEffect(()=>{
    getData()
  },[])
  

  return (
    <div style={{marginTop:'100px'}} class="container mt-5">
      <div style={{marginTop:'100px'}} class="row d-flex justify-content-center">
        <div class="col-md-7">
          <div class="card p-3 py-4">
            <div class="text-center">
              <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" class="rounded-circle" />
            </div>
            <div class="text-center mt-3">
              <span class="bg-secondary p-1 px-4 rounded text-white">{user.email}</span>
              <h5 class="mt-2 mb-0">{user.name}</h5>
            </div>
          </div>
        </div>
      </div>
      {report && report.map((item)=>(
        <div className="row box" >
          <div className="col-md-4">{item.name}</div>
          <div className="col-md-4">{item.category}</div>
          <div className="col-md-4">{item.score}</div>
        </div>
      ))}
    </div>
  )
}

export default Dashboard