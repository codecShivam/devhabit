class RoadmapModel {
  constructor(
    day,
    description,
    task1,
    task2,
    task3,
    istask1,
    istask2,
    istask3,
    rating,
    feedback,
    descriptionEplanation
  ) {
    this.day = day;
    this.description = description;
    this.task1 = task1;
    this.task2 = task2;
    this.task3 = task3;
    this.istask1 = istask1;
    this.istask2 = istask2;
    this.istask3 = istask3;
    this.rating = rating;
    this.feedback = feedback;
    this.descriptionEplanation = descriptionEplanation;
  }

  toMap() {
    return {
      day: this.day,
      description: this.description,
      task1: this.task1,
      task2: this.task2,
      task3: this.task3,
      istask1: this.istask1,
      istask2: this.istask2,
      istask3: this.istask3,
      rating: this.rating,
      feedback: this.feedback,
      descriptionEplanation: this.descriptionEplanation,
    };
  }

  static fromMap(map) {
    return new RoadmapModel(
      map.day,
      map.description,
      map.task1,
      map.task2,
      map.task3,
      map.istask1,
      map.istask2,
      map.istask3,
      map.rating,
      map.feedback,
      map.descriptionEplanation
    );
  }
  toObject() {
    return {
      day: this.day,
      description: this.description,
      task1: this.task1,
      task2: this.task2,
      task3: this.task3,
      istask1: this.istask1,
      istask2: this.istask2,
      istask3: this.istask3,
      rating: this.rating,
      feedback: this.feedback,
      descriptionEplanation: this.descriptionEplanation,
    };
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
