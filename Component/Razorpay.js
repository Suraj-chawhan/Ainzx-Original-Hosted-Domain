"use client";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const fetchData = async (amount) => {
  const res = await fetch("/api/razorpay/getkey");
  const data = await res.json();
  const getkey = data.key;

  const re1 = await fetch("/api/razorpay/createOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  const data2 = await re1.json();
  return { getkey, order: data2.order };
};

const verifyPayment = async (response) => {
  console.log("Response before sending to verify endpoint:", response);

  const verifyRes = await fetch("/api/razorpay/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  });

  if (!verifyRes.ok) {
    const error = await verifyRes.json();
    console.error("Error from verify endpoint:", error);
    return { status: false, error: error.message };
  }

  return await verifyRes.json();
};

const postOrder = async (
  amount,
  userId,
  order_id,
  payment_id,
  name,
  plan,
  jwt
) => {
  try {
    console.log(
      "Data recevice " + amount,
      userId,
      order_id,
      payment_id,
      name,
      plan,
      jwt
    );
    const res = await fetch("/api/orderplan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        amount,
        userId,
        order_id,
        payment_id,
        name,
        plan,
      }),
    });
    if (res.ok) {
      console.log("post");
    }
  } catch (err) {
    console.log(err);
  }
};

async function updateSubscription(plan, id, type) {
  const res = await fetch("/api/subscription", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plan, id, type }),
  });
}

export const handlePayment = async (
  amount,
  jwt,
  userId,
  name,
  plan,
  type,
  router
) => {
  // Pass `router` if you use Next.js router

  const isScriptLoaded = await loadRazorpayScript();
  if (!isScriptLoaded) {
    console.error("Razorpay SDK failed to load");
    return false;
  }

  try {
    const { getkey, order } = await fetchData(amount);
    console.log("Data has been fetch");
    const options = {
      key: getkey,
      amount: order.amount,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      order_id: order.id,
      callback_url: "/api/razorpay/verify",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },

      handler: async function (response) {
        const updatedResponse = {
          ...response,
          payment_method: "Razorpay",
          userId,
          amount: order.amount,
        };
        const verifyData = await verifyPayment(updatedResponse);

        if (verifyData.status) {
          console.log("Payment verification successful:", verifyData);
          postOrder(
            amount,
            userId,
            verifyData.razorpay_order_id,
            verifyData.razorpay_payment_id,
            name,
            plan,
            jwt
          );

          updateSubscription(plan, userId, type);
          router.push("/model");
        } else {
          console.error("Payment verification failed:", verifyData);
        }
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (err) {
    console.log(err);
  }
};
