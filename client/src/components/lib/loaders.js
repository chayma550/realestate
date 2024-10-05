import { defer } from "react-router";
import apiRequest from "./apiRequest";


export const SinglePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);

  return res.data;
};


export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise=  apiRequest("/posts?" + query);
  return defer({
    postResponse:postPromise

  })

};

export const profileLoader = async () => {
  const postPromise=  apiRequest("/users/profilePosts" );
  const chatPromise = apiRequest("/chats");

  return defer({
    postResponse:postPromise,
    chatResponse: chatPromise,
  })

};
