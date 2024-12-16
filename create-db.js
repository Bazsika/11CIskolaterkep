const sqlite3 = require('sqlite3').verbose();

// Létrehozzuk vagy megnyitjuk az adatbázist
let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Hiba az adatbázis megnyitásakor:', err.message);
    } else {
        console.log('Sikeresen csatlakozva az SQLite adatbázishoz.');
    }
});

// Tábla létrehozása
db.serialize(() => {
    // Ha már létezik a tábla, akkor töröljük
    db.run("DROP TABLE IF EXISTS rooms");

    // Létrehozzuk a rooms táblát
    db.run(`
        CREATE TABLE rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            capacity INTEGER NOT NULL
        )
    `);

    // Tesztadatok feltöltése
    const stmt = db.prepare("INSERT INTO rooms (name, capacity) VALUES (?, ?)");
    stmt.run("Kriston Aranka", 31);
    stmt.run("Vidra András", 30);
    stmt.run("Kiss Tamás", 33);
    stmt.finalize();

    console.log('Tábla létrehozva és tesztadatok feltöltve.');

    db.close();
});
