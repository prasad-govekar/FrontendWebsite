const admin =require('../models/admin');


async function login(input){
    const data = await admin.findOne({'username':input.username});

    if(data){
        if(data.password==input.password){

            let response={
                status:'success',
                msg:'welcome'
            }
            return response;
        }else{
            return {staus:'error',msg:'wrong credentials'};
        }
    }else{
        return {staus:'error',msg:'wrong credentials'};
    }
};

module.exports = login;