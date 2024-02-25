import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

function BookCardLoader() {
  const n = 12;
  return (
    <SkeletonTheme baseColor="#1f2833" highlightColor="#3c434d">
      <div className="rounded-3 py-2 col-sm-6 col-md-4 col-lg-3">
        <div style={{ backgroundColor: "black" }} className="rounded-3 p-3">
          <div style={{ height: "200px" }}>
            <Skeleton width={"100%"} height={"100%"} />
          </div>
          <br></br>
          <Skeleton width={"10%"} />
          <Skeleton count={2} width={"100%"} />
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default BookCardLoader;
