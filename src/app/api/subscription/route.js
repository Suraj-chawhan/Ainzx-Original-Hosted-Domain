import User from "../../../../Mogodb/schema/userSchema";
import connectDB from "../../../../Mogodb/Connect";
import GoogleUser from "../../../../Mogodb/schema/googleUserSchema";

export async function POST(req) {
  await connectDB();

  try {
    const { userId, type } = await req.json();

    let user;
    if (type === "user") {
      user = await User.findById(userId);
    } else if (type === "google") {
      user = await GoogleUser.findById(userId);
    } else {
      return new Response(
        JSON.stringify({ message: "Invalid user type for data retrieval" })
      );
    }

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }));
    }

    return new Response(
      JSON.stringify({ message: "User data retrieved", user })
    );
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return new Response(
      JSON.stringify({ message: "Failed to retrieve user data", error })
    );
  }
}

export async function PUT(req) {
  await connectDB();

  try {
    const { plan, id, type } = await req.json();

    let user;
    if (type === "user") {
      user = await User.findById(id);
    } else if (type === "google") {
      user = await GoogleUser.findById(id);
    } else {
      return new Response(
        JSON.stringify({
          message: "Invalid user type for subscription update",
        })
      );
    }

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }));
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    user.subscription = {
      plan,
      expiresAt: expiryDate,
    };

    await user.save();
    return new Response(
      JSON.stringify({ message: "Subscription Updated Successfully", user })
    );
  } catch (error) {
    console.error("Error updating subscription:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update subscription", error })
    );
  }
}
