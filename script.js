let team1Score = 0;
let team2Score = 0;
let rounds = 0;
let cardsPerRound = 0;
let currentRound = 1;
let currentTeam = 1;
let team1Name = "";
let team2Name = "";
let team1Color = "#0000FF";
let team2Color = "#FF0000";
let gameQuestions = [];


function startGame() {
    team1Name = document.getElementById("team1-name").value || "Team 1";
    team2Name = document.getElementById("team2-name").value || "Team 2";

    rounds = parseInt(document.getElementById('rounds').value);
    cardsPerRound = parseInt(document.getElementById('cardsPerRound').value);
    team1Color = document.getElementById('team1-color').value;
    team2Color = document.getElementById('team2-color').value;

    if (rounds > 0 && cardsPerRound > 0 && questions.length > 0) {
        document.getElementById('game-setup').style.display = 'none';
        document.getElementById('game-play').style.display = 'block';
        generateCards();
    } else {
        alert("Please enter valid values.");
    }

    document.getElementById('team1-score').innerText = `${team1Name}: 0`;
    document.getElementById('team2-score').innerText = `${team2Name}: 0`;
}

let usedQuestions = []; // لتخزين الأسئلة التي تم استخدامها
let questions = [
    "حسيت يومًا إن صحتك النفسية مأثرة على شغلك وإنتاجيتك؟",
    "بتلاقي صعوبة في التعبير عن مشاعرك لزملائك في الفريق؟",
    "واجهت مشكلة في إدارة ضغوط الشغل وتراكم المهام؟",
    "حسيت يومًا إنك محتاج دعم نفسي وانت شغال تحت ضغط؟",
    "بتلاقي صعوبة في توازن حياتك الشخصية مع حياتك المهنية؟",
    "حسيت إنك محتاج تكلم حد عن مشاعرك أو أفكارك بس مش لاقي حد مناسب؟",
    "لقيت صعوبة في التعامل مع الضغوط النفسية في بيئة العمل؟",
    "في أوقات كنت محتاج مساعدة نفسية لكن ما لاقيتش دعم؟",
    "حسيت يومًا إنك مش قادر تتعامل مع المواقف الصعبة بسبب التوتر أو القلق؟",
    "حسيت إن بيئة الشغل بتزود أو تقلل رفاهيتك النفسية؟",
    "في أوقات حسيت إنك مرهق نفسيًا ومش قادر تركز؟",
    "حسيت إن صحتك النفسية مأثرة على تواصلك الجيد مع فريقك؟",
    "بتلاقي صعوبة في طلب المساعدة لما تشعر بالضغط النفسي في الشغل؟",
    "حسيت إنك مش قادر تكمل شغلك بسبب التوتر أو القلق؟",
    "التفكير في شغلك بيأثر سلبًا على صحتك النفسية؟",
    "حسيت يومًا إنك محتاج استراحة نفسية لكن مفيش وقت أو فرصة؟",
    "هل تعتقد إن الشغل تحت ضغط مستمر بيأثر سلبًا على حالتك النفسية؟",
    "حسيت يومًا إنك مش قادر تفرق بين الشغل والحياة الشخصية بسبب ضغط الشغل؟",
    "في أوقات حسيت إنك مش قادر تتأقلم مع التحديات بسبب مشاعر القلق أو التوتر؟",
    "لقيت صعوبة في العودة للعمل بعد إجازة بسبب الضغط النفسي؟",
    "حسيت إنك مش قادر تركز بسبب مشاعر سلبية طول فترة الشغل؟",
    "هل تؤمن إن تحسين الصحة النفسية في الشغل ممكن يزيد الإنتاجية؟",
    "حسيت في فترة إن الفريق مش فاهم مشاعرك أو ضغوطك النفسية؟",
    "لقيت صعوبة في تنظيم وقتك بسبب الأفكار والهموم النفسية؟",
    "حسيت يومًا إنك مش قادر تواجه مشكلات الشغل بسبب الاكتئاب أو القلق؟",
    "هل هناك أوقات حسيت إن العمل بيعرضك لمشاعر سلبية أكثر من أي وقت تاني؟",
    "لقيت صعوبة في تحقيق توازن بين مسؤولياتك المهنية وحياتك الاجتماعية بسبب الضغوط النفسية؟",
    "حسيت في فترة إنك محتاج مساعدة في التعامل مع مشاعرك في الشغل؟",
    "حسيت يومًا إنك مش واخد تقدير من الفريق بسبب مشاعر القلق أو الاكتئاب؟",
    "حسيت إن الضغوط النفسية مأثرة على قدرتك على اتخاذ قرارات صح؟",
    "لقيت صعوبة في الحفاظ على التفكير الإيجابي بسبب الضغوط النفسية؟",
    "في أفكار سلبية بتكرر في دماغك بسبب الضغوط النفسية في الشغل؟",
    "لقيت صعوبة في التفاعل مع زملائك بسبب مشاعر القلق أو التوتر؟",
    "هل تعتبر إن بيئة العمل مش داعمة للصحة النفسية بشكل كافي؟",
    "حسيت يومًا إنك محتاج إجازة نفسية لكن مش قادر تاخدها؟",
    "كان عندك شكوك إن بيئة العمل مأثرة على حالتك النفسية؟",
    "حسيت يومًا إن الشغل بيستهلك طاقتك النفسية بالكامل؟",
    "هل واجهت صعوبة في إظهار مشاعرك بشكل صح بسبب الضغوط النفسية؟",
    "حسيت إن الضغوط النفسية بتقلل قدرتك على التعامل مع تحديات الشغل؟",
    "حسيت يومًا إنك مش قادر تلاقي حلول لمشاكلك بسبب القلق النفسي؟",
    "واجهت صعوبة في التواصل مع الفريق بسبب مشاعر القلق أو التوتر؟",
    "في أوقات حسيت إن الضغوط النفسية مأثرة سلبًا على علاقاتك في الفريق؟",
    "هل تجد إن الشغل في بيئة مرهقة نفسيًا بيأثر على قدرتك على إبداع أفكار جديدة؟",
    "حسيت يومًا إنك مش قادر تعبر عن أفكارك بسبب قلقك؟",
    "حسيت يومًا إنك محتاج تتكلم مع حد عن صحتك النفسية لكن مفيش حد يدعمك؟",
    "حسيت إن الفريق مش بيقدم لك الدعم الكافي لمواجهة الضغوط النفسية؟",
    "لقيت صعوبة في الحفاظ على هدوءك وتركيزك بسبب الضغوط النفسية؟",
    "حسيت يومًا إن مشاعرك مش لاقية حد يستمع ليها في الفريق؟"
];

