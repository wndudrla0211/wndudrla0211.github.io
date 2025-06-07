// 게임 상태
let gameState = {
    currentScene: 'start',
    currentStoryIndex: 0,
    relationships: {
        jieun: 30,    // 전여친과의 신뢰도
        minsu: 70,    // 민수에 대한 질투도
        confidence: 20 // 자기 신뢰도
    },
    flags: {
        metMinsu: false,
        talkedAboutPast: false,
        apologized: false,
        trustIssue: true
    }
};

// 스토리 데이터
const storyData = {
    start: [
        {
            speaker: "내레이션",
            text: "당신은 최근 지은과 헤어졌습니다. 이유는... 여러 가지가 있었지만, 결국 준비가 안 된 상태에서 시작한 연애였죠.",
            character: "neutral",
            choices: [
                { text: "그 일을 되돌아본다", next: "reflection" },
                { text: "새로운 시작을 다짐한다", next: "newStart" }
            ]
        }
    ],
    
    reflection: [
        {
            speaker: "주인공",
            text: "지은이와 헤어진 이유... 한 가지가 아니었어. 내가 화를 잘 냈고, 때로는 심한 말도 했지. 그리고 무엇보다 그녀를 믿지 못했어. 특히 전남친 민수 얘기만 나오면...",
            character: "neutral",
            choices: [
                { text: "내가 너무 미성숙했다", next: "immature", effect: { confidence: -3, jieun: +3 } },
                { text: "하지만 내 감정도 이해할 만했다", next: "understandMyself", effect: { confidence: +2, minsu: +5 } }
            ]
        }
    ],
    
    newStart: [
        {
            speaker: "주인공", 
            text: "과거는 과거야. 그때 난 연애할 준비가 안 되어 있었어. 능력도, 자신감도, 신뢰하는 법도 몰랐지. 이제는 달라져야 해.",
            character: "neutral",
            choices: [
                { text: "지은에게 변화된 모습을 보여주고 싶다", next: "showChange" },
                { text: "먼저 나 자신을 바꿔야 한다", next: "selfImprovement" }
            ]
        }
    ],
    
    immature: [
        {
            speaker: "주인공",
            text: "정말 미성숙했어. 질투할 때마다 소리 지르고, 심지어 지은한테 상처 되는 말도 했지. '너 때문에 이렇게 됐다'라고 하면서... 지금 생각하면 정말 한심해.",
            character: "neutral",
            choices: [
                { text: "진심으로 반성한다", next: "genuineRemorse", effect: { jieun: +8, confidence: -5 } },
                { text: "하지만 그때는 어쩔 수 없었다", next: "defensiveThinking", effect: { confidence: +3, minsu: +8 } }
            ]
        }
    ],
    
    understandMyself: [
        {
            speaker: "주인공",
            text: "물론 내가 잘못했지만... 그때 난 정말 불안했어. 내 능력도 별로고, 자신감도 없고, 지은이 나보다 나은 사람들과 어울리는 걸 보면...",
            character: "neutral",
            choices: [
                { text: "내 열등감이 문제였다", next: "inferiority", effect: { confidence: -8, jieun: +5 } },
                { text: "지은이 내 마음을 이해 못 했다", next: "misunderstood", effect: { jieun: -5, minsu: +10 } }
            ]
        }
    ],
    
    selfImprovement: [
        {
            speaker: "주인공",
            text: "그래, 먼저 나부터 바껴야 해. 화내는 습관도, 의심하는 성격도, 무엇보다 내 자신에 대한 자신감부터...",
            character: "neutral",
            choices: [
                { text: "체계적으로 자기계발을 시작한다", next: "systematicImprovement" },
                { text: "왜 이렇게 됐는지부터 파악한다", next: "rootCauseAnalysis" }
            ]
        }
    ],
    
    genuineRemorse: [
        {
            speaker: "주인공",
            text: "정말 잘못했어. 지은한테 했던 말들... '네가 민수랑 만나니까 이렇게 되는 거야', '나를 무시하는 거지?' 이런 말들. 얼마나 상처받았을까.",
            character: "neutral",
            choices: [
                { text: "지은에게 진심으로 사과하고 싶다", next: "wantApology", effect: { jieun: +12 } },
                { text: "돌이킬 수 없는 상처를 줬다", next: "irreversibleHurt", effect: { confidence: -10, jieun: +5 } }
            ]
        }
    ],
    
    defensiveThinking: [
        {
            speaker: "주인공",
            text: "하지만 그때는 정말 견딜 수 없었어. 지은이 민수 얘기할 때마다, 다른 남자 친구들과 웃을 때마다... 나는 뭘까 싶었거든.",
            character: "neutral",
            choices: [
                { text: "내 처지를 이해해달라고 했어야 했다", next: "seekUnderstanding", effect: { minsu: +8 } },
                { text: "결국 내 문제였다", next: "ownProblem", effect: { confidence: -5, jieun: +5 } }
            ]
        }
    ],
    
    inferiority: [
        {
            speaker: "주인공",
            text: "맞아, 내 열등감이었어. 직장에서도, 친구들 사이에서도 항상 뒤처진 느낌... 그런 상태에서 지은 같은 사람과 연애한다는 게 무리였나봐.",
            character: "neutral",
            choices: [
                { text: "능력을 키워서 자신감을 갖자", next: "buildConfidence", effect: { confidence: +10 } },
                { text: "나는 원래 이런 사람인가봐", next: "acceptWeakness", effect: { confidence: -8 } }
            ]
        }
    ],
    
    misunderstood: [
        {
            speaker: "주인공",
            text: "내가 왜 그렇게 행동했는지 지은이 이해해줬으면 좋았을 텐데... 나도 노력했는데 인정받지 못하는 기분이었어.",
            character: "neutral",
            choices: [
                { text: "하지만 그건 변명일 뿐이다", next: "noExcuse", effect: { jieun: +8, confidence: +3 } },
                { text: "서로 맞지 않았던 것 같다", next: "incompatible", effect: { confidence: +2 } }
            ]
        }
    ],
    
    systematicImprovement: [
        {
            speaker: "주인공",
            text: "운동도 하고, 책도 읽고, 새로운 기술도 배우자. 그리고 화를 조절하는 방법도... 연애할 자격을 갖춘 사람이 되는 거야.",
            character: "neutral",
            choices: [
                { text: "꾸준히 노력하며 변화한다", next: "consistentEffort", effect: { confidence: +15, minsu: -8 } },
                { text: "이런 변화를 지은에게 보여주고 싶다", next: "showProgress", effect: { jieun: +8 } }
            ]
        }
    ],
    
    rootCauseAnalysis: [
        {
            speaker: "주인공",
            text: "어릴 때부터 항상 부족하다고 느꼈어. 성적도, 외모도, 능력도... 그런 상태에서 사귄 첫 여자친구가 지은이었는데, 잃을까봐 너무 무서웠나봐.",
            character: "neutral",
            choices: [
                { text: "이제 그 두려움을 극복해보자", next: "overcomeFear", effect: { confidence: +12, minsu: -10 } },
                { text: "원래 내 한계인 것 같다", next: "acceptLimitation", effect: { confidence: -5 } }
            ]
        }
    ],
    
    contactJieun: [
        {
            speaker: "내레이션",
            text: "당신은 용기를 내어 지은에게 메시지를 보냅니다. '안녕, 나야. 시간 있을 때 한 번 만날 수 있을까?' 한참 후, 답장이 왔습니다.",
            character: "jieun",
            choices: [
                { text: "메시지를 확인한다", next: "jieunReply" }
            ]
        }
    ],
    
    jieunReply: [
        {
            speaker: "지은",
            text: "안녕... 갑자기 연락하니까 좀 놀랐어. 무슨 일이야? 우리가 헤어진 이유 생각하면... 만나는 게 좋을까?",
            character: "jieun",
            choices: [
                { text: "진심으로 사과하고 싶다고 말한다", next: "wantToApologize", effect: { jieun: +8 } },
                { text: "그냥 안부나 묻고 싶었다고 한다", next: "casualContact", effect: { confidence: -3 } }
            ]
        }
    ],
    
    wantToApologize: [
        {
            speaker: "지은",
            text: "사과...? 네가 그때 한 행동들, 말들 기억해? '왜 민수랑 계속 연락해?', '나보다 그가 좋은 거 아냐?'... 정말 힘들었어.",
            character: "jieun",
            choices: [
                { text: "'정말 미안해. 나 정말 잘못했어'", next: "sincereApology", effect: { jieun: +15, minsu: -10 } },
                { text: "'그때는 정말 불안했어...'", next: "explainAnxiety", effect: { minsu: +5 } }
            ]
        }
    ],
    
    sincereApology: [
        {
            speaker: "지은",
            text: "...너 진짜 많이 변한 것 같아. 예전 같으면 또 변명부터 했을 텐데. 그래, 만나서 이야기해보자. 하지만 기대는 하지 마.",
            character: "jieun",
            choices: [
                { text: "고마워, 정말 고마워", next: "grateful", effect: { jieun: +10 } },
                { text: "기대 안 해, 그냥 사과만 하고 싶어", next: "justApology", effect: { jieun: +12, confidence: +5 } }
            ]
        }
    ],
    
    explainAnxiety: [
        {
            speaker: "지은",
            text: "또 그런 식으로 얘기하네... 너의 불안함은 이해해. 하지만 그게 나한테 화내고 의심하는 이유가 될 수는 없잖아.",
            character: "jieun",
            choices: [
                { text: "'맞아, 변명이었어. 정말 미안해'", next: "admitWrong", effect: { jieun: +8, minsu: -5 } },
                { text: "'하지만 네가 내 마음을 몰라줬어'", next: "blameHer", effect: { jieun: -15, minsu: +15 } }
            ]
        }
    ],
    
    buildConfidence: [
        {
            speaker: "주인공",
            text: "능력을 키워서 자신감을 갖자. 운동도 하고, 자격증도 따고, 새로운 기술도 배우고... 더 이상 아무한테도 밀리지 않을 거야.",
            character: "neutral",
            choices: [
                { text: "체계적으로 자기계발을 시작한다", next: "systematicImprovement" },
                { text: "이런 변화를 지은에게 보여주고 싶다", next: "showChange" }
            ]
        }
    ],
    
    acceptWeakness: [
        {
            speaker: "주인공",
            text: "나는 원래 이런 사람인가봐... 능력도 없고, 자신감도 없고. 그런데 그런 상태에서 지은 같은 사람과 연애하려고 했으니...",
            character: "neutral",
            choices: [
                { text: "그래도 포기하지 않겠다", next: "dontGiveUp", effect: { confidence: +5 } },
                { text: "나 정도로는 역부족이었나봐", next: "feelInsufficient", effect: { confidence: -10 } }
            ]
        }
    ],
    
    seekUnderstanding: [
        {
            speaker: "주인공",
            text: "내 처지를 이해해달라고 했어야 했는데... 나도 노력하고 있고, 나도 불안하다고. 하지만 그때는 화만 냈지.",
            character: "neutral",
            choices: [
                { text: "이제라도 제대로 소통해보자", next: "betterCommunication", effect: { jieun: +5 } },
                { text: "그때 방식이 잘못됐어", next: "wrongWay", effect: { confidence: +3 } }
            ]
        }
    ],
    
    ownProblem: [
        {
            speaker: "주인공",
            text: "결국 내 문제였어. 내가 화를 조절 못하고, 막말하고, 의심하고... 지은은 그냥 평범하게 친구들과 지내려고 했는데.",
            character: "neutral",
            choices: [
                { text: "이제라도 바꿔보자", next: "changeNow", effect: { confidence: +8, jieun: +5 } },
                { text: "너무 늦은 것 같다", next: "tooLate", effect: { confidence: -5 } }
            ]
        }
    ],
    
    noExcuse: [
        {
            speaker: "주인공",
            text: "하지만 그건 변명일 뿐이었어. 내 상황이 어려웠다고 해서 지은한테 화내고 상처 주는 게 정당화되는 건 아니잖아.",
            character: "neutral",
            choices: [
                { text: "진심으로 반성하고 사과하자", next: "genuineRemorse" },
                { text: "다시는 그런 실수하지 않겠다", next: "neverAgain", effect: { confidence: +10 } }
            ]
        }
    ],
    
    incompatible: [
        {
            speaker: "주인공",
            text: "서로 맞지 않았던 것 같아. 지은은 자유롭고 사교적인 사람이고, 나는... 불안하고 질투 많은 사람이고.",
            character: "neutral",
            choices: [
                { text: "하지만 바뀔 수 있다고 믿는다", next: "canChange", effect: { confidence: +5 } },
                { text: "어쩔 수 없는 성격 차이였나봐", next: "personalityDifference" }
            ]
        }
    ],
    
    consistentEffort: [
        {
            speaker: "주인공",
            text: "꾸준히 노력하며 변화했어. 화도 덜 내게 되고, 운동하면서 자신감도 생기고... 가장 중요한 건 다른 사람을 믿는 법을 배운 거야.",
            character: "neutral",
            choices: [
                { text: "이제 새로운 사랑을 시작할 준비가 됐다", next: "readyForNewLove" },
                { text: "지은에게 변화된 모습을 보여주고 싶다", next: "showChange" }
            ]
        }
    ],
    
    overcomeFear: [
        {
            speaker: "주인공",
            text: "그 두려움을 극복해보자. 충분하지 않다는 느낌, 버림받을지 모른다는 불안... 이런 것들이 나를 지배하게 두지 않겠어.",
            character: "neutral",
            choices: [
                { text: "체계적으로 자신감을 키운다", next: "buildConfidence" },
                { text: "전문가의 도움을 받는다", next: "seekHelp" }
            ]
        }
    ],
    
    acceptLimitation: [
        {
            speaker: "주인공",
            text: "원래 내 한계인 것 같아... 나는 애초에 연애할 준비가 안 된 사람이었나봐. 능력도, 자신감도, 성숙함도 다 부족했고.",
            character: "neutral",
            choices: [
                { text: "그래도 성장할 수 있다", next: "canGrow", effect: { confidence: +3 } },
                { text: "혼자 있는 게 낫겠다", next: "betterAlone", effect: { confidence: -8 } }
            ]
        }
    ],
    
    casualContact: [
        {
            speaker: "지은",
            text: "안부... 그렇구나. 나도 잘 지내고 있어. 요즘 새로운 취미도 생겼고, 친구들과도 잘 지내고 있어.",
            character: "jieun",
            choices: [
                { text: "'좋아 보인다'", next: "supportive" },
                { text: "'그 친구들 중에 민수도 있지?'", next: "askAboutMinsu", effect: { minsu: +10, jieun: -8 } }
            ]
        }
    ],
    
    grateful: [
        {
            speaker: "지은",
            text: "그래... 네가 진심으로 반성하고 있다는 건 알겠어. 만나서 얘기해보자. 하지만 예전처럼 되기는 어려울 것 같아.",
            character: "jieun",
            choices: [
                { text: "'알아, 그냥 사과만 하고 싶어'", next: "justApology" },
                { text: "'시간이 지나면 괜찮아질까?'", next: "timeHeals", effect: { jieun: +3 } }
            ]
        }
    ],
    
    justApology: [
        {
            speaker: "내레이션",
            text: "당신은 지은과 만나서 진심으로 사과했습니다. 예전처럼 돌아가지는 못했지만, 서로에게 상처가 된 일들을 정리할 수 있었습니다.",
            character: "neutral",
            choices: [
                { text: "이제 각자의 길을 간다", next: "separateWays" }
            ]
        }
    ],
    
    admitWrong: [
        {
            speaker: "지은",
            text: "그래... 그런 마음이면 만나서 얘기해보자. 하지만 많은 시간이 필요할 것 같아. 너도 진짜 변했는지 보고 싶고.",
            character: "jieun",
            choices: [
                { text: "'얼마든지 기다릴게'", next: "willWait", effect: { jieun: +10 } },
                { text: "'변화된 모습을 보여줄게'", next: "showChange" }
            ]
        }
    ],
    
    blameHer: [
        {
            speaker: "지은",
            text: "...아직도 그런 생각을 하는구나. 미안하지만 이런 식으로는 대화하기 어려울 것 같아. 너는 변하지 않았어.",
            character: "jieun",
            choices: [
                { text: "'미안해, 내가 또 잘못 말했어'", next: "apologizeAgain" },
                { text: "'그럼 어쩔 수 없지'", next: "badEnding" }
            ]
        }
    ],
    
    irreversibleHurt: [
        {
            speaker: "주인공",
            text: "돌이킬 수 없는 상처를 줬어. 그때 내가 했던 말들, 행동들... '네가 그런 식으로 나오니까 이렇게 되는 거야'라고 소리 지르고...",
            character: "neutral",
            choices: [
                { text: "그래도 사과는 해야 한다", next: "mustApologize", effect: { jieun: +5 } },
                { text: "내가 너무 한심했다", next: "selfDisgust", effect: { confidence: -8 } }
            ]
        }
    ],
    
    // 추가 엔딩들
    dontGiveUp: [
        {
            speaker: "주인공",
            text: "그래도 포기하지 않겠어. 비록 지금은 부족하지만, 노력하면 변할 수 있을 거야. 연애할 자격을 갖춘 사람이 되는 거야.",
            character: "neutral",
            choices: [
                { text: "새로운 시작을 다짐한다", next: "newBeginning" }
            ]
        }
    ],
    
    feelInsufficient: [
        {
            speaker: "주인공",
            text: "나 정도로는 역부족이었나봐... 지은은 너무 좋은 사람이었고, 나는... 그냥 부족한 사람이었어.",
            character: "neutral",
            choices: [
                { text: "받아들이고 혼자 살기로 한다", next: "acceptAlone" }
            ]
        }
    ],
    
    betterCommunication: [
        {
            speaker: "주인공",
            text: "이제라도 제대로 소통해보자. 내 불안함을 화로 표현하지 말고, 솔직하게 이야기하면서...",
            character: "neutral",
            choices: [
                { text: "지은에게 연락해서 대화를 요청한다", next: "contactJieun" }
            ]
        }
    ],
    
    wrongWay: [
        {
            speaker: "주인공",
            text: "그때 방식이 잘못됐어. 불안하면 화내지 말고 솔직히 얘기했어야 했는데... '나 지금 불안해, 도와줘'라고.",
            character: "neutral",
            choices: [
                { text: "다음에는 제대로 소통하자", next: "betterCommunication" }
            ]
        }
    ],
    
    changeNow: [
        {
            speaker: "주인공",
            text: "이제라도 바꿔보자. 화를 조절하는 법도 배우고, 상대방 입장에서 생각하는 법도... 늦었지만 시작해보는 거야.",
            character: "neutral",
            choices: [
                { text: "체계적으로 자기개발을 시작한다", next: "systematicImprovement" }
            ]
        }
    ],
    
    tooLate: [
        {
            speaker: "주인공",
            text: "너무 늦은 것 같아... 이미 지은에게 너무 많은 상처를 줬고, 신뢰도 완전히 깨졌고. 돌이킬 수 없을 거야.",
            character: "neutral",
            choices: [
                { text: "그래도 사과는 해야 한다", next: "mustApologize" },
                { text: "혼자서 반성하며 지내자", next: "loneReflection" }
            ]
        }
    ],
    
    // 추가 누락된 스토리들
    wantApology: [
        {
            speaker: "주인공",
            text: "지은에게 진심으로 사과하고 싶어. 내가 화내고 막말했던 것, 의심했던 것... 모든 걸 사과하고 싶어.",
            character: "neutral",
            choices: [
                { text: "용기를 내어 연락한다", next: "contactJieun" },
                { text: "아직 용기가 안 난다", next: "hesitation", effect: { confidence: -3 } }
            ]
        }
    ],
    
    showProgress: [
        {
            speaker: "주인공",
            text: "변화된 모습을 보여주고 싶어. 더 이상 화내지 않고, 의심하지 않고, 믿을 줄 아는 사람이 된 모습을.",
            character: "neutral",
            choices: [
                { text: "지은에게 연락한다", next: "contactJieun" },
                { text: "더 확실하게 변한 후에 연락한다", next: "moreImprovement", effect: { confidence: +5 } }
            ]
        }
    ],
    
    hesitation: [
        {
            speaker: "주인공",
            text: "아직 용기가 안 나... 만약 지은이 나를 용서하지 않는다면? 더 상처받을 것 같아.",
            character: "neutral",
            choices: [
                { text: "그래도 시도해보자", next: "contactJieun", effect: { confidence: +5 } },
                { text: "혼자만의 시간이 더 필요하다", next: "needMoreTime" }
            ]
        }
    ],
    
    moreImprovement: [
        {
            speaker: "주인공",
            text: "더 확실하게 변한 후에 연락하자. 지금도 많이 변했지만, 완전히 다른 사람이 된 후에...",
            character: "neutral",
            choices: [
                { text: "꾸준히 자기계발을 계속한다", next: "consistentEffort" }
            ]
        }
    ],
    
    needMoreTime: [
        {
            speaker: "주인공",
            text: "혼자만의 시간이 더 필요해. 아직 완전히 정리되지 않은 감정들이 있어.",
            character: "neutral",
            choices: [
                { text: "자기 성찰을 계속한다", next: "selfReflection" }
            ]
        }
    ],
    
    selfReflection: [
        {
            speaker: "주인공",
            text: "어릴 때부터 나는 항상 부족하다는 느낌을 받았어. 그게 연애에서도 나타난 거였구나.",
            character: "neutral",
            choices: [
                { text: "이제는 그 패턴을 바꿔보자", next: "breakPattern", effect: { confidence: +10 } },
                { text: "전문가의 도움을 받아보자", next: "seekHelp" }
            ]
        }
    ],
    
    breakPattern: [
        {
            speaker: "주인공",
            text: "어릴 때부터의 패턴을 바꿔보자. 부족하다고 느끼는 마음, 불안해하는 마음... 이제는 달라질 수 있어.",
            character: "neutral",
            choices: [
                { text: "새로운 나로 거듭난다", next: "newSelf" }
            ]
        }
    ],
    
    newSelf: [
        {
            speaker: "주인공",
            text: "완전히 새로운 사람이 된 기분이야. 자신감도 생기고, 화도 덜 내게 되고... 이제 건강한 사랑을 할 수 있을 것 같아.",
            character: "neutral",
            choices: [
                { text: "새로운 사랑을 시작할 준비가 됐다", next: "readyForNewLove" },
                { text: "지은에게 변화된 모습을 보여주고 싶다", next: "showChange" }
            ]
        }
    ],
    
    neverAgain: [
        {
            speaker: "주인공",
            text: "다시는 그런 실수를 하지 않겠어. 화내고, 의심하고, 상처주는 말을 하는... 그런 미성숙한 모습은 이제 그만.",
            character: "neutral",
            choices: [
                { text: "새로운 사람이 되겠다", next: "newBeginning" }
            ]
        }
    ],
    
    timeHeals: [
        {
            speaker: "지은",
            text: "시간이 지나면... 모르겠어. 지금은 아직 상처가 아물지 않았거든. 하지만 네가 진짜 변했다면...",
            character: "jieun",
            choices: [
                { text: "'얼마든지 기다릴게'", next: "willWait" },
                { text: "'변화를 계속 보여줄게'", next: "showProgress" }
            ]
        }
    ],
    
    mustApologize: [
        {
            speaker: "주인공",
            text: "돌이킬 수 없는 상처를 줬지만, 그래도 사과는 해야 해. 지은이 받아주든 안 받아주든...",
            character: "neutral",
            choices: [
                { text: "진심으로 사과한다", next: "sincereApology2" }
            ]
        }
    ],
    
    sincereApology2: [
        {
            speaker: "내레이션",
            text: "당신은 지은에게 진심으로 사과했습니다. 모든 잘못을 인정하고, 상처 준 것을 진심으로 미안해했습니다.",
            character: "neutral",
            choices: [
                { text: "이제 각자의 길을 간다", next: "separateWays" }
            ]
        }
    ],
    
    loneReflection: [
        {
            speaker: "주인공",
            text: "혼자서 조용히 반성하며 지내자. 내가 무엇을 잘못했는지, 왜 그렇게 됐는지... 충분히 생각해보는 시간이 필요해.",
            character: "neutral",
            choices: [
                { text: "깊은 성찰의 시간을 갖는다", next: "deepReflection" }
            ]
        }
    ],
    
    deepReflection: [
        {
            speaker: "내레이션",
            text: "당신은 혼자만의 시간을 통해 많은 것을 깨달았습니다. 미성숙했던 과거와 앞으로 나아갈 방향을...",
            character: "neutral",
            choices: [
                { text: "성장의 여정을 시작한다", next: "growthJourney" }
            ]
        }
    ],
    
    growthJourney: [
        {
            speaker: "내레이션",
            text: "당신의 성장 여정이 시작되었습니다. 더 이상 미성숙한 사랑이 아닌, 진정한 사랑을 할 수 있는 사람이 되기 위해...",
            character: "neutral",
            choices: [
                { text: "새로운 시작을 맞이한다", next: "matureEnding" }
            ]
        }
    ]
};

