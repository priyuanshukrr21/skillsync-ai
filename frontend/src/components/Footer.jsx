function Footer() {
	return (
		<footer
			style={{
				width: "100%",
				padding: "20px 40px",
				textAlign: "center",
				background: "rgba(15,23,42,0.9)",
				color: "#cbd5e1",
				marginTop: "40px",
			}}
		>
			<div>© {new Date().getFullYear()} SkillSync AI — Built with ❤️</div>
		</footer>
	);
}

export default Footer;
