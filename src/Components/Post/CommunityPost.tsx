import React from "react";
import { CommunityType } from "../../type/types";
import { Link } from "react-router-dom";

export const CommunityPost = React.memo(
  ({ community }: { community: CommunityType }): JSX.Element => {
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
          </div>
          {community?.files[0] && (
            <img
              src={
                import.meta.env.VITE_API_BASE_URL +
                `/api/v1/file/preview?fileUrl=${community.files[0].fileName}`
              }
              alt={community.title}
              className="w-[200px] h-[100px] object-cover absolute top-0 right-0"
            />
          )}
        </Link>
      </div>
    );
  },
);