// 엔딩 데이터
const endings = {
    // 기존 엔딩들
    goodEnding: {
        title: "신뢰의 시작",
        text: "당신과 지은은 서로의 마음을 이해하고 다시 시작했습니다. 이제 진정한 신뢰를 바탕으로 한 사랑을 키워나갈 수 있을 것입니다."
    },
    happyEnding: {
        title: "성장과 사랑",
        text: "자기 자신을 사랑하는 법을 배운 당신은 지은과 더욱 건강한 관계를 만들어갔습니다. 질투와 자격지심 대신 신뢰와 이해가 있는 진정한 사랑을 찾았습니다."
    },
    friendsEnding: {
        title: "소중한 우정",
        text: "연인으로는 돌아갈 수 없었지만, 서로를 이해하게 된 당신과 지은은 좋은 친구로 남기로 했습니다. 때로는 이것도 아름다운 결말입니다."
    },
    badEnding: {
        title: "아픈 이별",
        text: "결국 변화하지 못한 당신을 보고 지은은 실망했습니다. 하지만 이 경험을 통해 다음번에는 더 성숙한 모습을 보일 수 있을 것입니다."
    },
    growthEnding: {
        title: "혼자서도 괜찮아",
        text: "당신은 혼자만의 시간을 통해 자기 자신과 화해했습니다. 이제 누군가를 만나더라도 더 건강한 관계를 만들 수 있을 것입니다."
    },
    newBeginning: {
        title: "새로운 시작",
        text: "성숙한 마음가짐으로 새로운 시작을 다짐한 당신. 이제 어떤 관계든 건강하게 만들어갈 수 있을 것입니다."
    },
    acceptAlone: {
        title: "혼자만의 평화",
        text: "당신은 혼자 있는 게 더 편하다고 결정했습니다. 때로는 자신과의 시간이 가장 소중할 수 있습니다."
    },
    separateWays: {
        title: "각자의 길",
        text: "진심으로 사과한 당신과 그것을 받아준 지은. 서로 다른 길을 가지만, 좋은 기억으로 남을 수 있었습니다."
    },
    willWait: {
        title: "기다림의 사랑",
        text: "얼마든지 기다리겠다는 당신의 마음에 지은이 조금씩 마음을 열기 시작했습니다. 시간이 걸리겠지만 가능성이 보입니다."
    },
    showChange: {
        title: "변화의 증명",
        text: "당신은 자신의 변화를 행동으로 보여주기로 했습니다. 말보다는 행동으로, 지은에게 진정한 성장을 증명해 나갈 것입니다."
    },
    apologizeAgain: {
        title: "또 다른 실수",
        text: "또다시 실수한 당신을 보고 지은은 확신했습니다. 당신은 아직 변하지 않았다고. 하지만 포기하지 않는다면 언젠가는..."
    },
    mustApologize: {
        title: "마지막 사과",
        text: "돌이킬 수 없는 상처를 줬지만, 그래도 사과는 해야 한다고 생각한 당신. 진심이 통했는지 지은이 조금은 이해해주었습니다."
    },
    selfDisgust: {
        title: "자기혐오",
        text: "자신의 한심한 모습에 실망한 당신. 하지만 이런 감정도 성장의 시작일 수 있습니다. 중요한 건 포기하지 않는 것입니다."
    },
    timeHeals: {
        title: "시간이 약",
        text: "시간이 지나면 괜찮아질 거라는 희망을 품은 당신과 지은. 지금은 아프지만, 언젠가는 좋은 추억이 될 것입니다."
    },
    supportive: {
        title: "따뜻한 격려",
        text: "서로를 격려해주는 따뜻한 대화. 연인은 아니더라도 서로에게 좋은 사람으로 남을 수 있었습니다."
    },
    askAboutMinsu: {
        title: "변하지 않은 질투",
        text: "여전히 민수에 대해 묻는 당신을 보고 지은은 실망했습니다. 일부는 변했지만, 핵심적인 문제는 그대로였네요."
    },
    loneReflection: {
        title: "고독한 반성",
        text: "혼자서 조용히 반성하기로 한 당신. 때로는 혼자만의 시간이 가장 깊은 성찰을 가능하게 합니다."
    },
    readyForNewLove: {
        title: "새로운 사랑을 위해",
        text: "꾸준한 노력으로 변화한 당신은 이제 새로운 사랑을 시작할 준비가 되었습니다. 이번에는 더 건강한 관계를 만들 수 있을 것입니다."
    },
    seekHelp: {
        title: "도움을 구하는 용기",
        text: "혼자서는 한계가 있다는 것을 인정하고 전문가의 도움을 받기로 한 당신. 이런 용기가 진정한 변화의 시작입니다."
    },
    canGrow: {
        title: "성장의 가능성",
        text: "한계가 있지만 성장할 수 있다고 믿는 당신. 이런 마음가짐이 있다면 분명히 더 나은 사람이 될 수 있을 것입니다."
    },
    betterAlone: {
        title: "혼자가 편해",
        text: "혼자 있는 게 낫다고 생각한 당신. 자신과의 관계를 먼저 정리하는 것도 중요한 선택입니다."
    },
    canChange: {
        title: "변화의 의지",
        text: "서로 다르지만 변할 수 있다고 믿는 당신. 이런 긍정적인 마음가짐이 관계를 개선하는 첫걸음입니다."
    },
    personalityDifference: {
        title: "성격의 차이",
        text: "어쩔 수 없는 성격 차이라고 인정한 당신. 때로는 받아들이는 것도 현명한 선택일 수 있습니다."
    },
    neverAgain: {
        title: "다시는 안 해",
        text: "다시는 그런 실수를 하지 않겠다고 다짐한 당신. 진정한 반성에서 나온 결심이 변화의 동력이 될 것입니다."
    },
    matureEnding: {
        title: "성숙한 사랑을 향해",
        text: "미성숙했던 과거를 뒤로하고 진정한 성숙함을 향해 나아가는 당신. 이제 정말로 건강한 사랑을 할 준비가 되었습니다."
    }
};

