import { get } from "../utils/http.js";

export function getProjects(signal) {
  return get("/projects", signal);
}

export function getUsers(signal) {
  return get("/users", signal);
}

const projectService = {
  getProjects,
  getUsers,
};

export default projectService;
