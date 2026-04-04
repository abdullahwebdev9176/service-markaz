// Replace these with real fetch() calls when the API is ready

export async function signIn({ email, password }) {
  // Simulate API call
  await new Promise((res) => setTimeout(res, 1500));
  // Throw to trigger onError in the mutation
  if (!email || !password) throw new Error("Invalid credentials");
  return { email };
}

export async function signUp({ firstName, lastName, email, phone, password }) {
  // Simulate API call
  await new Promise((res) => setTimeout(res, 1500));
  return { firstName, lastName, email, phone };
}
