import { useEffect, useState } from "react";

const fetchSpells = async () => {
  const res = await fetch(
    "https://potterapi-fedeperin.vercel.app/en/spells"
  );
  const spells = await res.json();
  return spells;
};

const SpellList = () => {
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    fetchSpells()
      .then((data) => setSpells(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh"
      }}
    >
      <h2
        style={{
          marginBottom: "30px",
          color: "#2c3e50",
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "600"
        }}
      >
        Harry Potter Spells
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px"
        }}
      >
        {spells.map((spell) => (
          <div
            key={spell.index}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0px 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0px 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            <p style={styles.label}>Spell</p>
            <p style={styles.title}>{spell.spell}</p>

            <p style={styles.label}>Use</p>
            <p style={styles.use}>{spell.use}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------- STYLES ---------------- */
const styles = {
  card: {
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, boxShadow 0.2s",
    cursor: "pointer"
  },
  label: {
    margin: "0 0 5px 0",
    color: "#7f8c8d",
    fontSize: "12px",
    textTransform: "uppercase"
  },
  title: {
    margin: "0 0 15px 0",
    color: "#4f46e5",
    fontSize: "18px",
    fontWeight: "600"
  },
  use: {
    margin: "0",
    color: "#2c3e50",
    fontSize: "14px",
    lineHeight: "1.5"
  }
};

export default SpellList;
