import { NextResponse } from "next/server";
import roles from "./lib/roles";

async function getRole(request) {
  const apiUrl = new URL("/api/session", request.url).toString();
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Cookie": request.headers.get("cookie") || "", 
    },
    credentials: "include", 
  });

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  const data = await response.json();
  return data.user.role;
}

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  let role;
  try {
    role = await getRole(request); 
  } catch {
    if(pathname !== "/signin" && pathname !== "/signup") {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
  }

  if(pathname === "/signin" || pathname === "/signup") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  if(pathname === "/") {
    if(role === roles.TEACHER) {
      return NextResponse.redirect(new URL("/teacher", request.url));
    }
    if(role === roles.STUDENT) {
      return NextResponse.redirect(new URL("/student", request.url));
    }
  }

  if(pathname === "/text") {
    if(role === roles.TEACHER) {
      return NextResponse.redirect(new URL("/teacher/text", request.url));
    }
    if(role === roles.STUDENT) {
      return NextResponse.redirect(new URL("/student/text", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/", "/teacher", "/student", "/text", "/teacher/text", "/student/text", "/user"],
};
