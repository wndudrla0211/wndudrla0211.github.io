// Game State
let gameState = {
    currentScene: 'start',
    currentStoryIndex: 0,
    relationships: {
        jieun: 30,    // Trust level with ex-girlfriend
        minsu: 70,    // Jealousy level toward Minsu
        confidence: 20 // Self-confidence level
    },
    flags: {
        metMinsu: false,
        talkedAboutPast: false,
        apologized: false,
        trustIssue: true
    }
};

// Story Data
const storyData = {
    start: [
        {
            speaker: "Narrator",
            text: "You recently broke up with Jieun. There were... many reasons, but ultimately it was a relationship that started when you weren't ready.",
            character: "neutral",
            choices: [
                { text: "Look back on what happened", next: "reflection" },
                { text: "Resolve to make a new start", next: "newStart" }
            ]
        }
    ],
    
    reflection: [
        {
            speaker: "Protagonist",
            text: "The reasons I broke up with Jieun... it wasn't just one thing. I got angry easily, sometimes said harsh words. And most of all, I couldn't trust her. Especially when her ex-boyfriend Minsu came up...",
            character: "neutral",
            choices: [
                { text: "I was too immature", next: "immature", effect: { confidence: -3, jieun: +3 } },
                { text: "But my feelings were understandable", next: "understandMyself", effect: { confidence: +2, minsu: +5 } }
            ]
        }
    ],
    
    newStart: [
        {
            speaker: "Protagonist", 
            text: "The past is the past. Back then, I wasn't ready for a relationship. I didn't have the skills, confidence, or even know how to trust. Now I need to change.",
            character: "neutral",
            choices: [
                { text: "I want to show Jieun how I've changed", next: "showChange" },
                { text: "I need to change myself first", next: "selfImprovement" }
            ]
        }
    ],
    
    immature: [
        {
            speaker: "Protagonist",
            text: "I was really immature. Every time I got jealous, I'd yell, and I even said hurtful things to Jieun. Saying things like 'It's your fault this happened'... looking back, I was pathetic.",
            character: "neutral",
            choices: [
                { text: "I genuinely regret it", next: "genuineRemorse", effect: { jieun: +8, confidence: -5 } },
                { text: "But I couldn't help it at the time", next: "defensiveThinking", effect: { confidence: +3, minsu: +8 } }
            ]
        }
    ],
    
    understandMyself: [
        {
            speaker: "Protagonist",
            text: "Of course I was wrong, but... I was really anxious back then. My abilities weren't great, I had no confidence, and seeing Jieun hanging out with people better than me...",
            character: "neutral",
            choices: [
                { text: "My inferiority complex was the problem", next: "inferiority", effect: { confidence: -8, jieun: +5 } },
                { text: "Jieun didn't understand my feelings", next: "misunderstood", effect: { jieun: -5, minsu: +10 } }
            ]
        }
    ],
    
    selfImprovement: [
        {
            speaker: "Protagonist",
            text: "Right, I need to change myself first. My habit of getting angry, my suspicious nature, and most of all, my self-confidence...",
            character: "neutral",
            choices: [
                { text: "Start systematic self-improvement", next: "systematicImprovement" },
                { text: "First understand why this happened", next: "rootCauseAnalysis" }
            ]
        }
    ],
    
    genuineRemorse: [
        {
            speaker: "Protagonist",
            text: "I really was wrong. The things I said to Jieun... 'This is happening because you keep meeting Minsu', 'Are you ignoring me?' How hurt she must have been.",
            character: "neutral",
            choices: [
                { text: "I want to sincerely apologize to Jieun", next: "wantApology", effect: { jieun: +12 } },
                { text: "I caused irreversible damage", next: "irreversibleHurt", effect: { confidence: -10, jieun: +5 } }
            ]
        }
    ],
    
    defensiveThinking: [
        {
            speaker: "Protagonist",
            text: "But I really couldn't stand it back then. Every time Jieun talked about Minsu, whenever she laughed with other guy friends... I wondered what I even was.",
            character: "neutral",
            choices: [
                { text: "I should have asked for understanding of my situation", next: "seekUnderstanding", effect: { minsu: +8 } },
                { text: "In the end, it was my problem", next: "ownProblem", effect: { confidence: -5, jieun: +5 } }
            ]
        }
    ],
    
    inferiority: [
        {
            speaker: "Protagonist",
            text: "Right, it was my inferiority complex. At work, among friends, I always felt behind... Dating someone like Jieun in that state was probably too much.",
            character: "neutral",
            choices: [
                { text: "Let me build skills and gain confidence", next: "buildConfidence", effect: { confidence: +10 } },
                { text: "I guess this is just who I am", next: "acceptWeakness", effect: { confidence: -8 } }
            ]
        }
    ],
    
    misunderstood: [
        {
            speaker: "Protagonist",
            text: "I wish Jieun had understood why I acted that way... I was trying too, but I felt unappreciated.",
            character: "neutral",
            choices: [
                { text: "But that's just an excuse", next: "noExcuse", effect: { jieun: +8, confidence: +3 } },
                { text: "Maybe we just weren't compatible", next: "incompatible", effect: { confidence: +2 } }
            ]
        }
    ],
    
    systematicImprovement: [
        {
            speaker: "Protagonist",
            text: "Let me exercise, read books, learn new skills. And learn to control my anger too... Become someone qualified to be in a relationship.",
            character: "neutral",
            choices: [
                { text: "Change through consistent effort", next: "consistentEffort", effect: { confidence: +15, minsu: -8 } },
                { text: "I want to show this change to Jieun", next: "showProgress", effect: { jieun: +8 } }
            ]
        }
    ],
    
    rootCauseAnalysis: [
        {
            speaker: "Protagonist",
            text: "I've felt insufficient since childhood. Grades, appearance, abilities... Jieun was my first girlfriend in that state, and I was probably too scared of losing her.",
            character: "neutral",
            choices: [
                { text: "Now let me overcome that fear", next: "overcomeFear", effect: { confidence: +12, minsu: -10 } },
                { text: "I guess that's just my limit", next: "acceptLimitation", effect: { confidence: -5 } }
            ]
        }
    ],
    
    contactJieun: [
        {
            speaker: "Narrator",
            text: "You gather courage and send a message to Jieun. 'Hi, it's me. Could we meet when you have time?' After a while, a reply comes.",
            character: "jieun",
            choices: [
                { text: "Check the message", next: "jieunReply" }
            ]
        }
    ],
    
    jieunReply: [
        {
            speaker: "Jieun",
            text: "Hi... I was surprised to hear from you suddenly. What's up? Considering why we broke up... should we really meet?",
            character: "jieun",
            choices: [
                { text: "Say you want to sincerely apologize", next: "wantToApologize", effect: { jieun: +8 } },
                { text: "Say you just wanted to check how she's doing", next: "casualContact", effect: { confidence: -3 } }
            ]
        }
    ],
    
    wantToApologize: [
        {
            speaker: "Jieun",
            text: "Apologize...? Do you remember the things you did, the words you said? 'Why do you keep contacting Minsu?', 'You like him better than me, don't you?'... It was really hard.",
            character: "jieun",
            choices: [
                { text: "'I'm really sorry. I was really wrong'", next: "sincereApology", effect: { jieun: +15, minsu: -10 } },
                { text: "'I was really anxious back then...'", next: "explainAnxiety", effect: { minsu: +5 } }
            ]
        }
    ],
    
    sincereApology: [
        {
            speaker: "Jieun",
            text: "...You seem to have changed a lot. Before, you would have started with excuses. Okay, let's meet and talk. But don't get your hopes up.",
            character: "jieun",
            choices: [
                { text: "Thank you, really thank you", next: "grateful", effect: { jieun: +10 } },
                { text: "I won't get my hopes up, I just want to apologize", next: "justApology", effect: { jieun: +12, confidence: +5 } }
            ]
        }
    ],
    
    explainAnxiety: [
        {
            speaker: "Jieun",
            text: "You're talking like that again... I understand your anxiety. But that can't be a reason to get angry at me and be suspicious.",
            character: "jieun",
            choices: [
                { text: "'You're right, it was an excuse. I'm really sorry'", next: "admitWrong", effect: { jieun: +8, minsu: -5 } },
                { text: "'But you didn't understand my feelings'", next: "blameHer", effect: { jieun: -15, minsu: +15 } }
            ]
        }
    ],
    
    buildConfidence: [
        {
            speaker: "Protagonist",
            text: "Let me build skills and gain confidence. Exercise, get certifications, learn new skills... I won't be inferior to anyone anymore.",
            character: "neutral",
            choices: [
                { text: "Start systematic self-improvement", next: "systematicImprovement" },
                { text: "I want to show this change to Jieun", next: "showChange" }
            ]
        }
    ],
    
    acceptWeakness: [
        {
            speaker: "Protagonist",
            text: "I guess this is just who I am... No abilities, no confidence. And I tried to date someone like Jieun in that state...",
            character: "neutral",
            choices: [
                { text: "But I won't give up", next: "dontGiveUp", effect: { confidence: +5 } },
                { text: "I guess I wasn't enough", next: "feelInsufficient", effect: { confidence: -10 } }
            ]
        }
    ],
    
    seekUnderstanding: [
        {
            speaker: "Protagonist",
            text: "I should have asked for understanding of my situation... That I was trying too, that I was anxious too. But back then I only got angry.",
            character: "neutral",
            choices: [
                { text: "Communication was the problem", next: "communicationIssue", effect: { jieun: +5 } },
                { text: "But that's also my fault", next: "myFaultToo", effect: { confidence: -3, jieun: +7 } }
            ]
        }
    ],
    
    wantApology: [
        {
            speaker: "Protagonist",
            text: "I really want to apologize to Jieun. Not with words, but with my changed self. I want to show that I've really reflected.",
            character: "neutral",
            choices: [
                { text: "Contact Jieun", next: "contactJieun" },
                { text: "Change first, then contact her", next: "changeThenContact", effect: { confidence: +8 } }
            ]
        }
    ],
    
    showProgress: [
        {
            speaker: "Protagonist",
            text: "I want to show Jieun how I've changed. Maybe then... No, I shouldn't have expectations. I just want to show that I've reflected on my mistakes.",
            character: "neutral",
            choices: [
                { text: "Focus on self-improvement without expectations", next: "pureImprovement", effect: { confidence: +10 } },
                { text: "Still, I hope she might see the change", next: "hesitation", effect: { jieun: +3, confidence: -2 } }
            ]
        }
    ],
    
    pureImprovement: [
        {
            speaker: "Protagonist",
            text: "Right, I should improve just for myself. Not to get Jieun back, but to become a better person. That's real growth.",
            character: "neutral",
            choices: [
                { text: "Continue steady self-improvement", next: "moreImprovement", effect: { confidence: +12 } },
                { text: "Maybe it's time to contact Jieun", next: "readyToContact", effect: { jieun: +8 } }
            ]
        }
    ],
    
    hesitation: [
        {
            speaker: "Protagonist",
            text: "I keep hoping... Maybe if I change, if I become better, there might be another chance. But isn't this just another selfish thought?",
            character: "neutral",
            choices: [
                { text: "Focus on self-improvement first", next: "selfFirst", effect: { confidence: +8 } },
                { text: "Contact Jieun and apologize", next: "contactJieun" }
            ]
        }
    ],
    
    moreImprovement: [
        {
            speaker: "Protagonist",
            text: "I've been consistently exercising, reading, and learning anger management. I feel like I'm becoming someone I can be proud of. Maybe it's enough now.",
            character: "neutral",
            choices: [
                { text: "I need more time", next: "needMoreTime", effect: { confidence: +5 } },
                { text: "Now I can confidently contact Jieun", next: "confidentContact", effect: { confidence: +10, jieun: +5 } }
            ]
        }
    ],
    
    needMoreTime: [
        {
            speaker: "Protagonist",
            text: "Not yet. I need more time to truly change. Change that comes from within, not just on the surface.",
            character: "neutral",
            choices: [
                { text: "Continue deep self-reflection", next: "selfReflection", effect: { confidence: +8 } },
                { text: "Maybe I've changed enough", next: "enoughChange", effect: { jieun: +5 } }
            ]
        }
    ],
    
    selfReflection: [
        {
            speaker: "Protagonist",
            text: "Why did I become so jealous? Why couldn't I trust? The root was my lack of self-worth. I need to fix this fundamental problem.",
            character: "neutral",
            choices: [
                { text: "Work on building self-worth", next: "buildSelfWorth", effect: { confidence: +15 } },
                { text: "Accept my limitations", next: "acceptMyself", effect: { confidence: +5 } }
            ]
        }
    ],
    
    buildSelfWorth: [
        {
            speaker: "Protagonist",
            text: "I'm valuable too. I have my own strengths, my own charm. I don't need to compare myself to others or feel inferior.",
            character: "neutral",
            choices: [
                { text: "I'm ready to face the world confidently", next: "newConfidence", effect: { confidence: +20, minsu: -20 } },
                { text: "Now I can love someone properly", next: "readyForLove", effect: { confidence: +10, jieun: +10 } }
            ]
        }
    ],
    
    newConfidence: [
        {
            speaker: "Protagonist",
            text: "I feel completely different now. I'm confident in myself, and I think I can trust others too. This is the real me.",
            character: "neutral",
            choices: [
                { text: "Start a new relationship", next: "newRelationship" },
                { text: "Contact Jieun one more time", next: "finalContact", effect: { jieun: +15 } }
            ]
        }
    ],
    
    readyForLove: [
        {
            speaker: "Protagonist",
            text: "Now I know what real love is. It's not possessing someone, but trusting and respecting them. I want to apologize to Jieun with this understanding.",
            character: "neutral",
            choices: [
                { text: "Contact Jieun", next: "contactJieun" },
                { text: "Wait a little longer", next: "waitMore", effect: { confidence: +3 } }
            ]
        }
    ],
    
    breakPattern: [
        {
            speaker: "Protagonist",
            text: "I need to break the old patterns. No more jealousy, no more anger, no more blaming others. I take responsibility for everything.",
            character: "neutral",
            choices: [
                { text: "Live as a completely new person", next: "newSelf", effect: { confidence: +18, minsu: -15 } },
                { text: "Apply this change to my relationship with Jieun", next: "applyToJieun", effect: { jieun: +12 } }
            ]
        }
    ],
    
    newSelf: [
        {
            speaker: "Protagonist",
            text: "I'm a new person now. Someone who can love properly, trust properly, and take responsibility for their emotions. I'm proud of this change.",
            character: "neutral",
            choices: [
                { text: "This is my true growth", next: "trueGrowth" },
                { text: "I want to share this growth with Jieun", next: "shareGrowth", effect: { jieun: +10 } }
            ]
        }
    ],
    
    confidentContact: [
        {
            speaker: "Protagonist",
            text: "Now I can confidently contact Jieun. Not to get her back, but to genuinely apologize and show my growth.",
            character: "neutral",
            choices: [
                { text: "Send her a message", next: "contactJieun" },
                { text: "Think a little more", next: "thinkMore", effect: { confidence: +2 } }
            ]
        }
    ],
    
    admitWrong: [
        {
            speaker: "Jieun",
            text: "...At least you're not making excuses now. That's different from before. Okay, let's meet once. I want to see how much you've really changed.",
            character: "jieun",
            choices: [
                { text: "Thank you for giving me this chance", next: "grateful2", effect: { jieun: +10 } },
                { text: "I'll show you I've really changed", next: "showChange2", effect: { confidence: +5, jieun: +8 } }
            ]
        }
    ],
    
    blameHer: [
        {
            speaker: "Jieun",
            text: "See? You haven't changed at all. You're still blaming me. I was right not to expect anything. Don't contact me again.",
            character: "jieun",
            choices: [
                { text: "Wait, I didn't mean it like that", next: "tryToExplain", effect: { jieun: -10 } },
                { text: "...You're right. I'm sorry", next: "finalApology", effect: { jieun: +3, confidence: -8 } }
            ]
        }
    ],
    
    grateful2: [
        {
            speaker: "Protagonist",
            text: "Thank you, Jieun. I know this isn't easy for you. I won't waste this opportunity.",
            character: "jieun",
            choices: [
                { text: "Prepare sincerely for the meeting", next: "prepareWell", effect: { confidence: +8, jieun: +5 } },
                { text: "Just apologize simply", next: "simpleApology", effect: { jieun: +10 } }
            ]
        }
    ],
    
    showChange2: [
        {
            speaker: "Jieun",
            text: "Don't just say it, show me with actions. I've heard those words too many times before.",
            character: "jieun",
            choices: [
                { text: "I'll prove it with actions, not words", next: "proveWithActions", effect: { jieun: +12 } },
                { text: "I understand your caution", next: "understandCaution", effect: { jieun: +8 } }
            ]
        }
    ],
    
    neverAgain: [
        {
            speaker: "Protagonist",
            text: "I'll never make the same mistake again. I'll never hurt someone I care about with jealousy and suspicion again.",
            character: "neutral",
            choices: [
                { text: "This is my firm resolution", next: "firmResolution", effect: { confidence: +15, minsu: -20 } },
                { text: "I want to keep this promise to Jieun", next: "promiseToJieun", effect: { jieun: +15 } }
            ]
        }
    ],
    
    timeHeals: [
        {
            speaker: "Protagonist",
            text: "Time has passed, and I've healed a lot. I think I can face my past mistakes calmly now.",
            character: "neutral",
            choices: [
                { text: "Contact Jieun after organizing my thoughts", next: "organizedThoughts", effect: { confidence: +10 } },
                { text: "Some wounds take more time", next: "moreTimeNeeded", effect: { confidence: +5 } }
            ]
        }
    ],
    
    mustApologize: [
        {
            speaker: "Protagonist",
            text: "I must apologize. It's not for me, but for Jieun. She deserves an apology.",
            character: "neutral",
            choices: [
                { text: "Contact her right away", next: "contactJieun" },
                { text: "Prepare the apology carefully", next: "prepareApology", effect: { jieun: +8 } }
            ]
        }
    ],
    
    sincereApology2: [
        {
            speaker: "Protagonist",
            text: "Jieun, I was really wrong. I hurt you with my immaturity, jealousy, and selfishness. I sincerely apologize.",
            character: "jieun",
            choices: [
                { text: "I won't make excuses", next: "noExcuses", effect: { jieun: +12 } },
                { text: "I've learned what real love is", next: "learnedLove", effect: { jieun: +10, confidence: +8 } }
            ]
        }
    ],
    
    loneReflection: [
        {
            speaker: "Protagonist",
            text: "Maybe it's better to spend time alone reflecting. I need to fully understand myself before involving others.",
            character: "neutral",
            choices: [
                { text: "Continue deep self-reflection", next: "deepReflection", effect: { confidence: +10 } },
                { text: "I've reflected enough", next: "enoughReflection", effect: { confidence: +5 } }
            ]
        }
    ],
    
    deepReflection: [
        {
            speaker: "Protagonist",
            text: "Why was I so afraid? Why couldn't I trust? I'm starting to understand the roots of my problems.",
            character: "neutral",
            choices: [
                { text: "Work on solving fundamental problems", next: "solveFundamental", effect: { confidence: +15 } },
                { text: "Some problems can't be completely solved", next: "acceptLimits", effect: { confidence: +8 } }
            ]
        }
    ],
    
    growthJourney: [
        {
            speaker: "Protagonist",
            text: "This has been a journey of growth. I'm grateful for all the experiences, even the painful ones.",
            character: "neutral",
            choices: [
                { text: "I'm ready for new relationships", next: "readyForNew" },
                { text: "I want to share this growth with Jieun", next: "shareWithJieun", effect: { jieun: +10 } }
            ]
        }
    ]
};

