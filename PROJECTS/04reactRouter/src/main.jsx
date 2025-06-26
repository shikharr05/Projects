import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import { About } from "./Components/About/About.jsx";
import { Contact } from "./Components/Contact/Contact.jsx";
import { Github, githubInfoLoader} from "./Components/Github/Github.jsx";
import { User } from "./Components/User/User.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "",
//         element: <Home />,
//       },
//       {
//         path: "/About",
//         element: <About />,
//       },
//       {
//         path: "/Contact",
//         element: <Contact />,
//       },
//       {
//         path: "/github",
//         element: <Github />,
//       },
//     ],
//   },
// ]);

//there is another way to create a router.

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      {/* ye niche wala part hamne ek naye hook ko sikhne ke lie use kia that is useParams() isse hamne agr link mai userid mention kri as below to wo hamare naye page pr aajeygi check code in User.jsx for checking usage of useParams(). also one thing User.jsx mai jo userid use hua hai wo coz hamne niche userid mention kia islie hua matlb niche wala name and jo us file mai hai wo same hona chahiye.... */}
      <Route path="user/:userid" element={<User />} />
      {/* loader kya krta hai useEffect se pehle hi api ko fetch krna start kr deta hai like jaise hi hamara mouse github pe jayega wo apni fetching start kr dega hr baar and usko cache mai store krlega and if we click wo render ho jayega */}
      <Route
        loader={githubInfoLoader}
        path="/github"
        element={<Github />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
