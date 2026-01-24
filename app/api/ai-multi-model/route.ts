import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { model, msg, parentModel } = await req.json();

    // Extract the last user message content
    const lastMessage = msg[msg.length - 1]?.content || "";

    console.log("=== REQUEST TO KRAVIX STUDIO ===");
    console.log("Model:", model);
    console.log("Message:", lastMessage);
    console.log(
      "API Key (first 10 chars):",
      process.env.KRAVIXSTUDIO_API_KEY?.substring(0, 10),
    );

    const response = await axios.post(
      "https://kravixstudio.com/api/v1/chat",
      {
        "message": "Hi",
        "aiModel": "claude-3-5-sonnet-20241022",
        "outputType": "text"
    },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.KRAVIXSTUDIO_API_KEY}`,
        },
        validateStatus: () => true, // Don't throw on any status
      },
    );

    console.log("=== RESPONSE FROM KRAVIX STUDIO ===");
    console.log("Status:", response.status);
    console.log("Data:", JSON.stringify(response.data, null, 2));

    if (response.status !== 200) {
      return NextResponse.json(
        {
          error: "External API error",
          details: response.data,
          status: response.status,
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      ...response.data,
      model: parentModel,
    });
  } catch (error) {
    console.error("=== CAUGHT ERROR ===");
    if (axios.isAxiosError(error)) {
      console.error("Axios Error Details:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error("Unknown Error:", error);
    }

    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 },
    );
  }
}
