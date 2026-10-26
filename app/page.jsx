
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  { id: 1, name: "التيشيرت الأسود", color: "#252525", price: 99 },
  { id: 2, name: "التيشيرت الأبيض", color: "#eeeeea", price: 109 },
  { id: 3, name: "التيشيرت الكحلي", color: "#253a65", price: 119 },
  { id: 4, name: "التيشيرت العنابي", color: "#852c45", price: 129 }
];

function Shirt({ color }) {
  return (
    <svg viewBox="0 0 220 270" width="100%" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={"fabric" + color} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity=".22" />
          <stop offset="45%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity=".25" />
        </linearGradient>
      </defs>
      <path
        d="M110 26 Q100 13 111 8 Q124 4 125 17"
        fill="none" stroke="#c5c5c5" strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M110 25 L35 65 L185 65 Z"
        fill="none" stroke="#b9b9b9" strokeWidth="4"
        strokeLinejoin="round" />
      <path
        d="M76 43 L45 52 L8 112 L49 139 L66 113 L66 253
        Q110 262 154 253 L154 113 L171 139 L212 112
        L175 52 L144 43 Q110 72 76 43 Z"
        fill={color} stroke="#000000" strokeOpacity=".18"
        strokeWidth="2"
      />
      <path
        d="M76 43 L45 52 L8 112 L49 139 L66 113 L66 253
        Q110 262 154 253 L154 113 L171 139 L212 112
        L175 52 L144 43 Q110 72 76 43 Z"
        fill={"url(#fabric" + color + ")"}
      />
      <path d="M76 43 Q110 84 144 43"
        fill="none" stroke="#000" strokeOpacity=".28" strokeWidth="6" />
      <path d="M66 113 Q78 147 76 231 M154 113 Q140 160 146 235"
        fill="none" stroke="#fff" strokeOpacity=".09" strokeWidth="5" />
      <text x="110" y="145" textAnchor="middle"
        fill={color === "#eeeeea" ? "#222" : "#fff"}
        fontSize="18" fontWeight="bold" letterSpacing="3">
        STUDIO
      </text>
    </svg>
  );
}

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState(0);
  const [size, setSize] = useState("M");

  const current = products.find(p => p.id === selected);

  function changeShirt(direction) {
    const index = products.findIndex(p => p.id === selected);
    setSelected(products[(index + direction + 4) % 4].id);
  }

  return (
    <main dir="rtl" style={{
      minHeight: "100vh", background: "#111216",
      color: "white", fontFamily: "Arial, sans-serif",
      overflow: "hidden", position: "relative",
      padding: "24px 16px", boxSizing: "border-box"
    }}>
      <header style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", maxWidth: 1100, margin: "auto"
      }}>
        <strong style={{ fontSize: 23 }}>STUDIO WEAR</strong>
        <span>السلة ({cart})</span>
      </header>

      <div style={{ textAlign: "center", marginTop: 45 }}>
        <h1 style={{ fontSize: "clamp(28px,5vw,52px)", margin: 0 }}>
          اكتشف مجموعتنا
        </h1>
        <p style={{ color: "#aaa" }}>
          اختر التيشيرت لتجربة الحركة التفاعلية
        </p>
      </div>

      <section style={{
        maxWidth: 950, margin: "70px auto 0",
        position: "relative", height: 370
      }}>
        <div style={{
          position: "absolute", top: 25, left: "2%",
          width: "96%", height: 8, borderRadius: 10,
          background: "linear-gradient(#aaa,#555,#ddd)",
          boxShadow: "0 4px 18px #000"
        }} />

        <div style={{
          position: "relative", display: "grid",
          gridTemplateColumns: "repeat(4,minmax(0,1fr))",
          gap: 0, paddingTop: 25
        }}>
          {products.map((product) => (
            <motion.button
              layoutId={"shirt-" + product.id}
              key={product.id}
              onClick={() => setSelected(product.id)}
              whileHover={!selected ? { y: -12, scale: 1.04 } : {}}
              animate={{
                opacity: selected && selected !== product.id ? .35 : 1,
                scale: selected === product.id ? 0 : 1
              }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              style={{
                border: 0, background: "transparent",
                cursor: "pointer", padding: 0,
                transformOrigin: "top center"
              }}
            >
              <Shirt color={product.color} />
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {current && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(8,9,13,.94)",
              zIndex: 20, display: "flex",
              alignItems: "center", justifyContent: "center",
              padding: 20, boxSizing: "border-box"
            }}
          >
            <button onClick={() => setSelected(null)}
              style={{
                position: "absolute", top: 25, right: 25,
                background: "#333", color: "#fff",
                border: 0, borderRadius: 50,
                width: 45, height: 45, fontSize: 24,
                cursor: "pointer"
              }}>
              ×
            </button>

            <div style={{
              display: "flex", flexWrap: "wrap",
              alignItems: "center", justifyContent: "center",
              gap: 35, maxWidth: 900, width: "100%"
            }}>
              <motion.div
                key={current.id}
                initial={{ scale: .6, y: 90, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: .7, opacity: 0 }}
                transition={{ type: "spring", stiffness: 140, damping: 19 }}
                style={{ width: "min(65vw,350px)" }}
              >
                <Shirt color={current.color} />
              </motion.div>

              <div style={{ minWidth: 220 }}>
                <h2>{current.name}</h2>
                <h3>{current.price} ريال</h3>
                <p style={{ color: "#aaa" }}>اختر المقاس</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {["S", "M", "L", "XL"].map(s => (
                    <button key={s} onClick={() => setSize(s)}
                      style={{
                        padding: "12px 15px",
                        border: size === s ? "2px solid white" : "1px solid #555",
                        background: size === s ? "#444" : "#222",
                        color: "white", borderRadius: 8,
                        cursor: "pointer"
                      }}>{s}</button>
                  ))}
                </div>

                <button onClick={() => setCart(c => c + 1)}
                  style={{
                    display: "block", marginTop: 20,
                    padding: "15px 30px", border: 0,
                    borderRadius: 9, background: "#fff",
                    color: "#111", fontWeight: "bold",
                    cursor: "pointer"
                  }}>
                  أضف إلى السلة
                </button>

                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  <button onClick={() => changeShirt(-1)}
                    style={navStyle}>السابق</button>
                  <button onClick={() => changeShirt(1)}
                    style={navStyle}>التالي</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

const navStyle = {
  padding: "12px 20px", border: "1px solid #555",
  background: "#222", color: "#fff",
  borderRadius: 8, cursor: "pointer"
};
