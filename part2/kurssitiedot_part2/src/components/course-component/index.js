import React from 'react';
import Total from './course-total-component'
import Header from './course-header-component'
import Part from './course-part-component'

const Courses = ({courses}) => (

  courses.map((course, i) =>{
    return (
      <div key = {i}>
      <Header courseName = {course.name}/>
      <Part courseParts = { course.parts }/>
      <Total courseParts = { course.parts } />
    </div>
    )
  })
)

export default Courses;