// Endings Data
const endings = {
    // Happy Endings
    happyEnding: {
        title: "True Love",
        text: "You and Jieun met again after a long time. Through sincere apologies and genuine change, you learned what real love is. You decided to start over, this time as mature adults. This time, you trust each other and respect each other. This is what true love looks like."
    },
    
    reconciliation: {
        title: "Reconciliation",
        text: "Jieun accepted your sincere apology. Although you didn't get back together, you became friends who understand each other. You learned that sometimes love means letting go and respecting the other person's choice."
    },
    
    friendship: {
        title: "Precious Friendship", 
        text: "You and Jieun are friends now. You apologized for your past mistakes, and she forgave you. Although romance is no longer possible, you built a mature friendship. Sometimes this is more valuable than love."
    },
    
    growth: {
        title: "Personal Growth",
        text: "Through this experience, you grew tremendously. You learned to control your emotions, trust others, and love yourself. Whether or not you reunite with Jieun, you've become someone worthy of love."
    },
    
    newBeginning: {
        title: "New Beginning",
        text: "You decided to start anew. After fully understanding your past mistakes and changing, you're ready for new relationships. The growth you've achieved will help you love someone properly."
    },
    
    // Neutral Endings
    understanding: {
        title: "Mutual Understanding",
        text: "You and Jieun talked about the past and came to understand each other. You both acknowledged your respective faults and forgave each other. This conversation became closure for both of you."
    },
    
    closure: {
        title: "Closure",
        text: "Through conversations with Jieun, you achieved closure about the past. You can now move forward without regrets. Sometimes ending clearly is also a form of love."
    },
    
    respectfulDistance: {
        title: "Respectful Distance",
        text: "You and Jieun decided to maintain a respectful distance. You acknowledged each other's growth but chose different paths. This is also a mature choice."
    },
    
    selfAcceptance: {
        title: "Self-Acceptance",
        text: "You learned to accept yourself as you are. You can't be perfect, but that's okay. With this self-acceptance, you're ready to build healthier relationships."
    },
    
    innerPeace: {
        title: "Inner Peace",
        text: "You found inner peace. You no longer blame yourself or others for the past. You're grateful for all experiences and ready for the future."
    },
    
    // Sad Endings
    noResponse: {
        title: "No Response",
        text: "Jieun didn't respond to your message. You realized that some relationships are truly over. You decided to respect her choice and work on your own growth."
    },
    
    rejection: {
        title: "Rejection",
        text: "Jieun clearly rejected your attempt to apologize. You realized that the hurt you caused was too deep. You decided to respect her decision and live with the consequences of your actions."
    },
    
    tooLate: {
        title: "Too Late",
        text: "You realized it was too late to fix things with Jieun. But this realization helped you understand the importance of treating the people you love well. You won't make the same mistake again."
    },
    
    regret: {
        title: "Deep Regret",
        text: "You're left with deep regret about your relationship with Jieun. But through this regret, you learned what real love is. This painful lesson will make you a better person."
    },
    
    acceptance: {
        title: "Painful Acceptance",
        text: "You accepted that you can't undo the past. You learned to live with the consequences of your actions. This acceptance is painful but necessary for growth."
    },
    
    // Repetition/No Growth Endings
    noChange: {
        title: "No Change",
        text: "You haven't really changed. You still blame others and make excuses. Until you truly reflect on yourself, you'll keep repeating the same mistakes."
    },
    
    excuses: {
        title: "Always Excuses",
        text: "You kept making excuses instead of taking responsibility for your actions. True growth begins with honest self-reflection."
    },
    
    blame: {
        title: "Blaming Others",
        text: "You still blame Jieun and others. Until you take responsibility for your own emotions and actions, nothing will change."
    },
    
    repetition: {
        title: "Repeating Mistakes",
        text: "You're repeating the same patterns of behavior. Jealousy, suspicion, anger - these haven't changed. You need to face yourself more honestly."
    },
    
    denial: {
        title: "In Denial",
        text: "You're denying your own problems and living in fantasy. Reality is painful, but facing it is the first step to growth."
    },
    
    // Special Endings  
    wisdom: {
        title: "Gained Wisdom",
        text: "Through this painful experience, you gained wisdom about love and relationships. You understand that love isn't about possession but about trust and respect. You'll use this wisdom to love better in the future."
    },
    
    maturity: {
        title: "Emotional Maturity",
        text: "You've achieved emotional maturity. You can now control your emotions, trust others, and love yourself. This maturity will be the foundation for all your future relationships."
    },
    
    newSelf: {
        title: "A New Self",
        text: "You've become a completely new person. The old you who was jealous and suspicious is gone. You're now someone who can love and trust. This transformation was painful but necessary."
    }
};

