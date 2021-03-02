import home from "@pages/home";
import detail from "@pages/detail";

const routes = [
  {
    name: "home",
    path: "/",
    exact: true,
    component: home,
  },
  {
    name: "detail",
    path: "/:name",
    exact: true,
    component: detail,
  },
]

export default routes
