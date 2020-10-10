import React,{useState} from "react";
import Modal from '../Modal/Modal';
import './JobModal.scss';
import axios from "axios";
import { ACTION_EDIT_JOB } from "../../reducers";


const JobModal = ({job, jobs, close, setJobs}) => {
    const [newJobName, setNewJobName] = useState(job.name);

    const changeJobName = event => setNewJobName(event.target.value);

    // const save = () => {
    //     const newJob = {
    //         ...job,
    //         name: newJobName
    //     };

    //     axios.put(`https://5f518d325e98480016123ada.mockapi.io/api/v1/jobs/${newJob.id}`, newJob)
    //     .then(res => {
    //         const newListJobs = [...jobs];
    //         const jobIndex = newListJobs.findIndex(j => j.id == newJob.id);
    //         if(jobIndex === -1) alert("No encuentro tu job :((((")
    //         setJobs(newListJobs);
    //         close();
    //     }).catch(err => alert("ERROR!"));
    // }

    //Refactorización con useState

    const save = () =>{
        const payload = {
            ...job,
            name: newJobName
        };
        axios.put(`https://5f518d325e98480016123ada.mockapi.io/api/v1/jobs/${payload.id}`, payload)
        .then(res => {
            setJobs({type: ACTION_EDIT_JOB, payload});
            close();
        }).catch(err => alert("ERROR EDITANDO JOBS"));
    };

    return(
        <Modal title={`Edit Job: ${job.name}`} close={close}>
            <form>
                <input type="text" defaultValue={job.name} onChange={changeJobName}/>
                <button type="button" onClick={save}>Save</button>
            </form>
        </Modal>
    )
}

export default JobModal;
