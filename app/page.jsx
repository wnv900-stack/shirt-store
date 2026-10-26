
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const shirts = [
  {
    id: 1,
    name: "تيشيرت أسود",
    price: 99,
    image: "https://placehold.co/600x750/222222/ffffff.png?text=BLACK+TEE"
  },
  {
    id: 2,
    name: "تيشيرت أبيض",
    price: 109,
    image: "https://placehold.co/600x750/f4f4f4/222222.png?text=WHITE+TEE"
  },
  {
    id: 3,
    name: "تيشيرت كحلي",
    price: 119,
    image: "https://placehold.co/600x750/233a66/ffffff.png?text=NAVY+TEE"
  },
  {
    id: 4,
    name: "تيشيرت عنابي",
    price: 129,
    image: "https://placehold.co/600x750/772b40/ffffff.png?text=BURGUNDY+TEE"
  }
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const spring = {
    type: "spring",
    stiffness: 120,
    damping: 22
  };

  function move(direction) {
    setActive((prev) => (prev + direction + shirts.length) % shirts.length);
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f5f4f0",
      color: "#191919",
      fontFamily: "Arial, sans-serif",
      overflow: "hidden",
      position: "relative"
    }}>
      <header style={{
        padding: "25px 6%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <strong style={{ fontSize: 22 }}>STUDIO WEAR</strong>
        <span>COLLECTION 01 / 04</span>
      </header>

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <h1 style={{
          fontSize: "clamp(30px, 5vw, 58px)",
          marginBottom: 8
        }}>
          THE COLLECTION
        </h1>
        <p style={{ color: "#777" }}>
          اسحب أو استخدم الأسهم للتنقل بين التيشيرتات
        </p>
      </div>

      <section style={{
        height: "min(62vh, 550px)",
        position: "relative",
        maxWidth: 1100,
        margin: "30px auto"
      }}>
        <div style={{
          position: "absolute",
          top: 65,
          left: "5%",
          width: "90%",
          height: 7,
          background: "linear-gradient(#aaa, #666, #ddd)",
          borderRadius: 10,
          boxShadow: "0 5px 15px #0002"
        }} />

        {shirts.map((shirt, index) => {
          let distance = index - active;

          if (distance > 2) distance -= 4;
          if (distance < -2) distance += 4;

          return (
            <motion.div
              key={shirt.id}
              onClick={() => {
                if (index === active) {
                  setOpen(true);
                } else {
                  setActive(index);
                }
              }}
              animate={{
                x: `calc(-50% + ${distance * 65}%)`,
                y: Math.abs(distance) * 15,
                scale: distance === 0 ? 1.08 : 0.78,
                rotateY: distance * -20,
                opacity: Math.abs(distance) === 2 ? 0.65 : 1
              }}
              transition={spring}
              style={{
                position: "absolute",
                top: 65,
                left: "50%",
                width: "min(56vw, 340px)",
                height: "75%",
                transformOrigin: "top center",
                cursor: "pointer",
                zIndex: 10 - Math.abs(distance),
                transformStyle: "preserve-3d"
              }}
            >
              <div style={{
                position: "absolute",
                top: -28,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 50,
                color: "#888"
              }}>⌒</div>

              <img
                src={shirt.image}
                alt={shirt.name}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 18px 18px #0003)"
                }}
              />
            </motion.div>
          );
        })}
      </section>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        paddingBottom: 35
      }}>
        <button onClick={() => move(-1)} style={arrow}>←</button>

        <div style={{ textAlign: "center", minWidth: 170 }}>
          <strong>{shirts[active].name}</strong>
          <p>{shirts[active].price} ريال</p>
          <small>اضغط على التيشيرت لعرضه</small>
        </div>

        <button onClick={() => move(1)} style={arrow}>→</button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "#f5f4f0",
              zIndex: 50,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 25
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: 25,
                right: 25,
                background: "transparent",
                border: "none",
                fontSize: 35,
                cursor: "pointer"
              }}
            >×</button>

            <motion.img
              src={shirts[active].image}
              initial={{ scale: 0.7, y: 80, rotateY: -25 }}
              animate={{ scale: 1, y: 0, rotateY: 0 }}
              exit={{ scale: 0.7, y: 80 }}
              transition={spring}
              style={{
                width: "min(80vw, 450px)",
                height: "60vh",
                objectFit: "contain"
              }}
            />

            <h2>{shirts[active].name}</h2>
            <p>{shirts[active].price} ريال</p>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "#191919",
                color: "white",
                padding: "14px 35px",
                border: 0,
                cursor: "pointer"
              }}
            >
              العودة للمجموعة
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

const arrow = {
  width: 48,
  height: 48,
  borderRadius: "50%",
  border: "1px solid #999",
  background: "transparent",
  fontSize: 23,
  cursor: "pointer"
};
