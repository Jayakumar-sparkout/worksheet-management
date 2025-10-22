import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request:NextRequest){
    const path = request.nextUrl.pathname;

    const protectedPath =['/sidebar/dash/addworksheet']
    const publicPath =['/user/auth/login','/user/auth/register']
    const token = request.cookies.get("auth")?.value
console.log('token',token)
    let isProtected = false
    for(let i=0;i<protectedPath.length;i++){
        if(path===protectedPath[i]){
            isProtected = true
            break
        }
    }

    let isPublic = false
    for(let i=0;i<publicPath.length;i++){

        if(path===publicPath[i]){
            isPublic = true
            break
        }
    }

    if(!token && isProtected){
        return NextResponse.redirect(new URL('/user/auth/login',request.url))
    }

    if(token && isPublic){
        return NextResponse.redirect(new URL('/sidebar/dash/addworksheet',request.url))
    }

   

    return NextResponse.next()
     
}

export const config = {
  matcher: [
    "/user/auth/login",
    '/sidebar/dash/addworksheet',
    "/user/auth/register",
  ],
};

