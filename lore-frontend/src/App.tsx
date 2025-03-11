import { Route, Routes } from "react-router";
import Lore from "./Lore.tsx";
import Feed from "./pages/Feed/Feed.tsx";
import Community from "./pages/Community/Community.tsx";
import Post from "./pages/Community/pages/Post/Post.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import CreatePost from "./pages/Community/pages/CreatePost/CreatePost.tsx";

function App() {
    return (
        <Routes>
            <Route element={<Lore/>}>
                <Route index element={<Feed/>}/>
                <Route path={"c/:community"} element={<Community/>}/>
                <Route path={"c/:community/posts/:postId/comments?/:commentId?"} element={<Post/>}/>
                <Route path={"c/:community/submit"} element={<CreatePost/>}/>
                <Route path={"u/:id"} element={<Profile/>}/>
            </Route>
        </Routes>
    )
}

export default App
