//butun SİPARİŞLER cekiliyor

import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
//NextResponse = sunucu tarafında HTTP yanıtlarını oluşturmak 
//prisma ögesini connect.ts dosyamızdan çektik, tekrarlanma istemediğimizden tekrar bir nesne oluşturmuyoruz

//ts dosyası, uygulamamız bunun bir yon dosyası oldugunu biliyor
export const GET = async (req: NextRequest) => {
const session = await getAuthSession();
if(session){
    try{
        if (session.user.isAdmin) {
            const orders = await prisma.order.findMany();
            return new NextResponse(JSON.stringify(orders), { status: 200 });
          }
          const orders = await prisma.order.findMany({
            where: {
              userEmail: session.user.email!,
            },
          });
          return new NextResponse(JSON.stringify(orders), { status: 200 });
    }catch (err){
        console.log(err);
        return new NextResponse(
            JSON.stringify({message: "bir seyler yanlis gidiyor!"}),
            {status:500}
        );
    }
} else { 
    return new NextResponse(
    JSON.stringify({message: "kimlik doğrulanmadı!"}),
    {status:401}
    );
  }
};

//Create order
export const POST  = async (req:NextRequest) => {
  const session = await getAuthSession();
  if(session){
      try{const body = await req.json();
        const order = await prisma.order.create({
          data: body,
        });
        return new NextResponse(JSON.stringify(order), { status: 201 });
      }catch (err){
          console.log(err);
          return new NextResponse(
              JSON.stringify({message: "bir seyler yanlis gidiyor!"}),
              {status:500}
          );
      }
  } else { 
      return new NextResponse(
      JSON.stringify({message: "kimlik doğrulanmadı!"}),
      {status:401}
      );
    }
  };

