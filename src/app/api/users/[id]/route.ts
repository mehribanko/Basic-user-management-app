import { CommonResponse } from '@/lib/axiosClient';
import externalAxiosClient from '@/lib/externalAxiosClient';
import { UpdateUserData, UserDetailApiResponse, UserDetailData, UserMutationApiResponse } from '@/types/user/UserTypes';
import { NextResponse, type NextRequest } from 'next/server';

function createErrorResponse(message: string, status: number): NextResponse<CommonResponse<null>> {
    const errorResponse: CommonResponse<null> = {
       isSuccess: false,
       message: message,
       data: null,
    };
    return NextResponse.json(errorResponse, { status: status });
}

// 유저 조회
export async function GET(
   request: NextRequest,
   context: { params: { id: string } }
) {

   try {
    const userId = (await context.params).id;

       if (!userId) return createErrorResponse('유저 ID가 없습니다!', 400);

        const externalData: UserDetailApiResponse = await externalAxiosClient.get(`/users/${userId}`);

        const successResponse: CommonResponse<UserDetailData> = {
            isSuccess: true,
            message:  '성공', 
            data: externalData.data, 
        };
        return NextResponse.json(successResponse, { status: 200 });
      

   } catch (error) {
       const err = error as Error;
       console.error("내부 서버 에러 (GET /api/users/[id]):", err);
       return createErrorResponse(`내부 서버 에러 : ${err.message || '알 수 없는 에러'}`, 500);
   }
}

// 유저 정보 업데이트
export async function POST(
    request: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const userId = (await context.params).id;
        if (!userId) return createErrorResponse('유저 ID가 없습니다!', 400);

        let userData: UpdateUserData;
        try { userData = await request.json(); } catch (e) { return createErrorResponse('JSON 에러', 400); }

        const externalData: UserMutationApiResponse = await externalAxiosClient.post(`/users/${userId}`, userData);

         console.log("external-=-============", externalData);

        if (!externalData?.meta?.code || externalData.meta.code >= 400) {
            return createErrorResponse(
              externalData.meta.message ?? '외부 API 오류',
              externalData.meta.code ?? 500,
            );
          }

        const successResponse: CommonResponse<null> = {
            isSuccess: true,
            message: '수정 성공',
            data: null, 
        };
        return NextResponse.json(successResponse, { status: 200 });

    } catch (error) {
        const err = error as Error;
        console.error("내부 서버 에러 (POST /api/users/[id]):", err);
        return createErrorResponse(`내부 서버 에러: ${err.message || '알 수 없는 에러'}`, 500);
    }
}

// 유저 정보 삭제
export async function DELETE(
    request: NextRequest,
    context: { params: { id: string }}
) {

    try {
        const userId = (await context.params).id;
        if (!userId) return createErrorResponse('유저 ID가 없습니다!', 400);

        await externalAxiosClient.delete(`/users/${userId}`);

        const successResponse: CommonResponse<null> = {
            isSuccess: true,
            message: '삭제 성공',
            data: null,
        };
        return NextResponse.json(successResponse, { status: 200 });

    } catch (error) {
        const err = error as Error;
        console.error("내부 서버 에러 (DELETE /api/users/[id]):", err);
        return createErrorResponse(`내부 서버 에러: ${err.message || '알 수 없는 에러'}`, 500);
    }
}
