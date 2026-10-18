/**
 * ============================================================================
 * DATA DETECTIVE: CRACK THE NUMBERS!
 * Interactive Beginner Data Analytics Game
 * ============================================================================
 */

// Sound Synthesizer via Web Audio API (100% reliable, no external audio files required)
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  playCorrect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      // Cheerful major chord arpeggio (C5 - E5 - G5 - C6)
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + index * 0.07;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.26);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  playWrong() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(160, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  playFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      // Victory Brass Fanfare
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      const durations = [0.1, 0.1, 0.1, 0.18, 0.45];
      let t = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + durations[idx]);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + durations[idx]);
        t += durations[idx] * 0.85;
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

// ============================================================================
// GAME DATASETS & CASE FILES
// ============================================================================
const CASE_FILES = [
  {
    level: 1,
    id: 'case_01',
    title: 'The Cookie Jar Mystery',
    subtitle: 'Find the Biggest and Smallest Numbers',
    badgeName: 'Junior Data Scout',
    briefing: 'Inspector, cookies have been vanishing from classroom snack jars! Examine the cookie counts in each room to find extreme values, sort the classrooms, and calculate ranges.',
    helper: {
      title: 'Data Tip: Maximum, Minimum & Range',
      text: 'To find the <strong>Maximum</strong>, look for the highest numerical value. For the <strong>Minimum</strong>, search for the lowest number. The <strong>Range</strong> is simply <code>Maximum - Minimum</code>!'
    },
    table: {
      headers: ['Classroom', 'Teacher', 'Cookie Jars', 'Cookies in Jar', 'Jar Status'],
      highlightColIndex: 3,
      rows: [
        ['Room A (Blue)', 'Ms. Maple', '4 jars', '42 cookies', 'Normal'],
        ['Room B (Red)', 'Mr. Oak', '8 jars', '89 cookies', 'Crumbs spotted'],
        ['Room C (Green)', 'Mrs. Birch', '2 jars', '15 cookies', 'Low supply'],
        ['Room D (Yellow)', 'Dr. Pine', '9 jars', '95 cookies', 'Packed full'],
        ['Room E (Purple)', 'Coach Willow', '6 jars', '64 cookies', 'Half eaten'],
        ['Room F (Orange)', 'Mr. Cedar', '3 jars', '28 cookies', 'Freshly baked']
      ]
    },
    questions: [
      {
        id: 'l1_q1',
        prompt: 'Which classroom currently has the HIGHEST (maximum) number of cookies?',
        clue: 'Scan the "Cookies in Jar" column from top to bottom. Which room has the greatest number?',
        highlightCol: 3,
        options: [
          'Room B (89 cookies)',
          'Room D (95 cookies)',
          'Room E (64 cookies)',
          'Room A (42 cookies)'
        ],
        correctIndex: 1,
        explanation: 'Brilliant! Room D has 95 cookies, which is the Maximum value in our dataset. In Data Analytics, finding the maximum helps identify peak performers or highest values!'
      },
      {
        id: 'l1_q2',
        prompt: 'Which classroom has the LOWEST (minimum) number of cookies?',
        clue: 'Look for the smallest number in the "Cookies in Jar" column.',
        highlightCol: 3,
        options: [
          'Room C (15 cookies)',
          'Room F (28 cookies)',
          'Room A (42 cookies)',
          'Room E (64 cookies)'
        ],
        correctIndex: 0,
        explanation: 'Spot on! Room C has only 15 cookies. The Minimum is the lowest number in a dataset, which is crucial for spotting shortages or low outliers!'
      },
      {
        id: 'l1_q3',
        prompt: 'If Chief Inspector sorts the rooms from most cookies to least (descending order), which room takes 2nd place?',
        clue: 'Room D is #1 with 95 cookies. Which room has the second largest number?',
        highlightCol: 3,
        options: [
          'Room E (64 cookies)',
          'Room B (89 cookies)',
          'Room A (42 cookies)',
          'Room F (28 cookies)'
        ],
        correctIndex: 1,
        explanation: 'Exactly right! In sorted order: 1st is Room D (95), 2nd is Room B (89), 3rd is Room E (64). Sorting lets analysts rank data from top to bottom.'
      },
      {
        id: 'l1_q4',
        prompt: 'What is the Range between the room with the most cookies and the room with the least cookies?',
        clue: 'Range formula: Largest number (95) MINUS Smallest number (15). What is 95 - 15?',
        highlightCol: 3,
        options: [
          '70 cookies',
          '80 cookies',
          '89 cookies',
          '95 cookies'
        ],
        correctIndex: 1,
        explanation: 'Masterful math! 95 (Max) - 15 (Min) = 80 cookies. The Range tells us how widely spread our data points are from top to bottom.'
      }
    ]
  },
  {
    level: 2,
    id: 'case_02',
    title: "Sunny Bakery's Sales Ledger",
    subtitle: "Analyze a Small Shop's Sales & Revenue",
    badgeName: 'Business Data Sleuth',
    briefing: 'Baker Bob needs your analytic deduction! Examine his weekly pastry sales ledger to calculate unit popularity, total revenues, and discover which treats make the most and least profit.',
    helper: {
      title: 'Data Tip: Revenue & Profit Formulas',
      text: '<strong>Revenue</strong> = <code>Sale Price × Quantity Sold</code> (money collected).<br><strong>Profit</strong> = <code>Total Revenue - Total Cost</code> (money kept after expenses)!'
    },
    table: {
      headers: ['Bakery Product', 'Cost to Make', 'Sale Price', 'Quantity Sold', 'Total Revenue', 'Total Profit'],
      highlightColIndex: 3,
      rows: [
        ['Chocolate Croissant', '$1.00', '$3.00', '50 sold', '$150.00', '$100.00'],
        ['Glazed Donut', '$0.50', '$2.00', '80 sold', '$160.00', '$120.00'],
        ['Blueberry Muffin', '$1.50', '$4.00', '30 sold', '$120.00', '$75.00'],
        ['Strawberry Tart', '$2.00', '$5.00', '20 sold', '$100.00', '$60.00'],
        ['Sourdough Loaf', '$1.00', '$6.00', '25 sold', '$150.00', '$125.00']
      ]
    },
    questions: [
      {
        id: 'l2_q1',
        prompt: 'Which bakery product had the HIGHEST quantity sold (most popular by units)?',
        clue: 'Inspect the "Quantity Sold" column. Find the row with the largest number of units sold.',
        highlightCol: 3,
        options: [
          'Chocolate Croissant (50 sold)',
          'Glazed Donut (80 sold)',
          'Sourdough Loaf (25 sold)',
          'Blueberry Muffin (30 sold)'
        ],
        correctIndex: 1,
        explanation: 'Correct! Glazed Donuts sold 80 units, beating every other treat. In retail analytics, tracking unit volume helps stores avoid running out of popular inventory.'
      },
      {
        id: 'l2_q2',
        prompt: 'Baker Bob sells Glazed Donuts for $2.00 each and sold 80 donuts. What was his Total Revenue for Glazed Donuts?',
        clue: 'Formula: Sale Price ($2.00) × Quantity (80). You can also look directly at the Total Revenue column!',
        highlightCol: 4,
        options: [
          '$80.00',
          '$120.00',
          '$160.00',
          '$200.00'
        ],
        correctIndex: 2,
        explanation: 'Great deduction! $2.00 × 80 = $160.00. Revenue is the total cash collected from sales before subtracting production costs.'
      },
      {
        id: 'l2_q3',
        prompt: 'Which product generated the HIGHEST total profit for Baker Bob?',
        clue: 'Check the "Total Profit" column on the far right. Look for the largest dollar amount.',
        highlightCol: 5,
        options: [
          'Glazed Donut ($120.00 profit)',
          'Sourdough Loaf ($125.00 profit)',
          'Chocolate Croissant ($100.00 profit)',
          'Blueberry Muffin ($75.00 profit)'
        ],
        correctIndex: 1,
        explanation: 'Sharp eyes! Even though Sourdough Loaves sold fewer units (25 vs 80), its high $5 margin per loaf yielded $125.00 profit, higher than all other items!'
      },
      {
        id: 'l2_q4',
        prompt: 'Which pastry generated the LEAST (lowest) profit for the bakery?',
        clue: 'Look for the smallest value in the "Total Profit" column.',
        highlightCol: 5,
        options: [
          'Strawberry Tart ($60.00 profit)',
          'Blueberry Muffin ($75.00 profit)',
          'Chocolate Croissant ($100.00 profit)',
          'Sourdough Loaf ($125.00 profit)'
        ],
        correctIndex: 0,
        explanation: 'Exactly right! Strawberry Tart only earned $60.00 in profit. Analysts use least-profitable metrics to recommend price adjustments or recipe redesigns.'
      },
      {
        id: 'l2_q5',
        prompt: 'What is the COMBINED Total Revenue across all 5 bakery products?',
        clue: 'Sum the numbers in the Total Revenue column: $150 + $160 + $120 + $100 + $150. Use the Scratchpad (🧮) if you like!',
        highlightCol: 4,
        options: [
          '$580.00',
          '$640.00',
          '$680.00',
          '$720.00'
        ],
        correctIndex: 2,
        explanation: 'Outstanding analysis! $150 + $160 + $120 + $100 + $150 = $680.00. Calculating sums (aggregations) is one of the most fundamental skills in all of data science!'
      }
    ]
  },
  {
    level: 3,
    id: 'case_03',
    title: 'The Golden Trophy Heist',
    subtitle: 'Solve a Mystery Using Clues from a Table',
    badgeName: 'Master Data Sleuth',
    briefing: 'The championship Golden Trophy vanished from the trophy hall between 4:00 PM and 4:20 PM on Friday! Examine the security door logs and cafeteria purchase receipts to filter out innocent people and pinpoint the suspect!',
    helper: {
      title: 'Data Tip: Filtering & Cross-Table Deduction',
      text: 'In real data systems (like SQL or Excel), analysts apply <strong>Filters</strong> to eliminate non-matching rows. When we combine data from security logs and purchase receipts, that is called a <strong>Table Join</strong>!'
    },
    table: {
      headers: ['Suspect Name', 'Access Badge', 'Last Seen Location', 'Logged Time', 'Cafeteria Order', 'Amount Paid'],
      highlightColIndex: 1,
      rows: [
        ['Alex Rivera', 'Blue Badge', 'Hallway B (Trophy Hall)', '4:10 PM', 'Lemon Soda', '$3.00'],
        ['Maya Chen', 'Red Badge', 'Library Study Room', '4:20 PM', 'Hot Cocoa', '$2.50'],
        ['Sam Patel', 'Blue Badge', 'Cafeteria Hall', '4:15 PM', 'Apple Juice', '$2.00'],
        ['Jordan Lee', 'Green Badge', 'School Gym', '3:30 PM', 'Bottled Water', '$1.00']
      ]
    },
    questions: [
      {
        id: 'l3_q1',
        prompt: 'Security Clue 1: The hall scanner recorded a BLUE badge swipe. Filtering by "Badge = Blue", which suspects are ruled OUT (innocent)?',
        clue: 'Check the "Access Badge" column. Who does NOT have a Blue Badge?',
        highlightCol: 1,
        options: [
          'Alex Rivera & Sam Patel',
          'Maya Chen & Jordan Lee',
          'Sam Patel & Jordan Lee',
          'Maya Chen & Alex Rivera'
        ],
        correctIndex: 1,
        explanation: 'Accurate deduction! Maya Chen has a Red badge and Jordan Lee has a Green badge. By filtering on Badge = "Blue", we eliminate 2 suspects immediately!'
      },
      {
        id: 'l3_q2',
        prompt: 'Security Clue 2: The motion alarm inside Hallway B tripped at 4:10 PM. Between our two remaining suspects, who was at Hallway B at 4:10 PM?',
        clue: 'Look at the "Last Seen Location" and "Logged Time" columns for Alex and Sam.',
        highlightCol: 2,
        options: [
          'Sam Patel (Cafeteria Hall @ 4:15 PM)',
          'Alex Rivera (Hallway B @ 4:10 PM)',
          'Maya Chen (Library @ 4:20 PM)',
          'Jordan Lee (Gym @ 3:30 PM)'
        ],
        correctIndex: 1,
        explanation: 'Spot on! Alex Rivera was logged at Hallway B right when the motion sensor was tripped! Sam Patel was verified at the Cafeteria Hall.'
      },
      {
        id: 'l3_q3',
        prompt: 'Forensic Clue 3: A cafeteria receipt for Lemon Soda ($3.00) was dropped near the trophy pedestal. Who purchased the Lemon Soda?',
        clue: 'Examine the "Cafeteria Order" column to match the Lemon Soda item.',
        highlightCol: 4,
        options: [
          'Sam Patel ($2.00 Apple Juice)',
          'Maya Chen ($2.50 Hot Cocoa)',
          'Alex Rivera ($3.00 Lemon Soda)',
          'Jordan Lee ($1.00 Bottled Water)'
        ],
        correctIndex: 2,
        explanation: 'Bingo! Alex Rivera bought the Lemon Soda! In data analytics, connecting data from two different logs (security + cafeteria receipts) is called cross-referencing or joining data!'
      },
      {
        id: 'l3_q4',
        prompt: 'Final Accusation: All 3 evidence points align: Blue Badge + Hallway B at 4:10 PM + Lemon Soda purchase. Who is the person of interest?',
        clue: 'Which single suspect satisfies ALL 3 filters without contradiction?',
        highlightCol: 0,
        options: [
          'Sam Patel',
          'Jordan Lee',
          'Alex Rivera',
          'Maya Chen'
        ],
        correctIndex: 2,
        explanation: 'CASE CLOSED! 🎉 Alex Rivera was caught red-handed! Alex smiles and says: "You caught me, Detective! But I was just carrying the trophy to the workshop to polish it for the ceremony!" Case solved with 100% data evidence!'
      }
    ]
  }
];

