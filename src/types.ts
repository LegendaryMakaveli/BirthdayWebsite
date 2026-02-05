export interface SisterProfile {
    name: string;
    theme: string;
}

export interface PhotoData {
    url: string;
    caption: string;
    message: string;
}

export interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export interface TriviaQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}
