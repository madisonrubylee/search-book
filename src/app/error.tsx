"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-20 h-20 bg-[#B7E4E7] rounded-full flex items-center justify-center mb-6">
        <Image
          src="/static/images/icon_book.png"
          alt="에러 아이콘"
          width={40}
          height={40}
        />
      </div>
      <h2 className="text-2xl font-bold text-text-title mb-2">
        에러가 발생했습니다
      </h2>
      <p className="text-text-secondary mb-8">불편을 드려 죄송합니다</p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-palette-primary text-white rounded-lg hover:opacity-90 transition-opacity">
        홈으로 가기
      </button>
    </div>
  );
}
