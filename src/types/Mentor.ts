type Mentor = User & {
    category : string;
    company : string;
    position : string;
    career : string;
    isChecked : boolean;
    warningCount : number;
    favoriteCount : number;
    gender : string;
    paperImg: string;
}