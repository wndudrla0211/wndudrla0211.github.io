// 게임 상태
let gameState = {
    currentScene: 'start',
    currentStoryIndex: 0,
    relationships: {
        seoeun: 0,      // 서은과의 호감도
        confidence: 50, // 자기 신뢰도
        stress: 30     // 스트레스 수치
    },
    flags: {
        firstMeet: false,
        confessed: false,
        dating: false,
        firstDate: false,
        metFriends: false,
        metMinsu: false,
        hadFight: false,
        madeUp: false
    },
    phase: 'meeting' // meeting, dating, crisis, resolution
};

// 스토리 데이터
const storyData = {
    start: [
        {
            speaker: "내레이션",
            text: "대학교 3학년, 평범한 일상 중에 당신은 한 명의 여학생과 마주치게 됩니다. 그녀의 이름은 서은, 같은 과 선배였습니다.",
            character: "neutral",
            choices: [
                { text: "말을 걸어본다", next: "approach", effect: { confidence: +5 } },
                { text: "그냥 지나친다", next: "passBy", effect: { confidence: -3 } },
                { text: "친구에게 물어본다", next: "askFriend", effect: { stress: +5 } }
            ]
        }
    ],
    
    approach: [
        {
            speaker: "서은",
            text: "어? 안녕하세요! 네, 맞아요! 현대문학론 수업 들어요. 정말 어려운 수업이죠?",
            character: "seoeun",
            choices: [
                { text: "네! 정말 어려워서 고민이었어요. 혹시 같이 공부할까요?", next: "naturalTalk", effect: { seoeun: +10, confidence: +5 } },
                { text: "아... 네, 그렇죠... 어려워요...", next: "nervous", effect: { seoeun: +3, stress: +10 } }
            ]
        }
    ],

    passBy: [
        {
            speaker: "내레이션",
            text: "용기가 나지 않아 그냥 지나쳤습니다. 하지만 마음 한구석이 아쉬웠어요.",
            character: "neutral",
            choices: [
                { text: "다음 기회를 기다린다", next: "secondChance", effect: { confidence: -5 } },
                { text: "SNS에서 찾아본다", next: "findOnSNS", effect: { stress: +8 } }
            ]
        }
    ],

    askFriend: [
        {
            speaker: "친구",
            text: "서은 선배? 완전 인기 많아! 근데 왜? 혹시...? 😏",
            character: "happy",
            choices: [
                { text: "관심있다고 솔직히 말한다", next: "honestFriend", effect: { confidence: +8 } },
                { text: "그냥 궁금해서라고 한다", next: "denyInterest", effect: { stress: +5 } }
            ]
        }
    ],

    naturalTalk: [
        {
            speaker: "서은",
            text: "아, 네! 맞아요. 그 수업 정말 어렵죠? 교수님이 과제도 많이 내주시고... 궁금한점 있으세요?",
            character: "seoeun",
            choices: [
                { text: "네! 사실 많이 헷갈리는 부분이 있어요", next: "acceptStudy", effect: { seoeun: +15, confidence: +10 } },
                { text: "음... 혼자서도 할 수 있을 것 같아요", next: "maybeStudy", effect: { seoeun: +5 } }
            ]
        }
    ],

    nervous: [
        {
            speaker: "서은",
            text: "어? 괜찮으세요? 많이 떨리시는 것 같은데... 혹시 첫 수업이라 긴장되세요?",
            character: "seoeun",
            choices: [
                { text: "아... 네, 조금 긴장돼서요", next: "admitNervous", effect: { seoeun: +8 } },
                { text: "아니에요! 괜찮습니다!", next: "denyNervous", effect: { stress: +15 } }
            ]
        }
    ],

    acceptStudy: [
        {
            speaker: "내레이션",
            text: "첫 만남이 성공적이었습니다! 서은과의 스터디가 시작되었고, 자연스럽게 가까워질 수 있었어요.",
            character: "happy",
            choices: [
                { text: "스터디를 진지하게 한다", next: "seriousStudy", effect: { seoeun: +10 } },
                { text: "대화를 더 많이 한다", next: "moreConversation", effect: { seoeun: +15, confidence: +5 } },
                { text: "몰래 서은을 보며 설렌다", next: "secretCrush", effect: { stress: +10, seoeun: +5 } }
            ]
        }
    ],

    moreConversation: [
        {
            speaker: "서은",
            text: "어? 생각보다 재밌네요! 원래 이렇게 말 잘하는 편이에요? 처음 봤을 때는 조용할 것 같았는데~",
            character: "seoeun",
            choices: [
                { text: "원래 친해지면 말이 많아져요", next: "talkative", effect: { seoeun: +12 } },
                { text: "선배와 있으니까 편해서요", next: "comfortable", effect: { seoeun: +18 } },
                { text: "선배가 대화를 잘 이끌어주셔서요", next: "compliment", effect: { seoeun: +15, confidence: +8 } }
            ]
        }
    ],

    comfortable: [
        {
            speaker: "서은",
            text: "편하다니... 고마워요. 저도 후배랑 있으면 편안해요. 이상하게 같이 있으면 시간이 빨리 가는 것 같아요.",
            character: "seoeun",
            choices: [
                { text: "저도 그래요! 정말 신기해요", next: "mutualFeeling", effect: { seoeun: +20 } },
                { text: "다음에도 함께 공부해요", next: "nextStudy", effect: { seoeun: +15 } },
                { text: "그럼 커피라도 한잔 할까요?", next: "suggestCoffee", effect: { seoeun: +10, confidence: +10 } }
            ]
        }
    ],

    suggestCoffee: [
        {
            speaker: "서은",
            text: "커피? 좋아요! 사실 조금 졸리기도 했어요. 어디로 갈까요?",
            character: "seoeun",
            choices: [
                { text: "학교 앞 카페로 가자", next: "campusCafe", effect: { seoeun: +8 } },
                { text: "조금 멀지만 예쁜 카페 알아요", next: "prettyCafe", effect: { seoeun: +15, stress: +5 } },
                { text: "편의점 커피도 괜찮아요", next: "convenienceCoffee", effect: { seoeun: +5, confidence: -3 } }
            ]
        }
    ],

    prettyCafe: [
        {
            speaker: "서은",
            text: "와! 정말 예쁘네요! 이런 곳을 어떻게 알았어요? 되게 이쁜 카페네요~",
            character: "seoeun",
            choices: [
                { text: "예전에 우연히 발견했어요", next: "foundBefore", effect: { seoeun: +10 } },
                { text: "특별한 날에만 오는 곳이에요", next: "specialPlace", effect: { seoeun: +18, confidence: +8 } },
                { text: "선배가 좋아할 것 같아서요", next: "thoughtOfYou", effect: { seoeun: +25 } }
            ]
        }
    ],

    thoughtOfYou: [
        {
            speaker: "서은",
            text: "저를... 생각해서요? 어떻게 제가 뭘 좋아하는지 알았죠? 신기해요~",
            character: "seoeun",
            choices: [
                { text: "관찰력이 좋거든요", next: "observant", effect: { seoeun: +15, confidence: +10 } },
                { text: "...선배한테 관심이 있어서요", next: "confession", effect: { seoeun: +30, stress: +20 } },
                { text: "그냥 느낌이었어요", next: "justFeeling", effect: { seoeun: +12 } }
            ]
        }
    ],

    confession: [
        {
            speaker: "서은",
            text: "에? 저한테... 관심이? 진짜요? 어떤 관심인데요? 😳",
            character: "seoeun",
            choices: [
                { text: "좋아한다고 솔직히 말한다", next: "directConfession", effect: { seoeun: +20, stress: +30 } },
                { text: "선배가 멋있어서요", next: "indirectConfession", effect: { seoeun: +15, stress: +10 } },
                { text: "그냥... 친구로서요", next: "backDown", effect: { seoeun: -5, confidence: -15 } }
            ]
        }
    ],

    directConfession: [
        {
            speaker: "서은",
            text: "와... 진짜 직진이네요! 😊 저도... 사실 후배가가 말 걸어왔을 때부터 뭔가 특별한 느낌이었어요.",
            character: "seoeun",
            choices: [
                { text: "그럼 우리 사귈까요?", next: "askToDating", effect: { seoeun: +25, confidence: +20 } },
                { text: "정말요? 기뻐요!", next: "happy", effect: { seoeun: +20 } },
                { text: "천천히 알아가봐요", next: "takeItSlow", effect: { seoeun: +15, confidence: +5 } }
            ]
        }
    ],

    askToDating: [
        {
            speaker: "서은",
            text: "네! 좋아요! 근데... 뭔가 부끄럽네요. 어떻게 하면 좋을까요? 😊",
            character: "seoeun",
            choices: [
                { text: "저도 처음이라 떨려요", next: "bothFirst", effect: { seoeun: +20, dating: true } },
                { text: "같이 천천히 배워가요", next: "learnTogether", effect: { seoeun: +25, dating: true } },
                { text: "제가 리드할게요", next: "takeLead", effect: { seoeun: +15, confidence: +15, dating: true } }
            ]
        }
    ],

    awkwardGreeting: [
        {
            speaker: "서은",
            text: "아... 안녕하세요! 후배님이시죠? 조금 어색하네요... 😅",
            character: "seoeun",
            choices: [
                { text: "죄송해요... 조금 긴장했어요", next: "relaxedChat", effect: { seoeun: +10, stress: -5 } },
                { text: "네... 선배님께서 너무 멋있어서요", next: "flatteredReply", effect: { seoeun: +15, confidence: -5 } }
            ]
        }
    ],

    relaxedChat: [
        {
            speaker: "서은",
            text: "괜찮아요! 저도 처음엔 다들 어색했어요. 같이 이야기하면서 편해질 수 있을 거예요!",
            character: "seoeun",
            choices: [
                { text: "네, 감사합니다!", next: "friendlyChat", effect: { seoeun: +20, confidence: +10 } },
                { text: "선배님이 친절하시네요", next: "friendlyChat", effect: { seoeun: +15 } }
            ]
        }
    ],

    flatteredReply: [
        {
            speaker: "서은",
            text: "에이, 그런 말씀은... 부끄럽네요! 😊 그래도 고마워요.",
            character: "seoeun",
            choices: [
                { text: "정말 그렇게 생각해요", next: "friendlyChat", effect: { seoeun: +25, confidence: +5 } },
                { text: "앞으로 자주 뵐 수 있을까요?", next: "friendlyChat", effect: { seoeun: +20 } }
            ]
        }
    ],

    friendlyChat: [
        {
            speaker: "서은",
            text: "우리 이제 친해졌으니 편하게 대화해요! 혹시 학교 생활은 어떠신가요?",
            character: "seoeun",
            choices: [
                { text: "아직 적응 중이에요", next: "helpAdapt", effect: { seoeun: +20 } },
                { text: "괜찮아요! 선배님은요?", next: "shareExperience", effect: { seoeun: +25 } }
            ]
        }
    ],

    learnTogether: [
        {
            speaker: "내레이션",
            text: "이렇게 당신과 서은의 연애가 시작되었습니다! 첫 번째 공식 데이터를 계획해보세요.",
            character: "happy",
            choices: [
                { text: "영화 보러 가자", next: "movieDate", effect: { seoeun: +10 } },
                { text: "놀이공원 가자", next: "amusementPark", effect: { seoeun: +15, stress: +10 } },
                { text: "조용한 곳에서 산책하자", next: "walkDate", effect: { seoeun: +12, confidence: +5 } },
                { text: "맛집 탐방하자", next: "foodDate", effect: { seoeun: +18 } }
            ]
        }
    ],

    movieDate: [
        {
            speaker: "서은",
            text: "영화 좋아요! 뭐로 볼까요?",
            character: "seoeun",
            choices: [
                { text: "로맨스", next: "romanceMovie", effect: { seoeun: +15 } },
                { text: "코미디", next: "comedyMovie", effect: { seoeun: +12, stress: -5 } },
                { text: "선배가 좋아하는걸로", next: "herChoice", effect: { seoeun: +10 } },
                { text: "공포", next: "horrorMovie", effect: { seoeun: +8, stress: +10 } }
            ]
        }
    ],

    romanceMovie: [
        {
            speaker: "내레이션",
            text: "로맨스 영화를 보던 중, 감동적인 장면에서 서은이 당신 어깨에 머리를 기댔습니다. 심장이 쿵쾅쿵쾅!",
            character: "seoeun",
            choices: [
                { text: "가만히 있는다", next: "stayStill", effect: { seoeun: +15, stress: +15 } },
                { text: "살짝 손을 잡는다", next: "holdHand", effect: { seoeun: +20, confidence: +10 } },
                { text: "어깨를 더 편하게 해준다", next: "adjustShoulder", effect: { seoeun: +18 } }
            ]
        }
    ],

    horrorMovie: [
        {
            speaker: "서은",
            text: "공포 영화요? 어머... 저 무서운 거 잘 못 봐요. 😨 그래도 당신이랑 같이 보면 괜찮을 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "제가 보호해드릴게요", next: "protectFromHorror", effect: { seoeun: +20, confidence: +15 } },
                { text: "무서우면 언제든 말해요", next: "safeWithMe", effect: { seoeun: +15, confidence: +10 } },
                { text: "같이 무서워하면 돼요", next: "scaredTogether", effect: { seoeun: +18, stress: +5 } }
            ]
        }
    ],

    protectFromHorror: [
        {
            speaker: "내레이션",
            text: "무서운 장면이 나올 때마다 서은이 당신 팔을 꽉 붙잡았습니다. '어머! 무서워!' 하며 당신 품에 파고드는 서은을 보며 든든한 남자친구 역할을 톡톡히 했어요.",
            character: "seoeun",
            choices: [
                { text: "괜찮다고 토닥인다", next: "comfortHer", effect: { seoeun: +25, confidence: +15 } },
                { text: "더 가까이 안아준다", next: "hugCloser", effect: { seoeun: +30, stress: +15 } },
                { text: "영화에 집중하게 해준다", next: "focusOnMovie", effect: { seoeun: +15, confidence: +10 } }
            ]
        }
    ],

    safeWithMe: [
        {
            speaker: "서은",
            text: "고마워요! 당신이 옆에 있으니까 정말 든든해요. 어? 그런데 이 장면... 으악! 😱",
            character: "seoeun",
            choices: [
                { text: "눈을 가려준다", next: "coverEyes", effect: { seoeun: +22, confidence: +12 } },
                { text: "손을 꽉 잡아준다", next: "holdHandTight", effect: { seoeun: +25, confidence: +10 } },
                { text: "같이 소리친다", next: "screamTogether", effect: { seoeun: +20, stress: +10 } }
            ]
        }
    ],

    comfortHer: [
        {
            speaker: "서은",
            text: "당신이 토닥여주니까 정말 안심이 돼요... 😊 무서운 영화도 당신과 함께라면 괜찮을 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "항상 지켜드릴게요", next: "sweetCouple" },
                { text: "다음엔 로맨스 영화 보죠", next: "mindReader" }
            ]
        }
    ],

    hugCloser: [
        {
            speaker: "서은",
            text: "이렇게 안아주시니까... 😳 무서움보다 심장이 더 두근거려요! 영화가 끝나도 계속 이렇게 있고 싶어요.",
            character: "seoeun",
            choices: [
                { text: "저도 같은 마음이에요", next: "perfectLove" },
                { text: "언제든 안아드릴게요", next: "empathyKing" }
            ]
        }
    ],

    focusOnMovie: [
        {
            speaker: "서은",
            text: "맞아요! 영화에 집중해야죠. 당신이 차분하게 말해주니까 덜 무서워져요!",
            character: "seoeun",
            choices: [
                { text: "영화 끝나고 얘기해요", next: "communicationExpert" },
                { text: "재미있게 보세요", next: "sweetCouple" }
            ]
        }
    ],

    coverEyes: [
        {
            speaker: "서은",
            text: "눈을 가려주시다니... 정말 세심하세요! 😊 이렇게 배려심 많은 사람을 만나다니 행운이에요!",
            character: "seoeun",
            choices: [
                { text: "당신이 더 소중해요", next: "perfectLove" },
                { text: "배려는 당연한 거예요", next: "empathyKing" }
            ]
        }
    ],

    holdHandTight: [
        {
            speaker: "서은",
            text: "손을 꽉 잡아주시니까 정말 든든해요! 💕 무서운 게 전혀 안 무서워져요!",
            character: "seoeun",
            choices: [
                { text: "계속 잡고 있을게요", next: "sweetCouple" },
                { text: "언제든 의지하세요", next: "empathyKing" }
            ]
        }
    ],

    screamTogether: [
        {
            speaker: "서은",
            text: "같이 소리치니까 무섭지만 재미있어요! 😄 당신도 무서워하는 모습이 귀여워요!",
            character: "seoeun",
            choices: [
                { text: "같이 무서워하는 것도 재미있네요", next: "sweetCouple" },
                { text: "다음엔 더 무서운 영화 봐요", next: "manlyConfidence" }
            ]
        }
    ],

    holdHand: [
        {
            speaker: "서은",
            text: "어? 😳 손이... 따뜻하네요. 영화보다 더 떨리는 것 같아요.",
            character: "seoeun",
            choices: [
                { text: "저도 떨려요", next: "mutualNervous", effect: { seoeun: +20 } },
                { text: "손 놓을까요?", next: "letGo", effect: { seoeun: +5, confidence: -5 } },
                { text: "앞으로 계속 잡고 있을까요?", next: "keepHolding", effect: { seoeun: +25, confidence: +15 } }
            ]
        }
    ],

    amusementPark: [
        {
            speaker: "서은",
            text: "놀이공원! 완전 좋아요! 근데... 무서운 거 많이 못 타요. 어떻게 하죠? 😅",
            character: "seoeun",
            choices: [
                { text: "같이 무서워하면 돼요", next: "scaredTogether", effect: { seoeun: +20, stress: +5 } },
                { text: "제가 보호해드릴게요", next: "protect", effect: { seoeun: +25, confidence: +15 } },
                { text: "순한 거만 타요", next: "gentleRides", effect: { seoeun: +15 } }
            ]
        }
    ],

    protect: [
        {
            speaker: "내레이션",
            text: "롤러코스터에서 서은이 당신 팔을 꽉 붙잡으며 비명을 질렀습니다. 당신은 든든한 남자친구 역할을 완벽하게 해냈어요!",
            character: "happy",
            choices: [
                { text: "괜찮다고 토닥인다", next: "comfort", effect: { seoeun: +20 } },
                { text: "다음엔 더 순한 걸 타자", next: "gentleNext", effect: { seoeun: +15 } },
                { text: "용감했다고 칭찬한다", next: "praise", effect: { seoeun: +25, confidence: +10 } }
            ]
        }
    ],

    foodDate: [
        {
            speaker: "서은",
            text: "맛집 탐방! 완전 제 취향이에요! 어떤 음식 좋아해요? 저는 달달한 디저트를 엄청 좋아해요!",
            character: "seoeun",
            choices: [
                { text: "디저트 카페 투어하자", next: "dessertTour", effect: { seoeun: +25 } },
                { text: "이탈리안 레스토랑 가자", next: "italian", effect: { seoeun: +15, stress: +5 } },
                { text: "길거리 음식 먹자", next: "streetFood", effect: { seoeun: +20, confidence: +5 } }
            ]
        }
    ],

    dessertTour: [
        {
            speaker: "서은",
            text: "와! 이 티라미수 정말 맛있어요! 한 입 드셔보세요! 아~ 입 벌려봐요!",
            character: "seoeun",
            choices: [
                { text: "아~ 하고 받아먹는다", next: "feeding", effect: { seoeun: +30, stress: +10 } },
                { text: "저도 선배한테 먹여드릴게요", next: "feedBack", effect: { seoeun: +25, confidence: +15 } },
                { text: "부끄러워하며 거절한다", next: "shy", effect: { seoeun: +10, confidence: -5 } }
            ]
        }
    ],

    feeding: [
        {
            speaker: "서은",
            text: "어머! 진짜 귀여워요! 😍 다른 사람들이 보고 있는데 이런 거 해도 되나요? 부끄럽긴 하지만... 좋아요.",
            character: "seoeun",
            choices: [
                { text: "우리끼리만 아는 것으로", next: "secretCouple", effect: { seoeun: +20 } },
                { text: "당당하게 연인이라고 하자", next: "proudCouple", effect: { seoeun: +25, confidence: +20 } },
                { text: "미안해요, 너무 급했나요?", next: "apologize", effect: { seoeun: +5, confidence: -10 } }
            ]
        }
    ],

    // 연애 진행 중 갈등 상황들
    firstFight: [
        {
            speaker: "내레이션",
            text: "사귄 지 한 달이 지났을 때, 첫 번째 작은 갈등이 생겼습니다. 서은이 남자 선배들과 단체 모임에 간다고 했어요.",
            character: "neutral",
            choices: [
                { text: "괜찮다고 말한다", next: "understanding", effect: { seoeun: +15, confidence: +10 } },
                { text: "조금 걱정된다고 말한다", next: "worried", effect: { seoeun: +5, stress: +15 } },
                { text: "가지 말라고 한다", next: "forbid", effect: { seoeun: -20, stress: +25 } }
            ]
        }
    ],

    understanding: [
        {
            speaker: "서은",
            text: "정말? 걱정 안 돼요? 다른 남자친구들은 싫어한다던데... 당신은 정말 특별해요. 믿어줘서 고마워요.",
            character: "seoeun",
            choices: [
                { text: "믿고 있어요", next: "trust", effect: { seoeun: +25, confidence: +15 } },
                { text: "재미있게 다녀와요", next: "haveFunc", effect: { seoeun: +20 } },
                { text: "연락은 가끔 해줘요", next: "stayInTouch", effect: { seoeun: +15, stress: +5 } }
            ]
        }
    ],

    // 민수 등장 (재미 요소)
    meetMinsu: [
        {
            speaker: "서은",
            text: "아! 소개할게요. 이분이 제 남자친구고, 이쪽은 민수 오빠. 고등학교 동창이에요!",
            character: "seoeun",
            choices: [
                { text: "안녕하세요! 잘 부탁드려요", next: "politeGreeting", effect: { seoeun: +10, confidence: +5 } },
                { text: "아, 민수씨! 서은이가 많이 얘기했어요", next: "knowAbout", effect: { seoeun: +15 } },
                { text: "...(경계심을 갖는다)", next: "suspicious", effect: { seoeun: -5, stress: +20 } }
            ]
        }
    ],

    politeGreeting: [
        {
            speaker: "민수",
            text: "오! 이 친구가 서은이가 맨날 얘기하던 그 남자친구구나! 진짜 괜찮은 사람 같네. 서은이 잘 부탁해!",
            character: "minsu",
            choices: [
                { text: "저야말로 잘 부탁드려요", next: "goodRelation", effect: { seoeun: +20, confidence: +10 } },
                { text: "서은이가 저 얘기 했나요?", next: "curious", effect: { seoeun: +15, stress: +5 } },
                { text: "네, 최선을 다하겠습니다", next: "serious", effect: { seoeun: +12, confidence: +8 } }
            ]
        }
    ],

    // 재미있는 일상 상황들
    morningCall: [
        {
            speaker: "서은",
            text: "좋은 아침! 혹시 깨웠나요? 일찍 일어나서 당신 생각이 나서 전화했어요~ ☀️",
            character: "seoeun",
            choices: [
                { text: "좋은 아침! 목소리 들으니 좋아요", next: "sweetMorning", effect: { seoeun: +15 } },
                { text: "아직 잠들어있었는데요...", next: "sleepy", effect: { seoeun: +5, stress: +5 } },
                { text: "저도 서은이 생각하고 있었어요", next: "thinkingOfYou", effect: { seoeun: +25 } }
            ]
        }
    ],

    surpriseGift: [
        {
            speaker: "내레이션",
            text: "서은의 생일이 다가옵니다. 어떤 선물을 준비할까요?",
            character: "neutral",
            choices: [
                { text: "직접 만든 선물", next: "handmadeGift", effect: { seoeun: +30, confidence: +10 } },
                { text: "비싼 액세서리", next: "expensiveGift", effect: { seoeun: +15, stress: +15 } },
                { text: "깜짝 파티 준비", next: "surpriseParty", effect: { seoeun: +35, stress: +20 } },
                { text: "평범한 선물", next: "simpleGift", effect: { seoeun: +10 } }
            ]
        }
    ],

    handmadeGift: [
        {
            speaker: "서은",
            text: "어머! 이거 직접 만든 거예요? 완전 감동이에요! 😭 시간이 얼마나 걸렸어요? 정말 정성이 느껴져요!",
            character: "seoeun",
            choices: [
                { text: "서은이를 위해서라면", next: "anythingForYou", effect: { seoeun: +25, confidence: +15 } },
                { text: "별거 아니에요", next: "modest", effect: { seoeun: +10, confidence: -5 } },
                { text: "마음에 들어서 다행이에요", next: "gladYouLike", effect: { seoeun: +20 } }
            ]
        }
    ],

    // 갈등과 위기 상황들
    jealousyIssue: [
        {
            speaker: "내레이션",
            text: "서은이 SNS에 민수와 함께 찍은 사진을 올렸습니다. 다른 친구들과 함께였지만 왠지 신경이 쓰입니다.",
            character: "neutral",
            choices: [
                { text: "아무렇지 않은 척 한다", next: "pretendFine", effect: { stress: +20, confidence: -5 } },
                { text: "솔직하게 기분을 말한다", next: "honestFeelings", effect: { seoeun: +10, stress: +10 } },
                { text: "사진에 댓글을 단다", next: "commentPhoto", effect: { seoeun: +5 } }
            ]
        }
    ],

    honestFeelings: [
        {
            speaker: "서은",
            text: "어? 질투 나는 거예요? 그냥 친구들이랑 논 건데... 하지만 기분 나쁘다면 앞으로 조심할게요.",
            character: "seoeun",
            choices: [
                { text: "고마워요, 이해해줘서", next: "understanding2", effect: { seoeun: +15, stress: -10 } },
                { text: "아니에요, 제가 예민했나봐요", next: "apologetic", effect: { seoeun: +8, confidence: -8 } },
                { text: "조금 더 신경써주면 좋겠어요", next: "askConsideration", effect: { seoeun: +12, stress: +5 } }
            ]
        }
    ],

    bigFight: [
        {
            speaker: "서은",
            text: "요즘 너무 의심 많은 것 같아요. 친구들이랑 놀 때마다 확인하고, 연락 안 되면 화내고... 이게 연애인가요?",
            character: "seoeun",
            choices: [
                { text: "미안해요, 제가 잘못했어요", next: "sincereApology", effect: { seoeun: +15, confidence: -10 } },
                { text: "그럼 저는 어떻게 해야 해요?", next: "defensive", effect: { seoeun: -10, stress: +20 } },
                { text: "앞으로 바뀔게요", next: "promiseChange", effect: { seoeun: +20, confidence: +5 } }
            ]
        }
    ],

    breakupTalk: [
        {
            speaker: "서은",
            text: "우리... 조금 쉬어야 할 것 같아요. 서로 힘들어하는 게 보여요. 사랑하지만... 지금은 아닌 것 같아요.",
            character: "seoeun",
            choices: [
                { text: "한 번만 더 기회를 줘요", next: "pleadChance", effect: { seoeun: +5, stress: +30 } },
                { text: "이해해요... 저도 그렇게 생각했어요", next: "agreeBreakup", effect: { seoeun: +10, confidence: +10 } },
                { text: "절대 안 돼요! 포기할 수 없어요!", next: "refuse", effect: { seoeun: -15, stress: +40 } }
            ]
        }
    ],

    // 헤어진 후
    afterBreakup: [
        {
            speaker: "내레이션",
            text: "그렇게 서은과 헤어진 지 한 달이 지났습니다. 어떻게 지내고 계신가요?",
            character: "neutral",
            choices: [
                { text: "혼자만의 시간을 갖는다", next: "soloTime", effect: { confidence: +15, stress: -20 } },
                { text: "친구들과 어울린다", next: "hangWithFriends", effect: { stress: -15, confidence: +10 } },
                { text: "계속 서은을 그리워한다", next: "stillMissing", effect: { stress: +25, confidence: -10 } },
                { text: "새로운 취미를 시작한다", next: "newHobby", effect: { confidence: +20, stress: -15 } }
            ]
        }
    ],

    soloTime: [
        {
            speaker: "주인공",
            text: "혼자만의 시간을 가지면서 많은 걸 생각해봤어. 내가 뭘 잘못했는지, 어떻게 변해야 하는지...",
            character: "neutral",
            choices: [
                { text: "내 문제점들을 정리한다", next: "reflectProblems", effect: { confidence: +20 } },
                { text: "서은에게 사과하고 싶어진다", next: "wantApology", effect: { seoeun: +10, stress: +15 } },
                { text: "새로운 나로 거듭나자", next: "newMe", effect: { confidence: +25 } }
            ]
        }
    ],

    stillMissing: [
        {
            speaker: "주인공",
            text: "아직도 서은이가 그리워. SNS 계속 확인하고, 우리가 자주 갔던 곳들을 혼자 가보기도 하고...",
            character: "sad",
            choices: [
                { text: "연락해볼까?", next: "considerContact", effect: { stress: +20 } },
                { text: "이제 그만 잊자", next: "tryForget", effect: { confidence: +15, stress: -10 } },
                { text: "친구한테 상담받는다", next: "consultFriend", effect: { stress: -15 } }
            ]
        }
    ],

    considerContact: [
        {
            speaker: "내레이션",
            text: "서은에게 연락할까 말까 고민하는 당신. 어떻게 하시겠습니까?",
            character: "neutral",
            choices: [
                { text: "용기내서 연락한다", next: "contactseoeun", effect: { stress: +25 } },
                { text: "좀 더 기다린다", next: "waitMore", effect: { confidence: +5 } },
                { text: "연락하지 않기로 한다", next: "decideDontContact", effect: { confidence: +15 } }
            ]
        }
    ],

    contactseoeun: [
        {
            speaker: "서은",
            text: "어? 웬일이에요? 연락올 줄 몰랐는데... 어떻게 지내세요?",
            character: "seoeun",
            choices: [
                { text: "보고 싶어서 연락했어요", next: "missYou", effect: { seoeun: +15, stress: +20 } },
                { text: "사과하고 싶어서요", next: "apologizeCall", effect: { seoeun: +20 } },
                { text: "그냥 안부가 궁금해서요", next: "casualCheck", effect: { seoeun: +10 } }
            ]
        }
    ],

    // 재회 가능성
    meetAgain: [
        {
            speaker: "내레이션",
            text: "몇 개월 후, 우연히 서은을 마주쳤습니다. 많이 변한 모습이 보입니다.",
            character: "seoeun",
            choices: [
                { text: "반갑게 인사한다", next: "friendlyGreeting", effect: { seoeun: +15 } },
                { text: "어색해하며 인사한다", next: "awkwardGreeting", effect: { seoeun: +5, stress: +10 } },
                { text: "지나가는 척 한다", next: "avoidContact", effect: { confidence: -10 } }
            ]
        }
    ],

    friendlyGreeting: [
        {
            speaker: "서은",
            text: "어머! 우연이네요! 어떻게 지내세요? 많이 달라 보이는데요? 뭔가... 성숙해진 느낌?",
            character: "seoeun",
            choices: [
                { text: "많이 반성하고 변했어요", next: "showChange", effect: { seoeun: +20, confidence: +15 } },
                { text: "서은씨도 예뻐지신 것 같아요", next: "compliment", effect: { seoeun: +15 } },
                { text: "커피라도 마실까요?", next: "suggestCoffee2", effect: { seoeun: +12, stress: +15 } }
            ]
        }
    ],

    // 더 현실적인 갈등 상황들
    exBoyfriendTruth: [
        {
            speaker: "서은",
            text: "사실... 민수 오빠와는 4년째 친구로 지내고 있어요. 고등학교 때 일주일 정도 사귀었는데, 서로 친구로 지내자고 해서... 그냥 계속 친구예요.",
            character: "seoeun",
            choices: [
                { text: "아, 그렇구나. 괜찮아", next: "pretendOkay", effect: { seoeun: +5, stress: +25 } },
                { text: "4년째? 좀 이상하지 않아?", next: "questionRelation", effect: { seoeun: -10, stress: +15 } },
                { text: "일주일 사귀고 친구? 진짜로?", next: "doubtStory", effect: { seoeun: -15, confidence: +10 } }
            ]
        }
    ],

    pretendOkay: [
        {
            speaker: "내레이션",
            text: "괜찮다고 말했지만 속으로는 많이 신경 쓰입니다. 4년째 연락하는 전남친이라니... 정말 친구일까요?",
            character: "neutral",
            choices: [
                { text: "계속 신경 안 쓰는 척 한다", next: "keepPretending", effect: { stress: +30, confidence: -10 } },
                { text: "솔직하게 불편하다고 말한다", next: "honestDiscomfort", effect: { seoeun: +8, stress: +10 } },
                { text: "민수에 대해 더 알아본다", next: "investigateMinsu", effect: { stress: +20 } }
            ]
        }
    ],

    partyInvitation: [
        {
            speaker: "서은",
            text: "이번 주말에 친구들이랑 파티 있는데... 민수 오빠도 올 거야. 당신도 같이 갈래? 친구들한테 소개해주고 싶어!",
            character: "seoeun",
            choices: [
                { text: "좋아요! 가겠습니다", next: "acceptParty", effect: { seoeun: +15, stress: +20 } },
                { text: "민수씨도 온다고요?", next: "askAboutMinsu", effect: { seoeun: -5, stress: +15 } },
                { text: "파티보다 둘이서 있어요", next: "suggestAlone", effect: { seoeun: -8, confidence: +5 } }
            ]
        }
    ],

    atParty: [
        {
            speaker: "내레이션",
            text: "파티장에서 서은이 민수를 부릅니다. '민수 오빠! 여기 와서 내 남자친구 만나봐!' 민수가 다가옵니다.",
            character: "neutral",
            choices: [
                { text: "밝게 인사한다", next: "friendlyGreeting2", effect: { seoeun: +10, confidence: -5 } },
                { text: "적당히 인사한다", next: "moderateGreeting", effect: { confidence: +5 } },
                { text: "냉담하게 대한다", next: "coldGreeting", effect: { seoeun: -10, confidence: +15 } }
            ]
        }
    ],

    friendlyGreeting2: [
        {
            speaker: "내레이션",
            text: "당신은 활짝 웃으며 민수에게 다가가 악수를 청했습니다. 민수도 웃으며 응답하지만... 왠지 자신이 과하게 살갑게 대한것 같은 기분이 듭니다.",
            character: "neutral",
            choices: [
                { text: "이런 내가 한심하다", next: "regretFriendly", effect: { confidence: -15, stress: +25 } },
                { text: "그래도 예의는 지켰다", next: "justPolite", effect: { confidence: -5, stress: +10 } },
                { text: "다음엔 이러지 말아야지", next: "learnLesson", effect: { confidence: +10, stress: +15 } }
            ]
        }
    ],

    regretFriendly: [
        {
            speaker: "주인공",
            text: "아... 왜 저렇게 밝게 인사했을까? 마치 민수한테 '저는 위협이 안 됩니다'라고 말하는 것 같았어. 서은이 앞에서 너무 만만하게 보였나?",
            character: "sad",
            choices: [
                { text: "다음부터는 절대 굽신거리지 않겠다", next: "noMoreBowing", effect: { confidence: +20, stress: +10 } },
                { text: "서은이한테 물어본다", next: "askseoeun", effect: { seoeun: +5, stress: +15 } },
                { text: "그냥 내 성격이니까", next: "acceptPersonality", effect: { confidence: -10 } }
            ]
        }
    ],

    noMoreBowing: [
        {
            speaker: "주인공",
            text: "다음부터는 절대 굽신거리지 않겠어. 예의는 지키되, 전남친 앞에서 쩔쩔매는 모습은 보이지 않을 거야. 나도 당당한 남자친구인데.",
            character: "neutral",
            choices: [
                { text: "자신감을 가지자", next: "buildConfidence2", effect: { confidence: +25 } },
                { text: "적당한 거리를 유지하자", next: "keepDistance", effect: { confidence: +15, stress: -5 } },
                { text: "서은이와 이 문제를 얘기하자", next: "discussWithseoeun", effect: { seoeun: +10, stress: +10 } }
            ]
        }
    ],

    womenLogic: [
        {
            speaker: "내레이션",
            text: "며칠 후, 서은이 또 다른 친구 모임에 가겠다고 합니다. 당신이 '안 갔으면 좋겠어'라고 하자 서은이 화를 냅니다.",
            character: "seoeun",
            choices: [
                { text: "알겠어요, 가세요", next: "givePermission", effect: { seoeun: +5, confidence: -10 } },
                { text: "저도 함께 가겠습니다", next: "insistJoin", effect: { seoeun: -5, confidence: +10 } },
                { text: "왜 화를 내는지 모르겠어요", next: "confused", effect: { stress: +15 } }
            ]
        }
    ],

    realizePattern: [
        {
            speaker: "주인공",
            text: "어? 잠깐... 서은이가 '안 가도 돼', '하지마'라고 말할 때마다 내가 그대로 들었더니 오히려 싸움이 났었어. 혹시 여자들의 '하지마'는 '하라는 뜻'인 건가?",
            character: "neutral",
            choices: [
                { text: "그동안 너무 순진했다", next: "tooNaive", effect: { confidence: +15, stress: +10 } },
                { text: "이제 눈치를 좀 봐야겠다", next: "readBetweenLines", effect: { confidence: +20 } },
                { text: "솔직하게 서은이한테 물어보자", next: "askDirectly", effect: { seoeun: +10, stress: +5 } }
            ]
        }
    ],

    tooNaive: [
        {
            speaker: "주인공",
            text: "그동안 너무 순진했구나... 서은이가 '민수 오빠 질투하지마', '친구 모임 신경쓰지마'라고 할 때마다 곧이곧대로 듣고 있었어. 그게 오히려 나를 만만하게 만든 거였나?",
            character: "neutral",
            choices: [
                { text: "이제 좀 더 주도적으로 행동하자", next: "takeInitiative", effect: { confidence: +25, seoeun: +10 } },
                { text: "적당히 질투도 표현해야겠다", next: "showJealousy", effect: { confidence: +15, seoeun: +15 } },
                { text: "하지만 너무 변하면 안 되겠다", next: "balanced", effect: { confidence: +10 } }
            ]
        }
    ],

    showJealousy: [
        {
            speaker: "서은",
            text: "어? 오늘 왜 이래? 평소와 다르네? 민수 오빠 얘기만 나오면 표정이 굳어져. 예전엔 괜찮다고 했잖아?",
            character: "seoeun",
            choices: [
                { text: "사실 처음부터 불편했어요", next: "confessDiscomfort", effect: { seoeun: +20, confidence: +15 } },
                { text: "좀 더 신경써주면 좋겠어요", next: "askConsideration2", effect: { seoeun: +15, confidence: +10 } },
                { text: "아니에요, 그냥 피곤해서", next: "deny", effect: { seoeun: -5, confidence: -10 } }
            ]
        }
    ],

    confessDiscomfort: [
        {
            speaker: "서은",
            text: "정말? 그럼 왜 진작 말 안 했어요? 나는 당신이 정말 괜찮은 줄 알았는데... 속으로 참고 있었구나. 미안해요.",
            character: "seoeun",
            choices: [
                { text: "당신을 배려한다고 생각했어요", next: "considerate", effect: { seoeun: +25, confidence: +20 } },
                { text: "말해도 소용없을 것 같았어요", next: "hopeless", effect: { seoeun: +10, stress: +15 } },
                { text: "이제부터는 솔직하게 말할게요", next: "honest", effect: { seoeun: +30, confidence: +25 } }
            ]
        }
    ],

    manly: [
        {
            speaker: "주인공",
            text: "이제 좀 더 남자답게 행동해야겠어. 굽신거리지 않고, 내 의견도 확실히 표현하고, 서은이한테 휘둘리지 말자.",
            character: "neutral",
            choices: [
                { text: "주도권을 가져오자", next: "takeControl", effect: { confidence: +30, seoeun: +20 } },
                { text: "적당한 선에서", next: "moderateChange", effect: { confidence: +15, seoeun: +15 } },
                { text: "서은이 반응을 보면서", next: "watchReaction", effect: { confidence: +10, stress: +10 } }
            ]
        }
    ],

    // 여성 언어의 숨은 뜻 깨달음 스토리들
    womenLanguage: [
        {
            speaker: "주인공",
            text: "요즘 서은이와 대화하면서 뭔가 이상했어. 말과 진짜 의미가 다른 것 같은데... 혹시 여자들만의 특별한 언어가 있는 건가?",
            character: "neutral",
            choices: [
                { text: "구체적으로 분석해보자", next: "analyzeLanguage", effect: { confidence: +15 } },
                { text: "친구한테 물어보자", next: "askFriendAboutWomen", effect: { stress: +5 } },
                { text: "그냥 느낌으로 알아듣자", next: "feelingOnly", effect: { confidence: -5 } }
            ]
        }
    ],

    analyzeLanguage: [
        {
            speaker: "주인공",
            text: "차근차근 생각해보니... 서은이가 '뭐해?'라고 물을 때는 단순히 궁금한 게 아니라 '나랑 시간 보내자'는 뜻이었나? 그리고 '이거 어때?'는 '사주면 좋겠다'는 뜻이고...",
            character: "neutral",
            choices: [
                { text: "더 많은 패턴을 찾아보자", next: "findMorePatterns", effect: { confidence: +20 } },
                { text: "서은이한테 확인해보자", next: "confirmWithseoeun", effect: { seoeun: +10, stress: +10 } },
                { text: "이제 암묵적 의미를 이해했다", next: "understandImplicit", effect: { confidence: +25 } }
            ]
        }
    ],

    findMorePatterns: [
        {
            speaker: "주인공",
            text: "'나 화 안 났는데?'는 '몰라서 물어?'였고, '나 오늘 속상한 일 있었어'는 '내 편 들어달라'는 뜻이었구나. 그리고 '아 말걸지마'는 실제로는 '달래달라'는 신호였어!",
            character: "neutral",
            choices: [
                { text: "이제 완전히 이해했다", next: "completeUnderstanding", effect: { confidence: +30, seoeun: +25 } },
                { text: "실제로 적용해보자", next: "applyKnowledge", effect: { confidence: +20, seoeun: +15 } },
                { text: "너무 복잡하다...", next: "tooComplicated", effect: { stress: +20 } }
            ]
        }
    ],

    whatAreYouDoing: [
        {
            speaker: "서은",
            text: "뭐해? 😊",
            character: "seoeun",
            choices: [
                { text: "집에서 게임하고 있어", next: "honestAnswer", effect: { seoeun: -10 } },
                { text: "너 보고싶어서 폰만 보고 있었어", next: "sweetAnswer", effect: { seoeun: +20 } },
                { text: "서은이 만날 생각하고 있었어", next: "thinkingOfYou2", effect: { seoeun: +25 } }
            ]
        }
    ],

    sweetAnswer: [
        {
            speaker: "서은",
            text: "진짜? 그럼 나와서 같이 있을래? 혼자 있는 것보다 둘이 있는 게 더 좋잖아~ ❤️",
            character: "seoeun",
            choices: [
                { text: "지금 바로 나갈게!", next: "comeOutNow", effect: { seoeun: +20, confidence: +10 } },
                { text: "어디서 만날까?", next: "whereMeet", effect: { seoeun: +15 } },
                { text: "피곤해서 집에 있고 싶어", next: "wantStayHome", effect: { seoeun: -15, stress: +10 } }
            ]
        }
    ],

    howAboutThis: [
        {
            speaker: "서은",
            text: "쇼핑몰에서 예쁜 목걸이를 보고 있는 서은이가 말합니다. '이거 어때? 진짜 예쁘지 않아?'",
            character: "seoeun",
            choices: [
                { text: "응, 예뻐! 너한테 잘 어울릴 것 같아", next: "complimentOnly", effect: { seoeun: +5 } },
                { text: "예뻐! 사줄까?", next: "offerToBuy", effect: { seoeun: +25, stress: +5 } },
                { text: "비싸 보이는데?", next: "lookExpensive", effect: { seoeun: -10, confidence: -5 } }
            ]
        }
    ],

    offerToBuy: [
        {
            speaker: "서은",
            text: "정말? 😍 아니야, 괜찮아... 그냥 예쁘다고 생각해서... 하지만 사준다면 거절하지는 않을게 ❤️",
            character: "seoeun",
            choices: [
                { text: "그럼 선물할게!", next: "buyGift", effect: { seoeun: +30, confidence: +15 } },
                { text: "다음에 사줄게", next: "buyLater", effect: { seoeun: +10, stress: +5 } },
                { text: "농담이야", next: "justKidding", effect: { seoeun: -20, confidence: -15 } }
            ]
        }
    ],

    notAngry: [
        {
            speaker: "서은",
            text: "어제 약속 시간에 늦은 당신에게 서은이 말합니다. '나 화 안 났는데? 왜 자꾸 미안하다고 해?'",
            character: "seoeun",
            choices: [
                { text: "정말? 화 안 났어?", next: "reallyNotAngry", effect: { seoeun: -10, confidence: -10 } },
                { text: "화났는데 참고 있는 거지?", next: "knowYouAreAngry", effect: { seoeun: +15, confidence: +20 } },
                { text: "그래도 미안해", next: "stillSorry", effect: { seoeun: +10 } }
            ]
        }
    ],

    knowYouAreAngry: [
        {
            speaker: "서은",
            text: "...어? 어떻게 알았어? 😳 사실 조금 속상했어. 근데 당신이 알아차려줘서 기분이 좋아졌어.",
            character: "seoeun",
            choices: [
                { text: "앞으로는 절대 늦지 않을게", next: "promiseNotLate", effect: { seoeun: +25, confidence: +15 } },
                { text: "화난 거 티 내지 말고 말해줘", next: "tellMeDirectly", effect: { seoeun: +10, confidence: +10 } },
                { text: "여자 마음은 정말 모르겠어", next: "womenHeartHard", effect: { seoeun: +5, stress: +10 } }
            ]
        }
    ],

    sadDay: [
        {
            speaker: "서은",
            text: "나 오늘 속상한 일 있었어... 😢 교수님한테 혼났거든.",
            character: "seoeun",
            choices: [
                { text: "교수님이 왜 혼냈어?", next: "whyProfessorAngry", effect: { seoeun: -5 } },
                { text: "교수님이 너무했네! 당신 잘못이 아닐 거야", next: "takeHerSide", effect: { seoeun: +25, confidence: +10 } },
                { text: "많이 속상했겠다", next: "sympathize", effect: { seoeun: +15 } }
            ]
        }
    ],

    takeHerSide: [
        {
            speaker: "서은",
            text: "그치? 당신은 내 편이어서 좋아! 다른 사람들은 다 '네가 뭘 잘못했나?'라고 물어보던데... 당신만 내 마음을 알아줘 ❤️",
            character: "seoeun",
            choices: [
                { text: "난 항상 네 편이야", next: "alwaysYourSide", effect: { seoeun: +30, confidence: +20 } },
                { text: "속상할 때는 언제든 말해줘", next: "tellMeWhenSad", effect: { seoeun: +20 } },
                { text: "그래도 진짜 이유는 뭐야?", next: "butRealReason", effect: { seoeun: -10, confidence: -5 } }
            ]
        }
    ],

    dontTalkToMe: [
        {
            speaker: "서은",
            text: "싸운 후 서은이가 말합니다. '아... 말걸지마. 지금 기분 안 좋아.'",
            character: "seoeun",
            choices: [
                { text: "알겠어, 혼자 있고 싶으면 그렇게 해", next: "leaveAlone", effect: { seoeun: -20, confidence: -10 } },
                { text: "화 풀릴 때까지 계속 달래준다", next: "keepComforting", effect: { seoeun: +25, stress: +15 } },
                { text: "잠시 시간 갖고 나중에 이야기하자", next: "talkLater", effect: { seoeun: +10, confidence: +5 } }
            ]
        }
    ],

    keepComforting: [
        {
            speaker: "서은",
            text: "처음엔 계속 외면했지만, 당신이 포기하지 않고 달래주자 결국 마음이 풀립니다. '당신이 이렇게까지 해줄 줄 몰랐어... 고마워 ❤️'",
            character: "seoeun",
            choices: [
                { text: "화나도 포기하지 않을 거야", next: "neverGiveUp", effect: { seoeun: +30, confidence: +25 } },
                { text: "다음엔 처음부터 화내지 마", next: "dontGetAngryNext", effect: { seoeun: +10, confidence: +10 } },
                { text: "이제 화 풀렸지?", next: "feelBetterNow", effect: { seoeun: +20 } }
            ]
        }
    ],

    dontContact: [
        {
            speaker: "서은",
            text: "큰 싸움 후 서은이가 문자를 보냅니다. '연락하지마. 당분간 혼자 있고 싶어.'",
            character: "seoeun",
            choices: [
                { text: "알겠어, 연락 안 할게", next: "reallyDontContact", effect: { seoeun: -30, confidence: -20 } },
                { text: "하루만 기다리고 연락한다", next: "contactNextDay", effect: { seoeun: +10, stress: +15 } },
                { text: "매일 안부 문자만 보낸다", next: "dailyCheckUp", effect: { seoeun: +20, stress: +10 } }
            ]
        }
    ],

    reallyDontContact: [
        {
            speaker: "내레이션",
            text: "일주일이 지났지만 서은에게서 연락이 없습니다. 정말로 연락하지 말라는 뜻이었나? 아니면 먼저 연락하기를 기다리고 있는 건가?",
            character: "neutral",
            choices: [
                { text: "더 기다린다", next: "waitMore2", effect: { seoeun: -20, stress: +25 } },
                { text: "용기내서 연락한다", next: "courageContact", effect: { seoeun: +15, stress: +20 } },
                { text: "친구를 통해 안부를 묻는다", next: "askThroughFriend", effect: { seoeun: +5, stress: +10 } }
            ]
        }
    ],

    dailyCheckUp: [
        {
            speaker: "서은",
            text: "처음엔 답장이 없었지만, 사흘째 되는 날 서은이 답장합니다. '매일 연락해줘서... 고마워. 아직 화는 안 풀렸지만 신경써줘서 기뻐.'",
            character: "seoeun",
            choices: [
                { text: "화 풀릴 때까지 계속할게", next: "continueUntilBetter", effect: { seoeun: +25, confidence: +20 } },
                { text: "만나서 이야기하자", next: "meetAndTalk", effect: { seoeun: +15, stress: +10 } },
                { text: "내가 잘못했어, 미안해", next: "apologizeAgain", effect: { seoeun: +20 } }
            ]
        }
    ],

    goPlayWithoutMe: [
        {
            speaker: "서은",
            text: "친구들이 놀러가자고 할 때 서은이 말합니다. '나 신경쓰지 말고 놀아. 재미있게 다녀와~'",
            character: "seoeun",
            choices: [
                { text: "정말? 그럼 재미있게 놀다 올게!", next: "reallyGoPlay", effect: { seoeun: -25, confidence: -15 } },
                { text: "너도 같이 가자!", next: "comeTogether", effect: { seoeun: +20, confidence: +10 } },
                { text: "네가 없으면 재미없어", next: "noFunWithoutYou", effect: { seoeun: +30, confidence: +15 } }
            ]
        }
    ],

    reallyGoPlay: [
        {
            speaker: "내레이션",
            text: "정말로 놀러 갔더니 서은이 화가 났습니다. '진짜 나 신경 안 쓰고 놀러갔네? 나는 당신이 '같이 가자'고 할 줄 알았는데...'",
            character: "seoeun",
            choices: [
                { text: "미안해, 몰랐어", next: "didntKnowMeaning", effect: { seoeun: +10, confidence: -10 } },
                { text: "그렇게 말하지 말고 솔직히 말해줘", next: "beHonest", effect: { seoeun: +15, confidence: +20 } },
                { text: "여자 마음은 정말 모르겠어", next: "cantUnderstandWomen", effect: { seoeun: -5, stress: +15 } }
            ]
        }
    ],

    noFunWithoutYou: [
        {
            speaker: "서은",
            text: "정말? 😍 그런 말 해주면... 기분이 좋아져! 사실 나도 당신이 없으면 심심할 것 같았어. 그럼 우리 둘이서 뭔가 재미있는 거 하자!",
            character: "seoeun",
            choices: [
                { text: "뭔가 특별한 걸 하자", next: "doSomethingSpecial", effect: { seoeun: +25, confidence: +20 } },
                { text: "그냥 같이 있는 것만으로도 좋아", next: "justBeingTogether", effect: { seoeun: +30 } },
                { text: "다음엔 처음부터 솔직히 말해줘", next: "beHonestNextTime", effect: { seoeun: +15, confidence: +15 } }
            ]
        }
    ],

    completeUnderstanding: [
        {
            speaker: "주인공",
            text: "이제 완전히 이해했어! 여자들의 언어에는 숨겨진 의미가 있었구나. '연락하지마'는 '더 신경써달라'는 뜻이고, '나 신경쓰지말고 놀아'는 '나 신경쓰면서 적당히 놀아'라는 뜻이었어!",
            character: "neutral",
            choices: [
                { text: "이제 서은이와 더 잘 소통할 수 있겠다", next: "betterCommunication", effect: { seoeun: +35, confidence: +30 } },
                { text: "이제 서은이와 더 잘 소통할 수 있겠다", next: "betterCommunication", effect: { seoeun: +35, confidence: +30 } },
                { text: "다른 남자들한테도 알려줘야겠다", next: "tellOtherGuys", effect: { confidence: +20 } },
                { text: "여자도 솔직하게 말하면 좋겠는데", next: "wantHonesty", effect: { confidence: +10, stress: +5 } }
            ]
        }
    ],

    betterCommunication: [
        {
            speaker: "서은",
            text: "요즘 당신 달라진 것 같아! 내 마음을 정말 잘 알아줘. 어떻게 이렇게 변했어? 마음을 읽는 초능력이라도 생긴 거야? 😍",
            character: "seoeun",
            choices: [
                { text: "당신을 더 잘 이해하고 싶어서 노력했어", next: "effortToUnderstand", effect: { seoeun: +40, confidence: +25 } },
                { text: "비밀이야 😏", next: "secret", effect: { seoeun: +20, confidence: +15 } },
                { text: "사실 여자 언어 공부했어", next: "studiedWomenLanguage", effect: { seoeun: +25, confidence: +20 } }
            ]
        }
    ],

    effortToUnderstand: [
        {
            speaker: "서은",
            text: "정말? 나를 위해서 그렇게까지...? 😭 고마워. 정말 고마워. 이제 진짜 나를 아껴주는 구나 싶어.",
            character: "seoeun",
            choices: [
                { text: "당신이 소중하니까", next: "youArePrecious", effect: { seoeun: +30 } },
                { text: "앞으로도 계속 노력할게", next: "continueEffort", effect: { seoeun: +25, confidence: +15 } },
                { text: "사랑해", next: "iLoveYou", effect: { seoeun: +35 } }
            ]
        }
    ],

    studiedWomenLanguage: [
        {
            speaker: "서은",
            text: "여자 언어를... 공부했다고? 😂 진짜? 그래서 요즘 내가 뭘 원하는지 이렇게 잘 알아차리는 거야? 웃기면서도 고마워!",
            character: "seoeun",
            choices: [
                { text: "'뭐해?'의 진짜 의미를 알았거든", next: "whatAreYouDoingMeaning", effect: { seoeun: +30 } },
                { text: "온라인에서 여자 심리 강의까지 들었어", next: "onlineLecture", effect: { seoeun: +25, confidence: +20 } },
                { text: "이제 여성 언어 전문가야", next: "womenLanguageExpert", effect: { seoeun: +35, confidence: +25 } }
            ]
        }
    ],

    youArePrecious: [
        {
            speaker: "서은",
            text: "나도 당신이 소중해... 정말 많이. 이제야 진짜 서로를 이해하게 된 것 같아. ❤️",
            character: "seoeun",
            choices: [
                { text: "완벽한 커플이 되자", next: "perfectLove", effect: { seoeun: +40 } },
                { text: "평생 함께하자", next: "sweetCouple", effect: { seoeun: +35 } }
            ]
        }
    ],

    continueEffort: [
        {
            speaker: "서은",
            text: "그런 마음이 너무 고마워. 당신 같은 남자친구를 둔 내가 정말 행복해. 😊",
            character: "seoeun",
            choices: [
                { text: "나도 행복해", next: "sweetCouple", effect: { seoeun: +30 } },
                { text: "더 좋은 남친이 되겠어", next: "empathyKing", effect: { seoeun: +35 } }
            ]
        }
    ],

    iLoveYou: [
        {
            speaker: "서은",
            text: "나도 사랑해... 정말 많이. 당신과 함께라면 어떤 일이든 이겨낼 수 있을 것 같아. 💕",
            character: "seoeun",
            choices: [
                { text: "영원히 함께하자", next: "perfectLove", effect: { seoeun: +50 } }
            ]
        }
    ],

    whatAreYouDoingMeaning: [
        {
            speaker: "서은",
            text: "'뭐해?'가 '나랑 시간 보내자'는 뜻이라는 걸 알았구나! 맞아! 그냥 궁금해서 물어본 게 아니었어. 😄",
            character: "seoeun",
            choices: [
                { text: "'이거 어때?'도 알아", next: "howAboutThisMeaning", effect: { seoeun: +25 } },
                { text: "이제 완벽하게 이해했어", next: "womenLanguageMaster", effect: { seoeun: +40 } }
            ]
        }
    ],

    onlineLecture: [
        {
            speaker: "서은",
            text: "온라인 강의까지?! 😂 진짜 대단해! 그래서 요즘 내 기분 변화도 그렇게 잘 알아차리는 구나!",
            character: "seoeun",
            choices: [
                { text: "당신을 위해서라면 뭐든지", next: "mindReader", effect: { seoeun: +35 } },
                { text: "아직도 배우는 중이야", next: "empathyKing", effect: { seoeun: +30 } }
            ]
        }
    ],

    womenLanguageExpert: [
        {
            speaker: "서은",
            text: "전문가라니! 😍 그럼 이제 '화 안 났는데?'가 뭔 뜻인지도 알겠네? 정말 놀라워!",
            character: "seoeun",
            choices: [
                { text: "'몰라서 물어?'라는 뜻이지", next: "womenLanguageMaster", effect: { seoeun: +50 } }
            ]
        }
    ],

    howAboutThisMeaning: [
        {
            speaker: "서은",
            text: "맞아! '이거 어때?'는 '사주면 좋겠어'라는 뜻이었어! 완전 정답! 당신 진짜 천재야! 😍",
            character: "seoeun",
            choices: [
                { text: "이제 모든 걸 이해했어", next: "womenLanguageMaster", effect: { seoeun: +40 } }
            ]
        }
    ],

    secret: [
        {
            speaker: "서은",
            text: "비밀이라니! 🤔 그래도 좋아. 어떻게 하든 지금의 당신이 정말 좋아. 앞으로도 이런 모습이었으면 좋겠어.",
            character: "seoeun",
            choices: [
                { text: "물론이지", next: "mindReader", effect: { seoeun: +30 } },
                { text: "더 좋아질 거야", next: "empathyKing", effect: { seoeun: +25 } }
            ]
        }
    ],

    // 초기 스토리 연결 누락분 추가
    secondChance: [
        {
            speaker: "내레이션",
            text: "며칠 후, 도서관에서 다시 서은을 만났습니다. 이번에는 용기를 내서 말을 걸어볼까요?",
            character: "neutral",
            choices: [
                { text: "이번엔 용기내서 말을 건다", next: "approach", effect: { confidence: +10 } },
                { text: "여전히 망설인다", next: "stillHesitant", effect: { confidence: -5, stress: +10 } },
                { text: "자연스럽게 옆에 앉는다", next: "sitNearby", effect: { seoeun: +5 } }
            ]
        }
    ],

    findOnSNS: [
        {
            speaker: "내레이션",
            text: "SNS에서 서은의 계정을 찾았습니다. 팔로우를 하고 몇 개의 게시물에 좋아요를 눌렀어요.",
            character: "neutral",
            choices: [
                { text: "DM을 보낸다", next: "sendDM", effect: { stress: +15 } },
                { text: "댓글을 남긴다", next: "leaveComment", effect: { seoeun: +5, stress: +5 } },
                { text: "그냥 지켜본다", next: "justWatch", effect: { stress: +20 } }
            ]
        }
    ],

    honestFriend: [
        {
            speaker: "친구",
            text: "오! 진짜? 서은 선배한테? 잘됐네! 그런데 경쟁자 많을 거야. 특히 민수 선배... 걔는 고등학교 때부터 서은이랑 친했거든.",
            character: "happy",
            choices: [
                { text: "민수 선배가 누구예요?", next: "askAboutMinsu", effect: { stress: +10 } },
                { text: "경쟁이든 뭐든 도전해보겠어요", next: "acceptChallenge", effect: { confidence: +15 } },
                { text: "그럼 포기하는 게 나을까요?", next: "considerGiveUp", effect: { confidence: -10 } }
            ]
        }
    ],

    denyInterest: [
        {
            speaker: "친구",
            text: "그냥 궁금해서? 흠... 그래도 관심 있는 것 같은데? 😏 괜찮아, 비밀 지켜줄게. 어쨌든 서은 선배는 정말 좋은 사람이야.",
            character: "happy",
            choices: [
                { text: "정말 그냥 궁금해서에요", next: "reallyJustCurious", effect: { confidence: -5 } },
                { text: "...조금 관심은 있어요", next: "admitInterest", effect: { seoeun: +5, confidence: +8 } },
                { text: "어떤 사람인지 더 알려주세요", next: "wantToKnowMore", effect: { seoeun: +3 } }
            ]
        }
    ],

    seriousStudy: [
        {
            speaker: "서은",
            text: "와, 진짜 열심히 하시네요! 이렇게 집중하는 모습 보니까 멋있어요. 저도 더 열심히 해야겠어요.",
            character: "seoeun",
            choices: [
                { text: "선배도 충분히 열심히 해요", next: "praiseHer", effect: { seoeun: +15 } },
                { text: "같이 하니까 더 집중되는 것 같아요", next: "betterTogether", effect: { seoeun: +12 } },
                { text: "공부 끝나고 뭐 할까요?", next: "afterStudy", effect: { seoeun: +8, confidence: +5 } }
            ]
        }
    ],

    stillHesitant: [
        {
            speaker: "내레이션",
            text: "여전히 망설이고 있는 당신을 서은이 먼저 알아차렸습니다.",
            character: "seoeun",
            choices: [
                { text: "어색하게 인사한다", next: "awkwardGreeting", effect: { seoeun: +5, stress: +10 } },
                { text: "자연스럽게 행동한다", next: "actNatural", effect: { seoeun: +10 } }
            ]
        }
    ],

    sitNearby: [
        {
            speaker: "서은",
            text: "어? 안녕하세요! 같은 과 후배분이시죠? 여기 앉으셔도 괜찮아요.",
            character: "seoeun",
            choices: [
                { text: "감사합니다, 선배", next: "thanksSenior", effect: { seoeun: +10 } },
                { text: "혹시 공부 방해되면...", next: "worriedAboutDisturb", effect: { seoeun: +8, stress: +5 } }
            ]
        }
    ],

    sendDM: [
        {
            speaker: "내레이션",
            text: "'안녕하세요, 같은 과 후배입니다. 수업에서 뵈었는데 인사드리고 싶어서요.' 라고 메시지를 보냈습니다. 답장이 올까요?",
            character: "neutral",
            choices: [
                { text: "초조하게 답장을 기다린다", next: "waitReply", effect: { stress: +20 } },
                { text: "자연스럽게 일상생활을 한다", next: "actNormal", effect: { confidence: +5 } }
            ]
        }
    ],

    askAboutMinsu: [
        {
            speaker: "친구",
            text: "민수 선배? 서은 선배랑 고등학교 동창이야. 둘이 친한 건 맞는데... 어떤 사이인지는 모르겠어. 그냥 친구라고 하던데?",
            character: "happy",
            choices: [
                { text: "그렇구나, 신경 안 쓸게요", next: "dontCare", effect: { confidence: +10 } },
                { text: "혹시 예전에 사귀었을까요?", next: "worried", effect: { stress: +15 } },
                { text: "더 자세히 알아봐 주세요", next: "wantDetails", effect: { stress: +10 } }
            ]
        }
    ],

    acceptChallenge: [
        {
            speaker: "친구",
            text: "그래! 그런 마음가짐이 좋아! 서은 선배는 좋은 사람이니까 진심으로 다가가면 될 거야.",
            character: "happy",
            choices: [
                { text: "어떻게 접근하면 좋을까요?", next: "askAdvice", effect: { confidence: +10 } },
                { text: "혼자서 해볼게요", next: "doItAlone", effect: { confidence: +15 } }
            ]
        }
    ],

    considerGiveUp: [
        {
            speaker: "친구",
            text: "아니야! 포기하지 마! 경쟁이 있어도 당신만의 매력이 있잖아. 한번 도전해봐!",
            character: "happy",
            choices: [
                { text: "그래, 한번 해볼게!", next: "acceptChallenge", effect: { confidence: +15 } },
                { text: "좀 더 생각해볼게요", next: "thinkMore", effect: { stress: +10 } }
            ]
        }
    ],

    reallyJustCurious: [
        {
            speaker: "친구",
            text: "정말? 그럼 됐고... 근데 서은 선배는 착하고 예쁘고 공부도 잘해. 누구든 좋아할 만해.",
            character: "happy",
            choices: [
                { text: "그런가요?", next: "curious", effect: { seoeun: +3 } },
                { text: "...조금은 관심 있어요", next: "admitInterest", effect: { confidence: +8 } }
            ]
        }
    ],

    admitInterest: [
        {
            speaker: "친구",
            text: "역시! 눈치챘어. 괜찮아, 서은 선배한테 관심 갖는 거 이상한 일 아니야. 응원할게!",
            character: "happy",
            choices: [
                { text: "어떻게 접근하면 좋을까요?", next: "askAdvice", effect: { confidence: +5 } },
                { text: "비밀로 해주세요", next: "keepSecret", effect: { stress: +5 } }
            ]
        }
    ],

    wantToKnowMore: [
        {
            speaker: "친구",
            text: "서은 선배는 문학 좋아하고, 카페에서 책 읽는 걸 즐겨해. 그리고 사진 찍는 것도 좋아하더라!",
            character: "happy",
            choices: [
                { text: "좋은 정보네요!", next: "usefulInfo", effect: { confidence: +10 } },
                { text: "더 알고 싶어요", next: "wantMoreInfo", effect: { seoeun: +5 } }
            ]
        }
    ],

    praiseHer: [
        {
            speaker: "서은",
            text: "고마워요! 당신도 정말 성실하시네요. 이렇게 열심히 하는 모습 보니까 저도 자극받아요.",
            character: "seoeun",
            choices: [
                { text: "선배와 함께해서 더 열심히 하게 돼요", next: "motivatedByYou", effect: { seoeun: +20 } },
                { text: "서로 자극받으면 좋죠", next: "mutualMotivation", effect: { seoeun: +15 } }
            ]
        }
    ],

    betterTogether: [
        {
            speaker: "서은",
            text: "저도요! 혼자 할 때보다 훨씬 집중이 잘 되는 것 같아요. 좋은 스터디 파트너를 만난 것 같아서 기뻐요.",
            character: "seoeun",
            choices: [
                { text: "저야말로 좋은 파트너를 만났어요", next: "goodPartner", effect: { seoeun: +18 } },
                { text: "앞으로도 자주 같이 해요", next: "studyTogether", effect: { seoeun: +15 } }
            ]
        }
    ],

    afterStudy: [
        {
            speaker: "서은",
            text: "공부 끝나고요? 음... 특별한 계획은 없는데, 왜요? 혹시 제안이 있으신가요?",
            character: "seoeun",
            choices: [
                { text: "커피 한 잔 하실래요?", next: "suggestCoffee", effect: { seoeun: +15, confidence: +10 } },
                { text: "그냥 궁금해서요", next: "justCurious", effect: { seoeun: +5 } },
                { text: "같이 저녁 먹을까요?", next: "suggestDinner", effect: { seoeun: +12, confidence: +8 } }
            ]
        }
    ],

    lastChance: [
        {
            speaker: "서은",
            text: "어? 또 뵙네요! 안녕하세요! 혹시 저 찾으셨나요?",
            character: "seoeun",
            choices: [
                { text: "네! 말씀드릴 게 있어서요", next: "haveSomethingToSay", effect: { seoeun: +10, confidence: +10 } },
                { text: "아니에요, 우연히...", next: "justCoincidence", effect: { seoeun: +5, confidence: -5 } }
            ]
        }
    ],

    missChanceAgain: [
        {
            speaker: "내레이션",
            text: "또다시 기회를 놓쳤습니다. 서은이 떠나는 모습을 보니 후회가 밀려왔어요.",
            character: "neutral",
            choices: [
                { text: "다음엔 꼭 용기내자", next: "nextTimeCourage", effect: { confidence: +5 } },
                { text: "나는 정말 소심하구나", next: "realizeShy", effect: { confidence: -10, stress: +15 } },
                { text: "다른 방법을 찾아보자", next: "findOtherWay", effect: { confidence: +8 } }
            ]
        }
    ],

    waitOneMoreDay: [
        {
            speaker: "내레이션",
            text: "하루 더 기다렸지만 여전히 답장이 없습니다. 혹시 실수했을까요?",
            character: "neutral",
            choices: [
                { text: "포기한다", next: "giveUpContact", effect: { confidence: -15 } },
                { text: "직접 만나서 사과한다", next: "apologizeInPerson", effect: { confidence: +10, stress: +15 } }
            ]
        }
    ],

    thinkOtherWay: [
        {
            speaker: "내레이션",
            text: "SNS 말고 다른 방법을 생각해보니, 직접 만나서 이야기하는 게 나을 것 같습니다.",
            character: "neutral",
            choices: [
                { text: "다음 수업시간에 말걸어본다", next: "approachInClass", effect: { confidence: +10 } },
                { text: "친구를 통해 연결해본다", next: "throughFriend", effect: { confidence: +5 } }
            ]
        }
    ],

    giveUpContact: [
        {
            speaker: "내레이션",
            text: "결국 포기하기로 했습니다. 아마 서은에게는 관심이 없었나 봅니다.",
            character: "neutral",
            choices: [
                { text: "다른 사람을 찾아보자", next: "moveOn", effect: { confidence: -5 } },
                { text: "혼자 지내는 것도 나쁘지 않아", next: "stayAlone", effect: { confidence: +3 } }
            ]
        }
    ],

    happyReply: [
        {
            speaker: "서은",
            text: "앞으로 잘 부탁드려요! 혹시 시간 되시면 커피라도 한 잔 할까요? 같은 과 후배와 친해지고 싶어요!",
            character: "seoeun",
            choices: [
                { text: "좋습니다! 언제 만날까요?", next: "arrangeTime", effect: { seoeun: +20, confidence: +15 } },
                { text: "영광입니다!", next: "honored", effect: { seoeun: +15, confidence: +10 } }
            ]
        }
    ],

    calmGreeting: [
        {
            speaker: "서은",
            text: "침착하시네요! 좋아요. 저도 급하게 친해지는 건 별로 안 좋아해서요. 천천히 알아가요!",
            character: "seoeun",
            choices: [
                { text: "네, 천천히 알아가요", next: "slowlyGetToKnow", effect: { seoeun: +15 } },
                { text: "그럼 가끔 안부 인사드릴게요", next: "occasionalGreeting", effect: { seoeun: +12 } }
            ]
        }
    ],

    // 복구 및 추가된 기본 스토리들
    maybeStudy: [
        {
            speaker: "서은",
            text: "네, 그럼 연락드려요! 언제든 편한 시간에 말해주세요.",
            character: "seoeun",
            choices: [
                { text: "빨리 연락해주세요", next: "eagerContact", effect: { seoeun: +10, stress: +5 } },
                { text: "천천히 생각해보세요", next: "takeYourTime", effect: { seoeun: +8, confidence: +5 } }
            ]
        }
    ],

    admitNervous: [
        {
            speaker: "서은",
            text: "아, 그럴 수 있죠! 저도 처음엔 긴장했어요. 괜찮아요, 금방 익숙해질 거예요.",
            character: "seoeun",
            choices: [
                { text: "고마워요, 선배", next: "thankful", effect: { seoeun: +15 } },
                { text: "선배는 자연스러워 보여요", next: "youLookNatural", effect: { seoeun: +12 } }
            ]
        }
    ],

    denyNervous: [
        {
            speaker: "서은",
            text: "아... 네? 그럼 다행이에요. 그런데 괜찮으시면 같이 공부할래요?",
            character: "seoeun",
            choices: [
                { text: "네! 좋습니다", next: "acceptStudy", effect: { seoeun: +10 } },
                { text: "다음에 기회가 되면", next: "maybeNextTime", effect: { seoeun: +3, confidence: -5 } }
            ]
        }
    ],

    secretCrush: [
        {
            speaker: "내레이션",
            text: "스터디 하면서 서은을 몰래 바라보니 심장이 빨리 뛰었습니다. 하지만 들킬까봐 조심스러웠어요.",
            character: "neutral",
            choices: [
                { text: "집중해서 공부한다", next: "focusOnStudy", effect: { seoeun: +8, stress: +5 } },
                { text: "자연스럽게 대화를 시도한다", next: "naturalConversation", effect: { seoeun: +15 } },
                { text: "계속 몰래 본다", next: "keepStaring", effect: { stress: +15, seoeun: -5 } }
            ]
        }
    ],

    talkative: [
        {
            speaker: "서은",
            text: "그렇구나! 저도 그런 편이에요. 처음엔 조용하다가 친해지면 말이 많아져요 😊",
            character: "seoeun",
            choices: [
                { text: "그럼 우리 잘 맞겠네요", next: "goodMatch", effect: { seoeun: +20 } },
                { text: "앞으로 더 많은 이야기해요", next: "moreTalks", effect: { seoeun: +15 } }
            ]
        }
    ],

    compliment: [
        {
            speaker: "서은",
            text: "저가요? 고마워요! 그런데 당신도 생각보다 재미있는 사람이에요. 처음 인상과 달라요.",
            character: "seoeun",
            choices: [
                { text: "처음엔 어떤 인상이었나요?", next: "firstImpression", effect: { seoeun: +10 } },
                { text: "좋은 뜻으로 달라요?", next: "goodDifferent", effect: { seoeun: +15 } }
            ]
        }
    ],

    mutualFeeling: [
        {
            speaker: "서은",
            text: "정말요? 저도 그런 느낌이었어요! 뭔가... 편안하면서도 재미있어요.",
            character: "seoeun",
            choices: [
                { text: "자주 만나요", next: "meetOften", effect: { seoeun: +25 } },
                { text: "오늘도 즐거웠어요", next: "enjoyableToday", effect: { seoeun: +15 } }
            ]
        }
    ],

    nextStudy: [
        {
            speaker: "서은",
            text: "네! 좋아요. 언제 다시 만날까요? 다음 주에도 과제가 있어서요.",
            character: "seoeun",
            choices: [
                { text: "내일도 가능해요", next: "availableTomorrow", effect: { seoeun: +20, confidence: +10 } },
                { text: "언제든 편하실 때", next: "wheneverConvenient", effect: { seoeun: +12 } }
            ]
        }
    ],

    classConnection: [
        {
            speaker: "서은",
            text: "맞아요! 그 수업! 기억나요. 항상 뒤쪽에 앉으시던데, 혹시 우연이 아니라 일부러 여기 앉으신 거예요? 😊",
            character: "seoeun",
            choices: [
                { text: "네, 말걸고 싶어서요", next: "wantedToTalk", effect: { seoeun: +15, confidence: +10 } },
                { text: "우연이에요!", next: "reallyCoincidence", effect: { seoeun: +8 } },
                { text: "...들켰네요", next: "busted", effect: { seoeun: +12, stress: +5 } }
            ]
        }
    ],

    playItCool: [
        {
            speaker: "서은",
            text: "우연이라니, 신기하네요! 그런데 혹시... 저 아시나요? 어디서 본 것 같은데...",
            character: "seoeun",
            choices: [
                { text: "같은 과예요!", next: "sameMajor", effect: { seoeun: +10 } },
                { text: "현대문학론 수업에서요", next: "literatureClass", effect: { seoeun: +12 } }
            ]
        }
    ],

    waitReply: [
        {
            speaker: "내레이션",
            text: "몇 시간이 지나도 답장이 없습니다. 혹시 기분 나빠하셨나? 아니면 바쁘신 건가?",
            character: "neutral",
            choices: [
                { text: "하루 더 기다린다", next: "waitOneMoreDay", effect: { stress: +15 } },
                { text: "다른 방법을 생각한다", next: "thinkOtherWay", effect: { confidence: +5 } },
                { text: "포기한다", next: "giveUpContact", effect: { confidence: -15 } }
            ]
        }
    ],

    actNormal: [
        {
            speaker: "내레이션",
            text: "평소대로 생활하다가 다음날 아침, 서은으로부터 답장이 왔습니다! '안녕하세요! 후배님이시군요. 반가워요!'",
            character: "seoeun",
            choices: [
                { text: "기뻐하며 답장한다", next: "happyReply", effect: { seoeun: +15, confidence: +10 } },
                { text: "차분하게 인사한다", next: "calmGreeting", effect: { seoeun: +10, confidence: +5 } }
            ]
        }
    ],

    snsIntroduction: [
        {
            speaker: "서은",
            text: "역시! 어디서 본 것 같더라니. 앞으로 잘 부탁드려요! SNS로 먼저 인사하다니 센스 있으시네요 😊",
            character: "seoeun",
            choices: [
                { text: "혹시 커피 한 잔 할까요?", next: "suggestCoffeeFromSNS", effect: { seoeun: +15, confidence: +15 } },
                { text: "선배도 잘 부탁드려요!", next: "politeReply", effect: { seoeun: +10 } }
            ]
        }
    ],

    complimentPost: [
        {
            speaker: "서은",
            text: "고마워요! 사진 찍는 걸 좋아해서 자주 올리는 편이에요. 혹시 당신도 사진 좋아하세요?",
            character: "seoeun",
            choices: [
                { text: "네, 좋아해요!", next: "likePhotography", effect: { seoeun: +15 } },
                { text: "선배 사진이 예뻐서요", next: "yourPhotoPretty", effect: { seoeun: +20 } }
            ]
        }
    ],

    likePhotography: [
        {
            speaker: "서은",
            text: "정말요? 어떤 사진을 좋아하시나요? 저는 풍경 사진 찍는 걸 좋아해요!",
            character: "seoeun",
            choices: [
                { text: "저도 풍경 사진 좋아해요!", next: "sharePhotos", effect: { seoeun: +25, confidence: +5 } },
                { text: "사람 사진이 더 좋아요", next: "portraitTalk", effect: { seoeun: +20 } }
            ]
        }
    ],

    sharePhotos: [
        {
            speaker: "서은",
            text: "와! 취향이 비슷하네요! 혹시 제가 찍은 사진도 보여드릴까요?",
            character: "seoeun",
            choices: [
                { text: "네! 정말 보고 싶어요", next: "showPhotos", effect: { seoeun: +30, confidence: +10 } },
                { text: "좋아요, 기대돼요", next: "showPhotos", effect: { seoeun: +25 } }
            ]
        }
    ],

    portraitTalk: [
        {
            speaker: "서은",
            text: "아, 사람 사진도 좋죠! 저도 가끔 찍어보는데 어려워요. 혹시 모델이 되어주실래요?",
            character: "seoeun",
            choices: [
                { text: "네! 좋아요!", next: "photoShoot", effect: { seoeun: +35, confidence: +15 } },
                { text: "음... 조금 부끄러워요", next: "shyReply", effect: { seoeun: +20, stress: +10 } }
            ]
        }
    ],

    keepWatching: [
        {
            speaker: "내레이션",
            text: "계속 지켜보기만 하다가 한 달이 지났습니다. 서은과 만날 기회는 점점 멀어져 가는 것 같습니다.",
            character: "neutral",
            choices: [
                { text: "용기를 내서 접근한다", next: "finalApproach", effect: { confidence: +10, stress: +20 } },
                { text: "포기하고 다른 사람을 만난다", next: "moveOn", effect: { confidence: -10 } },
                { text: "현실에서 우연히 만날 때까지 기다린다", next: "waitForFate", effect: { stress: +15 } }
            ]
        }
    ],

    leaveComment: [
        {
            speaker: "서은",
            text: "SNS에서 댓글을 남긴 후 며칠 뒤, 서은이 당신을 팔로우백 했습니다. 그리고 DM이 왔어요. '후배님이시죠? 댓글 감사해요!😊'",
            character: "seoeun",
            choices: [
                { text: "네! 같은 과 후배입니다", next: "snsIntroduction", effect: { seoeun: +10 } },
                { text: "천만에요! 게시물이 예뻐서요", next: "complimentPost", effect: { seoeun: +8 } }
            ]
        }
    ],

    justWatch: [
        {
            speaker: "내레이션",
            text: "서은의 SNS를 몰래 지켜보기만 했습니다. 친구들과 재미있게 지내는 모습을 보니 왠지 더 멀게 느껴져요.",
            character: "neutral",
            choices: [
                { text: "용기를 내서 댓글을 남긴다", next: "leaveComment", effect: { confidence: +5 } },
                { text: "계속 지켜보기만 한다", next: "keepWatching", effect: { stress: +30, confidence: -10 } }
            ]
        }
    ],

    sendDM: [
        {
            speaker: "내레이션",
            text: "'안녕하세요, 같은 과 후배입니다. 수업에서 뵈었는데 인사드리고 싶어서요.' 라고 메시지를 보냈습니다. 답장이 올까요?",
            character: "neutral",
            choices: [
                { text: "초조하게 답장을 기다린다", next: "waitReply", effect: { stress: +20 } },
                { text: "자연스럽게 일상생활을 한다", next: "actNormal", effect: { confidence: +5 } }
            ]
        }
    ],

    // 모든 누락된 스토리들 추가
    eagerContact: [
        {
            speaker: "서은",
            text: "그렇게 급해하시면 안 돼요! 😄 농담이에요. 내일 오후 어때요? 도서관에서 만날까요?",
            character: "seoeun",
            choices: [
                { text: "좋습니다! 몇 시에 만날까요?", next: "arrangeTime", effect: { seoeun: +15, confidence: +10 } },
                { text: "도서관 말고 카페는 어때요?", next: "suggestCafe", effect: { seoeun: +12, confidence: +8 } }
            ]
        }
    ],

    takeYourTime: [
        {
            speaker: "서은",
            text: "그래도 너무 늦으면 안 돼요! 연락 기다릴게요 😊",
            character: "seoeun",
            choices: [
                { text: "곧 연락드릴게요", next: "soonContact", effect: { seoeun: +10 } },
                { text: "일주일 정도 어떠세요?", next: "weekLater", effect: { seoeun: +8 } }
            ]
        }
    ],

    thankful: [
        {
            speaker: "서은",
            text: "천만에요! 서로 도우면서 공부해요. 어려운 게 있으면 언제든 물어보세요!",
            character: "seoeun",
            choices: [
                { text: "선배도 모르는 게 있으면 물어보세요", next: "mutualHelp", effect: { seoeun: +18, confidence: +12 } },
                { text: "정말 감사해요", next: "reallyThankful", effect: { seoeun: +15 } }
            ]
        }
    ],

    youLookNatural: [
        {
            speaker: "서은",
            text: "자연스러워 보인다니 다행이에요! 사실 저도 처음엔 많이 긴장했거든요. 하지만 이제 괜찮아요.",
            character: "seoeun",
            choices: [
                { text: "저도 선배처럼 되고 싶어요", next: "wantToBeLikeYou", effect: { seoeun: +20 } },
                { text: "선배가 있어서 든든해요", next: "reliableWithYou", effect: { seoeun: +18 } }
            ]
        }
    ],

    maybeNextTime: [
        {
            speaker: "서은",
            text: "네, 그럼 언제든 시간 되실 때 말씀해주세요. 제 연락처 알려드릴게요!",
            character: "seoeun",
            choices: [
                { text: "감사합니다!", next: "getContact", effect: { seoeun: +15, confidence: +10 } },
                { text: "제 번호도 드릴게요", next: "exchangeNumbers", effect: { seoeun: +20, confidence: +15 } }
            ]
        }
    ],

    focusOnStudy: [
        {
            speaker: "내레이션",
            text: "집중해서 공부하니 서은도 진지한 모습을 보였습니다. 가끔 모르는 부분을 물어보기도 했어요.",
            character: "neutral",
            choices: [
                { text: "친절하게 설명해준다", next: "kindExplanation", effect: { seoeun: +15, confidence: +10 } },
                { text: "같이 문제를 풀어본다", next: "solveTogethers", effect: { seoeun: +20 } }
            ]
        }
    ],

    naturalConversation: [
        {
            speaker: "서은",
            text: "어? 갑자기 말을 걸어주시네요! 뭔가 물어보고 싶은 게 있으셨나요?",
            character: "seoeun",
            choices: [
                { text: "그냥 친해지고 싶어서요", next: "wantToBeFriends", effect: { seoeun: +18, confidence: +12 } },
                { text: "혼자 공부하기 심심해서요", next: "boredStudyingAlone", effect: { seoeun: +12 } }
            ]
        }
    ],

    keepStaring: [
        {
            speaker: "서은",
            text: "어... 혹시 제가 뭔가 이상한가요? 자꾸 보시는 것 같은데... 😅",
            character: "seoeun",
            choices: [
                { text: "아, 죄송해요! 그냥...", next: "apologizeStaring", effect: { seoeun: +5, stress: +10 } },
                { text: "예쁘셔서 그만...", next: "complimentBeauty", effect: { seoeun: +15, stress: +15 } },
                { text: "집중이 안 돼서요", next: "cantConcentrate", effect: { seoeun: +8, stress: +20 } }
            ]
        }
    ],

    goodMatch: [
        {
            speaker: "서은",
            text: "그러게요! 우리 정말 잘 맞는 것 같아요. 이런 스터디 파트너를 만나다니 행운이에요!",
            character: "seoeun",
            choices: [
                { text: "저야말로 행운이에요", next: "imLucky", effect: { seoeun: +25 } },
                { text: "앞으로 자주 같이 해요", next: "studyTogether", effect: { seoeun: +20 } }
            ]
        }
    ],

    moreTalks: [
        {
            speaker: "서은",
            text: "네! 좋아요. 공부만 하지 말고 일상 얘기도 많이 해요. 서로에 대해 더 알고 싶어요!",
            character: "seoeun",
            choices: [
                { text: "저도 선배에 대해 궁금해요", next: "curiousAboutYou", effect: { seoeun: +22 } },
                { text: "뭐부터 얘기할까요?", next: "whatToTalkAbout", effect: { seoeun: +18 } }
            ]
        }
    ],

    firstImpression: [
        {
            speaker: "서은",
            text: "처음엔... 조용하고 진지한 사람인 줄 알았어요. 근데 말해보니까 유머러스하고 재미있더라고요!",
            character: "seoeun",
            choices: [
                { text: "좋은 뜻으로 달라진 거죠?", next: "goodDifferent", effect: { seoeun: +18 } },
                { text: "사실 저도 선배 인상이 달라졌어요", next: "yourImpressionChanged", effect: { seoeun: +15 } }
            ]
        }
    ],

    goodDifferent: [
        {
            speaker: "서은",
            text: "당연히 좋은 뜻이에요! 처음엔 접근하기 어려울 것 같았는데, 알고 보니 정말 좋은 사람이네요 😊",
            character: "seoeun",
            choices: [
                { text: "다행이에요!", next: "relieved", effect: { seoeun: +20 } },
                { text: "선배도 생각보다 친근해요", next: "youAreFriendly", effect: { seoeun: +22 } }
            ]
        }
    ],

    meetOften: [
        {
            speaker: "서은",
            text: "자주 만나요! 스터디도 하고, 가끔은 그냥 수다도 떨고... 좋은 친구가 된 것 같아서 기뻐요!",
            character: "seoeun",
            choices: [
                { text: "저도 기뻐요!", next: "imHappyToo", effect: { seoeun: +25 } },
                { text: "친구... 그 이상으로도", next: "moreThanFriends", effect: { seoeun: +30, stress: +15 } }
            ]
        }
    ],

    enjoyableToday: [
        {
            speaker: "서은",
            text: "저도 정말 즐거웠어요! 시간 가는 줄 몰랐네요. 이런 시간을 더 자주 가졌으면 좋겠어요.",
            character: "seoeun",
            choices: [
                { text: "다음엔 언제 만날까요?", next: "whenNext", effect: { seoeun: +20 } },
                { text: "매일 만나고 싶어요", next: "wantMeetDaily", effect: { seoeun: +25, stress: +10 } }
            ]
        }
    ],

    availableTomorrow: [
        {
            speaker: "서은",
            text: "내일도요? 정말 열심히 하시네요! 좋아요, 내일도 만나요. 같은 시간, 같은 장소에서!",
            character: "seoeun",
            choices: [
                { text: "네! 내일 봐요!", next: "seeTomorrow", effect: { seoeun: +25, confidence: +15 } },
                { text: "커피도 마시면서 해요", next: "withCoffee", effect: { seoeun: +20, confidence: +10 } }
            ]
        }
    ],

    wheneverConvenient: [
        {
            speaker: "서은",
            text: "배려심이 많으시네요! 그럼 제가 시간표 확인해서 연락드릴게요. 기다려주세요!",
            character: "seoeun",
            choices: [
                { text: "언제든 괜찮아요", next: "anytimeOkay", effect: { seoeun: +18 } },
                { text: "연락 기다릴게요", next: "waitingContact", effect: { seoeun: +15 } }
            ]
        }
    ],

    // 모든 엔딩으로 이어지는 기본 스토리들 추가
    arrangeTime: [
        {
            speaker: "서은",
            text: "2시쯤 어떠세요? 그때면 수업도 끝나고 여유로울 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "완벽해요!", next: "perfectTime", effect: { seoeun: +20, confidence: +10 } },
                { text: "조금 더 늦은 시간은 어때요?", next: "laterTime", effect: { seoeun: +12 } }
            ]
        }
    ],

    suggestCafe: [
        {
            speaker: "서은",
            text: "카페요? 좋은 생각이에요! 조용한 분위기에서 공부하면 더 좋을 것 같아요. 어디로 갈까요?",
            character: "seoeun",
            choices: [
                { text: "학교 앞 카페로 가요", next: "campusCafe", effect: { seoeun: +15 } },
                { text: "분위기 좋은 곳 알아요", next: "prettyCafe", effect: { seoeun: +20, confidence: +10 } }
            ]
        }
    ],

    // 기타 누락된 스토리들 - 엔딩으로 연결
    perfectTime: [
        {
            speaker: "내레이션",
            text: "첫 번째 스터디 약속이 완벽하게 잡혔습니다. 이것이 서은과의 특별한 인연의 시작이었어요.",
            character: "happy",
            choices: [
                { text: "완벽한 연애를 시작한다", next: "perfectLove" },
                { text: "달콤한 연인이 된다", next: "sweetCouple" }
            ]
        }
    ],

    laterTime: [
        {
            speaker: "서은",
            text: "그럼 4시는 어때요? 더 여유롭게 이야기할 수 있을 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "좋아요! 4시에 만나요", next: "sweetCouple" },
                { text: "시간 맞춰주셔서 감사해요", next: "empathyKing" }
            ]
        }
    ],

    mutualHelp: [
        {
            speaker: "서은",
            text: "정말 좋은 관계네요! 서로 도우면서 공부하니까 더 재미있을 것 같아요. 진짜 좋은 파트너를 만났어요!",
            character: "seoeun",
            choices: [
                { text: "평생의 파트너가 되어주세요", next: "perfectLove" },
                { text: "더 깊은 관계로 발전하자", next: "communicationExpert" }
            ]
        }
    ],

    reallyThankful: [
        {
            speaker: "서은",
            text: "이렇게 고마워하시는 모습 보니까 제가 더 고마워요. 정말 좋은 사람이시네요!",
            character: "seoeun",
            choices: [
                { text: "선배도 정말 좋은 분이에요", next: "sweetCouple" },
                { text: "앞으로도 잘 부탁드려요", next: "empathyKing" }
            ]
        }
    ],

    wantToBeLikeYou: [
        {
            speaker: "서은",
            text: "저처럼요? 고마워요! 하지만 당신도 충분히 멋진 사람이에요. 자신감을 가지세요!",
            character: "seoeun",
            choices: [
                { text: "선배 덕분에 자신감이 생겨요", next: "manlyConfidence" },
                { text: "선배가 제 이상형이에요", next: "mindReader" }
            ]
        }
    ],

    reliableWithYou: [
        {
            speaker: "서은",
            text: "든든하다니... 그런 말 들으니까 기분이 좋아요! 저도 당신이 있어서 든든해요.",
            character: "seoeun",
            choices: [
                { text: "서로 의지하며 살아요", next: "perfectLove" },
                { text: "평생 함께해요", next: "sweetCouple" }
            ]
        }
    ],

    // 나머지 엔딩 연결 스토리들
    imLucky: [
        {
            speaker: "서은",
            text: "우리 둘 다 행운이네요! 이런 인연을 만나다니... 정말 감사해요.",
            character: "seoeun",
            choices: [
                { text: "운명이었나 봐요", next: "perfectLove" },
                { text: "계속 행운이길 바라요", next: "sweetCouple" }
            ]
        }
    ],

    studyTogether: [
        {
            speaker: "서은",
            text: "자주 같이 해요! 공부도 하고 대화도 하고... 정말 좋은 시간들이에요.",
            character: "seoeun",
            choices: [
                { text: "매일 함께하고 싶어요", next: "sweetCouple" },
                { text: "더 특별한 관계가 되어요", next: "communicationExpert" }
            ]
        }
    ],

    curiousAboutYou: [
        {
            speaker: "서은",
            text: "저에 대해 궁금해해주셔서 고마워요! 뭐든 물어보세요. 당신에 대해서도 알고 싶어요!",
            character: "seoeun",
            choices: [
                { text: "서로 모든 걸 알아가요", next: "mindReader" },
                { text: "천천히 알아가는 재미가 있어요", next: "sweetCouple" }
            ]
        }
    ],

    whatToTalkAbout: [
        {
            speaker: "서은",
            text: "음... 취미부터 시작할까요? 아니면 꿈이나 목표? 뭐든 좋아요!",
            character: "seoeun",
            choices: [
                { text: "꿈과 목표에 대해 얘기해요", next: "realLoveDiscovery" },
                { text: "일상적인 얘기부터 해요", next: "communicationExpert" }            ]
        }
    ],

    yourImpressionChanged: [
        {
            speaker: "서은",
            text: "정말요? 저도 어떻게 달라 보였는지 궁금해요! 서로 첫인상과 다른 모습을 발견한 거네요.",
            character: "seoeun",
            choices: [
                { text: "더 예쁘고 친근해 보여요", next: "sweetCouple" },
                { text: "완벽한 사람이에요", next: "perfectLove" }
            ]
        }
    ],

    relieved: [
        {
            speaker: "서은",
            text: "다행이라니... 처음엔 어색할까봐 걱정했는데, 이렇게 편하게 얘기할 수 있어서 좋아요!",
            character: "seoeun",
            choices: [
                { text: "저도 편해요", next: "sweetCouple" },
                { text: "더 가까워져요", next: "communicationExpert" }
            ]
        }
    ],

    youAreFriendly: [
        {
            speaker: "서은",
            text: "친근하다고 해주셔서 고마워요! 당신도 정말 따뜻한 사람이에요. 좋은 인연이 된 것 같아요.",
            character: "seoeun",
            choices: [
                { text: "인연을 소중히 해요", next: "perfectLove" },
                { text: "특별한 인연이에요", next: "mindReader" }
            ]
        }
    ],

    // 성장형 엔딩들로 연결
    imHappyToo: [
        {
            speaker: "서은",
            text: "우리 둘 다 기뻐하니까 더 좋은 것 같아요! 앞으로도 이런 시간들이 계속되었으면 좋겠어요.",
            character: "seoeun",
            choices: [
                { text: "평생 이런 관계를 유지해요", next: "sweetCouple" },
                { text: "더 발전된 관계가 되어요", next: "perfectLove" }
            ]
        }
    ],

    moreThanFriends: [
        {
            speaker: "서은",
            text: "그 이상이라니... 혹시 저를... 좋아하시는 건가요? 😳",
            character: "seoeun",
            choices: [
                { text: "네, 좋아해요", next: "perfectLove" },
                { text: "특별한 감정이 있어요", next: "mindReader" }
            ]
        }
    ],

    whenNext: [
        {
            speaker: "서은",
            text: "내일도 시간 되세요? 아니면 주말에 더 여유롭게 만날까요?",
            character: "seoeun",
            choices: [
                { text: "내일도 만나요", next: "sweetCouple" },
                { text: "주말에 특별한 데이트해요", next: "perfectLove" }
            ]
        }
    ],

    wantMeetDaily: [
        {
            speaker: "서은",
            text: "매일요? 😍 그렇게 자주 보고 싶어하시다니... 저도 그래요! 매일 만나요!",
            character: "seoeun",
            choices: [
                { text: "매일매일 달콤하게", next: "sweetCouple" },
                { text: "완벽한 커플이 되어요", next: "perfectLove" }
            ]
        }
    ],

    seeTomorrow: [
        {
            speaker: "서은",
            text: "네! 내일 봐요! 기대돼요. 오늘보다 더 재미있는 시간이 될 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "내일이 더 기대돼요", next: "sweetCouple" },
                { text: "매일 더 좋아질 거예요", next: "perfectLove" }
            ]
        }
    ],

    withCoffee: [
        {
            speaker: "서은",
            text: "커피 마시면서 공부하면 더 좋겠네요! 분위기도 좋고... 더 편하게 대화할 수 있을 것 같아요.",
            character: "seoeun",
            choices: [
                { text: "편한 분위기가 좋아요", next: "communicationExpert" },
                { text: "달콤한 시간이 될 것 같아요", next: "sweetCouple" }
            ]
        }
    ],

    anytimeOkay: [
        {
            speaker: "서은",
            text: "정말 배려심이 많으시네요! 그런 마음이 너무 고마워요. 좋은 사람을 만났어요.",
            character: "seoeun",
            choices: [
                { text: "저야말로 좋은 사람을 만났어요", next: "empathyKing" },
                { text: "평생 배려하며 살게요", next: "perfectLove" }
            ]
        }
    ],

    waitingContact: [
        {
            speaker: "서은",
            text: "기다려주신다니 고마워요! 빨리 연락드릴게요. 그때까지 조금만 기다려주세요!",
            character: "seoeun",
            choices: [
                { text: "얼마든지 기다릴게요", next: "empathyKing" },
                { text: "기다리는 시간도 즐거워요", next: "sweetCouple" }
            ]
        }
    ],

    // 모든 누락된 스토리들 완전 추가
    soonContact: [
        {
            speaker: "서은",
            text: "곧이라니 다행이에요! 그럼 이틀 후에 연락드릴게요. 기대하고 계세요!",
            character: "seoeun",
            choices: [
                { text: "기대하고 있겠어요!", next: "sweetCouple" },
                { text: "연락 기다릴게요", next: "empathyKing" }
            ]
        }
    ],

    weekLater: [
        {
            speaker: "서은",
            text: "일주일이면 충분해요! 그때까지 제가 계획도 세워놓을게요. 재미있을 거예요!",
            character: "seoeun",
            choices: [
                { text: "무슨 계획인지 궁금해요", next: "curiousAboutPlan", effect: { seoeun: +15 } },
                { text: "기대하고 있겠어요", next: "sweetCouple" }
            ]
        }
    ],

    getContact: [
        {
            speaker: "서은",
            text: "010-1234-5678이에요! 언제든 연락하세요. 답장은 꼭 할게요!",
            character: "seoeun",
            choices: [
                { text: "저장했어요! 곧 연락드릴게요", next: "contactSaved", effect: { seoeun: +20, confidence: +15 } },
                { text: "소중한 번호 감사해요", next: "preciousNumber", effect: { seoeun: +18 } }
            ]
        }
    ],

    exchangeNumbers: [
        {
            speaker: "서은",
            text: "번호 교환하니까 더 가까워진 느낌이에요! 이제 언제든 연락할 수 있겠네요!",
            character: "seoeun",
            choices: [
                { text: "저도 가까워진 느낌이에요", next: "feelingCloser", effect: { seoeun: +25 } },
                { text: "자주 연락해요", next: "contactOften", effect: { seoeun: +22 } }
            ]
        }
    ],

    kindExplanation: [
        {
            speaker: "서은",
            text: "와! 정말 잘 설명해주시네요! 이해가 쏙쏙 돼요. 선생님 같아요!",
            character: "seoeun",
            choices: [
                { text: "선배도 똑똑하세요", next: "youAreSmart", effect: { seoeun: +20 } },
                { text: "언제든 물어보세요", next: "askAnytime", effect: { seoeun: +18, confidence: +15 } }
            ]
        }
    ],

    solveTogethers: [
        {
            speaker: "서은",
            text: "같이 풀어보니까 더 재미있네요! 혼자 할 때보다 훨씬 쉬워요. 팀워크가 좋은 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "우리 팀워크 최고예요", next: "bestTeamwork", effect: { seoeun: +25 } },
                { text: "앞으로도 같이 해요", next: "doItTogether", effect: { seoeun: +22 } }
            ]
        }
    ],

    wantToBeFriends: [
        {
            speaker: "서은",
            text: "친해지고 싶어하시는군요! 저도 그래요! 좋은 친구가 되었으면 좋겠어요.",
            character: "seoeun",
            choices: [
                { text: "친구 이상으로도...", next: "moreThanFriends", effect: { seoeun: +30, stress: +10 } },
                { text: "네! 좋은 친구가 되어요", next: "goodFriends", effect: { seoeun: +20 } }
            ]
        }
    ],

    boredStudyingAlone: [
        {
            speaker: "서은",
            text: "혼자 공부하면 심심하죠! 저도 그래요. 같이 하니까 훨씬 즐거워요!",
            character: "seoeun",
            choices: [
                { text: "선배와 함께라서 즐거워요", next: "enjoyableWithYou", effect: { seoeun: +20 } },
                { text: "앞으로 자주 같이 해요", next: "studyTogether", effect: { seoeun: +18 } }
            ]
        }
    ],

    apologizeStaring: [
        {
            speaker: "서은",
            text: "괜찮아요! 뭔가 신경 쓰이는 게 있으셨나 봐요. 편하게 말씀해주세요!",
            character: "seoeun",
            choices: [
                { text: "그냥... 예쁘시다고 생각했어요", next: "thoughtYouWerePretty", effect: { seoeun: +20, stress: +5 } },
                { text: "집중하려고 했는데 자꾸...", next: "tryingToFocus", effect: { seoeun: +12 } }
            ]
        }
    ],

    complimentBeauty: [
        {
            speaker: "서은",
            text: "예... 예쁘다고요? 😳 갑자기 그런 말씀을... 고마워요! 부끄럽네요.",
            character: "seoeun",
            choices: [
                { text: "정말 예뻐요", next: "reallyPretty", effect: { seoeun: +25 } },
                { text: "죄송해요, 너무 직접적이었나요?", next: "tooDirectApology", effect: { seoeun: +15, stress: +5 } }
            ]
        }
    ],

    cantConcentrate: [
        {
            speaker: "서은",
            text: "집중이 안 된다고요? 혹시 제가 방해가 되나요? 다른 자리로 옮길까요?",
            character: "seoeun",
            choices: [
                { text: "아니에요! 선배가 있어서 좋아요", next: "goodWithYou", effect: { seoeun: +18 } },
                { text: "선배가 너무 예뻐서...", next: "tooPretty", effect: { seoeun: +22, stress: +10 } }
            ]
        }
    ],

    // 추가 엔딩 연결 스토리들
    curiousAboutPlan: [
        {
            speaker: "서은",
            text: "비밀이에요! 그때 가서 알아보세요. 분명 좋아하실 거예요!",
            character: "seoeun",
            choices: [
                { text: "더 궁금해져요", next: "morecurious", effect: { seoeun: +15 } },
                { text: "깜짝 선물 같네요", next: "likeSurprise", effect: { seoeun: +20 } }
            ]
        }
    ],

    contactSaved: [
        {
            speaker: "서은",
            text: "연락 기다릴게요! 언제든 편할 때 연락하세요!",
            character: "seoeun",
            choices: [
                { text: "오늘 밤에라도 연락드릴게요", next: "contactTonight", effect: { seoeun: +25 } },
                { text: "내일 연락드릴게요", next: "contactTomorrow", effect: { seoeun: +20 } }
            ]
        }
    ],

    preciousNumber: [
        {
            speaker: "서은",
            text: "소중하다니... 그런 말 들으니까 기분이 좋아요! 연락처도 소중히 여겨주시는군요.",
            character: "seoeun",
            choices: [
                { text: "선배가 소중하니까요", next: "youArePrecious" },
                { text: "연락처를 함부로 주는 건 아니죠", next: "notCarelesslyGiven", effect: { seoeun: +18 } }
            ]
        }
    ],

    feelingCloser: [
        {
            speaker: "서은",
            text: "맞아요! 번호 교환하니까 진짜 친구가 된 느낌이에요!",
            character: "seoeun",
            choices: [
                { text: "친구 이상이 되고 싶어요", next: "wantMoreThanFriend", effect: { seoeun: +30 } },
                { text: "좋은 친구가 되어요", next: "beGoodFriends", effect: { seoeun: +20 } }
            ]
        }
    ],

    contactOften: [
        {
            speaker: "서은",
            text: "네! 자주 연락해요! 재미있는 일 있으면 바로바로 공유해요!",
            character: "seoeun",
            choices: [
                { text: "매일 연락해도 될까요?", next: "dailyContact", effect: { seoeun: +25 } },
                { text: "좋은 일만 공유해요", next: "shareGoodThings", effect: { seoeun: +20 } }
            ]
        }
    ],

    youAreSmart: [
        {
            speaker: "서은",
            text: "고마워요! 당신도 정말 똑똑하세요. 설명도 잘하시고... 완벽한 스터디 파트너예요!",
            character: "seoeun",
            choices: [
                { text: "완벽한 파트너라니 기뻐요", next: "happyPerfectPartner", effect: { seoeun: +25 } },
                { text: "선배가 더 완벽해요", next: "youAreMorePerfect", effect: { seoeun: +22 } }
            ]
        }
    ],

    askAnytime: [
        {
            speaker: "서은",
            text: "정말요? 그럼 정말 언제든 물어볼게요! 모르는 게 너무 많거든요.",
            character: "seoeun",
            choices: [
                { text: "뭐든 도와드릴게요", next: "helpWithAnything", effect: { seoeun: +25, confidence: +15 } },
                { text: "같이 공부하면 재미있을 거예요", next: "funStudyTogether", effect: { seoeun: +20 } }
            ]
        }
    ],

    bestTeamwork: [
        {
            speaker: "서은",
            text: "정말 최고예요! 이런 팀워크라면 어떤 문제든 해결할 수 있을 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "인생 문제도 같이 해결해요", next: "solveLifeTogether", effect: { seoeun: +30 } },
                { text: "최고의 팀이에요", next: "bestTeam", effect: { seoeun: +25 } }
            ]
        }
    ],

    doItTogether: [
        {
            speaker: "서은",
            text: "앞으로도 같이 해요! 공부도 하고, 다른 것들도... 함께하면 더 즐거울 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "모든 걸 함께해요", next: "doEverythingTogether", effect: { seoeun: +30 } },
                { text: "함께하는 시간이 제일 좋아요", next: "bestTimeWithYou", effect: { seoeun: +25 } }
            ]
        }
    ],

    goodFriends: [
        {
            speaker: "서은",
            text: "네! 정말 좋은 친구가 되어요! 오래오래 연락하며 지내요!",
            character: "seoeun",
            choices: [
                { text: "평생 친구예요", next: "lifelongFriends", effect: { seoeun: +25 } },
                { text: "특별한 친구가 되어요", next: "specialFriends", effect: { seoeun: +30 } }
            ]
        }
    ],

    enjoyableWithYou: [
        {
            speaker: "서은",
            text: "저와 함께라서 즐겁다니 기뻐요! 저도 당신과 함께할 때가 제일 즐거워요!",
            character: "seoeun",
            choices: [
                { text: "그럼 더 자주 만나요", next: "meetMoreOften", effect: { seoeun: +30 } },
                { text: "매일 함께하고 싶어요", next: "wantToBeTogetherDaily", effect: { seoeun: +35 } }
            ]
        }
    ],

    // 최종 엔딩들로 연결되는 스토리들
    thoughtYouWerePretty: [
        {
            speaker: "서은",
            text: "그렇게 생각해주신다니... 고마워요. 기분이 좋아요! 😊",
            character: "seoeun",
            choices: [
                { text: "정말 아름다우세요", next: "reallyBeautiful", effect: { seoeun: +30 } },
                { text: "안에서 나오는 아름다움이요", next: "innerBeauty", effect: { seoeun: +35 } }
            ]
        }
    ],

    tryingToFocus: [
        {
            speaker: "서은",
            text: "아! 제가 방해가 되었나 봐요. 죄송해요! 좀 더 조용히 할게요.",
            character: "seoeun",
            choices: [
                { text: "아니에요! 선배 덕분에 더 집중돼요", next: "focusBetterWithYou", effect: { seoeun: +25 } },
                { text: "선배가 너무 매력적이어서...", next: "tooCharming", effect: { seoeun: +30 } }
            ]
        }
    ],

    reallyPretty: [
        {
            speaker: "서은",
            text: "자꾸 그런 말 하시면... 정말 부끄러워요! 하지만... 기분은 좋아요 😊",
            character: "seoeun",
            choices: [
                { text: "부끄러워하는 모습도 예뻐요", next: "cuteWhenShy", effect: { seoeun: +35 } },
                { text: "솔직한 제 마음이에요", next: "honestFeelings", effect: { seoeun: +30 } }
            ]
        }
    ],

    tooDirectApology: [
        {
            speaker: "서은",
            text: "아니에요! 직접적인 게 나쁘지 않아요. 솔직한 사람이 좋아요.",
            character: "seoeun",
            choices: [
                { text: "다행이에요", next: "relieved" },
                { text: "앞으로도 솔직하게 말할게요", next: "willBeHonest", effect: { seoeun: +25 } }
            ]
        }
    ],

    goodWithYou: [
        {
            speaker: "서은",
            text: "저 때문에 좋다니... 기뻐요! 저도 당신과 함께 있으면 기분이 좋아져요!",
            character: "seoeun",
            choices: [
                { text: "그럼 계속 함께 있어요", next: "stayTogetherAlways", effect: { seoeun: +35 } },
                { text: "서로에게 좋은 영향을 주네요", next: "goodInfluence", effect: { seoeun: +30 } }
            ]
        }
    ],

    tooPretty: [
        {
            speaker: "서은",
            text: "너무 예뻐서라니... 😳 그런 말 들으면 집중이 안 돼는 건 저도 마찬가지예요!",
            character: "seoeun",
            choices: [
                { text: "선배도 그런가요?", next: "youToo", effect: { seoeun: +35 } },
                { text: "그럼 둘 다 집중이 안 되겠네요", next: "bothCantFocus", effect: { seoeun: +40 } }
            ]
        }
    ],

    // 모든 최종 연결 스토리들 추가
    morecurious: [
        {
            speaker: "서은",
            text: "궁금해하시는 모습이 귀여워요! 그럼 더 기대하게 해드릴게요!",
            character: "seoeun",
            choices: [
                { text: "정말 기대돼요", next: "sweetCouple" },
                { text: "놀라게 해주세요", next: "mindReader" }
            ]
        }
    ],

    likeSurprise: [
        {
            speaker: "서은",
            text: "깜짝 선물이라니! 맞아요! 분명 좋아하실 거예요!",
            character: "seoeun",
            choices: [
                { text: "어떤 선물인지 상상해볼게요", next: "sweetCouple" },
                { text: "선배의 마음이 최고의 선물이에요", next: "perfectLove" }
            ]
        }
    ],

    contactTonight: [
        {
            speaker: "서은",
            text: "오늘 밤에요? 기대하고 있을게요! 일찍 자지 말고 기다릴게요!",
            character: "seoeun",
            choices: [
                { text: "꼭 연락드릴게요", next: "communicationExpert" },
                { text: "달콤한 꿈 꾸세요", next: "sweetCouple" }
            ]
        }
    ],

    contactTomorrow: [
        {
            speaker: "서은",
            text: "내일이면 충분해요! 어떤 연락이 올지 벌써부터 궁금해요!",
            character: "seoeun",
            choices: [
                { text: "특별한 연락일 거예요", next: "mindReader" },
                { text: "매일 연락하고 싶어요", next: "sweetCouple" }
            ]
        }
    ],

    notCarelesslyGiven: [
        {
            speaker: "서은",
            text: "맞아요! 연락처는 소중한 거니까요. 당신한테만 알려드린 거예요!",
            character: "seoeun",
            choices: [
                { text: "특별한 의미네요", next: "specialMeaning", effect: { seoeun: +25 } },
                { text: "정말 고마워요", next: "reallyThankful" }
            ]
        }
    ],

    wantMoreThanFriend: [
        {
            speaker: "서은",
            text: "친구 이상이라니... 😳 혹시 저를... 특별하게 생각하시는 건가요?",
            character: "seoeun",
            choices: [
                { text: "네, 정말 특별해요", next: "reallySpecial", effect: { seoeun: +35 } },
                { text: "사랑하고 있어요", next: "perfectLove" }
            ]
        }
    ],

    beGoodFriends: [
        {
            speaker: "서은",
            text: "좋은 친구가 되어요! 오래오래 함께해요!",
            character: "seoeun",
            choices: [
                { text: "평생 함께해요", next: "sweetCouple" },
                { text: "특별한 친구가 되어요", next: "empathyKing" }
            ]
        }
    ],

    dailyContact: [
        {
            speaker: "서은",
            text: "매일요? 좋아요! 매일매일 안부 인사해요! 재미있는 일상 공유해요!",
            character: "seoeun",
            choices: [
                { text: "매일이 즐거울 것 같아요", next: "sweetCouple" },
                { text: "당신과의 일상이 최고예요", next: "perfectLove" }
            ]
        }
    ],

    shareGoodThings: [
        {
            speaker: "서은",
            text: "좋은 일만 공유하자니 멋져요! 항상 긍정적인 에너지 주고받아요!",
            character: "seoeun",
            choices: [
                { text: "선배가 제일 좋은 일이에요", next: "youAreBestThing", effect: { seoeun: +30 } },
                { text: "함께하면 좋은 일만 생길 거예요", next: "goodThingsWithYou", effect: { seoeun: +25 } }
            ]
        }
    ],

    happyPerfectPartner: [
        {
            speaker: "서은",
            text: "완벽한 파트너라니 기뻐하시는군요! 저도 정말 기뻐요!",
            character: "seoeun",
            choices: [
                { text: "평생의 파트너가 되어주세요", next: "perfectLove" },
                { text: "최고의 팀워크로 살아가요", next: "communicationExpert" }
            ]
        }
    ],

    youAreMorePerfect: [
        {
            speaker: "서은",
            text: "제가 더 완벽하다니... 고마워요! 하지만 당신도 충분히 완벽해요!",
            character: "seoeun",
            choices: [
                { text: "서로 완벽한 커플이에요", next: "perfectLove" },
                { text: "서로를 더 완벽하게 만들어요", next: "mindReader" }
            ]
        }
    ],

    helpWithAnything: [
        {
            speaker: "서은",
            text: "뭐든 도와주신다니... 정말 의지가 되는 사람이에요!",
            character: "seoeun",
            choices: [
                { text: "평생 도와드릴게요", next: "perfectLove" },
                { text: "서로 도우며 살아요", next: "empathyKing" }
            ]
        }
    ],

    funStudyTogether: [
        {
            speaker: "서은",
            text: "같이 공부하면 정말 재미있을 것 같아요! 어려운 것도 같이하면 쉬워져요!",
            character: "seoeun",
            choices: [
                { text: "모든 걸 함께 해요", next: "sweetCouple" },
                { text: "평생 함께 배워가요", next: "realLoveDiscovery" }
            ]
        }
    ],

    solveLifeTogether: [
        {
            speaker: "서은",
            text: "인생 문제도 같이 해결하자니... 정말 든든해요! 무슨 일이든 같이 이겨낼 수 있을 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "평생 함께 이겨내요", next: "perfectLove" },
                { text: "최고의 팀이에요", next: "communicationExpert" }
            ]
        }
    ],

    bestTeam: [
        {
            speaker: "서은",
            text: "최고의 팀이라니 기뻐요! 우리 둘이면 뭐든 할 수 있을 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "세상을 정복해요", next: "manlyConfidence" },
                { text: "사랑으로 뭐든 이겨내요", next: "perfectLove" }
            ]
        }
    ],

    doEverythingTogether: [
        {
            speaker: "서은",
            text: "모든 걸 함께하자니... 정말 로맨틱해요! 평생 함께하고 싶어요!",
            character: "seoeun",
            choices: [
                { text: "평생 함께해요", next: "perfectLove" },
                { text: "매 순간이 특별할 거예요", next: "sweetCouple" }
            ]
        }
    ],

    bestTimeWithYou: [
        {
            speaker: "서은",
            text: "함께하는 시간이 제일 좋다니... 저도 똑같은 마음이에요!",
            character: "seoeun",
            choices: [
                { text: "매 순간을 소중히 해요", next: "sweetCouple" },
                { text: "더 많은 시간을 함께해요", next: "perfectLove" }
            ]
        }
    ],

    lifelongFriends: [
        {
            speaker: "서은",
            text: "평생 친구라니! 정말 좋은 말이에요! 오래오래 함께해요!",
            character: "seoeun",
            choices: [
                { text: "특별한 평생 친구예요", next: "empathyKing" },
                { text: "친구를 넘어선 관계로", next: "moreThanFriends" }
            ]
        }
    ],

    specialFriends: [
        {
            speaker: "서은",
            text: "특별한 친구... 그 말이 좋아요! 정말 특별한 사이가 된 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "가장 특별한 사람이에요", next: "mostSpecialPerson", effect: { seoeun: +35 } },
                { text: "더 특별해져요", next: "becomeMoreSpecial", effect: { seoeun: +30 } }
            ]
        }
    ],

    meetMoreOften: [
        {
            speaker: "서은",
            text: "더 자주 만나요! 매일 만나도 좋을 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "매일매일 만나요", next: "sweetCouple" },
                { text: "같이 지내요", next: "perfectLove" }
            ]
        }
    ],

    wantToBeTogetherDaily: [
        {
            speaker: "서은",
            text: "매일 함께하고 싶다니... 저도 같은 마음이에요! 매일 보고 싶어요!",
            character: "seoeun",
            choices: [
                { text: "그럼 사귀어요", next: "perfectLove" },
                { text: "매일매일 달콤하게", next: "sweetCouple" }
            ]
        }
    ],

    reallyBeautiful: [
        {
            speaker: "서은",
            text: "정말 아름답다니... 😊 그런 말 들으면 더 예뻐지는 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "원래도 완벽했어요", next: "perfectLove" },
                { text: "마음도 아름다워요", next: "mindReader" }
            ]
        }
    ],

    innerBeauty: [
        {
            speaker: "서은",
            text: "안에서 나오는 아름다움이라니... 정말 깊이 있는 말이에요. 감동이에요!",
            character: "seoeun",
            choices: [
                { text: "진짜 아름다움은 마음이니까요", next: "trueBeautyIsHeart", effect: { seoeun: +40 } },
                { text: "선배의 마음이 제일 아름다워요", next: "yourHeartIsBeautiful", effect: { seoeun: +35 } }
            ]
        }
    ],

    focusBetterWithYou: [
        {
            speaker: "서은",
            text: "저 덕분에 더 집중된다니 다행이에요! 서로에게 좋은 영향을 주는군요!",
            character: "seoeun",
            choices: [
                { text: "최고의 시너지예요", next: "bestSynergy", effect: { seoeun: +30 } },
                { text: "평생 함께하면 더 좋을 거예요", next: "betterTogether", effect: { seoeun: +35 } }
            ]
        }
    ],

    tooCharming: [
        {
            speaker: "서은",
            text: "매력적이어서라니... 😳 그런 말 들으면 정말 기분이 좋아요!",
            character: "seoeun",
            choices: [
                { text: "세상에서 제일 매력적이에요", next: "mostCharming", effect: { seoeun: +40 } },
                { text: "매일 더 매력적이 돼요", next: "moreCharmingDaily", effect: { seoeun: +35 } }
            ]
        }
    ],

    willBeHonest: [
        {
            speaker: "서은",
            text: "앞으로도 솔직하게 말해주세요! 솔직한 관계가 제일 좋아요!",
            character: "seoeun",
            choices: [
                { text: "모든 걸 솔직하게 말할게요", next: "allHonest", effect: { seoeun: +30 } },
                { text: "저도 진실한 관계가 좋아요요", next: "truthfulRelationship", effect: { seoeun: +35 } }
            ]
        }
    ],

    stayTogetherAlways: [
        {
            speaker: "서은",
            text: "계속 함께 있자니... 정말 좋은 말이에요! 평생 함께해요!",
            character: "seoeun",
            choices: [
                { text: "평생 떠나지 않을게요", next: "neverLeave", effect: { seoeun: +40 } },
                { text: "영원히 함께해요", next: "foreverTogether", effect: { seoeun: +45 } }
            ]
        }
    ],

    goodInfluence: [
        {
            speaker: "서은",
            text: "서로에게 좋은 영향을 준다니 멋져요! 같이 더 좋은 사람이 되어가요!",
            character: "seoeun",
            choices: [
                { text: "함께 성장해요", next: "growTogether", effect: { seoeun: +30 } },
                { text: "최고의 커플이 되어요", next: "bestCouple", effect: { seoeun: +35 } }
            ]
        }
    ],

    youToo: [
        {
            speaker: "서은",
            text: "저도 그래요! 당신 때문에 집중이 안 돼요... 😊 어떻게 해야 할까요?",
            character: "seoeun",
            choices: [
                { text: "그럼 집중하지 말아요", next: "dontConcentrate", effect: { seoeun: +35 } },
                { text: "서로만 바라봐요", next: "onlyLookAtEach", effect: { seoeun: +40 } }
            ]
        }
    ],

    bothCantFocus: [
        {
            speaker: "서은",
            text: "둘 다 집중이 안 된다니... 😍 그럼 공부 말고 다른 걸 해야겠네요!",
            character: "seoeun",
            choices: [
                { text: "서로에게만 집중해요", next: "focusOnEach", effect: { seoeun: +45 } },
                { text: "사랑에 집중해요", next: "focusOnLove", effect: { seoeun: +50 } }
            ]
        }
    ],

    // 모든 최종 엔딩 연결 완료 스토리들
    specialMeaning: [
        {
            speaker: "서은",
            text: "네, 정말 특별한 의미예요! 아무한테나 주는 번호가 아니거든요!",
            character: "seoeun",
            choices: [
                { text: "저에게 특별한 의미네요", next: "specialToMe", effect: { seoeun: +30 } },
                { text: "소중히 간직할게요", next: "treasureIt", effect: { seoeun: +25 } }
            ]
        }
    ],

    reallySpecial: [
        {
            speaker: "서은",
            text: "정말 특별하다니... 저도 당신을 특별하게 생각해요! 😊",
            character: "seoeun",
            choices: [
                { text: "그럼 우리 사귀어요", next: "perfectLove" },
                { text: "특별한 관계가 되어요", next: "mindReader" }
            ]
        }
    ],

    youAreBestThing: [
        {
            speaker: "서은",
            text: "제가 제일 좋은 일이라니... 😍 정말 달콤한 말이에요!",
            character: "seoeun",
            choices: [
                { text: "매일이 좋은 일이 될 거예요", next: "sweetCouple" },
                { text: "평생 최고의 일이에요", next: "perfectLove" }
            ]
        }
    ],

    goodThingsWithYou: [
        {
            speaker: "서은",
            text: "함께하면 좋은 일만 생긴다니! 정말 그럴 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "우리가 함께하면 기적이에요", next: "miracleTogether", effect: { seoeun: +35 } },
                { text: "행복만 가득할 거예요", next: "onlyHappiness", effect: { seoeun: +30 } }
            ]
        }
    ],

    // 더 깊은 관계로 발전하는 스토리들
    mostSpecialPerson: [
        {
            speaker: "서은",
            text: "가장 특별한 사람이라니... 😭 정말 감동이에요!",
            character: "seoeun",
            choices: [
                { text: "평생 가장 특별할 거예요", next: "alwaysMostSpecial", effect: { seoeun: +40 } },
                { text: "당신도 제게 가장 특별해요", next: "mutuallySpecial", effect: { seoeun: +35 } }
            ]
        }
    ],

    becomeMoreSpecial: [
        {
            speaker: "서은",
            text: "더 특별해지자니! 어떻게 더 특별해질 수 있을까요?",
            character: "seoeun",
            choices: [
                { text: "사랑으로 더 특별해져요", next: "moreSpecialWithLove", effect: { seoeun: +40 } },
                { text: "매일 더 가까워져요", next: "closerDaily", effect: { seoeun: +35 } }
            ]
        }
    ],

    trueBeautyIsHeart: [
        {
            speaker: "서은",
            text: "진짜 아름다움은 마음이라니... 당신도 정말 아름다운 마음을 가지고 있어요!",
            character: "seoeun",
            choices: [
                { text: "서로의 마음을 사랑해요", next: "loveEachHeart", effect: { seoeun: +45 } },
                { text: "마음으로 연결되어 있어요", next: "connectedByHeart", effect: { seoeun: +40 } }
            ]
        }
    ],

    yourHeartIsBeautiful: [
        {
            speaker: "서은",
            text: "제 마음이 제일 아름답다니... 당신이 그렇게 만들어줬어요!",
            character: "seoeun",
            choices: [
                { text: "서로가 서로를 아름답게 해요", next: "makeEachBeautiful", effect: { seoeun: +45 } },
                { text: "당신의 사랑 덕분이에요", next: "thanksToYourLove", effect: { seoeun: +40 } }
            ]
        }
    ],

    bestSynergy: [
        {
            speaker: "서은",
            text: "최고의 시너지라니! 정말 완벽한 조합인 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "완벽한 커플이에요", next: "perfectCouple", effect: { seoeun: +40 } },
                { text: "운명적인 만남이었어요", next: "destinyMeeting", effect: { seoeun: +35 } }
            ]
        }
    ],

    betterTogether: [
        {
            speaker: "서은",
            text: "평생 함께하면 더 좋을 거라니... 정말 그럴 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "영원히 함께해요", next: "foreverTogether", effect: { seoeun: +45 } },
                { text: "매일 더 좋아질 거예요", next: "betterEveryDay", effect: { seoeun: +40 } }
            ]
        }
    ],

    // 최고 수준의 로맨틱 스토리들
    mostCharming: [
        {
            speaker: "서은",
            text: "세상에서 제일 매력적이라니... 😍 그런 말 들으니까 정말 행복해요!",
            character: "seoeun",
            choices: [
                { text: "평생 제일 매력적일 거예요", next: "charmingForever", effect: { seoeun: +45 } },
                { text: "당신만의 매력이에요", next: "uniqueCharm", effect: { seoeun: +40 } }
            ]
        }
    ],

    moreCharmingDaily: [
        {
            speaker: "서은",
            text: "매일 더 매력적이 된다니! 그럼 앞으로가 더 기대돼요!",
            character: "seoeun",
            choices: [
                { text: "하하하... 부끄러워요", next: "prettierDaily", effect: { seoeun: +15, confidence: -5 } },
                { text: "그, 그런 말씀은...", next: "charmingTogether", effect: { seoeun: +20, stress: +10, confidence: -8 } }
            ]
        }
    ],

    prettierDaily: [
        {
            speaker: "서은",
            text: "부끄러워하시는 모습도 귀여워요! 😊",
            character: "seoeun",
            choices: [
                { text: "정말 부끄러워요...", next: "sweetCouple", effect: { seoeun: +25, confidence: -3 } },
                { text: "조금씩 익숙해질게요", next: "sweetCouple", effect: { seoeun: +30, confidence: +5 } }
            ]
        }
    ],

    charmingTogether: [
        {
            speaker: "서은",
            text: "말을 더듬으시는 모습이 너무 귀여워요! 😊",
            character: "seoeun",
            choices: [
                { text: "앞으로는 더 잘 표현할게요", next: "communicationExpert", effect: { seoeun: +35, confidence: +10 } },
                { text: "부끄러움을 이겨낼게요", next: "communicationExpert", effect: { seoeun: +30, confidence: +8 } }
            ]
        }
    ],

    // 진실하고 솔직한 관계 스토리들
    allHonest: [
        {
            speaker: "서은",
            text: "모든 걸 솔직하게 말해주신다니! 정말 믿을 수 있는 사람이에요!",
            character: "seoeun",
            choices: [
                { text: "숨김없는 관계가 최고예요", next: "noSecrets", effect: { seoeun: +40 } },
                { text: "평생 솔직하게 살아요", next: "honestForever", effect: { seoeun: +35 } }
            ]
        }
    ],

    truthfulRelationship: [
        {
            speaker: "서은",
            text: "진실한 관계라니... 정말 소중한 거예요! 그런 관계를 만들어가요!",
            character: "seoeun",
            choices: [
                { text: "진실한 사랑을 해요", next: "trueLove", effect: { seoeun: +45 } },
                { text: "평생 진실하게 지내요", next: "truthfulForever", effect: { seoeun: +40 } }
            ]
        }
    ],

    // 영원한 사랑 스토리들
    neverLeave: [
        {
            speaker: "서은",
            text: "평생 떠나지 않겠다니... 😭 정말 감동이에요! 저도 절대 떠나지 않을게요!",
            character: "seoeun",
            choices: [
                { text: "영원한 약속이에요", next: "eternalPromise", effect: { seoeun: +50 } },
                { text: "서로를 지켜주어요", next: "protectEach", effect: { seoeun: +45 } }
            ]
        }
    ],

    foreverTogether: [
        {
            speaker: "서은",
            text: "영원히 함께해요! 정말 완벽한 말이에요! 💕",
            character: "seoeun",
            choices: [
                { text: "완벽한 사랑이에요", next: "perfectLove" },
                { text: "천생연분이에요", next: "soulmate", effect: { seoeun: +50 } }
            ]
        }
    ],

    // 성장과 발전 스토리들
    growTogether: [
        {
            speaker: "서은",
            text: "함께 성장하자니! 서로를 더 좋게 만들어가는 거네요!",
            character: "seoeun",
            choices: [
                { text: "평생 함께 발전해요", next: "developTogether", effect: { seoeun: +40 } },
                { text: "최고의 자신이 되어요", next: "becomeBest", effect: { seoeun: +35 } }
            ]
        }
    ],

    bestCouple: [
        {
            speaker: "서은",
            text: "최고의 커플이 되자니! 정말 멋진 목표예요!",
            character: "seoeun",
            choices: [
                { text: "모든 면에서 최고가 되어요", next: "bestInEverything", effect: { seoeun: +40 } },
                { text: "사랑으로 최고가 되어요", next: "bestWithLove", effect: { seoeun: +45 } }
            ]
        }
    ],

    // 집중과 사랑 스토리들
    dontConcentrate: [
        {
            speaker: "서은",
            text: "집중하지 말라니... 😊 그럼 뭘 해야 할까요?",
            character: "seoeun",
            choices: [
                { text: "서로만 보면 돼요", next: "onlyLookAtEach", effect: { seoeun: +40 } },
                { text: "사랑만 하면 돼요", next: "onlyLove", effect: { seoeun: +45 } }
            ]
        }
    ],

    onlyLookAtEach: [
        {
            speaker: "서은",
            text: "서로만 바라보자니... 😍 정말 로맨틱해요!",
            character: "seoeun",
            choices: [
                { text: "당신만 보고 살게요", next: "onlyLookAtYou", effect: { seoeun: +45 } },
                { text: "서로가 전부예요", next: "everythingToEach", effect: { seoeun: +50 } }
            ]
        }
    ],

    focusOnEach: [
        {
            speaker: "서은",
            text: "서로에게만 집중하자니... 완벽한 생각이에요!",
            character: "seoeun",
            choices: [
                { text: "당신이 제 전부예요", next: "youAreEverything", effect: { seoeun: +50 } },
                { text: "완전한 사랑이에요", next: "completeLove", effect: { seoeun: +45 } }
            ]
        }
    ],

    focusOnLove: [
        {
            speaker: "서은",
            text: "사랑에 집중하자니... 😍 세상에서 제일 달콤한 말이에요!",
            character: "seoeun",
            choices: [
                { text: "사랑만 있으면 돼요", next: "onlyNeedLove", effect: { seoeun: +50 } },
                { text: "평생 사랑에 집중해요", next: "focusOnLoveForever", effect: { seoeun: +45 } }
            ]
        }
    ],

    // 최종 완벽한 엔딩으로 연결하는 스토리들 - 모두 주요 엔딩으로 연결
    specialToMe: [
        {
            speaker: "서은",
            text: "당신에게 특별한 의미라니... 저도 당신이 특별해요!",
            character: "seoeun",
            choices: [
                { text: "평생 특별할 거예요", next: "perfectLove" }
            ]
        }
    ],

    treasureIt: [
        {
            speaker: "서은",
            text: "소중히 간직해주신다니 고마워요!",
            character: "seoeun",
            choices: [
                { text: "당신을 소중히 할게요", next: "sweetCouple" }
            ]
        }
    ],

    miracleTogether: [
        {
            speaker: "서은",
            text: "우리가 함께하면 기적이라니... 정말 그런 것 같아요!",
            character: "seoeun",
            choices: [
                { text: "매일이 기적일 거예요", next: "perfectLove" }
            ]
        }
    ],

    onlyHappiness: [
        {
            speaker: "서은",
            text: "행복만 가득하겠네요! 정말 기대돼요!",
            character: "seoeun",
            choices: [
                { text: "평생 행복할 거예요", next: "sweetCouple" }
            ]
        }
    ],

    alwaysMostSpecial: [
        {
            speaker: "서은",
            text: "평생 가장 특별하다니... 😭 완벽한 약속이에요!",
            character: "seoeun",
            choices: [
                { text: "영원한 약속이에요", next: "perfectLove" }
            ]
        }
    ],

    mutuallySpecial: [
        {
            speaker: "서은",
            text: "서로에게 가장 특별하다니... 완벽해요!",
            character: "seoeun",
            choices: [
                { text: "완벽한 사랑이에요", next: "perfectLove" }
            ]
        }
    ],

    // 나머지 모든 스토리들을 주요 엔딩으로 연결
    moreSpecialWithLove: [{ speaker: "서은", text: "사랑으로 더 특별해지는 거네요!", character: "seoeun", choices: [{ text: "완벽한 사랑을 해요", next: "perfectLove" }] }],
    closerDaily: [{ speaker: "서은", text: "매일 더 가까워진다니 설레요!", character: "seoeun", choices: [{ text: "매일 더 사랑해요", next: "sweetCouple" }] }],
    loveEachHeart: [{ speaker: "서은", text: "서로의 마음을 사랑한다니 완벽해요!", character: "seoeun", choices: [{ text: "마음으로 하나가 되어요", next: "perfectLove" }] }],
    connectedByHeart: [{ speaker: "서은", text: "마음으로 연결되어 있다니 로맨틱해요!", character: "seoeun", choices: [{ text: "영혼의 동반자예요", next: "mindReader" }] }],
    makeEachBeautiful: [{ speaker: "서은", text: "서로를 아름답게 만든다니!", character: "seoeun", choices: [{ text: "완벽한 조화예요", next: "perfectLove" }] }],
    thanksToYourLove: [{ speaker: "서은", text: "당신의 사랑 덕분이라니 감동이에요!", character: "seoeun", choices: [{ text: "사랑의 힘이에요", next: "perfectLove" }] }],
    perfectCouple: [{ speaker: "서은", text: "완벽한 커플이라니!", character: "seoeun", choices: [{ text: "완벽한 사랑을 해요", next: "perfectLove" }] }],
    destinyMeeting: [{ speaker: "서은", text: "운명적인 만남이었다니!", character: "seoeun", choices: [{ text: "운명의 사랑이에요", next: "perfectLove" }] }],
    betterEveryDay: [{ speaker: "서은", text: "매일 더 좋아진다니!", character: "seoeun", choices: [{ text: "영원히 발전해요", next: "realLoveDiscovery" }] }],
    charmingForever: [{ speaker: "서은", text: "평생 제일 매력적이라니!", character: "seoeun", choices: [{ text: "영원한 매력이에요", next: "mindReader" }] }],
    uniqueCharm: [{ speaker: "서은", text: "당신만의 매력이라니!", character: "seoeun", choices: [{ text: "특별한 사람이에요", next: "mindReader" }] }],
    prettierDaily: [{ speaker: "서은", text: "저도 매일 더 예뻐진다니!", character: "seoeun", choices: [{ text: "서로 더 아름다워져요", next: "sweetCouple" }] }],
    charmingTogether: [{ speaker: "서은", text: "함께 더 매력적이 된다니!", character: "seoeun", choices: [{ text: "최고의 커플이에요", next: "communicationExpert" }] }],
    noSecrets: [{ speaker: "서은", text: "숨김없는 관계라니 완벽해요!", character: "seoeun", choices: [{ text: "투명한 사랑이에요", next: "communicationExpert" }] }],
    honestForever: [{ speaker: "서은", text: "평생 솔직하게 살자니!", character: "seoeun", choices: [{ text: "진실한 사랑이에요", next: "communicationExpert" }] }],
    trueLove: [{ speaker: "서은", text: "진실한 사랑이라니!", character: "seoeun", choices: [{ text: "완벽한 사랑이에요", next: "perfectLove" }] }],
    truthfulForever: [{ speaker: "서은", text: "평생 진실하게!", character: "seoeun", choices: [{ text: "영원한 진실이에요", next: "communicationExpert" }] }],
    eternalPromise: [{ speaker: "서은", text: "영원한 약속이라니!", character: "seoeun", choices: [{ text: "완벽한 사랑이에요", next: "perfectLove" }] }],
    protectEach: [{ speaker: "서은", text: "서로를 지켜준다니!", character: "seoeun", choices: [{ text: "평생 지켜드릴게요", next: "empathyKing" }] }],
    soulmate: [{ speaker: "서은", text: "천생연분이라니!", character: "seoeun", choices: [{ text: "완벽한 사랑이에요", next: "perfectLove" }] }],
    developTogether: [{ speaker: "서은", text: "평생 함께 발전한다니!", character: "seoeun", choices: [{ text: "함께 성장해요", next: "realLoveDiscovery" }] }],
    becomeBest: [{ speaker: "서은", text: "최고의 자신이 된다니!", character: "seoeun", choices: [{ text: "최고의 커플이 되어요", next: "manlyConfidence" }] }],
    bestInEverything: [{ speaker: "서은", text: "모든 면에서 최고라니!", character: "seoeun", choices: [{ text: "완벽한 커플이에요", next: "perfectLove" }] }],
    bestWithLove: [{ speaker: "서은", text: "사랑으로 최고가 된다니!", character: "seoeun", choices: [{ text: "사랑의 힘이에요", next: "perfectLove" }] }],
    onlyLove: [{ speaker: "서은", text: "사랑만 하면 된다니!", character: "seoeun", choices: [{ text: "사랑이 전부예요", next: "perfectLove" }] }],
    onlyLookAtYou: [{ speaker: "서은", text: "당신만 보고 산다니!", character: "seoeun", choices: [{ text: "완전한 사랑이에요", next: "perfectLove" }] }],
    everythingToEach: [{ speaker: "서은", text: "서로가 전부라니!", character: "seoeun", choices: [{ text: "완벽한 사랑이에요", next: "perfectLove" }] }],
    youAreEverything: [{ speaker: "서은", text: "당신이 제 전부라니!", character: "seoeun", choices: [{ text: "완벽한 사랑이에요", next: "perfectLove" }] }],
    completeLove: [{ speaker: "서은", text: "완전한 사랑이라니!", character: "seoeun", choices: [{ text: "완벽한 사랑이에요", next: "perfectLove" }] }],
    onlyNeedLove: [{ speaker: "서은", text: "사랑만 있으면 된다니!", character: "seoeun", choices: [{ text: "사랑이 전부예요", next: "perfectLove" }] }],
    focusOnLoveForever: [{ speaker: "서은", text: "평생 사랑에 집중한다니!", character: "seoeun", choices: [{ text: "영원한 사랑이에요", next: "perfectLove" }] }]
};

