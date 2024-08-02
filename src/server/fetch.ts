import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./connection";

export interface WorldcupList {
  worldcupId: string;
  worldcupInfo:
    | {
        userId: string;
        worldcupTitle: string;
        worldcupDescription: string;
        category: string[];
        worldcupImages: {
          fileIndex: number;
          filePath: string;
          fileName: string;
        }[];
      }
    | DocumentData;
}

//파이어베이스 DB연동
const worldcupRef = collection(db, "worldcup");

//월드컵 리스트 불러오기(최신순)
export const getWorldCupList = async (pageParam: number) => {
  const resultArray: WorldcupList[] = [];
  const worldcupQuery = query(
    worldcupRef,
    orderBy("createAt", "desc"),
    limit(pageParam * 8)
  );
  const result = await getDocs(worldcupQuery); //문서화
  result.docs.map((data) => {
    resultArray.push({ worldcupId: data.id, worldcupInfo: data.data() }); //필드 고유의 id값과 필드 내용을 배열에 담기
  });
  return resultArray;
};
