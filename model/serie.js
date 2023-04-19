class Serie{

    constructor(title, creator, seasons=1, isCompleted=false, upVotes=0, downVotes=0, imageUrl='', id){
        this.title = title;
        this.creator = creator;
        this.seasons = seasons;
        this.isCompleted = isCompleted;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
        this.imageUrl = imageUrl;

        if (id !== undefined) {
            this.id = id;
        }

    }

    compareByRating(serie){
        const myUpPoints = this.upVotes * 2;
        const myDownPoints = this.downVotes;
        const myRating = myUpPoints - myDownPoints;

        const otherUpPoints = serie.upVotes * 2;
        const otherDownPoints = serie.downVotes;
        const otherRating = otherUpPoints - otherDownPoints;

        return otherRating - myRating;

    }

}