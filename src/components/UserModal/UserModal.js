import React, {useState} from 'react';
import './UserModal.scss';
import Modal from '../Modal/Modal';
import axios from "axios";
import {ACTION_GET,ACTION_ADD, ACTION_EDIT , reducer} from '../../reducers';

const UserModal = ({user, jobs, close, users, setUsers}) => {
    const [newName, setNewName] = useState((user)? user.name : "");
    const [newJobId, setNewJobId] = useState(user? user.jobId : "");

    const changeName = event => setNewName(event.target.value);
    const changeJobId = event => setNewJobId(event.target.value);

    // const save = () => {
    //     const newUser = {
    //         ...user,
    //         jobId: newJobId,
    //         name: newName
    //     };

    //     axios.put(`https://5f518d325e98480016123ada.mockapi.io/api/v1/users/${newUser.id}`, newUser)
    //     .then(res => {
    //         const newList = [...users];
    //         const userIndex = newList.findIndex(u => u.id == user.id);
    //         if(userIndex === -1) throw new Error("ERROR!!! HORRROR!!!!");
    //         newList[userIndex] = newUser;
    //         setUsers(newList); //esto sería el dispatch
    //         close();
    //     }).catch(err => alert("ERROR!"));
    // }

    const save = () => {
        const payload = {
            ...user,
            jobId: newJobId,
            name: newName
        };

        axios.put(`https://5f518d325e98480016123ada.mockapi.io/api/v1/users/${payload.id}`, payload)
        .then(res => {
            // const newList = [...users];
            // const userIndex = newList.findIndex(u => u.id == user.id);
            // if(userIndex === -1) throw new Error("ERROR!!! HORRROR!!!!");
            // newList[userIndex] = newUser;
            setUsers({type: ACTION_EDIT, payload}); //esto sería el dispatch
            close();
        }).catch(err => alert("ERROR!"));
    }


    // const add = () => {
    //     const newUser = {
    //         jobId: newJobId,
    //         name: newName
    //     };

    //     axios.post(`https://5f518d325e98480016123ada.mockapi.io/api/v1/users`, newUser)
    //     .then(res => {
    //         const newList = [...users];
    //         newList.push(newUser);
    //         //setUsers(newList);
    //         close();
    //     }).catch(err => alert("ERROR!"));
    // }

    const add = () => {
        const payload = {
            jobId: newJobId,
            name: newName
        };

        axios.post(`https://5f518d325e98480016123ada.mockapi.io/api/v1/users`, payload)
        .then(res => {
            //const newList = [...users];
            //newList.push(newUser);
            //setUsers(newList);
            setUsers({type: ACTION_ADD, payload});
            close();
        }).catch(err => alert("ERROR!"));
    }
        
    return (
        <Modal title={user? `Edit User ${user.name}` : `Add new user`} close={close}>
            <form>
                <input type="text" defaultValue={user? user.name : newName} onChange={changeName}/>
                <select defaultValue={user? user.jobId : newJobId} onChange={changeJobId}>
                    <option value="-1" selected disabled>elegir new job</option>
                    {
                        jobs.map(job => {
                            return (
                                <option value={job.id}>
                                    {job.name}
                                </option>
                            )
                        })
                    }
                </select>
                {
                    user? <button type="button" onClick={save}>Save</button> : 
                    <button type="button" onClick={add}>Add</button>
                }
                
            </form>
        </Modal>
    );
};

export default UserModal;
