class Collection{

    constructor(series = []){
        this.series = series;
    }

    addSerie(serie){
        this.series.push(serie);
    }

    sortByTitle(){
        this.series.sort((serie1,serie2)=> serie1.title.localeCompare(serie2.title));
    }

    sortByUpVotes(){
        this.series.sort((serie1,serie2)=> serie2.upVotes-serie1.upVotes);
    }

    sortByDownVotes(){
        this.series.sort((serie1,serie2)=> serie2.downVotes-serie1.downVotes);
    }

    sortByRating(){
        this.series.sort((serie1,serie2)=> serie1.compareByRating(serie2));
    }

    static fromJSONArray(data){
        const newCollection = new Collection();
        for (let i = 0; i < data.length; i++) {
            // const {title, seasons, creator, isCompleted, imgUrl, upVotes, downVotes, id} = data[i];
            // const newSerie = new Serie(title, creator, seasons, isCompleted, upVotes, downVotes, imgUrl, id)
            const o = data[i];
            const newSerie = new Serie(o.title, o.creator, o.seasons, o.isCompleted, o.upVotes, o.downVotes, o.imageUrl, o.id)
            newCollection.addSerie(newSerie);
        }
        return newCollection;
    }

}