// 엔딩 데이터 (15개 - 핵심 엔딩들)
const endings = {
    // 성공적인 연애 엔딩들 (6개)
    womenLanguageMaster: {
        title: "여성 언어 마스터 🧠",
        text: "'뭐해?'='나랑 시간 보내자', '이거 어때?'='사주면 좋겠어', '화 안 났는데?'='몰라서 물어?' 이제 당신은 여성 언어의 진짜 의미를 완벽하게 이해하는 연애 고수가 되었습니다!"
    },
    
    mindReader: {
        title: "마음을 읽는 남자 🔮",
        text: "서은이 말하기도 전에 진짜 원하는 것을 알아차리는 당신. '어떻게 내 마음을 이렇게 잘 알아?'라며 감탄하는 서은과 완벽한 커플이 되었습니다."
    },
    
    perfectLove: {
        title: "완벽한 사랑 💕",
        text: "서로를 완전히 이해하고 신뢰하게 된 당신과 서은. 모든 갈등을 지혜롭게 해결하며 진정한 사랑을 만들어가고 있습니다."
    },
    
    sweetCouple: {
        title: "달콤한 연인 🍯",
        text: "매일매일이 달콤한 데이트와 소소한 행복으로 가득한 당신들. 주변 사람들이 부러워하는 커플이 되었습니다."
    },
    
    empathyKing: {
        title: "공감의 왕 👑",
        text: "'나 오늘 속상한 일 있었어'='내 편 들어달라'는 뜻을 완벽하게 이해한 당신. 서은이 힘들 때마다 정확히 원하는 반응을 해주는 최고의 남자친구가 되었습니다."
    },
    
    communicationExpert: {
        title: "소통의 달인 💭",
        text: "'연락하지마'='더 신경써달라', '나 신경쓰지말고 놀아'='적당히 신경쓰면서 놀아'의 의미를 깨달은 당신. 이제 어떤 암묵적 메시지도 놓치지 않습니다."
    },
    
    // 성장 엔딩들 (5개)
    noMoreNaive: {
        title: "더 이상 순진하지 않아 💪",
        text: "여자들의 '하지마'가 '하라는 뜻'이라는 걸 깨달은 당신. 이제 눈치도 보고 적당히 주도권도 가져갈 줄 아는 남자가 되었습니다."
    },
    
    manlyConfidence: {
        title: "남자다운 자신감 🦁",
        text: "굽신거리지 않고 당당하게 행동하는 법을 배운 당신. 서은도 변화한 당신의 모습에 더욱 끌리게 되었습니다."
    },
    
    respectfulDistance: {
        title: "적당한 거리 유지 🎯",
        text: "전남친 앞에서 굽신거리지 않되, 예의는 지키는 법을 배운 당신. 이제 당당하면서도 성숙한 연인이 되었습니다."
    },
    
    realLoveDiscovery: {
        title: "진짜 사랑의 발견 💝",
        text: "여성의 숨겨진 언어를 이해하면서 진짜 사랑이 무엇인지 깨달은 당신. 말보다는 마음을, 표면보다는 진심을 읽는 법을 배웠습니다."
    },
    
    doormatNoMore: {
        title: "발톱 숨긴 호랑이 🐅",
        text: "그동안 너무 착하기만 했던 자신을 반성한 당신. 이제 적당히 질투도 표현하고 주도권도 가져가는 진짜 남자가 되었습니다."
    },
    
    // 중간/교훈 엔딩들 (4개)
    personalGrowth: {
        title: "혼자서도 완전한 나 🌱",
        text: "연애를 통해 자신의 문제점을 깨닫고 크게 성장한 당신. 이제 더 좋은 사람으로 새로운 사랑을 시작할 준비가 되었습니다."
    },
    
    wisdomGained: {
        title: "얻은 지혜 🎓",
        text: "첫 연애의 달콤함과 쓴맛을 모두 경험한 당신. 이제 진정한 사랑이 무엇인지, 여성의 마음을 어떻게 읽어야 하는지 알게 되었습니다."
    },
    
    subtleMaster: {
        title: "눈치의 달인 👁️",
        text: "'아 말걸지마'='달래달라는 신호'라는 것을 깨달은 당신. 이제 서은이 화가 나도 당황하지 않고 적절히 대응하는 연애 고수가 되었습니다."
    },
    
    bitterRealization: {
        title: "뼈아픈 깨달음 😔",
        text: "4년째 연락하는 전남친의 존재를 뒤늦게 깨달은 당신. 너무 늦었지만 다음 연애에서는 더 현명할 것입니다."
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
    // 이벤트 리스너 설정을 배열로 최적화
    const eventListeners = [
        { id: 'newGameBtn', event: 'click', handler: startNewGame },
        { id: 'continueBtn', event: 'click', handler: continueGame },
        { id: 'creditsBtn', event: 'click', handler: showCredits },
        { id: 'menuBtn', event: 'click', handler: toggleMenu },
        { id: 'saveBtn', event: 'click', handler: showSaveScreen },
        { id: 'loadBtn', event: 'click', handler: showLoadScreen },
        { id: 'resumeBtn', event: 'click', handler: toggleMenu },
        { id: 'titleBtn', event: 'click', handler: goToTitle },
        { id: 'closeSaveBtn', event: 'click', handler: closeSaveScreen },
        { id: 'restartBtn', event: 'click', handler: startNewGame }
    ];
    
    // 이벤트 리스너 일괄 등록
    eventListeners.forEach(({ id, event, handler }) => {
        const element = document.getElementById(id);
        if (element) element.addEventListener(event, handler);
    });
    
    // 설정 버튼 (개발 중)
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            alert('설정 기능은 아직 개발 중입니다.');
        });
    }
    
    // 텍스트 박스 클릭으로 다음 진행
    const textBox = document.querySelector('.text-box');
    if (textBox) textBox.addEventListener('click', nextDialogue);
    
    // 메뉴 버튼 더블클릭으로 관계도 토글
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) menuBtn.addEventListener('dblclick', toggleSidePanel);
}

