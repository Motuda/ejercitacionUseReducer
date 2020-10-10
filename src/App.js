import React, {useState, useEffect, useReducer} from 'react';
import './App.scss';
import Table from "./components/Table/Table";
import ContentContainer from "./components/ContentContainer/ContentContainer";
import axios from 'axios';
import Modal from './components/Modal/Modal';
import UserModal from './components/UserModal/UserModal';
import NewUserModal from './components/NewUserModal/NewUserModal';
import JobModal from './components/JobModal/JobModal';
import {ACTION_GET, reducer, jobReducer} from './reducers';

const App = () => {

  //const [users, setUsers] = useState([]);
  const [users, dispatch] = useReducer(reducer, []);
  const [jobs, jobDispatch] = useReducer(jobReducer, []); // acá empezamos a modificar la manera de trabajar con jobs
  //const [jobs, setJobs] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedJob, setSelectedJob] = useState([]);
  const [displayUserModal, setDisplayUserModal] = useState(false);
  const [displayJobModal, setDisplayJobModal] = useState(false);
  const [displayNewUserModal, setDisplayNewUserModal] = useState(false);
  

  const headers = ["Name", "Avatar", "Job Title", "Actions"];
  const headersJobs = ["Name Job", "Actions"];

  // const getData = async (url, setter) => {
  //   try {
  //     const res = await axios.get(url);
  //     setter(res.data);
  //   }catch(err) {
  //     alert("Error getting data", err);
  //   }
  // } // Esto se iría una vez refactorizado con useReducer

  const getData2 = async (url, dispatch, actionType) => {
    try {
      const res = await axios.get(url);
      dispatch({type:actionType, payload:res.data });
    }catch(err) {
      alert("Error getting data", err);
    }
  }

  const getUsers = async () => getData2("https://5f518d325e98480016123ada.mockapi.io/api/v1/users", dispatch, ACTION_GET );
  const getJobs = async () => getData2("https://5f518d325e98480016123ada.mockapi.io/api/v1/jobs", jobDispatch, ACTION_GET );

  const editUser = user => {

    setSelectedUser(user);
    setDisplayUserModal(true);
  }

  const editJob = job => {
    setSelectedJob(job);
    setDisplayJobModal(true);
  }

  const addUser = () =>{
    setDisplayNewUserModal(true);
  }

  useEffect(() => getUsers(), []);
  useEffect(() => getJobs(), []);

  return (
    <React.Fragment>
      <header className="main-header">
        <h1>Jobs</h1>
      </header>

      <button className="button-green fixed" onClick={() => addUser()}>
        Add user +
      </button>

      {
        displayUserModal ?
        <UserModal user={selectedUser} jobs={jobs} close={() => setDisplayUserModal(false)} users={users} setUsers={dispatch} />
        :
        null  
      } 

      { 
        displayJobModal ?
        <JobModal job={selectedJob} jobs={jobs} close={() => setDisplayJobModal(false)} setJobs={jobDispatch} />
        :
        null  
      }

      {
        displayNewUserModal ?
        <NewUserModal user={selectedUser} jobs={jobs} close={() => setDisplayNewUserModal(false)} sers={users} setUsers={dispatch} />
        :
        null  
      }

      <ContentContainer>
        <Table headers={headers}>
          {
            users.map(user => {
              const job = jobs.find(job => job.id == user.jobId) || {name: "Not Found"};
              return (
                <tr>
                  <td>{user.name}</td>
                  <td><img className="avatar-img" src={user.avatar} /></td>
                  <td>{job.name}</td>
                  <td>
                    <button
                      className="button-green"
                      onClick={() => editUser(user)}
                    >
                        Edit
                      </button>
                  </td>
                </tr>
              )
            })
          }
        </Table>
      </ContentContainer>
      <ContentContainer>
        <Table headers={headersJobs}>
          {
            jobs.map(job=>{
              return(
                <tr>
                  <td>{job.name}</td>
                  <td>
                    <button
                      className="button-green"
                      onClick={() => editJob(job)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>

              )
            })
          }
        </Table>
      </ContentContainer>
    </React.Fragment>
  );
}

export default App;
