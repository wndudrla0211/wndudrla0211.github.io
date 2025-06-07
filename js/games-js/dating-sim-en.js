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
    
    irreversibleHurt: [
        {
            speaker: "Protagonist",
            text: "I caused irreversible damage. The things I said back then, my actions... Yelling 'This is happening because you act that way'...",
            character: "neutral",
            choices: [
                { text: "But I still need to apologize", next: "mustApologize", effect: { jieun: +5 } },
                { text: "I was so pathetic", next: "selfDisgust", effect: { confidence: -8 } }
            ]
        }
    ],
    
    // Additional missing story scenes
    dontGiveUp: [
        {
            speaker: "Protagonist",
            text: "But I won't give up. Even though I'm lacking now, I can change through effort. I'll become someone qualified for relationships.",
            character: "neutral",
            choices: [
                { text: "Resolve to make a new beginning", next: "newBeginning" }
            ]
        }
    ],
    
    feelInsufficient: [
        {
            speaker: "Protagonist",
            text: "I guess I really wasn't enough... Jieun was too good a person, and I was... just lacking.",
            character: "neutral",
            choices: [
                { text: "Accept it and decide to live alone", next: "acceptAlone" }
            ]
        }
    ],
    
    communicationIssue: [
        {
            speaker: "Protagonist",
            text: "Now I should communicate properly. Express my anxiety honestly instead of through anger...",
            character: "neutral",
            choices: [
                { text: "Contact Jieun to request a conversation", next: "contactJieun" }
            ]
        }
    ],
    
    myFaultToo: [
        {
            speaker: "Protagonist",
            text: "But that's also my fault. I should have said 'I'm anxious right now, please help me' instead of getting angry.",
            character: "neutral",
            choices: [
                { text: "Communicate properly next time", next: "communicationIssue" }
            ]
        }
    ],
    
    changeThenContact: [
        {
            speaker: "Protagonist",
            text: "Let me change first, then contact her. When I can confidently say I've become a different person...",
            character: "neutral",
            choices: [
                { text: "Continue systematic self-improvement", next: "systematicImprovement" }
            ]
        }
    ],
    
    selfFirst: [
        {
            speaker: "Protagonist",
            text: "Right, myself first. I need to become someone I can respect before thinking about others.",
            character: "neutral",
            choices: [
                { text: "Focus completely on self-improvement", next: "moreImprovement" }
            ]
        }
    ],
    
    readyToContact: [
        {
            speaker: "Protagonist",
            text: "Maybe it's time to contact Jieun. Not with expectations, but just to apologize sincerely.",
            character: "neutral",
            choices: [
                { text: "Send her a message", next: "contactJieun" }
            ]
        }
    ],
    
    enoughChange: [
        {
            speaker: "Protagonist",
            text: "Maybe I've changed enough. I've learned to control my emotions and trust others. It's time to take action.",
            character: "neutral",
            choices: [
                { text: "Contact Jieun", next: "contactJieun" }
            ]
        }
    ],
    
    acceptMyself: [
        {
            speaker: "Protagonist",
            text: "I've learned to accept myself as I am. I'm not perfect, but that's okay. With this self-acceptance, I can build healthier relationships.",
            character: "neutral",
            choices: [
                { text: "I'm ready for new relationships", next: "newRelationship" },
                { text: "Contact Jieun with this acceptance", next: "contactJieun" }
            ]
        }
    ],
    
    waitMore: [
        {
            speaker: "Protagonist",
            text: "Let me wait a little longer. I want to be more certain of my change before meeting her.",
            character: "neutral",
            choices: [
                { text: "Continue self-reflection", next: "selfReflection" }
            ]
        }
    ],
    
    applyToJieun: [
        {
            speaker: "Protagonist",
            text: "I want to apply this change to my relationship with Jieun. Show her that I've really become a different person.",
            character: "neutral",
            choices: [
                { text: "Contact Jieun", next: "contactJieun" }
            ]
        }
    ],
    
    thinkMore: [
        {
            speaker: "Protagonist",
            text: "Let me think a little more. This is an important decision that could affect both our lives.",
            character: "neutral",
            choices: [
                { text: "After careful consideration, contact her", next: "contactJieun" }
            ]
        }
    ],
    
    tryToExplain: [
        {
            speaker: "Jieun",
            text: "I don't want to hear excuses anymore. I'm tired. Please don't contact me again.",
            character: "jieun",
            choices: [
                { text: "Accept her decision", next: "acceptDecision" }
            ]
        }
    ],
    
    finalApology: [
        {
            speaker: "Jieun",
            text: "...At least you acknowledged it. Maybe that's something. But it's still too late.",
            character: "jieun",
            choices: [
                { text: "Accept that it's too late", next: "tooLate" }
            ]
        }
    ],
    
    prepareWell: [
        {
            speaker: "Protagonist",
            text: "I'll prepare sincerely for the meeting. I'll organize my thoughts and show her my genuine change.",
            character: "neutral",
            choices: [
                { text: "Meet and have an honest conversation", next: "honestConversation" }
            ]
        }
    ],
    
    simpleApology: [
        {
            speaker: "Protagonist",
            text: "I'll just apologize simply and sincerely. Without any expectations or excuses.",
            character: "neutral",
            choices: [
                { text: "Apologize with all my heart", next: "heartfeltApology" }
            ]
        }
    ],
    
    proveWithActions: [
        {
            speaker: "Protagonist",
            text: "You're right. I'll prove it with actions, not words. I'll show you through my behavior that I've really changed.",
            character: "neutral",
            choices: [
                { text: "Start proving through actions", next: "actionProof" }
            ]
        }
    ],
    
    understandCaution: [
        {
            speaker: "Protagonist",
            text: "I understand your caution. I've disappointed you so many times. Take all the time you need.",
            character: "neutral",
            choices: [
                { text: "Wait patiently", next: "patientWaiting" }
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
    
    selfDisgust: [
        {
            speaker: "Protagonist",
            text: "I'm so pathetic... I hate myself. How could I live like this and claim to love someone?",
            character: "neutral",
            choices: [
                { text: "Try to overcome self-hatred", next: "overcomeSelfHate" },
                { text: "This is also part of growth", next: "partOfGrowth" }
            ]
        }
    ],
    
    casualContact: [
        {
            speaker: "Jieun",
            text: "Just checking on me... I see. I'm doing well. I have new hobbies and getting along well with friends.",
            character: "jieun",
            choices: [
                { text: "'You look happy'", next: "supportive" },
                { text: "'Is Minsu among those friends?'", next: "askAboutMinsu", effect: { minsu: +10, jieun: -8 } }
            ]
        }
    ],
    
    grateful: [
        {
            speaker: "Jieun",
            text: "Okay... I can see you're genuinely reflecting. Let's meet and talk. But don't expect things to go back to how they were.",
            character: "jieun",
            choices: [
                { text: "'I know, I just want to apologize'", next: "justApology" },
                { text: "'Will it get better with time?'", next: "timeHeals", effect: { jieun: +3 } }
            ]
        }
    ],
    
    justApology: [
        {
            speaker: "Narrator",
            text: "You met with Jieun and sincerely apologized. You couldn't go back to how things were, but you were able to resolve the painful issues between you.",
            character: "neutral",
            choices: [
                { text: "Now we go our separate ways", next: "separateWays" }
            ]
        }
    ],
    
    supportive: [
        {
            speaker: "Jieun",
            text: "Thank you for saying that. It's nice to hear genuine support from you. Maybe you have changed a little.",
            character: "jieun",
            choices: [
                { text: "Continue the warm conversation", next: "warmConversation" }
            ]
        }
    ],
    
    askAboutMinsu: [
        {
            speaker: "Jieun",
            text: "...You're still worried about that. Minsu is just a friend. Always has been, still is. You really haven't changed.",
            character: "jieun",
            choices: [
                { text: "'Sorry, I asked out of habit'", next: "habitualQuestion" },
                { text: "'I was just curious...'", next: "justCurious" }
            ]
        }
    ],
    
    timeHeals: [
        {
            speaker: "Jieun",
            text: "Time... maybe. But there are some things that can't be undone. Let's just focus on having a good conversation today.",
            character: "jieun",
            choices: [
                { text: "Have an honest conversation", next: "honestConversation" }
            ]
        }
    ],
    
    // More story scenes to match Korean version...
    noExcuse: [
        {
            speaker: "Protagonist",
            text: "But that's just an excuse. My difficult situation doesn't justify hurting Jieun or getting angry at her.",
            character: "neutral",
            choices: [
                { text: "Sincerely reflect and apologize", next: "genuineRemorse" },
                { text: "I'll never make that mistake again", next: "neverAgain", effect: { confidence: +10 } }
            ]
        }
    ],
    
    incompatible: [
        {
            speaker: "Protagonist",
            text: "Maybe we just weren't compatible. Jieun is free and social, and I'm... anxious and jealous.",
            character: "neutral",
            choices: [
                { text: "But I believe I can change", next: "canChange", effect: { confidence: +5 } },
                { text: "It was an unavoidable personality difference", next: "personalityDifference" }
            ]
        }
    ],
    
    consistentEffort: [
        {
            speaker: "Protagonist",
            text: "I changed through consistent effort. I get less angry, gained confidence through exercise... Most importantly, I learned how to trust others.",
            character: "neutral",
            choices: [
                { text: "Now I'm ready to start a new love", next: "readyForNewLove" },
                { text: "I want to show Jieun how I've changed", next: "showChange" }
            ]
        }
    ],
    
    overcomeFear: [
        {
            speaker: "Protagonist",
            text: "Let me overcome that fear. The feeling of not being enough, the anxiety of being abandoned... I won't let these control me anymore.",
            character: "neutral",
            choices: [
                { text: "Systematically build confidence", next: "buildConfidence" },
                { text: "Seek professional help", next: "seekHelp" }
            ]
        }
    ],
    
    acceptLimitation: [
        {
            speaker: "Protagonist",
            text: "I guess that's just my limit... I wasn't ready for relationships from the beginning. I lacked abilities, confidence, and maturity.",
            character: "neutral",
            choices: [
                { text: "But I can still grow", next: "canGrow", effect: { confidence: +3 } },
                { text: "It's better to be alone", next: "betterAlone", effect: { confidence: -8 } }
            ]
        }
    ],
    
    ownProblem: [
        {
            speaker: "Protagonist",
            text: "In the end, it was my problem. I couldn't control my anger, said harsh words, was suspicious... Jieun was just trying to live normally with friends.",
            character: "neutral",
            choices: [
                { text: "Let me change now", next: "changeNow", effect: { confidence: +8, jieun: +5 } },
                { text: "I think it's too late", next: "tooLate", effect: { confidence: -5 } }
            ]
        }
    ],
    
    canChange: [
        {
            speaker: "Protagonist",
            text: "We're different, but I believe we can change. Just because we have different personalities doesn't mean we should give up. We can work to understand each other.",
            character: "neutral",
            choices: [
                { text: "Make an effort to change", next: "effortToChange" },
                { text: "Tell Jieun about these feelings", next: "tellJieun" }
            ]
        }
    ],
    
    personalityDifference: [
        {
            speaker: "Protagonist",
            text: "It seems like an unavoidable personality difference. Jieun is free and social, and I'm... careful and introverted. Maybe we don't need to force compatibility.",
            character: "neutral",
            choices: [
                { text: "Accept and acknowledge the difference", next: "acceptDifference" },
                { text: "But it's still worth trying", next: "worthTrying" }
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
    
    changeNow: [
        {
            speaker: "Protagonist",
            text: "Let me change now. Learn to control anger, learn to think from others' perspectives... It's late, but I'll start.",
            character: "neutral",
            choices: [
                { text: "Start systematic self-development", next: "systematicImprovement" }
            ]
        }
    ],
    
    canGrow: [
        {
            speaker: "Protagonist",
            text: "I have limitations, but I believe I can grow. I don't have to be perfect. I just need to keep getting better, little by little.",
            character: "neutral",
            choices: [
                { text: "Grow slowly and steadily", next: "gradualGrowth" },
                { text: "Strengthen my will to grow", next: "growthDetermination" }
            ]
        }
    ],
    
    betterAlone: [
        {
            speaker: "Protagonist",
            text: "It might be better to be alone. I'm not ready to be with someone yet. Let me first learn to be at peace with myself.",
            character: "neutral",
            choices: [
                { text: "Find peace within myself", next: "findInnerPeace" },
                { text: "Maybe I'll try again someday", next: "maybeOneDay" }
            ]
        }
    ],
    
    effortToChange: [
        {
            speaker: "Protagonist",
            text: "I'll make an effort to change. Even though we're different, I'll try to understand and accommodate.",
            character: "neutral",
            choices: [
                { text: "Contact Jieun to express these feelings", next: "contactJieun" }
            ]
        }
    ],
    
    tellJieun: [
        {
            speaker: "Protagonist",
            text: "I want to tell Jieun about these feelings. That I've realized our differences, but I still want to try.",
            character: "neutral",
            choices: [
                { text: "Contact Jieun", next: "contactJieun" }
            ]
        }
    ],
    
    acceptDifference: [
        {
            speaker: "Protagonist",
            text: "I'll accept and acknowledge our differences. We don't have to be the same. Respecting differences is also a form of love.",
            character: "neutral",
            choices: [
                { text: "Learn to respect differences", next: "learnRespect" }
            ]
        }
    ],
    
    worthTrying: [
        {
            speaker: "Protagonist",
            text: "But it's still worth trying. If we really care about each other, we can overcome personality differences.",
            character: "neutral",
            choices: [
                { text: "Contact Jieun to discuss this", next: "contactJieun" }
            ]
        }
    ],
    
    // Additional endings for consistency
    seekHelp: [
        {
            speaker: "Protagonist",
            text: "I admit I have limitations on my own and decided to seek professional help. This courage is the real beginning of change.",
            character: "neutral",
            choices: [
                { text: "Receive systematic treatment", next: "systematicTreatment" },
                { text: "Ask friends for advice", next: "askFriends" }
            ]
        }
    ],
    
    readyForNewLove: [
        {
            speaker: "Protagonist",
            text: "Through consistent effort, you're now ready to start a new love. This time you can create a healthier relationship.",
            character: "neutral",
            choices: [
                { text: "Start a new relationship", next: "newRelationship" }
            ]
        }
    ],
    
    loneReflection: [
        {
            speaker: "Protagonist",
            text: "I decided to spend time quietly reflecting alone. Sometimes solitary time enables the deepest introspection.",
            character: "neutral",
            choices: [
                { text: "Continue deep reflection", next: "deepReflection", effect: { confidence: +10 } },
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
    
    habitualQuestion: [
        {
            speaker: "Jieun",
            text: "Out of habit... I see. Some habits are really hard to break. But at least you recognized it.",
            character: "jieun",
            choices: [
                { text: "I'm still working on changing", next: "stillChanging" }
            ]
        }
    ],
    
    justCurious: [
        {
            speaker: "Jieun",
            text: "Just curious... Sure. But that curiosity was what caused problems before. I think that's enough for today.",
            character: "jieun",
            choices: [
                { text: "Accept the end of conversation", next: "acceptEnd" }
            ]
        }
    ],
    
    genuineSupport: [
        {
            speaker: "Jieun",
            text: "Thank you for saying that. It's nice to hear genuine support from you. Maybe you have changed a little.",
            character: "jieun",
            choices: [
                { text: "Continue the warm conversation", next: "warmConversation" }
            ]
        }
    ],
    
    expressRegret: [
        {
            speaker: "Jieun",
            text: "I appreciate your regret. But what's more important is not repeating the same mistakes in the future.",
            character: "jieun",
            choices: [
                { text: "Promise not to repeat mistakes", next: "promiseNoRepeat" }
            ]
        }
    ]
};

// Endings Data - Exactly matching Korean version (25 endings)
const endings = {
    goodEnding: {
        title: "Trust Begins",
        text: "You and Jieun understood each other's hearts and started over. Now you can nurture love based on true trust."
    },
    happyEnding: {
        title: "Growth and Love",
        text: "After learning to love yourself, you built an even healthier relationship with Jieun. You found true love with trust and understanding instead of jealousy and insecurity."
    },
    friendsEnding: {
        title: "Precious Friendship", 
        text: "You couldn't return as lovers, but you and Jieun decided to remain good friends after understanding each other. Sometimes this is also a beautiful ending."
    },
    badEnding: {
        title: "Painful Farewell",
        text: "Jieun was disappointed to see that you ultimately couldn't change. But through this experience, you might be able to show a more mature side next time."
    },
    growthEnding: {
        title: "I'm Fine Alone",
        text: "Through time alone, you made peace with yourself. Now you can create healthier relationships even if you meet someone."
    },
    newBeginning: {
        title: "New Beginning",
        text: "You resolved to make a new start with a mature mindset. Now you can build any relationship in a healthy way."
    },
    acceptAlone: {
        title: "Peace in Solitude",
        text: "You decided that being alone is more comfortable. Sometimes time with yourself can be the most precious."
    },
    separateWays: {
        title: "Separate Paths",
        text: "You sincerely apologized and Jieun accepted it. You're going different ways, but you could leave it as a good memory."
    },
    willWait: {
        title: "Love of Waiting",
        text: "Jieun began to open her heart little by little to your determination to wait however long it takes. It will take time, but there's possibility."
    },
    showChange: {
        title: "Proof of Change",
        text: "You decided to prove your change through actions. With actions rather than words, you will demonstrate your true growth to Jieun."
    },
    apologizeAgain: {
        title: "Another Mistake",
        text: "Seeing you make another mistake, Jieun was convinced. You haven't changed yet. But if you don't give up, someday..."
    },
    mustApologize: {
        title: "Final Apology",
        text: "Though you caused irreversible hurt, you thought you still needed to apologize. Your sincerity got through and Jieun understood a little."
    },
    selfDisgust: {
        title: "Self-Loathing",
        text: "You're disappointed in your pathetic self. But even these feelings can be the beginning of growth. What's important is not giving up."
    },
    timeHeals: {
        title: "Time Heals",
        text: "You and Jieun held hope that time would make things better. It hurts now, but someday it will become a good memory."
    },
    supportive: {
        title: "Warm Encouragement",
        text: "A warm conversation of mutual encouragement. Even if not lovers, you could remain as good people to each other."
    },
    askAboutMinsu: {
        title: "Unchanged Jealousy",
        text: "Jieun was disappointed to see you still asking about Minsu. Some things changed, but the core problem remained the same."
    },
    loneReflection: {
        title: "Solitary Reflection",
        text: "You decided to reflect quietly alone. Sometimes solitary time enables the deepest introspection."
    },
    readyForNewLove: {
        title: "Ready for New Love",
        text: "Through consistent effort, you're now ready to start a new love. This time you can create a healthier relationship."
    },
    seekHelp: {
        title: "Courage to Seek Help",
        text: "Admitting your limitations and deciding to seek professional help. This courage is the real beginning of change."
    },
    canGrow: {
        title: "Possibility of Growth",
        text: "You believe you can grow despite limitations. With this mindset, you can surely become a better person."
    },
    betterAlone: {
        title: "Better Alone",
        text: "You thought being alone was better. Organizing your relationship with yourself first is also an important choice."
    },
    canChange: {
        title: "Will to Change",
        text: "You believe you can change despite differences. This positive mindset is the first step to improving relationships."
    },
    personalityDifference: {
        title: "Personality Differences",
        text: "You acknowledged unavoidable personality differences. Sometimes accepting is also a wise choice."
    },
    neverAgain: {
        title: "Never Again",
        text: "You resolved never to make the same mistake again. This determination from genuine reflection will be the driving force for change."
    },
    matureEnding: {
        title: "Toward Mature Love",
        text: "Moving toward true maturity, leaving the immature past behind. Now you're truly ready for healthy love."
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