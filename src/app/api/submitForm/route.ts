import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSe8r-YDXgGRH_JI--9j9ZRWjRUilsamcpsfXO12tBuETrp8sA/formResponse",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(body as Record<string, string>),
      }
    );

    if (response.ok) {
      return NextResponse.json(
        { message: "Form submitted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to submit form" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { message: "Error submitting form" },
      { status: 500 }
    );
  }
}
