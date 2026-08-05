// Simple auth service with backend attempt and demo fallback
const login = async (email, password) => {
  // Try real backend first
  try {
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      return await res.json();
    }

    // if server responded with error, try to read message
    let txt = "Invalid credentials";
    try {
      const body = await res.json();
      txt = body?.message || txt;
    } catch (e) {
      txt = await res.text().catch(() => txt);
    }
    throw new Error(txt);
  } catch (err) {
    // Network or server not available — fallback to demo auth
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "demo@skill.com" && password === "password") {
          resolve({ name: "Demo User", email, token: "demo-token" });
        } else {
          reject(new Error("Invalid email or password (demo mode)."));
        }
      }, 650);
    });
  }
};

export default { login };
