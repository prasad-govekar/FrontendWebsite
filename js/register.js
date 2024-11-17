let form = document.getElementById('form-register')
form.addEventListener('submit', (event) => {

    if (form.name.value == "") {
        alert("Enter your name");
    }
    else if (form.email.value == "") {
        alert("Enter your email");
    }
    else if (form.phone.value == "") {
        alert("Enter your phone number");
    }
    else if (form.password.value == "") {
        alert("Enter your passowrd");
    }
    else if (form.cpassword.value == "") {
        alert("Re-enter your passowrd");
    }
    else if(form.phone.value < 1000000000 || form.phone.value > 9999999999) {
        alert("check your phone number")
    }
    else if (form.password.value != form.cpassword.value) {
        alert("Passwords dosent match");
    }
    else {
        const register = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            password: form.password.value
        }
        fetch("/register", {
            method: "POST",
            body: JSON.stringify(register),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                alert("Something went wrong");
            }
        }).then((data) => {
            if (data.status == "success") {
                alert(data.msg);
            } else {
                alert(data.msg);
                window.location.replace('/login');
            }
        }).catch((error) => {
            alert(error);
        });
    
    }
    event.preventDefault();

})