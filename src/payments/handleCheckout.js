import axios from 'axios';

export const handleCheckout = async (amount) => {

    const { data: { key } } = await axios.get('https://razorpayapi.vercel.app/api/getkey')

    const { data } = await axios.post('https://razorpayapi.vercel.app/api/checkout', {
        amount: amount
    })
    console.log(data);

    const options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Big Cart",
        description: "Big Cart order payment",
        image: "https://effectiv.ai/wp-content/uploads/2023/03/BigCart-Logo.svg",
        order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "https://razorpayapi.vercel.app/api/verifypayment",
        handler: function (response) {
            alert('success')
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9000090000"
        },
        notes: {
            address: "Razorpay Corporate Office"
        },
        theme: {
            color: "#3399cc"
        }
    }
    const rzp1 = window.Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });
}