// ============================================================================
// GAME STATE MANAGEMENT
// ============================================================================
class DataDetectiveGame {
  constructor() {
    this.sound = new SoundFX();
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.totalQuestionsAnswered = 0;
    this.totalCorrectAnswers = 0;
    this.hintsUsed = 0;

    this.currentLevelIndex = 0; // 0 = L1, 1 = L2, 2 = L3
    this.currentQuestionIndex = 0;
    this.selectedOptionIndex = null;
    this.hasAnsweredCurrent = false;

    // Progression: Level 1 is unlocked initially, Levels 2 & 3 locked
    this.unlockedLevels = [true, false, false];

    // Ranks based on total score
    this.ranks = [
      { minScore: 0, title: 'Rookie Sleuth 🔍' },
      { minScore: 40, title: 'Junior Inspector 📋' },
      { minScore: 90, title: 'Senior Data Detective 🕵️‍♂️' },
      { minScore: 130, title: 'Master Data Sleuth 🏆' }
    ];

    // Scratchpad Calculator state
    this.calcExpression = '';

    // Confetti particles
    this.confettiActive = false;
    this.confettiParticles = [];

    // Cache DOM Elements
    this.cacheElements();

    // Bind event handlers
    this.initEvents();

    // Render Initial State
    this.updateRankUI();
    this.updateScoreUI();
    this.updateLevelCardsUI();
  }

