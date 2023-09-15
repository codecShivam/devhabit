class RoadmapModel {
    constructor(day, description, task1, task2, task3) {
      this.day = day;
      this.description = description;
      this.task1 = task1;
      this.task2 = task2;
      this.task3 = task3;
    }
  
    toMap() {
      return {
        day: this.day,
        description: this.description,
        task1: this.task1,
        task2: this.task2,
        task3: this.task3,
      };
    }
  
    static fromMap(map) {
      return new RoadmapModel(
        map.day,
        map.description,
        map.task1,
        map.task2,
        map.task3
      );
    }
  
    toJson() {
      return JSON.stringify(this.toMap());
    }
  
    static fromJson(source) {
      const map = JSON.parse(source);
      return RoadmapModel.fromMap(map);
    }
  }
  
  export default RoadmapModel;
  