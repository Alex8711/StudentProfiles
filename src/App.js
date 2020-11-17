import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./App.css";
import {Card,Row, Col,Container,Image,Form, Accordion,Button} from 'react-bootstrap';
const App=()=> {
  const [studentsList,setStudentsList] = useState([]);
  const [search,setSearch] = useState("");
  const [searchTag,setSearchTag] = useState("");
  const [addTag,setAddTag] = useState("");

  useEffect(()=>{
   const fetchData = async()=>{
     const {data}=await axios.get("https://api.hatchways.io/assessment/students");
     data.students.map(student=>student.tags=[]);
     setStudentsList(data.students);
     console.log(data.students);
   }
   fetchData();
  },[])

  const submitHandler=(id)=>(e)=>{
    e.preventDefault();
    console.log(id);
    const tagForStudents =[...studentsList];
    tagForStudents.filter(student=>student.id==id)[0].tags.push(addTag);
    setAddTag("");
  }

  return (
    <Container>
    <Form>
      <Form.Control id="name-input" type="text" placeholder="Search by name" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <Form.Control id="tag-input" type="text" placeholder="Search by tags" value={searchTag} onChange={(e)=>setSearchTag(e.target.value)}/>
    </Form>
    {(studentsList.length>0)?(studentsList.filter(student=>{
      if(search=="")
      return student
      else if(student.firstName.toLowerCase().includes(search.toLowerCase())||student.lastName.toLowerCase().includes(search.toLowerCase()))
      return student
    }).filter(student=>{
      if(searchTag=="")
      return student
      else if(student.tags.map(tag=>tag.includes(searchTag)).includes(true))
      return student
    }).map(student=>
    <Accordion>
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
       {/* <button className="btn float-right" onClick={()=>setOpen(!open)}><span className="expand">{open?"+":"-"}</span></button> */}
       <Accordion.Toggle as={Button} variant="link" eventKey="0">
        More Details
      </Accordion.Toggle>
       </Col>
      </Row>
        <p className="card-text">Email: {student.email}</p>
        <p className="card-text">Company: {student.company}</p>
        <p className="card-text">Skill: {student.skill}</p>
        <p className="card-text">Average: {student.grades.map(Number).reduce((a,b)=>a+b)/student.grades.length}%</p>
        </Col>
        </Row>
        <Accordion.Collapse eventKey="0">
      <Row className="mt-3">
      <Col xs={2}>

      </Col>
      <Col>
      {student.grades.map((grade,index)=><p className="card-text">Test{index+1}:  {grade}%</p>)}
      {student.tags&&student.tags.length>0?student.tags.map((tag,index)=><button disabled className="mr-2">{tag}</button>):null}
      <Form onSubmit={submitHandler(student.id)}>
      <Form.Control className="add-tag-input" type="text" placeholder="Add a tag" value={addTag} onChange={(e)=>setAddTag(e.target.value)}/>
      <Button type="submit" variant="primary">Add a Tag</Button>
    </Form>
      </Col>
        
      </Row>
    </Accordion.Collapse> 
        </Card></Accordion>)):( <h2> Loading </h2>)}
    </Container>
   
  );
}

export default App;
