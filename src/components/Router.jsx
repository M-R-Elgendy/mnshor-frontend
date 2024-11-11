import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import Home from '../pages/home/Home';
import NotFoundPage from '../pages/errors/not-found';
import CreatePost from '../pages/posts/CreatePost';
import Profile from '../pages/profile/Profile';
import Preferences from '../pages/preferences/Preferences';
import ControlPanelCategories from '../pages/cms/categories/Categories';
import CMSHome from '../pages/cms/home/Home';
import CMSPosts from '../pages/cms/posts/Posts';
import CMSUsers from '../pages/cms/users/Users';
import CMSAdmins from '../pages/cms/admins/Admins';
import NewAdmin from '../pages/cms/admins/NewAdmin';
import SinglePost from '../pages/posts/SinglePost';

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/preferences" element={<Preferences />} />
                <Route path="/post/:postId" element={<SinglePost />} />

                <Route path="/cms" element={<CMSHome />} />
                <Route path="/cms/categories" element={<ControlPanelCategories />} />
                <Route path="/cms/posts" element={<CMSPosts />} />
                <Route path="/cms/users" element={<CMSUsers />} />
                <Route path="/cms/admins" element={<CMSAdmins />} />
                <Route path="/cms/admins/create" element={<NewAdmin />} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
