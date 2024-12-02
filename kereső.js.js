        // Angol ABC betűi
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        // A kevert betűk listája
        let shuffledAlphabet = [...alphabet]; // A kevert ábécé itt is alapértelmezetten ugyanaz
        let isShuffled = false;  // Egy flag, hogy tudjuk, mikor kell keverni

        // A keverés funkció (Fisher-Yates algoritmus)
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Elemek kicserélése
            }
        }

        // A számhoz tartozó betű megtalálása
        function findLetter() {
            const number = parseInt(document.getElementById('numberInput').value);

            if (!number || number <= 0) {
                document.getElementById('result').textContent = "Kérlek, adj meg egy pozitív számot!";
                return;
            }

            // Ha a szám meghaladja az 26-ot, keverjük a betűket (egyszeri alkalommal)
            if (number > alphabet.length && !isShuffled) {
                shuffle(shuffledAlphabet);  // Csak egyszer kell keverni
                isShuffled = true;
            }

            // A számhoz tartozó betű meghatározása
            const letterIndex = (number - 1) % shuffledAlphabet.length;
            const resultLetter = shuffledAlphabet[letterIndex];

            document.getElementById('result').textContent = `A(z) ${number}. számhoz tartozó betű: ${resultLetter}`;
        }

