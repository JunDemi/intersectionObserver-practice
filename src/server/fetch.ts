import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./connection";

export interface WorldcupList {
  id: string; 
  data: DocumentData;
}

//파이어베이스 DB연동
const worldcupRef = collection(db, "worldcup");

const LIMIT = 2;

//infiniteQuery는 nextPage값을 작성했을 경우 pageParam값이 기본 인자값으로 전달됨
export async function fetchItems({ pageParam }: { pageParam: number }): Promise<{
  data: WorldcupList[];
  currentPage: number;
  nextPage: number | null;
}> {

  //파이어베이스 DB불러오고 result에 할당
  const worldcupQuery = query(worldcupRef, orderBy("createAt", "desc"));
  const getData = await getDocs(worldcupQuery).then((res) => {
    return res.docs;
  });
  const result = getData.map((data) => {
    return { id: data.id, data: data.data() };
  });

  //1초의 지연시간을 적용하고 promise값으로 리턴
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: result.slice(pageParam, pageParam + LIMIT),
        currentPage: pageParam,
        nextPage: pageParam + LIMIT < result.length ? pageParam + LIMIT : null,
      });
    }, 1000);
  });
}