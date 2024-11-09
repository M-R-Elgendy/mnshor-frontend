import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { http } from "../../../utils/httpCommon";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faAddressCard,
  faShareFromSquare,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const CMSHome = () => {
  // State for categories
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  // State for posts
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(null);

  // State for users
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);

  // Fetching categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await http.get(`/categories`);
        setCategories(response.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategoriesError("Failed to load categories.");
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetching posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await http.get("/posts");
        setPosts(response.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPostsError("Failed to load posts.");
      } finally {
        setPostsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Fetching users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await http.get("/users");
        setUsers(response.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setUsersError("Failed to load users.");
      } finally {
        setUsersLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Displaying loading or error messages
  if (categoriesLoading || postsLoading || usersLoading)
    return <p>Loading...</p>;
  if (categoriesError) return <p>Error: {categoriesError}</p>;
  if (postsError) return <p>Error: {postsError}</p>;
  if (usersError) return <p>Error: {usersError}</p>;

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-wrap h-fit gap-[10px] p-6">
        <div className="box flex flex-col justify-between h-[200px] w-[340px] bg-white rounded-lg shadow-md overflow-hidden">
          <div className="top-box h-[100px] p-4 flex items-center justify-between bg-blue-500">
            <div className="text">
              <h1 className="text-xl font-semibold text-gray-100">التصنيفات</h1>
              <span className="text-2xl text-gray-100">
                {categories.length}
              </span>
            </div>
            <div className="icon rounded-full flex items-center justify-center text-white">
              <FontAwesomeIcon className="text-4xl" icon={faLayerGroup} />
            </div>
          </div>
          <Link
            to="/cms/categories"
            className="bottom-box font-bold p-4 text-left flex items-center gap-3 justify-end text-blue-500 cursor-pointer hover:-translate-y-1 transition-transform duration-200"
          >
            الاطلاع على التفاصيل <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
        </div>

        <div className="box flex flex-col justify-between h-[200px] w-[340px] bg-white rounded-lg shadow-md overflow-hidden">
          <div className="top-box h-[100px] p-4 flex items-center justify-between bg-blue-500">
            <div className="text">
              <h1 className="text-xl font-semibold text-gray-100">المنشورات</h1>
              <span className="text-2xl text-gray-100">{posts.length}</span>
            </div>
            <div className="icon rounded-full flex items-center justify-center text-white">
              <FontAwesomeIcon className="text-4xl" icon={faShareFromSquare} />
            </div>
          </div>
          <Link
            to="/cms/posts"
            className="bottom-box font-bold p-4 text-left flex items-center gap-3 justify-end text-blue-500 cursor-pointer hover:-translate-y-1 transition-transform duration-200"
          >
            الاطلاع على التفاصيل <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
        </div>

        <div className="box flex flex-col justify-between h-[200px] w-[340px] bg-white rounded-lg shadow-md overflow-hidden">
          <div className="top-box h-[100px] p-4 flex items-center justify-between bg-blue-500">
            <div className="text">
              <h1 className="text-xl font-semibold text-gray-100">
                المستخدمون
              </h1>
              <span className="text-2xl text-gray-100">{users.length}</span>
            </div>
            <div className="icon rounded-full flex items-center justify-center text-white">
              <FontAwesomeIcon className="text-4xl" icon={faAddressCard} />
            </div>
          </div>
          <Link
            to="/cms/users"
            className="bottom-box font-bold p-4 text-left flex items-center gap-3 justify-end text-blue-500 cursor-pointer hover:-translate-y-1 transition-transform duration-200"
          >
            الاطلاع على التفاصيل <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CMSHome;
