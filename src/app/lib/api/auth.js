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

export async function signUp({ firstName, lastName, email, phone, password, favoriteGame }) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, phone, password, favoriteGame }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Sign up failed");
  }

  console.log("Sign up response:", json.data);

  return json.data;
}

export async function forgotPassword({ email, favoriteGame }) {
  const res = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, favoriteGame }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Verification failed");
  }

  return json;
}

export async function resetPassword({ resetToken, newPassword }) {
  const res = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resetToken, newPassword }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Password reset failed");
  }

  return json;
}
