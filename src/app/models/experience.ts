export class Experience {
    id?: number;
    name: string;
    image: string;
    startDate: string;
    endDate: string;    
    position: string;
    tasks: string;

    constructor(name: string, image: string, startDate: string, 
        endDate: string, position: string, tasks: string){
            
        this.name = name;
        this.image = image;
        this.startDate = startDate;
        this.endDate = endDate;
        this.position = position;
        this.tasks = tasks;
    }
}
