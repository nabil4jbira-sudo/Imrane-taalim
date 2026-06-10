/* =====================================================
   عمران التعليم - ملف الوظائف والحركة
   ===================================================== */

let currentLessonId = 1;

// دالة الذهاب إلى صفحة الدروس
function goToLessons() {
    window.location.href = 'lessons.html';
}

// دالة الرجوع للصفحة الرئيسية
function goHome() {
    window.location.href = 'index.html';
}

// دالة تحميل الدرس
function loadLesson(id) {
    const lesson = lessons.find(l => l.id === id);
    
    if (!lesson) return;
    
    currentLessonId = id;
    
    // تحديث رقم الدرس
    document.getElementById('lessonNumber').textContent = id;
    
    // تحديث الحرف
    document.getElementById('letterArabic').textContent = lesson.letter;
    document.getElementById('letterName').textContent = lesson.name_ar;
    document.getElementById('letterNameIt').textContent = lesson.name_it;
    
    // النطق
    document.getElementById('pronunciation').textContent = lesson.pronunciation;
    
    // الكلمات من القرآن
    let wordsHTML = '';
    lesson.words.forEach((word, index) => {
        wordsHTML += `
            <div class="word-card">
                <div class="word-number">${index + 1}</div>
                <h3>${word.arabic}</h3>
                <p class="word-latin">${word.latin}</p>
                <p class="word-italian">${word.italian}</p>
                <div class="word-meaning">
                    <p class="meaning-ar">${word.meaning_ar}</p>
                    <p class="meaning-it">${word.meaning_it}</p>
                </div>
                <div class="quranic-verse">
                    <p class="verse-title">📖 من القرآن الكريم:</p>
                    <p class="verse-ar">"${word.verse_ar}"</p>
                    <p class="verse-reference">${word.verse_reference}</p>
                    <p class="verse-it">"${word.verse_it}"</p>
                </div>
                <button class="btn-hear" onclick="speakWord('${word.arabic}')">
                    🔊 اسمع النطق
                </button>
            </div>
        `;
    });
    document.getElementById('wordsContainer').innerHTML = wordsHTML;
    
    // القصة القرآنية
    document.getElementById('storyAr').innerHTML = lesson.story_ar;
    document.getElementById('storyIt').innerHTML = lesson.story_it;
    
    // القيمة الإسلامية
    document.getElementById('valueAr').innerHTML = lesson.value_ar;
    document.getElementById('valueIt').innerHTML = lesson.value_it;
    
    // تحديث حالة الأزرار
    updateNavigationButtons();
    
    // تمرير سلس
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// دالة الانتقال للدرس التالي
function nextLesson() {
    if (currentLessonId < lessons.length) {
        loadLesson(currentLessonId + 1);
    }
}

// دالة الانتقال للدرس السابق
function previousLesson() {
    if (currentLessonId > 1) {
        loadLesson(currentLessonId - 1);
    }
}

// تحديث حالة أزرار التنقل
function updateNavigationButtons() {
    const prevBtn = document.querySelector('.btn-nav:first-child');
    const nextBtn = document.querySelector('.btn-nav:last-child');
    
    if (currentLessonId <= 1) {
        prevBtn.disabled = true;
        prevBtn.style.opacity = '0.5';
    } else {
        prevBtn.disabled = false;
        prevBtn.style.opacity = '1';
    }
    
    if (currentLessonId >= lessons.length) {
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.5';
        nextBtn.textContent = '✅ تم إكمال جميع الحروف!';
    } else {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
        nextBtn.textContent = 'التالي →';
    }
}

// دالة النطق الصوتي
function speakWord(word) {
    // إذا كان المتصفح يدعم Web Speech API
    if ('speechSynthesis' in window) {
        // إيقاف أي نطق سابق
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'ar-SA'; // اللغة العربية
        utterance.rate = 0.8; // السرعة
        utterance.pitch = 1; // النبرة
        utterance.volume = 1; // مستوى الصوت
        
        window.speechSynthesis.speak(utterance);
    } else {
        alert('متصفحك لا يدعم النطق الصوتي');
    }
}

// دالة نطق الحرف
function speakLetter() {
    const letter = document.getElementById('letterArabic').textContent;
    speakWord(letter);
}

// تحميل الدرس الأول عند فتح الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('lessonNumber')) {
            loadLesson(1);
        }
    });
} else {
    if (document.getElementById('lessonNumber')) {
        loadLesson(1);
    }
}