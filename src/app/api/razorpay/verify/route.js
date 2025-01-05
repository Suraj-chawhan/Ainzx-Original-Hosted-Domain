import crypto from "crypto";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Received data:", data);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const razorpaySecret = process.env.RAZORPAY_SECRET;
    if (!razorpaySecret) {
      console.error("Missing Razorpay secret in environment variables");
      return new Response(
        JSON.stringify({ message: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate HMAC signature
    const hmac = crypto.createHmac("sha256", razorpaySecret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      return new Response(
        JSON.stringify({
          message: "Payment verified successfully",
          razorpay_order_id,
          razorpay_payment_id,
          status: true,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Invalid payment signature" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error in payment verification:", error.message);
    return new Response(
      JSON.stringify({
        message: "Error processing request",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
