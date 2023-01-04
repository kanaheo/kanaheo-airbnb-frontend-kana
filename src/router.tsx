import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import GithubConfirm from "./routes/GithubConfirm";
import Home from "./routes/Home";
import KakaoConfirm from "./routes/KakaoConfirm";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";
import RoomModify from "./routes/RoomModify";
import UploadPhotos from "./routes/UploadPhotos";
import UploadRoom from "./routes/UploadRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "rooms",
        children: [
          {
            path: "upload",
            element: <UploadRoom />,
          },
          {
            path: ":roomPk",
            element: <RoomDetail />,
          },
          {
            path: ":roomPk/photos",
            element: <UploadPhotos />,
          },
        ],
      },
      {
        path: "roomModify",
        children: [
          {
            path: ":roomPk",
            element: <RoomModify />,
          },
        ],
      },
      {
        path: "social",
        children: [
          {
            path: "github",
            element: <GithubConfirm />,
          },
          {
            path: "kakao",
            element: <KakaoConfirm />,
          },
        ],
      },
    ],
  },
]);

export default router;