  cacheElements() {
    // Screens
    this.screens = {
      welcome: document.getElementById('welcomeScreen'),
      game: document.getElementById('gameScreen'),
      levelComplete: document.getElementById('levelCompleteScreen'),
      finalVictory: document.getElementById('finalVictoryScreen')
    };

    // Header & Stats
    this.playerRankEl = document.getElementById('playerRank');
    this.currentScoreEl = document.getElementById('currentScore');
    this.pointsBubbleEl = document.getElementById('pointsBubble');
    this.soundToggleBtn = document.getElementById('soundToggleBtn');
    this.calcToggleBtn = document.getElementById('calcToggleBtn');
    this.homeNavBtn = document.getElementById('homeNavBtn');

    // Welcome Screen
    this.startGameBtn = document.getElementById('startGameBtn');
    this.howToPlayBtn = document.getElementById('howToPlayBtn');
    this.levelCards = [
      document.getElementById('levelCard1'),
      document.getElementById('levelCard2'),
      document.getElementById('levelCard3')
    ];
    this.levelButtons = [
      document.getElementById('playLevel1Btn'),
      document.getElementById('playLevel2Btn'),
      document.getElementById('playLevel3Btn')
    ];

    // Gameplay Screen
    this.backToCasesBtn = document.getElementById('backToCasesBtn');
    this.hudLevelBadge = document.getElementById('hudLevelBadge');
    this.hudLevelTitle = document.getElementById('hudLevelTitle');
    this.questionProgressText = document.getElementById('questionProgressText');
    this.progressBarFill = document.getElementById('progressBarFill');

    // Evidence Panel
    this.evidenceTitle = document.getElementById('evidenceTitle');
    this.evidenceSubtitle = document.getElementById('evidenceSubtitle');
    this.caseBriefingText = document.getElementById('caseBriefingText');
    this.tableContainer = document.getElementById('tableContainer');
    this.helperTitle = document.getElementById('helperTitle');
    this.helperText = document.getElementById('helperText');

    // Deduction Panel
    this.questionStepPill = document.getElementById('questionStepPill');
    this.questionPrompt = document.getElementById('questionPrompt');
    this.clueToggleBtn = document.getElementById('clueToggleBtn');
    this.clueRevealBox = document.getElementById('clueRevealBox');
    this.clueContentText = document.getElementById('clueContentText');
    this.optionsContainer = document.getElementById('optionsContainer');
    this.submitAnswerBtn = document.getElementById('submitAnswerBtn');

    // Feedback
    this.feedbackCard = document.getElementById('feedbackCard');
    this.feedbackIcon = document.getElementById('feedbackIcon');
    this.feedbackTitle = document.getElementById('feedbackTitle');
    this.feedbackScoreTag = document.getElementById('feedbackScoreTag');
    this.feedbackExplanation = document.getElementById('feedbackExplanation');
    this.nextQuestionBtn = document.getElementById('nextQuestionBtn');

    // Mini Stats
    this.currentAccuracy = document.getElementById('currentAccuracy');
    this.currentStreak = document.getElementById('currentStreak');
    this.hintsUsedCount = document.getElementById('hintsUsedCount');

    // Level Complete Screen
    this.levelClearTitle = document.getElementById('levelClearTitle');
    this.levelClearDesc = document.getElementById('levelClearDesc');
    this.summaryScoreGained = document.getElementById('summaryScoreGained');
    this.summaryTotalScore = document.getElementById('summaryTotalScore');
    this.summaryAccuracy = document.getElementById('summaryAccuracy');
    this.unlockedBadgeName = document.getElementById('unlockedBadgeName');
    this.proceedNextLevelBtn = document.getElementById('proceedNextLevelBtn');
    this.backToDossierBtn = document.getElementById('backToDossierBtn');

    // Final Victory Screen
    this.certFinalScore = document.getElementById('certFinalScore');
    this.certAccuracy = document.getElementById('certAccuracy');
    this.certIssueDate = document.getElementById('certIssueDate');
    this.printCertBtn = document.getElementById('printCertBtn');
    this.playAgainBtn = document.getElementById('playAgainBtn');

    // Scratchpad / Calculator Modal
    this.scratchpadModal = document.getElementById('scratchpadModal');
    this.closeScratchpadBtn = document.getElementById('closeScratchpadBtn');
    this.calcDisplay = document.getElementById('calcDisplay');

    // Instructions Modal
    this.instructionsModal = document.getElementById('instructionsModal');
    this.closeInstructionsBtn = document.getElementById('closeInstructionsBtn');
    this.gotItBtn = document.getElementById('gotItBtn');

    // Confetti
    this.canvas = document.getElementById('confettiCanvas');
    this.ctx = this.canvas.getContext('2d');
  }