// DOM Elements
const elements = {
    startScreen: document.getElementById('startScreen'),
    gameScreen: document.querySelector('.game-screen'),
    characterImage: document.getElementById('characterImage'),
    speakerName: document.getElementById('speakerName'),
    dialogueText: document.getElementById('dialogueText'),
    choiceContainer: document.getElementById('choiceContainer'),
    sidePanel: document.getElementById('sidePanel'),
    menuOverlay: document.getElementById('menuOverlay'),
    saveOverlay: document.getElementById('saveOverlay'),
    endingScreen: document.getElementById('endingScreen')
};

// Initialize Game
function initGame() {
    // Set up event listeners
    document.getElementById('newGameBtn').addEventListener('click', startNewGame);
    document.getElementById('continueBtn').addEventListener('click', continueGame);
    document.getElementById('creditsBtn').addEventListener('click', showCredits);
    
    document.getElementById('menuBtn').addEventListener('click', toggleMenu);
    document.getElementById('saveBtn').addEventListener('click', showSaveScreen);
    document.getElementById('loadBtn').addEventListener('click', showLoadScreen);
    
    document.getElementById('resumeBtn').addEventListener('click', toggleMenu);
    document.getElementById('titleBtn').addEventListener('click', goToTitle);
    document.getElementById('closeSaveBtn').addEventListener('click', closeSaveScreen);
    
    document.getElementById('restartBtn').addEventListener('click', startNewGame);
    
    // Settings button disabled
    document.getElementById('settingsBtn').addEventListener('click', function() {
        alert('Settings feature is still under development.');
    });
    
    // Text box click to advance
    document.querySelector('.text-box').addEventListener('click', nextDialogue);
    
    // Side panel toggle (double-click on menu button)
    document.getElementById('menuBtn').addEventListener('dblclick', toggleSidePanel);
}

