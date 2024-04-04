import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import SettingsPage from "../pages/SettingsPage";
import MainPage from "../pages/MainPage";
import MusicPlayerPage from "../pages/MusicPlayerPage";
import PlaylistsPage from "../pages/PlaylistsPage";
import PlaylistPage from "../pages/PlaylistPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "music-player",
        element: <MusicPlayerPage />,
      },
      {
        path: "playlists",
        element: <PlaylistsPage />,
      },
      {
        path: "playlists/:id",
        element: <PlaylistPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