  initEvents() {
    // Sound FX Toggle
    this.soundToggleBtn.addEventListener('click', () => {
      const enabled = this.sound.toggle();
      this.soundToggleBtn.textContent = enabled ? '🔊' : '🔇';
      this.soundToggleBtn.title = enabled ? 'Sound Effects: ON' : 'Sound Effects: OFF';
      if (enabled) this.sound.playClick();
    });

    // Navigation Buttons
    this.homeNavBtn.addEventListener('click', () => {
      this.sound.playClick();
      this.switchScreen('welcome');
    });

    this.backToCasesBtn.addEventListener('click', () => {
      this.sound.playClick();
      this.switchScreen('welcome');
    });

    this.startGameBtn.addEventListener('click', () => {
      this.sound.playClick();
      // Start the earliest incomplete/unlocked level
      const targetLevel = this.unlockedLevels[2] ? 2 : (this.unlockedLevels[1] ? 1 : 0);
      this.startLevel(0);
    });

    this.levelButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        if (this.unlockedLevels[index]) {
          this.sound.playClick();
          this.startLevel(index);
        }
      });
    });

    // Hint toggle
    this.clueToggleBtn.addEventListener('click', () => {
      this.sound.playClick();
      this.toggleClue();
    });

    // Submit Answer
    this.submitAnswerBtn.addEventListener('click', () => {
      this.submitDeduction();
    });

    // Next Question
    this.nextQuestionBtn.addEventListener('click', () => {
      this.sound.playClick();
      this.handleNextQuestion();
    });

    // Level Complete Screen Actions
    this.proceedNextLevelBtn.addEventListener('click', () => {
      this.sound.playClick();
      const nextLvl = this.currentLevelIndex + 1;
      if (nextLvl < CASE_FILES.length) {
        this.startLevel(nextLvl);
      } else {
        this.showFinalGraduation();
      }
    });

    this.backToDossierBtn.addEventListener('click', () => {
      this.sound.playClick();
      this.switchScreen('welcome');
    });

    // Final Screen Actions
    this.printCertBtn.addEventListener('click', () => {
      this.sound.playClick();
      window.print();
    });

    this.playAgainBtn.addEventListener('click', () => {
      this.sound.playClick();
      this.resetFullGame();
    });

    // Instructions Modal
    this.howToPlayBtn.addEventListener('click', () => {
      this.sound.playClick();
      this.instructionsModal.style.display = 'flex';
    });

    this.closeInstructionsBtn.addEventListener('click', () => {
      this.sound.playClick();
      this.instructionsModal.style.display = 'none';
    });

    this.gotItBtn.addEventListener('click', () => {
      this.sound.playClick();
      this.instructionsModal.style.display = 'none';
    });

    // Scratchpad Calculator
    this.calcToggleBtn.addEventListener('click', () => {
      this.sound.playClick();
      const isVisible = this.scratchpadModal.style.display === 'block';
      this.scratchpadModal.style.display = isVisible ? 'none' : 'block';
    });

    this.closeScratchpadBtn.addEventListener('click', () => {
      this.sound.playClick();
      this.scratchpadModal.style.display = 'none';
    });

    // Calculator buttons
    document.querySelectorAll('.calc-key').forEach(key => {
      key.addEventListener('click', (e) => {
        this.sound.playClick();
        this.handleCalculatorInput(e.target.getAttribute('data-val'));
      });
    });

    // Setup window resize for confetti
    window.addEventListener('resize', () => {
      if (this.canvas) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      }
    });
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // ==========================================================================
  // SCREEN SWITCHING
  // ==========================================================================
  switchScreen(screenKey) {
    Object.keys(this.screens).forEach(key => {
      if (key === screenKey) {
        this.screens[key].classList.add('active');
      } else {
        this.screens[key].classList.remove('active');
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================================================
  // LEVEL START & SETUP
  // ==========================================================================
  startLevel(levelIdx) {
    this.currentLevelIndex = levelIdx;
    this.currentQuestionIndex = 0;
    this.hasAnsweredCurrent = false;
    this.selectedOptionIndex = null;

    const caseData = CASE_FILES[levelIdx];

    // Update Level HUD
    this.hudLevelBadge.textContent = `Case File 0${caseData.level}`;
    this.hudLevelTitle.textContent = caseData.title;
    this.caseBriefingText.textContent = caseData.briefing;

    // Helper text
    this.helperTitle.textContent = caseData.helper.title;
    this.helperText.innerHTML = caseData.helper.text;

    // Render dataset table
    this.renderEvidenceTable(caseData.table);

    // Render current question
    this.renderCurrentQuestion();

    // Switch screen to game
    this.switchScreen('game');
  }

  // Render Table
  renderEvidenceTable(tableData, highlightColIndex = null, highlightRowIndex = null) {
    let html = `<table class="detective-table" id="evidenceDataTable"><thead><tr>`;
    tableData.headers.forEach((header, colIdx) => {
      const isHighlighted = (highlightColIndex !== null && highlightColIndex === colIdx);
      html += `<th class="${isHighlighted ? 'table-col-highlight' : ''}">
        <span class="th-icon">📌</span>${header}
      </th>`;
    });
    html += `</tr></thead><tbody>`;

    tableData.rows.forEach((row, rowIdx) => {
      const isRowHighlighted = (highlightRowIndex !== null && highlightRowIndex === rowIdx);
      html += `<tr class="${isRowHighlighted ? 'table-row-highlight' : ''}">`;
      row.forEach((cell, colIdx) => {
        const isColHighlighted = (highlightColIndex !== null && highlightColIndex === colIdx);
        let cellContent = cell;

        // Custom badges for badge colors or currencies
        if (cell.includes('Blue Badge')) {
          cellContent = `<span class="badge-tag-blue">🔵 Blue Badge</span>`;
        } else if (cell.includes('Red Badge')) {
          cellContent = `<span class="badge-tag-red">🔴 Red Badge</span>`;
        } else if (cell.includes('Green Badge')) {
          cellContent = `<span class="badge-tag-green">🟢 Green Badge</span>`;
        } else if (cell.startsWith('$')) {
          cellContent = `<span class="data-badge-currency">${cell}</span>`;
        } else if (cell.includes('cookies') || cell.includes('sold')) {
          cellContent = `<span class="data-badge-number">${cell}</span>`;
        }

        html += `<td class="${isColHighlighted ? 'table-col-highlight' : ''}">${cellContent}</td>`;
      });
      html += `</tr>`;
    });

    html += `</tbody></table>`;
    this.tableContainer.innerHTML = html;
  }

  // ==========================================================================
  // QUESTION RENDERING & FLOW
  // ==========================================================================
  renderCurrentQuestion() {
    const currentCase = CASE_FILES[this.currentLevelIndex];
    const totalQuestions = currentCase.questions.length;
    const qData = currentCase.questions[this.currentQuestionIndex];

    // Reset interaction state
    this.selectedOptionIndex = null;
    this.hasAnsweredCurrent = false;

    // Update Progress
    const progressPercent = ((this.currentQuestionIndex + 1) / totalQuestions) * 100;
    this.progressBarFill.style.width = `${progressPercent}%`;
    this.questionProgressText.textContent = `Question ${this.currentQuestionIndex + 1} of ${totalQuestions}`;

    // Update Question Card
    this.questionStepPill.textContent = `Case Question ${this.currentQuestionIndex + 1}`;
    this.questionPrompt.textContent = qData.prompt;

    // Reset clue box
    this.clueRevealBox.style.display = 'none';
    this.clueContentText.textContent = qData.clue;
    this.clueToggleBtn.innerHTML = `<span class="clue-bulb">💡</span> Need a Clue?`;

    // Reset feedback card & submit button
    this.feedbackCard.style.display = 'none';
    this.submitAnswerBtn.style.display = 'inline-flex';
    this.submitAnswerBtn.disabled = true;

    // Highlight table column associated with current question
    this.renderEvidenceTable(currentCase.table, qData.highlightCol);

    // Render Options
    const letters = ['A', 'B', 'C', 'D'];
    let optionsHtml = '';
    qData.options.forEach((optText, idx) => {
      optionsHtml += `
        <button class="option-btn" data-index="${idx}" id="optionBtn_${idx}">
          <span class="option-letter">${letters[idx]}</span>
          <span class="option-text">${optText}</span>
          <span class="option-result-icon"></span>
        </button>
      `;
    });
    this.optionsContainer.innerHTML = optionsHtml;

    // Bind option click listeners
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (this.hasAnsweredCurrent) return;
        const optIndex = parseInt(btn.getAttribute('data-index'), 10);
        this.selectOption(optIndex);
      });
    });

    this.updateMiniStats();
  }

  selectOption(index) {
    this.sound.playClick();
    this.selectedOptionIndex = index;

    // Toggle active state on buttons
    document.querySelectorAll('.option-btn').forEach((btn, idx) => {
      if (idx === index) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    // Enable submit
    this.submitAnswerBtn.disabled = false;
  }

  toggleClue() {
    const isVisible = this.clueRevealBox.style.display !== 'none';
    if (isVisible) {
      this.clueRevealBox.style.display = 'none';
      this.clueToggleBtn.innerHTML = `<span class="clue-bulb">💡</span> Need a Clue?`;
    } else {
      this.clueRevealBox.style.display = 'flex';
      this.clueToggleBtn.innerHTML = `<span class="clue-bulb">🕵️</span> Hide Clue`;
      this.hintsUsed++;
      this.hintsUsedCount.textContent = this.hintsUsed;
    }
  }

  // ==========================================================================
  // SUBMIT & EVALUATE
  // ==========================================================================
  submitDeduction() {
    if (this.selectedOptionIndex === null || this.hasAnsweredCurrent) return;

    this.hasAnsweredCurrent = true;
    this.totalQuestionsAnswered++;
    this.submitAnswerBtn.style.display = 'none';

    const currentCase = CASE_FILES[this.currentLevelIndex];
    const qData = currentCase.questions[this.currentQuestionIndex];
    const isCorrect = (this.selectedOptionIndex === qData.correctIndex);

    // Update buttons styling
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach((btn, idx) => {
      btn.disabled = true;
      const iconSpan = btn.querySelector('.option-result-icon');
      if (idx === qData.correctIndex) {
        btn.classList.add('correct');
        iconSpan.textContent = '✅';
      } else if (idx === this.selectedOptionIndex && !isCorrect) {
        btn.classList.add('incorrect');
        iconSpan.textContent = '❌';
      }
    });

    // Score & Feedback
    if (isCorrect) {
      this.sound.playCorrect();
      this.score += 10;
      this.streak++;
      if (this.streak > this.maxStreak) this.maxStreak = this.streak;
      this.totalCorrectAnswers++;

      // Animate score gain bubble
      this.showPointsGain();
      this.updateScoreUI();
      this.updateRankUI();

      // Show positive feedback card
      this.feedbackCard.className = 'feedback-card correct-feedback';
      this.feedbackIcon.textContent = '🎉';
      this.feedbackTitle.textContent = 'Brilliant Deduction, Detective!';
      this.feedbackScoreTag.textContent = '+10 Detective Points ⭐';
      this.feedbackScoreTag.style.color = 'var(--gold-bright)';
      this.feedbackExplanation.innerHTML = `<strong>Case Solved:</strong> ${qData.explanation}`;
    } else {
      this.sound.playWrong();
      this.streak = 0;

      // Show helpful constructive feedback card
      this.feedbackCard.className = 'feedback-card incorrect-feedback';
      this.feedbackIcon.textContent = '🧐';
      this.feedbackTitle.textContent = 'Good Try, Detective! Let\'s Check the Evidence:';
      this.feedbackScoreTag.textContent = 'No Points Gained';
      this.feedbackScoreTag.style.color = '#fda4af';
      this.feedbackExplanation.innerHTML = `<strong>Why this is the answer:</strong> ${qData.explanation}`;
    }

    this.feedbackCard.style.display = 'block';
    this.updateMiniStats();
  }

  showPointsGain() {
    this.pointsBubbleEl.classList.remove('pop-active');
    // Force reflow
    void this.pointsBubbleEl.offsetWidth;
    this.pointsBubbleEl.classList.add('pop-active');
    setTimeout(() => {
      this.pointsBubbleEl.classList.remove('pop-active');
    }, 1200);
  }

  handleNextQuestion() {
    const currentCase = CASE_FILES[this.currentLevelIndex];
    if (this.currentQuestionIndex < currentCase.questions.length - 1) {
      this.currentQuestionIndex++;
      this.renderCurrentQuestion();
    } else {
      // Level completed!
      this.completeLevel();
    }
  }

  // ==========================================================================
  // LEVEL COMPLETION & VICTORY
  // ==========================================================================
  completeLevel() {
    const currentCase = CASE_FILES[this.currentLevelIndex];
    const isLastLevel = (this.currentLevelIndex === CASE_FILES.length - 1);

    // Unlock next level if available
    if (!isLastLevel) {
      this.unlockedLevels[this.currentLevelIndex + 1] = true;
      this.updateLevelCardsUI();
    }

    // Play victory sound & confetti
    this.sound.playFanfare();
    this.launchConfetti();

    // Fill level complete screen details
    this.levelClearTitle.textContent = `Case File 0${currentCase.level} Solved!`;
    this.levelClearDesc.textContent = `Outstanding work! You solved all questions in "${currentCase.title}" and mastered the data clues!`;
    this.summaryScoreGained.textContent = `+${currentCase.questions.length * 10}`;
    this.summaryTotalScore.textContent = this.score;

    const acc = Math.round((this.totalCorrectAnswers / this.totalQuestionsAnswered) * 100) || 100;
    this.summaryAccuracy.textContent = `${acc}%`;

    this.unlockedBadgeName.textContent = currentCase.badgeName;

    if (isLastLevel) {
      this.proceedNextLevelBtn.textContent = 'Graduate as Master Sleuth 🎓';
    } else {
      this.proceedNextLevelBtn.textContent = `Unlock Case File 0${currentCase.level + 1} 🚀`;
    }

    this.switchScreen('levelComplete');
  }

  showFinalGraduation() {
    this.sound.playFanfare();
    this.launchConfetti();

    // Populate certificate
    this.certFinalScore.textContent = this.score;
    const acc = Math.round((this.totalCorrectAnswers / this.totalQuestionsAnswered) * 100) || 100;
    this.certAccuracy.textContent = `${acc}%`;

    // Date
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    this.certIssueDate.textContent = dateStr;

    this.switchScreen('finalVictory');
  }

  resetFullGame() {
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.totalQuestionsAnswered = 0;
    this.totalCorrectAnswers = 0;
    this.hintsUsed = 0;
    this.currentLevelIndex = 0;
    this.currentQuestionIndex = 0;
    this.unlockedLevels = [true, false, false];

    this.updateScoreUI();
    this.updateRankUI();
    this.updateLevelCardsUI();
    this.switchScreen('welcome');
  }

  // ==========================================================================
  // UI HELPERS & STATS
  // ==========================================================================
  updateScoreUI() {
    this.currentScoreEl.textContent = this.score;
  }

  updateRankUI() {
    let currentRank = this.ranks[0].title;
    for (let r of this.ranks) {
      if (this.score >= r.minScore) {
        currentRank = r.title;
      }
    }
    this.playerRankEl.textContent = currentRank;
  }

  updateLevelCardsUI() {
    this.levelCards.forEach((card, idx) => {
      const isUnlocked = this.unlockedLevels[idx];
      const btn = this.levelButtons[idx];

      if (isUnlocked) {
        card.classList.remove('locked');
        card.classList.add('unlocked');
        btn.disabled = false;
        btn.textContent = `Investigate Case 0${idx + 1} →`;
        const badge = card.querySelector('.card-status-badge');
        if (badge) {
          badge.className = 'card-status-badge status-unlocked';
          badge.innerHTML = `<span>🔓 Ready to Investigate</span>`;
        }
      } else {
        card.classList.remove('unlocked');
        card.classList.add('locked');
        btn.disabled = true;
        btn.textContent = 'Locked 🔒';
        const badge = card.querySelector('.card-status-badge');
        if (badge) {
          badge.className = 'card-status-badge status-locked';
          badge.innerHTML = `<span class="lock-icon">🔒</span> Complete Case 0${idx} to Unlock`;
        }
      }
    });
  }

  updateMiniStats() {
    const acc = this.totalQuestionsAnswered > 0
      ? Math.round((this.totalCorrectAnswers / this.totalQuestionsAnswered) * 100)
      : 100;
    this.currentAccuracy.textContent = `${acc}%`;
    this.currentStreak.textContent = this.streak;
    this.hintsUsedCount.textContent = this.hintsUsed;
  }

  // ==========================================================================
  // SCRATCHPAD CALCULATOR LOGIC
  // ==========================================================================
  handleCalculatorInput(val) {
    if (val === 'C') {
      this.calcExpression = '';
      this.calcDisplay.textContent = '0';
    } else if (val === 'DEL') {
      this.calcExpression = this.calcExpression.slice(0, -1);
      this.calcDisplay.textContent = this.calcExpression || '0';
    } else if (val === '=') {
      try {
        // Safe evaluation of mathematical characters only
        const cleanExpr = this.calcExpression.replace(/[^0-9+\-*/().]/g, '');
        if (!cleanExpr) return;
        // eslint-disable-next-line no-eval
        const result = Function(`"use strict"; return (${cleanExpr})`)();
        const formatted = Number.isInteger(result) ? result : Number(result.toFixed(2));
        this.calcDisplay.textContent = formatted;
        this.calcExpression = String(formatted);
      } catch (err) {
        this.calcDisplay.textContent = 'Error';
        this.calcExpression = '';
      }
    } else {
      if (this.calcExpression.length < 24) {
        this.calcExpression += val;
        this.calcDisplay.textContent = this.calcExpression;
      }
    }
  }

  // ==========================================================================
  // CONFETTI CANNON
  // ==========================================================================
  launchConfetti() {
    this.confettiActive = true;
    this.confettiParticles = [];
    const colors = ['#f59e0b', '#38bdf8', '#10b981', '#f43f5e', '#a855f7', '#ffffff'];

    for (let i = 0; i < 90; i++) {
      this.confettiParticles.push({
        x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 200,
        y: window.innerHeight * 0.4,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 12 - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1
      });
    }

    if (!this.confettiLoopRunning) {
      this.confettiLoopRunning = true;
      this.runConfettiLoop();
    }
  }

  runConfettiLoop() {
    if (!this.confettiActive || this.confettiParticles.length === 0) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.confettiLoopRunning = false;
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
      const p = this.confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.009;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      this.ctx.restore();

      if (p.opacity <= 0 || p.y > window.innerHeight) {
        this.confettiParticles.splice(i, 1);
      }
    }

    requestAnimationFrame(() => this.runConfettiLoop());
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.dataDetectiveGame = new DataDetectiveGame();
});
