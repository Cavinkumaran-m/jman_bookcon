import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

function BookCardLoader() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="container">
        <div style={{ height: "100px" }}>
          <Skeleton width={"100%"} height={"100%"} />
        </div>
        <br></br>
        <Skeleton width={"10%"} />
        <Skeleton count={2} width={"100%"} />
      </div>
    </SkeletonTheme>
  );
}

export default BookCardLoader;