// DOM 요소들
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

// 게임 초기화
function initGame() {
    // 이벤트 리스너 설정
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
    
    // 설정 버튼 비활성화
    document.getElementById('settingsBtn').addEventListener('click', function() {
        alert('설정 기능은 아직 개발 중입니다.');
    });
    
    // 텍스트 박스 클릭으로 다음 진행
    document.querySelector('.text-box').addEventListener('click', nextDialogue);
    
    // 관계도 버튼 (헤더의 메뉴 버튼 더블클릭)
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
        alert('저장된 게임이 없습니다.');
    }
}

function showCredits() {
    alert('제작: 김주영\n테마: 미성숙한 사랑\n\n현실적인 연애의 복잡함과 성장을 다룬 미연시 게임입니다.');
}

function showCurrentStory() {
    const currentStory = storyData[gameState.currentScene];
    if (!currentStory || gameState.currentStoryIndex >= currentStory.length) {
        console.error('스토리 데이터 오류');
        return;
    }
    
    const scene = currentStory[gameState.currentStoryIndex];
    
    // 캐릭터 이미지 변경
    elements.characterImage.className = `character-image ${scene.character}`;
    elements.characterImage.textContent = getCharacterEmoji(scene.character);
    
    // 대화 텍스트 표시
    elements.speakerName.textContent = scene.speaker;
    typeText(scene.text);
    
    // 선택지 표시
    if (scene.choices) {
        setTimeout(() => {
            showChoices(scene.choices);
        }, scene.text.length * 30 + 500);
    }
    
    // 애니메이션 추가
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
    // 효과 적용
    if (choice.effect) {
        Object.keys(choice.effect).forEach(key => {
            if (gameState.relationships[key] !== undefined) {
                gameState.relationships[key] += choice.effect[key];
                gameState.relationships[key] = Math.max(0, Math.min(100, gameState.relationships[key]));
            }
        });
        updateRelationshipBars();
    }
    
    // 다음 씬으로 이동
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
        return; // 선택지가 있으면 클릭 무시
    }
    
    const currentStory = storyData[gameState.currentScene];
    if (currentStory && gameState.currentStoryIndex < currentStory.length - 1) {
        gameState.currentStoryIndex++;
        showCurrentStory();
    }
}

