import connectDB from "../../../../../Mogodb/Connect";
import User from "../../../../../Mogodb/schema/userSchema";

export async function POST(req) {
  await connectDB();
  try {
    const data = await req.json();
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User Exists" }));
    }
    console.log({ ...data, type: "user" });
    const newUser = new User(data);

    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User registered successfully." })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "User registered successfully." })
    );
  }
}

export async function GET(req) {
  await connectDB();

  try {
    const data = await User.find();
    return new Response(JSON.stringify(data));
  } catch (err) {
    return new Response(
      JSON.stringify({ message: err.message || "An error occurred" })
    );
  }
}
