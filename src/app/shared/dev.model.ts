class Dev {
    // _arrayTechs:string[];
    
    constructor(public github_username: string,
        public techs: string,
        public latitude: string,
        public longitude: string,
        public name:string,
        public avatar_url:string) {
    }

    // get arrayTechs():string[]{
    //     return this.techs.split(',');
    // }
}

export { Dev}