function generateCards() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    document.getElementById("round-display").innerText = `Round: ${currentRound}`;

    let currentCardTeam = 1;
    for (let i = 0; i < cardsPerRound; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.team = currentCardTeam;
        card.addEventListener('click', () => flipCard(card));

        const front = document.createElement('div');
        front.classList.add('front');

        const logo = document.createElement('img');
        logo.src = 'logo.png';
        front.appendChild(logo);

        const stripe = document.createElement('div');
        stripe.classList.add('team-stripe');
        stripe.style.backgroundColor = currentCardTeam === 1 ? team1Color : team2Color;
        front.appendChild(stripe);

        const back = document.createElement('div');
        back.classList.add('back');
        
        // اختيار سؤال عشوائي من الأسئلة المتاحة
        const availableQuestions = questions.filter(question => !usedQuestions.includes(question));
        
        if (availableQuestions.length === 0) {
            // إعادة تعيين الأسئلة التي تم استخدامها إذا انتهت الأسئلة المتاحة
            usedQuestions = [];
        }
        
        const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
        usedQuestions.push(question); // إضافة السؤال المستخدم للقائمة
        
        const questionText = document.createElement('p');
        questionText.classList.add('question-text');
        questionText.innerText = question;
        back.appendChild(questionText);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const correctButton = document.createElement('button');
        correctButton.innerText = "Correct";
        correctButton.classList.add('correct');
        correctButton.addEventListener('click', event => answerQuestion(true, event));

        const incorrectButton = document.createElement('button');
        incorrectButton.innerText = "Incorrect";
        incorrectButton.classList.add('incorrect');
        incorrectButton.addEventListener('click', event => answerQuestion(false, event));

        buttonContainer.appendChild(correctButton);
        buttonContainer.appendChild(incorrectButton);
        back.appendChild(buttonContainer);

        card.appendChild(front);
        card.appendChild(back);
        cardContainer.appendChild(card);

        currentCardTeam = currentCardTeam === 1 ? 2 : 1;
    }
}