function startNewGame() {
    gameState.currentScene = 'start';
    gameState.currentStoryIndex = 0;
    gameState.relationships = { jieun: 30, minsu: 70, confidence: 20 };
    gameState.flags = { metMinsu: false, talkedAboutPast: false, apologized: false, trustIssue: true };
    
    elements.startScreen.style.display = 'none';
    elements.endingScreen.style.display = 'none';
    elements.gameScreen.style.display = 'flex';
    document.querySelector('.game-header').style.display = 'flex';
    
    updateRelationshipBars();
    showCurrentStory();
}

function continueGame() {
    const savedGame = localStorage.getItem('datingSim_save');
    if (savedGame) {
        gameState = JSON.parse(savedGame);
        startNewGame();
    } else {
        alert('No saved game found.');
    }
}

function showCredits() {
    alert('Creator: Ju-Young Kim (Alex)\nTheme: Immature Love\n\nA visual novel game that deals with the complexity and growth of realistic relationships.');
}

function showCurrentStory() {
    const currentStory = storyData[gameState.currentScene];
    if (!currentStory || gameState.currentStoryIndex >= currentStory.length) {
        console.error('Story data error');
        return;
    }
    
    const scene = currentStory[gameState.currentStoryIndex];
    
    // Change character image
    elements.characterImage.className = `character-image ${scene.character}`;
    elements.characterImage.textContent = getCharacterEmoji(scene.character);
    
    // Display dialogue text
    elements.speakerName.textContent = scene.speaker;
    typeText(scene.text);
    
    // Show choices
    if (scene.choices) {
        setTimeout(() => {
            showChoices(scene.choices);
        }, scene.text.length * 30 + 500);
    }
    
    // Add animation
    elements.characterImage.classList.add('fade-in');
    setTimeout(() => elements.characterImage.classList.remove('fade-in'), 500);
}

