let form = document.getElementById('form');

fetch('/profileDetails').then((res)=>{
    if(res.ok) return res.json();
}).then((data)=>{
    form.name.value=data.name;
    form.email.value=data.email;
    form.phone.value=data.phone;
})

form.email.value=
document.getElementById('button').onclick = async function (e) {
    if (form.name.value == "") {
        alert("Enter your name");
    }
    else if (form.email.value == "") {
        alert("Enter your email");
    }
    else if (form.phone.value == "") {
        alert("Enter your phone number");
    }
    else if (form.course.value == "") {
        alert("Enter your course name");
    }
    else {
        const enroll = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            course: form.course.value
        }
        const price={
            amount:8199
        }

        fetch('/enroll', {
            method: 'post',
            body: JSON.stringify(enroll),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then(async (resp) => {
            if (resp.status == "success") {
                
                let data = await fetch('/payment', {
                    method: 'post',
                    body: JSON.stringify(price),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                let orderData = await data.json();

                var options = {
                    "key": 'rzp_test_0wINYtdIizGUh1', // Enter the Key ID generated from the Dashboard
                    "amount": 8199, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "Coaching Classes",
                    "order_id": orderData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "handler": function (response) {
                        fetch('/paymentVerify', {
                            method: 'post',
                            body: JSON.stringify(response),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then((res) => {
                            if (res.ok) {
                                res.json();
                            }
                        }).then((data) => {
                            window.location.replace('/home')
                        });
                        // alert(response.razorpay_payment_id);
                        // alert(response.razorpay_order_id);
                        // alert(response.razorpay_signature);
                    }
                };
                var rzp1 = new Razorpay(options);
                rzp1.on('payment.failed', function (response) {
                    alert(response.error.code);
                });
                rzp1.open();
            }
            else {
                alert(resp.msg);
            }
        })


        e.preventDefault();
    }
}


