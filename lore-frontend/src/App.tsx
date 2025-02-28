import "./App.css"
import { Route, Routes } from "react-router";
import Lore from "./Lore.tsx";
import Feed from "./pages/feed/Feed.tsx";
import Community from "./pages/community/Community.tsx";
import Post from "./pages/post/Post.tsx";
import Profile from "./pages/profile/Profile.tsx";

function App() {
    return (
        <Routes>
            <Route element={<Lore/>}>
                <Route index element={<Feed/>}/>
                <Route path={"l/:communityId"} element={<Community/>}/>
                <Route path={"l/:communityId/posts/:postId/comments?/:commentId?"} element={<Post/>}/>
                <Route path={"u/:id"} element={<Profile/>}/>
            </Route>
        </Routes>
    )
}

export default App
