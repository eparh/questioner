'use strict';

class UpdateSpeakerDTO {
  constructor() {
    this.eInfo = undefined;
    this.firstName = undefined;
    this.lastName = undefined;
    this.jobTitle = undefined;
    this.company = undefined;
    this.bio = undefined;
    this.twitterHandle = undefined;
    this.talkTitle = undefined;
    this.talkDescription = undefined;
    this.tags = undefined;
    this.presentationLink = undefined;
  }
}

module.exports = UpdateSpeakerDTO;