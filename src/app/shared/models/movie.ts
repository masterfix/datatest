export class Movie {

    public id: number;
    public name: string;
    public year: number;

    public static fromJson(data): Movie {
        let movie = new Movie();
        movie.id = data.id;
        movie.name = data.name;
        movie.year = data.year;
        return movie;
    }

}