function updateRelationshipBars() {
    document.getElementById('jieunsBar').style.width = `${gameState.relationships.jieun}%`;
    document.getElementById('jieunScore').textContent = `${gameState.relationships.jieun}/100`;
    
    document.getElementById('minsuBar').style.width = `${gameState.relationships.minsu}%`;
    document.getElementById('minsuScore').textContent = `질투: ${gameState.relationships.minsu}`;
    
    document.getElementById('confidenceBar').style.width = `${gameState.relationships.confidence}%`;
    document.getElementById('confidenceScore').textContent = `${gameState.relationships.confidence}/100`;
}

function toggleSidePanel() {
    elements.sidePanel.classList.toggle('show');
}

function toggleMenu() {
    const isVisible = elements.menuOverlay.style.display === 'flex';
    elements.menuOverlay.style.display = isVisible ? 'none' : 'flex';
}

function showSaveScreen() {
    document.getElementById('saveTitle').textContent = '게임 저장';
    elements.saveOverlay.style.display = 'flex';
    
    // 세이브 슬롯 이벤트 리스너
    document.querySelectorAll('.save-slot').forEach(slot => {
        slot.onclick = () => saveGame(slot.dataset.slot);
    });
}

function showLoadScreen() {
    document.getElementById('saveTitle').textContent = '게임 불러오기';
    elements.saveOverlay.style.display = 'flex';
    
    // 로드 슬롯 이벤트 리스너
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
    localStorage.setItem('datingSim_save', JSON.stringify(saveData)); // 기본 저장
    
    // 슬롯 정보 업데이트
    const slot = document.querySelector(`[data-slot="${slotNumber}"]`);
    slot.querySelector('.slot-info').textContent = saveData.saveTime;
    
    alert('게임이 저장되었습니다!');
    closeSaveScreen();
}

function loadGame(slotNumber) {
    const savedData = localStorage.getItem(`datingSim_save_${slotNumber}`);
    if (savedData) {
        gameState = JSON.parse(savedData);
        startNewGame();
        closeSaveScreen();
    } else {
        alert('저장된 데이터가 없습니다.');
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

// 터치 이벤트 최적화 (모바일)
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, true);
}

// 게임 시작
document.addEventListener('DOMContentLoaded', initGame); 