function getCharacterEmoji(character) {
    const emojis = {
        'jieun': '👩',
        'minsu': '👨', 
        'neutral': '🤔',
        'happy': '😊',
        'sad': '😢'
    };
    return emojis[character] || '😐';
}

function typeText(text, speed = 30) {
    elements.dialogueText.textContent = '';
    let i = 0;
    
    const typeInterval = setInterval(() => {
        elements.dialogueText.textContent += text[i];
        i++;
        
        if (i >= text.length) {
            clearInterval(typeInterval);
        }
    }, speed);
}

function showChoices(choices) {
    elements.choiceContainer.innerHTML = '';
    
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn slide-up';
        button.textContent = choice.text;
        button.style.animationDelay = `${index * 0.1}s`;
        
        button.addEventListener('click', () => {
            selectChoice(choice);
        });
        
        elements.choiceContainer.appendChild(button);
    });
}

function selectChoice(choice) {
    // Apply effects
    if (choice.effect) {
        Object.keys(choice.effect).forEach(key => {
            if (gameState.relationships[key] !== undefined) {
                gameState.relationships[key] += choice.effect[key];
                gameState.relationships[key] = Math.max(0, Math.min(100, gameState.relationships[key]));
            }
        });
        updateRelationshipBars();
    }
    
    // Move to next scene
    if (choice.next) {
        if (endings[choice.next]) {
            showEnding(choice.next);
        } else {
            gameState.currentScene = choice.next;
            gameState.currentStoryIndex = 0;
            elements.choiceContainer.innerHTML = '';
            setTimeout(() => {
                showCurrentStory();
            }, 500);
        }
    }
}

