import { NextRequest, NextResponse } from "next/server";//NextRequest and NextResponse are imported from the next/server module, which likely contains functionality for handling HTTP requests and responses in a Next.js server.
import {z} from "zod"; // import zod for schema validation
// import prisma from '@prisma/client'; 
import { PrismaClient } from "@prisma/client"; // Import PrismaClient from @prisma/client
// create a schema for the issue
const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
    
    });

// export a POST request handler
const prisma = new PrismaClient(); // Create an instance of PrismaClient

export async function POST(request: NextRequest) {
    const body = await request.json();// Use request.json() to parse the request body as JSON
    const validation = createIssueSchema.safeParse(body);// Use the safeParse method of the createIssueSchema object to validate the request body
    
    if(!validation.success){
        return NextResponse.json(validation.error.errors , {status: 400});
    }

    // Create a new issue using the PrismaClient instance
    const newIssue = await prisma.issue.create({ // Use prisma.issue.create instead of prisma.issue.create
        data: {title: body.title, description: body.description}
    });

    return NextResponse.json(newIssue);

}
