import React from "react";

export function CenteredLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={containerEstilo}>
            <div style={cardEstilo}>
                {children}
            </div>
        </div>
    );
}

const containerEstilo: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#fafafa"
};

const cardEstilo: React.CSSProperties = {
    padding: "2rem",
    maxWidth: "1000px",
    width: "100%",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    textAlign: "center"
};