function startNewGame() {
    gameState.currentScene = 'start';
    gameState.currentStoryIndex = 0;
    gameState.relationships = { seoeun: 0, confidence: 50, stress: 30 };
    gameState.flags = { firstMeet: false, confessed: false, dating: false, firstDate: false, metFriends: false, metMinsu: false, hadFight: false, madeUp: false };
    gameState.phase = 'meeting';
    
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
    alert('제작: 김주영\n게임: 현실적 연애\n\n여성 언어의 숨은 뜻을 파헤치며 현실적인 연애의 복잡함과 성장을 다룬 미연시 게임입니다.');
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
        'seoeun': '👩',
        'minsu': '👨', 
        'neutral': '🤔',
        'happy': '',
        'sad': ''
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
    
    // 디버그 로그 추가
    console.log('선택지 개수:', choices.length);
    console.log('선택지 내용:', choices);
    
    const fragment = document.createDocumentFragment();
    
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn slide-up';
        button.textContent = choice.text;
        button.style.animationDelay = `${index * 0.1}s`;
        
        button.addEventListener('click', () => selectChoice(choice));
        fragment.appendChild(button);
        
        // 각 선택지 생성 로그
        console.log(`선택지 ${index + 1} 생성:`, choice.text);
    });
    
    elements.choiceContainer.appendChild(fragment);
    
    // 최종 확인 로그
    console.log('DOM에 추가된 선택지 개수:', elements.choiceContainer.children.length);
}

