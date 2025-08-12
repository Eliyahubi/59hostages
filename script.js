// נתונים של שמות החטופים - רשימה מעודכנת
const hostageNames = [
    "אלון אהל",
    "אבינתן אור",
    "עידן אלכסנדר",
    "מתן אנגרסט",
    "אלקנה בוחבוט",
    "גלי ברמן",
    "זיו ברמן",
    "רום ברסלבסקי",
    "ביפין ג'ושי",
    "גיא גלבוע דלאל",
    "אביתר דוד",
    "איתן הורן",
    "מקסים הרקין",
    "יוסף חיים אוחנה",
    "נמרוד כהן",
    "שגב כלפון",
    "איתן מור",
    "עמרי מירן",
    "עומר נאוטרה",
    "פינטה נטפונג",
    "תמיר נמרודי",
    "מתן צנגוקר",
    "דוד קוניו",
    "אריאל קוניו",
    "בר קופרשטיין",
    "עידן שתיוי",
    "תמיר אדר ז\"ל",
    "דרור אור ז\"ל",
    "גיא אילוז ז\"ל",
    "מוחמד אל אטרש ז\"ל",
    "רונן אנגל ז\"ל",
    "אביב אצילי ז\"ל",
    "סונטאיה אקראסי ז\"ל",
    "אוריאל ברוך ז\"ל",
    "סהר ברוך ז\"ל",
    "רן גואילי ז\"ל",
    "מני גודארד ז\"ל",
    "הדר גולדין ז\"ל",
    "עוז דניאל ז\"ל",
    "ענבר הימן ז\"ל",
    "ג'ודי וינשטיין חגי ז\"ל",
    "אילן וייס ז\"ל",
    "אריה זלמנוביץ' ז\"ל",
    "גדי חגי ז\"ל",
    "טל חיימי ז\"ל",
    "אסף חממי ז\"ל",
    "איתי חן ז\"ל",
    "יאיר יעקב ז\"ל",
    "ג'ושוע לואיטו מולל ז\"ל",
    "איתן לוי ז\"ל",
    "שי לוינסון ז\"ל",
    "אליהו מרגלית ז\"ל",
    "יונתן סמרנו ז\"ל",
    "דניאל פרץ ז\"ל",
    "עמירם קופר ז\"ל",
    "יוסי שרעבי ז\"ל",
    "עפרה קידר ז\"ל",
    "ליאור רודאיף ז\"ל",
    "סונתטיסאק רינטלאק ז\"ל"
];

// מערך לשמירת האנימציות
const animations = [];

// יצירת הבלונים
function createBalloons() {
    const container = document.getElementById('balloonContainer');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    hostageNames.forEach((name, index) => {
        // יצירת אלמנט הבלון
        const balloon = document.createElement('a');
        balloon.href = "https://www.kan.org.il/lobby/kidnapped/?category-id=663212";
        balloon.target = "_blank";
        balloon.className = 'balloon';

        // מיקום אקראי של הבלון
        const left = Math.random() * (containerWidth - 100);
        const top = Math.random() * (containerHeight - 150) + 100;

        balloon.innerHTML = `
            <div class="balloon-shape">
                <div class="balloon-name">${name}</div>
            </div>
        `;

        balloon.style.left = `${left}px`;
        balloon.style.top = `${top}px`;

        container.appendChild(balloon);

        // שמירת מידע לאנימציה
        const balloonData = {
            element: balloon,
            x: left,
            y: top,
            dx: (Math.random() - 0.5) * 0.5,  // Slower speed
            dy: (Math.random() - 0.5) * 0.5,   // Slower speed
            sway: Math.random() * Math.PI * 2,
            swaySpeed: 0.02 + Math.random() * 0.02,
            swayAmplitude: 0.5 + Math.random() * 0.5
        };

        // הוספה למערך האנימציות
        animations.push(balloonData);
    });

    // התחלת אנימציה
    requestAnimationFrame(moveAllBalloons);
}

// הזזת כל הבלונים בכל פריים
function moveAllBalloons() {
    const container = document.getElementById('balloonContainer');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // עדכון מיקום כל הבלונים
    animations.forEach(balloon => {
        // עדכון המיקום
        balloon.x += balloon.dx;
        balloon.y += balloon.dy;

        // בדיקת התנגשות עם גבולות המסך
        if (balloon.x <= 0 || balloon.x >= containerWidth - 80) {
            balloon.dx = -balloon.dx;
        }
        if (balloon.y <= 0 || balloon.y >= containerHeight - 120) {
            balloon.dy = -balloon.dy;
        }

        // לפעמים משנים כיוון באופן אקראי
        if (Math.random() < 0.002) {
            balloon.dx = (Math.random() - 0.5) * 0.5;
            balloon.dy = (Math.random() - 0.5) * 0.5;
        }

        // Add sway
        balloon.sway += balloon.swaySpeed;
        const swayX = Math.sin(balloon.sway) * balloon.swayAmplitude;

        // עדכון המיקום החדש של הבלון
        balloon.element.style.left = `${balloon.x}px`;
        balloon.element.style.top = `${balloon.y}px`;
        balloon.element.style.transform = `translateX(${swayX}px) rotate(${swayX * 2}deg)`;
    });

    // המשך האנימציה
    requestAnimationFrame(moveAllBalloons);
}

// התחלת התוכנית לאחר טעינת העמוד
window.addEventListener('load', createBalloons);

// התאמת גודל המכל בעת שינוי גודל החלון
window.addEventListener('resize', function() {
    const container = document.getElementById('balloonContainer');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // עדכון מיקום הבלונים
    animations.forEach(balloon => {
        // וידוא שהבלונים נשארים בתוך המסך
        if (balloon.x > containerWidth - 80) {
            balloon.x = containerWidth - 80;
        }
        if (balloon.y > containerHeight - 120) {
            balloon.y = containerHeight - 120;
        }

        // עדכון המיקום החדש של הבלון
        balloon.element.style.left = `${balloon.x}px`;
        balloon.element.style.top = `${balloon.y}px`;
    });
});
