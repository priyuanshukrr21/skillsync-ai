import { useState } from "react";

function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: call backend signup endpoint
		alert(`Signing up ${name} <${email}>`);
	};

	return (
		<div style={{ padding: 24, maxWidth: 700, margin: "96px auto" }}>
			<h1>Create account</h1>
			<form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
				<input
					placeholder="Full name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					style={{ padding: 10, borderRadius: 6 }}
				/>

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
					Create account
				</button>
			</form>
		</div>
	);
}

export default Signup;