function selectChoice(choice) {
    // 효과 적용
    if (choice.effect) {
        Object.entries(choice.effect).forEach(([key, value]) => {
            if (gameState.relationships[key] !== undefined) {
                gameState.relationships[key] = Math.max(0, Math.min(100, gameState.relationships[key] + value));
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
            setTimeout(showCurrentStory, 500);
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
    const relationships = [
        { barId: 'seoeunsBar', scoreId: 'seoeunScore', value: gameState.relationships.seoeun, label: '서은 호감도: ' },
        { barId: 'minsuBar', scoreId: 'minsuScore', value: gameState.relationships.confidence, label: '자신감: ' },
        { barId: 'confidenceBar', scoreId: 'confidenceScore', value: gameState.relationships.stress, label: '스트레스: ' }
    ];
    
    relationships.forEach(({ barId, scoreId, value, label }) => {
        const bar = document.getElementById(barId);
        const score = document.getElementById(scoreId);
        
        if (bar) bar.style.width = `${Math.min(100, Math.max(0, value))}%`;
        if (score) {
            score.textContent = `${label}${Math.min(100, Math.max(0, value))}`;
        }
    });
}

function toggleSidePanel() {
    elements.sidePanel.classList.toggle('show');
}

function toggleMenu() {
    const isVisible = elements.menuOverlay.style.display === 'flex';
    elements.menuOverlay.style.display = isVisible ? 'none' : 'flex';
}

function showSaveScreen() {
    setupSaveLoadScreen('게임 저장', saveGame);
}

function showLoadScreen() {
    setupSaveLoadScreen('게임 불러오기', loadGame);
}

function setupSaveLoadScreen(title, handler) {
    document.getElementById('saveTitle').textContent = title;
    elements.saveOverlay.style.display = 'flex';
    
    // 슬롯 이벤트 리스너 설정
    document.querySelectorAll('.save-slot').forEach(slot => {
        slot.onclick = () => handler(slot.dataset.slot);
    });
}

function saveGame(slotNumber) {
    const saveData = {
        ...gameState,
        saveTime: new Date().toLocaleString()
    };
    
    // 로컬 스토리지에 저장
    const saves = {
        [`datingSim_save_${slotNumber}`]: saveData,
        'datingSim_save': saveData // 기본 저장
    };
    
    Object.entries(saves).forEach(([key, data]) => {
        localStorage.setItem(key, JSON.stringify(data));
    });
    
    // 슬롯 정보 업데이트
    const slot = document.querySelector(`[data-slot="${slotNumber}"]`);
    const slotInfo = slot?.querySelector('.slot-info');
    if (slotInfo) slotInfo.textContent = saveData.saveTime;
    
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
