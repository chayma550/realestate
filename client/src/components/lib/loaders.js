import { defer } from "react-router";
import apiRequest from "./apiRequest";

const getAuthHeaders = () => {
  const accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

export const SinglePageLoader = async ({ params }) => {
  const headers = getAuthHeaders();
  const res = await apiRequest(`/posts/${params.id}`, { headers });

  return res.data;
};

export const listPageLoader = async ({ request }) => {
  const query = request.url.split("?")[1];
  const headers = getAuthHeaders();
  
  const postPromise = apiRequest(`/posts?${query}`, { headers });
  return defer({
    postResponse: postPromise,
  });
};

export const profileLoader = async () => {
  const headers = getAuthHeaders();
  
  const postPromise = apiRequest("/users/profilePosts", { headers });
  const chatPromise = apiRequest("/chats", { headers });

  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
