import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import Home from '../pages/home/Home';
import NotFoundPage from '../pages/errors/not-found';
import CreatePost from '../pages/posts/CreatePost';
import Profile from '../pages/profile/Profile';
import Preferences from '../pages/preferences/Preferences';

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/manage-categories" element={<Preferences />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
