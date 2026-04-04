export async function signIn({ email, password }) {
  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Sign in failed");
  }

  // json.data = { user: {...}, token: "..." }
  return json.data;
}

export async function signUp({ firstName, lastName, email, phone, password }) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, phone, password }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Sign up failed");
  }

  console.log("Sign up response:", json.data);

  return json.data;
}
