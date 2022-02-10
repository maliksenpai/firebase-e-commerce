import {app} from "../index";

export const getItemsData = async ({filter, type, sortPrice}) => {
  const db = app.firestore();
  //type = "clothes";
  //filter = "asd";
  //sortPrice = true;
  const request = await db.collection("items");
  let query;
  let response;
  if (sortPrice) {
    //todo : W E I R D
    if (sortPrice === "asc") {
      query = query ? query.orderBy("price", "desc") : request.orderBy("price", "desc");
    } else {
      query = query ? query.orderBy("price", "asc") : request.orderBy("price", "asc");
    }
  }
  //todo: filter client-side
  if (filter) {
    query = query ? query.where("name", "<=", filter) : request.where("name", "<=", filter+"z");
  }
  if (type) {
    query = query ? query.where("type", "array-contains", type) : request.where("type", "array-contains", type);
  }

  if (query) {
    response = await query.get();
  } else {
    response = await request.get();
  }

  return response.docs;
}

export const getSingleItem = async ({id}) => {
  const db = app.firestore()
  const request = await db.collection("items").where("id", "==", id).get()
  return request.docs[0]
}

export const createMockData = async ({element}) => {
  const db = app.firestore();
  const request = await db.collection("items");
  await request.add({
    ...element
  });
}