function checkNextRound() {
    const remainingCards = document.querySelectorAll('.card:not([style*="display: none"])').length;

    if (remainingCards === 0) {
        if (currentRound < rounds) {
            currentRound++;
            document.getElementById("round-display").innerText = `Round: ${currentRound}`;
            setTimeout(generateCards, 1000);
        } else {
            setTimeout(() => {
                alert(`Game Over!\n${team1Name}: ${team1Score}\n${team2Name}: ${team2Score}`);
                document.getElementById("play-again").style.display = "block"; 
            }, 1000);
        }
    }
}

function flipCard(card) {
    card.classList.toggle('flip');
}

function answerQuestion(isCorrect, event) {
    event.preventDefault();
    event.stopPropagation();

    const card = event.target.closest('.card');
    if (!card) return;

    const cardTeam = parseInt(card.dataset.team); // تحديد الفريق صاحب الكارت

    if (isCorrect) {
        updateScore(cardTeam, true); // إضافة نقطة للفريق الصحيح
        card.style.display = 'none';
        checkNextRound();
    } else {
        showPunishment(cardTeam); // تفعيل العقاب للفريق اللي اختار غلط
        card.style.display = 'none'; // إخفاء الكارت بعد الاختيار
    }
}




let usedPunishments = []; // قائمة التخزين للعقوبات المستخدمة

const punishments = [
    "هتغني أغنية بصوت يضحك قدام اللي حواليك",
    "هتمثل مشهد يضحك",
    "قول نكتة قدام اللي موجودين بطريقة تضحك",
    "اعمل رقصة أو حركة عشوائية",
    "قول تحدي لحد من اللي قدامك يعملها",
    "قلد شخصية كرتونية",
    "حط كتاب أو أي حاجة على دماغك وافضل سايبه لمدة دورين",
    "اتكلم بلهجة مختلفة",
    "قول مميزات غريبة عن نفسك بشكل درامي",
    "هنخليك تغمض عينك ونخليك توصل مكان معين عن طريق إن احنا هنشرح لك",
    "مثل مشهد من فيلم هندي",
    "قول سر مضحك عن نفسك",
    "اعمل صوت حيوان عشوائي وخلي التيم يخمن هو إيه",
    "امشي كأنك عارض أزياء",
    "قول مشهد درامي من فيلم",
    "اتكلم كأنك معلق رياضي",
    "مثل إنك بتحرك وتتكلم وتتعامل بالـ Slow Motion لمدة ٣٠ ثانية",
    "اقف على رجل واحدة دقيقة من غير ما تقع",
    "قول تحدي للي قدامك يعملها",
    "اتكلم كأنك في نشرة جوية وبتقول أخبار وكأنك مذيع",
    "اعمل وشوش مضحكة على وشك لمدة ٣٠ ثانية من غير ما تضحك",
    "امشي زي البطاريق",
    "لف حوالين نفسك ٧ مرات وحاول تمشي في خط مستقيم",
    "اتكلم لمدة دقيقة معانا من غير ما تقول حرف التاء",
    "قول قصتين صغيرين عنك واحدة حقيقة وواحدة كذب وحاول تخلي أغلبية التيم يقول عن الكذبة إنها الحقيقة",
    "جاوب على أي سؤال بسؤال لمدة دقيقتين",
    "حاول تتكلم زي اللي بيرنوا فجأة عليك ويحاولوا يقنعوك تشتري منتج أو وحدة سكنية و حاول تعمل ده معانا بطريقة تضحك"
];

