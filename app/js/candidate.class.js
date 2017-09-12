'use strict';
export default class Candidate {
  constructor(data) {
    this.name = data.candidate_name;
    this.race = data.candidate_position;
    this.city = data.candidate_city;
    this.state = data.candidate_state;
    this.twitter = data.candidate_twitter;
    this.facebook = data.candidate_facebook;
    this.instagram = data.candidate_instagram;
    this.website = data.candidate_url;
    this.email = data.candidate_email;
    this.video = data.candidate_video_url;
    this.questions = {
      'Qualifications':{
        'question': data.question_rtvquestion_1,
        'answer': question_id_1
      },
      'Voting Rights':{
        'question': data.question_rtvquestion_2,
        'answer': question_id_2
      },
      'Racial and Social Equity':{
        'question': data.question_rtvquestion_3,
        'answer': question_id_3
      },
      'Criminal Justice':{
        'question': data.question_rtvquestion_4,
        'answer': question_id_4
      },
      'Climate Change':{
        'question': data.question_rtvquestion_5,
        'answer': question_id_5
      },
      'Water Shut-Offs':{
        'question': data.question_rtvquestion_6,
        'answer': question_id_6
      },
      'Jobs & Housing':{
        'question': data.question_rtvquestion_7,
        'answer': question_id_7
      },
      'Bonus':{
        'question': data.question_rtvquestion_8,
        'answer': question_id_8
      }
    }
  }
  getRace(){
    return this.race;
  }
  getLinks(){
    let links = {
      'website': this.website,
      'twitter': this.twitter,
      'facebook': this.facebook,
      'instagram': this.instagram,
      'email': this.email
    };
    return links;
  }
  getName(){
    return this.name;
  }
  getVideo(){
    return this.video;
  }
  getQuestions(){
    return this.questions;
  }
}
