import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        애드민 페이지에 환영합니다! 
      </h1>
      <p className="mb-6">
        여기는 대쉬보드 페이지입니다. 개발 중에 있습니다.
      </p>
      <Link href="/users" className="text-indigo-600 hover:text-indigo-800 font-large">
       유저 관리 메뉴로 가기 &rarr;
      </Link>
    </div>
  );
}