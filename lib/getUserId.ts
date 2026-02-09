export function getUserId() {
  let id = localStorage.getItem("mockUserId");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("mockUserId", id);
  }

  return id;
}
