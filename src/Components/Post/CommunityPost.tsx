import React, { useState } from "react";
import { CommunityType } from "../../type/types";
import { Link } from "react-router-dom";

export const CommunityPost = React.memo(
  ({ community }: { community: CommunityType }): JSX.Element => {
    const [img, setImg] = useState(
      import.meta.env.VITE_API_BASE_URL +
        `/api/v1/file/preview?fileUrl=${community.files[0]?.fileName}`,
    );

    const handleDefaultImageError = () => {
      setImg("/../src/assets/default-image.jpeg"); // 기본 이미지로 변경
    };

    return (
      <div className="h-[100px] relative">
        <Link
          to={`/community/${community.communityId}`}
          key={community.communityId}
          className="bg-white border rounded-lg h-[100px] flex"
        >
          <div className="pl-[25px]">
            <p className="text-[16px] truncate mb-[10px] mt-[10px]">
              {community.title}
            </p>
            <p className="text-[12px] truncate">
              작성 날짜: {community.createdAt}
            </p>
            <p className="text-[12px] truncate">작성자: {community.nickname}</p>
          </div>
          <img
            src={img}
            alt={community.title}
            className="w-[200px] max-w-[40%] h-[100px] object-cover absolute top-0 right-0"
            onError={handleDefaultImageError}
          />
        </Link>
      </div>
    );
  },
);
