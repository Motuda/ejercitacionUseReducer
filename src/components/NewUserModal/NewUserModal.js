import React, {useState} from 'react';
import UserModal from '../UserModal/UserModal';


const NewUserModal = ({users, jobs, setUsers, close}) =>{  
    return(
        <UserModal users={users} jobs={jobs} setUsers={setUsers} close={close}>
        </UserModal>
    );
}

export default NewUserModal;
