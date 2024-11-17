let form = document.getElementById('form');

form.addEventListener('submit', (event) => {
console.log(form)
    const login = {
        email: form[0].value,
        password: form[1].value
    }
    fetch("/login", {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        if (res.ok) {
            // console.log(`in first then ${res.ok}`);
            return res.json();
        }
        else {
            alert("Something went wrong");
        }
    }).then((data) => {
        if (data.status == "error") {
            alert(data.msg);
        } else {
            window.location.replace('/home');
        }
    })
    form.reset();

    event.preventDefault();

});