function nextDialogue() {
    if (elements.choiceContainer.children.length > 0) {
        return; // Ignore click if choices are present
    }
    
    const currentStory = storyData[gameState.currentScene];
    if (currentStory && gameState.currentStoryIndex < currentStory.length - 1) {
        gameState.currentStoryIndex++;
        showCurrentStory();
    }
}

function updateRelationshipBars() {
    document.getElementById('jieunsBar').style.width = gameState.relationships.jieun + '%';
    document.getElementById('jieunScore').textContent = gameState.relationships.jieun + '/100';
    
    document.getElementById('minsuBar').style.width = gameState.relationships.minsu + '%';
    document.getElementById('minsuScore').textContent = 'Jealousy: ' + gameState.relationships.minsu;
    
    document.getElementById('confidenceBar').style.width = gameState.relationships.confidence + '%';
    document.getElementById('confidenceScore').textContent = gameState.relationships.confidence + '/100';
}

function toggleSidePanel() {
    elements.sidePanel.classList.toggle('show');
}

function toggleMenu() {
    const isVisible = elements.menuOverlay.style.display === 'flex';
    elements.menuOverlay.style.display = isVisible ? 'none' : 'flex';
}

function showSaveScreen() {
    document.getElementById('saveTitle').textContent = 'Save Game';
    elements.saveOverlay.style.display = 'flex';
    
    // Save slot event listeners
    document.querySelectorAll('.save-slot').forEach(slot => {
        slot.onclick = () => saveGame(slot.dataset.slot);
    });
}

