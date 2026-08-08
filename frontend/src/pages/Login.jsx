import { useState } from "react";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: call backend auth endpoint
		alert(`Logging in ${email}`);
	};

	return (
		<div style={{ padding: 24, maxWidth: 600, margin: "96px auto" }}>
			<h1>Login</h1>
			<form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
				<input
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					required
					style={{ padding: 10, borderRadius: 6 }}
				/>

				<input
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					required
					style={{ padding: 10, borderRadius: 6 }}
				/>

				<button type="submit" style={{ padding: 10, borderRadius: 6 }}>
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
