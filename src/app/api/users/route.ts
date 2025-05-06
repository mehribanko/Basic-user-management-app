import { CommonResponse } from '@/lib/axiosClient';
import externalAxiosClient from '@/lib/externalAxiosClient';
import { UserDetailData, UserListApiResponse, UserListData } from '@/types/user/UserTypes';
import { AxiosError } from 'axios';
import { NextResponse, type NextRequest } from 'next/server';



// 유저 리스트 조회
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const queryParams = Object.fromEntries(searchParams.entries());
        const url = new URL(request.url);
        const pageIndex = Number(url.searchParams.get('page_index') ?? '1'); 
        const pageSize  = Number(url.searchParams.get('page_size')  ?? '10');

        console.log(`--- API GET /api/users --- `, queryParams);
        const externalParams = Object.fromEntries(url.searchParams.entries());
        externalParams.page_size = '60';              
        externalParams.page_index = '1';  

        const { data: raw } = await externalAxiosClient.get('/users', 
           { params: externalParams },
        );

        const full: UserDetailData[] = Array.isArray(raw)  ? raw
        : Array.isArray(raw.result_list) ? raw.result_list
        : [];
        const total = full.length;

        const start = (pageIndex - 1) * pageSize;
        const page  = full.slice(start, start + pageSize);

        return NextResponse.json<CommonResponse<UserListData>>({
        isSuccess: true,
        message: '성공',
        data: {
            total_count: total, 
            result_list: page,
            page_index: 0,
            page_size: 10
        },},{ status: 200 },);

    } catch (error) {
        const err = error as Error;
        console.error(" 서버 에러 (GET /api/users):", err);
        const errorResponse: CommonResponse<null> = {
            isSuccess: false,
            message: `내부 서버 에러: ${err.message || '알 수 없는 에러'}`,
            data: null,
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}