import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchItems } from "./server/fetch";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function App() {
  const {ref, inView} = useInView();
  //리액트 쿼리 훅
  const {status, data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["worldcup"],
    queryFn: fetchItems,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    if(inView) {
      fetchNextPage();
    }
  },[inView, fetchNextPage]);

  return status === "pending" ? (
    <div>로딩 중...</div>
  ) : status === "error" ? (
    <div>데이터를 불러오지 못했습니다.</div>
  ) : (
    <div className="container">
      {data?.pages.map((page) => {
        return (
          <div key={page.currentPage}>
            {page.data.map((items) => (
              <div key={items.id}>
                <p>{items.data.name}</p>
                <img
                  src={items.data.worldcupImages[0].filePath}
                  alt=""
                  width="500px"
                />
              </div>
            ))}
          </div>
        );
        
      })}

<div ref={ref}>{isFetchingNextPage && "불러오는중..."}</div>
    </div>
  );

  // <section className="container">
  //       {data.pages[data?.pageParams.length - 1]?.map((data, number) => (
  //         <div key={number}>
  //           <p>{data.data.worldcupTitle}</p>
  //           <img
  //             src={data.data.worldcupImages[0].filePath}
  //             alt=""
  //             width="500px"
  //           />
  //         </div>
  //       ))}
  //       <div ref={trigger} >hi</div>
  //     </section>
}

export default App;
