export const ACTION_GET = "GETDATA";
export const ACTION_EDIT = "EDIT";
export const ACTION_ADD = "ADD";
export const ACTION_DELETE_USER = "DELETEUSER";
export const ACTION_EDIT_JOB = "EDITJOBS"

// ahora los de jobs
export const ACTION_ADD_JOB = "ADDJOB";


export const reducer = (users, action) =>{
    switch(action.type){

        case ACTION_GET:
            return action.payload;
        case ACTION_ADD:
            return (
                [...users, action.payload]
            );
        case ACTION_EDIT:
            return users.map(user=>{
                if(user.id == action.payload.id){
                    user.name = action.payload.name;
                    user.jobId = action.payload.jobId;
                }
                return user;
            });
        case ACTION_DELETE_USER: 
            return users.filter(user => user.id !== action.user.id);
        default:  
            return users;
    }
};

export const jobReducer = (jobs, action) =>{
    switch(action.type){

        case ACTION_GET:
            return action.payload;
        
        case ACTION_EDIT_JOB:

            return jobs.map(job=>{
                if (job.id == action.payload.id){
                    job.name = action.payload.name;
                }
                return job;
            });
         
        default:  
            return jobs;
    }
}