function showPunishment(team) {
    // إخفاء الكارت بعد الضغط على "Incorrect"
    document.querySelector('.card[data-team="'+team+'"]').style.display = 'none';

    // التأكد من عدم تكرار العقوبة حتى انتهاء القائمة
    let availablePunishments = punishments.filter(punishment => !usedPunishments.includes(punishment));

    if (availablePunishments.length === 0) {
        usedPunishments = []; // إعادة تعيين القائمة عند انتهاء كل العقوبات
        availablePunishments = [...punishments];
    }

    // اختيار عقوبة عشوائية بدون تكرار
    const randomIndex = Math.floor(Math.random() * availablePunishments.length);
    const punishmentTextValue = availablePunishments[randomIndex];

    // حفظ العقوبة المستعملة لمنع تكرارها
    usedPunishments.push(punishmentTextValue);

    // إنشاء عنصر العقوبة
    const punishmentDiv = document.createElement('div');
    punishmentDiv.classList.add('punishment-card');

    const punishmentText = document.createElement('p');
    punishmentText.innerText = punishmentTextValue;
    punishmentDiv.appendChild(punishmentText);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    
    // ✅ **إضافة صورة العقاب**
    const punishmentImage = document.createElement('img');
    punishmentImage.src = './images/punishment.jpg';  // تأكد من وجود الصورة في `images/`
    punishmentImage.alt = "Punishment Image";
    punishmentDiv.appendChild(punishmentImage);

    const didItButton = document.createElement('button');
    didItButton.innerText = '✔️ Did It';
    didItButton.onclick = () => handlePunishment(team, true, punishmentDiv);

    const loserButton = document.createElement('button');
    loserButton.innerText = '❌ Loser';
    loserButton.onclick = () => handlePunishment(team, false, punishmentDiv);

    buttonContainer.appendChild(didItButton);
    buttonContainer.appendChild(loserButton);
    punishmentDiv.appendChild(buttonContainer);

    document.body.appendChild(punishmentDiv);
}


function handlePunishment(team, didIt, punishmentDiv) {
    if (didIt) {
        updateScore(team, true); // لو نفذ العقاب، ياخد نقطة
    } else {
        updateScore(team, false); // لو رفض العقاب، يخسر نقطة
    }

    setTimeout(() => {
        punishmentDiv.remove();
        checkNextRound();
    }, 500);
}



function updateScore(team, didIt) {
    if (didIt) {
        if (team === 1) {
            team1Score++;
            document.getElementById('team1-score').innerText = `${team1Name}: ${team1Score}`;
        } else {
            team2Score++;
            document.getElementById('team2-score').innerText = `${team2Name}: ${team2Score}`;
        }
    } else {
        if (team === 1) {
            team1Score--;
            document.getElementById('team1-score').innerText = `${team1Name}: ${team1Score}`;
        } else {
            team2Score--;
            document.getElementById('team2-score').innerText = `${team2Name}: ${team2Score}`;
        }
    }
}


function restartGame() {
    // إعادة تعيين القيم الافتراضية
    document.getElementById("game-setup").style.display = "block";
    document.getElementById("game-play").style.display = "none";
    document.getElementById("play-again").style.display = "none"; // إخفاء الزر بعد الضغط عليه
}

document.addEventListener("mousemove", (e) => {
    const mouseMove = document.querySelector(".mouse-move");
    mouseMove.style.opacity = "1";
    mouseMove.style.transform = `translate(${e.clientX / 20}px, ${e.clientY / 20}px)`;
    
    // يخفي التأثير بعد شوية لما الماوس يتحرك بعيد
    clearTimeout(mouseMove.timer);
    mouseMove.timer = setTimeout(() => {
        mouseMove.style.opacity = "0";
    }, 200);
});
const meteorShower = document.createElement("div");
meteorShower.classList.add("meteor-shower");
document.body.appendChild(meteorShower);

function createMeteor() {
    const meteor = document.createElement("div");
    meteor.classList.add("meteor");

    // اختيار لون المذنب عشوائيًا
    const color = Math.random() > 0.5 ? "fire" : "silver";
    meteor.classList.add(color);

    // تحديد نقطة البداية فوق الشاشة وخارجها
    const startPositionX = window.innerWidth + Math.random() * 200; // يبدأ خارج الشاشة يمينًا
    const startPositionY = Math.random() * (window.innerHeight * 0.5); // يبدأ من أعلى الشاشة

    meteor.style.left = startPositionX + "px"; 
    meteor.style.top = startPositionY + "px";

    meteorShower.appendChild(meteor);

    // تحريك المذنب بحركة مقوسة (منحنى)
    const keyframes = [
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(-${window.innerWidth}px, ${window.innerHeight * 0.5}px) rotate(30deg)`, opacity: 0 }
    ];

    meteor.animate(keyframes, {
        duration: 5000, // مدة الحركة 3 ثواني
        easing: "ease-out",
        iterations: 1,
        fill: "forwards"
    });

    // إزالة المذنب بعد انتهاء الأنيميشن
    setTimeout(() => {
        meteor.remove();
    }, 5000);
}

// إنشاء مذنب كل 700 ميلي ثانية
setInterval(createMeteor, 1500);