function showLoadScreen() {
    document.getElementById('saveTitle').textContent = 'Load Game';
    elements.saveOverlay.style.display = 'flex';
    
    // Load slot event listeners
    document.querySelectorAll('.save-slot').forEach(slot => {
        slot.onclick = () => loadGame(slot.dataset.slot);
    });
}

function saveGame(slotNumber) {
    const saveData = {
        ...gameState,
        saveTime: new Date().toLocaleString()
    };
    
    localStorage.setItem(`datingSim_save_${slotNumber}`, JSON.stringify(saveData));
    localStorage.setItem('datingSim_save', JSON.stringify(saveData)); // Default save
    
    // Update slot info
    const slot = document.querySelector(`[data-slot="${slotNumber}"]`);
    slot.querySelector('.slot-info').textContent = saveData.saveTime;
    
    alert('Game saved!');
    closeSaveScreen();
}

function loadGame(slotNumber) {
    const savedData = localStorage.getItem(`datingSim_save_${slotNumber}`);
    if (savedData) {
        gameState = JSON.parse(savedData);
        startNewGame();
        closeSaveScreen();
    } else {
        alert('No saved data found.');
    }
}

function closeSaveScreen() {
    elements.saveOverlay.style.display = 'none';
}

function goToTitle() {
    elements.startScreen.style.display = 'flex';
    elements.gameScreen.style.display = 'none';
    document.querySelector('.game-header').style.display = 'none';
    elements.menuOverlay.style.display = 'none';
    elements.endingScreen.style.display = 'none';
}

function showEnding(endingKey) {
    const ending = endings[endingKey];
    if (!ending) return;
    
    document.getElementById('endingTitle').textContent = ending.title;
    document.getElementById('endingText').textContent = ending.text;
    
    elements.endingScreen.style.display = 'flex';
}

// Touch event optimization (mobile)
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, true);
}

// Start game
document.addEventListener('DOMContentLoaded', initGame); 