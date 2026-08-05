import React from "react";

function Footer(){
  return (
    <footer style={{ padding: '22px 32px', borderTop: '1px solid rgba(0,0,0,0.06)', textAlign: 'center', marginTop: 32 }}>
      <div style={{ opacity: 0.8 }}>© {new Date().getFullYear()} SkillSync AI — Built with ❤️</div>
    </footer>
  )
}

export default Footer;
