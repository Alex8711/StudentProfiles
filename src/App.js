import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./App.css";
import {Card,Row, Col,Container,Image,Form} from 'react-bootstrap';
const App=()=> {
  const [studentsList,setStudentsList] = useState([]);
  const [search,setSearch] = useState("");
  const [open,setOpen] = useState(false);

  useEffect(()=>{
   const fetchData = async()=>{
     const {data}=await axios.get("https://api.hatchways.io/assessment/students");
     setStudentsList(data.students);
     console.log(data.students);
   }
   fetchData();
  },[])

  // const filterStudents=(e)=>{
  //     setSearch(e.target.value);
  // }

  return (
    <Container>
    <Form>
      <Form.Control id="name-input" type="text" placeholder="Search by name" value={search} onChange={(e)=>setSearch(e.target.value)}/>
    </Form>
    {(studentsList.length>0)?(studentsList.filter(student=>{
      if(search=="")
      return student
      else if(student.firstName.toLowerCase().includes(search.toLowerCase())||student.lastName.toLowerCase().includes(search.toLowerCase()))
      return student
    }).map(student=>
    <Card key={student.id} > 
    <Row>
     <Col xs={2}>             
     <Image  src={student.pic} alt={student.email} fluid roundedCircle />
     </Col>             
     <Col>
     <Row>
     <Col>
       <h4 className="card-title">{student.firstName} {student.lastName}</h4>
       </Col>  
       <Col>
       <button className="btn float-right" onClick={()=>setOpen(!open)}><span className="expand">{open?"+":"-"}</span></button>
       </Col>
      </Row>
        <p className="card-text">Email: {student.email}</p>
        <p className="card-text">Company: {student.company}</p>
        <p className="card-text">Skill: {student.skill}</p>
        <p className="card-text">Average: {student.grades.map(Number).reduce((a,b)=>a+b)/student.grades.length}%</p>
        </Col>
        </Row> 
        </Card>)):( <h2> Loading </h2>)}
    </Container>
   
  );
}

export default App;
