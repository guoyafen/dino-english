export type GameType = 'listen-select' | 'letter-match' | 'word-image' | 'response-choice'

export interface GameOption {
  id: string
  text: string
  image?: string
  isCorrect?: boolean
}

export interface Game {
  type: GameType
  instruction: string
  audioPrompt?: string
  options?: GameOption[]
  correctId?: string
  pairs?: { left: string; right: string }[]
}

export interface ListenCard {
  english: string
  chinese: string
  emoji: string
}

export interface RepeatSentence {
  english: string
  chinese: string
}

export interface DayData {
  day: number
  title: string
  subtitle: string
  mapName: string
  coreExpressions: string[]
  goal: string
  listenCards: ListenCard[]
  repeatSentences: RepeatSentence[]
  game: Game
  stageLines: string[]
  stageChinese: string[]
  reward: string
}

export const DAYS: DayData[] = [
  {
    day: 1,
    title: 'Day 1',
    subtitle: 'Hello, 小恐龙！',
    mapName: 'Hello Cave',
    coreExpressions: ['Hello!', 'Hi!', "I'm Dino.", "I'm ____."],
    goal: '和小恐龙打招呼，并说出 "I\'m ____."',
    listenCards: [
      { english: 'Hello!', chinese: '你好！', emoji: '👋' },
      { english: 'Hi!', chinese: '嗨！', emoji: '😊' },
      { english: "I'm Dino.", chinese: '我是Dino。', emoji: '🦕' },
    ],
    repeatSentences: [
      { english: 'Hello!', chinese: '你好！' },
      { english: 'Hi!', chinese: '嗨！' },
      { english: "I'm ____.", chinese: '我是____。' },
    ],
    game: {
      type: 'response-choice',
      instruction: '小恐龙说 Hello！你应该怎么回应？',
      audioPrompt: 'Hello!',
      options: [
        { id: 'a', text: 'Hi!', isCorrect: true },
        { id: 'b', text: 'Goodbye!', isCorrect: false },
        { id: 'c', text: 'Thank you!', isCorrect: false },
      ],
    },
    stageLines: ['Hello!', "I'm ____."],
    stageChinese: ['你好！', '我是____。'],
    reward: '⭐',
  },
  {
    day: 2,
    title: 'Day 2',
    subtitle: "What's your name?",
    mapName: 'Name Forest',
    coreExpressions: ["What's your name?", 'My name is ____.'],
    goal: '能听懂别人问名字，并用英文回答',
    listenCards: [
      { english: "What's your name?", chinese: '你叫什么名字？', emoji: '🤔' },
      { english: 'My name is Dino.', chinese: '我的名字是Dino。', emoji: '🦕' },
      { english: 'Nice to meet you!', chinese: '很高兴认识你！', emoji: '🤝' },
    ],
    repeatSentences: [
      { english: "What's your name?", chinese: '你叫什么名字？' },
      { english: 'My name is ____.', chinese: '我的名字是____。' },
    ],
    game: {
      type: 'listen-select',
      instruction: '听一听，选出正确的图片！',
      audioPrompt: 'What is your name?',
      options: [
        { id: 'name', text: '名字卡片', emoji: '📛', isCorrect: true },
        { id: 'age', text: '年龄', emoji: '🎂', isCorrect: false },
        { id: 'color', text: '颜色', emoji: '🎨', isCorrect: false },
      ] as any,
    },
    stageLines: ['Hello!', 'My name is ____.'],
    stageChinese: ['你好！', '我的名字是____。'],
    reward: '⭐',
  },
  {
    day: 3,
    title: 'Day 3',
    subtitle: 'How are you?',
    mapName: 'Feeling Pond',
    coreExpressions: ['How are you?', "I'm fine.", "I'm good.", "I'm happy."],
    goal: '能完成简单问候',
    listenCards: [
      { english: 'How are you?', chinese: '你好吗？', emoji: '😃' },
      { english: "I'm fine.", chinese: '我很好。', emoji: '😊' },
      { english: "I'm happy!", chinese: '我很开心！', emoji: '😄' },
    ],
    repeatSentences: [
      { english: 'How are you?', chinese: '你好吗？' },
      { english: "I'm fine.", chinese: '我很好。' },
      { english: "I'm happy!", chinese: '我很开心！' },
    ],
    game: {
      type: 'response-choice',
      instruction: '小恐龙问 How are you? 你怎么回答？',
      audioPrompt: 'How are you?',
      options: [
        { id: 'a', text: "I'm fine!", isCorrect: true },
        { id: 'b', text: 'My name is Dino.', isCorrect: false },
        { id: 'c', text: "I'm eight.", isCorrect: false },
      ],
    },
    stageLines: ['Hi!', "I'm fine."],
    stageChinese: ['嗨！', '我很好。'],
    reward: '⭐',
  },
  {
    day: 4,
    title: 'Day 4',
    subtitle: 'How old are you?',
    mapName: 'Birthday Hill',
    coreExpressions: ['How old are you?', "I'm eight.", "I'm nine."],
    goal: '能说自己的年龄',
    listenCards: [
      { english: 'How old are you?', chinese: '你几岁了？', emoji: '🎂' },
      { english: "I'm eight.", chinese: '我八岁。', emoji: '8️⃣' },
      { english: "I'm nine.", chinese: '我九岁。', emoji: '9️⃣' },
    ],
    repeatSentences: [
      { english: 'How old are you?', chinese: '你几岁了？' },
      { english: "I'm eight.", chinese: '我八岁。' },
    ],
    game: {
      type: 'listen-select',
      instruction: '听到数字，选出正确的蜡烛数量！',
      audioPrompt: 'I am eight years old.',
      options: [
        { id: '8', text: '8️⃣ 八岁', isCorrect: true },
        { id: '6', text: '6️⃣ 六岁', isCorrect: false },
        { id: '10', text: '🔟 十岁', isCorrect: false },
      ] as any,
    },
    stageLines: ['My name is ____.', "I'm eight."],
    stageChinese: ['我的名字是____。', '我八岁。'],
    reward: '⭐',
  },
  {
    day: 5,
    title: 'Day 5',
    subtitle: 'I like dinosaurs.',
    mapName: 'Like Park',
    coreExpressions: ['I like dinosaurs.', 'I like cats.', 'Do you like dinosaurs?', 'Yes, I do.'],
    goal: '能表达喜欢什么',
    listenCards: [
      { english: 'I like dinosaurs!', chinese: '我喜欢恐龙！', emoji: '🦕' },
      { english: 'I like cats.', chinese: '我喜欢猫。', emoji: '🐱' },
      { english: 'I like dogs.', chinese: '我喜欢狗。', emoji: '🐶' },
    ],
    repeatSentences: [
      { english: 'I like dinosaurs!', chinese: '我喜欢恐龙！' },
      { english: 'Do you like dinosaurs?', chinese: '你喜欢恐龙吗？' },
      { english: 'Yes, I do!', chinese: '是的，我喜欢！' },
    ],
    game: {
      type: 'word-image',
      instruction: '把单词和图片连起来！',
      pairs: [
        { left: 'dinosaur 🦕', right: '恐龙' },
        { left: 'cat 🐱', right: '猫' },
        { left: 'dog 🐶', right: '狗' },
      ],
    },
    stageLines: ['I like dinosaurs!'],
    stageChinese: ['我喜欢恐龙！'],
    reward: '⭐',
  },
  {
    day: 6,
    title: 'Day 6',
    subtitle: "Let's play!",
    mapName: 'Play Ground',
    coreExpressions: ["Let's play!", 'OK!', 'Great!', 'Goodbye!'],
    goal: '能理解简单邀请和回应',
    listenCards: [
      { english: "Let's play!", chinese: '我们去玩吧！', emoji: '🎮' },
      { english: 'OK!', chinese: '好的！', emoji: '👍' },
      { english: 'Goodbye!', chinese: '再见！', emoji: '👋' },
    ],
    repeatSentences: [
      { english: "Let's play!", chinese: '我们去玩吧！' },
      { english: 'OK!', chinese: '好的！' },
      { english: 'Goodbye!', chinese: '再见！' },
    ],
    game: {
      type: 'response-choice',
      instruction: '小恐龙说 Let\'s play! 你应该怎么回应？',
      audioPrompt: "Let's play!",
      options: [
        { id: 'ok', text: 'OK!', isCorrect: true },
        { id: 'no', text: 'Goodbye!', isCorrect: false },
        { id: 'name', text: 'My name is Dino.', isCorrect: false },
      ],
    },
    stageLines: ["Let's play!", 'OK!'],
    stageChinese: ['我们去玩吧！', '好的！'],
    reward: '⭐',
  },
  {
    day: 7,
    title: 'Day 7',
    subtitle: 'Hello Show 🌟',
    mapName: 'Hello Show',
    coreExpressions: ['Hello!', 'My name is ____.', "I'm eight.", "I'm fine.", 'I like dinosaurs.', 'Goodbye!'],
    goal: '完成第一阶段自我介绍小展示',
    listenCards: [
      { english: 'Hello!', chinese: '你好！', emoji: '👋' },
      { english: 'My name is ____.', chinese: '我的名字是____。', emoji: '📛' },
      { english: 'I like dinosaurs!', chinese: '我喜欢恐龙！', emoji: '🦕' },
    ],
    repeatSentences: [
      { english: 'Hello!', chinese: '你好！' },
      { english: 'My name is ____.', chinese: '我的名字是____。' },
      { english: "I'm eight.", chinese: '我八岁。' },
      { english: "I'm fine.", chinese: '我很好。' },
      { english: 'I like dinosaurs.', chinese: '我喜欢恐龙。' },
      { english: 'Goodbye!', chinese: '再见！' },
    ],
    game: {
      type: 'response-choice',
      instruction: '复习一下！别人问 What\'s your name? 你怎么回答？',
      audioPrompt: "What's your name?",
      options: [
        { id: 'name', text: 'My name is ____!', isCorrect: true },
        { id: 'age', text: "I'm eight.", isCorrect: false },
        { id: 'like', text: 'I like dinosaurs.', isCorrect: false },
      ],
    },
    stageLines: ['Hello!', 'My name is ____.', "I'm eight.", "I'm fine.", 'I like dinosaurs.', 'Goodbye!'],
    stageChinese: ['你好！', '我的名字是____。', '我八岁。', '我很好。', '我喜欢恐龙。', '再见！'],
    reward: '🌟 Hello Star Badge',
  },
  {
    day: 8,
    title: 'Day 8',
    subtitle: 'ABC 恐龙蛋！',
    mapName: 'ABC Egg Land',
    coreExpressions: ['A B C D E F G', 'a b c d e f g'],
    goal: '识别 A–G 的大小写',
    listenCards: [
      { english: 'A a', chinese: 'A - Apple 苹果', emoji: '🍎' },
      { english: 'B b', chinese: 'B - Ball 球', emoji: '⚽' },
      { english: 'C c', chinese: 'C - Cat 猫', emoji: '🐱' },
      { english: 'D d', chinese: 'D - Dog 狗', emoji: '🐶' },
      { english: 'E e', chinese: 'E - Egg 蛋', emoji: '🥚' },
    ],
    repeatSentences: [
      { english: 'A, B, C!', chinese: '字母 A B C！' },
      { english: 'D, E, F, G!', chinese: '字母 D E F G！' },
    ],
    game: {
      type: 'letter-match',
      instruction: '把大写字母和小写字母配对！',
      pairs: [
        { left: 'A', right: 'a' },
        { left: 'B', right: 'b' },
        { left: 'C', right: 'c' },
        { left: 'D', right: 'd' },
      ],
    },
    stageLines: ['A, B, C!'],
    stageChinese: ['字母 A B C！'],
    reward: '⭐',
  },
  {
    day: 9,
    title: 'Day 9',
    subtitle: 'Letters H–N',
    mapName: 'Letter Train',
    coreExpressions: ['H I J K L M N', 'h i j k l m n'],
    goal: '识别 H–N 的大小写',
    listenCards: [
      { english: 'H h', chinese: 'H - Hat 帽子', emoji: '🎩' },
      { english: 'I i', chinese: 'I - Ice cream 冰淇淋', emoji: '🍦' },
      { english: 'J j', chinese: 'J - Jump 跳', emoji: '🦘' },
      { english: 'K k', chinese: 'K - Kite 风筝', emoji: '🪁' },
      { english: 'L l', chinese: 'L - Lion 狮子', emoji: '🦁' },
    ],
    repeatSentences: [
      { english: 'H, I, J, K!', chinese: '字母 H I J K！' },
      { english: 'L, M, N!', chinese: '字母 L M N！' },
    ],
    game: {
      type: 'letter-match',
      instruction: '把大写字母和小写字母配对！',
      pairs: [
        { left: 'H', right: 'h' },
        { left: 'I', right: 'i' },
        { left: 'J', right: 'j' },
        { left: 'K', right: 'k' },
      ],
    },
    stageLines: ['H, I, J, K!'],
    stageChinese: ['字母 H I J K！'],
    reward: '⭐',
  },
  {
    day: 10,
    title: 'Day 10',
    subtitle: 'Letters O–T',
    mapName: 'Letter Balloon',
    coreExpressions: ['O P Q R S T', 'o p q r s t'],
    goal: '识别 O–T 的大小写',
    listenCards: [
      { english: 'O o', chinese: 'O - Orange 橙子', emoji: '🍊' },
      { english: 'P p', chinese: 'P - Panda 熊猫', emoji: '🐼' },
      { english: 'Q q', chinese: 'Q - Queen 女王', emoji: '👑' },
      { english: 'R r', chinese: 'R - Rainbow 彩虹', emoji: '🌈' },
      { english: 'S s', chinese: 'S - Sun 太阳', emoji: '☀️' },
    ],
    repeatSentences: [
      { english: 'O, P, Q!', chinese: '字母 O P Q！' },
      { english: 'R, S, T!', chinese: '字母 R S T！' },
    ],
    game: {
      type: 'letter-match',
      instruction: '气球字母配对游戏！',
      pairs: [
        { left: 'O', right: 'o' },
        { left: 'P', right: 'p' },
        { left: 'Q', right: 'q' },
        { left: 'R', right: 'r' },
      ],
    },
    stageLines: ['O, P, Q!'],
    stageChinese: ['字母 O P Q！'],
    reward: '⭐',
  },
  {
    day: 11,
    title: 'Day 11',
    subtitle: 'Letters U–Z',
    mapName: 'Z Maze',
    coreExpressions: ['U V W X Y Z', 'u v w x y z'],
    goal: '识别 U–Z 的大小写',
    listenCards: [
      { english: 'U u', chinese: 'U - Umbrella 雨伞', emoji: '☂️' },
      { english: 'V v', chinese: 'V - Van 面包车', emoji: '🚐' },
      { english: 'W w', chinese: 'W - Water 水', emoji: '💧' },
      { english: 'X x', chinese: 'X - X-ray X光', emoji: '🩻' },
      { english: 'Y y', chinese: 'Y - Yellow 黄色', emoji: '💛' },
    ],
    repeatSentences: [
      { english: 'X, Y, Z!', chinese: '字母 X Y Z！' },
      { english: "Now I know my ABC's!", chinese: '我认识所有字母啦！' },
    ],
    game: {
      type: 'letter-match',
      instruction: '完成最后的字母配对！',
      pairs: [
        { left: 'U', right: 'u' },
        { left: 'V', right: 'v' },
        { left: 'W', right: 'w' },
        { left: 'X', right: 'x' },
      ],
    },
    stageLines: ['X, Y, Z!'],
    stageChinese: ['字母 X Y Z！'],
    reward: '🥚 ABC Egg Badge',
  },
  {
    day: 12,
    title: 'Day 12',
    subtitle: '字母音小启蒙',
    mapName: 'Sound Cave',
    coreExpressions: ['A says /æ/', 'B says /b/', 'C says /k/', 'D says /d/'],
    goal: '初步理解字母和单词开头声音的关系',
    listenCards: [
      { english: 'A - apple', chinese: 'A 说 /æ/，apple 苹果', emoji: '🍎' },
      { english: 'B - bag', chinese: 'B 说 /b/，bag 书包', emoji: '🎒' },
      { english: 'C - cat', chinese: 'C 说 /k/，cat 猫', emoji: '🐱' },
      { english: 'D - dog', chinese: 'D 说 /d/，dog 狗', emoji: '🐶' },
    ],
    repeatSentences: [
      { english: 'A, apple!', chinese: 'A，苹果！' },
      { english: 'C, cat!', chinese: 'C，猫！' },
    ],
    game: {
      type: 'listen-select',
      instruction: '听到 "A"，选出正确的图片！',
      audioPrompt: 'A! Apple!',
      options: [
        { id: 'apple', text: '🍎 Apple 苹果', isCorrect: true },
        { id: 'dog', text: '🐶 Dog 狗', isCorrect: false },
        { id: 'sun', text: '☀️ Sun 太阳', isCorrect: false },
      ] as any,
    },
    stageLines: ['A, apple.', 'C, cat.'],
    stageChinese: ['A，苹果。', 'C，猫。'],
    reward: '⭐',
  },
  {
    day: 13,
    title: 'Day 13',
    subtitle: '小单词冒险',
    mapName: 'Word Park',
    coreExpressions: ["It's a cat.", "It's a dog.", "What's this?"],
    goal: '能看图听懂并说出简单单词和句子',
    listenCards: [
      { english: "It's a cat.", chinese: '这是一只猫。', emoji: '🐱' },
      { english: "It's a dog.", chinese: '这是一只狗。', emoji: '🐶' },
      { english: "It's a bag.", chinese: '这是一个书包。', emoji: '🎒' },
      { english: "It's a pen.", chinese: '这是一支笔。', emoji: '✏️' },
    ],
    repeatSentences: [
      { english: "What's this?", chinese: '这是什么？' },
      { english: "It's a cat.", chinese: '这是一只猫。' },
      { english: "It's a dog.", chinese: '这是一只狗。' },
    ],
    game: {
      type: 'word-image',
      instruction: '单词和图片配对！',
      pairs: [
        { left: 'cat 🐱', right: '猫' },
        { left: 'dog 🐶', right: '狗' },
        { left: 'bag 🎒', right: '书包' },
        { left: 'pen ✏️', right: '笔' },
      ],
    },
    stageLines: ["It's a cat.", "It's a dog."],
    stageChinese: ['这是一只猫。', '这是一只狗。'],
    reward: '⭐',
  },
  {
    day: 14,
    title: 'Day 14',
    subtitle: 'ABC Song + Final Show 🎓',
    mapName: 'ABC Stage',
    coreExpressions: ['A B C D E F G', 'H I J K L M N O P', 'Q R S T U V', 'W X Y Z'],
    goal: '完成 MVP 最终学习闭环',
    listenCards: [
      { english: 'A B C D E F G', chinese: '字母 A 到 G', emoji: '🔤' },
      { english: 'H I J K L M N O P', chinese: '字母 H 到 P', emoji: '🔤' },
      { english: 'Q R S T U V W X Y Z', chinese: '字母 Q 到 Z', emoji: '🔤' },
    ],
    repeatSentences: [
      { english: 'A B C D E F G', chinese: '字母 A B C D E F G' },
      { english: 'H I J K L M N O P', chinese: '字母 H I J K L M N O P' },
      { english: 'Q R S T U V W X Y Z', chinese: '字母 Q R S T U V W X Y Z' },
    ],
    game: {
      type: 'listen-select',
      instruction: 'ABC Song 跟唱挑战！听到哪个字母，点击它！',
      audioPrompt: 'G!',
      options: [
        { id: 'g', text: 'G', isCorrect: true },
        { id: 'p', text: 'P', isCorrect: false },
        { id: 'z', text: 'Z', isCorrect: false },
      ] as any,
    },
    stageLines: ['Hello!', 'My name is ____.', "I'm eight.", 'I like dinosaurs.', 'A, B, C, D, E, F, G...', 'Goodbye!'],
    stageChinese: ['你好！', '我的名字是____。', '我八岁。', '我喜欢恐龙。', '字母歌...', '再见！'],
    reward: '🎓 Dino English Starter Certificate',
  },
]
