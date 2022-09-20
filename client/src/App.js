import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';

// Installed the Axios

function App() {


  const [BlogList, setBlogList] = useState([]);

  const [BlogName, setBlogName] = useState('');
  const [YourName, setYourName] = useState('');
  const [BlogContent, setBlogContent] = useState('');
  const [UploadDate, setUploadDate] = useState(Date);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setBlogList(response.data);
      console.log(response);
    })
  }, [])


  const addBlogToList = () => {
    console.log(BlogName + YourName + BlogContent + UploadDate);
    Axios.post("http://localhost:3001/insert", {
      BlogName: BlogName,
      YourName: YourName,
      BlogContent: BlogContent,
      UploadDate: UploadDate
    });
  };

  const deleteBlog = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`, {
    });
  };

  return (
    <div className="App">
      <h1 className="blog_name">Blogs</h1>

      <label>Blog Name</label>
      <input type="String" onChange={(event) => {
        setBlogName(event.target.value);
      }} />
      <label>Your Name</label>
      <input type="String" onChange={(event) => {
        setYourName(event.target.value);
      }} />
      <label>Blog Content</label>
      <input type="String" onChange={(event) => {
        setBlogContent(event.target.value);
      }} />
      <label>Upload Date</label>
      <input type="Date" onChange={(event) => {
        setUploadDate(event.target.value);
      }} />

      <button onClick={addBlogToList} >Add Blog</button>
      <h1 className='Blog_data'>Blog Data</h1>

      
      {BlogList.map(function (val, key) {
        return (
          <div className='return_blog_value' key={key}>
            <h1>{val.BlogName}</h1>
            <h3>Author : {val.YourName}</h3>
            <p>{val.BlogContent}</p>
            <h4>Date : {val.UploadDate}</h4>

            <button onClick={() => deleteBlog(val._id)}>Delete Blog</button>
          </div>
        );
      })};

    </div>
  );
}

export default App;
