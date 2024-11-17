function display(){
    fetch('/profileDetails',{
            method:"get",
            headers:{
                "Content-Type": "application/json"
            }
        }
    ).then((res)=>{
        if(res.ok){
            return res.json();
        }
    }).then((data)=>{
        if(data!=null){
            document.getElementById('name-b').innerHTML=data.name;
            document.getElementById('email-b').innerHTML=data.email;
            document.getElementById('phone-b').innerHTML=data.phone;
            if(data.course!=undefined){
                document.getElementById('course-b').innerHTML=data.course.substring(0,1).toUpperCase() + data.course.substring(1);
            }else{
                document.getElementById('course-b').innerHTML="Not Enrolled Yet";   
            }
            
            if(data.fees){
                document.getElementById('fees-b').innerHTML="Yes";
                document.getElementById('download').classList.add('active');
            }else{
                document.getElementById('fees-b').innerHTML="No";
            }
            
        }
        else{
            alert("something is not right")
        }
    })
}

display();

let logout = document.getElementById('logout');
logout.addEventListener('click', () => {
    fetch('/logout',{
        method:'get'
    }).then((res) => {
        if (res.ok) {
            res.json();
        }
    }).then(() => {
        window.location.replace('/')
    })
})

let del = document.getElementById('delete');
del.addEventListener('click',()=>{
    // prompt('Do you want to delete your account permanently ? Once delted cant  be recovered.');
    let conf=confirm('Do you want to delete your account permanently ? Once delted cant  be recovered.');
    if(conf){
        fetch('/delete',{
            method:'get'
        }).then((res)=>{
            if (res.ok){
                res.json();
            }
        }).then(()=>{
            window.location.replace('/')
        })
    }
   
})